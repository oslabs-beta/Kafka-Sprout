package com.kafkasprout.backend;

import com.kafkasprout.backend.controllers.ClusterController;
import com.kafkasprout.backend.controllers.MetricsController;
import com.kafkasprout.backend.controllers.TopicsController;
import com.kafkasprout.backend.controllers.ViewController;
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

    @Autowired
    private ViewController viewController;

    @Autowired
    private MetricsController metricsController;

    @Test
    public void contextLoads() throws Exception{
        assertThat(clusterController).isNotNull();
        assertThat(viewController).isNotNull();
        assertThat(metricsController).isNotNull();
        assertThat(topicsController).isNotNull();
    }
}
