package com.eikesi.demo.de.service.web.rest;

import com.eikesi.demo.de.service.DemoDeServiceApp;

import com.eikesi.demo.de.service.domain.DemoE;
import com.eikesi.demo.de.service.repository.DemoERepository;
import com.eikesi.demo.de.service.service.DemoEService;
import com.eikesi.demo.de.service.service.dto.DemoEDTO;
import com.eikesi.demo.de.service.service.mapper.DemoEMapper;
import com.eikesi.demo.de.service.web.rest.errors.ExceptionTranslator;

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
import java.util.List;

import static com.eikesi.demo.de.service.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the DemoEResource REST controller.
 *
 * @see DemoEResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DemoDeServiceApp.class)
public class DemoEResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_STATUS = "AA";
    private static final String UPDATED_STATUS = "BB";

    @Autowired
    private DemoERepository demoERepository;

    @Autowired
    private DemoEMapper demoEMapper;

    @Autowired
    private DemoEService demoEService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restDemoEMockMvc;

    private DemoE demoE;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DemoEResource demoEResource = new DemoEResource(demoEService);
        this.restDemoEMockMvc = MockMvcBuilders.standaloneSetup(demoEResource)
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
    public static DemoE createEntity(EntityManager em) {
        DemoE demoE = new DemoE()
            .name(DEFAULT_NAME)
            .status(DEFAULT_STATUS);
        return demoE;
    }

    @Before
    public void initTest() {
        demoE = createEntity(em);
    }

    @Test
    @Transactional
    public void createDemoE() throws Exception {
        int databaseSizeBeforeCreate = demoERepository.findAll().size();

        // Create the DemoE
        DemoEDTO demoEDTO = demoEMapper.toDto(demoE);
        restDemoEMockMvc.perform(post("/api/demo-es")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(demoEDTO)))
            .andExpect(status().isCreated());

        // Validate the DemoE in the database
        List<DemoE> demoEList = demoERepository.findAll();
        assertThat(demoEList).hasSize(databaseSizeBeforeCreate + 1);
        DemoE testDemoE = demoEList.get(demoEList.size() - 1);
        assertThat(testDemoE.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testDemoE.getStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    @Transactional
    public void createDemoEWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = demoERepository.findAll().size();

        // Create the DemoE with an existing ID
        demoE.setId(1L);
        DemoEDTO demoEDTO = demoEMapper.toDto(demoE);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDemoEMockMvc.perform(post("/api/demo-es")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(demoEDTO)))
            .andExpect(status().isBadRequest());

        // Validate the DemoE in the database
        List<DemoE> demoEList = demoERepository.findAll();
        assertThat(demoEList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = demoERepository.findAll().size();
        // set the field null
        demoE.setName(null);

        // Create the DemoE, which fails.
        DemoEDTO demoEDTO = demoEMapper.toDto(demoE);

        restDemoEMockMvc.perform(post("/api/demo-es")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(demoEDTO)))
            .andExpect(status().isBadRequest());

        List<DemoE> demoEList = demoERepository.findAll();
        assertThat(demoEList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStatusIsRequired() throws Exception {
        int databaseSizeBeforeTest = demoERepository.findAll().size();
        // set the field null
        demoE.setStatus(null);

        // Create the DemoE, which fails.
        DemoEDTO demoEDTO = demoEMapper.toDto(demoE);

        restDemoEMockMvc.perform(post("/api/demo-es")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(demoEDTO)))
            .andExpect(status().isBadRequest());

        List<DemoE> demoEList = demoERepository.findAll();
        assertThat(demoEList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllDemoES() throws Exception {
        // Initialize the database
        demoERepository.saveAndFlush(demoE);

        // Get all the demoEList
        restDemoEMockMvc.perform(get("/api/demo-es?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(demoE.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())));
    }

    @Test
    @Transactional
    public void getDemoE() throws Exception {
        // Initialize the database
        demoERepository.saveAndFlush(demoE);

        // Get the demoE
        restDemoEMockMvc.perform(get("/api/demo-es/{id}", demoE.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(demoE.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDemoE() throws Exception {
        // Get the demoE
        restDemoEMockMvc.perform(get("/api/demo-es/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDemoE() throws Exception {
        // Initialize the database
        demoERepository.saveAndFlush(demoE);
        int databaseSizeBeforeUpdate = demoERepository.findAll().size();

        // Update the demoE
        DemoE updatedDemoE = demoERepository.findOne(demoE.getId());
        // Disconnect from session so that the updates on updatedDemoE are not directly saved in db
        em.detach(updatedDemoE);
        updatedDemoE
            .name(UPDATED_NAME)
            .status(UPDATED_STATUS);
        DemoEDTO demoEDTO = demoEMapper.toDto(updatedDemoE);

        restDemoEMockMvc.perform(put("/api/demo-es")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(demoEDTO)))
            .andExpect(status().isOk());

        // Validate the DemoE in the database
        List<DemoE> demoEList = demoERepository.findAll();
        assertThat(demoEList).hasSize(databaseSizeBeforeUpdate);
        DemoE testDemoE = demoEList.get(demoEList.size() - 1);
        assertThat(testDemoE.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testDemoE.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingDemoE() throws Exception {
        int databaseSizeBeforeUpdate = demoERepository.findAll().size();

        // Create the DemoE
        DemoEDTO demoEDTO = demoEMapper.toDto(demoE);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restDemoEMockMvc.perform(put("/api/demo-es")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(demoEDTO)))
            .andExpect(status().isCreated());

        // Validate the DemoE in the database
        List<DemoE> demoEList = demoERepository.findAll();
        assertThat(demoEList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteDemoE() throws Exception {
        // Initialize the database
        demoERepository.saveAndFlush(demoE);
        int databaseSizeBeforeDelete = demoERepository.findAll().size();

        // Get the demoE
        restDemoEMockMvc.perform(delete("/api/demo-es/{id}", demoE.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<DemoE> demoEList = demoERepository.findAll();
        assertThat(demoEList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DemoE.class);
        DemoE demoE1 = new DemoE();
        demoE1.setId(1L);
        DemoE demoE2 = new DemoE();
        demoE2.setId(demoE1.getId());
        assertThat(demoE1).isEqualTo(demoE2);
        demoE2.setId(2L);
        assertThat(demoE1).isNotEqualTo(demoE2);
        demoE1.setId(null);
        assertThat(demoE1).isNotEqualTo(demoE2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(DemoEDTO.class);
        DemoEDTO demoEDTO1 = new DemoEDTO();
        demoEDTO1.setId(1L);
        DemoEDTO demoEDTO2 = new DemoEDTO();
        assertThat(demoEDTO1).isNotEqualTo(demoEDTO2);
        demoEDTO2.setId(demoEDTO1.getId());
        assertThat(demoEDTO1).isEqualTo(demoEDTO2);
        demoEDTO2.setId(2L);
        assertThat(demoEDTO1).isNotEqualTo(demoEDTO2);
        demoEDTO1.setId(null);
        assertThat(demoEDTO1).isNotEqualTo(demoEDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(demoEMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(demoEMapper.fromId(null)).isNull();
    }
}
