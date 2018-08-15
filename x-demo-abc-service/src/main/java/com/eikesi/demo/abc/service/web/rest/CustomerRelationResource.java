package com.eikesi.demoABC.service.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.eikesi.demoABC.service.service.CustomerRelationService;
import com.eikesi.demoABC.service.web.rest.errors.BadRequestAlertException;
import com.eikesi.demoABC.service.web.rest.util.HeaderUtil;
import com.eikesi.demoABC.service.service.dto.CustomerRelationDTO;
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
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing CustomerRelation.
 */
@RestController
@RequestMapping("/api")
public class CustomerRelationResource {

    private final Logger log = LoggerFactory.getLogger(CustomerRelationResource.class);

    private static final String ENTITY_NAME = "customerRelation";

    private final CustomerRelationService customerRelationService;

    public CustomerRelationResource(CustomerRelationService customerRelationService) {
        this.customerRelationService = customerRelationService;
    }

    /**
     * POST  /customer-relations : Create a new customerRelation.
     *
     * @param customerRelationDTO the customerRelationDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new customerRelationDTO, or with status 400 (Bad Request) if the customerRelation has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/customer-relations")
    @Timed
    public ResponseEntity<CustomerRelationDTO> createCustomerRelation(@Valid @RequestBody CustomerRelationDTO customerRelationDTO) throws URISyntaxException {
        log.debug("REST request to save CustomerRelation : {}", customerRelationDTO);
        if (customerRelationDTO.getId() != null) {
            throw new BadRequestAlertException("A new customerRelation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CustomerRelationDTO result = customerRelationService.save(customerRelationDTO);
        return ResponseEntity.created(new URI("/api/customer-relations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /customer-relations : Updates an existing customerRelation.
     *
     * @param customerRelationDTO the customerRelationDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated customerRelationDTO,
     * or with status 400 (Bad Request) if the customerRelationDTO is not valid,
     * or with status 500 (Internal Server Error) if the customerRelationDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/customer-relations")
    @Timed
    public ResponseEntity<CustomerRelationDTO> updateCustomerRelation(@Valid @RequestBody CustomerRelationDTO customerRelationDTO) throws URISyntaxException {
        log.debug("REST request to update CustomerRelation : {}", customerRelationDTO);
        if (customerRelationDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CustomerRelationDTO result = customerRelationService.save(customerRelationDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, customerRelationDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /customer-relations : get all the customerRelations.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of customerRelations in body
     */
    @GetMapping("/customer-relations")
    @Timed
    public List<CustomerRelationDTO> getAllCustomerRelations() {
        log.debug("REST request to get all CustomerRelations");
        return customerRelationService.findAll();
    }

    /**
     * GET  /customer-relations/:id : get the "id" customerRelation.
     *
     * @param id the id of the customerRelationDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the customerRelationDTO, or with status 404 (Not Found)
     */
    @GetMapping("/customer-relations/{id}")
    @Timed
    public ResponseEntity<CustomerRelationDTO> getCustomerRelation(@PathVariable Long id) {
        log.debug("REST request to get CustomerRelation : {}", id);
        Optional<CustomerRelationDTO> customerRelationDTO = customerRelationService.findOne(id);
        return ResponseUtil.wrapOrNotFound(customerRelationDTO);
    }

    /**
     * DELETE  /customer-relations/:id : delete the "id" customerRelation.
     *
     * @param id the id of the customerRelationDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/customer-relations/{id}")
    @Timed
    public ResponseEntity<Void> deleteCustomerRelation(@PathVariable Long id) {
        log.debug("REST request to delete CustomerRelation : {}", id);
        customerRelationService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/customer-relations?query=:query : search for the customerRelation corresponding
     * to the query.
     *
     * @param query the query of the customerRelation search
     * @return the result of the search
     */
    @GetMapping("/_search/customer-relations")
    @Timed
    public List<CustomerRelationDTO> searchCustomerRelations(@RequestParam String query) {
        log.debug("REST request to search CustomerRelations for query {}", query);
        return customerRelationService.search(query);
    }

}
