package com.example.lol;

public class Main {

  public static void main(String[] args) {
    String configPath = "C:\\kafka_2.12-2.5.0\\config\\";
    String OS = System.getProperty("os.name").toLowerCase();

    Status checkStatus = new Status(OS);
    String status = checkStatus.run();

    System.out.println(status);

//     RunZoo zooThread = new RunZoo(configPath, OS);
//     zooThread.run();
  }
}
