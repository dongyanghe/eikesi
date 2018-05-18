package com.eikesi.demo.gateway.service;

import com.eikesi.demo.gateway.domain.FlockRelation;
import com.eikesi.demo.gateway.repository.FlockRelationRepository;
import com.eikesi.demo.gateway.service.dto.FlockRelationDTO;
import com.eikesi.demo.gateway.service.mapper.FlockRelationMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing FlockRelation.
 */
@Service
@Transactional
public class FlockRelationService {

    private final Logger log = LoggerFactory.getLogger(FlockRelationService.class);

    private final FlockRelationRepository flockRelationRepository;

    private final FlockRelationMapper flockRelationMapper;

    public FlockRelationService(FlockRelationRepository flockRelationRepository, FlockRelationMapper flockRelationMapper) {
        this.flockRelationRepository = flockRelationRepository;
        this.flockRelationMapper = flockRelationMapper;
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
        return flockRelationMapper.toDto(flockRelation);
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
    public FlockRelationDTO findOne(Long id) {
        log.debug("Request to get FlockRelation : {}", id);
        FlockRelation flockRelation = flockRelationRepository.findOne(id);
        return flockRelationMapper.toDto(flockRelation);
    }

    /**
     * Delete the flockRelation by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete FlockRelation : {}", id);
        flockRelationRepository.delete(id);
    }
}
