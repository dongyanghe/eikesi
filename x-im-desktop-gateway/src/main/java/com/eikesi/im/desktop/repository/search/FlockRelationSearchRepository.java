package com.eikesi.im.desktop.repository.search;

import com.eikesi.im.desktop.domain.FlockRelation;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the FlockRelation entity.
 */
public interface FlockRelationSearchRepository extends ElasticsearchRepository<FlockRelation, Long> {
}
