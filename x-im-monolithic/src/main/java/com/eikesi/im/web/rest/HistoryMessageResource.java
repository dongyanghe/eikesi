package com.eikesi.im.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.eikesi.im.domain.HistoryMessage;
import com.eikesi.im.repository.HistoryMessageRepository;
import com.eikesi.im.web.rest.errors.BadRequestAlertException;
import com.eikesi.im.web.rest.util.HeaderUtil;
import com.eikesi.im.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing HistoryMessage.
 */
@RestController
@RequestMapping("/api")
public class HistoryMessageResource {

    private final Logger log = LoggerFactory.getLogger(HistoryMessageResource.class);

    private static final String ENTITY_NAME = "historyMessage";

    private HistoryMessageRepository historyMessageRepository;

    public HistoryMessageResource(HistoryMessageRepository historyMessageRepository) {
        this.historyMessageRepository = historyMessageRepository;
    }

    /**
     * POST  /history-messages : Create a new historyMessage.
     *
     * @param historyMessage the historyMessage to create
     * @return the ResponseEntity with status 201 (Created) and with body the new historyMessage, or with status 400 (Bad Request) if the historyMessage has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/history-messages")
    @Timed
    public ResponseEntity<HistoryMessage> createHistoryMessage(@Valid @RequestBody HistoryMessage historyMessage) throws URISyntaxException {
        log.debug("REST request to save HistoryMessage : {}", historyMessage);
        if (historyMessage.getId() != null) {
            throw new BadRequestAlertException("A new historyMessage cannot already have an ID", ENTITY_NAME, "idexists");
        }
        HistoryMessage result = historyMessageRepository.save(historyMessage);
        return ResponseEntity.created(new URI("/api/history-messages/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /history-messages : Updates an existing historyMessage.
     *
     * @param historyMessage the historyMessage to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated historyMessage,
     * or with status 400 (Bad Request) if the historyMessage is not valid,
     * or with status 500 (Internal Server Error) if the historyMessage couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/history-messages")
    @Timed
    public ResponseEntity<HistoryMessage> updateHistoryMessage(@Valid @RequestBody HistoryMessage historyMessage) throws URISyntaxException {
        log.debug("REST request to update HistoryMessage : {}", historyMessage);
        if (historyMessage.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        HistoryMessage result = historyMessageRepository.save(historyMessage);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, historyMessage.getId().toString()))
            .body(result);
    }

    /**
     * GET  /history-messages : get all the historyMessages.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of historyMessages in body
     */
    @GetMapping("/history-messages")
    @Timed
    public ResponseEntity<List<HistoryMessage>> getAllHistoryMessages(Pageable pageable) {
        log.debug("REST request to get a page of HistoryMessages");
        Page<HistoryMessage> page = historyMessageRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/history-messages");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /history-messages/:id : get the "id" historyMessage.
     *
     * @param id the id of the historyMessage to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the historyMessage, or with status 404 (Not Found)
     */
    @GetMapping("/history-messages/{id}")
    @Timed
    public ResponseEntity<HistoryMessage> getHistoryMessage(@PathVariable Long id) {
        log.debug("REST request to get HistoryMessage : {}", id);
        Optional<HistoryMessage> historyMessage = historyMessageRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(historyMessage);
    }

    /**
     * DELETE  /history-messages/:id : delete the "id" historyMessage.
     *
     * @param id the id of the historyMessage to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/history-messages/{id}")
    @Timed
    public ResponseEntity<Void> deleteHistoryMessage(@PathVariable Long id) {
        log.debug("REST request to delete HistoryMessage : {}", id);

        historyMessageRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
