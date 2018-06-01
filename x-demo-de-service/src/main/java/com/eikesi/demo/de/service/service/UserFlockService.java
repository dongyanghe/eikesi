package com.eikesi.demo.de.service.service;

import com.eikesi.demo.de.service.domain.UserFlock;
import com.eikesi.demo.de.service.repository.UserFlockRepository;
import com.eikesi.demo.de.service.service.dto.UserFlockDTO;
import com.eikesi.demo.de.service.service.mapper.UserFlockMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing UserFlock.
 */
@Service
@Transactional
public class UserFlockService {

    private final Logger log = LoggerFactory.getLogger(UserFlockService.class);

    private final UserFlockRepository userFlockRepository;

    private final UserFlockMapper userFlockMapper;

    public UserFlockService(UserFlockRepository userFlockRepository, UserFlockMapper userFlockMapper) {
        this.userFlockRepository = userFlockRepository;
        this.userFlockMapper = userFlockMapper;
    }

    /**
     * Save a userFlock.
     *
     * @param userFlockDTO the entity to save
     * @return the persisted entity
     */
    public UserFlockDTO save(UserFlockDTO userFlockDTO) {
        log.debug("Request to save UserFlock : {}", userFlockDTO);
        UserFlock userFlock = userFlockMapper.toEntity(userFlockDTO);
        userFlock = userFlockRepository.save(userFlock);
        return userFlockMapper.toDto(userFlock);
    }

    /**
     * Get all the userFlocks.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<UserFlockDTO> findAll() {
        log.debug("Request to get all UserFlocks");
        return userFlockRepository.findAll().stream()
            .map(userFlockMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one userFlock by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public UserFlockDTO findOne(Long id) {
        log.debug("Request to get UserFlock : {}", id);
        UserFlock userFlock = userFlockRepository.findOne(id);
        return userFlockMapper.toDto(userFlock);
    }

    /**
     * Delete the userFlock by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete UserFlock : {}", id);
        userFlockRepository.delete(id);
    }
}
