package com.eikesi.im.desktop.repository.search;

import com.eikesi.im.desktop.domain.HistoryMessage;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the HistoryMessage entity.
 */
public interface HistoryMessageSearchRepository extends ElasticsearchRepository<HistoryMessage, Long> {
}
