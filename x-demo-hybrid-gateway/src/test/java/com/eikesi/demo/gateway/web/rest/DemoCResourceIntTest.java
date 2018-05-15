package com.eikesi.demo.gateway.web.rest;

import com.eikesi.demo.gateway.DemoHybridGatewayApp;

import com.eikesi.demo.gateway.domain.DemoC;
import com.eikesi.demo.gateway.repository.DemoCRepository;
import com.eikesi.demo.gateway.service.DemoCService;
import com.eikesi.demo.gateway.service.dto.DemoCDTO;
import com.eikesi.demo.gateway.service.mapper.DemoCMapper;
import com.eikesi.demo.gateway.web.rest.errors.ExceptionTranslator;

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

import static com.eikesi.demo.gateway.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the DemoCResource REST controller.
 *
 * @see DemoCResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DemoHybridGatewayApp.class)
public class DemoCResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_STATUS = "AA";
    private static final String UPDATED_STATUS = "BB";

    @Autowired
    private DemoCRepository demoCRepository;

    @Autowired
    private DemoCMapper demoCMapper;

    @Autowired
    private DemoCService demoCService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restDemoCMockMvc;

    private DemoC demoC;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DemoCResource demoCResource = new DemoCResource(demoCService);
        this.restDemoCMockMvc = MockMvcBuilders.standaloneSetup(demoCResource)
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
    public static DemoC createEntity(EntityManager em) {
        DemoC demoC = new DemoC()
            .name(DEFAULT_NAME)
            .status(DEFAULT_STATUS);
        return demoC;
    }

    @Before
    public void initTest() {
        demoC = createEntity(em);
    }

    @Test
    @Transactional
    public void createDemoC() throws Exception {
        int databaseSizeBeforeCreate = demoCRepository.findAll().size();

        // Create the DemoC
        DemoCDTO demoCDTO = demoCMapper.toDto(demoC);
        restDemoCMockMvc.perform(post("/api/demo-cs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(demoCDTO)))
            .andExpect(status().isCreated());

        // Validate the DemoC in the database
        List<DemoC> demoCList = demoCRepository.findAll();
        assertThat(demoCList).hasSize(databaseSizeBeforeCreate + 1);
        DemoC testDemoC = demoCList.get(demoCList.size() - 1);
        assertThat(testDemoC.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testDemoC.getStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    @Transactional
    public void createDemoCWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = demoCRepository.findAll().size();

        // Create the DemoC with an existing ID
        demoC.setId(1L);
        DemoCDTO demoCDTO = demoCMapper.toDto(demoC);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDemoCMockMvc.perform(post("/api/demo-cs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(demoCDTO)))
            .andExpect(status().isBadRequest());

        // Validate the DemoC in the database
        List<DemoC> demoCList = demoCRepository.findAll();
        assertThat(demoCList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = demoCRepository.findAll().size();
        // set the field null
        demoC.setName(null);

        // Create the DemoC, which fails.
        DemoCDTO demoCDTO = demoCMapper.toDto(demoC);

        restDemoCMockMvc.perform(post("/api/demo-cs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(demoCDTO)))
            .andExpect(status().isBadRequest());

        List<DemoC> demoCList = demoCRepository.findAll();
        assertThat(demoCList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStatusIsRequired() throws Exception {
        int databaseSizeBeforeTest = demoCRepository.findAll().size();
        // set the field null
        demoC.setStatus(null);

        // Create the DemoC, which fails.
        DemoCDTO demoCDTO = demoCMapper.toDto(demoC);

        restDemoCMockMvc.perform(post("/api/demo-cs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(demoCDTO)))
            .andExpect(status().isBadRequest());

        List<DemoC> demoCList = demoCRepository.findAll();
        assertThat(demoCList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllDemoCS() throws Exception {
        // Initialize the database
        demoCRepository.saveAndFlush(demoC);

        // Get all the demoCList
        restDemoCMockMvc.perform(get("/api/demo-cs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(demoC.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())));
    }

    @Test
    @Transactional
    public void getDemoC() throws Exception {
        // Initialize the database
        demoCRepository.saveAndFlush(demoC);

        // Get the demoC
        restDemoCMockMvc.perform(get("/api/demo-cs/{id}", demoC.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(demoC.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDemoC() throws Exception {
        // Get the demoC
        restDemoCMockMvc.perform(get("/api/demo-cs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDemoC() throws Exception {
        // Initialize the database
        demoCRepository.saveAndFlush(demoC);
        int databaseSizeBeforeUpdate = demoCRepository.findAll().size();

        // Update the demoC
        DemoC updatedDemoC = demoCRepository.findOne(demoC.getId());
        // Disconnect from session so that the updates on updatedDemoC are not directly saved in db
        em.detach(updatedDemoC);
        updatedDemoC
            .name(UPDATED_NAME)
            .status(UPDATED_STATUS);
        DemoCDTO demoCDTO = demoCMapper.toDto(updatedDemoC);

        restDemoCMockMvc.perform(put("/api/demo-cs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(demoCDTO)))
            .andExpect(status().isOk());

        // Validate the DemoC in the database
        List<DemoC> demoCList = demoCRepository.findAll();
        assertThat(demoCList).hasSize(databaseSizeBeforeUpdate);
        DemoC testDemoC = demoCList.get(demoCList.size() - 1);
        assertThat(testDemoC.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testDemoC.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingDemoC() throws Exception {
        int databaseSizeBeforeUpdate = demoCRepository.findAll().size();

        // Create the DemoC
        DemoCDTO demoCDTO = demoCMapper.toDto(demoC);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restDemoCMockMvc.perform(put("/api/demo-cs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(demoCDTO)))
            .andExpect(status().isCreated());

        // Validate the DemoC in the database
        List<DemoC> demoCList = demoCRepository.findAll();
        assertThat(demoCList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteDemoC() throws Exception {
        // Initialize the database
        demoCRepository.saveAndFlush(demoC);
        int databaseSizeBeforeDelete = demoCRepository.findAll().size();

        // Get the demoC
        restDemoCMockMvc.perform(delete("/api/demo-cs/{id}", demoC.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<DemoC> demoCList = demoCRepository.findAll();
        assertThat(demoCList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DemoC.class);
        DemoC demoC1 = new DemoC();
        demoC1.setId(1L);
        DemoC demoC2 = new DemoC();
        demoC2.setId(demoC1.getId());
        assertThat(demoC1).isEqualTo(demoC2);
        demoC2.setId(2L);
        assertThat(demoC1).isNotEqualTo(demoC2);
        demoC1.setId(null);
        assertThat(demoC1).isNotEqualTo(demoC2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(DemoCDTO.class);
        DemoCDTO demoCDTO1 = new DemoCDTO();
        demoCDTO1.setId(1L);
        DemoCDTO demoCDTO2 = new DemoCDTO();
        assertThat(demoCDTO1).isNotEqualTo(demoCDTO2);
        demoCDTO2.setId(demoCDTO1.getId());
        assertThat(demoCDTO1).isEqualTo(demoCDTO2);
        demoCDTO2.setId(2L);
        assertThat(demoCDTO1).isNotEqualTo(demoCDTO2);
        demoCDTO1.setId(null);
        assertThat(demoCDTO1).isNotEqualTo(demoCDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(demoCMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(demoCMapper.fromId(null)).isNull();
    }
}
