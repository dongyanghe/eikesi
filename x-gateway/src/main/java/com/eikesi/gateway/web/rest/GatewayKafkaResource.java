package com.eikesi.gateway.web.rest;

import com.eikesi.gateway.service.GatewayKafkaProducer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/gateway-kafka")
public class GatewayKafkaResource {

    private final Logger log = LoggerFactory.getLogger(GatewayKafkaResource.class);

    private GatewayKafkaProducer kafkaProducer;

    public GatewayKafkaResource(GatewayKafkaProducer kafkaProducer) {
        this.kafkaProducer = kafkaProducer;
    }

    @PostMapping(value = "/publish")
    public void sendMessageToKafkaTopic(@RequestParam("message") String message) {
        log.debug("REST request to send to Kafka topic the message : {}", message);
        this.kafkaProducer.sendMessage(message);
    }
}
