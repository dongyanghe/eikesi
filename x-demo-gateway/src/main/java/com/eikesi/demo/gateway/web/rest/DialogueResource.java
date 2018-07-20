package com.eikesi.demo.gateway.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.eikesi.demo.gateway.service.DialogueService;
import com.eikesi.demo.gateway.web.rest.errors.BadRequestAlertException;
import com.eikesi.demo.gateway.web.rest.util.HeaderUtil;
import com.eikesi.demo.gateway.service.dto.DialogueDTO;
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
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing Dialogue.
 */
@RestController
@RequestMapping("/api")
public class DialogueResource {

    private final Logger log = LoggerFactory.getLogger(DialogueResource.class);

    private static final String ENTITY_NAME = "dialogue";

    private final DialogueService dialogueService;

    public DialogueResource(DialogueService dialogueService) {
        this.dialogueService = dialogueService;
    }

    /**
     * POST  /dialogues : Create a new dialogue.
     *
     * @param dialogueDTO the dialogueDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new dialogueDTO, or with status 400 (Bad Request) if the dialogue has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/dialogues")
    @Timed
    public ResponseEntity<DialogueDTO> createDialogue(@Valid @RequestBody DialogueDTO dialogueDTO) throws URISyntaxException {
        log.debug("REST request to save Dialogue : {}", dialogueDTO);
        if (dialogueDTO.getId() != null) {
            throw new BadRequestAlertException("A new dialogue cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DialogueDTO result = dialogueService.save(dialogueDTO);
        return ResponseEntity.created(new URI("/api/dialogues/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /dialogues : Updates an existing dialogue.
     *
     * @param dialogueDTO the dialogueDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated dialogueDTO,
     * or with status 400 (Bad Request) if the dialogueDTO is not valid,
     * or with status 500 (Internal Server Error) if the dialogueDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/dialogues")
    @Timed
    public ResponseEntity<DialogueDTO> updateDialogue(@Valid @RequestBody DialogueDTO dialogueDTO) throws URISyntaxException {
        log.debug("REST request to update Dialogue : {}", dialogueDTO);
        if (dialogueDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DialogueDTO result = dialogueService.save(dialogueDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, dialogueDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /dialogues : get all the dialogues.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of dialogues in body
     */
    @GetMapping("/dialogues")
    @Timed
    public List<DialogueDTO> getAllDialogues() {
        log.debug("REST request to get all Dialogues");
        return dialogueService.findAll();
    }

    /**
     * GET  /dialogues/:id : get the "id" dialogue.
     *
     * @param id the id of the dialogueDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the dialogueDTO, or with status 404 (Not Found)
     */
    @GetMapping("/dialogues/{id}")
    @Timed
    public ResponseEntity<DialogueDTO> getDialogue(@PathVariable Long id) {
        log.debug("REST request to get Dialogue : {}", id);
        Optional<DialogueDTO> dialogueDTO = dialogueService.findOne(id);
        return ResponseUtil.wrapOrNotFound(dialogueDTO);
    }

    /**
     * DELETE  /dialogues/:id : delete the "id" dialogue.
     *
     * @param id the id of the dialogueDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/dialogues/{id}")
    @Timed
    public ResponseEntity<Void> deleteDialogue(@PathVariable Long id) {
        log.debug("REST request to delete Dialogue : {}", id);
        dialogueService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/dialogues?query=:query : search for the dialogue corresponding
     * to the query.
     *
     * @param query the query of the dialogue search
     * @return the result of the search
     */
    @GetMapping("/_search/dialogues")
    @Timed
    public List<DialogueDTO> searchDialogues(@RequestParam String query) {
        log.debug("REST request to search Dialogues for query {}", query);
        return dialogueService.search(query);
    }

}
