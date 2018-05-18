package com.eikesi.customer.service.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.eikesi.customer.service.service.CustomerService;
import com.eikesi.customer.service.web.rest.errors.BadRequestAlertException;
import com.eikesi.customer.service.web.rest.util.HeaderUtil;
import com.eikesi.customer.service.web.rest.util.PaginationUtil;
import com.eikesi.customer.service.service.dto.CustomerDTO;
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
 * rpc controller for managing Customer.
 */
@FeignClient(name = "customerService")
public class CustomerResourceFeignService {
    /**
     * POST  /customers : Create a new customer.
     *
     * @param customerDTO the customerDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new customerDTO, or with status 400 (Bad Request) if the customer has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/customers", method = RequestMethod.Post)
    public ResponseEntity<CustomerDTO> createCustomer(@Valid @RequestBody CustomerDTO customerDTO);

    /**
     * PUT  /customers : Updates an existing customer.
     *
     * @param customerDTO the customerDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated customerDTO,
     * or with status 400 (Bad Request) if the customerDTO is not valid,
     * or with status 500 (Internal Server Error) if the customerDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/customers", method = RequestMethod.Put)
    public ResponseEntity<CustomerDTO> updateCustomer(@RequestBody CustomerDTO customerDTO);

    /**
     * GET  /customers : get all the customers.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of customers in body
     */
    @RequestMapping(value = "/customers", method = RequestMethod.Get)
    public ResponseEntity<List<CustomerDTO>> getAllCustomers(Pageable pageable);

    /**
     * GET  /customers/:id : get the "id" customer.
     *
     * @param id the id of the customerDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the customerDTO, or with status 404 (Not Found)
     */
    @RequestMapping(value = "/customers/{id}", method = RequestMethod.Get)
    public ResponseEntity<CustomerDTO> getCustomer(@PathVariable Long id);

    /**
     * DELETE  /customers/:id : delete the "id" customer.
     *
     * @param id the id of the customerDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @RequestMapping(value = "/customers/{id}", method = RequestMethod.Delete)
    public ResponseEntity<Void> deleteCustomer(@PathVariable Long id);
}
