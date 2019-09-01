package com.eikesi.im.web.rest;

import com.eikesi.im.service.ImMonolithicKafkaProducer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/im-monolithic-kafka")
public class ImMonolithicKafkaResource {

    private final Logger log = LoggerFactory.getLogger(ImMonolithicKafkaResource.class);

    private ImMonolithicKafkaProducer kafkaProducer;

    public ImMonolithicKafkaResource(ImMonolithicKafkaProducer kafkaProducer) {
        this.kafkaProducer = kafkaProducer;
    }

    @PostMapping(value = "/publish")
    public void sendMessageToKafkaTopic(@RequestParam("message") String message) {
        log.debug("REST request to send to Kafka topic the message : {}", message);
        this.kafkaProducer.sendMessage(message);
    }
}
