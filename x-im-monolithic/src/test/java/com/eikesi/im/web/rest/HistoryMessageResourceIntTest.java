package com.eikesi.im.web.rest;

import com.eikesi.im.ImApp;

import com.eikesi.im.domain.HistoryMessage;
import com.eikesi.im.repository.HistoryMessageRepository;
import com.eikesi.im.web.rest.errors.ExceptionTranslator;

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
import java.time.temporal.ChronoUnit;
import java.util.List;


import static com.eikesi.im.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the HistoryMessageResource REST controller.
 *
 * @see HistoryMessageResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ImApp.class)
public class HistoryMessageResourceIntTest {

    private static final String DEFAULT_CONTENT = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT = "BBBBBBBBBB";

    private static final String DEFAULT_STATUS = "AA";
    private static final String UPDATED_STATUS = "BB";

    private static final Instant DEFAULT_CREATED_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Long DEFAULT_CREATED_ID = 1L;
    private static final Long UPDATED_CREATED_ID = 2L;

    private static final Instant DEFAULT_TARGET_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_TARGET_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Long DEFAULT_TARGET_ID = 1L;
    private static final Long UPDATED_TARGET_ID = 2L;

    @Autowired
    private HistoryMessageRepository historyMessageRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restHistoryMessageMockMvc;

    private HistoryMessage historyMessage;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final HistoryMessageResource historyMessageResource = new HistoryMessageResource(historyMessageRepository);
        this.restHistoryMessageMockMvc = MockMvcBuilders.standaloneSetup(historyMessageResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static HistoryMessage createEntity(EntityManager em) {
        HistoryMessage historyMessage = new HistoryMessage()
            .content(DEFAULT_CONTENT)
            .status(DEFAULT_STATUS)
            .createdDate(DEFAULT_CREATED_DATE)
            .createdId(DEFAULT_CREATED_ID)
            .targetDate(DEFAULT_TARGET_DATE)
            .targetId(DEFAULT_TARGET_ID);
        return historyMessage;
    }

    @Before
    public void initTest() {
        historyMessage = createEntity(em);
    }

    @Test
    @Transactional
    public void createHistoryMessage() throws Exception {
        int databaseSizeBeforeCreate = historyMessageRepository.findAll().size();

        // Create the HistoryMessage
        restHistoryMessageMockMvc.perform(post("/api/history-messages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(historyMessage)))
            .andExpect(status().isCreated());

        // Validate the HistoryMessage in the database
        List<HistoryMessage> historyMessageList = historyMessageRepository.findAll();
        assertThat(historyMessageList).hasSize(databaseSizeBeforeCreate + 1);
        HistoryMessage testHistoryMessage = historyMessageList.get(historyMessageList.size() - 1);
        assertThat(testHistoryMessage.getContent()).isEqualTo(DEFAULT_CONTENT);
        assertThat(testHistoryMessage.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testHistoryMessage.getCreatedDate()).isEqualTo(DEFAULT_CREATED_DATE);
        assertThat(testHistoryMessage.getCreatedId()).isEqualTo(DEFAULT_CREATED_ID);
        assertThat(testHistoryMessage.getTargetDate()).isEqualTo(DEFAULT_TARGET_DATE);
        assertThat(testHistoryMessage.getTargetId()).isEqualTo(DEFAULT_TARGET_ID);
    }

    @Test
    @Transactional
    public void createHistoryMessageWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = historyMessageRepository.findAll().size();

        // Create the HistoryMessage with an existing ID
        historyMessage.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restHistoryMessageMockMvc.perform(post("/api/history-messages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(historyMessage)))
            .andExpect(status().isBadRequest());

        // Validate the HistoryMessage in the database
        List<HistoryMessage> historyMessageList = historyMessageRepository.findAll();
        assertThat(historyMessageList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkStatusIsRequired() throws Exception {
        int databaseSizeBeforeTest = historyMessageRepository.findAll().size();
        // set the field null
        historyMessage.setStatus(null);

        // Create the HistoryMessage, which fails.

        restHistoryMessageMockMvc.perform(post("/api/history-messages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(historyMessage)))
            .andExpect(status().isBadRequest());

        List<HistoryMessage> historyMessageList = historyMessageRepository.findAll();
        assertThat(historyMessageList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCreatedDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = historyMessageRepository.findAll().size();
        // set the field null
        historyMessage.setCreatedDate(null);

        // Create the HistoryMessage, which fails.

        restHistoryMessageMockMvc.perform(post("/api/history-messages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(historyMessage)))
            .andExpect(status().isBadRequest());

        List<HistoryMessage> historyMessageList = historyMessageRepository.findAll();
        assertThat(historyMessageList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCreatedIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = historyMessageRepository.findAll().size();
        // set the field null
        historyMessage.setCreatedId(null);

        // Create the HistoryMessage, which fails.

        restHistoryMessageMockMvc.perform(post("/api/history-messages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(historyMessage)))
            .andExpect(status().isBadRequest());

        List<HistoryMessage> historyMessageList = historyMessageRepository.findAll();
        assertThat(historyMessageList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTargetDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = historyMessageRepository.findAll().size();
        // set the field null
        historyMessage.setTargetDate(null);

        // Create the HistoryMessage, which fails.

        restHistoryMessageMockMvc.perform(post("/api/history-messages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(historyMessage)))
            .andExpect(status().isBadRequest());

        List<HistoryMessage> historyMessageList = historyMessageRepository.findAll();
        assertThat(historyMessageList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTargetIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = historyMessageRepository.findAll().size();
        // set the field null
        historyMessage.setTargetId(null);

        // Create the HistoryMessage, which fails.

        restHistoryMessageMockMvc.perform(post("/api/history-messages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(historyMessage)))
            .andExpect(status().isBadRequest());

        List<HistoryMessage> historyMessageList = historyMessageRepository.findAll();
        assertThat(historyMessageList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllHistoryMessages() throws Exception {
        // Initialize the database
        historyMessageRepository.saveAndFlush(historyMessage);

        // Get all the historyMessageList
        restHistoryMessageMockMvc.perform(get("/api/history-messages?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(historyMessage.getId().intValue())))
            .andExpect(jsonPath("$.[*].content").value(hasItem(DEFAULT_CONTENT.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].createdDate").value(hasItem(DEFAULT_CREATED_DATE.toString())))
            .andExpect(jsonPath("$.[*].createdId").value(hasItem(DEFAULT_CREATED_ID.intValue())))
            .andExpect(jsonPath("$.[*].targetDate").value(hasItem(DEFAULT_TARGET_DATE.toString())))
            .andExpect(jsonPath("$.[*].targetId").value(hasItem(DEFAULT_TARGET_ID.intValue())));
    }
    
    @Test
    @Transactional
    public void getHistoryMessage() throws Exception {
        // Initialize the database
        historyMessageRepository.saveAndFlush(historyMessage);

        // Get the historyMessage
        restHistoryMessageMockMvc.perform(get("/api/history-messages/{id}", historyMessage.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(historyMessage.getId().intValue()))
            .andExpect(jsonPath("$.content").value(DEFAULT_CONTENT.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()))
            .andExpect(jsonPath("$.createdDate").value(DEFAULT_CREATED_DATE.toString()))
            .andExpect(jsonPath("$.createdId").value(DEFAULT_CREATED_ID.intValue()))
            .andExpect(jsonPath("$.targetDate").value(DEFAULT_TARGET_DATE.toString()))
            .andExpect(jsonPath("$.targetId").value(DEFAULT_TARGET_ID.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingHistoryMessage() throws Exception {
        // Get the historyMessage
        restHistoryMessageMockMvc.perform(get("/api/history-messages/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateHistoryMessage() throws Exception {
        // Initialize the database
        historyMessageRepository.saveAndFlush(historyMessage);

        int databaseSizeBeforeUpdate = historyMessageRepository.findAll().size();

        // Update the historyMessage
        HistoryMessage updatedHistoryMessage = historyMessageRepository.findById(historyMessage.getId()).get();
        // Disconnect from session so that the updates on updatedHistoryMessage are not directly saved in db
        em.detach(updatedHistoryMessage);
        updatedHistoryMessage
            .content(UPDATED_CONTENT)
            .status(UPDATED_STATUS)
            .createdDate(UPDATED_CREATED_DATE)
            .createdId(UPDATED_CREATED_ID)
            .targetDate(UPDATED_TARGET_DATE)
            .targetId(UPDATED_TARGET_ID);

        restHistoryMessageMockMvc.perform(put("/api/history-messages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedHistoryMessage)))
            .andExpect(status().isOk());

        // Validate the HistoryMessage in the database
        List<HistoryMessage> historyMessageList = historyMessageRepository.findAll();
        assertThat(historyMessageList).hasSize(databaseSizeBeforeUpdate);
        HistoryMessage testHistoryMessage = historyMessageList.get(historyMessageList.size() - 1);
        assertThat(testHistoryMessage.getContent()).isEqualTo(UPDATED_CONTENT);
        assertThat(testHistoryMessage.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testHistoryMessage.getCreatedDate()).isEqualTo(UPDATED_CREATED_DATE);
        assertThat(testHistoryMessage.getCreatedId()).isEqualTo(UPDATED_CREATED_ID);
        assertThat(testHistoryMessage.getTargetDate()).isEqualTo(UPDATED_TARGET_DATE);
        assertThat(testHistoryMessage.getTargetId()).isEqualTo(UPDATED_TARGET_ID);
    }

    @Test
    @Transactional
    public void updateNonExistingHistoryMessage() throws Exception {
        int databaseSizeBeforeUpdate = historyMessageRepository.findAll().size();

        // Create the HistoryMessage

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restHistoryMessageMockMvc.perform(put("/api/history-messages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(historyMessage)))
            .andExpect(status().isBadRequest());

        // Validate the HistoryMessage in the database
        List<HistoryMessage> historyMessageList = historyMessageRepository.findAll();
        assertThat(historyMessageList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteHistoryMessage() throws Exception {
        // Initialize the database
        historyMessageRepository.saveAndFlush(historyMessage);

        int databaseSizeBeforeDelete = historyMessageRepository.findAll().size();

        // Get the historyMessage
        restHistoryMessageMockMvc.perform(delete("/api/history-messages/{id}", historyMessage.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<HistoryMessage> historyMessageList = historyMessageRepository.findAll();
        assertThat(historyMessageList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(HistoryMessage.class);
        HistoryMessage historyMessage1 = new HistoryMessage();
        historyMessage1.setId(1L);
        HistoryMessage historyMessage2 = new HistoryMessage();
        historyMessage2.setId(historyMessage1.getId());
        assertThat(historyMessage1).isEqualTo(historyMessage2);
        historyMessage2.setId(2L);
        assertThat(historyMessage1).isNotEqualTo(historyMessage2);
        historyMessage1.setId(null);
        assertThat(historyMessage1).isNotEqualTo(historyMessage2);
    }
}
