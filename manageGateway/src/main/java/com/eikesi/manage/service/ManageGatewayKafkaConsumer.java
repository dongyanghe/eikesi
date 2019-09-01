package com.eikesi.manage.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class ManageGatewayKafkaConsumer {

    private final Logger log = LoggerFactory.getLogger(ManageGatewayKafkaConsumer.class);
    private static final String TOPIC = "topic_managegateway";

    @KafkaListener(topics = "topic_managegateway", groupId = "group_id")
    public void consume(String message) throws IOException {
        log.info("Consumed message in {} : {}", TOPIC, message);
    }
}
