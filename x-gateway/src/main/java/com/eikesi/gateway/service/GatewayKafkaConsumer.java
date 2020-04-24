package com.eikesi.gateway.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class GatewayKafkaConsumer {

    private final Logger log = LoggerFactory.getLogger(GatewayKafkaConsumer.class);
    private static final String TOPIC = "topic_gateway";

    @KafkaListener(topics = "topic_gateway", groupId = "group_id")
    public void consume(String message) throws IOException {
        log.info("Consumed message in {} : {}", TOPIC, message);
    }
}
