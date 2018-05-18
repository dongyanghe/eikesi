package com.eikesi.customer.service.web.rest;

import com.eikesi.customer.service.CustomerServiceApp;

import com.eikesi.customer.service.domain.FlockRelation;
import com.eikesi.customer.service.repository.FlockRelationRepository;
import com.eikesi.customer.service.service.FlockRelationService;
import com.eikesi.customer.service.service.dto.FlockRelationDTO;
import com.eikesi.customer.service.service.mapper.FlockRelationMapper;
import com.eikesi.customer.service.web.rest.errors.ExceptionTranslator;

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

import static com.eikesi.customer.service.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the FlockRelationResource REST controller.
 *
 * @see FlockRelationResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CustomerServiceApp.class)
public class FlockRelationResourceIntTest {

    private static final String DEFAULT_REMARK_NAME = "AAAAAAAAAA";
    private static final String UPDATED_REMARK_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_PY = "AAAAAAAAAA";
    private static final String UPDATED_PY = "BBBBBBBBBB";

    private static final String DEFAULT_PIN_YIN = "AAAAAAAAAA";
    private static final String UPDATED_PIN_YIN = "BBBBBBBBBB";

    private static final String DEFAULT_TYPE = "AA";
    private static final String UPDATED_TYPE = "BB";

    private static final Instant DEFAULT_CREATED_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private FlockRelationRepository flockRelationRepository;

    @Autowired
    private FlockRelationMapper flockRelationMapper;

    @Autowired
    private FlockRelationService flockRelationService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restFlockRelationMockMvc;

    private FlockRelation flockRelation;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FlockRelationResource flockRelationResource = new FlockRelationResource(flockRelationService);
        this.restFlockRelationMockMvc = MockMvcBuilders.standaloneSetup(flockRelationResource)
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
    public static FlockRelation createEntity(EntityManager em) {
        FlockRelation flockRelation = new FlockRelation()
            .remarkName(DEFAULT_REMARK_NAME)
            .py(DEFAULT_PY)
            .pinYin(DEFAULT_PIN_YIN)
            .type(DEFAULT_TYPE)
            .createdDate(DEFAULT_CREATED_DATE);
        return flockRelation;
    }

    @Before
    public void initTest() {
        flockRelation = createEntity(em);
    }

    @Test
    @Transactional
    public void createFlockRelation() throws Exception {
        int databaseSizeBeforeCreate = flockRelationRepository.findAll().size();

        // Create the FlockRelation
        FlockRelationDTO flockRelationDTO = flockRelationMapper.toDto(flockRelation);
        restFlockRelationMockMvc.perform(post("/api/flock-relations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(flockRelationDTO)))
            .andExpect(status().isCreated());

        // Validate the FlockRelation in the database
        List<FlockRelation> flockRelationList = flockRelationRepository.findAll();
        assertThat(flockRelationList).hasSize(databaseSizeBeforeCreate + 1);
        FlockRelation testFlockRelation = flockRelationList.get(flockRelationList.size() - 1);
        assertThat(testFlockRelation.getRemarkName()).isEqualTo(DEFAULT_REMARK_NAME);
        assertThat(testFlockRelation.getPy()).isEqualTo(DEFAULT_PY);
        assertThat(testFlockRelation.getPinYin()).isEqualTo(DEFAULT_PIN_YIN);
        assertThat(testFlockRelation.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testFlockRelation.getCreatedDate()).isEqualTo(DEFAULT_CREATED_DATE);
    }

    @Test
    @Transactional
    public void createFlockRelationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = flockRelationRepository.findAll().size();

        // Create the FlockRelation with an existing ID
        flockRelation.setId(1L);
        FlockRelationDTO flockRelationDTO = flockRelationMapper.toDto(flockRelation);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFlockRelationMockMvc.perform(post("/api/flock-relations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(flockRelationDTO)))
            .andExpect(status().isBadRequest());

        // Validate the FlockRelation in the database
        List<FlockRelation> flockRelationList = flockRelationRepository.findAll();
        assertThat(flockRelationList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkPyIsRequired() throws Exception {
        int databaseSizeBeforeTest = flockRelationRepository.findAll().size();
        // set the field null
        flockRelation.setPy(null);

        // Create the FlockRelation, which fails.
        FlockRelationDTO flockRelationDTO = flockRelationMapper.toDto(flockRelation);

        restFlockRelationMockMvc.perform(post("/api/flock-relations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(flockRelationDTO)))
            .andExpect(status().isBadRequest());

        List<FlockRelation> flockRelationList = flockRelationRepository.findAll();
        assertThat(flockRelationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPinYinIsRequired() throws Exception {
        int databaseSizeBeforeTest = flockRelationRepository.findAll().size();
        // set the field null
        flockRelation.setPinYin(null);

        // Create the FlockRelation, which fails.
        FlockRelationDTO flockRelationDTO = flockRelationMapper.toDto(flockRelation);

        restFlockRelationMockMvc.perform(post("/api/flock-relations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(flockRelationDTO)))
            .andExpect(status().isBadRequest());

        List<FlockRelation> flockRelationList = flockRelationRepository.findAll();
        assertThat(flockRelationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = flockRelationRepository.findAll().size();
        // set the field null
        flockRelation.setType(null);

        // Create the FlockRelation, which fails.
        FlockRelationDTO flockRelationDTO = flockRelationMapper.toDto(flockRelation);

        restFlockRelationMockMvc.perform(post("/api/flock-relations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(flockRelationDTO)))
            .andExpect(status().isBadRequest());

        List<FlockRelation> flockRelationList = flockRelationRepository.findAll();
        assertThat(flockRelationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCreatedDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = flockRelationRepository.findAll().size();
        // set the field null
        flockRelation.setCreatedDate(null);

        // Create the FlockRelation, which fails.
        FlockRelationDTO flockRelationDTO = flockRelationMapper.toDto(flockRelation);

        restFlockRelationMockMvc.perform(post("/api/flock-relations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(flockRelationDTO)))
            .andExpect(status().isBadRequest());

        List<FlockRelation> flockRelationList = flockRelationRepository.findAll();
        assertThat(flockRelationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllFlockRelations() throws Exception {
        // Initialize the database
        flockRelationRepository.saveAndFlush(flockRelation);

        // Get all the flockRelationList
        restFlockRelationMockMvc.perform(get("/api/flock-relations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(flockRelation.getId().intValue())))
            .andExpect(jsonPath("$.[*].remarkName").value(hasItem(DEFAULT_REMARK_NAME.toString())))
            .andExpect(jsonPath("$.[*].py").value(hasItem(DEFAULT_PY.toString())))
            .andExpect(jsonPath("$.[*].pinYin").value(hasItem(DEFAULT_PIN_YIN.toString())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].createdDate").value(hasItem(DEFAULT_CREATED_DATE.toString())));
    }

    @Test
    @Transactional
    public void getFlockRelation() throws Exception {
        // Initialize the database
        flockRelationRepository.saveAndFlush(flockRelation);

        // Get the flockRelation
        restFlockRelationMockMvc.perform(get("/api/flock-relations/{id}", flockRelation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(flockRelation.getId().intValue()))
            .andExpect(jsonPath("$.remarkName").value(DEFAULT_REMARK_NAME.toString()))
            .andExpect(jsonPath("$.py").value(DEFAULT_PY.toString()))
            .andExpect(jsonPath("$.pinYin").value(DEFAULT_PIN_YIN.toString()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()))
            .andExpect(jsonPath("$.createdDate").value(DEFAULT_CREATED_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingFlockRelation() throws Exception {
        // Get the flockRelation
        restFlockRelationMockMvc.perform(get("/api/flock-relations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFlockRelation() throws Exception {
        // Initialize the database
        flockRelationRepository.saveAndFlush(flockRelation);
        int databaseSizeBeforeUpdate = flockRelationRepository.findAll().size();

        // Update the flockRelation
        FlockRelation updatedFlockRelation = flockRelationRepository.findOne(flockRelation.getId());
        // Disconnect from session so that the updates on updatedFlockRelation are not directly saved in db
        em.detach(updatedFlockRelation);
        updatedFlockRelation
            .remarkName(UPDATED_REMARK_NAME)
            .py(UPDATED_PY)
            .pinYin(UPDATED_PIN_YIN)
            .type(UPDATED_TYPE)
            .createdDate(UPDATED_CREATED_DATE);
        FlockRelationDTO flockRelationDTO = flockRelationMapper.toDto(updatedFlockRelation);

        restFlockRelationMockMvc.perform(put("/api/flock-relations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(flockRelationDTO)))
            .andExpect(status().isOk());

        // Validate the FlockRelation in the database
        List<FlockRelation> flockRelationList = flockRelationRepository.findAll();
        assertThat(flockRelationList).hasSize(databaseSizeBeforeUpdate);
        FlockRelation testFlockRelation = flockRelationList.get(flockRelationList.size() - 1);
        assertThat(testFlockRelation.getRemarkName()).isEqualTo(UPDATED_REMARK_NAME);
        assertThat(testFlockRelation.getPy()).isEqualTo(UPDATED_PY);
        assertThat(testFlockRelation.getPinYin()).isEqualTo(UPDATED_PIN_YIN);
        assertThat(testFlockRelation.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testFlockRelation.getCreatedDate()).isEqualTo(UPDATED_CREATED_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingFlockRelation() throws Exception {
        int databaseSizeBeforeUpdate = flockRelationRepository.findAll().size();

        // Create the FlockRelation
        FlockRelationDTO flockRelationDTO = flockRelationMapper.toDto(flockRelation);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restFlockRelationMockMvc.perform(put("/api/flock-relations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(flockRelationDTO)))
            .andExpect(status().isCreated());

        // Validate the FlockRelation in the database
        List<FlockRelation> flockRelationList = flockRelationRepository.findAll();
        assertThat(flockRelationList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteFlockRelation() throws Exception {
        // Initialize the database
        flockRelationRepository.saveAndFlush(flockRelation);
        int databaseSizeBeforeDelete = flockRelationRepository.findAll().size();

        // Get the flockRelation
        restFlockRelationMockMvc.perform(delete("/api/flock-relations/{id}", flockRelation.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<FlockRelation> flockRelationList = flockRelationRepository.findAll();
        assertThat(flockRelationList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(FlockRelation.class);
        FlockRelation flockRelation1 = new FlockRelation();
        flockRelation1.setId(1L);
        FlockRelation flockRelation2 = new FlockRelation();
        flockRelation2.setId(flockRelation1.getId());
        assertThat(flockRelation1).isEqualTo(flockRelation2);
        flockRelation2.setId(2L);
        assertThat(flockRelation1).isNotEqualTo(flockRelation2);
        flockRelation1.setId(null);
        assertThat(flockRelation1).isNotEqualTo(flockRelation2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(FlockRelationDTO.class);
        FlockRelationDTO flockRelationDTO1 = new FlockRelationDTO();
        flockRelationDTO1.setId(1L);
        FlockRelationDTO flockRelationDTO2 = new FlockRelationDTO();
        assertThat(flockRelationDTO1).isNotEqualTo(flockRelationDTO2);
        flockRelationDTO2.setId(flockRelationDTO1.getId());
        assertThat(flockRelationDTO1).isEqualTo(flockRelationDTO2);
        flockRelationDTO2.setId(2L);
        assertThat(flockRelationDTO1).isNotEqualTo(flockRelationDTO2);
        flockRelationDTO1.setId(null);
        assertThat(flockRelationDTO1).isNotEqualTo(flockRelationDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(flockRelationMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(flockRelationMapper.fromId(null)).isNull();
    }
}
