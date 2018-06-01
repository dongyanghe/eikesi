package com.eikesi.demo.gateway.web.rest;

import com.eikesi.demo.gateway.DemoHybridGatewayApp;

import com.eikesi.demo.gateway.domain.DemoD;
import com.eikesi.demo.gateway.repository.DemoDRepository;
import com.eikesi.demo.gateway.service.DemoDService;
import com.eikesi.demo.gateway.service.dto.DemoDDTO;
import com.eikesi.demo.gateway.service.mapper.DemoDMapper;
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
 * Test class for the DemoDResource REST controller.
 *
 * @see DemoDResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DemoHybridGatewayApp.class)
public class DemoDResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_STATUS = "AA";
    private static final String UPDATED_STATUS = "BB";

    @Autowired
    private DemoDRepository demoDRepository;

    @Autowired
    private DemoDMapper demoDMapper;

    @Autowired
    private DemoDService demoDService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restDemoDMockMvc;

    private DemoD demoD;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DemoDResource demoDResource = new DemoDResource(demoDService);
        this.restDemoDMockMvc = MockMvcBuilders.standaloneSetup(demoDResource)
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
    public static DemoD createEntity(EntityManager em) {
        DemoD demoD = new DemoD()
            .name(DEFAULT_NAME)
            .status(DEFAULT_STATUS);
        return demoD;
    }

    @Before
    public void initTest() {
        demoD = createEntity(em);
    }

    @Test
    @Transactional
    public void createDemoD() throws Exception {
        int databaseSizeBeforeCreate = demoDRepository.findAll().size();

        // Create the DemoD
        DemoDDTO demoDDTO = demoDMapper.toDto(demoD);
        restDemoDMockMvc.perform(post("/api/demo-ds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(demoDDTO)))
            .andExpect(status().isCreated());

        // Validate the DemoD in the database
        List<DemoD> demoDList = demoDRepository.findAll();
        assertThat(demoDList).hasSize(databaseSizeBeforeCreate + 1);
        DemoD testDemoD = demoDList.get(demoDList.size() - 1);
        assertThat(testDemoD.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testDemoD.getStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    @Transactional
    public void createDemoDWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = demoDRepository.findAll().size();

        // Create the DemoD with an existing ID
        demoD.setId(1L);
        DemoDDTO demoDDTO = demoDMapper.toDto(demoD);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDemoDMockMvc.perform(post("/api/demo-ds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(demoDDTO)))
            .andExpect(status().isBadRequest());

        // Validate the DemoD in the database
        List<DemoD> demoDList = demoDRepository.findAll();
        assertThat(demoDList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = demoDRepository.findAll().size();
        // set the field null
        demoD.setName(null);

        // Create the DemoD, which fails.
        DemoDDTO demoDDTO = demoDMapper.toDto(demoD);

        restDemoDMockMvc.perform(post("/api/demo-ds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(demoDDTO)))
            .andExpect(status().isBadRequest());

        List<DemoD> demoDList = demoDRepository.findAll();
        assertThat(demoDList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStatusIsRequired() throws Exception {
        int databaseSizeBeforeTest = demoDRepository.findAll().size();
        // set the field null
        demoD.setStatus(null);

        // Create the DemoD, which fails.
        DemoDDTO demoDDTO = demoDMapper.toDto(demoD);

        restDemoDMockMvc.perform(post("/api/demo-ds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(demoDDTO)))
            .andExpect(status().isBadRequest());

        List<DemoD> demoDList = demoDRepository.findAll();
        assertThat(demoDList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllDemoDS() throws Exception {
        // Initialize the database
        demoDRepository.saveAndFlush(demoD);

        // Get all the demoDList
        restDemoDMockMvc.perform(get("/api/demo-ds?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(demoD.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())));
    }

    @Test
    @Transactional
    public void getDemoD() throws Exception {
        // Initialize the database
        demoDRepository.saveAndFlush(demoD);

        // Get the demoD
        restDemoDMockMvc.perform(get("/api/demo-ds/{id}", demoD.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(demoD.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDemoD() throws Exception {
        // Get the demoD
        restDemoDMockMvc.perform(get("/api/demo-ds/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDemoD() throws Exception {
        // Initialize the database
        demoDRepository.saveAndFlush(demoD);
        int databaseSizeBeforeUpdate = demoDRepository.findAll().size();

        // Update the demoD
        DemoD updatedDemoD = demoDRepository.findOne(demoD.getId());
        // Disconnect from session so that the updates on updatedDemoD are not directly saved in db
        em.detach(updatedDemoD);
        updatedDemoD
            .name(UPDATED_NAME)
            .status(UPDATED_STATUS);
        DemoDDTO demoDDTO = demoDMapper.toDto(updatedDemoD);

        restDemoDMockMvc.perform(put("/api/demo-ds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(demoDDTO)))
            .andExpect(status().isOk());

        // Validate the DemoD in the database
        List<DemoD> demoDList = demoDRepository.findAll();
        assertThat(demoDList).hasSize(databaseSizeBeforeUpdate);
        DemoD testDemoD = demoDList.get(demoDList.size() - 1);
        assertThat(testDemoD.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testDemoD.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingDemoD() throws Exception {
        int databaseSizeBeforeUpdate = demoDRepository.findAll().size();

        // Create the DemoD
        DemoDDTO demoDDTO = demoDMapper.toDto(demoD);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restDemoDMockMvc.perform(put("/api/demo-ds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(demoDDTO)))
            .andExpect(status().isCreated());

        // Validate the DemoD in the database
        List<DemoD> demoDList = demoDRepository.findAll();
        assertThat(demoDList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteDemoD() throws Exception {
        // Initialize the database
        demoDRepository.saveAndFlush(demoD);
        int databaseSizeBeforeDelete = demoDRepository.findAll().size();

        // Get the demoD
        restDemoDMockMvc.perform(delete("/api/demo-ds/{id}", demoD.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<DemoD> demoDList = demoDRepository.findAll();
        assertThat(demoDList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DemoD.class);
        DemoD demoD1 = new DemoD();
        demoD1.setId(1L);
        DemoD demoD2 = new DemoD();
        demoD2.setId(demoD1.getId());
        assertThat(demoD1).isEqualTo(demoD2);
        demoD2.setId(2L);
        assertThat(demoD1).isNotEqualTo(demoD2);
        demoD1.setId(null);
        assertThat(demoD1).isNotEqualTo(demoD2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(DemoDDTO.class);
        DemoDDTO demoDDTO1 = new DemoDDTO();
        demoDDTO1.setId(1L);
        DemoDDTO demoDDTO2 = new DemoDDTO();
        assertThat(demoDDTO1).isNotEqualTo(demoDDTO2);
        demoDDTO2.setId(demoDDTO1.getId());
        assertThat(demoDDTO1).isEqualTo(demoDDTO2);
        demoDDTO2.setId(2L);
        assertThat(demoDDTO1).isNotEqualTo(demoDDTO2);
        demoDDTO1.setId(null);
        assertThat(demoDDTO1).isNotEqualTo(demoDDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(demoDMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(demoDMapper.fromId(null)).isNull();
    }
}
