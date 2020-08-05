package com.kafkasprout.backend;

import static org.assertj.core.api.Assertions.assertThat;

import com.kafkasprout.backend.controllers.ClusterController;
import com.kafkasprout.backend.controllers.ViewController;
import com.kafkasprout.backend.controllers.TopicsController;
import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class SmokeTests {
    @Autowired
    private ClusterController clusterController;

    @Autowired
    private ViewController viewController;

    @Autowired
    private TopicsController topicsController;

    @Test
    public void contextLoads() throws Exception{
        assertThat(clusterController).isNotNull();
        assertThat(viewController).isNotNull();
        assertThat(topicsController).isNotNull();
    }
}
