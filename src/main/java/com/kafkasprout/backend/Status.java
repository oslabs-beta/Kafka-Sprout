package com.kafkasprout.backend;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class Status {
    private String OS;

    public Status(String OS) {
        this.OS = OS;
    }

    public String run() {

        String status = "Offline";
        String[] command = new String[2];
        command[0] = OS.contains("windows") ? "zkServer.bat" : "zkServer";
        command[1] = "status";
    

        ProcessBuilder processBuilder = new ProcessBuilder(command);

        try {
            System.out.println("Checking ZooKeeper Server");
            Process process = processBuilder.start();
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line;
            while ((line = reader.readLine()) != null) {
                if(line.contains("Error")){
                    status = "Offline";
                    process.destroy();
                } else if(line.contains("Mode")){
                    status = "Online";
                    process.destroy();
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return status;
    }

}