package com.eikesi.manage.repository.search;

import com.eikesi.manage.domain.CurrentMessage;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the CurrentMessage entity.
 */
public interface CurrentMessageSearchRepository extends ElasticsearchRepository<CurrentMessage, Long> {
}
