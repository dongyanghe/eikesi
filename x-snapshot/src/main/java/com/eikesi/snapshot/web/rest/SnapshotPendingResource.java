package com.eikesi.snapshot.web.rest;

import com.eikesi.snapshot.domain.SnapshotPending;
import com.eikesi.snapshot.repository.SnapshotPendingRepository;
import com.eikesi.snapshot.repository.search.SnapshotPendingSearchRepository;
import com.codahale.metrics.annotation.Timed;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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

    public SnapshotPendingResource(SnapshotPendingRepository snapshotPendingRepository, SnapshotPendingSearchRepository snapshotPendingSearchRepository) {
        this.snapshotPendingRepository = snapshotPendingRepository;
        this.snapshotPendingSearchRepository = snapshotPendingSearchRepository;
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
