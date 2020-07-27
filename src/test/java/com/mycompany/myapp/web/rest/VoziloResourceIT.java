package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.Jh2App;
import com.mycompany.myapp.domain.Vozilo;
import com.mycompany.myapp.repository.VoziloRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link VoziloResource} REST controller.
 */
@SpringBootTest(classes = Jh2App.class)
@AutoConfigureMockMvc
@WithMockUser
public class VoziloResourceIT {

    private static final String DEFAULT_NAZIV = "AAAAAAAAAA";
    private static final String UPDATED_NAZIV = "BBBBBBBBBB";

    @Autowired
    private VoziloRepository voziloRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restVoziloMockMvc;

    private Vozilo vozilo;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Vozilo createEntity(EntityManager em) {
        Vozilo vozilo = new Vozilo()
            .naziv(DEFAULT_NAZIV);
        return vozilo;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Vozilo createUpdatedEntity(EntityManager em) {
        Vozilo vozilo = new Vozilo()
            .naziv(UPDATED_NAZIV);
        return vozilo;
    }

    @BeforeEach
    public void initTest() {
        vozilo = createEntity(em);
    }

    @Test
    @Transactional
    public void createVozilo() throws Exception {
        int databaseSizeBeforeCreate = voziloRepository.findAll().size();
        // Create the Vozilo
        restVoziloMockMvc.perform(post("/api/vozilos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(vozilo)))
            .andExpect(status().isCreated());

        // Validate the Vozilo in the database
        List<Vozilo> voziloList = voziloRepository.findAll();
        assertThat(voziloList).hasSize(databaseSizeBeforeCreate + 1);
        Vozilo testVozilo = voziloList.get(voziloList.size() - 1);
        assertThat(testVozilo.getNaziv()).isEqualTo(DEFAULT_NAZIV);
    }

    @Test
    @Transactional
    public void createVoziloWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = voziloRepository.findAll().size();

        // Create the Vozilo with an existing ID
        vozilo.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restVoziloMockMvc.perform(post("/api/vozilos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(vozilo)))
            .andExpect(status().isBadRequest());

        // Validate the Vozilo in the database
        List<Vozilo> voziloList = voziloRepository.findAll();
        assertThat(voziloList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNazivIsRequired() throws Exception {
        int databaseSizeBeforeTest = voziloRepository.findAll().size();
        // set the field null
        vozilo.setNaziv(null);

        // Create the Vozilo, which fails.


        restVoziloMockMvc.perform(post("/api/vozilos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(vozilo)))
            .andExpect(status().isBadRequest());

        List<Vozilo> voziloList = voziloRepository.findAll();
        assertThat(voziloList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllVozilos() throws Exception {
        // Initialize the database
        voziloRepository.saveAndFlush(vozilo);

        // Get all the voziloList
        restVoziloMockMvc.perform(get("/api/vozilos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(vozilo.getId().intValue())))
            .andExpect(jsonPath("$.[*].naziv").value(hasItem(DEFAULT_NAZIV)));
    }
    
    @Test
    @Transactional
    public void getVozilo() throws Exception {
        // Initialize the database
        voziloRepository.saveAndFlush(vozilo);

        // Get the vozilo
        restVoziloMockMvc.perform(get("/api/vozilos/{id}", vozilo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(vozilo.getId().intValue()))
            .andExpect(jsonPath("$.naziv").value(DEFAULT_NAZIV));
    }
    @Test
    @Transactional
    public void getNonExistingVozilo() throws Exception {
        // Get the vozilo
        restVoziloMockMvc.perform(get("/api/vozilos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateVozilo() throws Exception {
        // Initialize the database
        voziloRepository.saveAndFlush(vozilo);

        int databaseSizeBeforeUpdate = voziloRepository.findAll().size();

        // Update the vozilo
        Vozilo updatedVozilo = voziloRepository.findById(vozilo.getId()).get();
        // Disconnect from session so that the updates on updatedVozilo are not directly saved in db
        em.detach(updatedVozilo);
        updatedVozilo
            .naziv(UPDATED_NAZIV);

        restVoziloMockMvc.perform(put("/api/vozilos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedVozilo)))
            .andExpect(status().isOk());

        // Validate the Vozilo in the database
        List<Vozilo> voziloList = voziloRepository.findAll();
        assertThat(voziloList).hasSize(databaseSizeBeforeUpdate);
        Vozilo testVozilo = voziloList.get(voziloList.size() - 1);
        assertThat(testVozilo.getNaziv()).isEqualTo(UPDATED_NAZIV);
    }

    @Test
    @Transactional
    public void updateNonExistingVozilo() throws Exception {
        int databaseSizeBeforeUpdate = voziloRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restVoziloMockMvc.perform(put("/api/vozilos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(vozilo)))
            .andExpect(status().isBadRequest());

        // Validate the Vozilo in the database
        List<Vozilo> voziloList = voziloRepository.findAll();
        assertThat(voziloList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteVozilo() throws Exception {
        // Initialize the database
        voziloRepository.saveAndFlush(vozilo);

        int databaseSizeBeforeDelete = voziloRepository.findAll().size();

        // Delete the vozilo
        restVoziloMockMvc.perform(delete("/api/vozilos/{id}", vozilo.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Vozilo> voziloList = voziloRepository.findAll();
        assertThat(voziloList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
