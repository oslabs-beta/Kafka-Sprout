package com.example.demo.controllers;

import com.example.demo.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutionException;
import java.util.Hashtable;

import java.io.*;

import com.example.demo.AdminService;
import com.example.demo.StartBroker;
import com.example.demo.StartZoo;
import com.example.demo.Status;
import com.example.demo.CheckPath;


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

  @GetMapping("/describeTopicsAndBrokers")
    public Map<String, Object> describeTopicsAndBrokers() throws ExecutionException, InterruptedException {
        return admin.describeTopicsAndBrokers();
    }

  @GetMapping("/describeBrokers")
  public Object describeBrokers() throws ExecutionException, InterruptedException {
    Map<String, Object> info = admin.describeTopicsAndBrokers();
    return info.get("Brokers");
  }

  @PostMapping("/startBroker")
  public String mapping(@RequestBody HashMap<String, Object> payload) throws FileNotFoundException, IOException {
    CheckPath pathCheck = new CheckPath();
    pathCheck.storeProperties(payload);
    return StartBroker.start(payload);
  }

  @PostMapping("/startCluster")
  public boolean start(@RequestBody HashMap<String, String> payload) throws FileNotFoundException, IOException {
    String configPath = payload.get("path");
    //String configPath = "C:\\kafka_2.12-2.5.0\\config";
    String OS = System.getProperty("os.name").toLowerCase();
    StartZoo zooThread = new StartZoo(configPath, OS);
    boolean isZoo = zooThread.run();
    //boolean isZoo = true;
    if (isZoo) {
      admin.startClient();
    }

    CheckPath setPath = new CheckPath();
    setPath.storePath(configPath);

    return isZoo;
  }

  @GetMapping("/getPath")
  public String checkPath() throws FileNotFoundException, IOException {
    CheckPath pathCheck = new CheckPath();
    return pathCheck.retrievePath();
  }

  @GetMapping("/getProperties")
  public Hashtable checkProperties() throws FileNotFoundException, IOException {
    CheckPath pathCheck = new CheckPath();
    return pathCheck.retrieveProperties();
  }

}
