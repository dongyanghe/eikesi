package com.eikesi.im.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.eikesi.im.domain.FlockRelation;
import com.eikesi.im.repository.FlockRelationRepository;
import com.eikesi.im.web.rest.errors.BadRequestAlertException;
import com.eikesi.im.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing FlockRelation.
 */
@RestController
@RequestMapping("/api")
public class FlockRelationResource {

    private final Logger log = LoggerFactory.getLogger(FlockRelationResource.class);

    private static final String ENTITY_NAME = "flockRelation";

    private FlockRelationRepository flockRelationRepository;

    public FlockRelationResource(FlockRelationRepository flockRelationRepository) {
        this.flockRelationRepository = flockRelationRepository;
    }

    /**
     * POST  /flock-relations : Create a new flockRelation.
     *
     * @param flockRelation the flockRelation to create
     * @return the ResponseEntity with status 201 (Created) and with body the new flockRelation, or with status 400 (Bad Request) if the flockRelation has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/flock-relations")
    @Timed
    public ResponseEntity<FlockRelation> createFlockRelation(@Valid @RequestBody FlockRelation flockRelation) throws URISyntaxException {
        log.debug("REST request to save FlockRelation : {}", flockRelation);
        if (flockRelation.getId() != null) {
            throw new BadRequestAlertException("A new flockRelation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FlockRelation result = flockRelationRepository.save(flockRelation);
        return ResponseEntity.created(new URI("/api/flock-relations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /flock-relations : Updates an existing flockRelation.
     *
     * @param flockRelation the flockRelation to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated flockRelation,
     * or with status 400 (Bad Request) if the flockRelation is not valid,
     * or with status 500 (Internal Server Error) if the flockRelation couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/flock-relations")
    @Timed
    public ResponseEntity<FlockRelation> updateFlockRelation(@Valid @RequestBody FlockRelation flockRelation) throws URISyntaxException {
        log.debug("REST request to update FlockRelation : {}", flockRelation);
        if (flockRelation.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        FlockRelation result = flockRelationRepository.save(flockRelation);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, flockRelation.getId().toString()))
            .body(result);
    }

    /**
     * GET  /flock-relations : get all the flockRelations.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of flockRelations in body
     */
    @GetMapping("/flock-relations")
    @Timed
    public List<FlockRelation> getAllFlockRelations() {
        log.debug("REST request to get all FlockRelations");
        return flockRelationRepository.findAll();
    }

    /**
     * GET  /flock-relations/:id : get the "id" flockRelation.
     *
     * @param id the id of the flockRelation to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the flockRelation, or with status 404 (Not Found)
     */
    @GetMapping("/flock-relations/{id}")
    @Timed
    public ResponseEntity<FlockRelation> getFlockRelation(@PathVariable Long id) {
        log.debug("REST request to get FlockRelation : {}", id);
        Optional<FlockRelation> flockRelation = flockRelationRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(flockRelation);
    }

    /**
     * DELETE  /flock-relations/:id : delete the "id" flockRelation.
     *
     * @param id the id of the flockRelation to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/flock-relations/{id}")
    @Timed
    public ResponseEntity<Void> deleteFlockRelation(@PathVariable Long id) {
        log.debug("REST request to delete FlockRelation : {}", id);

        flockRelationRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
