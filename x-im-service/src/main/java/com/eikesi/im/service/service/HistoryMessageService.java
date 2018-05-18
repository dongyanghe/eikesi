package com.eikesi.im.service.service;

import com.eikesi.im.service.domain.HistoryMessage;
import com.eikesi.im.service.repository.HistoryMessageRepository;
import com.eikesi.im.service.service.dto.HistoryMessageDTO;
import com.eikesi.im.service.service.mapper.HistoryMessageMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing HistoryMessage.
 */
@Service
@Transactional
public class HistoryMessageService {

    private final Logger log = LoggerFactory.getLogger(HistoryMessageService.class);

    private final HistoryMessageRepository historyMessageRepository;

    private final HistoryMessageMapper historyMessageMapper;

    public HistoryMessageService(HistoryMessageRepository historyMessageRepository, HistoryMessageMapper historyMessageMapper) {
        this.historyMessageRepository = historyMessageRepository;
        this.historyMessageMapper = historyMessageMapper;
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
        return historyMessageMapper.toDto(historyMessage);
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
    public HistoryMessageDTO findOne(Long id) {
        log.debug("Request to get HistoryMessage : {}", id);
        HistoryMessage historyMessage = historyMessageRepository.findOne(id);
        return historyMessageMapper.toDto(historyMessage);
    }

    /**
     * Delete the historyMessage by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete HistoryMessage : {}", id);
        historyMessageRepository.delete(id);
    }
}
