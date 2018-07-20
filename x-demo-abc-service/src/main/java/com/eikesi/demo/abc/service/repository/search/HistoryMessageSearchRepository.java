package com.eikesi.demoABC.service.repository.search;

import com.eikesi.demoABC.service.domain.HistoryMessage;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the HistoryMessage entity.
 */
public interface HistoryMessageSearchRepository extends ElasticsearchRepository<HistoryMessage, Long> {
}
