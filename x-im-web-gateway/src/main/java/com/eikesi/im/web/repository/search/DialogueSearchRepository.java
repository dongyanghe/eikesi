package com.eikesi.im.web.repository.search;

import com.eikesi.im.web.domain.Dialogue;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Dialogue entity.
 */
public interface DialogueSearchRepository extends ElasticsearchRepository<Dialogue, Long> {
}
