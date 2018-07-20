package com.eikesi.demo.gateway.repository.search;

import com.eikesi.demo.gateway.domain.FlockRelation;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the FlockRelation entity.
 */
public interface FlockRelationSearchRepository extends ElasticsearchRepository<FlockRelation, Long> {
}
