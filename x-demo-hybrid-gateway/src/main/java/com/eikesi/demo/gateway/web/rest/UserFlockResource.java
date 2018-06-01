package com.eikesi.demo.gateway.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.eikesi.demo.gateway.service.UserFlockService;
import com.eikesi.demo.gateway.web.rest.errors.BadRequestAlertException;
import com.eikesi.demo.gateway.web.rest.util.HeaderUtil;
import com.eikesi.demo.gateway.service.dto.UserFlockDTO;
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
 * REST controller for managing UserFlock.
 */
@RestController
@RequestMapping("/api")
public class UserFlockResource {

    private final Logger log = LoggerFactory.getLogger(UserFlockResource.class);

    private static final String ENTITY_NAME = "userFlock";

    private final UserFlockService userFlockService;

    public UserFlockResource(UserFlockService userFlockService) {
        this.userFlockService = userFlockService;
    }

    /**
     * POST  /user-flocks : Create a new userFlock.
     *
     * @param userFlockDTO the userFlockDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new userFlockDTO, or with status 400 (Bad Request) if the userFlock has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/user-flocks")
    @Timed
    public ResponseEntity<UserFlockDTO> createUserFlock(@Valid @RequestBody UserFlockDTO userFlockDTO) throws URISyntaxException {
        log.debug("REST request to save UserFlock : {}", userFlockDTO);
        if (userFlockDTO.getId() != null) {
            throw new BadRequestAlertException("A new userFlock cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UserFlockDTO result = userFlockService.save(userFlockDTO);
        return ResponseEntity.created(new URI("/api/user-flocks/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /user-flocks : Updates an existing userFlock.
     *
     * @param userFlockDTO the userFlockDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated userFlockDTO,
     * or with status 400 (Bad Request) if the userFlockDTO is not valid,
     * or with status 500 (Internal Server Error) if the userFlockDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/user-flocks")
    @Timed
    public ResponseEntity<UserFlockDTO> updateUserFlock(@Valid @RequestBody UserFlockDTO userFlockDTO) throws URISyntaxException {
        log.debug("REST request to update UserFlock : {}", userFlockDTO);
        if (userFlockDTO.getId() == null) {
            return createUserFlock(userFlockDTO);
        }
        UserFlockDTO result = userFlockService.save(userFlockDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, userFlockDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /user-flocks : get all the userFlocks.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of userFlocks in body
     */
    @GetMapping("/user-flocks")
    @Timed
    public List<UserFlockDTO> getAllUserFlocks() {
        log.debug("REST request to get all UserFlocks");
        return userFlockService.findAll();
        }

    /**
     * GET  /user-flocks/:id : get the "id" userFlock.
     *
     * @param id the id of the userFlockDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the userFlockDTO, or with status 404 (Not Found)
     */
    @GetMapping("/user-flocks/{id}")
    @Timed
    public ResponseEntity<UserFlockDTO> getUserFlock(@PathVariable Long id) {
        log.debug("REST request to get UserFlock : {}", id);
        UserFlockDTO userFlockDTO = userFlockService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(userFlockDTO));
    }

    /**
     * DELETE  /user-flocks/:id : delete the "id" userFlock.
     *
     * @param id the id of the userFlockDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/user-flocks/{id}")
    @Timed
    public ResponseEntity<Void> deleteUserFlock(@PathVariable Long id) {
        log.debug("REST request to delete UserFlock : {}", id);
        userFlockService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
