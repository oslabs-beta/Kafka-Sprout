package com.kafkasprout.backend;

import org.springframework.beans.factory.annotation.Autowired;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;

public class StartBroker {

  @Autowired
  AdminService admin;

    public static String start(HashMap<String, Object> payload) {
        try {
            String fileName = "server" + payload.get("broker_id") + ".properties";
            String pathName = payload.get("properties") + File.separator + fileName;
            System.out.println(pathName);
            File myObj = new File(pathName);
            if (myObj.createNewFile()) {
                System.out.println("File created: " + myObj.getName());
                return configure(fileName, payload);
            } else {
                System.out.println("File already exists.");
                return String.valueOf(run(payload.get("properties") + File.separator + fileName));
            }
        } catch (IOException e) {
            System.out.println("An error occurred.");
            e.printStackTrace();
            return "an error occurred in starting a broker";
        }
    }

    public static void mkdir(String directory) throws IOException {
        System.out.println(directory + "*******************");
        Path path = Paths.get(directory);

        if (!Files.exists(path)) {

            Files.createDirectory(path);
            System.out.println("Directory created");
        } else {

            System.out.println("Directory already exists");
        }
    }

    public static String configure(String fileName, HashMap<String, Object> payload) throws IOException {
        mkdir((String) payload.get("directory") + "/kafka" + payload.get("broker_id"));

        try {
            String propertiesPath = payload.get("properties") + File.separator + fileName;
            FileWriter myWriter = new FileWriter(propertiesPath);
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
                    "log.dirs=" + payload.get("directory") + "/kafka" + payload.get("broker_id") + "\n" +
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
                    "listeners=PLAINTEXT://:" + payload.get("port") + "\n" +
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
            return String.valueOf(run(propertiesPath));
        } catch (IOException e) {
            System.out.println("An error occurred in creating broker configuration file.");
            e.printStackTrace();
            return "An error occurred in creating broker configuration file.";
        }
    }

    public static boolean run(String propertiesPath) {
        String OS = System.getProperty("os.name").toLowerCase();
        String[] command = new String[2];
        command[0] = OS.contains("windows") ? "kafka-server-start.bat" : "kafka-server-start";
        command[1] = propertiesPath;

        ProcessBuilder processBuilder = new ProcessBuilder(command);

        try {
            System.out.println("Starting kafka server");
            Process process = processBuilder.start();
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
                if (line.matches(".*KafkaServer id=\\d+] started.*")) {
                    return true;
                }
            }

        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
        return false;
    }


}
