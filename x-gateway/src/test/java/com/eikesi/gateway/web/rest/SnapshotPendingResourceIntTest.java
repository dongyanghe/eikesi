package com.eikesi.gateway.web.rest;

import com.eikesi.gateway.GatewayApp;
import com.eikesi.gateway.client.SnapshotClient;
import com.eikesi.gateway.domain.SnapshotPending;
import com.eikesi.gateway.repository.SnapshotPendingRepository;
import com.eikesi.gateway.repository.search.SnapshotPendingSearchRepository;
import com.eikesi.gateway.web.rest.errors.ExceptionTranslator;
import java.time.Instant;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.util.List;
import javax.persistence.EntityManager;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import static com.eikesi.gateway.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the SnapshotPendingResource REST controller.
 *
 * @see SnapshotPendingResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GatewayApp.class)
public class SnapshotPendingResourceIntTest {

    private static final String DEFAULT_DOMAIN_NAME = "AAAAAAAAAA";
    private static final String UPDATED_DOMAIN_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DOMAIN_PATH = "AAAAAAAAAA";
    private static final String UPDATED_DOMAIN_PATH = "BBBBBBBBBB";

    private static final String DEFAULT_CREATE_SOURCE = "AAAAAAAAAA";
    private static final String UPDATED_CREATE_SOURCE = "BBBBBBBBBB";

    private static final String DEFAULT_PRIORITY = "AAAAAAAAAA";
    private static final String UPDATED_PRIORITY = "BBBBBBBBBB";

    private static final String DEFAULT_STATE = "AAAAAAAAAA";
    private static final String UPDATED_STATE = "BBBBBBBBBB";

    private static final Long DEFAULT_CREATE_BY = 1L;
    private static final Long UPDATED_CREATE_BY = 2L;

    private static final ZonedDateTime DEFAULT_CREATE_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_CREATE_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final Long DEFAULT_UPDATE_BY = 1L;
    private static final Long UPDATED_UPDATE_BY = 2L;

    private static final ZonedDateTime DEFAULT_UPDATE_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_UPDATE_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_REMARKS = "AAAAAAAAAA";
    private static final String UPDATED_REMARKS = "BBBBBBBBBB";

    private static final String DEFAULT_DEL_FLAG = "AAAAAAAAAA";
    private static final String UPDATED_DEL_FLAG = "BBBBBBBBBB";

    @Autowired
    private SnapshotPendingRepository snapshotPendingRepository;

    @Autowired
    private SnapshotPendingSearchRepository snapshotPendingSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSnapshotPendingMockMvc;

    private SnapshotPending snapshotPending;

    private SnapshotClient snapshotClient;
    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SnapshotPendingResource snapshotPendingResource = new SnapshotPendingResource(snapshotPendingRepository, snapshotPendingSearchRepository, snapshotClient);
        this.restSnapshotPendingMockMvc = MockMvcBuilders.standaloneSetup(snapshotPendingResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SnapshotPending createEntity(EntityManager em) {
        SnapshotPending snapshotPending = new SnapshotPending()
            .domainName(DEFAULT_DOMAIN_NAME)
            .domainPath(DEFAULT_DOMAIN_PATH)
            .createSource(DEFAULT_CREATE_SOURCE)
            .priority(DEFAULT_PRIORITY)
            .state(DEFAULT_STATE)
            .createBy(DEFAULT_CREATE_BY)
            .createDate(DEFAULT_CREATE_DATE)
            .updateBy(DEFAULT_UPDATE_BY)
            .updateDate(DEFAULT_UPDATE_DATE)
            .remarks(DEFAULT_REMARKS)
            .delFlag(DEFAULT_DEL_FLAG);
        return snapshotPending;
    }

    @Before
    public void initTest() {
        snapshotPendingSearchRepository.deleteAll();
        snapshotPending = createEntity(em);
    }

    @Test
    @Transactional
    public void createSnapshotPending() throws Exception {
        int databaseSizeBeforeCreate = snapshotPendingRepository.findAll().size();

        // Create the SnapshotPending
        restSnapshotPendingMockMvc.perform(post("/api/snapshot-pendings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(snapshotPending)))
            .andExpect(status().isCreated());

        // Validate the SnapshotPending in the database
        List<SnapshotPending> snapshotPendingList = snapshotPendingRepository.findAll();
        assertThat(snapshotPendingList).hasSize(databaseSizeBeforeCreate + 1);
        SnapshotPending testSnapshotPending = snapshotPendingList.get(snapshotPendingList.size() - 1);
        assertThat(testSnapshotPending.getDomainName()).isEqualTo(DEFAULT_DOMAIN_NAME);
        assertThat(testSnapshotPending.getDomainPath()).isEqualTo(DEFAULT_DOMAIN_PATH);
        assertThat(testSnapshotPending.getCreateSource()).isEqualTo(DEFAULT_CREATE_SOURCE);
        assertThat(testSnapshotPending.getPriority()).isEqualTo(DEFAULT_PRIORITY);
        assertThat(testSnapshotPending.getState()).isEqualTo(DEFAULT_STATE);
        assertThat(testSnapshotPending.getCreateBy()).isEqualTo(DEFAULT_CREATE_BY);
        assertThat(testSnapshotPending.getCreateDate()).isEqualTo(DEFAULT_CREATE_DATE);
        assertThat(testSnapshotPending.getUpdateBy()).isEqualTo(DEFAULT_UPDATE_BY);
        assertThat(testSnapshotPending.getUpdateDate()).isEqualTo(DEFAULT_UPDATE_DATE);
        assertThat(testSnapshotPending.getRemarks()).isEqualTo(DEFAULT_REMARKS);
        assertThat(testSnapshotPending.getDelFlag()).isEqualTo(DEFAULT_DEL_FLAG);

        // Validate the SnapshotPending in Elasticsearch
        SnapshotPending snapshotPendingEs = snapshotPendingSearchRepository.findOne(testSnapshotPending.getId());
        assertThat(snapshotPendingEs).isEqualToComparingFieldByField(testSnapshotPending);
    }

    @Test
    @Transactional
    public void createSnapshotPendingWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = snapshotPendingRepository.findAll().size();

        // Create the SnapshotPending with an existing ID
        snapshotPending.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSnapshotPendingMockMvc.perform(post("/api/snapshot-pendings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(snapshotPending)))
            .andExpect(status().isBadRequest());

        // Validate the SnapshotPending in the database
        List<SnapshotPending> snapshotPendingList = snapshotPendingRepository.findAll();
        assertThat(snapshotPendingList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkDomainNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = snapshotPendingRepository.findAll().size();
        // set the field null
        snapshotPending.setDomainName(null);

        // Create the SnapshotPending, which fails.

        restSnapshotPendingMockMvc.perform(post("/api/snapshot-pendings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(snapshotPending)))
            .andExpect(status().isBadRequest());

        List<SnapshotPending> snapshotPendingList = snapshotPendingRepository.findAll();
        assertThat(snapshotPendingList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSnapshotPendings() throws Exception {
        // Initialize the database
        snapshotPendingRepository.saveAndFlush(snapshotPending);

        // Get all the snapshotPendingList
        restSnapshotPendingMockMvc.perform(get("/api/snapshot-pendings?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(snapshotPending.getId().intValue())))
            .andExpect(jsonPath("$.[*].domainName").value(hasItem(DEFAULT_DOMAIN_NAME.toString())))
            .andExpect(jsonPath("$.[*].domainPath").value(hasItem(DEFAULT_DOMAIN_PATH.toString())))
            .andExpect(jsonPath("$.[*].createSource").value(hasItem(DEFAULT_CREATE_SOURCE.toString())))
            .andExpect(jsonPath("$.[*].priority").value(hasItem(DEFAULT_PRIORITY.toString())))
            .andExpect(jsonPath("$.[*].state").value(hasItem(DEFAULT_STATE.toString())))
            .andExpect(jsonPath("$.[*].createBy").value(hasItem(DEFAULT_CREATE_BY.intValue())))
            .andExpect(jsonPath("$.[*].createDate").value(hasItem(sameInstant(DEFAULT_CREATE_DATE))))
            .andExpect(jsonPath("$.[*].updateBy").value(hasItem(DEFAULT_UPDATE_BY.intValue())))
            .andExpect(jsonPath("$.[*].updateDate").value(hasItem(sameInstant(DEFAULT_UPDATE_DATE))))
            .andExpect(jsonPath("$.[*].remarks").value(hasItem(DEFAULT_REMARKS.toString())))
            .andExpect(jsonPath("$.[*].delFlag").value(hasItem(DEFAULT_DEL_FLAG.toString())));
    }

    @Test
    @Transactional
    public void getSnapshotPending() throws Exception {
        // Initialize the database
        snapshotPendingRepository.saveAndFlush(snapshotPending);

        // Get the snapshotPending
        restSnapshotPendingMockMvc.perform(get("/api/snapshot-pendings/{id}", snapshotPending.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(snapshotPending.getId().intValue()))
            .andExpect(jsonPath("$.domainName").value(DEFAULT_DOMAIN_NAME.toString()))
            .andExpect(jsonPath("$.domainPath").value(DEFAULT_DOMAIN_PATH.toString()))
            .andExpect(jsonPath("$.createSource").value(DEFAULT_CREATE_SOURCE.toString()))
            .andExpect(jsonPath("$.priority").value(DEFAULT_PRIORITY.toString()))
            .andExpect(jsonPath("$.state").value(DEFAULT_STATE.toString()))
            .andExpect(jsonPath("$.createBy").value(DEFAULT_CREATE_BY.intValue()))
            .andExpect(jsonPath("$.createDate").value(sameInstant(DEFAULT_CREATE_DATE)))
            .andExpect(jsonPath("$.updateBy").value(DEFAULT_UPDATE_BY.intValue()))
            .andExpect(jsonPath("$.updateDate").value(sameInstant(DEFAULT_UPDATE_DATE)))
            .andExpect(jsonPath("$.remarks").value(DEFAULT_REMARKS.toString()))
            .andExpect(jsonPath("$.delFlag").value(DEFAULT_DEL_FLAG.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSnapshotPending() throws Exception {
        // Get the snapshotPending
        restSnapshotPendingMockMvc.perform(get("/api/snapshot-pendings/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSnapshotPending() throws Exception {
        // Initialize the database
        snapshotPendingRepository.saveAndFlush(snapshotPending);
        snapshotPendingSearchRepository.save(snapshotPending);
        int databaseSizeBeforeUpdate = snapshotPendingRepository.findAll().size();

        // Update the snapshotPending
        SnapshotPending updatedSnapshotPending = snapshotPendingRepository.findOne(snapshotPending.getId());
        updatedSnapshotPending
            .domainName(UPDATED_DOMAIN_NAME)
            .domainPath(UPDATED_DOMAIN_PATH)
            .createSource(UPDATED_CREATE_SOURCE)
            .priority(UPDATED_PRIORITY)
            .state(UPDATED_STATE)
            .createBy(UPDATED_CREATE_BY)
            .createDate(UPDATED_CREATE_DATE)
            .updateBy(UPDATED_UPDATE_BY)
            .updateDate(UPDATED_UPDATE_DATE)
            .remarks(UPDATED_REMARKS)
            .delFlag(UPDATED_DEL_FLAG);

        restSnapshotPendingMockMvc.perform(put("/api/snapshot-pendings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSnapshotPending)))
            .andExpect(status().isOk());

        // Validate the SnapshotPending in the database
        List<SnapshotPending> snapshotPendingList = snapshotPendingRepository.findAll();
        assertThat(snapshotPendingList).hasSize(databaseSizeBeforeUpdate);
        SnapshotPending testSnapshotPending = snapshotPendingList.get(snapshotPendingList.size() - 1);
        assertThat(testSnapshotPending.getDomainName()).isEqualTo(UPDATED_DOMAIN_NAME);
        assertThat(testSnapshotPending.getDomainPath()).isEqualTo(UPDATED_DOMAIN_PATH);
        assertThat(testSnapshotPending.getCreateSource()).isEqualTo(UPDATED_CREATE_SOURCE);
        assertThat(testSnapshotPending.getPriority()).isEqualTo(UPDATED_PRIORITY);
        assertThat(testSnapshotPending.getState()).isEqualTo(UPDATED_STATE);
        assertThat(testSnapshotPending.getCreateBy()).isEqualTo(UPDATED_CREATE_BY);
        assertThat(testSnapshotPending.getCreateDate()).isEqualTo(UPDATED_CREATE_DATE);
        assertThat(testSnapshotPending.getUpdateBy()).isEqualTo(UPDATED_UPDATE_BY);
        assertThat(testSnapshotPending.getUpdateDate()).isEqualTo(UPDATED_UPDATE_DATE);
        assertThat(testSnapshotPending.getRemarks()).isEqualTo(UPDATED_REMARKS);
        assertThat(testSnapshotPending.getDelFlag()).isEqualTo(UPDATED_DEL_FLAG);

        // Validate the SnapshotPending in Elasticsearch
        SnapshotPending snapshotPendingEs = snapshotPendingSearchRepository.findOne(testSnapshotPending.getId());
        assertThat(snapshotPendingEs).isEqualToComparingFieldByField(testSnapshotPending);
    }

    @Test
    @Transactional
    public void updateNonExistingSnapshotPending() throws Exception {
        int databaseSizeBeforeUpdate = snapshotPendingRepository.findAll().size();

        // Create the SnapshotPending

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restSnapshotPendingMockMvc.perform(put("/api/snapshot-pendings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(snapshotPending)))
            .andExpect(status().isCreated());

        // Validate the SnapshotPending in the database
        List<SnapshotPending> snapshotPendingList = snapshotPendingRepository.findAll();
        assertThat(snapshotPendingList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteSnapshotPending() throws Exception {
        // Initialize the database
        snapshotPendingRepository.saveAndFlush(snapshotPending);
        snapshotPendingSearchRepository.save(snapshotPending);
        int databaseSizeBeforeDelete = snapshotPendingRepository.findAll().size();

        // Get the snapshotPending
        restSnapshotPendingMockMvc.perform(delete("/api/snapshot-pendings/{id}", snapshotPending.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean snapshotPendingExistsInEs = snapshotPendingSearchRepository.exists(snapshotPending.getId());
        assertThat(snapshotPendingExistsInEs).isFalse();

        // Validate the database is empty
        List<SnapshotPending> snapshotPendingList = snapshotPendingRepository.findAll();
        assertThat(snapshotPendingList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchSnapshotPending() throws Exception {
        // Initialize the database
        snapshotPendingRepository.saveAndFlush(snapshotPending);
        snapshotPendingSearchRepository.save(snapshotPending);

        // Search the snapshotPending
        restSnapshotPendingMockMvc.perform(get("/api/_search/snapshot-pendings?query=id:" + snapshotPending.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(snapshotPending.getId().intValue())))
            .andExpect(jsonPath("$.[*].domainName").value(hasItem(DEFAULT_DOMAIN_NAME.toString())))
            .andExpect(jsonPath("$.[*].domainPath").value(hasItem(DEFAULT_DOMAIN_PATH.toString())))
            .andExpect(jsonPath("$.[*].createSource").value(hasItem(DEFAULT_CREATE_SOURCE.toString())))
            .andExpect(jsonPath("$.[*].priority").value(hasItem(DEFAULT_PRIORITY.toString())))
            .andExpect(jsonPath("$.[*].state").value(hasItem(DEFAULT_STATE.toString())))
            .andExpect(jsonPath("$.[*].createBy").value(hasItem(DEFAULT_CREATE_BY.intValue())))
            .andExpect(jsonPath("$.[*].createDate").value(hasItem(sameInstant(DEFAULT_CREATE_DATE))))
            .andExpect(jsonPath("$.[*].updateBy").value(hasItem(DEFAULT_UPDATE_BY.intValue())))
            .andExpect(jsonPath("$.[*].updateDate").value(hasItem(sameInstant(DEFAULT_UPDATE_DATE))))
            .andExpect(jsonPath("$.[*].remarks").value(hasItem(DEFAULT_REMARKS.toString())))
            .andExpect(jsonPath("$.[*].delFlag").value(hasItem(DEFAULT_DEL_FLAG.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SnapshotPending.class);
        SnapshotPending snapshotPending1 = new SnapshotPending();
        snapshotPending1.setId(1L);
        SnapshotPending snapshotPending2 = new SnapshotPending();
        snapshotPending2.setId(snapshotPending1.getId());
        assertThat(snapshotPending1).isEqualTo(snapshotPending2);
        snapshotPending2.setId(2L);
        assertThat(snapshotPending1).isNotEqualTo(snapshotPending2);
        snapshotPending1.setId(null);
        assertThat(snapshotPending1).isNotEqualTo(snapshotPending2);
    }
}
