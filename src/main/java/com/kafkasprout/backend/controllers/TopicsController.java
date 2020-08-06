package com.kafkasprout.backend.controllers;

import com.kafkasprout.backend.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;
import java.util.concurrent.ExecutionException;

@RestController
public class TopicsController {

    @Autowired
    public AdminService admin;

    //describe Topics of Cluster
    @GetMapping("/describeTopics")
    public Object listTopics() throws ExecutionException, InterruptedException {
      Map<String, Object> info = admin.describeTopicsAndBrokers();
      return info.get("Topics");
    }

    //create Topic of Cluster: requires json input with key/value of name, desired replication factor, and desired partition count
    @PostMapping("/createTopics")
    public void createTopic(@RequestBody HashMap<String, Object> payload) {
        admin.createTopic(payload);
    }

    //delete Topic of Cluster: requires json input with name
    @PostMapping("/deleteTopics")
    public void deleteTopic(@RequestBody HashMap<String, Object> payload) {
        admin.deleteTopic(payload);
    }

    //describe Topic and Broker Configuration of Cluster
    @GetMapping("/describeTopicAndBrokerConfig")
    public Map<String, Map<String, Map<String, String>>> describeTopicsConfig() throws ExecutionException, InterruptedException {
        return admin.describeTopicAndBrokerConfig();
    }
}
