package com.eikesi.gateway.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.eikesi.gateway.domain.Snapshot;

import com.eikesi.gateway.repository.SnapshotRepository;
import com.eikesi.gateway.repository.search.SnapshotSearchRepository;
import com.eikesi.gateway.web.rest.util.HeaderUtil;
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
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing Snapshot.
 */
@RestController
@RequestMapping("/api")
public class SnapshotResource {

    private final Logger log = LoggerFactory.getLogger(SnapshotResource.class);

    private static final String ENTITY_NAME = "snapshot";

    private final SnapshotRepository snapshotRepository;

    private final SnapshotSearchRepository snapshotSearchRepository;

    public SnapshotResource(SnapshotRepository snapshotRepository, SnapshotSearchRepository snapshotSearchRepository) {
        this.snapshotRepository = snapshotRepository;
        this.snapshotSearchRepository = snapshotSearchRepository;
    }

    /**
     * POST  /snapshots : Create a new snapshot.
     *
     * @param snapshot the snapshot to create
     * @return the ResponseEntity with status 201 (Created) and with body the new snapshot, or with status 400 (Bad Request) if the snapshot has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/snapshots")
    @Timed
    public ResponseEntity<Snapshot> createSnapshot(@Valid @RequestBody Snapshot snapshot) throws URISyntaxException {
        log.debug("REST request to save Snapshot : {}", snapshot);
        if (snapshot.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new snapshot cannot already have an ID")).body(null);
        }
        Snapshot result = snapshotRepository.save(snapshot);
        snapshotSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/snapshots/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /snapshots : Updates an existing snapshot.
     *
     * @param snapshot the snapshot to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated snapshot,
     * or with status 400 (Bad Request) if the snapshot is not valid,
     * or with status 500 (Internal Server Error) if the snapshot couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/snapshots")
    @Timed
    public ResponseEntity<Snapshot> updateSnapshot(@Valid @RequestBody Snapshot snapshot) throws URISyntaxException {
        log.debug("REST request to update Snapshot : {}", snapshot);
        if (snapshot.getId() == null) {
            return createSnapshot(snapshot);
        }
        Snapshot result = snapshotRepository.save(snapshot);
        snapshotSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, snapshot.getId().toString()))
            .body(result);
    }

    /**
     * GET  /snapshots : get all the snapshots.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of snapshots in body
     */
    @GetMapping("/snapshots")
    @Timed
    public List<Snapshot> getAllSnapshots() {
        log.debug("REST request to get all Snapshots");
        return snapshotRepository.findAll();
        }

    /**
     * GET  /snapshots/:id : get the "id" snapshot.
     *
     * @param id the id of the snapshot to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the snapshot, or with status 404 (Not Found)
     */
    @GetMapping("/snapshots/{id}")
    @Timed
    public ResponseEntity<Snapshot> getSnapshot(@PathVariable Long id) {
        log.debug("REST request to get Snapshot : {}", id);
        Snapshot snapshot = snapshotRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(snapshot));
    }

    /**
     * DELETE  /snapshots/:id : delete the "id" snapshot.
     *
     * @param id the id of the snapshot to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/snapshots/{id}")
    @Timed
    public ResponseEntity<Void> deleteSnapshot(@PathVariable Long id) {
        log.debug("REST request to delete Snapshot : {}", id);
        snapshotRepository.delete(id);
        snapshotSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/snapshots?query=:query : search for the snapshot corresponding
     * to the query.
     *
     * @param query the query of the snapshot search
     * @return the result of the search
     */
    @GetMapping("/_search/snapshots")
    @Timed
    public List<Snapshot> searchSnapshots(@RequestParam String query) {
        log.debug("REST request to search Snapshots for query {}", query);
        return StreamSupport
            .stream(snapshotSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
