package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Vozilo;
import com.mycompany.myapp.repository.VoziloRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.Vozilo}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class VoziloResource {

    private final Logger log = LoggerFactory.getLogger(VoziloResource.class);

    private static final String ENTITY_NAME = "vozilo";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final VoziloRepository voziloRepository;

    public VoziloResource(VoziloRepository voziloRepository) {
        this.voziloRepository = voziloRepository;
    }

    /**
     * {@code POST  /vozilos} : Create a new vozilo.
     *
     * @param vozilo the vozilo to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new vozilo, or with status {@code 400 (Bad Request)} if the vozilo has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/vozilos")
    public ResponseEntity<Vozilo> createVozilo(@Valid @RequestBody Vozilo vozilo) throws URISyntaxException {
        log.debug("REST request to save Vozilo : {}", vozilo);
        if (vozilo.getId() != null) {
            throw new BadRequestAlertException("A new vozilo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Vozilo result = voziloRepository.save(vozilo);
        return ResponseEntity.created(new URI("/api/vozilos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /vozilos} : Updates an existing vozilo.
     *
     * @param vozilo the vozilo to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated vozilo,
     * or with status {@code 400 (Bad Request)} if the vozilo is not valid,
     * or with status {@code 500 (Internal Server Error)} if the vozilo couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/vozilos")
    public ResponseEntity<Vozilo> updateVozilo(@Valid @RequestBody Vozilo vozilo) throws URISyntaxException {
        log.debug("REST request to update Vozilo : {}", vozilo);
        if (vozilo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Vozilo result = voziloRepository.save(vozilo);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, vozilo.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /vozilos} : get all the vozilos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of vozilos in body.
     */
    @GetMapping("/vozilos")
    public List<Vozilo> getAllVozilos() {
        log.debug("REST request to get all Vozilos");
        return voziloRepository.findAll();
    }

    /**
     * {@code GET  /vozilos/:id} : get the "id" vozilo.
     *
     * @param id the id of the vozilo to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the vozilo, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/vozilos/{id}")
    public ResponseEntity<Vozilo> getVozilo(@PathVariable Long id) {
        log.debug("REST request to get Vozilo : {}", id);
        Optional<Vozilo> vozilo = voziloRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(vozilo);
    }

    /**
     * {@code DELETE  /vozilos/:id} : delete the "id" vozilo.
     *
     * @param id the id of the vozilo to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/vozilos/{id}")
    public ResponseEntity<Void> deleteVozilo(@PathVariable Long id) {
        log.debug("REST request to delete Vozilo : {}", id);
        voziloRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
