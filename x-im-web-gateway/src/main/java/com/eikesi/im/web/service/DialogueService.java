package com.eikesi.im.web.service;

import com.eikesi.im.web.domain.Dialogue;
import com.eikesi.im.web.repository.DialogueRepository;
import com.eikesi.im.web.repository.search.DialogueSearchRepository;
import com.eikesi.im.web.service.dto.DialogueDTO;
import com.eikesi.im.web.service.mapper.DialogueMapper;
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
 * Service Implementation for managing Dialogue.
 */
@Service
@Transactional
public class DialogueService {

    private final Logger log = LoggerFactory.getLogger(DialogueService.class);

    private final DialogueRepository dialogueRepository;

    private final DialogueMapper dialogueMapper;

    private final DialogueSearchRepository dialogueSearchRepository;

    public DialogueService(DialogueRepository dialogueRepository, DialogueMapper dialogueMapper, DialogueSearchRepository dialogueSearchRepository) {
        this.dialogueRepository = dialogueRepository;
        this.dialogueMapper = dialogueMapper;
        this.dialogueSearchRepository = dialogueSearchRepository;
    }

    /**
     * Save a dialogue.
     *
     * @param dialogueDTO the entity to save
     * @return the persisted entity
     */
    public DialogueDTO save(DialogueDTO dialogueDTO) {
        log.debug("Request to save Dialogue : {}", dialogueDTO);
        Dialogue dialogue = dialogueMapper.toEntity(dialogueDTO);
        dialogue = dialogueRepository.save(dialogue);
        DialogueDTO result = dialogueMapper.toDto(dialogue);
        dialogueSearchRepository.save(dialogue);
        return result;
    }

    /**
     * Get all the dialogues.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<DialogueDTO> findAll() {
        log.debug("Request to get all Dialogues");
        return dialogueRepository.findAll().stream()
            .map(dialogueMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one dialogue by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<DialogueDTO> findOne(Long id) {
        log.debug("Request to get Dialogue : {}", id);
        return dialogueRepository.findById(id)
            .map(dialogueMapper::toDto);
    }

    /**
     * Delete the dialogue by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Dialogue : {}", id);
        dialogueRepository.deleteById(id);
        dialogueSearchRepository.deleteById(id);
    }

    /**
     * Search for the dialogue corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<DialogueDTO> search(String query) {
        log.debug("Request to search Dialogues for query {}", query);
        return StreamSupport
            .stream(dialogueSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(dialogueMapper::toDto)
            .collect(Collectors.toList());
    }
}
