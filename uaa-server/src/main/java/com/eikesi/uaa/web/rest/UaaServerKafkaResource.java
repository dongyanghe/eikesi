package com.eikesi.uaa.web.rest;

import com.eikesi.uaa.service.UaaServerKafkaProducer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/uaa-server-kafka")
public class UaaServerKafkaResource {

    private final Logger log = LoggerFactory.getLogger(UaaServerKafkaResource.class);

    private UaaServerKafkaProducer kafkaProducer;

    public UaaServerKafkaResource(UaaServerKafkaProducer kafkaProducer) {
        this.kafkaProducer = kafkaProducer;
    }

    @PostMapping(value = "/publish")
    public void sendMessageToKafkaTopic(@RequestParam("message") String message) {
        log.debug("REST request to send to Kafka topic the message : {}", message);
        this.kafkaProducer.sendMessage(message);
    }
}
