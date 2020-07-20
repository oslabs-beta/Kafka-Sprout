package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

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

    @GetMapping("/describeTopics")
    public Map<String, Map<String, List>> describeTopics(@RequestBody HashMap<String, ArrayList<String>> payload) throws ExecutionException, InterruptedException{
        return admin.describeTopics(payload);
    }

    @GetMapping("/describeAllTopics")
    public Map<String, Map<String, List>> describeAllTopics() throws ExecutionException, InterruptedException {
        ArrayList<String> all = admin.listTopics();
        HashMap<String, ArrayList<String>> input = new HashMap<>();
        input.put("name", all);
        return admin.describeTopics(input);
    }
}
