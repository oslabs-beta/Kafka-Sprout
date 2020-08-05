package com.kafkasprout.backend;

import com.kafkasprout.backend.controllers.ClusterController;
import com.kafkasprout.backend.controllers.TopicsController;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class SmokeTests {
    @Autowired
    private ClusterController clusterController;

    @Autowired
    private TopicsController topicsController;

    @Test
    public void contextLoads() throws Exception{
        assertThat(clusterController).isNotNull();
        assertThat(topicsController).isNotNull();
    }
}
