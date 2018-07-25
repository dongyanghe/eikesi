package com.eikesi.demoABC.service.repository.search;

import com.eikesi.demoABC.service.domain.CustomerRelation;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the CustomerRelation entity.
 */
public interface CustomerRelationSearchRepository extends ElasticsearchRepository<CustomerRelation, Long> {
}
