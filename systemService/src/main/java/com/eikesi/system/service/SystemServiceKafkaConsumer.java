package com.eikesi.system.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class SystemServiceKafkaConsumer {

    private final Logger log = LoggerFactory.getLogger(SystemServiceKafkaConsumer.class);
    private static final String TOPIC = "topic_systemservice";

    @KafkaListener(topics = "topic_systemservice", groupId = "group_id")
    public void consume(String message) throws IOException {
        log.info("Consumed message in {} : {}", TOPIC, message);
    }
}
