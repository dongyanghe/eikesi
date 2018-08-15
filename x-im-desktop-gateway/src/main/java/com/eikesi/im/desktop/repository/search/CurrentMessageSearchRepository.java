package com.eikesi.im.desktop.repository.search;

import com.eikesi.im.desktop.domain.CurrentMessage;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the CurrentMessage entity.
 */
public interface CurrentMessageSearchRepository extends ElasticsearchRepository<CurrentMessage, Long> {
}
