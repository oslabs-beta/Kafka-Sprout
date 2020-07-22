package com.example.demo;

import org.apache.tomcat.jni.OS;

import java.io.*;
import java.util.HashMap;

public class StartBroker {

    public static String start(HashMap<String, Object> payload) {
        try {
            String fileName = "server" + payload.get("broker_id") + ".properties";
            File myObj = new File("C:\\kafka_2.13-2.5.0\\config\\" + fileName);
            if (myObj.createNewFile()) {
                System.out.println("File created: " + myObj.getName());
                return configure(fileName, payload);
            } else {
                System.out.println("File already exists.");
                return "select a different broker ID number";
            }
        } catch (IOException e) {
            System.out.println("An error occurred.");
            e.printStackTrace();
            return "an error occurred in starting a broker";
        }
    }


    public static String configure(String fileName, HashMap<String, Object> payload) {
        try {
            FileWriter myWriter = new FileWriter("C:\\kafka_2.13-2.5.0\\config\\" + fileName);
            myWriter.write("broker.id=" + payload.get("broker_id") + "\n" +
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
                    "log.dirs=" + payload.get("directory") + "\n" +
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
                    "listeners=" + payload.get("port") + "\n" +
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
            System.out.println("Successfully wrote broker configurations to the file.");
            return run(fileName);
        } catch (IOException e) {
            System.out.println("An error occurred in creating broker configuration file.");
            e.printStackTrace();
        }
    }

    public static String run(String fileName) {
        String OS = System.getProperty("os.name").toLowerCase();
        String[] command = new String[2];
        command[0] = OS.contains("windows") ? "kafka-server-start.bat" : "kafka-server-start";
        command[1] = path + fileName;

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
