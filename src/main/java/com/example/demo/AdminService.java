package com.example.demo;

import java.util.Properties;

import org.apache.kafka.clients.admin.AdminClient;
import org.apache.kafka.clients.admin.AdminClientConfig;
import org.springframework.stereotype.Component;

@Component
public class AdminService {

  private AdminClient admin;

  public AdminService() {
    Properties props = new Properties();
    props.setProperty(AdminClientConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
    this.admin = AdminClient.create(props);
  }
  
}