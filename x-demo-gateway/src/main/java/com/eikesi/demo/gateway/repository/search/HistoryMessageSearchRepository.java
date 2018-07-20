package com.eikesi.demo.gateway.repository.search;

import com.eikesi.demo.gateway.domain.HistoryMessage;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the HistoryMessage entity.
 */
public interface HistoryMessageSearchRepository extends ElasticsearchRepository<HistoryMessage, Long> {
}
