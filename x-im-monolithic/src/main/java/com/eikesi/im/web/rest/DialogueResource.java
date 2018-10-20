package com.eikesi.im.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.eikesi.im.domain.Dialogue;
import com.eikesi.im.repository.DialogueRepository;
import com.eikesi.im.web.rest.errors.BadRequestAlertException;
import com.eikesi.im.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Dialogue.
 */
@RestController
@RequestMapping("/api")
public class DialogueResource {

    private final Logger log = LoggerFactory.getLogger(DialogueResource.class);

    private static final String ENTITY_NAME = "dialogue";

    private DialogueRepository dialogueRepository;

    public DialogueResource(DialogueRepository dialogueRepository) {
        this.dialogueRepository = dialogueRepository;
    }

    /**
     * POST  /dialogues : Create a new dialogue.
     *
     * @param dialogue the dialogue to create
     * @return the ResponseEntity with status 201 (Created) and with body the new dialogue, or with status 400 (Bad Request) if the dialogue has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/dialogues")
    @Timed
    public ResponseEntity<Dialogue> createDialogue(@Valid @RequestBody Dialogue dialogue) throws URISyntaxException {
        log.debug("REST request to save Dialogue : {}", dialogue);
        if (dialogue.getId() != null) {
            throw new BadRequestAlertException("A new dialogue cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Dialogue result = dialogueRepository.save(dialogue);
        return ResponseEntity.created(new URI("/api/dialogues/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /dialogues : Updates an existing dialogue.
     *
     * @param dialogue the dialogue to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated dialogue,
     * or with status 400 (Bad Request) if the dialogue is not valid,
     * or with status 500 (Internal Server Error) if the dialogue couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/dialogues")
    @Timed
    public ResponseEntity<Dialogue> updateDialogue(@Valid @RequestBody Dialogue dialogue) throws URISyntaxException {
        log.debug("REST request to update Dialogue : {}", dialogue);
        if (dialogue.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Dialogue result = dialogueRepository.save(dialogue);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, dialogue.getId().toString()))
            .body(result);
    }

    /**
     * GET  /dialogues : get all the dialogues.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of dialogues in body
     */
    @GetMapping("/dialogues")
    @Timed
    public List<Dialogue> getAllDialogues() {
        log.debug("REST request to get all Dialogues");
        return dialogueRepository.findAll();
    }

    /**
     * GET  /dialogues/:id : get the "id" dialogue.
     *
     * @param id the id of the dialogue to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the dialogue, or with status 404 (Not Found)
     */
    @GetMapping("/dialogues/{id}")
    @Timed
    public ResponseEntity<Dialogue> getDialogue(@PathVariable Long id) {
        log.debug("REST request to get Dialogue : {}", id);
        Optional<Dialogue> dialogue = dialogueRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(dialogue);
    }

    /**
     * DELETE  /dialogues/:id : delete the "id" dialogue.
     *
     * @param id the id of the dialogue to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/dialogues/{id}")
    @Timed
    public ResponseEntity<Void> deleteDialogue(@PathVariable Long id) {
        log.debug("REST request to delete Dialogue : {}", id);

        dialogueRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
