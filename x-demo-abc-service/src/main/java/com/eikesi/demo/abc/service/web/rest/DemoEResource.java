package com.eikesi.demo.abc.service.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.eikesi.demo.abc.service.service.DemoEService;
import com.eikesi.demo.abc.service.web.rest.errors.BadRequestAlertException;
import com.eikesi.demo.abc.service.web.rest.util.HeaderUtil;
import com.eikesi.demo.abc.service.service.dto.DemoEDTO;
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
 * REST controller for managing DemoE.
 */
@RestController
@RequestMapping("/api")
public class DemoEResource {

    private final Logger log = LoggerFactory.getLogger(DemoEResource.class);

    private static final String ENTITY_NAME = "demoE";

    private final DemoEService demoEService;

    public DemoEResource(DemoEService demoEService) {
        this.demoEService = demoEService;
    }

    /**
     * POST  /demo-es : Create a new demoE.
     *
     * @param demoEDTO the demoEDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new demoEDTO, or with status 400 (Bad Request) if the demoE has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/demo-es")
    @Timed
    public ResponseEntity<DemoEDTO> createDemoE(@Valid @RequestBody DemoEDTO demoEDTO) throws URISyntaxException {
        log.debug("REST request to save DemoE : {}", demoEDTO);
        if (demoEDTO.getId() != null) {
            throw new BadRequestAlertException("A new demoE cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DemoEDTO result = demoEService.save(demoEDTO);
        return ResponseEntity.created(new URI("/api/demo-es/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /demo-es : Updates an existing demoE.
     *
     * @param demoEDTO the demoEDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated demoEDTO,
     * or with status 400 (Bad Request) if the demoEDTO is not valid,
     * or with status 500 (Internal Server Error) if the demoEDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/demo-es")
    @Timed
    public ResponseEntity<DemoEDTO> updateDemoE(@Valid @RequestBody DemoEDTO demoEDTO) throws URISyntaxException {
        log.debug("REST request to update DemoE : {}", demoEDTO);
        if (demoEDTO.getId() == null) {
            return createDemoE(demoEDTO);
        }
        DemoEDTO result = demoEService.save(demoEDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, demoEDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /demo-es : get all the demoES.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of demoES in body
     */
    @GetMapping("/demo-es")
    @Timed
    public List<DemoEDTO> getAllDemoES() {
        log.debug("REST request to get all DemoES");
        return demoEService.findAll();
        }

    /**
     * GET  /demo-es/:id : get the "id" demoE.
     *
     * @param id the id of the demoEDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the demoEDTO, or with status 404 (Not Found)
     */
    @GetMapping("/demo-es/{id}")
    @Timed
    public ResponseEntity<DemoEDTO> getDemoE(@PathVariable Long id) {
        log.debug("REST request to get DemoE : {}", id);
        DemoEDTO demoEDTO = demoEService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(demoEDTO));
    }

    /**
     * DELETE  /demo-es/:id : delete the "id" demoE.
     *
     * @param id the id of the demoEDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/demo-es/{id}")
    @Timed
    public ResponseEntity<Void> deleteDemoE(@PathVariable Long id) {
        log.debug("REST request to delete DemoE : {}", id);
        demoEService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
