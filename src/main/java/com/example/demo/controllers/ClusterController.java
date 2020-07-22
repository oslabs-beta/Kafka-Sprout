package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

import com.example.demo.AdminService;
import com.example.demo.StartBroker;
import com.example.demo.StartZoo;
import com.example.demo.Status;

@RestController
public class ClusterController {

  @Autowired
  public AdminService admin;

  @GetMapping("/checkStatus")

  public Map<String, String> checkStatus() {
    Map<String, String> status = new HashMap<>();

    String OS = System.getProperty("os.name").toLowerCase();
    Status checkStatus = new Status(OS);
    String zooStatus = checkStatus.run();

    status.put("zookeeper", zooStatus);
    status.put("kafka", String.valueOf(admin.isLive()));

    return status;
  }

  @GetMapping("/describeCluster")
  public Map<String, List> describeCluster() throws ExecutionException, InterruptedException {
    return admin.describeCluster();
  }

  @PostMapping("/startBroker")
  public String mapping(@RequestBody HashMap<String, Object> payload) {
    return StartBroker.start(payload);
  }

  // @ResponseBody don't need this because RestController does it automatically
  // "Remember, we don't need to annotate the @RestController-annotated
  // controllers with the @ResponseBody annotation since Spring does it by
  // default."
  @PostMapping("/startCluster")
  public boolean start(@RequestBody HashMap<String, String> payload) {
    System.out.println(payload);
    String configPath = payload.get("path");
    //String configPath = "C:\\kafka_2.12-2.5.0\\config";
    String OS = System.getProperty("os.name").toLowerCase();
    StartZoo zooThread = new StartZoo(configPath, OS);
    boolean isZoo = zooThread.run();
    //boolean isZoo = true;
    if (isZoo) {
      admin.startClient();
    }
    return isZoo;
  }
}
