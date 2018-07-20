package com.eikesi.demo.gateway.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of CustomerRelationSearchRepository to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class CustomerRelationSearchRepositoryMockConfiguration {

    @MockBean
    private CustomerRelationSearchRepository mockCustomerRelationSearchRepository;

}
