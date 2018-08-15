package com.eikesi.im.desktop.repository.search;

import com.eikesi.im.desktop.domain.Dialogue;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Dialogue entity.
 */
public interface DialogueSearchRepository extends ElasticsearchRepository<Dialogue, Long> {
}
