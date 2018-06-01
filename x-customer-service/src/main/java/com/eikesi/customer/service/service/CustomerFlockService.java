package com.eikesi.customer.service.service;

import com.eikesi.customer.service.domain.CustomerFlock;
import com.eikesi.customer.service.repository.CustomerFlockRepository;
import com.eikesi.customer.service.service.dto.CustomerFlockDTO;
import com.eikesi.customer.service.service.mapper.CustomerFlockMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing CustomerFlock.
 */
@Service
@Transactional
public class CustomerFlockService {

    private final Logger log = LoggerFactory.getLogger(CustomerFlockService.class);

    private final CustomerFlockRepository customerFlockRepository;

    private final CustomerFlockMapper customerFlockMapper;

    public CustomerFlockService(CustomerFlockRepository customerFlockRepository, CustomerFlockMapper customerFlockMapper) {
        this.customerFlockRepository = customerFlockRepository;
        this.customerFlockMapper = customerFlockMapper;
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
        return customerFlockMapper.toDto(customerFlock);
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
    public CustomerFlockDTO findOne(Long id) {
        log.debug("Request to get CustomerFlock : {}", id);
        CustomerFlock customerFlock = customerFlockRepository.findOne(id);
        return customerFlockMapper.toDto(customerFlock);
    }

    /**
     * Delete the customerFlock by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete CustomerFlock : {}", id);
        customerFlockRepository.delete(id);
    }
}
