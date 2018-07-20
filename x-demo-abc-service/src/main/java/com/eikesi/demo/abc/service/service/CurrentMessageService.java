package com.eikesi.demoABC.service.service;

import com.eikesi.demoABC.service.domain.CurrentMessage;
import com.eikesi.demoABC.service.repository.CurrentMessageRepository;
import com.eikesi.demoABC.service.repository.search.CurrentMessageSearchRepository;
import com.eikesi.demoABC.service.service.dto.CurrentMessageDTO;
import com.eikesi.demoABC.service.service.mapper.CurrentMessageMapper;
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
 * Service Implementation for managing CurrentMessage.
 */
@Service
@Transactional
public class CurrentMessageService {

    private final Logger log = LoggerFactory.getLogger(CurrentMessageService.class);

    private final CurrentMessageRepository currentMessageRepository;

    private final CurrentMessageMapper currentMessageMapper;

    private final CurrentMessageSearchRepository currentMessageSearchRepository;

    public CurrentMessageService(CurrentMessageRepository currentMessageRepository, CurrentMessageMapper currentMessageMapper, CurrentMessageSearchRepository currentMessageSearchRepository) {
        this.currentMessageRepository = currentMessageRepository;
        this.currentMessageMapper = currentMessageMapper;
        this.currentMessageSearchRepository = currentMessageSearchRepository;
    }

    /**
     * Save a currentMessage.
     *
     * @param currentMessageDTO the entity to save
     * @return the persisted entity
     */
    public CurrentMessageDTO save(CurrentMessageDTO currentMessageDTO) {
        log.debug("Request to save CurrentMessage : {}", currentMessageDTO);
        CurrentMessage currentMessage = currentMessageMapper.toEntity(currentMessageDTO);
        currentMessage = currentMessageRepository.save(currentMessage);
        CurrentMessageDTO result = currentMessageMapper.toDto(currentMessage);
        currentMessageSearchRepository.save(currentMessage);
        return result;
    }

    /**
     * Get all the currentMessages.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<CurrentMessageDTO> findAll() {
        log.debug("Request to get all CurrentMessages");
        return currentMessageRepository.findAll().stream()
            .map(currentMessageMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one currentMessage by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<CurrentMessageDTO> findOne(Long id) {
        log.debug("Request to get CurrentMessage : {}", id);
        return currentMessageRepository.findById(id)
            .map(currentMessageMapper::toDto);
    }

    /**
     * Delete the currentMessage by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete CurrentMessage : {}", id);
        currentMessageRepository.deleteById(id);
        currentMessageSearchRepository.deleteById(id);
    }

    /**
     * Search for the currentMessage corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<CurrentMessageDTO> search(String query) {
        log.debug("Request to search CurrentMessages for query {}", query);
        return StreamSupport
            .stream(currentMessageSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(currentMessageMapper::toDto)
            .collect(Collectors.toList());
    }
}
