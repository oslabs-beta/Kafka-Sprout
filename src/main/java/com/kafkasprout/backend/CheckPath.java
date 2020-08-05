package com.kafkasprout.backend;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.Properties;

public class CheckPath {

  public void storePath(String path) throws FileNotFoundException, IOException {
    FileInputStream input = null;
    FileOutputStream output = null;
    Properties props = new Properties();

    try {
      input = new FileInputStream("src/main/java/com/example/demo/path.properties");
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

  public String retrievePath() throws FileNotFoundException, IOException {
    FileInputStream input = null;
    Properties props = null;

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

    return props.getProperty("path");
  }

  public void storeProperties(HashMap<String, Object> payload) throws FileNotFoundException, IOException {
    FileInputStream input = null;
    FileOutputStream output = null;
    Properties props = new Properties();

    try {
      input = new FileInputStream("src/main/java/com/example/demo/path.properties");
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

  public Hashtable retrieveProperties() throws FileNotFoundException, IOException {
    FileInputStream input = null;
    Properties props = null;

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