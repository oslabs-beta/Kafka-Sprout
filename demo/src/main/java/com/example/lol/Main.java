package com.example.lol;

import java.util.concurrent.locks.ReentrantLock;

public class Main {

  public static void main(String[] args) {
    ReentrantLock serverLock = new ReentrantLock();
    String configPath = "C:\\kafka_2.12-2.5.0\\config\\";
    RunZoo zooThread = new RunZoo(configPath, serverLock);
    RunKafka kafkaThread = new RunKafka(configPath, serverLock);
    zooThread.start();
    kafkaThread.start();
  }
}
