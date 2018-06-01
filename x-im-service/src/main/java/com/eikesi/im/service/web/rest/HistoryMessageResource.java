package com.eikesi.im.service.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.eikesi.im.service.service.HistoryMessageService;
import com.eikesi.im.service.web.rest.errors.BadRequestAlertException;
import com.eikesi.im.service.web.rest.util.HeaderUtil;
import com.eikesi.im.service.web.rest.util.PaginationUtil;
import com.eikesi.im.service.service.dto.HistoryMessageDTO;
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

    private final HistoryMessageService historyMessageService;

    public HistoryMessageResource(HistoryMessageService historyMessageService) {
        this.historyMessageService = historyMessageService;
    }

    /**
     * POST  /history-messages : Create a new historyMessage.
     *
     * @param historyMessageDTO the historyMessageDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new historyMessageDTO, or with status 400 (Bad Request) if the historyMessage has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/history-messages")
    @Timed
    public ResponseEntity<HistoryMessageDTO> createHistoryMessage(@Valid @RequestBody HistoryMessageDTO historyMessageDTO) throws URISyntaxException {
        log.debug("REST request to save HistoryMessage : {}", historyMessageDTO);
        if (historyMessageDTO.getId() != null) {
            throw new BadRequestAlertException("A new historyMessage cannot already have an ID", ENTITY_NAME, "idexists");
        }
        HistoryMessageDTO result = historyMessageService.save(historyMessageDTO);
        return ResponseEntity.created(new URI("/api/history-messages/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /history-messages : Updates an existing historyMessage.
     *
     * @param historyMessageDTO the historyMessageDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated historyMessageDTO,
     * or with status 400 (Bad Request) if the historyMessageDTO is not valid,
     * or with status 500 (Internal Server Error) if the historyMessageDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/history-messages")
    @Timed
    public ResponseEntity<HistoryMessageDTO> updateHistoryMessage(@Valid @RequestBody HistoryMessageDTO historyMessageDTO) throws URISyntaxException {
        log.debug("REST request to update HistoryMessage : {}", historyMessageDTO);
        if (historyMessageDTO.getId() == null) {
            return createHistoryMessage(historyMessageDTO);
        }
        HistoryMessageDTO result = historyMessageService.save(historyMessageDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, historyMessageDTO.getId().toString()))
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
    public ResponseEntity<List<HistoryMessageDTO>> getAllHistoryMessages(Pageable pageable) {
        log.debug("REST request to get a page of HistoryMessages");
        Page<HistoryMessageDTO> page = historyMessageService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/history-messages");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /history-messages/:id : get the "id" historyMessage.
     *
     * @param id the id of the historyMessageDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the historyMessageDTO, or with status 404 (Not Found)
     */
    @GetMapping("/history-messages/{id}")
    @Timed
    public ResponseEntity<HistoryMessageDTO> getHistoryMessage(@PathVariable Long id) {
        log.debug("REST request to get HistoryMessage : {}", id);
        HistoryMessageDTO historyMessageDTO = historyMessageService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(historyMessageDTO));
    }

    /**
     * DELETE  /history-messages/:id : delete the "id" historyMessage.
     *
     * @param id the id of the historyMessageDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/history-messages/{id}")
    @Timed
    public ResponseEntity<Void> deleteHistoryMessage(@PathVariable Long id) {
        log.debug("REST request to delete HistoryMessage : {}", id);
        historyMessageService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
