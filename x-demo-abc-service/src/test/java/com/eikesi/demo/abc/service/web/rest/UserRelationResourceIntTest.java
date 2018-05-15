package com.eikesi.demo.abc.service.web.rest;

import com.eikesi.demo.abc.service.DemoAbcServiceApp;

import com.eikesi.demo.abc.service.domain.UserRelation;
import com.eikesi.demo.abc.service.repository.UserRelationRepository;
import com.eikesi.demo.abc.service.service.UserRelationService;
import com.eikesi.demo.abc.service.service.dto.UserRelationDTO;
import com.eikesi.demo.abc.service.service.mapper.UserRelationMapper;
import com.eikesi.demo.abc.service.web.rest.errors.ExceptionTranslator;

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

import static com.eikesi.demo.abc.service.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the UserRelationResource REST controller.
 *
 * @see UserRelationResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DemoAbcServiceApp.class)
public class UserRelationResourceIntTest {

    private static final String DEFAULT_REMARK_NAME = "AAAAAAAAAA";
    private static final String UPDATED_REMARK_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_TYPE = "AA";
    private static final String UPDATED_TYPE = "BB";

    @Autowired
    private UserRelationRepository userRelationRepository;

    @Autowired
    private UserRelationMapper userRelationMapper;

    @Autowired
    private UserRelationService userRelationService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restUserRelationMockMvc;

    private UserRelation userRelation;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final UserRelationResource userRelationResource = new UserRelationResource(userRelationService);
        this.restUserRelationMockMvc = MockMvcBuilders.standaloneSetup(userRelationResource)
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
    public static UserRelation createEntity(EntityManager em) {
        UserRelation userRelation = new UserRelation()
            .remarkName(DEFAULT_REMARK_NAME)
            .type(DEFAULT_TYPE);
        return userRelation;
    }

    @Before
    public void initTest() {
        userRelation = createEntity(em);
    }

    @Test
    @Transactional
    public void createUserRelation() throws Exception {
        int databaseSizeBeforeCreate = userRelationRepository.findAll().size();

        // Create the UserRelation
        UserRelationDTO userRelationDTO = userRelationMapper.toDto(userRelation);
        restUserRelationMockMvc.perform(post("/api/user-relations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userRelationDTO)))
            .andExpect(status().isCreated());

        // Validate the UserRelation in the database
        List<UserRelation> userRelationList = userRelationRepository.findAll();
        assertThat(userRelationList).hasSize(databaseSizeBeforeCreate + 1);
        UserRelation testUserRelation = userRelationList.get(userRelationList.size() - 1);
        assertThat(testUserRelation.getRemarkName()).isEqualTo(DEFAULT_REMARK_NAME);
        assertThat(testUserRelation.getType()).isEqualTo(DEFAULT_TYPE);
    }

    @Test
    @Transactional
    public void createUserRelationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = userRelationRepository.findAll().size();

        // Create the UserRelation with an existing ID
        userRelation.setId(1L);
        UserRelationDTO userRelationDTO = userRelationMapper.toDto(userRelation);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUserRelationMockMvc.perform(post("/api/user-relations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userRelationDTO)))
            .andExpect(status().isBadRequest());

        // Validate the UserRelation in the database
        List<UserRelation> userRelationList = userRelationRepository.findAll();
        assertThat(userRelationList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = userRelationRepository.findAll().size();
        // set the field null
        userRelation.setType(null);

        // Create the UserRelation, which fails.
        UserRelationDTO userRelationDTO = userRelationMapper.toDto(userRelation);

        restUserRelationMockMvc.perform(post("/api/user-relations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userRelationDTO)))
            .andExpect(status().isBadRequest());

        List<UserRelation> userRelationList = userRelationRepository.findAll();
        assertThat(userRelationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllUserRelations() throws Exception {
        // Initialize the database
        userRelationRepository.saveAndFlush(userRelation);

        // Get all the userRelationList
        restUserRelationMockMvc.perform(get("/api/user-relations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(userRelation.getId().intValue())))
            .andExpect(jsonPath("$.[*].remarkName").value(hasItem(DEFAULT_REMARK_NAME.toString())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())));
    }

    @Test
    @Transactional
    public void getUserRelation() throws Exception {
        // Initialize the database
        userRelationRepository.saveAndFlush(userRelation);

        // Get the userRelation
        restUserRelationMockMvc.perform(get("/api/user-relations/{id}", userRelation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(userRelation.getId().intValue()))
            .andExpect(jsonPath("$.remarkName").value(DEFAULT_REMARK_NAME.toString()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingUserRelation() throws Exception {
        // Get the userRelation
        restUserRelationMockMvc.perform(get("/api/user-relations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUserRelation() throws Exception {
        // Initialize the database
        userRelationRepository.saveAndFlush(userRelation);
        int databaseSizeBeforeUpdate = userRelationRepository.findAll().size();

        // Update the userRelation
        UserRelation updatedUserRelation = userRelationRepository.findOne(userRelation.getId());
        // Disconnect from session so that the updates on updatedUserRelation are not directly saved in db
        em.detach(updatedUserRelation);
        updatedUserRelation
            .remarkName(UPDATED_REMARK_NAME)
            .type(UPDATED_TYPE);
        UserRelationDTO userRelationDTO = userRelationMapper.toDto(updatedUserRelation);

        restUserRelationMockMvc.perform(put("/api/user-relations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userRelationDTO)))
            .andExpect(status().isOk());

        // Validate the UserRelation in the database
        List<UserRelation> userRelationList = userRelationRepository.findAll();
        assertThat(userRelationList).hasSize(databaseSizeBeforeUpdate);
        UserRelation testUserRelation = userRelationList.get(userRelationList.size() - 1);
        assertThat(testUserRelation.getRemarkName()).isEqualTo(UPDATED_REMARK_NAME);
        assertThat(testUserRelation.getType()).isEqualTo(UPDATED_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingUserRelation() throws Exception {
        int databaseSizeBeforeUpdate = userRelationRepository.findAll().size();

        // Create the UserRelation
        UserRelationDTO userRelationDTO = userRelationMapper.toDto(userRelation);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restUserRelationMockMvc.perform(put("/api/user-relations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userRelationDTO)))
            .andExpect(status().isCreated());

        // Validate the UserRelation in the database
        List<UserRelation> userRelationList = userRelationRepository.findAll();
        assertThat(userRelationList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteUserRelation() throws Exception {
        // Initialize the database
        userRelationRepository.saveAndFlush(userRelation);
        int databaseSizeBeforeDelete = userRelationRepository.findAll().size();

        // Get the userRelation
        restUserRelationMockMvc.perform(delete("/api/user-relations/{id}", userRelation.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<UserRelation> userRelationList = userRelationRepository.findAll();
        assertThat(userRelationList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UserRelation.class);
        UserRelation userRelation1 = new UserRelation();
        userRelation1.setId(1L);
        UserRelation userRelation2 = new UserRelation();
        userRelation2.setId(userRelation1.getId());
        assertThat(userRelation1).isEqualTo(userRelation2);
        userRelation2.setId(2L);
        assertThat(userRelation1).isNotEqualTo(userRelation2);
        userRelation1.setId(null);
        assertThat(userRelation1).isNotEqualTo(userRelation2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(UserRelationDTO.class);
        UserRelationDTO userRelationDTO1 = new UserRelationDTO();
        userRelationDTO1.setId(1L);
        UserRelationDTO userRelationDTO2 = new UserRelationDTO();
        assertThat(userRelationDTO1).isNotEqualTo(userRelationDTO2);
        userRelationDTO2.setId(userRelationDTO1.getId());
        assertThat(userRelationDTO1).isEqualTo(userRelationDTO2);
        userRelationDTO2.setId(2L);
        assertThat(userRelationDTO1).isNotEqualTo(userRelationDTO2);
        userRelationDTO1.setId(null);
        assertThat(userRelationDTO1).isNotEqualTo(userRelationDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(userRelationMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(userRelationMapper.fromId(null)).isNull();
    }
}
