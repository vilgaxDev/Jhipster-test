package com.niche.ng.web.rest;

import com.niche.ng.ProjectGhApp;

import com.niche.ng.domain.Zonal;
import com.niche.ng.repository.ZonalRepository;
import com.niche.ng.service.ZonalService;
import com.niche.ng.service.dto.ZonalDTO;
import com.niche.ng.service.mapper.ZonalMapper;
import com.niche.ng.web.rest.errors.ExceptionTranslator;

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


import static com.niche.ng.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ZonalResource REST controller.
 *
 * @see ZonalResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ProjectGhApp.class)
public class ZonalResourceIntTest {

    private static final String DEFAULT_ZONE_NAME = "AAAAAAAAAA";
    private static final String UPDATED_ZONE_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_ZONE_ADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_ZONE_ADDRESS = "BBBBBBBBBB";

    private static final String DEFAULT_ZONE_INCHARGE = "AAAAAAAAAA";
    private static final String UPDATED_ZONE_INCHARGE = "BBBBBBBBBB";

    private static final Integer DEFAULT_STATUS = 1;
    private static final Integer UPDATED_STATUS = 2;

    private static final Instant DEFAULT_CREATED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_UPDATED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_UPDATED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private ZonalRepository zonalRepository;


    @Autowired
    private ZonalMapper zonalMapper;
    

    @Autowired
    private ZonalService zonalService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restZonalMockMvc;

    private Zonal zonal;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ZonalResource zonalResource = new ZonalResource(zonalService);
        this.restZonalMockMvc = MockMvcBuilders.standaloneSetup(zonalResource)
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
    public static Zonal createEntity(EntityManager em) {
        Zonal zonal = new Zonal()
            .zoneName(DEFAULT_ZONE_NAME)
            .zoneAddress(DEFAULT_ZONE_ADDRESS)
            .zoneIncharge(DEFAULT_ZONE_INCHARGE)
            .status(DEFAULT_STATUS)
            .createdAt(DEFAULT_CREATED_AT)
            .updatedAt(DEFAULT_UPDATED_AT);
        return zonal;
    }

    @Before
    public void initTest() {
        zonal = createEntity(em);
    }

    @Test
    @Transactional
    public void createZonal() throws Exception {
        int databaseSizeBeforeCreate = zonalRepository.findAll().size();

        // Create the Zonal
        ZonalDTO zonalDTO = zonalMapper.toDto(zonal);
        restZonalMockMvc.perform(post("/api/zonals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(zonalDTO)))
            .andExpect(status().isCreated());

        // Validate the Zonal in the database
        List<Zonal> zonalList = zonalRepository.findAll();
        assertThat(zonalList).hasSize(databaseSizeBeforeCreate + 1);
        Zonal testZonal = zonalList.get(zonalList.size() - 1);
        assertThat(testZonal.getZoneName()).isEqualTo(DEFAULT_ZONE_NAME);
        assertThat(testZonal.getZoneAddress()).isEqualTo(DEFAULT_ZONE_ADDRESS);
        assertThat(testZonal.getZoneIncharge()).isEqualTo(DEFAULT_ZONE_INCHARGE);
        assertThat(testZonal.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testZonal.getCreatedAt()).isEqualTo(DEFAULT_CREATED_AT);
        assertThat(testZonal.getUpdatedAt()).isEqualTo(DEFAULT_UPDATED_AT);
    }

    @Test
    @Transactional
    public void createZonalWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = zonalRepository.findAll().size();

        // Create the Zonal with an existing ID
        zonal.setId(1L);
        ZonalDTO zonalDTO = zonalMapper.toDto(zonal);

        // An entity with an existing ID cannot be created, so this API call must fail
        restZonalMockMvc.perform(post("/api/zonals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(zonalDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Zonal in the database
        List<Zonal> zonalList = zonalRepository.findAll();
        assertThat(zonalList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkZoneNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = zonalRepository.findAll().size();
        // set the field null
        zonal.setZoneName(null);

        // Create the Zonal, which fails.
        ZonalDTO zonalDTO = zonalMapper.toDto(zonal);

        restZonalMockMvc.perform(post("/api/zonals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(zonalDTO)))
            .andExpect(status().isBadRequest());

        List<Zonal> zonalList = zonalRepository.findAll();
        assertThat(zonalList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllZonals() throws Exception {
        // Initialize the database
        zonalRepository.saveAndFlush(zonal);

        // Get all the zonalList
        restZonalMockMvc.perform(get("/api/zonals?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(zonal.getId().intValue())))
            .andExpect(jsonPath("$.[*].zoneName").value(hasItem(DEFAULT_ZONE_NAME.toString())))
            .andExpect(jsonPath("$.[*].zoneAddress").value(hasItem(DEFAULT_ZONE_ADDRESS.toString())))
            .andExpect(jsonPath("$.[*].zoneIncharge").value(hasItem(DEFAULT_ZONE_INCHARGE.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS)))
            .andExpect(jsonPath("$.[*].createdAt").value(hasItem(DEFAULT_CREATED_AT.toString())))
            .andExpect(jsonPath("$.[*].updatedAt").value(hasItem(DEFAULT_UPDATED_AT.toString())));
    }
    

    @Test
    @Transactional
    public void getZonal() throws Exception {
        // Initialize the database
        zonalRepository.saveAndFlush(zonal);

        // Get the zonal
        restZonalMockMvc.perform(get("/api/zonals/{id}", zonal.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(zonal.getId().intValue()))
            .andExpect(jsonPath("$.zoneName").value(DEFAULT_ZONE_NAME.toString()))
            .andExpect(jsonPath("$.zoneAddress").value(DEFAULT_ZONE_ADDRESS.toString()))
            .andExpect(jsonPath("$.zoneIncharge").value(DEFAULT_ZONE_INCHARGE.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS))
            .andExpect(jsonPath("$.createdAt").value(DEFAULT_CREATED_AT.toString()))
            .andExpect(jsonPath("$.updatedAt").value(DEFAULT_UPDATED_AT.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingZonal() throws Exception {
        // Get the zonal
        restZonalMockMvc.perform(get("/api/zonals/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateZonal() throws Exception {
        // Initialize the database
        zonalRepository.saveAndFlush(zonal);

        int databaseSizeBeforeUpdate = zonalRepository.findAll().size();

        // Update the zonal
        Zonal updatedZonal = zonalRepository.findById(zonal.getId()).get();
        // Disconnect from session so that the updates on updatedZonal are not directly saved in db
        em.detach(updatedZonal);
        updatedZonal
            .zoneName(UPDATED_ZONE_NAME)
            .zoneAddress(UPDATED_ZONE_ADDRESS)
            .zoneIncharge(UPDATED_ZONE_INCHARGE)
            .status(UPDATED_STATUS)
            .createdAt(UPDATED_CREATED_AT)
            .updatedAt(UPDATED_UPDATED_AT);
        ZonalDTO zonalDTO = zonalMapper.toDto(updatedZonal);

        restZonalMockMvc.perform(put("/api/zonals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(zonalDTO)))
            .andExpect(status().isOk());

        // Validate the Zonal in the database
        List<Zonal> zonalList = zonalRepository.findAll();
        assertThat(zonalList).hasSize(databaseSizeBeforeUpdate);
        Zonal testZonal = zonalList.get(zonalList.size() - 1);
        assertThat(testZonal.getZoneName()).isEqualTo(UPDATED_ZONE_NAME);
        assertThat(testZonal.getZoneAddress()).isEqualTo(UPDATED_ZONE_ADDRESS);
        assertThat(testZonal.getZoneIncharge()).isEqualTo(UPDATED_ZONE_INCHARGE);
        assertThat(testZonal.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testZonal.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testZonal.getUpdatedAt()).isEqualTo(UPDATED_UPDATED_AT);
    }

    @Test
    @Transactional
    public void updateNonExistingZonal() throws Exception {
        int databaseSizeBeforeUpdate = zonalRepository.findAll().size();

        // Create the Zonal
        ZonalDTO zonalDTO = zonalMapper.toDto(zonal);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restZonalMockMvc.perform(put("/api/zonals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(zonalDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Zonal in the database
        List<Zonal> zonalList = zonalRepository.findAll();
        assertThat(zonalList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteZonal() throws Exception {
        // Initialize the database
        zonalRepository.saveAndFlush(zonal);

        int databaseSizeBeforeDelete = zonalRepository.findAll().size();

        // Get the zonal
        restZonalMockMvc.perform(delete("/api/zonals/{id}", zonal.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Zonal> zonalList = zonalRepository.findAll();
        assertThat(zonalList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Zonal.class);
        Zonal zonal1 = new Zonal();
        zonal1.setId(1L);
        Zonal zonal2 = new Zonal();
        zonal2.setId(zonal1.getId());
        assertThat(zonal1).isEqualTo(zonal2);
        zonal2.setId(2L);
        assertThat(zonal1).isNotEqualTo(zonal2);
        zonal1.setId(null);
        assertThat(zonal1).isNotEqualTo(zonal2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ZonalDTO.class);
        ZonalDTO zonalDTO1 = new ZonalDTO();
        zonalDTO1.setId(1L);
        ZonalDTO zonalDTO2 = new ZonalDTO();
        assertThat(zonalDTO1).isNotEqualTo(zonalDTO2);
        zonalDTO2.setId(zonalDTO1.getId());
        assertThat(zonalDTO1).isEqualTo(zonalDTO2);
        zonalDTO2.setId(2L);
        assertThat(zonalDTO1).isNotEqualTo(zonalDTO2);
        zonalDTO1.setId(null);
        assertThat(zonalDTO1).isNotEqualTo(zonalDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(zonalMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(zonalMapper.fromId(null)).isNull();
    }
}
