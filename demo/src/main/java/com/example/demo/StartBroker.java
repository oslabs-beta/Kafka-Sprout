package com.example.demo;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

public class StartBroker {
    public static void main(String[] args) {
        try {
            int brokerNum = 5;
            String broker = "server" + brokerNum + ".properties";
            File myObj = new File("C:\\kafka_2.13-2.5.0\\config\\" + broker);
            if (myObj.createNewFile()) {
                System.out.println("File created: " + myObj.getName());
                configure(brokerNum);
            } else {
                System.out.println("File already exists.");
            }
        } catch (IOException e) {
            System.out.println("An error occurred.");
            e.printStackTrace();
        }
    }


    public static void configure(int brokerNum) {
        try {
            String broker = "server" + brokerNum + ".properties";
            FileWriter myWriter = new FileWriter("C:\\kafka_2.13-2.5.0\\config\\" + broker);
            myWriter.write("broker.id="+brokerNum+"\n" +
                    "\n" +
                    "num.network.threads=3\n" +
                    "\n" +
                    "num.io.threads=8\n" +
                    "\n" +
                    "socket.send.buffer.bytes=102400\n" +
                    "\n" +
                    "socket.receive.buffer.bytes=102400\n" +
                    "\n" +
                    "socket.request.max.bytes=104857600\n" +
                    "\n" +
                    "log.dirs=C:/kafka_2.13-2.5.0/data/kafka2\n" +
                    "\n" +
                    "num.partitions=3\n" +
                    "\n" +
                    "num.recovery.threads.per.data.dir=1\n" +
                    "\n" +
                    "offsets.topic.replication.factor=1\n" +
                    "\n" +
                    "transaction.state.log.replication.factor=1\n" +
                    "\n" +
                    "transaction.state.log.min.isr=1\n" +
                    "\n" +
                    "log.retention.hours=168\n" +
                    "\n" +
                    "listeners=PLAINTEXT://:9093\n" +
                    "\n" +
                    "log.segment.bytes=1073741824\n" +
                    "\n" +
                    "log.retention.check.interval.ms=300000\n" +
                    "\n" +
                    "zookeeper.connect=localhost:2181\n" +
                    "\n" +
                    "zookeeper.connection.timeout.ms=18000\n" +
                    "\n" +
                    "group.initial.rebalance.delay.ms=0\n");
            myWriter.close();
            System.out.println("Successfully wrote to the file.");
        } catch (IOException e) {
            System.out.println("An error occurred.");
            e.printStackTrace();
        }
    }


}
