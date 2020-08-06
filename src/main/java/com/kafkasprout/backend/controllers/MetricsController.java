package com.kafkasprout.backend.controllers;

import java.util.Map;
import java.util.concurrent.ExecutionException;

import com.kafkasprout.backend.AdminService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;

@EnableScheduling
@Controller
public class MetricsController {

  @Autowired
  public AdminService admin;

  @Autowired
  private SimpMessagingTemplate template;

  // Scheduled metric push every second using Web Sockets
  @Scheduled(fixedRate = 1000)
  public void metrics() throws ExecutionException, InterruptedException {
    // System.out.println("scheduled");
    // if Kafka Cluster is Live
    if (admin.isLive()) {
      this.template.convertAndSend("/topic/metrics", admin.metrics());
    }
  }

  // test for web socket message broker connectivity
  @MessageMapping("/test")
  @SendTo("/topic/metrics")
  public Map<String, Object> greeting(Map<String, Object> message) throws Exception {
    System.out.println(message.get("message"));
    return message;
  }

}