package com.eikesi.demo.gateway.service;

import com.eikesi.demo.gateway.domain.CustomerFlock;
import com.eikesi.demo.gateway.repository.CustomerFlockRepository;
import com.eikesi.demo.gateway.repository.search.CustomerFlockSearchRepository;
import com.eikesi.demo.gateway.service.dto.CustomerFlockDTO;
import com.eikesi.demo.gateway.service.mapper.CustomerFlockMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.Optional;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing CustomerFlock.
 */
@Service
@Transactional
public class CustomerFlockService {

    private final Logger log = LoggerFactory.getLogger(CustomerFlockService.class);

    private final CustomerFlockRepository customerFlockRepository;

    private final CustomerFlockMapper customerFlockMapper;

    private final CustomerFlockSearchRepository customerFlockSearchRepository;

    public CustomerFlockService(CustomerFlockRepository customerFlockRepository, CustomerFlockMapper customerFlockMapper, CustomerFlockSearchRepository customerFlockSearchRepository) {
        this.customerFlockRepository = customerFlockRepository;
        this.customerFlockMapper = customerFlockMapper;
        this.customerFlockSearchRepository = customerFlockSearchRepository;
    }

    /**
     * Save a customerFlock.
     *
     * @param customerFlockDTO the entity to save
     * @return the persisted entity
     */
    public CustomerFlockDTO save(CustomerFlockDTO customerFlockDTO) {
        log.debug("Request to save CustomerFlock : {}", customerFlockDTO);
        CustomerFlock customerFlock = customerFlockMapper.toEntity(customerFlockDTO);
        customerFlock = customerFlockRepository.save(customerFlock);
        CustomerFlockDTO result = customerFlockMapper.toDto(customerFlock);
        customerFlockSearchRepository.save(customerFlock);
        return result;
    }

    /**
     * Get all the customerFlocks.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<CustomerFlockDTO> findAll(Pageable pageable) {
        log.debug("Request to get all CustomerFlocks");
        return customerFlockRepository.findAll(pageable)
            .map(customerFlockMapper::toDto);
    }


    /**
     * Get one customerFlock by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<CustomerFlockDTO> findOne(Long id) {
        log.debug("Request to get CustomerFlock : {}", id);
        return customerFlockRepository.findById(id)
            .map(customerFlockMapper::toDto);
    }

    /**
     * Delete the customerFlock by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete CustomerFlock : {}", id);
        customerFlockRepository.deleteById(id);
        customerFlockSearchRepository.deleteById(id);
    }

    /**
     * Search for the customerFlock corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<CustomerFlockDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of CustomerFlocks for query {}", query);
        return customerFlockSearchRepository.search(queryStringQuery(query), pageable)
            .map(customerFlockMapper::toDto);
    }
}
