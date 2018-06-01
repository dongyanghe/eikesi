package com.eikesi.im.service.service;

import com.eikesi.im.service.domain.Dialogue;
import com.eikesi.im.service.repository.DialogueRepository;
import com.eikesi.im.service.service.dto.DialogueDTO;
import com.eikesi.im.service.service.mapper.DialogueMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Dialogue.
 */
@Service
@Transactional
public class DialogueService {

    private final Logger log = LoggerFactory.getLogger(DialogueService.class);

    private final DialogueRepository dialogueRepository;

    private final DialogueMapper dialogueMapper;

    public DialogueService(DialogueRepository dialogueRepository, DialogueMapper dialogueMapper) {
        this.dialogueRepository = dialogueRepository;
        this.dialogueMapper = dialogueMapper;
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
        return dialogueMapper.toDto(dialogue);
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
    public DialogueDTO findOne(Long id) {
        log.debug("Request to get Dialogue : {}", id);
        Dialogue dialogue = dialogueRepository.findOne(id);
        return dialogueMapper.toDto(dialogue);
    }

    /**
     * Delete the dialogue by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Dialogue : {}", id);
        dialogueRepository.delete(id);
    }
}
