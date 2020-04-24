package com.eikesi.abcd.web.rest;

import com.eikesi.abcd.service.AbcdKafkaProducer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/abcd-kafka")
public class AbcdKafkaResource {

    private final Logger log = LoggerFactory.getLogger(AbcdKafkaResource.class);

    private AbcdKafkaProducer kafkaProducer;

    public AbcdKafkaResource(AbcdKafkaProducer kafkaProducer) {
        this.kafkaProducer = kafkaProducer;
    }

    @PostMapping(value = "/publish")
    public void sendMessageToKafkaTopic(@RequestParam("message") String message) {
        log.debug("REST request to send to Kafka topic the message : {}", message);
        this.kafkaProducer.sendMessage(message);
    }
}
