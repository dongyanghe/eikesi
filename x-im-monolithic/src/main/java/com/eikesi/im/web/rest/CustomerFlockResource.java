package com.eikesi.im.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.eikesi.im.domain.CustomerFlock;
import com.eikesi.im.repository.CustomerFlockRepository;
import com.eikesi.im.web.rest.errors.BadRequestAlertException;
import com.eikesi.im.web.rest.util.HeaderUtil;
import com.eikesi.im.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing CustomerFlock.
 */
@RestController
@RequestMapping("/api")
public class CustomerFlockResource {

    private final Logger log = LoggerFactory.getLogger(CustomerFlockResource.class);

    private static final String ENTITY_NAME = "customerFlock";

    private CustomerFlockRepository customerFlockRepository;

    public CustomerFlockResource(CustomerFlockRepository customerFlockRepository) {
        this.customerFlockRepository = customerFlockRepository;
    }

    /**
     * POST  /customer-flocks : Create a new customerFlock.
     *
     * @param customerFlock the customerFlock to create
     * @return the ResponseEntity with status 201 (Created) and with body the new customerFlock, or with status 400 (Bad Request) if the customerFlock has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/customer-flocks")
    @Timed
    public ResponseEntity<CustomerFlock> createCustomerFlock(@Valid @RequestBody CustomerFlock customerFlock) throws URISyntaxException {
        log.debug("REST request to save CustomerFlock : {}", customerFlock);
        if (customerFlock.getId() != null) {
            throw new BadRequestAlertException("A new customerFlock cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CustomerFlock result = customerFlockRepository.save(customerFlock);
        return ResponseEntity.created(new URI("/api/customer-flocks/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /customer-flocks : Updates an existing customerFlock.
     *
     * @param customerFlock the customerFlock to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated customerFlock,
     * or with status 400 (Bad Request) if the customerFlock is not valid,
     * or with status 500 (Internal Server Error) if the customerFlock couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/customer-flocks")
    @Timed
    public ResponseEntity<CustomerFlock> updateCustomerFlock(@Valid @RequestBody CustomerFlock customerFlock) throws URISyntaxException {
        log.debug("REST request to update CustomerFlock : {}", customerFlock);
        if (customerFlock.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CustomerFlock result = customerFlockRepository.save(customerFlock);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, customerFlock.getId().toString()))
            .body(result);
    }

    /**
     * GET  /customer-flocks : get all the customerFlocks.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of customerFlocks in body
     */
    @GetMapping("/customer-flocks")
    @Timed
    public ResponseEntity<List<CustomerFlock>> getAllCustomerFlocks(Pageable pageable) {
        log.debug("REST request to get a page of CustomerFlocks");
        Page<CustomerFlock> page = customerFlockRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/customer-flocks");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /customer-flocks/:id : get the "id" customerFlock.
     *
     * @param id the id of the customerFlock to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the customerFlock, or with status 404 (Not Found)
     */
    @GetMapping("/customer-flocks/{id}")
    @Timed
    public ResponseEntity<CustomerFlock> getCustomerFlock(@PathVariable Long id) {
        log.debug("REST request to get CustomerFlock : {}", id);
        Optional<CustomerFlock> customerFlock = customerFlockRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(customerFlock);
    }

    /**
     * DELETE  /customer-flocks/:id : delete the "id" customerFlock.
     *
     * @param id the id of the customerFlock to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/customer-flocks/{id}")
    @Timed
    public ResponseEntity<Void> deleteCustomerFlock(@PathVariable Long id) {
        log.debug("REST request to delete CustomerFlock : {}", id);

        customerFlockRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
