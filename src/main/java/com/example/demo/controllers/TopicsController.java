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

    @GetMapping("/listTopics")
    public ArrayList<String> listTopics() throws ExecutionException, InterruptedException {
        return admin.listTopics();
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
    public void describeTopicsConfig() throws ExecutionException, InterruptedException {
        admin.describeTopicAndBrokerConfig();
    }
}
