package com.example.demo;

import java.net.URI;
import java.util.List;

import com.example.demo.RequestBody.Config;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.MediaType;


@RestController
public class ClusterController {

  @GetMapping("/checkStatus")
  String checkStatus(){
    String OS = System.getProperty("os.name").toLowerCase();
    Status checkStatus = new Status(OS);
    String status = checkStatus.run();
    
    return status;
  }
  
  

  //@ResponseBody don't need this because RestController does it automatically
  //"Remember, we don't need to annotate the @RestController-annotated controllers with the @ResponseBody annotation since Spring does it by default."
  @PostMapping("/startCluster")
  void start(@RequestBody Config config) {
    System.out.println(config.path());
    //C:\kafka_2.12-2.5.0\config\
    //String configPath = "/usr/local/etc/kafka/";
    //String OS = System.getProperty("os.name").toLowerCase();
    //RunZoo zooThread = new RunZoo(configPath, OS);
    //zooThread.run();
  }
}
