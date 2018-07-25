package com.eikesi.im.web.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of CurrentMessageSearchRepository to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class CurrentMessageSearchRepositoryMockConfiguration {

    @MockBean
    private CurrentMessageSearchRepository mockCurrentMessageSearchRepository;

}
