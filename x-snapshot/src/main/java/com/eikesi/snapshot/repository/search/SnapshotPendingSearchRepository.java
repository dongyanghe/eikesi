package com.eikesi.snapshot.repository.search;

import com.eikesi.snapshot.domain.SnapshotPending;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the SnapshotPending entity.
 */
public interface SnapshotPendingSearchRepository extends ElasticsearchRepository<SnapshotPending, Long> {
}
