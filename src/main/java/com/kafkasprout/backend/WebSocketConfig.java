package com.kafkasprout.backend;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

  // Configure Message Broker for WebSocket Metrics Functionality
  @Override
  public void configureMessageBroker(MessageBrokerRegistry config){ 
    config.enableSimpleBroker("/topic/");
    config.setApplicationDestinationPrefixes("/app");
  }

  // Create a STOMP Connection for WebSocket Metrics Functionality
  @Override
  public void registerStompEndpoints(StompEndpointRegistry registry) {
    registry.addEndpoint("/socketConnect").withSockJS();
  }

}