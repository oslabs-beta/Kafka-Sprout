package com.example.demo;

import org.apache.kafka.clients.admin.*;
import org.apache.kafka.common.*;
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
