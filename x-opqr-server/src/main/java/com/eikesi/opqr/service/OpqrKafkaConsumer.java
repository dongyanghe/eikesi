package com.eikesi.opqr.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class OpqrKafkaConsumer {

    private final Logger log = LoggerFactory.getLogger(OpqrKafkaConsumer.class);
    private static final String TOPIC = "topic_opqr";

    @KafkaListener(topics = "topic_opqr", groupId = "group_id")
    public void consume(String message) throws IOException {
        log.info("Consumed message in {} : {}", TOPIC, message);
    }
}
