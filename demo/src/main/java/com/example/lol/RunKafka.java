package com.example.lol;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.concurrent.locks.ReentrantLock;

public class RunKafka extends Thread {

  private String path;
  private ReentrantLock serverLock;

  public RunKafka(String path, ReentrantLock serverLock) {
    this.path = path;
    this.serverLock = serverLock;
  }

  @Override
  public void run() {

    String[] command = { "kafka-server-start.bat", path + "server.properties" };
    ProcessBuilder processBuilder = new ProcessBuilder(command);

    try {
      serverLock.lock();
      System.out.println("Starting kafka server");
      Process process = processBuilder.start();
      serverLock.unlock();
      BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
      String line;
      while ((line = reader.readLine()) != null) {
        System.out.println(line);
      }
      // int exitCode = process.waitFor();
      // System.out.println ("\nExited with error code : " + exitCode);
    } catch (IOException e) {
      e.printStackTrace();
    }
    // } catch (InterruptedException e) {
    // e.printStackTrace();
    // }
  }

}
