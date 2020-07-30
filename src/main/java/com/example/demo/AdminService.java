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
    this.isLive = true;
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

  public Map<String, Map<String, List>> describeTopics(HashMap<String, ArrayList<String>> payload)
      throws ExecutionException, InterruptedException {

    Map<String, TopicDescription> map = admin.describeTopics(payload.get("name")).all().get();

    Map<String, Map<String, List>> hashmap = new HashMap<>();

    for (String name : map.keySet()) {

      Map<String, List> inner = new HashMap<>();

      for (TopicPartitionInfo info : map.get(name).partitions()) {

        List<Integer> partition = Arrays.asList(info.partition());
        List<Map> leader = Arrays.asList(unpackNode(info.leader()));

        List<Map> replicas = new ArrayList<>();
        for (Node node : info.replicas()) {
          replicas.add(unpackNode(node));
        }

        List<Map> isr = new ArrayList<>();
        for (Node node : info.isr()) {
          isr.add(unpackNode(node));
        }

        inner.put("isr", isr);
        inner.put("replicas", replicas);
        inner.put("leader", leader);
        inner.put("partition", partition);

      }
      hashmap.put(name, inner);
    }
    return hashmap;
  }

  public Map<String, String> unpackNode(Node node) {
    Map<String, String> nodeSpecs = new HashMap<>();
    nodeSpecs.put("id", Integer.toString(node.id()));
    nodeSpecs.put("port", Integer.toString(node.port()));
    nodeSpecs.put("host", node.host());
    return nodeSpecs;
  }

  public Map<String, List> describeCluster() throws ExecutionException, InterruptedException {
    String id = admin.describeCluster().clusterId().get();
    Node controller = admin.describeCluster().controller().get();
    Collection<Node> nodes = admin.describeCluster().nodes().get();

    Map<String, List> clusterSpecs = new HashMap<>();

    List<String> clusterID = Arrays.asList(id);
    List<Map> controllerInfo = Arrays.asList(unpackNode(controller));

    List<Map> nodeLists = new ArrayList<>();
    for (Node node : nodes) {
      nodeLists.add(unpackNode(node));
    }

    clusterSpecs.put("id", clusterID);
    clusterSpecs.put("controller", controllerInfo);
    clusterSpecs.put("nodes", nodeLists);

    return clusterSpecs;
  }

  public Map<String, Object> describeEverything() throws ExecutionException, InterruptedException {

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
      String[] info = new String[4];
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
      String[] nodeInfo = new String[5];
      nodeInfo[0] = String.valueOf(node.id());
      nodeInfo[1] = node.host();
      nodeInfo[2] = String.valueOf(node.port());
      nodeInfo[3] = String.valueOf((node.id() == controllerID));
      nodeInfo[4] = String.valueOf(brokerPartitionCount.get(node.id()));
      brokerList.add(Arrays.asList(nodeInfo));
    }

    json.put("Brokers",brokerList);
    json.put("Topics", topicList);

    return json;
  }


}
