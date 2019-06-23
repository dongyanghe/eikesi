package com.eikesi.im.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class ImMonolithicKafkaConsumer {

    private final Logger log = LoggerFactory.getLogger(ImMonolithicKafkaConsumer.class);
    private static final String TOPIC = "topic_immonolithic";

    @KafkaListener(topics = "topic_immonolithic", groupId = "group_id")
    public void consume(String message) throws IOException {
        log.info("Consumed message in {} : {}", TOPIC, message);
    }
}
