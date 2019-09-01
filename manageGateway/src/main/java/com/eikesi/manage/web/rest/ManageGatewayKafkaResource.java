package com.eikesi.manage.web.rest;

import com.eikesi.manage.service.ManageGatewayKafkaProducer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/manage-gateway-kafka")
public class ManageGatewayKafkaResource {

    private final Logger log = LoggerFactory.getLogger(ManageGatewayKafkaResource.class);

    private ManageGatewayKafkaProducer kafkaProducer;

    public ManageGatewayKafkaResource(ManageGatewayKafkaProducer kafkaProducer) {
        this.kafkaProducer = kafkaProducer;
    }

    @PostMapping(value = "/publish")
    public void sendMessageToKafkaTopic(@RequestParam("message") String message) {
        log.debug("REST request to send to Kafka topic the message : {}", message);
        this.kafkaProducer.sendMessage(message);
    }
}
