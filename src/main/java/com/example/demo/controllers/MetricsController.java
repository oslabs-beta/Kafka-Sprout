package com.example.demo.controllers;

import java.util.ArrayList;
import java.util.Map;
import java.util.concurrent.ExecutionException;

import com.example.demo.AdminService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class MetricsController {

  @Autowired
  public AdminService admin;

  @MessageMapping("/metrics")
  @SendTo("/topic/metrics")
  public Map<String, ArrayList> metrics() throws ExecutionException, InterruptedException {
    return admin.metrics();
  }

  @MessageMapping("/test")
  @SendTo("/topic/metrics")
  public Map<String, Object> greeting(Map<String, Object> message) throws Exception {
    System.out.println(message.get("message"));
    return message;
  }

}