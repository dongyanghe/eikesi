package com.eikesi.demo.gateway.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.eikesi.demo.gateway.service.CurrentMessageService;
import com.eikesi.demo.gateway.web.rest.errors.BadRequestAlertException;
import com.eikesi.demo.gateway.web.rest.util.HeaderUtil;
import com.eikesi.demo.gateway.service.dto.CurrentMessageDTO;
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
 * REST controller for managing CurrentMessage.
 */
@RestController
@RequestMapping("/api")
public class CurrentMessageResource {

    private final Logger log = LoggerFactory.getLogger(CurrentMessageResource.class);

    private static final String ENTITY_NAME = "currentMessage";

    private final CurrentMessageService currentMessageService;

    public CurrentMessageResource(CurrentMessageService currentMessageService) {
        this.currentMessageService = currentMessageService;
    }

    /**
     * POST  /current-messages : Create a new currentMessage.
     *
     * @param currentMessageDTO the currentMessageDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new currentMessageDTO, or with status 400 (Bad Request) if the currentMessage has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/current-messages")
    @Timed
    public ResponseEntity<CurrentMessageDTO> createCurrentMessage(@Valid @RequestBody CurrentMessageDTO currentMessageDTO) throws URISyntaxException {
        log.debug("REST request to save CurrentMessage : {}", currentMessageDTO);
        if (currentMessageDTO.getId() != null) {
            throw new BadRequestAlertException("A new currentMessage cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CurrentMessageDTO result = currentMessageService.save(currentMessageDTO);
        return ResponseEntity.created(new URI("/api/current-messages/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /current-messages : Updates an existing currentMessage.
     *
     * @param currentMessageDTO the currentMessageDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated currentMessageDTO,
     * or with status 400 (Bad Request) if the currentMessageDTO is not valid,
     * or with status 500 (Internal Server Error) if the currentMessageDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/current-messages")
    @Timed
    public ResponseEntity<CurrentMessageDTO> updateCurrentMessage(@Valid @RequestBody CurrentMessageDTO currentMessageDTO) throws URISyntaxException {
        log.debug("REST request to update CurrentMessage : {}", currentMessageDTO);
        if (currentMessageDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CurrentMessageDTO result = currentMessageService.save(currentMessageDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, currentMessageDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /current-messages : get all the currentMessages.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of currentMessages in body
     */
    @GetMapping("/current-messages")
    @Timed
    public List<CurrentMessageDTO> getAllCurrentMessages() {
        log.debug("REST request to get all CurrentMessages");
        return currentMessageService.findAll();
    }

    /**
     * GET  /current-messages/:id : get the "id" currentMessage.
     *
     * @param id the id of the currentMessageDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the currentMessageDTO, or with status 404 (Not Found)
     */
    @GetMapping("/current-messages/{id}")
    @Timed
    public ResponseEntity<CurrentMessageDTO> getCurrentMessage(@PathVariable Long id) {
        log.debug("REST request to get CurrentMessage : {}", id);
        Optional<CurrentMessageDTO> currentMessageDTO = currentMessageService.findOne(id);
        return ResponseUtil.wrapOrNotFound(currentMessageDTO);
    }

    /**
     * DELETE  /current-messages/:id : delete the "id" currentMessage.
     *
     * @param id the id of the currentMessageDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/current-messages/{id}")
    @Timed
    public ResponseEntity<Void> deleteCurrentMessage(@PathVariable Long id) {
        log.debug("REST request to delete CurrentMessage : {}", id);
        currentMessageService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/current-messages?query=:query : search for the currentMessage corresponding
     * to the query.
     *
     * @param query the query of the currentMessage search
     * @return the result of the search
     */
    @GetMapping("/_search/current-messages")
    @Timed
    public List<CurrentMessageDTO> searchCurrentMessages(@RequestParam String query) {
        log.debug("REST request to search CurrentMessages for query {}", query);
        return currentMessageService.search(query);
    }

}
