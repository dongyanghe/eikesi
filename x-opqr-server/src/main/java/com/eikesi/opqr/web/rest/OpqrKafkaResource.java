package com.eikesi.opqr.web.rest;

import com.eikesi.opqr.service.OpqrKafkaProducer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/opqr-kafka")
public class OpqrKafkaResource {

    private final Logger log = LoggerFactory.getLogger(OpqrKafkaResource.class);

    private OpqrKafkaProducer kafkaProducer;

    public OpqrKafkaResource(OpqrKafkaProducer kafkaProducer) {
        this.kafkaProducer = kafkaProducer;
    }

    @PostMapping(value = "/publish")
    public void sendMessageToKafkaTopic(@RequestParam("message") String message) {
        log.debug("REST request to send to Kafka topic the message : {}", message);
        this.kafkaProducer.sendMessage(message);
    }
}
