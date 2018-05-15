package com.eikesi.demo.gateway.web.rest;

import com.eikesi.demo.gateway.DemoHybridGatewayApp;

import com.eikesi.demo.gateway.domain.DemoB;
import com.eikesi.demo.gateway.repository.DemoBRepository;
import com.eikesi.demo.gateway.service.DemoBService;
import com.eikesi.demo.gateway.service.dto.DemoBDTO;
import com.eikesi.demo.gateway.service.mapper.DemoBMapper;
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
 * Test class for the DemoBResource REST controller.
 *
 * @see DemoBResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DemoHybridGatewayApp.class)
public class DemoBResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_STATUS = "AA";
    private static final String UPDATED_STATUS = "BB";

    @Autowired
    private DemoBRepository demoBRepository;

    @Autowired
    private DemoBMapper demoBMapper;

    @Autowired
    private DemoBService demoBService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restDemoBMockMvc;

    private DemoB demoB;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DemoBResource demoBResource = new DemoBResource(demoBService);
        this.restDemoBMockMvc = MockMvcBuilders.standaloneSetup(demoBResource)
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
    public static DemoB createEntity(EntityManager em) {
        DemoB demoB = new DemoB()
            .name(DEFAULT_NAME)
            .status(DEFAULT_STATUS);
        return demoB;
    }

    @Before
    public void initTest() {
        demoB = createEntity(em);
    }

    @Test
    @Transactional
    public void createDemoB() throws Exception {
        int databaseSizeBeforeCreate = demoBRepository.findAll().size();

        // Create the DemoB
        DemoBDTO demoBDTO = demoBMapper.toDto(demoB);
        restDemoBMockMvc.perform(post("/api/demo-bs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(demoBDTO)))
            .andExpect(status().isCreated());

        // Validate the DemoB in the database
        List<DemoB> demoBList = demoBRepository.findAll();
        assertThat(demoBList).hasSize(databaseSizeBeforeCreate + 1);
        DemoB testDemoB = demoBList.get(demoBList.size() - 1);
        assertThat(testDemoB.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testDemoB.getStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    @Transactional
    public void createDemoBWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = demoBRepository.findAll().size();

        // Create the DemoB with an existing ID
        demoB.setId(1L);
        DemoBDTO demoBDTO = demoBMapper.toDto(demoB);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDemoBMockMvc.perform(post("/api/demo-bs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(demoBDTO)))
            .andExpect(status().isBadRequest());

        // Validate the DemoB in the database
        List<DemoB> demoBList = demoBRepository.findAll();
        assertThat(demoBList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = demoBRepository.findAll().size();
        // set the field null
        demoB.setName(null);

        // Create the DemoB, which fails.
        DemoBDTO demoBDTO = demoBMapper.toDto(demoB);

        restDemoBMockMvc.perform(post("/api/demo-bs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(demoBDTO)))
            .andExpect(status().isBadRequest());

        List<DemoB> demoBList = demoBRepository.findAll();
        assertThat(demoBList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStatusIsRequired() throws Exception {
        int databaseSizeBeforeTest = demoBRepository.findAll().size();
        // set the field null
        demoB.setStatus(null);

        // Create the DemoB, which fails.
        DemoBDTO demoBDTO = demoBMapper.toDto(demoB);

        restDemoBMockMvc.perform(post("/api/demo-bs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(demoBDTO)))
            .andExpect(status().isBadRequest());

        List<DemoB> demoBList = demoBRepository.findAll();
        assertThat(demoBList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllDemoBS() throws Exception {
        // Initialize the database
        demoBRepository.saveAndFlush(demoB);

        // Get all the demoBList
        restDemoBMockMvc.perform(get("/api/demo-bs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(demoB.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())));
    }

    @Test
    @Transactional
    public void getDemoB() throws Exception {
        // Initialize the database
        demoBRepository.saveAndFlush(demoB);

        // Get the demoB
        restDemoBMockMvc.perform(get("/api/demo-bs/{id}", demoB.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(demoB.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDemoB() throws Exception {
        // Get the demoB
        restDemoBMockMvc.perform(get("/api/demo-bs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDemoB() throws Exception {
        // Initialize the database
        demoBRepository.saveAndFlush(demoB);
        int databaseSizeBeforeUpdate = demoBRepository.findAll().size();

        // Update the demoB
        DemoB updatedDemoB = demoBRepository.findOne(demoB.getId());
        // Disconnect from session so that the updates on updatedDemoB are not directly saved in db
        em.detach(updatedDemoB);
        updatedDemoB
            .name(UPDATED_NAME)
            .status(UPDATED_STATUS);
        DemoBDTO demoBDTO = demoBMapper.toDto(updatedDemoB);

        restDemoBMockMvc.perform(put("/api/demo-bs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(demoBDTO)))
            .andExpect(status().isOk());

        // Validate the DemoB in the database
        List<DemoB> demoBList = demoBRepository.findAll();
        assertThat(demoBList).hasSize(databaseSizeBeforeUpdate);
        DemoB testDemoB = demoBList.get(demoBList.size() - 1);
        assertThat(testDemoB.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testDemoB.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingDemoB() throws Exception {
        int databaseSizeBeforeUpdate = demoBRepository.findAll().size();

        // Create the DemoB
        DemoBDTO demoBDTO = demoBMapper.toDto(demoB);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restDemoBMockMvc.perform(put("/api/demo-bs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(demoBDTO)))
            .andExpect(status().isCreated());

        // Validate the DemoB in the database
        List<DemoB> demoBList = demoBRepository.findAll();
        assertThat(demoBList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteDemoB() throws Exception {
        // Initialize the database
        demoBRepository.saveAndFlush(demoB);
        int databaseSizeBeforeDelete = demoBRepository.findAll().size();

        // Get the demoB
        restDemoBMockMvc.perform(delete("/api/demo-bs/{id}", demoB.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<DemoB> demoBList = demoBRepository.findAll();
        assertThat(demoBList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DemoB.class);
        DemoB demoB1 = new DemoB();
        demoB1.setId(1L);
        DemoB demoB2 = new DemoB();
        demoB2.setId(demoB1.getId());
        assertThat(demoB1).isEqualTo(demoB2);
        demoB2.setId(2L);
        assertThat(demoB1).isNotEqualTo(demoB2);
        demoB1.setId(null);
        assertThat(demoB1).isNotEqualTo(demoB2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(DemoBDTO.class);
        DemoBDTO demoBDTO1 = new DemoBDTO();
        demoBDTO1.setId(1L);
        DemoBDTO demoBDTO2 = new DemoBDTO();
        assertThat(demoBDTO1).isNotEqualTo(demoBDTO2);
        demoBDTO2.setId(demoBDTO1.getId());
        assertThat(demoBDTO1).isEqualTo(demoBDTO2);
        demoBDTO2.setId(2L);
        assertThat(demoBDTO1).isNotEqualTo(demoBDTO2);
        demoBDTO1.setId(null);
        assertThat(demoBDTO1).isNotEqualTo(demoBDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(demoBMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(demoBMapper.fromId(null)).isNull();
    }
}
