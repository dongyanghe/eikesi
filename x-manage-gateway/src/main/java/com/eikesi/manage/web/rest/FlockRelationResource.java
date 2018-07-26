package com.eikesi.manage.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.eikesi.manage.service.FlockRelationService;
import com.eikesi.manage.web.rest.errors.BadRequestAlertException;
import com.eikesi.manage.web.rest.util.HeaderUtil;
import com.eikesi.manage.service.dto.FlockRelationDTO;
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
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing FlockRelation.
 */
@RestController
@RequestMapping("/api")
public class FlockRelationResource {

    private final Logger log = LoggerFactory.getLogger(FlockRelationResource.class);

    private static final String ENTITY_NAME = "flockRelation";

    private final FlockRelationService flockRelationService;

    public FlockRelationResource(FlockRelationService flockRelationService) {
        this.flockRelationService = flockRelationService;
    }

    /**
     * POST  /flock-relations : Create a new flockRelation.
     *
     * @param flockRelationDTO the flockRelationDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new flockRelationDTO, or with status 400 (Bad Request) if the flockRelation has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/flock-relations")
    @Timed
    public ResponseEntity<FlockRelationDTO> createFlockRelation(@Valid @RequestBody FlockRelationDTO flockRelationDTO) throws URISyntaxException {
        log.debug("REST request to save FlockRelation : {}", flockRelationDTO);
        if (flockRelationDTO.getId() != null) {
            throw new BadRequestAlertException("A new flockRelation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FlockRelationDTO result = flockRelationService.save(flockRelationDTO);
        return ResponseEntity.created(new URI("/api/flock-relations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /flock-relations : Updates an existing flockRelation.
     *
     * @param flockRelationDTO the flockRelationDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated flockRelationDTO,
     * or with status 400 (Bad Request) if the flockRelationDTO is not valid,
     * or with status 500 (Internal Server Error) if the flockRelationDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/flock-relations")
    @Timed
    public ResponseEntity<FlockRelationDTO> updateFlockRelation(@Valid @RequestBody FlockRelationDTO flockRelationDTO) throws URISyntaxException {
        log.debug("REST request to update FlockRelation : {}", flockRelationDTO);
        if (flockRelationDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        FlockRelationDTO result = flockRelationService.save(flockRelationDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, flockRelationDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /flock-relations : get all the flockRelations.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of flockRelations in body
     */
    @GetMapping("/flock-relations")
    @Timed
    public List<FlockRelationDTO> getAllFlockRelations() {
        log.debug("REST request to get all FlockRelations");
        return flockRelationService.findAll();
    }

    /**
     * GET  /flock-relations/:id : get the "id" flockRelation.
     *
     * @param id the id of the flockRelationDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the flockRelationDTO, or with status 404 (Not Found)
     */
    @GetMapping("/flock-relations/{id}")
    @Timed
    public ResponseEntity<FlockRelationDTO> getFlockRelation(@PathVariable Long id) {
        log.debug("REST request to get FlockRelation : {}", id);
        Optional<FlockRelationDTO> flockRelationDTO = flockRelationService.findOne(id);
        return ResponseUtil.wrapOrNotFound(flockRelationDTO);
    }

    /**
     * DELETE  /flock-relations/:id : delete the "id" flockRelation.
     *
     * @param id the id of the flockRelationDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/flock-relations/{id}")
    @Timed
    public ResponseEntity<Void> deleteFlockRelation(@PathVariable Long id) {
        log.debug("REST request to delete FlockRelation : {}", id);
        flockRelationService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/flock-relations?query=:query : search for the flockRelation corresponding
     * to the query.
     *
     * @param query the query of the flockRelation search
     * @return the result of the search
     */
    @GetMapping("/_search/flock-relations")
    @Timed
    public List<FlockRelationDTO> searchFlockRelations(@RequestParam String query) {
        log.debug("REST request to search FlockRelations for query {}", query);
        return flockRelationService.search(query);
    }

}
