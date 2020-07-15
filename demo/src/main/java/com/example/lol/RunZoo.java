package com.example.lol;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.concurrent.locks.ReentrantLock;

public class RunZoo extends Thread {

  private String path;
  private String OS;
  private ReentrantLock serverLock;

    public RunZoo(String path, String OS, ReentrantLock serverLock) {
      this.path = path;
      this.OS = OS;
      this.serverLock = serverLock;
    }

  @Override
  public void run() {
    String[] command = new String[2];
    command[0] = OS.contains("windows") ? "zookeeper-server-start.bat" : "zookeeper-server-start";
    command[1] = path + "zookeeper.properties";

    //String[] command = { "zookeeper-server-start.bat", path + "zookeeper.properties" };
    ProcessBuilder processBuilder = new ProcessBuilder(command);

    try {
      //serverLock.lock();
      System.out.println("Starting Zookeeper server");
      Process process = processBuilder.start();
      BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
      String line;
      while ((line = reader.readLine()) != null) {
        System.out.println(line);
        if (line.contains("binding to port")) {
          System.out.println("Zookeeper available and bound to port");
          //serverLock.unlock();
          RunKafka kafkaThread = new RunKafka(path, OS, serverLock);
          kafkaThread.start();
        }
      }

      // int exitCode = process.waitFor();
      // System.out.println ("\nExited with error code : " + exitCode);
    } catch (IOException e) {
      e.printStackTrace();
    } finally {
      serverLock.unlock();
    }
  }
}
