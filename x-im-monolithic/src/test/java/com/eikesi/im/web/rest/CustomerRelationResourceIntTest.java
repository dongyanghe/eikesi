package com.eikesi.im.web.rest;

import com.eikesi.im.ImApp;

import com.eikesi.im.domain.CustomerRelation;
import com.eikesi.im.repository.CustomerRelationRepository;
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
 * Test class for the CustomerRelationResource REST controller.
 *
 * @see CustomerRelationResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ImApp.class)
public class CustomerRelationResourceIntTest {

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
    private CustomerRelationRepository customerRelationRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCustomerRelationMockMvc;

    private CustomerRelation customerRelation;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CustomerRelationResource customerRelationResource = new CustomerRelationResource(customerRelationRepository);
        this.restCustomerRelationMockMvc = MockMvcBuilders.standaloneSetup(customerRelationResource)
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
    public static CustomerRelation createEntity(EntityManager em) {
        CustomerRelation customerRelation = new CustomerRelation()
            .remarkName(DEFAULT_REMARK_NAME)
            .py(DEFAULT_PY)
            .pinYin(DEFAULT_PIN_YIN)
            .type(DEFAULT_TYPE)
            .createdDate(DEFAULT_CREATED_DATE);
        return customerRelation;
    }

    @Before
    public void initTest() {
        customerRelation = createEntity(em);
    }

    @Test
    @Transactional
    public void createCustomerRelation() throws Exception {
        int databaseSizeBeforeCreate = customerRelationRepository.findAll().size();

        // Create the CustomerRelation
        restCustomerRelationMockMvc.perform(post("/api/customer-relations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(customerRelation)))
            .andExpect(status().isCreated());

        // Validate the CustomerRelation in the database
        List<CustomerRelation> customerRelationList = customerRelationRepository.findAll();
        assertThat(customerRelationList).hasSize(databaseSizeBeforeCreate + 1);
        CustomerRelation testCustomerRelation = customerRelationList.get(customerRelationList.size() - 1);
        assertThat(testCustomerRelation.getRemarkName()).isEqualTo(DEFAULT_REMARK_NAME);
        assertThat(testCustomerRelation.getPy()).isEqualTo(DEFAULT_PY);
        assertThat(testCustomerRelation.getPinYin()).isEqualTo(DEFAULT_PIN_YIN);
        assertThat(testCustomerRelation.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testCustomerRelation.getCreatedDate()).isEqualTo(DEFAULT_CREATED_DATE);
    }

    @Test
    @Transactional
    public void createCustomerRelationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = customerRelationRepository.findAll().size();

        // Create the CustomerRelation with an existing ID
        customerRelation.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCustomerRelationMockMvc.perform(post("/api/customer-relations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(customerRelation)))
            .andExpect(status().isBadRequest());

        // Validate the CustomerRelation in the database
        List<CustomerRelation> customerRelationList = customerRelationRepository.findAll();
        assertThat(customerRelationList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkPyIsRequired() throws Exception {
        int databaseSizeBeforeTest = customerRelationRepository.findAll().size();
        // set the field null
        customerRelation.setPy(null);

        // Create the CustomerRelation, which fails.

        restCustomerRelationMockMvc.perform(post("/api/customer-relations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(customerRelation)))
            .andExpect(status().isBadRequest());

        List<CustomerRelation> customerRelationList = customerRelationRepository.findAll();
        assertThat(customerRelationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPinYinIsRequired() throws Exception {
        int databaseSizeBeforeTest = customerRelationRepository.findAll().size();
        // set the field null
        customerRelation.setPinYin(null);

        // Create the CustomerRelation, which fails.

        restCustomerRelationMockMvc.perform(post("/api/customer-relations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(customerRelation)))
            .andExpect(status().isBadRequest());

        List<CustomerRelation> customerRelationList = customerRelationRepository.findAll();
        assertThat(customerRelationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = customerRelationRepository.findAll().size();
        // set the field null
        customerRelation.setType(null);

        // Create the CustomerRelation, which fails.

        restCustomerRelationMockMvc.perform(post("/api/customer-relations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(customerRelation)))
            .andExpect(status().isBadRequest());

        List<CustomerRelation> customerRelationList = customerRelationRepository.findAll();
        assertThat(customerRelationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCreatedDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = customerRelationRepository.findAll().size();
        // set the field null
        customerRelation.setCreatedDate(null);

        // Create the CustomerRelation, which fails.

        restCustomerRelationMockMvc.perform(post("/api/customer-relations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(customerRelation)))
            .andExpect(status().isBadRequest());

        List<CustomerRelation> customerRelationList = customerRelationRepository.findAll();
        assertThat(customerRelationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCustomerRelations() throws Exception {
        // Initialize the database
        customerRelationRepository.saveAndFlush(customerRelation);

        // Get all the customerRelationList
        restCustomerRelationMockMvc.perform(get("/api/customer-relations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(customerRelation.getId().intValue())))
            .andExpect(jsonPath("$.[*].remarkName").value(hasItem(DEFAULT_REMARK_NAME.toString())))
            .andExpect(jsonPath("$.[*].py").value(hasItem(DEFAULT_PY.toString())))
            .andExpect(jsonPath("$.[*].pinYin").value(hasItem(DEFAULT_PIN_YIN.toString())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].createdDate").value(hasItem(DEFAULT_CREATED_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getCustomerRelation() throws Exception {
        // Initialize the database
        customerRelationRepository.saveAndFlush(customerRelation);

        // Get the customerRelation
        restCustomerRelationMockMvc.perform(get("/api/customer-relations/{id}", customerRelation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(customerRelation.getId().intValue()))
            .andExpect(jsonPath("$.remarkName").value(DEFAULT_REMARK_NAME.toString()))
            .andExpect(jsonPath("$.py").value(DEFAULT_PY.toString()))
            .andExpect(jsonPath("$.pinYin").value(DEFAULT_PIN_YIN.toString()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()))
            .andExpect(jsonPath("$.createdDate").value(DEFAULT_CREATED_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCustomerRelation() throws Exception {
        // Get the customerRelation
        restCustomerRelationMockMvc.perform(get("/api/customer-relations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCustomerRelation() throws Exception {
        // Initialize the database
        customerRelationRepository.saveAndFlush(customerRelation);

        int databaseSizeBeforeUpdate = customerRelationRepository.findAll().size();

        // Update the customerRelation
        CustomerRelation updatedCustomerRelation = customerRelationRepository.findById(customerRelation.getId()).get();
        // Disconnect from session so that the updates on updatedCustomerRelation are not directly saved in db
        em.detach(updatedCustomerRelation);
        updatedCustomerRelation
            .remarkName(UPDATED_REMARK_NAME)
            .py(UPDATED_PY)
            .pinYin(UPDATED_PIN_YIN)
            .type(UPDATED_TYPE)
            .createdDate(UPDATED_CREATED_DATE);

        restCustomerRelationMockMvc.perform(put("/api/customer-relations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCustomerRelation)))
            .andExpect(status().isOk());

        // Validate the CustomerRelation in the database
        List<CustomerRelation> customerRelationList = customerRelationRepository.findAll();
        assertThat(customerRelationList).hasSize(databaseSizeBeforeUpdate);
        CustomerRelation testCustomerRelation = customerRelationList.get(customerRelationList.size() - 1);
        assertThat(testCustomerRelation.getRemarkName()).isEqualTo(UPDATED_REMARK_NAME);
        assertThat(testCustomerRelation.getPy()).isEqualTo(UPDATED_PY);
        assertThat(testCustomerRelation.getPinYin()).isEqualTo(UPDATED_PIN_YIN);
        assertThat(testCustomerRelation.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testCustomerRelation.getCreatedDate()).isEqualTo(UPDATED_CREATED_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingCustomerRelation() throws Exception {
        int databaseSizeBeforeUpdate = customerRelationRepository.findAll().size();

        // Create the CustomerRelation

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCustomerRelationMockMvc.perform(put("/api/customer-relations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(customerRelation)))
            .andExpect(status().isBadRequest());

        // Validate the CustomerRelation in the database
        List<CustomerRelation> customerRelationList = customerRelationRepository.findAll();
        assertThat(customerRelationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCustomerRelation() throws Exception {
        // Initialize the database
        customerRelationRepository.saveAndFlush(customerRelation);

        int databaseSizeBeforeDelete = customerRelationRepository.findAll().size();

        // Get the customerRelation
        restCustomerRelationMockMvc.perform(delete("/api/customer-relations/{id}", customerRelation.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CustomerRelation> customerRelationList = customerRelationRepository.findAll();
        assertThat(customerRelationList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CustomerRelation.class);
        CustomerRelation customerRelation1 = new CustomerRelation();
        customerRelation1.setId(1L);
        CustomerRelation customerRelation2 = new CustomerRelation();
        customerRelation2.setId(customerRelation1.getId());
        assertThat(customerRelation1).isEqualTo(customerRelation2);
        customerRelation2.setId(2L);
        assertThat(customerRelation1).isNotEqualTo(customerRelation2);
        customerRelation1.setId(null);
        assertThat(customerRelation1).isNotEqualTo(customerRelation2);
    }
}
