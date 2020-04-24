package com.eikesi.abcd.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class AbcdKafkaConsumer {

    private final Logger log = LoggerFactory.getLogger(AbcdKafkaConsumer.class);
    private static final String TOPIC = "topic_abcd";

    @KafkaListener(topics = "topic_abcd", groupId = "group_id")
    public void consume(String message) throws IOException {
        log.info("Consumed message in {} : {}", TOPIC, message);
    }
}
