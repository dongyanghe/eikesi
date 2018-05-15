package com.eikesi.demo.abc.service.service;

import com.eikesi.demo.abc.service.domain.UserRelation;
import com.eikesi.demo.abc.service.repository.UserRelationRepository;
import com.eikesi.demo.abc.service.service.dto.UserRelationDTO;
import com.eikesi.demo.abc.service.service.mapper.UserRelationMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing UserRelation.
 */
@Service
@Transactional
public class UserRelationService {

    private final Logger log = LoggerFactory.getLogger(UserRelationService.class);

    private final UserRelationRepository userRelationRepository;

    private final UserRelationMapper userRelationMapper;

    public UserRelationService(UserRelationRepository userRelationRepository, UserRelationMapper userRelationMapper) {
        this.userRelationRepository = userRelationRepository;
        this.userRelationMapper = userRelationMapper;
    }

    /**
     * Save a userRelation.
     *
     * @param userRelationDTO the entity to save
     * @return the persisted entity
     */
    public UserRelationDTO save(UserRelationDTO userRelationDTO) {
        log.debug("Request to save UserRelation : {}", userRelationDTO);
        UserRelation userRelation = userRelationMapper.toEntity(userRelationDTO);
        userRelation = userRelationRepository.save(userRelation);
        return userRelationMapper.toDto(userRelation);
    }

    /**
     * Get all the userRelations.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<UserRelationDTO> findAll() {
        log.debug("Request to get all UserRelations");
        return userRelationRepository.findAll().stream()
            .map(userRelationMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one userRelation by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public UserRelationDTO findOne(Long id) {
        log.debug("Request to get UserRelation : {}", id);
        UserRelation userRelation = userRelationRepository.findOne(id);
        return userRelationMapper.toDto(userRelation);
    }

    /**
     * Delete the userRelation by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete UserRelation : {}", id);
        userRelationRepository.delete(id);
    }
}
