package com.example.demo;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class RunKafka {

  private String path;
  private String OS;

  public RunKafka(String path, String OS) {
    this.path = path;
    this.OS = OS;
  }

  public void run() {
    String[] command = new String[2];
    command[0] = OS.contains("windows") ? "kafka-server-start.bat" : "kafka-server-start";
    command[1] = path + "server.properties";

   ProcessBuilder processBuilder = new ProcessBuilder(command);

    try {
      System.out.println("Starting kafka server");
      Process process = processBuilder.start();
      BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
      String line;
      while ((line = reader.readLine()) != null) {
        System.out.println(line);
      }
    } catch (IOException e) {
      e.printStackTrace();
    }
  }

}
