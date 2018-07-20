package com.eikesi.demo.gateway.repository.search;

import com.eikesi.demo.gateway.domain.Dialogue;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Dialogue entity.
 */
public interface DialogueSearchRepository extends ElasticsearchRepository<Dialogue, Long> {
}
