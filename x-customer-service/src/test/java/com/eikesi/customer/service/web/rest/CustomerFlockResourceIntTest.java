package com.eikesi.customer.service.web.rest;

import com.eikesi.customer.service.CustomerServiceApp;

import com.eikesi.customer.service.domain.CustomerFlock;
import com.eikesi.customer.service.repository.CustomerFlockRepository;
import com.eikesi.customer.service.service.CustomerFlockService;
import com.eikesi.customer.service.service.dto.CustomerFlockDTO;
import com.eikesi.customer.service.service.mapper.CustomerFlockMapper;
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
 * Test class for the CustomerFlockResource REST controller.
 *
 * @see CustomerFlockResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CustomerServiceApp.class)
public class CustomerFlockResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_PY = "AAAAAAAAAA";
    private static final String UPDATED_PY = "BBBBBBBBBB";

    private static final String DEFAULT_PIN_YIN = "AAAAAAAAAA";
    private static final String UPDATED_PIN_YIN = "BBBBBBBBBB";

    private static final String DEFAULT_IMAGE_URL = "AAAAAAAAAA";
    private static final String UPDATED_IMAGE_URL = "BBBBBBBBBB";

    private static final Instant DEFAULT_CREATED_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private CustomerFlockRepository customerFlockRepository;

    @Autowired
    private CustomerFlockMapper customerFlockMapper;

    @Autowired
    private CustomerFlockService customerFlockService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCustomerFlockMockMvc;

    private CustomerFlock customerFlock;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CustomerFlockResource customerFlockResource = new CustomerFlockResource(customerFlockService);
        this.restCustomerFlockMockMvc = MockMvcBuilders.standaloneSetup(customerFlockResource)
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
    public static CustomerFlock createEntity(EntityManager em) {
        CustomerFlock customerFlock = new CustomerFlock()
            .name(DEFAULT_NAME)
            .py(DEFAULT_PY)
            .pinYin(DEFAULT_PIN_YIN)
            .imageUrl(DEFAULT_IMAGE_URL)
            .createdDate(DEFAULT_CREATED_DATE);
        return customerFlock;
    }

    @Before
    public void initTest() {
        customerFlock = createEntity(em);
    }

    @Test
    @Transactional
    public void createCustomerFlock() throws Exception {
        int databaseSizeBeforeCreate = customerFlockRepository.findAll().size();

        // Create the CustomerFlock
        CustomerFlockDTO customerFlockDTO = customerFlockMapper.toDto(customerFlock);
        restCustomerFlockMockMvc.perform(post("/api/customer-flocks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(customerFlockDTO)))
            .andExpect(status().isCreated());

        // Validate the CustomerFlock in the database
        List<CustomerFlock> customerFlockList = customerFlockRepository.findAll();
        assertThat(customerFlockList).hasSize(databaseSizeBeforeCreate + 1);
        CustomerFlock testCustomerFlock = customerFlockList.get(customerFlockList.size() - 1);
        assertThat(testCustomerFlock.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testCustomerFlock.getPy()).isEqualTo(DEFAULT_PY);
        assertThat(testCustomerFlock.getPinYin()).isEqualTo(DEFAULT_PIN_YIN);
        assertThat(testCustomerFlock.getImageUrl()).isEqualTo(DEFAULT_IMAGE_URL);
        assertThat(testCustomerFlock.getCreatedDate()).isEqualTo(DEFAULT_CREATED_DATE);
    }

    @Test
    @Transactional
    public void createCustomerFlockWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = customerFlockRepository.findAll().size();

        // Create the CustomerFlock with an existing ID
        customerFlock.setId(1L);
        CustomerFlockDTO customerFlockDTO = customerFlockMapper.toDto(customerFlock);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCustomerFlockMockMvc.perform(post("/api/customer-flocks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(customerFlockDTO)))
            .andExpect(status().isBadRequest());

        // Validate the CustomerFlock in the database
        List<CustomerFlock> customerFlockList = customerFlockRepository.findAll();
        assertThat(customerFlockList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = customerFlockRepository.findAll().size();
        // set the field null
        customerFlock.setName(null);

        // Create the CustomerFlock, which fails.
        CustomerFlockDTO customerFlockDTO = customerFlockMapper.toDto(customerFlock);

        restCustomerFlockMockMvc.perform(post("/api/customer-flocks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(customerFlockDTO)))
            .andExpect(status().isBadRequest());

        List<CustomerFlock> customerFlockList = customerFlockRepository.findAll();
        assertThat(customerFlockList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPyIsRequired() throws Exception {
        int databaseSizeBeforeTest = customerFlockRepository.findAll().size();
        // set the field null
        customerFlock.setPy(null);

        // Create the CustomerFlock, which fails.
        CustomerFlockDTO customerFlockDTO = customerFlockMapper.toDto(customerFlock);

        restCustomerFlockMockMvc.perform(post("/api/customer-flocks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(customerFlockDTO)))
            .andExpect(status().isBadRequest());

        List<CustomerFlock> customerFlockList = customerFlockRepository.findAll();
        assertThat(customerFlockList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPinYinIsRequired() throws Exception {
        int databaseSizeBeforeTest = customerFlockRepository.findAll().size();
        // set the field null
        customerFlock.setPinYin(null);

        // Create the CustomerFlock, which fails.
        CustomerFlockDTO customerFlockDTO = customerFlockMapper.toDto(customerFlock);

        restCustomerFlockMockMvc.perform(post("/api/customer-flocks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(customerFlockDTO)))
            .andExpect(status().isBadRequest());

        List<CustomerFlock> customerFlockList = customerFlockRepository.findAll();
        assertThat(customerFlockList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkImageUrlIsRequired() throws Exception {
        int databaseSizeBeforeTest = customerFlockRepository.findAll().size();
        // set the field null
        customerFlock.setImageUrl(null);

        // Create the CustomerFlock, which fails.
        CustomerFlockDTO customerFlockDTO = customerFlockMapper.toDto(customerFlock);

        restCustomerFlockMockMvc.perform(post("/api/customer-flocks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(customerFlockDTO)))
            .andExpect(status().isBadRequest());

        List<CustomerFlock> customerFlockList = customerFlockRepository.findAll();
        assertThat(customerFlockList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCreatedDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = customerFlockRepository.findAll().size();
        // set the field null
        customerFlock.setCreatedDate(null);

        // Create the CustomerFlock, which fails.
        CustomerFlockDTO customerFlockDTO = customerFlockMapper.toDto(customerFlock);

        restCustomerFlockMockMvc.perform(post("/api/customer-flocks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(customerFlockDTO)))
            .andExpect(status().isBadRequest());

        List<CustomerFlock> customerFlockList = customerFlockRepository.findAll();
        assertThat(customerFlockList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCustomerFlocks() throws Exception {
        // Initialize the database
        customerFlockRepository.saveAndFlush(customerFlock);

        // Get all the customerFlockList
        restCustomerFlockMockMvc.perform(get("/api/customer-flocks?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(customerFlock.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].py").value(hasItem(DEFAULT_PY.toString())))
            .andExpect(jsonPath("$.[*].pinYin").value(hasItem(DEFAULT_PIN_YIN.toString())))
            .andExpect(jsonPath("$.[*].imageUrl").value(hasItem(DEFAULT_IMAGE_URL.toString())))
            .andExpect(jsonPath("$.[*].createdDate").value(hasItem(DEFAULT_CREATED_DATE.toString())));
    }

    @Test
    @Transactional
    public void getCustomerFlock() throws Exception {
        // Initialize the database
        customerFlockRepository.saveAndFlush(customerFlock);

        // Get the customerFlock
        restCustomerFlockMockMvc.perform(get("/api/customer-flocks/{id}", customerFlock.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(customerFlock.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.py").value(DEFAULT_PY.toString()))
            .andExpect(jsonPath("$.pinYin").value(DEFAULT_PIN_YIN.toString()))
            .andExpect(jsonPath("$.imageUrl").value(DEFAULT_IMAGE_URL.toString()))
            .andExpect(jsonPath("$.createdDate").value(DEFAULT_CREATED_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCustomerFlock() throws Exception {
        // Get the customerFlock
        restCustomerFlockMockMvc.perform(get("/api/customer-flocks/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCustomerFlock() throws Exception {
        // Initialize the database
        customerFlockRepository.saveAndFlush(customerFlock);
        int databaseSizeBeforeUpdate = customerFlockRepository.findAll().size();

        // Update the customerFlock
        CustomerFlock updatedCustomerFlock = customerFlockRepository.findOne(customerFlock.getId());
        // Disconnect from session so that the updates on updatedCustomerFlock are not directly saved in db
        em.detach(updatedCustomerFlock);
        updatedCustomerFlock
            .name(UPDATED_NAME)
            .py(UPDATED_PY)
            .pinYin(UPDATED_PIN_YIN)
            .imageUrl(UPDATED_IMAGE_URL)
            .createdDate(UPDATED_CREATED_DATE);
        CustomerFlockDTO customerFlockDTO = customerFlockMapper.toDto(updatedCustomerFlock);

        restCustomerFlockMockMvc.perform(put("/api/customer-flocks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(customerFlockDTO)))
            .andExpect(status().isOk());

        // Validate the CustomerFlock in the database
        List<CustomerFlock> customerFlockList = customerFlockRepository.findAll();
        assertThat(customerFlockList).hasSize(databaseSizeBeforeUpdate);
        CustomerFlock testCustomerFlock = customerFlockList.get(customerFlockList.size() - 1);
        assertThat(testCustomerFlock.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testCustomerFlock.getPy()).isEqualTo(UPDATED_PY);
        assertThat(testCustomerFlock.getPinYin()).isEqualTo(UPDATED_PIN_YIN);
        assertThat(testCustomerFlock.getImageUrl()).isEqualTo(UPDATED_IMAGE_URL);
        assertThat(testCustomerFlock.getCreatedDate()).isEqualTo(UPDATED_CREATED_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingCustomerFlock() throws Exception {
        int databaseSizeBeforeUpdate = customerFlockRepository.findAll().size();

        // Create the CustomerFlock
        CustomerFlockDTO customerFlockDTO = customerFlockMapper.toDto(customerFlock);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCustomerFlockMockMvc.perform(put("/api/customer-flocks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(customerFlockDTO)))
            .andExpect(status().isCreated());

        // Validate the CustomerFlock in the database
        List<CustomerFlock> customerFlockList = customerFlockRepository.findAll();
        assertThat(customerFlockList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCustomerFlock() throws Exception {
        // Initialize the database
        customerFlockRepository.saveAndFlush(customerFlock);
        int databaseSizeBeforeDelete = customerFlockRepository.findAll().size();

        // Get the customerFlock
        restCustomerFlockMockMvc.perform(delete("/api/customer-flocks/{id}", customerFlock.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CustomerFlock> customerFlockList = customerFlockRepository.findAll();
        assertThat(customerFlockList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CustomerFlock.class);
        CustomerFlock customerFlock1 = new CustomerFlock();
        customerFlock1.setId(1L);
        CustomerFlock customerFlock2 = new CustomerFlock();
        customerFlock2.setId(customerFlock1.getId());
        assertThat(customerFlock1).isEqualTo(customerFlock2);
        customerFlock2.setId(2L);
        assertThat(customerFlock1).isNotEqualTo(customerFlock2);
        customerFlock1.setId(null);
        assertThat(customerFlock1).isNotEqualTo(customerFlock2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CustomerFlockDTO.class);
        CustomerFlockDTO customerFlockDTO1 = new CustomerFlockDTO();
        customerFlockDTO1.setId(1L);
        CustomerFlockDTO customerFlockDTO2 = new CustomerFlockDTO();
        assertThat(customerFlockDTO1).isNotEqualTo(customerFlockDTO2);
        customerFlockDTO2.setId(customerFlockDTO1.getId());
        assertThat(customerFlockDTO1).isEqualTo(customerFlockDTO2);
        customerFlockDTO2.setId(2L);
        assertThat(customerFlockDTO1).isNotEqualTo(customerFlockDTO2);
        customerFlockDTO1.setId(null);
        assertThat(customerFlockDTO1).isNotEqualTo(customerFlockDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(customerFlockMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(customerFlockMapper.fromId(null)).isNull();
    }
}
