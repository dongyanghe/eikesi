package com.eikesi.gateway.web.rest;

import com.eikesi.gateway.domain.Snapshot;
import com.eikesi.gateway.client.SnapshotClient;
import com.eikesi.gateway.domain.SnapshotPending;
import com.eikesi.gateway.repository.SnapshotPendingRepository;
import com.eikesi.gateway.repository.search.SnapshotPendingSearchRepository;
import com.eikesi.gateway.web.rest.util.HeaderUtil;
import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.web.util.ResponseUtil;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
import javax.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;

/**
 * REST controller for managing SnapshotPending.
 */
@RestController
@RequestMapping("/api")
public class SnapshotPendingResource {

    private final Logger log = LoggerFactory.getLogger(SnapshotPendingResource.class);

    private static final String ENTITY_NAME = "snapshotPending";

    private final SnapshotPendingRepository snapshotPendingRepository;

    private final SnapshotPendingSearchRepository snapshotPendingSearchRepository;

    private final SnapshotClient snapshotClient;

    public SnapshotPendingResource(SnapshotPendingRepository snapshotPendingRepository,
                                   SnapshotPendingSearchRepository snapshotPendingSearchRepository,
                                   SnapshotClient snapshotClient) {
        this.snapshotPendingRepository = snapshotPendingRepository;
        this.snapshotPendingSearchRepository = snapshotPendingSearchRepository;
        this.snapshotClient = snapshotClient;
    }

    /**
     * POST  /snapshot-pendings : Create a new snapshotPending.
     *
     * @param snapshotPending the snapshotPending to create
     * @return the ResponseEntity with status 201 (Created) and with body the new snapshotPending, or with status 400 (Bad Request) if the snapshotPending has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/snapshot-pendings")
    @Timed
    public ResponseEntity<SnapshotPending> createSnapshotPending(@Valid @RequestBody SnapshotPending snapshotPending) throws URISyntaxException {
        log.debug("REST request to save SnapshotPending : {}", snapshotPending);
        ResponseEntity<Snapshot> responseEntity = snapshotClient.save(snapshotPending);
        log.debug("REST request to save SnapshotPending responseEntity: {}", responseEntity);
        if (snapshotPending.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new snapshotPending cannot already have an ID")).body(null);
        }
        SnapshotPending result = snapshotPendingRepository.save(snapshotPending);
        snapshotPendingSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/snapshot-pendings/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /snapshot-pendings : Updates an existing snapshotPending.
     *
     * @param snapshotPending the snapshotPending to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated snapshotPending,
     * or with status 400 (Bad Request) if the snapshotPending is not valid,
     * or with status 500 (Internal Server Error) if the snapshotPending couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/snapshot-pendings")
    @Timed
    public ResponseEntity<SnapshotPending> updateSnapshotPending(@Valid @RequestBody SnapshotPending snapshotPending) throws URISyntaxException {
        log.debug("REST request to update SnapshotPending : {}", snapshotPending);
        if (snapshotPending.getId() == null) {
            return createSnapshotPending(snapshotPending);
        }
        SnapshotPending result = snapshotPendingRepository.save(snapshotPending);
        snapshotPendingSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, snapshotPending.getId().toString()))
            .body(result);
    }

    /**
     * GET  /snapshot-pendings : get all the snapshotPendings.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of snapshotPendings in body
     */
    @GetMapping("/snapshot-pendings")
    @Timed
    public List<SnapshotPending> getAllSnapshotPendings() {
        log.debug("REST request to get all SnapshotPendings");
        return snapshotPendingRepository.findAll();
    }

    /**
     * GET  /snapshot-pendings/:id : get the "id" snapshotPending.
     *
     * @param id the id of the snapshotPending to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the snapshotPending, or with status 404 (Not Found)
     */
    @GetMapping("/snapshot-pendings/{id}")
    @Timed
    public ResponseEntity<SnapshotPending> getSnapshotPending(@PathVariable Long id) {
        log.debug("REST request to get SnapshotPending : {}", id);
        ResponseEntity<Snapshot> responseEntity = snapshotClient.get(id);
        log.debug("REST request to get SnapshotPending responseEntity: {}", responseEntity);
        SnapshotPending snapshotPending = snapshotPendingRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(snapshotPending));
    }

    /**
     * DELETE  /snapshot-pendings/:id : delete the "id" snapshotPending.
     *
     * @param id the id of the snapshotPending to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/snapshot-pendings/{id}")
    @Timed
    public ResponseEntity<Void> deleteSnapshotPending(@PathVariable Long id) {
        log.debug("REST request to delete SnapshotPending : {}", id);
        snapshotPendingRepository.delete(id);
        snapshotPendingSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/snapshot-pendings?query=:query : search for the snapshotPending corresponding
     * to the query.
     *
     * @param query the query of the snapshotPending search
     * @return the result of the search
     */
    @GetMapping("/_search/snapshot-pendings")
    @Timed
    public List<SnapshotPending> searchSnapshotPendings(@RequestParam String query) {
        log.debug("REST request to search SnapshotPendings for query {}", query);
        return StreamSupport
            .stream(snapshotPendingSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
