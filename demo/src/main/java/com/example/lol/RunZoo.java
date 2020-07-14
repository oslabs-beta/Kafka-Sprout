package com.example.lol;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.concurrent.locks.ReentrantLock;

public class RunZoo extends Thread {

  private String path;
  private ReentrantLock serverLock;

    public RunZoo(String path, ReentrantLock serverLock) {
      this.path = path;
      this.serverLock = serverLock;
    }

  @Override
  public void run() {

    String[] command = { "zookeeper-server-start.bat", path + "zookeeper.properties" };
    ProcessBuilder processBuilder = new ProcessBuilder(command);

    try {
      serverLock.lock();
      System.out.println("Starting Zookeeper server");
      Process process = processBuilder.start();
      BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
      String line;
      while ((line = reader.readLine()) != null) {
        System.out.println(line);
        if (line.contains("binding to port")) {
          System.out.println("Zookeeper available and bound to port");
          serverLock.unlock();
        }
      }

      // int exitCode = process.waitFor();
      // System.out.println ("\nExited with error code : " + exitCode);
    } catch (IOException e) {
      e.printStackTrace();
    }
  }
}
