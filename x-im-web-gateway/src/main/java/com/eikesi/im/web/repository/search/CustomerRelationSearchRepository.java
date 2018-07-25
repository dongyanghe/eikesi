package com.eikesi.im.web.repository.search;

import com.eikesi.im.web.domain.CustomerRelation;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the CustomerRelation entity.
 */
public interface CustomerRelationSearchRepository extends ElasticsearchRepository<CustomerRelation, Long> {
}
