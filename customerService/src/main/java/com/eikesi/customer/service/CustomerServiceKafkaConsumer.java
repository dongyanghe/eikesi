package com.eikesi.customer.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class CustomerServiceKafkaConsumer {

    private final Logger log = LoggerFactory.getLogger(CustomerServiceKafkaConsumer.class);
    private static final String TOPIC = "topic_customerservice";

    @KafkaListener(topics = "topic_customerservice", groupId = "group_id")
    public void consume(String message) throws IOException {
        log.info("Consumed message in {} : {}", TOPIC, message);
    }
}
