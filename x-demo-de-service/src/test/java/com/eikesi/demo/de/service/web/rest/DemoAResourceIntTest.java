package com.eikesi.demo.de.service.web.rest;

import com.eikesi.demo.de.service.DemoDeServiceApp;

import com.eikesi.demo.de.service.domain.DemoA;
import com.eikesi.demo.de.service.repository.DemoARepository;
import com.eikesi.demo.de.service.service.DemoAService;
import com.eikesi.demo.de.service.service.dto.DemoADTO;
import com.eikesi.demo.de.service.service.mapper.DemoAMapper;
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
import org.springframework.util.Base64Utils;

import javax.persistence.EntityManager;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static com.eikesi.demo.de.service.web.rest.TestUtil.sameInstant;
import static com.eikesi.demo.de.service.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.eikesi.demo.de.service.domain.enumeration.Language;
/**
 * Test class for the DemoAResource REST controller.
 *
 * @see DemoAResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DemoDeServiceApp.class)
public class DemoAResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_STATUS = "AA";
    private static final String UPDATED_STATUS = "BB";

    private static final Integer DEFAULT_NUMBER = 100;
    private static final Integer UPDATED_NUMBER = 101;

    private static final BigDecimal DEFAULT_BIG_DECIMAL_NUM = new BigDecimal(10);
    private static final BigDecimal UPDATED_BIG_DECIMAL_NUM = new BigDecimal(11);

    private static final Float DEFAULT_FLOAT_NUM = 10F;
    private static final Float UPDATED_FLOAT_NUM = 11F;

    private static final Double DEFAULT_DOUBLE_NUM = 10D;
    private static final Double UPDATED_DOUBLE_NUM = 11D;

    private static final Language DEFAULT_LANGUAGE_ENUM = Language.FRENCH;
    private static final Language UPDATED_LANGUAGE_ENUM = Language.ENGLISH;

    private static final byte[] DEFAULT_BLOB_NUM = TestUtil.createByteArray(100, "0");
    private static final byte[] UPDATED_BLOB_NUM = TestUtil.createByteArray(100, "1");
    private static final String DEFAULT_BLOB_NUM_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_BLOB_NUM_CONTENT_TYPE = "image/png";

    private static final byte[] DEFAULT_ANY_BLOB_NUM = TestUtil.createByteArray(10, "0");
    private static final byte[] UPDATED_ANY_BLOB_NUM = TestUtil.createByteArray(10, "1");
    private static final String DEFAULT_ANY_BLOB_NUM_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_ANY_BLOB_NUM_CONTENT_TYPE = "image/png";

    private static final byte[] DEFAULT_IMAGE_BLOB_NUM = TestUtil.createByteArray(10, "0");
    private static final byte[] UPDATED_IMAGE_BLOB_NUM = TestUtil.createByteArray(10, "1");
    private static final String DEFAULT_IMAGE_BLOB_NUM_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_IMAGE_BLOB_NUM_CONTENT_TYPE = "image/png";

    private static final String DEFAULT_TEXT_BLOB_NUM = "AAAAAAAAAA";
    private static final String UPDATED_TEXT_BLOB_NUM = "BBBBBBBBBB";

    private static final Boolean DEFAULT_BOOLEAN_CHECK = false;
    private static final Boolean UPDATED_BOOLEAN_CHECK = true;

    private static final LocalDate DEFAULT_LOCAL_DATE_WHEN = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_LOCAL_DATE_WHEN = LocalDate.now(ZoneId.systemDefault());

    private static final ZonedDateTime DEFAULT_ZONED_DATE_TIME_WHEN = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_ZONED_DATE_TIME_WHEN = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final Instant DEFAULT_INSTANT_TYPE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_INSTANT_TYPE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private DemoARepository demoARepository;

    @Autowired
    private DemoAMapper demoAMapper;

    @Autowired
    private DemoAService demoAService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restDemoAMockMvc;

    private DemoA demoA;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DemoAResource demoAResource = new DemoAResource(demoAService);
        this.restDemoAMockMvc = MockMvcBuilders.standaloneSetup(demoAResource)
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
    public static DemoA createEntity(EntityManager em) {
        DemoA demoA = new DemoA()
            .name(DEFAULT_NAME)
            .status(DEFAULT_STATUS)
            .number(DEFAULT_NUMBER)
            .bigDecimalNum(DEFAULT_BIG_DECIMAL_NUM)
            .floatNum(DEFAULT_FLOAT_NUM)
            .doubleNum(DEFAULT_DOUBLE_NUM)
            .languageEnum(DEFAULT_LANGUAGE_ENUM)
            .blobNum(DEFAULT_BLOB_NUM)
            .blobNumContentType(DEFAULT_BLOB_NUM_CONTENT_TYPE)
            .anyBlobNum(DEFAULT_ANY_BLOB_NUM)
            .anyBlobNumContentType(DEFAULT_ANY_BLOB_NUM_CONTENT_TYPE)
            .imageBlobNum(DEFAULT_IMAGE_BLOB_NUM)
            .imageBlobNumContentType(DEFAULT_IMAGE_BLOB_NUM_CONTENT_TYPE)
            .textBlobNum(DEFAULT_TEXT_BLOB_NUM)
            .booleanCheck(DEFAULT_BOOLEAN_CHECK)
            .localDateWhen(DEFAULT_LOCAL_DATE_WHEN)
            .zonedDateTimeWhen(DEFAULT_ZONED_DATE_TIME_WHEN)
            .instantType(DEFAULT_INSTANT_TYPE);
        return demoA;
    }

    @Before
    public void initTest() {
        demoA = createEntity(em);
    }

    @Test
    @Transactional
    public void createDemoA() throws Exception {
        int databaseSizeBeforeCreate = demoARepository.findAll().size();

        // Create the DemoA
        DemoADTO demoADTO = demoAMapper.toDto(demoA);
        restDemoAMockMvc.perform(post("/api/demo-as")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(demoADTO)))
            .andExpect(status().isCreated());

        // Validate the DemoA in the database
        List<DemoA> demoAList = demoARepository.findAll();
        assertThat(demoAList).hasSize(databaseSizeBeforeCreate + 1);
        DemoA testDemoA = demoAList.get(demoAList.size() - 1);
        assertThat(testDemoA.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testDemoA.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testDemoA.getNumber()).isEqualTo(DEFAULT_NUMBER);
        assertThat(testDemoA.getBigDecimalNum()).isEqualTo(DEFAULT_BIG_DECIMAL_NUM);
        assertThat(testDemoA.getFloatNum()).isEqualTo(DEFAULT_FLOAT_NUM);
        assertThat(testDemoA.getDoubleNum()).isEqualTo(DEFAULT_DOUBLE_NUM);
        assertThat(testDemoA.getLanguageEnum()).isEqualTo(DEFAULT_LANGUAGE_ENUM);
        assertThat(testDemoA.getBlobNum()).isEqualTo(DEFAULT_BLOB_NUM);
        assertThat(testDemoA.getBlobNumContentType()).isEqualTo(DEFAULT_BLOB_NUM_CONTENT_TYPE);
        assertThat(testDemoA.getAnyBlobNum()).isEqualTo(DEFAULT_ANY_BLOB_NUM);
        assertThat(testDemoA.getAnyBlobNumContentType()).isEqualTo(DEFAULT_ANY_BLOB_NUM_CONTENT_TYPE);
        assertThat(testDemoA.getImageBlobNum()).isEqualTo(DEFAULT_IMAGE_BLOB_NUM);
        assertThat(testDemoA.getImageBlobNumContentType()).isEqualTo(DEFAULT_IMAGE_BLOB_NUM_CONTENT_TYPE);
        assertThat(testDemoA.getTextBlobNum()).isEqualTo(DEFAULT_TEXT_BLOB_NUM);
        assertThat(testDemoA.isBooleanCheck()).isEqualTo(DEFAULT_BOOLEAN_CHECK);
        assertThat(testDemoA.getLocalDateWhen()).isEqualTo(DEFAULT_LOCAL_DATE_WHEN);
        assertThat(testDemoA.getZonedDateTimeWhen()).isEqualTo(DEFAULT_ZONED_DATE_TIME_WHEN);
        assertThat(testDemoA.getInstantType()).isEqualTo(DEFAULT_INSTANT_TYPE);
    }

    @Test
    @Transactional
    public void createDemoAWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = demoARepository.findAll().size();

        // Create the DemoA with an existing ID
        demoA.setId(1L);
        DemoADTO demoADTO = demoAMapper.toDto(demoA);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDemoAMockMvc.perform(post("/api/demo-as")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(demoADTO)))
            .andExpect(status().isBadRequest());

        // Validate the DemoA in the database
        List<DemoA> demoAList = demoARepository.findAll();
        assertThat(demoAList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = demoARepository.findAll().size();
        // set the field null
        demoA.setName(null);

        // Create the DemoA, which fails.
        DemoADTO demoADTO = demoAMapper.toDto(demoA);

        restDemoAMockMvc.perform(post("/api/demo-as")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(demoADTO)))
            .andExpect(status().isBadRequest());

        List<DemoA> demoAList = demoARepository.findAll();
        assertThat(demoAList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStatusIsRequired() throws Exception {
        int databaseSizeBeforeTest = demoARepository.findAll().size();
        // set the field null
        demoA.setStatus(null);

        // Create the DemoA, which fails.
        DemoADTO demoADTO = demoAMapper.toDto(demoA);

        restDemoAMockMvc.perform(post("/api/demo-as")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(demoADTO)))
            .andExpect(status().isBadRequest());

        List<DemoA> demoAList = demoARepository.findAll();
        assertThat(demoAList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNumberIsRequired() throws Exception {
        int databaseSizeBeforeTest = demoARepository.findAll().size();
        // set the field null
        demoA.setNumber(null);

        // Create the DemoA, which fails.
        DemoADTO demoADTO = demoAMapper.toDto(demoA);

        restDemoAMockMvc.perform(post("/api/demo-as")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(demoADTO)))
            .andExpect(status().isBadRequest());

        List<DemoA> demoAList = demoARepository.findAll();
        assertThat(demoAList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkBigDecimalNumIsRequired() throws Exception {
        int databaseSizeBeforeTest = demoARepository.findAll().size();
        // set the field null
        demoA.setBigDecimalNum(null);

        // Create the DemoA, which fails.
        DemoADTO demoADTO = demoAMapper.toDto(demoA);

        restDemoAMockMvc.perform(post("/api/demo-as")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(demoADTO)))
            .andExpect(status().isBadRequest());

        List<DemoA> demoAList = demoARepository.findAll();
        assertThat(demoAList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkFloatNumIsRequired() throws Exception {
        int databaseSizeBeforeTest = demoARepository.findAll().size();
        // set the field null
        demoA.setFloatNum(null);

        // Create the DemoA, which fails.
        DemoADTO demoADTO = demoAMapper.toDto(demoA);

        restDemoAMockMvc.perform(post("/api/demo-as")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(demoADTO)))
            .andExpect(status().isBadRequest());

        List<DemoA> demoAList = demoARepository.findAll();
        assertThat(demoAList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDoubleNumIsRequired() throws Exception {
        int databaseSizeBeforeTest = demoARepository.findAll().size();
        // set the field null
        demoA.setDoubleNum(null);

        // Create the DemoA, which fails.
        DemoADTO demoADTO = demoAMapper.toDto(demoA);

        restDemoAMockMvc.perform(post("/api/demo-as")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(demoADTO)))
            .andExpect(status().isBadRequest());

        List<DemoA> demoAList = demoARepository.findAll();
        assertThat(demoAList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkBlobNumIsRequired() throws Exception {
        int databaseSizeBeforeTest = demoARepository.findAll().size();
        // set the field null
        demoA.setBlobNum(null);

        // Create the DemoA, which fails.
        DemoADTO demoADTO = demoAMapper.toDto(demoA);

        restDemoAMockMvc.perform(post("/api/demo-as")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(demoADTO)))
            .andExpect(status().isBadRequest());

        List<DemoA> demoAList = demoARepository.findAll();
        assertThat(demoAList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAnyBlobNumIsRequired() throws Exception {
        int databaseSizeBeforeTest = demoARepository.findAll().size();
        // set the field null
        demoA.setAnyBlobNum(null);

        // Create the DemoA, which fails.
        DemoADTO demoADTO = demoAMapper.toDto(demoA);

        restDemoAMockMvc.perform(post("/api/demo-as")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(demoADTO)))
            .andExpect(status().isBadRequest());

        List<DemoA> demoAList = demoARepository.findAll();
        assertThat(demoAList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkImageBlobNumIsRequired() throws Exception {
        int databaseSizeBeforeTest = demoARepository.findAll().size();
        // set the field null
        demoA.setImageBlobNum(null);

        // Create the DemoA, which fails.
        DemoADTO demoADTO = demoAMapper.toDto(demoA);

        restDemoAMockMvc.perform(post("/api/demo-as")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(demoADTO)))
            .andExpect(status().isBadRequest());

        List<DemoA> demoAList = demoARepository.findAll();
        assertThat(demoAList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTextBlobNumIsRequired() throws Exception {
        int databaseSizeBeforeTest = demoARepository.findAll().size();
        // set the field null
        demoA.setTextBlobNum(null);

        // Create the DemoA, which fails.
        DemoADTO demoADTO = demoAMapper.toDto(demoA);

        restDemoAMockMvc.perform(post("/api/demo-as")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(demoADTO)))
            .andExpect(status().isBadRequest());

        List<DemoA> demoAList = demoARepository.findAll();
        assertThat(demoAList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkBooleanCheckIsRequired() throws Exception {
        int databaseSizeBeforeTest = demoARepository.findAll().size();
        // set the field null
        demoA.setBooleanCheck(null);

        // Create the DemoA, which fails.
        DemoADTO demoADTO = demoAMapper.toDto(demoA);

        restDemoAMockMvc.perform(post("/api/demo-as")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(demoADTO)))
            .andExpect(status().isBadRequest());

        List<DemoA> demoAList = demoARepository.findAll();
        assertThat(demoAList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkLocalDateWhenIsRequired() throws Exception {
        int databaseSizeBeforeTest = demoARepository.findAll().size();
        // set the field null
        demoA.setLocalDateWhen(null);

        // Create the DemoA, which fails.
        DemoADTO demoADTO = demoAMapper.toDto(demoA);

        restDemoAMockMvc.perform(post("/api/demo-as")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(demoADTO)))
            .andExpect(status().isBadRequest());

        List<DemoA> demoAList = demoARepository.findAll();
        assertThat(demoAList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkZonedDateTimeWhenIsRequired() throws Exception {
        int databaseSizeBeforeTest = demoARepository.findAll().size();
        // set the field null
        demoA.setZonedDateTimeWhen(null);

        // Create the DemoA, which fails.
        DemoADTO demoADTO = demoAMapper.toDto(demoA);

        restDemoAMockMvc.perform(post("/api/demo-as")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(demoADTO)))
            .andExpect(status().isBadRequest());

        List<DemoA> demoAList = demoARepository.findAll();
        assertThat(demoAList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkInstantTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = demoARepository.findAll().size();
        // set the field null
        demoA.setInstantType(null);

        // Create the DemoA, which fails.
        DemoADTO demoADTO = demoAMapper.toDto(demoA);

        restDemoAMockMvc.perform(post("/api/demo-as")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(demoADTO)))
            .andExpect(status().isBadRequest());

        List<DemoA> demoAList = demoARepository.findAll();
        assertThat(demoAList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllDemoAS() throws Exception {
        // Initialize the database
        demoARepository.saveAndFlush(demoA);

        // Get all the demoAList
        restDemoAMockMvc.perform(get("/api/demo-as?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(demoA.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].number").value(hasItem(DEFAULT_NUMBER)))
            .andExpect(jsonPath("$.[*].bigDecimalNum").value(hasItem(DEFAULT_BIG_DECIMAL_NUM.intValue())))
            .andExpect(jsonPath("$.[*].floatNum").value(hasItem(DEFAULT_FLOAT_NUM.doubleValue())))
            .andExpect(jsonPath("$.[*].doubleNum").value(hasItem(DEFAULT_DOUBLE_NUM.doubleValue())))
            .andExpect(jsonPath("$.[*].languageEnum").value(hasItem(DEFAULT_LANGUAGE_ENUM.toString())))
            .andExpect(jsonPath("$.[*].blobNumContentType").value(hasItem(DEFAULT_BLOB_NUM_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].blobNum").value(hasItem(Base64Utils.encodeToString(DEFAULT_BLOB_NUM))))
            .andExpect(jsonPath("$.[*].anyBlobNumContentType").value(hasItem(DEFAULT_ANY_BLOB_NUM_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].anyBlobNum").value(hasItem(Base64Utils.encodeToString(DEFAULT_ANY_BLOB_NUM))))
            .andExpect(jsonPath("$.[*].imageBlobNumContentType").value(hasItem(DEFAULT_IMAGE_BLOB_NUM_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].imageBlobNum").value(hasItem(Base64Utils.encodeToString(DEFAULT_IMAGE_BLOB_NUM))))
            .andExpect(jsonPath("$.[*].textBlobNum").value(hasItem(DEFAULT_TEXT_BLOB_NUM.toString())))
            .andExpect(jsonPath("$.[*].booleanCheck").value(hasItem(DEFAULT_BOOLEAN_CHECK.booleanValue())))
            .andExpect(jsonPath("$.[*].localDateWhen").value(hasItem(DEFAULT_LOCAL_DATE_WHEN.toString())))
            .andExpect(jsonPath("$.[*].zonedDateTimeWhen").value(hasItem(sameInstant(DEFAULT_ZONED_DATE_TIME_WHEN))))
            .andExpect(jsonPath("$.[*].instantType").value(hasItem(DEFAULT_INSTANT_TYPE.toString())));
    }

    @Test
    @Transactional
    public void getDemoA() throws Exception {
        // Initialize the database
        demoARepository.saveAndFlush(demoA);

        // Get the demoA
        restDemoAMockMvc.perform(get("/api/demo-as/{id}", demoA.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(demoA.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()))
            .andExpect(jsonPath("$.number").value(DEFAULT_NUMBER))
            .andExpect(jsonPath("$.bigDecimalNum").value(DEFAULT_BIG_DECIMAL_NUM.intValue()))
            .andExpect(jsonPath("$.floatNum").value(DEFAULT_FLOAT_NUM.doubleValue()))
            .andExpect(jsonPath("$.doubleNum").value(DEFAULT_DOUBLE_NUM.doubleValue()))
            .andExpect(jsonPath("$.languageEnum").value(DEFAULT_LANGUAGE_ENUM.toString()))
            .andExpect(jsonPath("$.blobNumContentType").value(DEFAULT_BLOB_NUM_CONTENT_TYPE))
            .andExpect(jsonPath("$.blobNum").value(Base64Utils.encodeToString(DEFAULT_BLOB_NUM)))
            .andExpect(jsonPath("$.anyBlobNumContentType").value(DEFAULT_ANY_BLOB_NUM_CONTENT_TYPE))
            .andExpect(jsonPath("$.anyBlobNum").value(Base64Utils.encodeToString(DEFAULT_ANY_BLOB_NUM)))
            .andExpect(jsonPath("$.imageBlobNumContentType").value(DEFAULT_IMAGE_BLOB_NUM_CONTENT_TYPE))
            .andExpect(jsonPath("$.imageBlobNum").value(Base64Utils.encodeToString(DEFAULT_IMAGE_BLOB_NUM)))
            .andExpect(jsonPath("$.textBlobNum").value(DEFAULT_TEXT_BLOB_NUM.toString()))
            .andExpect(jsonPath("$.booleanCheck").value(DEFAULT_BOOLEAN_CHECK.booleanValue()))
            .andExpect(jsonPath("$.localDateWhen").value(DEFAULT_LOCAL_DATE_WHEN.toString()))
            .andExpect(jsonPath("$.zonedDateTimeWhen").value(sameInstant(DEFAULT_ZONED_DATE_TIME_WHEN)))
            .andExpect(jsonPath("$.instantType").value(DEFAULT_INSTANT_TYPE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDemoA() throws Exception {
        // Get the demoA
        restDemoAMockMvc.perform(get("/api/demo-as/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDemoA() throws Exception {
        // Initialize the database
        demoARepository.saveAndFlush(demoA);
        int databaseSizeBeforeUpdate = demoARepository.findAll().size();

        // Update the demoA
        DemoA updatedDemoA = demoARepository.findOne(demoA.getId());
        // Disconnect from session so that the updates on updatedDemoA are not directly saved in db
        em.detach(updatedDemoA);
        updatedDemoA
            .name(UPDATED_NAME)
            .status(UPDATED_STATUS)
            .number(UPDATED_NUMBER)
            .bigDecimalNum(UPDATED_BIG_DECIMAL_NUM)
            .floatNum(UPDATED_FLOAT_NUM)
            .doubleNum(UPDATED_DOUBLE_NUM)
            .languageEnum(UPDATED_LANGUAGE_ENUM)
            .blobNum(UPDATED_BLOB_NUM)
            .blobNumContentType(UPDATED_BLOB_NUM_CONTENT_TYPE)
            .anyBlobNum(UPDATED_ANY_BLOB_NUM)
            .anyBlobNumContentType(UPDATED_ANY_BLOB_NUM_CONTENT_TYPE)
            .imageBlobNum(UPDATED_IMAGE_BLOB_NUM)
            .imageBlobNumContentType(UPDATED_IMAGE_BLOB_NUM_CONTENT_TYPE)
            .textBlobNum(UPDATED_TEXT_BLOB_NUM)
            .booleanCheck(UPDATED_BOOLEAN_CHECK)
            .localDateWhen(UPDATED_LOCAL_DATE_WHEN)
            .zonedDateTimeWhen(UPDATED_ZONED_DATE_TIME_WHEN)
            .instantType(UPDATED_INSTANT_TYPE);
        DemoADTO demoADTO = demoAMapper.toDto(updatedDemoA);

        restDemoAMockMvc.perform(put("/api/demo-as")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(demoADTO)))
            .andExpect(status().isOk());

        // Validate the DemoA in the database
        List<DemoA> demoAList = demoARepository.findAll();
        assertThat(demoAList).hasSize(databaseSizeBeforeUpdate);
        DemoA testDemoA = demoAList.get(demoAList.size() - 1);
        assertThat(testDemoA.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testDemoA.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testDemoA.getNumber()).isEqualTo(UPDATED_NUMBER);
        assertThat(testDemoA.getBigDecimalNum()).isEqualTo(UPDATED_BIG_DECIMAL_NUM);
        assertThat(testDemoA.getFloatNum()).isEqualTo(UPDATED_FLOAT_NUM);
        assertThat(testDemoA.getDoubleNum()).isEqualTo(UPDATED_DOUBLE_NUM);
        assertThat(testDemoA.getLanguageEnum()).isEqualTo(UPDATED_LANGUAGE_ENUM);
        assertThat(testDemoA.getBlobNum()).isEqualTo(UPDATED_BLOB_NUM);
        assertThat(testDemoA.getBlobNumContentType()).isEqualTo(UPDATED_BLOB_NUM_CONTENT_TYPE);
        assertThat(testDemoA.getAnyBlobNum()).isEqualTo(UPDATED_ANY_BLOB_NUM);
        assertThat(testDemoA.getAnyBlobNumContentType()).isEqualTo(UPDATED_ANY_BLOB_NUM_CONTENT_TYPE);
        assertThat(testDemoA.getImageBlobNum()).isEqualTo(UPDATED_IMAGE_BLOB_NUM);
        assertThat(testDemoA.getImageBlobNumContentType()).isEqualTo(UPDATED_IMAGE_BLOB_NUM_CONTENT_TYPE);
        assertThat(testDemoA.getTextBlobNum()).isEqualTo(UPDATED_TEXT_BLOB_NUM);
        assertThat(testDemoA.isBooleanCheck()).isEqualTo(UPDATED_BOOLEAN_CHECK);
        assertThat(testDemoA.getLocalDateWhen()).isEqualTo(UPDATED_LOCAL_DATE_WHEN);
        assertThat(testDemoA.getZonedDateTimeWhen()).isEqualTo(UPDATED_ZONED_DATE_TIME_WHEN);
        assertThat(testDemoA.getInstantType()).isEqualTo(UPDATED_INSTANT_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingDemoA() throws Exception {
        int databaseSizeBeforeUpdate = demoARepository.findAll().size();

        // Create the DemoA
        DemoADTO demoADTO = demoAMapper.toDto(demoA);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restDemoAMockMvc.perform(put("/api/demo-as")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(demoADTO)))
            .andExpect(status().isCreated());

        // Validate the DemoA in the database
        List<DemoA> demoAList = demoARepository.findAll();
        assertThat(demoAList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteDemoA() throws Exception {
        // Initialize the database
        demoARepository.saveAndFlush(demoA);
        int databaseSizeBeforeDelete = demoARepository.findAll().size();

        // Get the demoA
        restDemoAMockMvc.perform(delete("/api/demo-as/{id}", demoA.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<DemoA> demoAList = demoARepository.findAll();
        assertThat(demoAList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DemoA.class);
        DemoA demoA1 = new DemoA();
        demoA1.setId(1L);
        DemoA demoA2 = new DemoA();
        demoA2.setId(demoA1.getId());
        assertThat(demoA1).isEqualTo(demoA2);
        demoA2.setId(2L);
        assertThat(demoA1).isNotEqualTo(demoA2);
        demoA1.setId(null);
        assertThat(demoA1).isNotEqualTo(demoA2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(DemoADTO.class);
        DemoADTO demoADTO1 = new DemoADTO();
        demoADTO1.setId(1L);
        DemoADTO demoADTO2 = new DemoADTO();
        assertThat(demoADTO1).isNotEqualTo(demoADTO2);
        demoADTO2.setId(demoADTO1.getId());
        assertThat(demoADTO1).isEqualTo(demoADTO2);
        demoADTO2.setId(2L);
        assertThat(demoADTO1).isNotEqualTo(demoADTO2);
        demoADTO1.setId(null);
        assertThat(demoADTO1).isNotEqualTo(demoADTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(demoAMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(demoAMapper.fromId(null)).isNull();
    }
}
