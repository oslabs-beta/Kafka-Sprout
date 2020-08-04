package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;
import java.util.concurrent.ExecutionException;

import com.example.demo.AdminService;

@RestController
public class TopicsController {

    @Autowired
    public AdminService admin;

    @GetMapping("/describeTopics")
    public Object listTopics() throws ExecutionException, InterruptedException {
      Map<String, Object> info = admin.describeTopicsAndBrokers();
      return info.get("Topics");
    }

    @PostMapping("/createTopics")
    public void createTopic(@RequestBody HashMap<String, Object> payload) {
        admin.createTopic(payload);
    }

    @PostMapping("/deleteTopics")
    public void deleteTopic(@RequestBody HashMap<String, Object> payload) {
        admin.deleteTopic(payload);
    }

    @GetMapping("/describeTopicAndBrokerConfig")
    public Map<String, Map<String, Map<String, String>>> describeTopicsConfig() throws ExecutionException, InterruptedException {
        return admin.describeTopicAndBrokerConfig();
    }
}
