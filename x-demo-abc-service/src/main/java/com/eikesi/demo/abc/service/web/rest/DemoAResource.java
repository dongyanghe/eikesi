package com.eikesi.demo.abc.service.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.eikesi.demo.abc.service.service.DemoAService;
import com.eikesi.demo.abc.service.web.rest.errors.BadRequestAlertException;
import com.eikesi.demo.abc.service.web.rest.util.HeaderUtil;
import com.eikesi.demo.abc.service.service.dto.DemoADTO;
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
 * REST controller for managing DemoA.
 */
@RestController
@RequestMapping("/api")
public class DemoAResource {

    private final Logger log = LoggerFactory.getLogger(DemoAResource.class);

    private static final String ENTITY_NAME = "demoA";

    private final DemoAService demoAService;

    public DemoAResource(DemoAService demoAService) {
        this.demoAService = demoAService;
    }

    /**
     * POST  /demo-as : Create a new demoA.
     *
     * @param demoADTO the demoADTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new demoADTO, or with status 400 (Bad Request) if the demoA has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/demo-as")
    @Timed
    public ResponseEntity<DemoADTO> createDemoA(@Valid @RequestBody DemoADTO demoADTO) throws URISyntaxException {
        log.debug("REST request to save DemoA : {}", demoADTO);
        if (demoADTO.getId() != null) {
            throw new BadRequestAlertException("A new demoA cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DemoADTO result = demoAService.save(demoADTO);
        return ResponseEntity.created(new URI("/api/demo-as/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /demo-as : Updates an existing demoA.
     *
     * @param demoADTO the demoADTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated demoADTO,
     * or with status 400 (Bad Request) if the demoADTO is not valid,
     * or with status 500 (Internal Server Error) if the demoADTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/demo-as")
    @Timed
    public ResponseEntity<DemoADTO> updateDemoA(@Valid @RequestBody DemoADTO demoADTO) throws URISyntaxException {
        log.debug("REST request to update DemoA : {}", demoADTO);
        if (demoADTO.getId() == null) {
            return createDemoA(demoADTO);
        }
        DemoADTO result = demoAService.save(demoADTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, demoADTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /demo-as : get all the demoAS.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of demoAS in body
     */
    @GetMapping("/demo-as")
    @Timed
    public List<DemoADTO> getAllDemoAS() {
        log.debug("REST request to get all DemoAS");
        return demoAService.findAll();
        }

    /**
     * GET  /demo-as/:id : get the "id" demoA.
     *
     * @param id the id of the demoADTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the demoADTO, or with status 404 (Not Found)
     */
    @GetMapping("/demo-as/{id}")
    @Timed
    public ResponseEntity<DemoADTO> getDemoA(@PathVariable Long id) {
        log.debug("REST request to get DemoA : {}", id);
        DemoADTO demoADTO = demoAService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(demoADTO));
    }

    /**
     * DELETE  /demo-as/:id : delete the "id" demoA.
     *
     * @param id the id of the demoADTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/demo-as/{id}")
    @Timed
    public ResponseEntity<Void> deleteDemoA(@PathVariable Long id) {
        log.debug("REST request to delete DemoA : {}", id);
        demoAService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
