package com.kafkasprout.backend;

import org.apache.kafka.clients.admin.*;
import org.apache.kafka.common.*;
import org.apache.kafka.common.config.ConfigResource;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.ExecutionException;

@Service
public class AdminService {

  public AdminClient admin;
  private boolean isLive;

  public AdminService() {
    Properties config = new Properties();
    config.put(AdminClientConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
    int ADMIN_CLIENT_TIMEOUT_MS = 5000;

    try (AdminClient admin = AdminClient.create(config)) {
      admin.listTopics(new ListTopicsOptions().timeoutMs(ADMIN_CLIENT_TIMEOUT_MS)).listings().get();

    } catch (ExecutionException | InterruptedException ex) {
      isLive = false;
      return;
    }
    admin = AdminClient.create(config);
    isLive = true;
  }

  public boolean isLive() {
    return isLive;
  }

  public void isLive(boolean live) {
    this.isLive = live;
  }

  public void startClient() {
    Properties config = new Properties();
    config.put(AdminClientConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
    this.admin = AdminClient.create(config);
    isLive(true);
  }

  public ArrayList<String> listTopics() throws ExecutionException, InterruptedException {
    ArrayList<String> names = new ArrayList<>();

    for (TopicListing topicListing : admin.listTopics().listings().get()) {
      names.add(topicListing.name());
    }
    return names;
  }

  public void createTopic(HashMap<String, Object> payload) {

    // parsing json request body
    String desiredName = payload.get("name").toString();
    int desiredPartitions = Integer.parseInt(String.valueOf(payload.get("partition")));
    short desiredReplicationFactor = Short.parseShort(String.valueOf(payload.get("replication")));

    // creating new topic
    NewTopic newTopic = new NewTopic(desiredName, desiredPartitions, desiredReplicationFactor);
    admin.createTopics(Collections.singleton(newTopic));

  }

  public void deleteTopic(HashMap<String, Object> payload) {

    // parsing json request body
    String desiredName = payload.get("name").toString();

    admin.deleteTopics(Collections.singleton(desiredName));
  }

  public Map<String,String> metrics() throws ExecutionException, InterruptedException {
    Map<String,String> json = new HashMap<>();
    for(Map.Entry<MetricName, ? extends Metric> entry: admin.metrics().entrySet()) {
      if (entry.getKey().name().equals("response-rate") || entry.getKey().name().equals("io-wait-time-ns-avg") || entry.getKey().name().equals("network-io-rate") || entry.getKey().name().equals("request-total")) {
        json.put(entry.getKey().name(), String.valueOf(entry.getValue().metricValue()));
      }
    }
    return json;
  }

  public Map<String, Map<String, Map<String, String>>> describeTopicAndBrokerConfig() throws ExecutionException, InterruptedException {
    //get all topics
    List<String> allTopics = this.listTopics();

    List<ConfigResource> allTopicConfig = new ArrayList<>();

    //convert all topics to ConfigResource
    for (String topic : allTopics) {
      ConfigResource topicDesc = new ConfigResource(ConfigResource.Type.TOPIC, topic);
      allTopicConfig.add(topicDesc);
    }

    //get all topic configs
    Map<ConfigResource, Config> topicResults = admin.describeConfigs(allTopicConfig).all().get();

    Map<String, Map<String, Map<String, String>>> json = new HashMap<>();

    Map<String, Map<String, String>> topic = new HashMap<>();
    Map<String, Map<String, String>> broker = new HashMap<>();


    for (Map.Entry<ConfigResource, Config> configResource : topicResults.entrySet()) {
      String name = configResource.getKey().name();
      Map<String, String> topicContent = new HashMap<>();
      for (ConfigEntry configEntry : configResource.getValue().entries()) {
        if (configEntry.name().equals("compression.type")) {
          topicContent.put("compressionType", configEntry.value());
        } else if (configEntry.name().equals("min.insync.replicas")) {
          topicContent.put("minInsyncReplicas", configEntry.value());
        } else if (configEntry.name().equals("message.timestamp.type")) {
          topicContent.put("messageTimeStampType", configEntry.value());
        } else if (configEntry.name().equals("cleanup.policy")) {
          topicContent.put("cleanUpPolicy", configEntry.value());
        }
      }
      topic.put(name, topicContent);
    }
    json.put("Topic", topic);

    //get all brokers and convert to ConfigResources
    List<ConfigResource> allBrokerConfig = new ArrayList<>();

    Collection<Node> nodes = admin.describeCluster().nodes().get();
    System.out.println(nodes);

    for(Node node : nodes){
      ConfigResource brokerConfigResource = new ConfigResource(ConfigResource.Type.BROKER, String.valueOf(node.id()));
      allBrokerConfig.add(brokerConfigResource);
    }

    System.out.println(allBrokerConfig);

    //get all broker configs
    Map<ConfigResource, Config> brokerResults = admin.describeConfigs(allBrokerConfig).all().get();

    for(Map.Entry<ConfigResource,Config> configResource : brokerResults.entrySet()){
      String id = configResource.getKey().name();
      Map<String,String> brokerContent = new HashMap<>();

      for(ConfigEntry configEntry : configResource.getValue().entries()){
        if (configEntry.name().equals("zookeeper.connect")){
          brokerContent.put("zookeeperConnect",configEntry.value());
        }else if (configEntry.name().equals("min.insync.replicas")){
          brokerContent.put("minInsyncReplicas", configEntry.value());
        }else if (configEntry.name().equals("log.dir")){
          brokerContent.put("logDir", configEntry.value());
        }else if (configEntry.name().equals("background.threads")){
          brokerContent.put("backgroundThreads", configEntry.value());
        }else if (configEntry.name().equals("compression.type")){
          brokerContent.put("compressionType",configEntry.value());
        }else if (configEntry.name().equals("log.retention.hours")){
          brokerContent.put("logRetentionHours",configEntry.value());
        }else if (configEntry.name().equals("message.max.bytes")){
          brokerContent.put("messageMaxBytes",configEntry.value());
        }
      }
      broker.put(id,brokerContent);
    }

    json.put("Brokers",broker);

    return json;
  }

  public Map<String, Object> describeTopicsAndBrokers() throws ExecutionException, InterruptedException {

    //grab list of topics
    Map<String, TopicDescription> topics = admin.describeTopics(this.listTopics()).all().get();

    //return json
    Map<String, Object> json = new HashMap<>();
    List<List> brokerList = new ArrayList<>();
    List<List> topicList = new ArrayList<>();

    //Topic Column
    String[] topicSpecs = new String[]{"Name", "Leader", "# of Partitions", "# of Replicas"};
    topicList.add(Arrays.asList(topicSpecs));

    //Broker Column
    String[] brokerSpecs = new String[]{"ID", "Host", "Port", "Controller", "# of Partitions"};
    brokerList.add(Arrays.asList(brokerSpecs));

    //Broker Nodes
    Collection<Node> nodeList = admin.describeCluster().nodes().get();
    //Controller Broker
    int controllerID = admin.describeCluster().controller().get().id();
    //Broker List
    Map<Integer,Integer> brokerPartitionCount = new HashMap<>();

    //topic traverse
    for(String name: topics.keySet()){
      String[] info = new String[topicSpecs.length];
      info[0] = topics.get(name).name();
      info[1] = String.valueOf(topics.get(name).partitions().get(0).leader().port());
      info[2] = String.valueOf(topics.get(name).partitions().size());
      info[3] = String.valueOf(topics.get(name).partitions().get(0).replicas().size());

      //grab partition count by brokers
      for(TopicPartitionInfo topicPartitionInfo : topics.get(name).partitions()){
        for(Node replica : topicPartitionInfo.replicas()){
          if (brokerPartitionCount.containsKey(replica.id())){
            int newCount = brokerPartitionCount.get(replica.id()) + 1;
            brokerPartitionCount.put(replica.id(),newCount);
          }else {
            brokerPartitionCount.put(replica.id(),1);
          }
        }
      }
      topicList.add(Arrays.asList(info));
    }

    //broker traverse
    for(Node node : nodeList){
      String[] nodeInfo = new String[brokerSpecs.length];
      nodeInfo[0] = String.valueOf(node.id());
      nodeInfo[1] = node.host();
      nodeInfo[2] = String.valueOf(node.port());
      nodeInfo[3] = String.valueOf((node.id() == controllerID));
      nodeInfo[4] = String.valueOf(brokerPartitionCount.get(node.id()));
      brokerList.add(Arrays.asList(nodeInfo));
    }

    json.put("Brokers", brokerList);
    json.put("Topics", topicList);

    return json;
  }
}
