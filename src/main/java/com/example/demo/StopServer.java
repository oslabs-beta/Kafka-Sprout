package com.example.demo;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;


// NOT REALLY WORKING DON'T USE
public class StopServer {

  private static String OS = "windows 10";

  public StopServer(String OS) {
    this.OS = OS;
  }

  public static void main(String[] args) {
    String[] command = new String[1];
    command[0] = OS.contains("windows") ? "kafka-server-stop.bat" : "kafka-server-stop";
    //command[1] = "&&";
    //command[2] = OS.contains("windows") ? "zookeeper-server-stop.bat" : "zookeeper-server-stop";

    ProcessBuilder processBuilder = new ProcessBuilder(command);
    Process process;

    try {
      System.out.println("Killing server");
      process = processBuilder.start();
      BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
      String line;
      while ((line = reader.readLine()) != null) {
        System.out.println(line);
      }
      process.destroy();
      
    } catch (IOException e) {
      e.printStackTrace();
    }
  }

}