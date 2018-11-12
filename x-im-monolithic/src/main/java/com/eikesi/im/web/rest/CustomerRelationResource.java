package com.eikesi.im.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.eikesi.im.domain.CustomerRelation;
import com.eikesi.im.repository.CustomerRelationRepository;
import com.eikesi.im.web.rest.errors.BadRequestAlertException;
import com.eikesi.im.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing CustomerRelation.
 */
@RestController
@RequestMapping("/api")
public class CustomerRelationResource {

    private final Logger log = LoggerFactory.getLogger(CustomerRelationResource.class);

    private static final String ENTITY_NAME = "customerRelation";

    private CustomerRelationRepository customerRelationRepository;

    public CustomerRelationResource(CustomerRelationRepository customerRelationRepository) {
        this.customerRelationRepository = customerRelationRepository;
    }

    /**
     * POST  /customer-relations : Create a new customerRelation.
     *
     * @param customerRelation the customerRelation to create
     * @return the ResponseEntity with status 201 (Created) and with body the new customerRelation, or with status 400 (Bad Request) if the customerRelation has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/customer-relations")
    @Timed
    public ResponseEntity<CustomerRelation> createCustomerRelation(@Valid @RequestBody CustomerRelation customerRelation) throws URISyntaxException {
        log.debug("REST request to save CustomerRelation : {}", customerRelation);
        if (customerRelation.getId() != null) {
            throw new BadRequestAlertException("A new customerRelation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CustomerRelation result = customerRelationRepository.save(customerRelation);
        return ResponseEntity.created(new URI("/api/customer-relations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /customer-relations : Updates an existing customerRelation.
     *
     * @param customerRelation the customerRelation to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated customerRelation,
     * or with status 400 (Bad Request) if the customerRelation is not valid,
     * or with status 500 (Internal Server Error) if the customerRelation couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/customer-relations")
    @Timed
    public ResponseEntity<CustomerRelation> updateCustomerRelation(@Valid @RequestBody CustomerRelation customerRelation) throws URISyntaxException {
        log.debug("REST request to update CustomerRelation : {}", customerRelation);
        if (customerRelation.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CustomerRelation result = customerRelationRepository.save(customerRelation);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, customerRelation.getId().toString()))
            .body(result);
    }

    /**
     * GET  /customer-relations : get all the customerRelations.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of customerRelations in body
     */
    @GetMapping("/customer-relations")
    @Timed
    public List<CustomerRelation> getAllCustomerRelations() {
        log.debug("REST request to get all CustomerRelations");
        return customerRelationRepository.findAll();
    }

    /**
     * GET  /customer-relations/:id : get the "id" customerRelation.
     *
     * @param id the id of the customerRelation to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the customerRelation, or with status 404 (Not Found)
     */
    @GetMapping("/customer-relations/{id}")
    @Timed
    public ResponseEntity<CustomerRelation> getCustomerRelation(@PathVariable Long id) {
        log.debug("REST request to get CustomerRelation : {}", id);
        Optional<CustomerRelation> customerRelation = customerRelationRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(customerRelation);
    }

    /**
     * DELETE  /customer-relations/:id : delete the "id" customerRelation.
     *
     * @param id the id of the customerRelation to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/customer-relations/{id}")
    @Timed
    public ResponseEntity<Void> deleteCustomerRelation(@PathVariable Long id) {
        log.debug("REST request to delete CustomerRelation : {}", id);

        customerRelationRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
