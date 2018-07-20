package com.eikesi.demo.gateway.repository.search;

import com.eikesi.demo.gateway.domain.CurrentMessage;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the CurrentMessage entity.
 */
public interface CurrentMessageSearchRepository extends ElasticsearchRepository<CurrentMessage, Long> {
}
