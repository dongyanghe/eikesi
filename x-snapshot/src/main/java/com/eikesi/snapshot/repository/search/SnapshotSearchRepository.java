package com.eikesi.snapshot.repository.search;

import com.eikesi.snapshot.domain.Snapshot;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Snapshot entity.
 */
public interface SnapshotSearchRepository extends ElasticsearchRepository<Snapshot, Long> {
}
