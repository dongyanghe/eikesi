package com.eikesi.demo.abc.service.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.eikesi.demo.abc.service.service.DemoCService;
import com.eikesi.demo.abc.service.web.rest.errors.BadRequestAlertException;
import com.eikesi.demo.abc.service.web.rest.util.HeaderUtil;
import com.eikesi.demo.abc.service.service.dto.DemoCDTO;
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
 * REST controller for managing DemoC.
 */
@RestController
@RequestMapping("/api")
public class DemoCResource {

    private final Logger log = LoggerFactory.getLogger(DemoCResource.class);

    private static final String ENTITY_NAME = "demoC";

    private final DemoCService demoCService;

    public DemoCResource(DemoCService demoCService) {
        this.demoCService = demoCService;
    }

    /**
     * POST  /demo-cs : Create a new demoC.
     *
     * @param demoCDTO the demoCDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new demoCDTO, or with status 400 (Bad Request) if the demoC has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/demo-cs")
    @Timed
    public ResponseEntity<DemoCDTO> createDemoC(@Valid @RequestBody DemoCDTO demoCDTO) throws URISyntaxException {
        log.debug("REST request to save DemoC : {}", demoCDTO);
        if (demoCDTO.getId() != null) {
            throw new BadRequestAlertException("A new demoC cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DemoCDTO result = demoCService.save(demoCDTO);
        return ResponseEntity.created(new URI("/api/demo-cs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /demo-cs : Updates an existing demoC.
     *
     * @param demoCDTO the demoCDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated demoCDTO,
     * or with status 400 (Bad Request) if the demoCDTO is not valid,
     * or with status 500 (Internal Server Error) if the demoCDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/demo-cs")
    @Timed
    public ResponseEntity<DemoCDTO> updateDemoC(@Valid @RequestBody DemoCDTO demoCDTO) throws URISyntaxException {
        log.debug("REST request to update DemoC : {}", demoCDTO);
        if (demoCDTO.getId() == null) {
            return createDemoC(demoCDTO);
        }
        DemoCDTO result = demoCService.save(demoCDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, demoCDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /demo-cs : get all the demoCS.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of demoCS in body
     */
    @GetMapping("/demo-cs")
    @Timed
    public List<DemoCDTO> getAllDemoCS() {
        log.debug("REST request to get all DemoCS");
        return demoCService.findAll();
        }

    /**
     * GET  /demo-cs/:id : get the "id" demoC.
     *
     * @param id the id of the demoCDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the demoCDTO, or with status 404 (Not Found)
     */
    @GetMapping("/demo-cs/{id}")
    @Timed
    public ResponseEntity<DemoCDTO> getDemoC(@PathVariable Long id) {
        log.debug("REST request to get DemoC : {}", id);
        DemoCDTO demoCDTO = demoCService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(demoCDTO));
    }

    /**
     * DELETE  /demo-cs/:id : delete the "id" demoC.
     *
     * @param id the id of the demoCDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/demo-cs/{id}")
    @Timed
    public ResponseEntity<Void> deleteDemoC(@PathVariable Long id) {
        log.debug("REST request to delete DemoC : {}", id);
        demoCService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
