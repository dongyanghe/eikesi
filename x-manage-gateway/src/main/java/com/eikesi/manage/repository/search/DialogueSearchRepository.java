package com.eikesi.manage.repository.search;

import com.eikesi.manage.domain.Dialogue;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Dialogue entity.
 */
public interface DialogueSearchRepository extends ElasticsearchRepository<Dialogue, Long> {
}
