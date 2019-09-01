package com.eikesi.system.web.rest;

import com.eikesi.system.service.SystemServiceKafkaProducer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/system-service-kafka")
public class SystemServiceKafkaResource {

    private final Logger log = LoggerFactory.getLogger(SystemServiceKafkaResource.class);

    private SystemServiceKafkaProducer kafkaProducer;

    public SystemServiceKafkaResource(SystemServiceKafkaProducer kafkaProducer) {
        this.kafkaProducer = kafkaProducer;
    }

    @PostMapping(value = "/publish")
    public void sendMessageToKafkaTopic(@RequestParam("message") String message) {
        log.debug("REST request to send to Kafka topic the message : {}", message);
        this.kafkaProducer.sendMessage(message);
    }
}
