package com.eikesi.manage.web.rest;

import com.eikesi.manage.ManageGatewayApp;

import com.eikesi.manage.config.SecurityBeanOverrideConfiguration;

import com.eikesi.manage.domain.Dialogue;
import com.eikesi.manage.repository.DialogueRepository;
import com.eikesi.manage.repository.search.DialogueSearchRepository;
import com.eikesi.manage.service.DialogueService;
import com.eikesi.manage.service.dto.DialogueDTO;
import com.eikesi.manage.service.mapper.DialogueMapper;
import com.eikesi.manage.web.rest.errors.ExceptionTranslator;

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


import static com.eikesi.manage.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the DialogueResource REST controller.
 *
 * @see DialogueResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = {SecurityBeanOverrideConfiguration.class, ManageGatewayApp.class})
public class DialogueResourceIntTest {

    private static final Instant DEFAULT_CREATED_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Long DEFAULT_CREATED_ID = 1L;
    private static final Long UPDATED_CREATED_ID = 2L;

    private static final Long DEFAULT_TARGET_ID = 1L;
    private static final Long UPDATED_TARGET_ID = 2L;

    private static final String DEFAULT_TARGET_TYPE = "AA";
    private static final String UPDATED_TARGET_TYPE = "BB";

    @Autowired
    private DialogueRepository dialogueRepository;


    @Autowired
    private DialogueMapper dialogueMapper;
    

    @Autowired
    private DialogueService dialogueService;

    /**
     * This repository is mocked in the com.eikesi.manage.repository.search test package.
     *
     * @see com.eikesi.manage.repository.search.DialogueSearchRepositoryMockConfiguration
     */
    @Autowired
    private DialogueSearchRepository mockDialogueSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restDialogueMockMvc;

    private Dialogue dialogue;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DialogueResource dialogueResource = new DialogueResource(dialogueService);
        this.restDialogueMockMvc = MockMvcBuilders.standaloneSetup(dialogueResource)
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
    public static Dialogue createEntity(EntityManager em) {
        Dialogue dialogue = new Dialogue()
            .createdDate(DEFAULT_CREATED_DATE)
            .createdId(DEFAULT_CREATED_ID)
            .targetId(DEFAULT_TARGET_ID)
            .targetType(DEFAULT_TARGET_TYPE);
        return dialogue;
    }

    @Before
    public void initTest() {
        dialogue = createEntity(em);
    }

    @Test
    @Transactional
    public void createDialogue() throws Exception {
        int databaseSizeBeforeCreate = dialogueRepository.findAll().size();

        // Create the Dialogue
        DialogueDTO dialogueDTO = dialogueMapper.toDto(dialogue);
        restDialogueMockMvc.perform(post("/api/dialogues")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dialogueDTO)))
            .andExpect(status().isCreated());

        // Validate the Dialogue in the database
        List<Dialogue> dialogueList = dialogueRepository.findAll();
        assertThat(dialogueList).hasSize(databaseSizeBeforeCreate + 1);
        Dialogue testDialogue = dialogueList.get(dialogueList.size() - 1);
        assertThat(testDialogue.getCreatedDate()).isEqualTo(DEFAULT_CREATED_DATE);
        assertThat(testDialogue.getCreatedId()).isEqualTo(DEFAULT_CREATED_ID);
        assertThat(testDialogue.getTargetId()).isEqualTo(DEFAULT_TARGET_ID);
        assertThat(testDialogue.getTargetType()).isEqualTo(DEFAULT_TARGET_TYPE);

        // Validate the Dialogue in Elasticsearch
        verify(mockDialogueSearchRepository, times(1)).save(testDialogue);
    }

    @Test
    @Transactional
    public void createDialogueWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = dialogueRepository.findAll().size();

        // Create the Dialogue with an existing ID
        dialogue.setId(1L);
        DialogueDTO dialogueDTO = dialogueMapper.toDto(dialogue);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDialogueMockMvc.perform(post("/api/dialogues")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dialogueDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Dialogue in the database
        List<Dialogue> dialogueList = dialogueRepository.findAll();
        assertThat(dialogueList).hasSize(databaseSizeBeforeCreate);

        // Validate the Dialogue in Elasticsearch
        verify(mockDialogueSearchRepository, times(0)).save(dialogue);
    }

    @Test
    @Transactional
    public void checkCreatedDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = dialogueRepository.findAll().size();
        // set the field null
        dialogue.setCreatedDate(null);

        // Create the Dialogue, which fails.
        DialogueDTO dialogueDTO = dialogueMapper.toDto(dialogue);

        restDialogueMockMvc.perform(post("/api/dialogues")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dialogueDTO)))
            .andExpect(status().isBadRequest());

        List<Dialogue> dialogueList = dialogueRepository.findAll();
        assertThat(dialogueList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCreatedIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = dialogueRepository.findAll().size();
        // set the field null
        dialogue.setCreatedId(null);

        // Create the Dialogue, which fails.
        DialogueDTO dialogueDTO = dialogueMapper.toDto(dialogue);

        restDialogueMockMvc.perform(post("/api/dialogues")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dialogueDTO)))
            .andExpect(status().isBadRequest());

        List<Dialogue> dialogueList = dialogueRepository.findAll();
        assertThat(dialogueList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTargetIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = dialogueRepository.findAll().size();
        // set the field null
        dialogue.setTargetId(null);

        // Create the Dialogue, which fails.
        DialogueDTO dialogueDTO = dialogueMapper.toDto(dialogue);

        restDialogueMockMvc.perform(post("/api/dialogues")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dialogueDTO)))
            .andExpect(status().isBadRequest());

        List<Dialogue> dialogueList = dialogueRepository.findAll();
        assertThat(dialogueList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTargetTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = dialogueRepository.findAll().size();
        // set the field null
        dialogue.setTargetType(null);

        // Create the Dialogue, which fails.
        DialogueDTO dialogueDTO = dialogueMapper.toDto(dialogue);

        restDialogueMockMvc.perform(post("/api/dialogues")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dialogueDTO)))
            .andExpect(status().isBadRequest());

        List<Dialogue> dialogueList = dialogueRepository.findAll();
        assertThat(dialogueList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllDialogues() throws Exception {
        // Initialize the database
        dialogueRepository.saveAndFlush(dialogue);

        // Get all the dialogueList
        restDialogueMockMvc.perform(get("/api/dialogues?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(dialogue.getId().intValue())))
            .andExpect(jsonPath("$.[*].createdDate").value(hasItem(DEFAULT_CREATED_DATE.toString())))
            .andExpect(jsonPath("$.[*].createdId").value(hasItem(DEFAULT_CREATED_ID.intValue())))
            .andExpect(jsonPath("$.[*].targetId").value(hasItem(DEFAULT_TARGET_ID.intValue())))
            .andExpect(jsonPath("$.[*].targetType").value(hasItem(DEFAULT_TARGET_TYPE.toString())));
    }
    

    @Test
    @Transactional
    public void getDialogue() throws Exception {
        // Initialize the database
        dialogueRepository.saveAndFlush(dialogue);

        // Get the dialogue
        restDialogueMockMvc.perform(get("/api/dialogues/{id}", dialogue.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(dialogue.getId().intValue()))
            .andExpect(jsonPath("$.createdDate").value(DEFAULT_CREATED_DATE.toString()))
            .andExpect(jsonPath("$.createdId").value(DEFAULT_CREATED_ID.intValue()))
            .andExpect(jsonPath("$.targetId").value(DEFAULT_TARGET_ID.intValue()))
            .andExpect(jsonPath("$.targetType").value(DEFAULT_TARGET_TYPE.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingDialogue() throws Exception {
        // Get the dialogue
        restDialogueMockMvc.perform(get("/api/dialogues/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDialogue() throws Exception {
        // Initialize the database
        dialogueRepository.saveAndFlush(dialogue);

        int databaseSizeBeforeUpdate = dialogueRepository.findAll().size();

        // Update the dialogue
        Dialogue updatedDialogue = dialogueRepository.findById(dialogue.getId()).get();
        // Disconnect from session so that the updates on updatedDialogue are not directly saved in db
        em.detach(updatedDialogue);
        updatedDialogue
            .createdDate(UPDATED_CREATED_DATE)
            .createdId(UPDATED_CREATED_ID)
            .targetId(UPDATED_TARGET_ID)
            .targetType(UPDATED_TARGET_TYPE);
        DialogueDTO dialogueDTO = dialogueMapper.toDto(updatedDialogue);

        restDialogueMockMvc.perform(put("/api/dialogues")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dialogueDTO)))
            .andExpect(status().isOk());

        // Validate the Dialogue in the database
        List<Dialogue> dialogueList = dialogueRepository.findAll();
        assertThat(dialogueList).hasSize(databaseSizeBeforeUpdate);
        Dialogue testDialogue = dialogueList.get(dialogueList.size() - 1);
        assertThat(testDialogue.getCreatedDate()).isEqualTo(UPDATED_CREATED_DATE);
        assertThat(testDialogue.getCreatedId()).isEqualTo(UPDATED_CREATED_ID);
        assertThat(testDialogue.getTargetId()).isEqualTo(UPDATED_TARGET_ID);
        assertThat(testDialogue.getTargetType()).isEqualTo(UPDATED_TARGET_TYPE);

        // Validate the Dialogue in Elasticsearch
        verify(mockDialogueSearchRepository, times(1)).save(testDialogue);
    }

    @Test
    @Transactional
    public void updateNonExistingDialogue() throws Exception {
        int databaseSizeBeforeUpdate = dialogueRepository.findAll().size();

        // Create the Dialogue
        DialogueDTO dialogueDTO = dialogueMapper.toDto(dialogue);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restDialogueMockMvc.perform(put("/api/dialogues")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dialogueDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Dialogue in the database
        List<Dialogue> dialogueList = dialogueRepository.findAll();
        assertThat(dialogueList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Dialogue in Elasticsearch
        verify(mockDialogueSearchRepository, times(0)).save(dialogue);
    }

    @Test
    @Transactional
    public void deleteDialogue() throws Exception {
        // Initialize the database
        dialogueRepository.saveAndFlush(dialogue);

        int databaseSizeBeforeDelete = dialogueRepository.findAll().size();

        // Get the dialogue
        restDialogueMockMvc.perform(delete("/api/dialogues/{id}", dialogue.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Dialogue> dialogueList = dialogueRepository.findAll();
        assertThat(dialogueList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Dialogue in Elasticsearch
        verify(mockDialogueSearchRepository, times(1)).deleteById(dialogue.getId());
    }

    @Test
    @Transactional
    public void searchDialogue() throws Exception {
        // Initialize the database
        dialogueRepository.saveAndFlush(dialogue);
        when(mockDialogueSearchRepository.search(queryStringQuery("id:" + dialogue.getId())))
            .thenReturn(Collections.singletonList(dialogue));
        // Search the dialogue
        restDialogueMockMvc.perform(get("/api/_search/dialogues?query=id:" + dialogue.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(dialogue.getId().intValue())))
            .andExpect(jsonPath("$.[*].createdDate").value(hasItem(DEFAULT_CREATED_DATE.toString())))
            .andExpect(jsonPath("$.[*].createdId").value(hasItem(DEFAULT_CREATED_ID.intValue())))
            .andExpect(jsonPath("$.[*].targetId").value(hasItem(DEFAULT_TARGET_ID.intValue())))
            .andExpect(jsonPath("$.[*].targetType").value(hasItem(DEFAULT_TARGET_TYPE.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Dialogue.class);
        Dialogue dialogue1 = new Dialogue();
        dialogue1.setId(1L);
        Dialogue dialogue2 = new Dialogue();
        dialogue2.setId(dialogue1.getId());
        assertThat(dialogue1).isEqualTo(dialogue2);
        dialogue2.setId(2L);
        assertThat(dialogue1).isNotEqualTo(dialogue2);
        dialogue1.setId(null);
        assertThat(dialogue1).isNotEqualTo(dialogue2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(DialogueDTO.class);
        DialogueDTO dialogueDTO1 = new DialogueDTO();
        dialogueDTO1.setId(1L);
        DialogueDTO dialogueDTO2 = new DialogueDTO();
        assertThat(dialogueDTO1).isNotEqualTo(dialogueDTO2);
        dialogueDTO2.setId(dialogueDTO1.getId());
        assertThat(dialogueDTO1).isEqualTo(dialogueDTO2);
        dialogueDTO2.setId(2L);
        assertThat(dialogueDTO1).isNotEqualTo(dialogueDTO2);
        dialogueDTO1.setId(null);
        assertThat(dialogueDTO1).isNotEqualTo(dialogueDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(dialogueMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(dialogueMapper.fromId(null)).isNull();
    }
}
