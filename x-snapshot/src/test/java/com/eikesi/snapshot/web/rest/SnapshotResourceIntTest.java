package com.eikesi.snapshot.web.rest;

import com.eikesi.snapshot.SnapshotApp;

import com.eikesi.snapshot.domain.Snapshot;
import com.eikesi.snapshot.repository.SnapshotRepository;
import com.eikesi.snapshot.repository.search.SnapshotSearchRepository;
import com.eikesi.snapshot.web.rest.errors.ExceptionTranslator;

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

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static com.eikesi.snapshot.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the SnapshotResource REST controller.
 *
 * @see SnapshotResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SnapshotApp.class)
public class SnapshotResourceIntTest {

    private static final String DEFAULT_DOMAIN_NAME = "AAAAAAAAAA";
    private static final String UPDATED_DOMAIN_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DOMAIN_PATH = "AAAAAAAAAA";
    private static final String UPDATED_DOMAIN_PATH = "BBBBBBBBBB";

    private static final String DEFAULT_CREATE_SOURCE = "AAAAAAAAAA";
    private static final String UPDATED_CREATE_SOURCE = "BBBBBBBBBB";

    private static final Long DEFAULT_DAY_TIME = 1L;
    private static final Long UPDATED_DAY_TIME = 2L;

    private static final Long DEFAULT_WEEK_TIME = 1L;
    private static final Long UPDATED_WEEK_TIME = 2L;

    private static final Long DEFAULT_MONTH_TIME = 1L;
    private static final Long UPDATED_MONTH_TIME = 2L;

    private static final Long DEFAULT_YEAR_TIME = 1L;
    private static final Long UPDATED_YEAR_TIME = 2L;

    private static final Long DEFAULT_HISTORY_TIME = 1L;
    private static final Long UPDATED_HISTORY_TIME = 2L;

    private static final String DEFAULT_FILE_PATH = "AAAAAAAAAA";
    private static final String UPDATED_FILE_PATH = "BBBBBBBBBB";

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
    private SnapshotRepository snapshotRepository;

    @Autowired
    private SnapshotSearchRepository snapshotSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSnapshotMockMvc;

    private Snapshot snapshot;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SnapshotResource snapshotResource = new SnapshotResource(snapshotRepository, snapshotSearchRepository);
        this.restSnapshotMockMvc = MockMvcBuilders.standaloneSetup(snapshotResource)
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
    public static Snapshot createEntity(EntityManager em) {
        Snapshot snapshot = new Snapshot()
            .domainName(DEFAULT_DOMAIN_NAME)
            .domainPath(DEFAULT_DOMAIN_PATH)
            .createSource(DEFAULT_CREATE_SOURCE)
            .dayTime(DEFAULT_DAY_TIME)
            .weekTime(DEFAULT_WEEK_TIME)
            .monthTime(DEFAULT_MONTH_TIME)
            .yearTime(DEFAULT_YEAR_TIME)
            .historyTime(DEFAULT_HISTORY_TIME)
            .filePath(DEFAULT_FILE_PATH)
            .state(DEFAULT_STATE)
            .createBy(DEFAULT_CREATE_BY)
            .createDate(DEFAULT_CREATE_DATE)
            .updateBy(DEFAULT_UPDATE_BY)
            .updateDate(DEFAULT_UPDATE_DATE)
            .remarks(DEFAULT_REMARKS)
            .delFlag(DEFAULT_DEL_FLAG);
        return snapshot;
    }

    @Before
    public void initTest() {
        snapshotSearchRepository.deleteAll();
        snapshot = createEntity(em);
    }

    @Test
    @Transactional
    public void createSnapshot() throws Exception {
        int databaseSizeBeforeCreate = snapshotRepository.findAll().size();

        // Create the Snapshot
        restSnapshotMockMvc.perform(post("/api/snapshots")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(snapshot)))
            .andExpect(status().isCreated());

        // Validate the Snapshot in the database
        List<Snapshot> snapshotList = snapshotRepository.findAll();
        assertThat(snapshotList).hasSize(databaseSizeBeforeCreate + 1);
        Snapshot testSnapshot = snapshotList.get(snapshotList.size() - 1);
        assertThat(testSnapshot.getDomainName()).isEqualTo(DEFAULT_DOMAIN_NAME);
        assertThat(testSnapshot.getDomainPath()).isEqualTo(DEFAULT_DOMAIN_PATH);
        assertThat(testSnapshot.getCreateSource()).isEqualTo(DEFAULT_CREATE_SOURCE);
        assertThat(testSnapshot.getDayTime()).isEqualTo(DEFAULT_DAY_TIME);
        assertThat(testSnapshot.getWeekTime()).isEqualTo(DEFAULT_WEEK_TIME);
        assertThat(testSnapshot.getMonthTime()).isEqualTo(DEFAULT_MONTH_TIME);
        assertThat(testSnapshot.getYearTime()).isEqualTo(DEFAULT_YEAR_TIME);
        assertThat(testSnapshot.getHistoryTime()).isEqualTo(DEFAULT_HISTORY_TIME);
        assertThat(testSnapshot.getFilePath()).isEqualTo(DEFAULT_FILE_PATH);
        assertThat(testSnapshot.getState()).isEqualTo(DEFAULT_STATE);
        assertThat(testSnapshot.getCreateBy()).isEqualTo(DEFAULT_CREATE_BY);
        assertThat(testSnapshot.getCreateDate()).isEqualTo(DEFAULT_CREATE_DATE);
        assertThat(testSnapshot.getUpdateBy()).isEqualTo(DEFAULT_UPDATE_BY);
        assertThat(testSnapshot.getUpdateDate()).isEqualTo(DEFAULT_UPDATE_DATE);
        assertThat(testSnapshot.getRemarks()).isEqualTo(DEFAULT_REMARKS);
        assertThat(testSnapshot.getDelFlag()).isEqualTo(DEFAULT_DEL_FLAG);

        // Validate the Snapshot in Elasticsearch
        Snapshot snapshotEs = snapshotSearchRepository.findOne(testSnapshot.getId());
        assertThat(snapshotEs).isEqualToComparingFieldByField(testSnapshot);
    }

    @Test
    @Transactional
    public void createSnapshotWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = snapshotRepository.findAll().size();

        // Create the Snapshot with an existing ID
        snapshot.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSnapshotMockMvc.perform(post("/api/snapshots")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(snapshot)))
            .andExpect(status().isBadRequest());

        // Validate the Snapshot in the database
        List<Snapshot> snapshotList = snapshotRepository.findAll();
        assertThat(snapshotList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkDomainNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = snapshotRepository.findAll().size();
        // set the field null
        snapshot.setDomainName(null);

        // Create the Snapshot, which fails.

        restSnapshotMockMvc.perform(post("/api/snapshots")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(snapshot)))
            .andExpect(status().isBadRequest());

        List<Snapshot> snapshotList = snapshotRepository.findAll();
        assertThat(snapshotList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSnapshots() throws Exception {
        // Initialize the database
        snapshotRepository.saveAndFlush(snapshot);

        // Get all the snapshotList
        restSnapshotMockMvc.perform(get("/api/snapshots?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(snapshot.getId().intValue())))
            .andExpect(jsonPath("$.[*].domainName").value(hasItem(DEFAULT_DOMAIN_NAME.toString())))
            .andExpect(jsonPath("$.[*].domainPath").value(hasItem(DEFAULT_DOMAIN_PATH.toString())))
            .andExpect(jsonPath("$.[*].createSource").value(hasItem(DEFAULT_CREATE_SOURCE.toString())))
            .andExpect(jsonPath("$.[*].dayTime").value(hasItem(DEFAULT_DAY_TIME.intValue())))
            .andExpect(jsonPath("$.[*].weekTime").value(hasItem(DEFAULT_WEEK_TIME.intValue())))
            .andExpect(jsonPath("$.[*].monthTime").value(hasItem(DEFAULT_MONTH_TIME.intValue())))
            .andExpect(jsonPath("$.[*].yearTime").value(hasItem(DEFAULT_YEAR_TIME.intValue())))
            .andExpect(jsonPath("$.[*].historyTime").value(hasItem(DEFAULT_HISTORY_TIME.intValue())))
            .andExpect(jsonPath("$.[*].filePath").value(hasItem(DEFAULT_FILE_PATH.toString())))
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
    public void getSnapshot() throws Exception {
        // Initialize the database
        snapshotRepository.saveAndFlush(snapshot);

        // Get the snapshot
        restSnapshotMockMvc.perform(get("/api/snapshots/{id}", snapshot.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(snapshot.getId().intValue()))
            .andExpect(jsonPath("$.domainName").value(DEFAULT_DOMAIN_NAME.toString()))
            .andExpect(jsonPath("$.domainPath").value(DEFAULT_DOMAIN_PATH.toString()))
            .andExpect(jsonPath("$.createSource").value(DEFAULT_CREATE_SOURCE.toString()))
            .andExpect(jsonPath("$.dayTime").value(DEFAULT_DAY_TIME.intValue()))
            .andExpect(jsonPath("$.weekTime").value(DEFAULT_WEEK_TIME.intValue()))
            .andExpect(jsonPath("$.monthTime").value(DEFAULT_MONTH_TIME.intValue()))
            .andExpect(jsonPath("$.yearTime").value(DEFAULT_YEAR_TIME.intValue()))
            .andExpect(jsonPath("$.historyTime").value(DEFAULT_HISTORY_TIME.intValue()))
            .andExpect(jsonPath("$.filePath").value(DEFAULT_FILE_PATH.toString()))
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
    public void getNonExistingSnapshot() throws Exception {
        // Get the snapshot
        restSnapshotMockMvc.perform(get("/api/snapshots/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSnapshot() throws Exception {
        // Initialize the database
        snapshotRepository.saveAndFlush(snapshot);
        snapshotSearchRepository.save(snapshot);
        int databaseSizeBeforeUpdate = snapshotRepository.findAll().size();

        // Update the snapshot
        Snapshot updatedSnapshot = snapshotRepository.findOne(snapshot.getId());
        updatedSnapshot
            .domainName(UPDATED_DOMAIN_NAME)
            .domainPath(UPDATED_DOMAIN_PATH)
            .createSource(UPDATED_CREATE_SOURCE)
            .dayTime(UPDATED_DAY_TIME)
            .weekTime(UPDATED_WEEK_TIME)
            .monthTime(UPDATED_MONTH_TIME)
            .yearTime(UPDATED_YEAR_TIME)
            .historyTime(UPDATED_HISTORY_TIME)
            .filePath(UPDATED_FILE_PATH)
            .state(UPDATED_STATE)
            .createBy(UPDATED_CREATE_BY)
            .createDate(UPDATED_CREATE_DATE)
            .updateBy(UPDATED_UPDATE_BY)
            .updateDate(UPDATED_UPDATE_DATE)
            .remarks(UPDATED_REMARKS)
            .delFlag(UPDATED_DEL_FLAG);

        restSnapshotMockMvc.perform(put("/api/snapshots")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSnapshot)))
            .andExpect(status().isOk());

        // Validate the Snapshot in the database
        List<Snapshot> snapshotList = snapshotRepository.findAll();
        assertThat(snapshotList).hasSize(databaseSizeBeforeUpdate);
        Snapshot testSnapshot = snapshotList.get(snapshotList.size() - 1);
        assertThat(testSnapshot.getDomainName()).isEqualTo(UPDATED_DOMAIN_NAME);
        assertThat(testSnapshot.getDomainPath()).isEqualTo(UPDATED_DOMAIN_PATH);
        assertThat(testSnapshot.getCreateSource()).isEqualTo(UPDATED_CREATE_SOURCE);
        assertThat(testSnapshot.getDayTime()).isEqualTo(UPDATED_DAY_TIME);
        assertThat(testSnapshot.getWeekTime()).isEqualTo(UPDATED_WEEK_TIME);
        assertThat(testSnapshot.getMonthTime()).isEqualTo(UPDATED_MONTH_TIME);
        assertThat(testSnapshot.getYearTime()).isEqualTo(UPDATED_YEAR_TIME);
        assertThat(testSnapshot.getHistoryTime()).isEqualTo(UPDATED_HISTORY_TIME);
        assertThat(testSnapshot.getFilePath()).isEqualTo(UPDATED_FILE_PATH);
        assertThat(testSnapshot.getState()).isEqualTo(UPDATED_STATE);
        assertThat(testSnapshot.getCreateBy()).isEqualTo(UPDATED_CREATE_BY);
        assertThat(testSnapshot.getCreateDate()).isEqualTo(UPDATED_CREATE_DATE);
        assertThat(testSnapshot.getUpdateBy()).isEqualTo(UPDATED_UPDATE_BY);
        assertThat(testSnapshot.getUpdateDate()).isEqualTo(UPDATED_UPDATE_DATE);
        assertThat(testSnapshot.getRemarks()).isEqualTo(UPDATED_REMARKS);
        assertThat(testSnapshot.getDelFlag()).isEqualTo(UPDATED_DEL_FLAG);

        // Validate the Snapshot in Elasticsearch
        Snapshot snapshotEs = snapshotSearchRepository.findOne(testSnapshot.getId());
        assertThat(snapshotEs).isEqualToComparingFieldByField(testSnapshot);
    }

    @Test
    @Transactional
    public void updateNonExistingSnapshot() throws Exception {
        int databaseSizeBeforeUpdate = snapshotRepository.findAll().size();

        // Create the Snapshot

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restSnapshotMockMvc.perform(put("/api/snapshots")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(snapshot)))
            .andExpect(status().isCreated());

        // Validate the Snapshot in the database
        List<Snapshot> snapshotList = snapshotRepository.findAll();
        assertThat(snapshotList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteSnapshot() throws Exception {
        // Initialize the database
        snapshotRepository.saveAndFlush(snapshot);
        snapshotSearchRepository.save(snapshot);
        int databaseSizeBeforeDelete = snapshotRepository.findAll().size();

        // Get the snapshot
        restSnapshotMockMvc.perform(delete("/api/snapshots/{id}", snapshot.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean snapshotExistsInEs = snapshotSearchRepository.exists(snapshot.getId());
        assertThat(snapshotExistsInEs).isFalse();

        // Validate the database is empty
        List<Snapshot> snapshotList = snapshotRepository.findAll();
        assertThat(snapshotList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchSnapshot() throws Exception {
        // Initialize the database
        snapshotRepository.saveAndFlush(snapshot);
        snapshotSearchRepository.save(snapshot);

        // Search the snapshot
        restSnapshotMockMvc.perform(get("/api/_search/snapshots?query=id:" + snapshot.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(snapshot.getId().intValue())))
            .andExpect(jsonPath("$.[*].domainName").value(hasItem(DEFAULT_DOMAIN_NAME.toString())))
            .andExpect(jsonPath("$.[*].domainPath").value(hasItem(DEFAULT_DOMAIN_PATH.toString())))
            .andExpect(jsonPath("$.[*].createSource").value(hasItem(DEFAULT_CREATE_SOURCE.toString())))
            .andExpect(jsonPath("$.[*].dayTime").value(hasItem(DEFAULT_DAY_TIME.intValue())))
            .andExpect(jsonPath("$.[*].weekTime").value(hasItem(DEFAULT_WEEK_TIME.intValue())))
            .andExpect(jsonPath("$.[*].monthTime").value(hasItem(DEFAULT_MONTH_TIME.intValue())))
            .andExpect(jsonPath("$.[*].yearTime").value(hasItem(DEFAULT_YEAR_TIME.intValue())))
            .andExpect(jsonPath("$.[*].historyTime").value(hasItem(DEFAULT_HISTORY_TIME.intValue())))
            .andExpect(jsonPath("$.[*].filePath").value(hasItem(DEFAULT_FILE_PATH.toString())))
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
        TestUtil.equalsVerifier(Snapshot.class);
        Snapshot snapshot1 = new Snapshot();
        snapshot1.setId(1L);
        Snapshot snapshot2 = new Snapshot();
        snapshot2.setId(snapshot1.getId());
        assertThat(snapshot1).isEqualTo(snapshot2);
        snapshot2.setId(2L);
        assertThat(snapshot1).isNotEqualTo(snapshot2);
        snapshot1.setId(null);
        assertThat(snapshot1).isNotEqualTo(snapshot2);
    }
}
