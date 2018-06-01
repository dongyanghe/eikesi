package com.eikesi.im.gateway.service;

import com.eikesi.im.gateway.service.dto.CustomerDTO;
import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * rpc controller for managing Customer.
 */
@FeignClient(name = "customerService")
public interface CustomerFeignService {
    /**
     * POST  /customers : Create a new customer.
     *
     * @param customerDTO the customerDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new customerDTO, or with status 400 (Bad Request) if the customer has already an ID
     */
    @RequestMapping(value = "/customers", method = RequestMethod.POST)
    public ResponseEntity<CustomerDTO> createCustomer(@RequestBody CustomerDTO customerDTO);

    /**
     * PUT  /customers : Updates an existing customer.
     *
     * @param customerDTO the customerDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated customerDTO,
     * or with status 400 (Bad Request) if the customerDTO is not valid,
     * or with status 500 (Internal Server Error) if the customerDTO couldn't be updated
     */
    @RequestMapping(value = "/customers", method = RequestMethod.PUT)
    public ResponseEntity<CustomerDTO> updateCustomer(CustomerDTO customerDTO);

    /**
     * GET  /customers : get all the customers.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of customers in body
     */
    @RequestMapping(value = "/customers", method = RequestMethod.GET)
    public ResponseEntity<List<CustomerDTO>> getAllCustomers(Pageable pageable);

    /**
     * GET  /customers/:id : get the "id" customer.
     *
     * @param id the id of the customerDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the customerDTO, or with status 404 (Not Found)
     */
    @RequestMapping(value = "/customers/{id}", method = RequestMethod.GET)
    public ResponseEntity<CustomerDTO> getCustomer(@PathVariable Long id);

    /**
     * DELETE  /customers/:id : delete the "id" customer.
     *
     * @param id the id of the customerDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @RequestMapping(value = "/customers/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Void> deleteCustomer(@PathVariable Long id);
}
