package com.eikesi.manage.service;

import com.eikesi.manage.domain.CustomerRelation;
import com.eikesi.manage.repository.CustomerRelationRepository;
import com.eikesi.manage.repository.search.CustomerRelationSearchRepository;
import com.eikesi.manage.service.dto.CustomerRelationDTO;
import com.eikesi.manage.service.mapper.CustomerRelationMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing CustomerRelation.
 */
@Service
@Transactional
public class CustomerRelationService {

    private final Logger log = LoggerFactory.getLogger(CustomerRelationService.class);

    private final CustomerRelationRepository customerRelationRepository;

    private final CustomerRelationMapper customerRelationMapper;

    private final CustomerRelationSearchRepository customerRelationSearchRepository;

    public CustomerRelationService(CustomerRelationRepository customerRelationRepository, CustomerRelationMapper customerRelationMapper, CustomerRelationSearchRepository customerRelationSearchRepository) {
        this.customerRelationRepository = customerRelationRepository;
        this.customerRelationMapper = customerRelationMapper;
        this.customerRelationSearchRepository = customerRelationSearchRepository;
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
        CustomerRelationDTO result = customerRelationMapper.toDto(customerRelation);
        customerRelationSearchRepository.save(customerRelation);
        return result;
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
    public Optional<CustomerRelationDTO> findOne(Long id) {
        log.debug("Request to get CustomerRelation : {}", id);
        return customerRelationRepository.findById(id)
            .map(customerRelationMapper::toDto);
    }

    /**
     * Delete the customerRelation by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete CustomerRelation : {}", id);
        customerRelationRepository.deleteById(id);
        customerRelationSearchRepository.deleteById(id);
    }

    /**
     * Search for the customerRelation corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<CustomerRelationDTO> search(String query) {
        log.debug("Request to search CustomerRelations for query {}", query);
        return StreamSupport
            .stream(customerRelationSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(customerRelationMapper::toDto)
            .collect(Collectors.toList());
    }
}
