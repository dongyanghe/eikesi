package com.eikesi.demo.de.service.web.rest;

import com.eikesi.demo.de.service.DemoDeServiceApp;

import com.eikesi.demo.de.service.domain.UserFlock;
import com.eikesi.demo.de.service.repository.UserFlockRepository;
import com.eikesi.demo.de.service.service.UserFlockService;
import com.eikesi.demo.de.service.service.dto.UserFlockDTO;
import com.eikesi.demo.de.service.service.mapper.UserFlockMapper;
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
 * Test class for the UserFlockResource REST controller.
 *
 * @see UserFlockResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DemoDeServiceApp.class)
public class UserFlockResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_HEAD_IMG_URL = "AAAAAAAAAA";
    private static final String UPDATED_HEAD_IMG_URL = "BBBBBBBBBB";

    @Autowired
    private UserFlockRepository userFlockRepository;

    @Autowired
    private UserFlockMapper userFlockMapper;

    @Autowired
    private UserFlockService userFlockService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restUserFlockMockMvc;

    private UserFlock userFlock;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final UserFlockResource userFlockResource = new UserFlockResource(userFlockService);
        this.restUserFlockMockMvc = MockMvcBuilders.standaloneSetup(userFlockResource)
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
    public static UserFlock createEntity(EntityManager em) {
        UserFlock userFlock = new UserFlock()
            .name(DEFAULT_NAME)
            .headImgUrl(DEFAULT_HEAD_IMG_URL);
        return userFlock;
    }

    @Before
    public void initTest() {
        userFlock = createEntity(em);
    }

    @Test
    @Transactional
    public void createUserFlock() throws Exception {
        int databaseSizeBeforeCreate = userFlockRepository.findAll().size();

        // Create the UserFlock
        UserFlockDTO userFlockDTO = userFlockMapper.toDto(userFlock);
        restUserFlockMockMvc.perform(post("/api/user-flocks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userFlockDTO)))
            .andExpect(status().isCreated());

        // Validate the UserFlock in the database
        List<UserFlock> userFlockList = userFlockRepository.findAll();
        assertThat(userFlockList).hasSize(databaseSizeBeforeCreate + 1);
        UserFlock testUserFlock = userFlockList.get(userFlockList.size() - 1);
        assertThat(testUserFlock.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testUserFlock.getHeadImgUrl()).isEqualTo(DEFAULT_HEAD_IMG_URL);
    }

    @Test
    @Transactional
    public void createUserFlockWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = userFlockRepository.findAll().size();

        // Create the UserFlock with an existing ID
        userFlock.setId(1L);
        UserFlockDTO userFlockDTO = userFlockMapper.toDto(userFlock);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUserFlockMockMvc.perform(post("/api/user-flocks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userFlockDTO)))
            .andExpect(status().isBadRequest());

        // Validate the UserFlock in the database
        List<UserFlock> userFlockList = userFlockRepository.findAll();
        assertThat(userFlockList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = userFlockRepository.findAll().size();
        // set the field null
        userFlock.setName(null);

        // Create the UserFlock, which fails.
        UserFlockDTO userFlockDTO = userFlockMapper.toDto(userFlock);

        restUserFlockMockMvc.perform(post("/api/user-flocks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userFlockDTO)))
            .andExpect(status().isBadRequest());

        List<UserFlock> userFlockList = userFlockRepository.findAll();
        assertThat(userFlockList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkHeadImgUrlIsRequired() throws Exception {
        int databaseSizeBeforeTest = userFlockRepository.findAll().size();
        // set the field null
        userFlock.setHeadImgUrl(null);

        // Create the UserFlock, which fails.
        UserFlockDTO userFlockDTO = userFlockMapper.toDto(userFlock);

        restUserFlockMockMvc.perform(post("/api/user-flocks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userFlockDTO)))
            .andExpect(status().isBadRequest());

        List<UserFlock> userFlockList = userFlockRepository.findAll();
        assertThat(userFlockList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllUserFlocks() throws Exception {
        // Initialize the database
        userFlockRepository.saveAndFlush(userFlock);

        // Get all the userFlockList
        restUserFlockMockMvc.perform(get("/api/user-flocks?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(userFlock.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].headImgUrl").value(hasItem(DEFAULT_HEAD_IMG_URL.toString())));
    }

    @Test
    @Transactional
    public void getUserFlock() throws Exception {
        // Initialize the database
        userFlockRepository.saveAndFlush(userFlock);

        // Get the userFlock
        restUserFlockMockMvc.perform(get("/api/user-flocks/{id}", userFlock.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(userFlock.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.headImgUrl").value(DEFAULT_HEAD_IMG_URL.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingUserFlock() throws Exception {
        // Get the userFlock
        restUserFlockMockMvc.perform(get("/api/user-flocks/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUserFlock() throws Exception {
        // Initialize the database
        userFlockRepository.saveAndFlush(userFlock);
        int databaseSizeBeforeUpdate = userFlockRepository.findAll().size();

        // Update the userFlock
        UserFlock updatedUserFlock = userFlockRepository.findOne(userFlock.getId());
        // Disconnect from session so that the updates on updatedUserFlock are not directly saved in db
        em.detach(updatedUserFlock);
        updatedUserFlock
            .name(UPDATED_NAME)
            .headImgUrl(UPDATED_HEAD_IMG_URL);
        UserFlockDTO userFlockDTO = userFlockMapper.toDto(updatedUserFlock);

        restUserFlockMockMvc.perform(put("/api/user-flocks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userFlockDTO)))
            .andExpect(status().isOk());

        // Validate the UserFlock in the database
        List<UserFlock> userFlockList = userFlockRepository.findAll();
        assertThat(userFlockList).hasSize(databaseSizeBeforeUpdate);
        UserFlock testUserFlock = userFlockList.get(userFlockList.size() - 1);
        assertThat(testUserFlock.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testUserFlock.getHeadImgUrl()).isEqualTo(UPDATED_HEAD_IMG_URL);
    }

    @Test
    @Transactional
    public void updateNonExistingUserFlock() throws Exception {
        int databaseSizeBeforeUpdate = userFlockRepository.findAll().size();

        // Create the UserFlock
        UserFlockDTO userFlockDTO = userFlockMapper.toDto(userFlock);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restUserFlockMockMvc.perform(put("/api/user-flocks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userFlockDTO)))
            .andExpect(status().isCreated());

        // Validate the UserFlock in the database
        List<UserFlock> userFlockList = userFlockRepository.findAll();
        assertThat(userFlockList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteUserFlock() throws Exception {
        // Initialize the database
        userFlockRepository.saveAndFlush(userFlock);
        int databaseSizeBeforeDelete = userFlockRepository.findAll().size();

        // Get the userFlock
        restUserFlockMockMvc.perform(delete("/api/user-flocks/{id}", userFlock.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<UserFlock> userFlockList = userFlockRepository.findAll();
        assertThat(userFlockList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UserFlock.class);
        UserFlock userFlock1 = new UserFlock();
        userFlock1.setId(1L);
        UserFlock userFlock2 = new UserFlock();
        userFlock2.setId(userFlock1.getId());
        assertThat(userFlock1).isEqualTo(userFlock2);
        userFlock2.setId(2L);
        assertThat(userFlock1).isNotEqualTo(userFlock2);
        userFlock1.setId(null);
        assertThat(userFlock1).isNotEqualTo(userFlock2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(UserFlockDTO.class);
        UserFlockDTO userFlockDTO1 = new UserFlockDTO();
        userFlockDTO1.setId(1L);
        UserFlockDTO userFlockDTO2 = new UserFlockDTO();
        assertThat(userFlockDTO1).isNotEqualTo(userFlockDTO2);
        userFlockDTO2.setId(userFlockDTO1.getId());
        assertThat(userFlockDTO1).isEqualTo(userFlockDTO2);
        userFlockDTO2.setId(2L);
        assertThat(userFlockDTO1).isNotEqualTo(userFlockDTO2);
        userFlockDTO1.setId(null);
        assertThat(userFlockDTO1).isNotEqualTo(userFlockDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(userFlockMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(userFlockMapper.fromId(null)).isNull();
    }
}
