package com.eikesi.demoABC.service.repository.search;

import com.eikesi.demoABC.service.domain.CurrentMessage;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the CurrentMessage entity.
 */
public interface CurrentMessageSearchRepository extends ElasticsearchRepository<CurrentMessage, Long> {
}
