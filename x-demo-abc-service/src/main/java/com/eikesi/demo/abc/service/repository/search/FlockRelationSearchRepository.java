package com.eikesi.demoABC.service.repository.search;

import com.eikesi.demoABC.service.domain.FlockRelation;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the FlockRelation entity.
 */
public interface FlockRelationSearchRepository extends ElasticsearchRepository<FlockRelation, Long> {
}
