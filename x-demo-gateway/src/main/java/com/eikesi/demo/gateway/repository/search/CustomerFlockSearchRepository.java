package com.eikesi.demo.gateway.repository.search;

import com.eikesi.demo.gateway.domain.CustomerFlock;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the CustomerFlock entity.
 */
public interface CustomerFlockSearchRepository extends ElasticsearchRepository<CustomerFlock, Long> {
}
