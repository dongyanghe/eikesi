package com.eikesi.demoABC.service.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of FlockRelationSearchRepository to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class FlockRelationSearchRepositoryMockConfiguration {

    @MockBean
    private FlockRelationSearchRepository mockFlockRelationSearchRepository;

}
