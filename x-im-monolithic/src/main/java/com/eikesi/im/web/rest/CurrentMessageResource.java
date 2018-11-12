package com.eikesi.im.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.eikesi.im.domain.CurrentMessage;
import com.eikesi.im.repository.CurrentMessageRepository;
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
 * REST controller for managing CurrentMessage.
 */
@RestController
@RequestMapping("/api")
public class CurrentMessageResource {

    private final Logger log = LoggerFactory.getLogger(CurrentMessageResource.class);

    private static final String ENTITY_NAME = "currentMessage";

    private CurrentMessageRepository currentMessageRepository;

    public CurrentMessageResource(CurrentMessageRepository currentMessageRepository) {
        this.currentMessageRepository = currentMessageRepository;
    }

    /**
     * POST  /current-messages : Create a new currentMessage.
     *
     * @param currentMessage the currentMessage to create
     * @return the ResponseEntity with status 201 (Created) and with body the new currentMessage, or with status 400 (Bad Request) if the currentMessage has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/current-messages")
    @Timed
    public ResponseEntity<CurrentMessage> createCurrentMessage(@Valid @RequestBody CurrentMessage currentMessage) throws URISyntaxException {
        log.debug("REST request to save CurrentMessage : {}", currentMessage);
        if (currentMessage.getId() != null) {
            throw new BadRequestAlertException("A new currentMessage cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CurrentMessage result = currentMessageRepository.save(currentMessage);
        return ResponseEntity.created(new URI("/api/current-messages/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /current-messages : Updates an existing currentMessage.
     *
     * @param currentMessage the currentMessage to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated currentMessage,
     * or with status 400 (Bad Request) if the currentMessage is not valid,
     * or with status 500 (Internal Server Error) if the currentMessage couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/current-messages")
    @Timed
    public ResponseEntity<CurrentMessage> updateCurrentMessage(@Valid @RequestBody CurrentMessage currentMessage) throws URISyntaxException {
        log.debug("REST request to update CurrentMessage : {}", currentMessage);
        if (currentMessage.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CurrentMessage result = currentMessageRepository.save(currentMessage);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, currentMessage.getId().toString()))
            .body(result);
    }

    /**
     * GET  /current-messages : get all the currentMessages.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of currentMessages in body
     */
    @GetMapping("/current-messages")
    @Timed
    public List<CurrentMessage> getAllCurrentMessages() {
        log.debug("REST request to get all CurrentMessages");
        return currentMessageRepository.findAll();
    }

    /**
     * GET  /current-messages/:id : get the "id" currentMessage.
     *
     * @param id the id of the currentMessage to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the currentMessage, or with status 404 (Not Found)
     */
    @GetMapping("/current-messages/{id}")
    @Timed
    public ResponseEntity<CurrentMessage> getCurrentMessage(@PathVariable Long id) {
        log.debug("REST request to get CurrentMessage : {}", id);
        Optional<CurrentMessage> currentMessage = currentMessageRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(currentMessage);
    }

    /**
     * DELETE  /current-messages/:id : delete the "id" currentMessage.
     *
     * @param id the id of the currentMessage to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/current-messages/{id}")
    @Timed
    public ResponseEntity<Void> deleteCurrentMessage(@PathVariable Long id) {
        log.debug("REST request to delete CurrentMessage : {}", id);

        currentMessageRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
