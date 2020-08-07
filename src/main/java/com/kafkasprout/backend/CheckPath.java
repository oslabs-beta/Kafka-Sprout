package com.kafkasprout.backend;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.Properties;

import org.springframework.stereotype.Service;

@Service
public class CheckPath {

  private Properties props;
  private File propsFile;

  public CheckPath() throws FileNotFoundException, IOException {
    this.props = new Properties();
    this.propsFile = new File("src/main/java/com/kafkasprout/backend/path.properties");

    try {
      if (!this.propsFile.exists()) {
        this.propsFile.createNewFile();
        System.out.println("path.properties has been successfully created.");
        this.props.setProperty("path", "");
        this.props.setProperty("port", "9093");
        this.props.setProperty("id", "1");
        this.props.setProperty("logPath", "");
        OutputStream output = new FileOutputStream(propsFile);
        this.props.store(output, null);
        output.close();
      }
      InputStream input = new FileInputStream(propsFile);
      this.props.load(input);
      input.close();
    } catch (IOException e) {
      System.out.println("Error creating new file.");
      e.printStackTrace();
    }
  }

  // Method for overwritting the path key in the path.properties file. It will be
  // updated every time a Zookeeper server is started.
  public void storePath(String path) throws FileNotFoundException, IOException {
    OutputStream output = null;
    try {
      output = new FileOutputStream(this.propsFile);
      this.props.setProperty("path", path);
      this.props.store(output, null);
    } catch (FileNotFoundException fnfe) {
      fnfe.printStackTrace();
    } catch (IOException ioe) {
      ioe.printStackTrace();
    } finally {
      output.close();
    }
  }

  // Method for retrieving the path for all the Kafka properties files.
  public String retrievePath() throws FileNotFoundException, IOException {
    return this.props.getProperty("path");
  }

  // Method for overwriting the path for log files, new port number, and broker ID
  // when starting up a Kafka cluster.
  public void storeProperties(HashMap<String, Object> payload) throws FileNotFoundException, IOException {
    OutputStream output = null;
    System.out.println(payload.get("properties"));
    try {
      props.setProperty("path", (String) payload.get("properties"));
      props.setProperty("port", Integer.toString(Integer.parseInt((String) payload.get("port")) + 1));
      props.setProperty("id", Integer.toString(Integer.parseInt((String) payload.get("broker_id")) + 1));
      props.setProperty("logPath", (String) payload.get("directory"));
      output = new FileOutputStream(this.propsFile);
      props.store(output, null);
    } catch (FileNotFoundException fnfe) {
      fnfe.printStackTrace();
    } catch (IOException ioe) {
      ioe.printStackTrace();
    } finally {
      output.close();
    }
  }

  // Method for retrieving all data pertinent to starting Kafka cluster from
  // path.properties file.
  public Hashtable retrieveProperties() throws FileNotFoundException, IOException {
    return props;
  }

}