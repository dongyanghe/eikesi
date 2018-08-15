package com.eikesi.im.desktop.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of HistoryMessageSearchRepository to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class HistoryMessageSearchRepositoryMockConfiguration {

    @MockBean
    private HistoryMessageSearchRepository mockHistoryMessageSearchRepository;

}
