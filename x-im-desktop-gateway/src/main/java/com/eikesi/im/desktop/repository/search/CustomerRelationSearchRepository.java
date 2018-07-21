package com.eikesi.im.desktop.repository.search;

import com.eikesi.im.desktop.domain.CustomerRelation;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the CustomerRelation entity.
 */
public interface CustomerRelationSearchRepository extends ElasticsearchRepository<CustomerRelation, Long> {
}
