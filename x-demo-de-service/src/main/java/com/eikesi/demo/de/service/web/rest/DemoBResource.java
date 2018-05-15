package com.eikesi.demo.de.service.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.eikesi.demo.de.service.service.DemoBService;
import com.eikesi.demo.de.service.web.rest.errors.BadRequestAlertException;
import com.eikesi.demo.de.service.web.rest.util.HeaderUtil;
import com.eikesi.demo.de.service.service.dto.DemoBDTO;
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

/**
 * REST controller for managing DemoB.
 */
@RestController
@RequestMapping("/api")
public class DemoBResource {

    private final Logger log = LoggerFactory.getLogger(DemoBResource.class);

    private static final String ENTITY_NAME = "demoB";

    private final DemoBService demoBService;

    public DemoBResource(DemoBService demoBService) {
        this.demoBService = demoBService;
    }

    /**
     * POST  /demo-bs : Create a new demoB.
     *
     * @param demoBDTO the demoBDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new demoBDTO, or with status 400 (Bad Request) if the demoB has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/demo-bs")
    @Timed
    public ResponseEntity<DemoBDTO> createDemoB(@Valid @RequestBody DemoBDTO demoBDTO) throws URISyntaxException {
        log.debug("REST request to save DemoB : {}", demoBDTO);
        if (demoBDTO.getId() != null) {
            throw new BadRequestAlertException("A new demoB cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DemoBDTO result = demoBService.save(demoBDTO);
        return ResponseEntity.created(new URI("/api/demo-bs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /demo-bs : Updates an existing demoB.
     *
     * @param demoBDTO the demoBDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated demoBDTO,
     * or with status 400 (Bad Request) if the demoBDTO is not valid,
     * or with status 500 (Internal Server Error) if the demoBDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/demo-bs")
    @Timed
    public ResponseEntity<DemoBDTO> updateDemoB(@Valid @RequestBody DemoBDTO demoBDTO) throws URISyntaxException {
        log.debug("REST request to update DemoB : {}", demoBDTO);
        if (demoBDTO.getId() == null) {
            return createDemoB(demoBDTO);
        }
        DemoBDTO result = demoBService.save(demoBDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, demoBDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /demo-bs : get all the demoBS.
     *
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of demoBS in body
     */
    @GetMapping("/demo-bs")
    @Timed
    public List<DemoBDTO> getAllDemoBS(@RequestParam(required = false) String filter) {
        if ("demoa-is-null".equals(filter)) {
            log.debug("REST request to get all DemoBs where demoA is null");
            return demoBService.findAllWhereDemoAIsNull();
        }
        log.debug("REST request to get all DemoBS");
        return demoBService.findAll();
        }

    /**
     * GET  /demo-bs/:id : get the "id" demoB.
     *
     * @param id the id of the demoBDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the demoBDTO, or with status 404 (Not Found)
     */
    @GetMapping("/demo-bs/{id}")
    @Timed
    public ResponseEntity<DemoBDTO> getDemoB(@PathVariable Long id) {
        log.debug("REST request to get DemoB : {}", id);
        DemoBDTO demoBDTO = demoBService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(demoBDTO));
    }

    /**
     * DELETE  /demo-bs/:id : delete the "id" demoB.
     *
     * @param id the id of the demoBDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/demo-bs/{id}")
    @Timed
    public ResponseEntity<Void> deleteDemoB(@PathVariable Long id) {
        log.debug("REST request to delete DemoB : {}", id);
        demoBService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
