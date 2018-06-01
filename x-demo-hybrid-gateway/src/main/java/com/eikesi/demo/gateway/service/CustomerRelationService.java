package com.eikesi.demo.gateway.service;

import com.eikesi.demo.gateway.domain.CustomerRelation;
import com.eikesi.demo.gateway.repository.CustomerRelationRepository;
import com.eikesi.demo.gateway.service.dto.CustomerRelationDTO;
import com.eikesi.demo.gateway.service.mapper.CustomerRelationMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing CustomerRelation.
 */
@Service
@Transactional
public class CustomerRelationService {

    private final Logger log = LoggerFactory.getLogger(CustomerRelationService.class);

    private final CustomerRelationRepository customerRelationRepository;

    private final CustomerRelationMapper customerRelationMapper;

    public CustomerRelationService(CustomerRelationRepository customerRelationRepository, CustomerRelationMapper customerRelationMapper) {
        this.customerRelationRepository = customerRelationRepository;
        this.customerRelationMapper = customerRelationMapper;
    }

    /**
     * Save a customerRelation.
     *
     * @param customerRelationDTO the entity to save
     * @return the persisted entity
     */
    public CustomerRelationDTO save(CustomerRelationDTO customerRelationDTO) {
        log.debug("Request to save CustomerRelation : {}", customerRelationDTO);
        CustomerRelation customerRelation = customerRelationMapper.toEntity(customerRelationDTO);
        customerRelation = customerRelationRepository.save(customerRelation);
        return customerRelationMapper.toDto(customerRelation);
    }

    /**
     * Get all the customerRelations.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<CustomerRelationDTO> findAll() {
        log.debug("Request to get all CustomerRelations");
        return customerRelationRepository.findAll().stream()
            .map(customerRelationMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one customerRelation by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public CustomerRelationDTO findOne(Long id) {
        log.debug("Request to get CustomerRelation : {}", id);
        CustomerRelation customerRelation = customerRelationRepository.findOne(id);
        return customerRelationMapper.toDto(customerRelation);
    }

    /**
     * Delete the customerRelation by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete CustomerRelation : {}", id);
        customerRelationRepository.delete(id);
    }
}
