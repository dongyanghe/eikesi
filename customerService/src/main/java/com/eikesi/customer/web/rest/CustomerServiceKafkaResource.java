package com.eikesi.customer.web.rest;

import com.eikesi.customer.service.CustomerServiceKafkaProducer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/customer-service-kafka")
public class CustomerServiceKafkaResource {

    private final Logger log = LoggerFactory.getLogger(CustomerServiceKafkaResource.class);

    private CustomerServiceKafkaProducer kafkaProducer;

    public CustomerServiceKafkaResource(CustomerServiceKafkaProducer kafkaProducer) {
        this.kafkaProducer = kafkaProducer;
    }

    @PostMapping(value = "/publish")
    public void sendMessageToKafkaTopic(@RequestParam("message") String message) {
        log.debug("REST request to send to Kafka topic the message : {}", message);
        this.kafkaProducer.sendMessage(message);
    }
}
