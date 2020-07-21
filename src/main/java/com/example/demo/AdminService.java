package com.example.demo;

import org.apache.kafka.clients.admin.*;
import org.apache.kafka.common.*;
import org.apache.kafka.common.requests.DescribeLogDirsResponse;
import org.springframework.stereotype.Service;
import java.util.*;
import java.util.concurrent.ExecutionException;

@Service
public class AdminService {

    public AdminClient admin;

    public AdminService() {
        Properties config = new Properties();
        config.put(AdminClientConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
        admin = AdminClient.create(config);
    }

    public ArrayList<String> listTopics() throws ExecutionException, InterruptedException {
        ArrayList<String> names = new ArrayList<>();

        for (TopicListing topicListing : admin.listTopics().listings().get()) {
            names.add(topicListing.name());
        }
        return names;
    }

    public void createTopic(HashMap<String, Object> payload) {

        //parsing json request body
        String desiredName = payload.get("name").toString();
        int desiredPartitions = Integer.parseInt(String.valueOf(payload.get("partition")));
        short desiredReplicationFactor = Short.parseShort(String.valueOf(payload.get("replication")));

        //creating new topic
        NewTopic newTopic = new NewTopic(desiredName, desiredPartitions, desiredReplicationFactor);
        admin.createTopics(Collections.singleton(newTopic));

    }

    public void deleteTopic(HashMap<String, Object> payload) {

        //parsing json request body
        String desiredName = payload.get("name").toString();

        admin.deleteTopics(Collections.singleton(desiredName));
    }

    public Map<String,Map<String,List>> describeTopics(HashMap<String,ArrayList<String>> payload) throws ExecutionException, InterruptedException {

        Map<String, TopicDescription> map = admin.describeTopics(payload.get("name")).all().get();

        Map<String,Map<String,List>> hashmap = new HashMap<>();

        for(String name : map.keySet()){

            Map<String,List> inner = new HashMap<>();

            for(TopicPartitionInfo info : map.get(name).partitions()){

                List<Integer> partition = Arrays.asList(info.partition());
                List<Map> leader = Arrays.asList(unpackNode(info.leader()));

                List<Map> replicas = new ArrayList<>();
                for(Node node : info.replicas()){
                    replicas.add(unpackNode(node));
                }

                List<Map> isr = new ArrayList<>();
                for(Node node : info.isr()){
                    isr.add(unpackNode(node));
                }

                inner.put("isr", isr);
                inner.put("replicas", replicas);
                inner.put("leader", leader);
                inner.put("partition",partition);

            }
            hashmap.put(name,inner);
        }
        return hashmap;
    }

    public Map<String, String> unpackNode(Node node){
        Map<String, String> nodeSpecs = new HashMap<>();
        nodeSpecs.put("id",Integer.toString(node.id()));
        nodeSpecs.put("port",Integer.toString(node.port()));
        nodeSpecs.put("host",node.host());
        return nodeSpecs;
    }

    public Map<String,List> describeCluster() throws ExecutionException, InterruptedException {
        String id = admin.describeCluster().clusterId().get();
        Node controller = admin.describeCluster().controller().get();
        Collection<Node> nodes = admin.describeCluster().nodes().get();

        Map<String, List> clusterSpecs = new HashMap<>();


        List<String> clusterID = Arrays.asList(id);
        List<Map> controllerInfo = Arrays.asList(unpackNode(controller));

        List<Map> nodeLists = new ArrayList<>();
        for(Node node : nodes){
            nodeLists.add(unpackNode(node));
        }

        clusterSpecs.put("id",clusterID);
        clusterSpecs.put("controller", controllerInfo);
        clusterSpecs.put("nodes", nodeLists);

        return clusterSpecs;
    }

}
