package com.eikesi.demo.gateway.repository.search;

import com.eikesi.demo.gateway.domain.Customer;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Customer entity.
 */
public interface CustomerSearchRepository extends ElasticsearchRepository<Customer, Long> {
}
