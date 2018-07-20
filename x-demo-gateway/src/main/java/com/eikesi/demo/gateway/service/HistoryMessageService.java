package com.eikesi.demo.gateway.service;

import com.eikesi.demo.gateway.domain.HistoryMessage;
import com.eikesi.demo.gateway.repository.HistoryMessageRepository;
import com.eikesi.demo.gateway.repository.search.HistoryMessageSearchRepository;
import com.eikesi.demo.gateway.service.dto.HistoryMessageDTO;
import com.eikesi.demo.gateway.service.mapper.HistoryMessageMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.Optional;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing HistoryMessage.
 */
@Service
@Transactional
public class HistoryMessageService {

    private final Logger log = LoggerFactory.getLogger(HistoryMessageService.class);

    private final HistoryMessageRepository historyMessageRepository;

    private final HistoryMessageMapper historyMessageMapper;

    private final HistoryMessageSearchRepository historyMessageSearchRepository;

    public HistoryMessageService(HistoryMessageRepository historyMessageRepository, HistoryMessageMapper historyMessageMapper, HistoryMessageSearchRepository historyMessageSearchRepository) {
        this.historyMessageRepository = historyMessageRepository;
        this.historyMessageMapper = historyMessageMapper;
        this.historyMessageSearchRepository = historyMessageSearchRepository;
    }

    /**
     * Save a historyMessage.
     *
     * @param historyMessageDTO the entity to save
     * @return the persisted entity
     */
    public HistoryMessageDTO save(HistoryMessageDTO historyMessageDTO) {
        log.debug("Request to save HistoryMessage : {}", historyMessageDTO);
        HistoryMessage historyMessage = historyMessageMapper.toEntity(historyMessageDTO);
        historyMessage = historyMessageRepository.save(historyMessage);
        HistoryMessageDTO result = historyMessageMapper.toDto(historyMessage);
        historyMessageSearchRepository.save(historyMessage);
        return result;
    }

    /**
     * Get all the historyMessages.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<HistoryMessageDTO> findAll(Pageable pageable) {
        log.debug("Request to get all HistoryMessages");
        return historyMessageRepository.findAll(pageable)
            .map(historyMessageMapper::toDto);
    }


    /**
     * Get one historyMessage by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<HistoryMessageDTO> findOne(Long id) {
        log.debug("Request to get HistoryMessage : {}", id);
        return historyMessageRepository.findById(id)
            .map(historyMessageMapper::toDto);
    }

    /**
     * Delete the historyMessage by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete HistoryMessage : {}", id);
        historyMessageRepository.deleteById(id);
        historyMessageSearchRepository.deleteById(id);
    }

    /**
     * Search for the historyMessage corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<HistoryMessageDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of HistoryMessages for query {}", query);
        return historyMessageSearchRepository.search(queryStringQuery(query), pageable)
            .map(historyMessageMapper::toDto);
    }
}
