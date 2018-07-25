package com.eikesi.im.desktop.service;

import com.eikesi.im.desktop.domain.FlockRelation;
import com.eikesi.im.desktop.repository.FlockRelationRepository;
import com.eikesi.im.desktop.repository.search.FlockRelationSearchRepository;
import com.eikesi.im.desktop.service.dto.FlockRelationDTO;
import com.eikesi.im.desktop.service.mapper.FlockRelationMapper;
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
 * Service Implementation for managing FlockRelation.
 */
@Service
@Transactional
public class FlockRelationService {

    private final Logger log = LoggerFactory.getLogger(FlockRelationService.class);

    private final FlockRelationRepository flockRelationRepository;

    private final FlockRelationMapper flockRelationMapper;

    private final FlockRelationSearchRepository flockRelationSearchRepository;

    public FlockRelationService(FlockRelationRepository flockRelationRepository, FlockRelationMapper flockRelationMapper, FlockRelationSearchRepository flockRelationSearchRepository) {
        this.flockRelationRepository = flockRelationRepository;
        this.flockRelationMapper = flockRelationMapper;
        this.flockRelationSearchRepository = flockRelationSearchRepository;
    }

    /**
     * Save a flockRelation.
     *
     * @param flockRelationDTO the entity to save
     * @return the persisted entity
     */
    public FlockRelationDTO save(FlockRelationDTO flockRelationDTO) {
        log.debug("Request to save FlockRelation : {}", flockRelationDTO);
        FlockRelation flockRelation = flockRelationMapper.toEntity(flockRelationDTO);
        flockRelation = flockRelationRepository.save(flockRelation);
        FlockRelationDTO result = flockRelationMapper.toDto(flockRelation);
        flockRelationSearchRepository.save(flockRelation);
        return result;
    }

    /**
     * Get all the flockRelations.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<FlockRelationDTO> findAll() {
        log.debug("Request to get all FlockRelations");
        return flockRelationRepository.findAll().stream()
            .map(flockRelationMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one flockRelation by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<FlockRelationDTO> findOne(Long id) {
        log.debug("Request to get FlockRelation : {}", id);
        return flockRelationRepository.findById(id)
            .map(flockRelationMapper::toDto);
    }

    /**
     * Delete the flockRelation by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete FlockRelation : {}", id);
        flockRelationRepository.deleteById(id);
        flockRelationSearchRepository.deleteById(id);
    }

    /**
     * Search for the flockRelation corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<FlockRelationDTO> search(String query) {
        log.debug("Request to search FlockRelations for query {}", query);
        return StreamSupport
            .stream(flockRelationSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(flockRelationMapper::toDto)
            .collect(Collectors.toList());
    }
}
