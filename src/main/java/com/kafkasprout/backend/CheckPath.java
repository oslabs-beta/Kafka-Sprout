package com.kafkasprout.backend;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.Properties;

public class CheckPath {

  private FileInputStream input;
  private FileOutputStream output;
  private Properties props;
  

  public CheckPath() throws FileNotFoundException, IOException {
    try {
      File pathProperties = new File("src/main/java/com/kafkasprout/backend/path.properties");
      if (pathProperties.createNewFile()) {
        System.out.println("path.properties has been successfully created.");
      } else {
        System.out.println("path.properties already exists.");
      }
    } catch (IOException e) {
      System.out.println("Error creating new file.");
      e.printStackTrace();
    }
    
    props = new Properties();
    input = new FileInputStream("src/main/java/com/kafkasprout/backend/path.properties");
    output = new FileOutputStream("src/main/java/com/kafkasprout/backend/path.properties");

    try {
      props.load(input);
    } catch(FileNotFoundException fnfe) {
      fnfe.printStackTrace();
    } catch(IOException ioe) {
      ioe.printStackTrace();
    } finally {
      input.close();
    }

    try {
      output = new FileOutputStream("src/main/java/com/example/demo/path.properties");
      props.setProperty("path", "");
      props.setProperty("port", "9093");
      props.setProperty("id", "1");
      props.setProperty("logPath", "");

      props.store(output, null);
    } catch(FileNotFoundException fnfe) {
      fnfe.printStackTrace();
    } catch(IOException ioe) {
      ioe.printStackTrace();
    } finally {
      output.close();
    }
  }

  // Method for overwritting the path key in the path.properties file. It will be updated every time a Zookeeper server is started.
  public void storePath(String path) throws FileNotFoundException, IOException {
    try {
      props.load(input);
    } catch(FileNotFoundException fnfe) {
      fnfe.printStackTrace();
    } catch(IOException ioe) {
      ioe.printStackTrace();
    } finally {
      input.close();
    }

    try {
      props.setProperty("path", path);
      props.store(output, null);
    } catch(FileNotFoundException fnfe) {
      fnfe.printStackTrace();
    } catch(IOException ioe) {
      ioe.printStackTrace();
    } finally {
    output.close();
    }
  }

  // Method for retrieving the path for all the Kafka properties files.
  public String retrievePath() throws FileNotFoundException, IOException {
    try {
      props.load(input);
    } catch(FileNotFoundException fnfe) {
      fnfe.printStackTrace();
    } catch(IOException ioe) {
      ioe.printStackTrace();
    } finally {
      input.close();
    }

    return props.getProperty("path");
  }

  // Method for overwriting the path for log files, new port number, and broker ID when starting up a Kafka cluster.
  public void storeProperties(HashMap<String, Object> payload) throws FileNotFoundException, IOException {
    try {
      props.load(input);
    } catch(FileNotFoundException fnfe) {
      fnfe.printStackTrace();
    } catch(IOException ioe) {
      ioe.printStackTrace();
    } finally {
      input.close();
    }

    try {
      output = new FileOutputStream("src/main/java/com/example/demo/path.properties");
      props.setProperty("path", (String) payload.get("properties"));
      props.setProperty("port", Integer.toString(Integer.parseInt((String) payload.get("port")) + 1));
      props.setProperty("id", Integer.toString(Integer.parseInt((String) payload.get("broker_id")) + 1));
      props.setProperty("logPath", (String) payload.get("directory"));

      props.store(output, null);
    } catch(FileNotFoundException fnfe) {
      fnfe.printStackTrace();
    } catch(IOException ioe) {
      ioe.printStackTrace();
    } finally {
      output.close();
    }
  }

  // Method for retrieving all data pertinent to starting Kafka cluster from path.properties file.
  public Hashtable retrieveProperties() throws FileNotFoundException, IOException {
    try {
      input = new FileInputStream("src/main/java/com/example/demo/path.properties");
      props = new Properties();
      props.load(input);
    } catch(FileNotFoundException fnfe) {
      fnfe.printStackTrace();
    } catch(IOException ioe) {
      ioe.printStackTrace();
    } finally {
      input.close();
    }

    return props;
  }

}