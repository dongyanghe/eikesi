package com.eikesi.demo.gateway.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.eikesi.demo.gateway.service.CustomerFlockService;
import com.eikesi.demo.gateway.web.rest.errors.BadRequestAlertException;
import com.eikesi.demo.gateway.web.rest.util.HeaderUtil;
import com.eikesi.demo.gateway.web.rest.util.PaginationUtil;
import com.eikesi.demo.gateway.service.dto.CustomerFlockDTO;
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

    private final CustomerFlockService customerFlockService;

    public CustomerFlockResource(CustomerFlockService customerFlockService) {
        this.customerFlockService = customerFlockService;
    }

    /**
     * POST  /customer-flocks : Create a new customerFlock.
     *
     * @param customerFlockDTO the customerFlockDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new customerFlockDTO, or with status 400 (Bad Request) if the customerFlock has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/customer-flocks")
    @Timed
    public ResponseEntity<CustomerFlockDTO> createCustomerFlock(@Valid @RequestBody CustomerFlockDTO customerFlockDTO) throws URISyntaxException {
        log.debug("REST request to save CustomerFlock : {}", customerFlockDTO);
        if (customerFlockDTO.getId() != null) {
            throw new BadRequestAlertException("A new customerFlock cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CustomerFlockDTO result = customerFlockService.save(customerFlockDTO);
        return ResponseEntity.created(new URI("/api/customer-flocks/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /customer-flocks : Updates an existing customerFlock.
     *
     * @param customerFlockDTO the customerFlockDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated customerFlockDTO,
     * or with status 400 (Bad Request) if the customerFlockDTO is not valid,
     * or with status 500 (Internal Server Error) if the customerFlockDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/customer-flocks")
    @Timed
    public ResponseEntity<CustomerFlockDTO> updateCustomerFlock(@Valid @RequestBody CustomerFlockDTO customerFlockDTO) throws URISyntaxException {
        log.debug("REST request to update CustomerFlock : {}", customerFlockDTO);
        if (customerFlockDTO.getId() == null) {
            return createCustomerFlock(customerFlockDTO);
        }
        CustomerFlockDTO result = customerFlockService.save(customerFlockDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, customerFlockDTO.getId().toString()))
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
    public ResponseEntity<List<CustomerFlockDTO>> getAllCustomerFlocks(Pageable pageable) {
        log.debug("REST request to get a page of CustomerFlocks");
        Page<CustomerFlockDTO> page = customerFlockService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/customer-flocks");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /customer-flocks/:id : get the "id" customerFlock.
     *
     * @param id the id of the customerFlockDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the customerFlockDTO, or with status 404 (Not Found)
     */
    @GetMapping("/customer-flocks/{id}")
    @Timed
    public ResponseEntity<CustomerFlockDTO> getCustomerFlock(@PathVariable Long id) {
        log.debug("REST request to get CustomerFlock : {}", id);
        CustomerFlockDTO customerFlockDTO = customerFlockService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(customerFlockDTO));
    }

    /**
     * DELETE  /customer-flocks/:id : delete the "id" customerFlock.
     *
     * @param id the id of the customerFlockDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/customer-flocks/{id}")
    @Timed
    public ResponseEntity<Void> deleteCustomerFlock(@PathVariable Long id) {
        log.debug("REST request to delete CustomerFlock : {}", id);
        customerFlockService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
