package com.eikesi.manage.repository.search;

import com.eikesi.manage.domain.CustomerFlock;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the CustomerFlock entity.
 */
public interface CustomerFlockSearchRepository extends ElasticsearchRepository<CustomerFlock, Long> {
}
