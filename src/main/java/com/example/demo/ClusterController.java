package com.example.demo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@RestController
public class ClusterController {

  @Autowired
  public AdminService admin;

  @GetMapping("/checkStatus")
  String checkStatus(){
    String OS = System.getProperty("os.name").toLowerCase();
    Status checkStatus = new Status(OS);
    String status = checkStatus.run();
    
    return status;
  }

  @GetMapping("/describeCluster")
  public Map<String, List> describeCluster() throws ExecutionException, InterruptedException {
    return admin.describeCluster();
  }

  @PostMapping("/startBroker")
  public void mapping(@RequestBody HashMap<String, Object> payload){
    return StartBroker.start(payload);
  }

  
  //@ResponseBody don't need this because RestController does it automatically
  //"Remember, we don't need to annotate the @RestController-annotated controllers with the @ResponseBody annotation since Spring does it by default."
//  @PostMapping("/startCluster")
//  void start(@RequestBody Config config) {
//    System.out.println(config.path());
//    //C:\kafka_2.12-2.5.0\config\
//    //String configPath = "/usr/local/etc/kafka/";
//    //String OS = System.getProperty("os.name").toLowerCase();
//    //RunZoo zooThread = new RunZoo(configPath, OS);
//    //zooThread.run();
//  }
}
