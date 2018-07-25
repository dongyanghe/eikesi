package com.eikesi.im.web.web.rest;

import com.eikesi.im.web.ImWebGatewayApp;

import com.eikesi.im.web.config.SecurityBeanOverrideConfiguration;

import com.eikesi.im.web.domain.CurrentMessage;
import com.eikesi.im.web.repository.CurrentMessageRepository;
import com.eikesi.im.web.repository.search.CurrentMessageSearchRepository;
import com.eikesi.im.web.service.CurrentMessageService;
import com.eikesi.im.web.service.dto.CurrentMessageDTO;
import com.eikesi.im.web.service.mapper.CurrentMessageMapper;
import com.eikesi.im.web.web.rest.errors.ExceptionTranslator;

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
import java.util.Collections;
import java.util.List;


import static com.eikesi.im.web.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the CurrentMessageResource REST controller.
 *
 * @see CurrentMessageResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = {SecurityBeanOverrideConfiguration.class, ImWebGatewayApp.class})
public class CurrentMessageResourceIntTest {

    private static final String DEFAULT_CONTENT = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT = "BBBBBBBBBB";

    private static final String DEFAULT_STATUS = "AA";
    private static final String UPDATED_STATUS = "BB";

    private static final String DEFAULT_TYPE = "AA";
    private static final String UPDATED_TYPE = "BB";

    private static final Instant DEFAULT_CREATED_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Long DEFAULT_CREATED_ID = 1L;
    private static final Long UPDATED_CREATED_ID = 2L;

    private static final Instant DEFAULT_TARGET_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_TARGET_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Long DEFAULT_TARGET_ID = 1L;
    private static final Long UPDATED_TARGET_ID = 2L;

    @Autowired
    private CurrentMessageRepository currentMessageRepository;


    @Autowired
    private CurrentMessageMapper currentMessageMapper;
    

    @Autowired
    private CurrentMessageService currentMessageService;

    /**
     * This repository is mocked in the com.eikesi.im.web.repository.search test package.
     *
     * @see com.eikesi.im.web.repository.search.CurrentMessageSearchRepositoryMockConfiguration
     */
    @Autowired
    private CurrentMessageSearchRepository mockCurrentMessageSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCurrentMessageMockMvc;

    private CurrentMessage currentMessage;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CurrentMessageResource currentMessageResource = new CurrentMessageResource(currentMessageService);
        this.restCurrentMessageMockMvc = MockMvcBuilders.standaloneSetup(currentMessageResource)
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
    public static CurrentMessage createEntity(EntityManager em) {
        CurrentMessage currentMessage = new CurrentMessage()
            .content(DEFAULT_CONTENT)
            .status(DEFAULT_STATUS)
            .type(DEFAULT_TYPE)
            .createdDate(DEFAULT_CREATED_DATE)
            .createdId(DEFAULT_CREATED_ID)
            .targetDate(DEFAULT_TARGET_DATE)
            .targetId(DEFAULT_TARGET_ID);
        return currentMessage;
    }

    @Before
    public void initTest() {
        currentMessage = createEntity(em);
    }

    @Test
    @Transactional
    public void createCurrentMessage() throws Exception {
        int databaseSizeBeforeCreate = currentMessageRepository.findAll().size();

        // Create the CurrentMessage
        CurrentMessageDTO currentMessageDTO = currentMessageMapper.toDto(currentMessage);
        restCurrentMessageMockMvc.perform(post("/api/current-messages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(currentMessageDTO)))
            .andExpect(status().isCreated());

        // Validate the CurrentMessage in the database
        List<CurrentMessage> currentMessageList = currentMessageRepository.findAll();
        assertThat(currentMessageList).hasSize(databaseSizeBeforeCreate + 1);
        CurrentMessage testCurrentMessage = currentMessageList.get(currentMessageList.size() - 1);
        assertThat(testCurrentMessage.getContent()).isEqualTo(DEFAULT_CONTENT);
        assertThat(testCurrentMessage.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testCurrentMessage.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testCurrentMessage.getCreatedDate()).isEqualTo(DEFAULT_CREATED_DATE);
        assertThat(testCurrentMessage.getCreatedId()).isEqualTo(DEFAULT_CREATED_ID);
        assertThat(testCurrentMessage.getTargetDate()).isEqualTo(DEFAULT_TARGET_DATE);
        assertThat(testCurrentMessage.getTargetId()).isEqualTo(DEFAULT_TARGET_ID);

        // Validate the CurrentMessage in Elasticsearch
        verify(mockCurrentMessageSearchRepository, times(1)).save(testCurrentMessage);
    }

    @Test
    @Transactional
    public void createCurrentMessageWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = currentMessageRepository.findAll().size();

        // Create the CurrentMessage with an existing ID
        currentMessage.setId(1L);
        CurrentMessageDTO currentMessageDTO = currentMessageMapper.toDto(currentMessage);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCurrentMessageMockMvc.perform(post("/api/current-messages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(currentMessageDTO)))
            .andExpect(status().isBadRequest());

        // Validate the CurrentMessage in the database
        List<CurrentMessage> currentMessageList = currentMessageRepository.findAll();
        assertThat(currentMessageList).hasSize(databaseSizeBeforeCreate);

        // Validate the CurrentMessage in Elasticsearch
        verify(mockCurrentMessageSearchRepository, times(0)).save(currentMessage);
    }

    @Test
    @Transactional
    public void checkStatusIsRequired() throws Exception {
        int databaseSizeBeforeTest = currentMessageRepository.findAll().size();
        // set the field null
        currentMessage.setStatus(null);

        // Create the CurrentMessage, which fails.
        CurrentMessageDTO currentMessageDTO = currentMessageMapper.toDto(currentMessage);

        restCurrentMessageMockMvc.perform(post("/api/current-messages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(currentMessageDTO)))
            .andExpect(status().isBadRequest());

        List<CurrentMessage> currentMessageList = currentMessageRepository.findAll();
        assertThat(currentMessageList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = currentMessageRepository.findAll().size();
        // set the field null
        currentMessage.setType(null);

        // Create the CurrentMessage, which fails.
        CurrentMessageDTO currentMessageDTO = currentMessageMapper.toDto(currentMessage);

        restCurrentMessageMockMvc.perform(post("/api/current-messages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(currentMessageDTO)))
            .andExpect(status().isBadRequest());

        List<CurrentMessage> currentMessageList = currentMessageRepository.findAll();
        assertThat(currentMessageList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCreatedDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = currentMessageRepository.findAll().size();
        // set the field null
        currentMessage.setCreatedDate(null);

        // Create the CurrentMessage, which fails.
        CurrentMessageDTO currentMessageDTO = currentMessageMapper.toDto(currentMessage);

        restCurrentMessageMockMvc.perform(post("/api/current-messages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(currentMessageDTO)))
            .andExpect(status().isBadRequest());

        List<CurrentMessage> currentMessageList = currentMessageRepository.findAll();
        assertThat(currentMessageList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCreatedIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = currentMessageRepository.findAll().size();
        // set the field null
        currentMessage.setCreatedId(null);

        // Create the CurrentMessage, which fails.
        CurrentMessageDTO currentMessageDTO = currentMessageMapper.toDto(currentMessage);

        restCurrentMessageMockMvc.perform(post("/api/current-messages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(currentMessageDTO)))
            .andExpect(status().isBadRequest());

        List<CurrentMessage> currentMessageList = currentMessageRepository.findAll();
        assertThat(currentMessageList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTargetDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = currentMessageRepository.findAll().size();
        // set the field null
        currentMessage.setTargetDate(null);

        // Create the CurrentMessage, which fails.
        CurrentMessageDTO currentMessageDTO = currentMessageMapper.toDto(currentMessage);

        restCurrentMessageMockMvc.perform(post("/api/current-messages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(currentMessageDTO)))
            .andExpect(status().isBadRequest());

        List<CurrentMessage> currentMessageList = currentMessageRepository.findAll();
        assertThat(currentMessageList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTargetIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = currentMessageRepository.findAll().size();
        // set the field null
        currentMessage.setTargetId(null);

        // Create the CurrentMessage, which fails.
        CurrentMessageDTO currentMessageDTO = currentMessageMapper.toDto(currentMessage);

        restCurrentMessageMockMvc.perform(post("/api/current-messages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(currentMessageDTO)))
            .andExpect(status().isBadRequest());

        List<CurrentMessage> currentMessageList = currentMessageRepository.findAll();
        assertThat(currentMessageList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCurrentMessages() throws Exception {
        // Initialize the database
        currentMessageRepository.saveAndFlush(currentMessage);

        // Get all the currentMessageList
        restCurrentMessageMockMvc.perform(get("/api/current-messages?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(currentMessage.getId().intValue())))
            .andExpect(jsonPath("$.[*].content").value(hasItem(DEFAULT_CONTENT.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].createdDate").value(hasItem(DEFAULT_CREATED_DATE.toString())))
            .andExpect(jsonPath("$.[*].createdId").value(hasItem(DEFAULT_CREATED_ID.intValue())))
            .andExpect(jsonPath("$.[*].targetDate").value(hasItem(DEFAULT_TARGET_DATE.toString())))
            .andExpect(jsonPath("$.[*].targetId").value(hasItem(DEFAULT_TARGET_ID.intValue())));
    }
    

    @Test
    @Transactional
    public void getCurrentMessage() throws Exception {
        // Initialize the database
        currentMessageRepository.saveAndFlush(currentMessage);

        // Get the currentMessage
        restCurrentMessageMockMvc.perform(get("/api/current-messages/{id}", currentMessage.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(currentMessage.getId().intValue()))
            .andExpect(jsonPath("$.content").value(DEFAULT_CONTENT.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()))
            .andExpect(jsonPath("$.createdDate").value(DEFAULT_CREATED_DATE.toString()))
            .andExpect(jsonPath("$.createdId").value(DEFAULT_CREATED_ID.intValue()))
            .andExpect(jsonPath("$.targetDate").value(DEFAULT_TARGET_DATE.toString()))
            .andExpect(jsonPath("$.targetId").value(DEFAULT_TARGET_ID.intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingCurrentMessage() throws Exception {
        // Get the currentMessage
        restCurrentMessageMockMvc.perform(get("/api/current-messages/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCurrentMessage() throws Exception {
        // Initialize the database
        currentMessageRepository.saveAndFlush(currentMessage);

        int databaseSizeBeforeUpdate = currentMessageRepository.findAll().size();

        // Update the currentMessage
        CurrentMessage updatedCurrentMessage = currentMessageRepository.findById(currentMessage.getId()).get();
        // Disconnect from session so that the updates on updatedCurrentMessage are not directly saved in db
        em.detach(updatedCurrentMessage);
        updatedCurrentMessage
            .content(UPDATED_CONTENT)
            .status(UPDATED_STATUS)
            .type(UPDATED_TYPE)
            .createdDate(UPDATED_CREATED_DATE)
            .createdId(UPDATED_CREATED_ID)
            .targetDate(UPDATED_TARGET_DATE)
            .targetId(UPDATED_TARGET_ID);
        CurrentMessageDTO currentMessageDTO = currentMessageMapper.toDto(updatedCurrentMessage);

        restCurrentMessageMockMvc.perform(put("/api/current-messages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(currentMessageDTO)))
            .andExpect(status().isOk());

        // Validate the CurrentMessage in the database
        List<CurrentMessage> currentMessageList = currentMessageRepository.findAll();
        assertThat(currentMessageList).hasSize(databaseSizeBeforeUpdate);
        CurrentMessage testCurrentMessage = currentMessageList.get(currentMessageList.size() - 1);
        assertThat(testCurrentMessage.getContent()).isEqualTo(UPDATED_CONTENT);
        assertThat(testCurrentMessage.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testCurrentMessage.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testCurrentMessage.getCreatedDate()).isEqualTo(UPDATED_CREATED_DATE);
        assertThat(testCurrentMessage.getCreatedId()).isEqualTo(UPDATED_CREATED_ID);
        assertThat(testCurrentMessage.getTargetDate()).isEqualTo(UPDATED_TARGET_DATE);
        assertThat(testCurrentMessage.getTargetId()).isEqualTo(UPDATED_TARGET_ID);

        // Validate the CurrentMessage in Elasticsearch
        verify(mockCurrentMessageSearchRepository, times(1)).save(testCurrentMessage);
    }

    @Test
    @Transactional
    public void updateNonExistingCurrentMessage() throws Exception {
        int databaseSizeBeforeUpdate = currentMessageRepository.findAll().size();

        // Create the CurrentMessage
        CurrentMessageDTO currentMessageDTO = currentMessageMapper.toDto(currentMessage);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCurrentMessageMockMvc.perform(put("/api/current-messages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(currentMessageDTO)))
            .andExpect(status().isBadRequest());

        // Validate the CurrentMessage in the database
        List<CurrentMessage> currentMessageList = currentMessageRepository.findAll();
        assertThat(currentMessageList).hasSize(databaseSizeBeforeUpdate);

        // Validate the CurrentMessage in Elasticsearch
        verify(mockCurrentMessageSearchRepository, times(0)).save(currentMessage);
    }

    @Test
    @Transactional
    public void deleteCurrentMessage() throws Exception {
        // Initialize the database
        currentMessageRepository.saveAndFlush(currentMessage);

        int databaseSizeBeforeDelete = currentMessageRepository.findAll().size();

        // Get the currentMessage
        restCurrentMessageMockMvc.perform(delete("/api/current-messages/{id}", currentMessage.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CurrentMessage> currentMessageList = currentMessageRepository.findAll();
        assertThat(currentMessageList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the CurrentMessage in Elasticsearch
        verify(mockCurrentMessageSearchRepository, times(1)).deleteById(currentMessage.getId());
    }

    @Test
    @Transactional
    public void searchCurrentMessage() throws Exception {
        // Initialize the database
        currentMessageRepository.saveAndFlush(currentMessage);
        when(mockCurrentMessageSearchRepository.search(queryStringQuery("id:" + currentMessage.getId())))
            .thenReturn(Collections.singletonList(currentMessage));
        // Search the currentMessage
        restCurrentMessageMockMvc.perform(get("/api/_search/current-messages?query=id:" + currentMessage.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(currentMessage.getId().intValue())))
            .andExpect(jsonPath("$.[*].content").value(hasItem(DEFAULT_CONTENT.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].createdDate").value(hasItem(DEFAULT_CREATED_DATE.toString())))
            .andExpect(jsonPath("$.[*].createdId").value(hasItem(DEFAULT_CREATED_ID.intValue())))
            .andExpect(jsonPath("$.[*].targetDate").value(hasItem(DEFAULT_TARGET_DATE.toString())))
            .andExpect(jsonPath("$.[*].targetId").value(hasItem(DEFAULT_TARGET_ID.intValue())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CurrentMessage.class);
        CurrentMessage currentMessage1 = new CurrentMessage();
        currentMessage1.setId(1L);
        CurrentMessage currentMessage2 = new CurrentMessage();
        currentMessage2.setId(currentMessage1.getId());
        assertThat(currentMessage1).isEqualTo(currentMessage2);
        currentMessage2.setId(2L);
        assertThat(currentMessage1).isNotEqualTo(currentMessage2);
        currentMessage1.setId(null);
        assertThat(currentMessage1).isNotEqualTo(currentMessage2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CurrentMessageDTO.class);
        CurrentMessageDTO currentMessageDTO1 = new CurrentMessageDTO();
        currentMessageDTO1.setId(1L);
        CurrentMessageDTO currentMessageDTO2 = new CurrentMessageDTO();
        assertThat(currentMessageDTO1).isNotEqualTo(currentMessageDTO2);
        currentMessageDTO2.setId(currentMessageDTO1.getId());
        assertThat(currentMessageDTO1).isEqualTo(currentMessageDTO2);
        currentMessageDTO2.setId(2L);
        assertThat(currentMessageDTO1).isNotEqualTo(currentMessageDTO2);
        currentMessageDTO1.setId(null);
        assertThat(currentMessageDTO1).isNotEqualTo(currentMessageDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(currentMessageMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(currentMessageMapper.fromId(null)).isNull();
    }
}
