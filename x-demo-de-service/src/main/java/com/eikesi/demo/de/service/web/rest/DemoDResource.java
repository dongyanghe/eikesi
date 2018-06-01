package com.eikesi.demo.de.service.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.eikesi.demo.de.service.service.DemoDService;
import com.eikesi.demo.de.service.web.rest.errors.BadRequestAlertException;
import com.eikesi.demo.de.service.web.rest.util.HeaderUtil;
import com.eikesi.demo.de.service.service.dto.DemoDDTO;
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
 * REST controller for managing DemoD.
 */
@RestController
@RequestMapping("/api")
public class DemoDResource {

    private final Logger log = LoggerFactory.getLogger(DemoDResource.class);

    private static final String ENTITY_NAME = "demoD";

    private final DemoDService demoDService;

    public DemoDResource(DemoDService demoDService) {
        this.demoDService = demoDService;
    }

    /**
     * POST  /demo-ds : Create a new demoD.
     *
     * @param demoDDTO the demoDDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new demoDDTO, or with status 400 (Bad Request) if the demoD has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/demo-ds")
    @Timed
    public ResponseEntity<DemoDDTO> createDemoD(@Valid @RequestBody DemoDDTO demoDDTO) throws URISyntaxException {
        log.debug("REST request to save DemoD : {}", demoDDTO);
        if (demoDDTO.getId() != null) {
            throw new BadRequestAlertException("A new demoD cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DemoDDTO result = demoDService.save(demoDDTO);
        return ResponseEntity.created(new URI("/api/demo-ds/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /demo-ds : Updates an existing demoD.
     *
     * @param demoDDTO the demoDDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated demoDDTO,
     * or with status 400 (Bad Request) if the demoDDTO is not valid,
     * or with status 500 (Internal Server Error) if the demoDDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/demo-ds")
    @Timed
    public ResponseEntity<DemoDDTO> updateDemoD(@Valid @RequestBody DemoDDTO demoDDTO) throws URISyntaxException {
        log.debug("REST request to update DemoD : {}", demoDDTO);
        if (demoDDTO.getId() == null) {
            return createDemoD(demoDDTO);
        }
        DemoDDTO result = demoDService.save(demoDDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, demoDDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /demo-ds : get all the demoDS.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of demoDS in body
     */
    @GetMapping("/demo-ds")
    @Timed
    public List<DemoDDTO> getAllDemoDS() {
        log.debug("REST request to get all DemoDS");
        return demoDService.findAll();
        }

    /**
     * GET  /demo-ds/:id : get the "id" demoD.
     *
     * @param id the id of the demoDDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the demoDDTO, or with status 404 (Not Found)
     */
    @GetMapping("/demo-ds/{id}")
    @Timed
    public ResponseEntity<DemoDDTO> getDemoD(@PathVariable Long id) {
        log.debug("REST request to get DemoD : {}", id);
        DemoDDTO demoDDTO = demoDService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(demoDDTO));
    }

    /**
     * DELETE  /demo-ds/:id : delete the "id" demoD.
     *
     * @param id the id of the demoDDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/demo-ds/{id}")
    @Timed
    public ResponseEntity<Void> deleteDemoD(@PathVariable Long id) {
        log.debug("REST request to delete DemoD : {}", id);
        demoDService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
