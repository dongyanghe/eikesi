package com.eikesi.im.desktop.repository.search;

import com.eikesi.im.desktop.domain.CustomerFlock;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the CustomerFlock entity.
 */
public interface CustomerFlockSearchRepository extends ElasticsearchRepository<CustomerFlock, Long> {
}
