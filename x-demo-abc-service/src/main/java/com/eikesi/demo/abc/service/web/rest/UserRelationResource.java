package com.eikesi.demo.abc.service.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.eikesi.demo.abc.service.service.UserRelationService;
import com.eikesi.demo.abc.service.web.rest.errors.BadRequestAlertException;
import com.eikesi.demo.abc.service.web.rest.util.HeaderUtil;
import com.eikesi.demo.abc.service.service.dto.UserRelationDTO;
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
 * REST controller for managing UserRelation.
 */
@RestController
@RequestMapping("/api")
public class UserRelationResource {

    private final Logger log = LoggerFactory.getLogger(UserRelationResource.class);

    private static final String ENTITY_NAME = "userRelation";

    private final UserRelationService userRelationService;

    public UserRelationResource(UserRelationService userRelationService) {
        this.userRelationService = userRelationService;
    }

    /**
     * POST  /user-relations : Create a new userRelation.
     *
     * @param userRelationDTO the userRelationDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new userRelationDTO, or with status 400 (Bad Request) if the userRelation has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/user-relations")
    @Timed
    public ResponseEntity<UserRelationDTO> createUserRelation(@Valid @RequestBody UserRelationDTO userRelationDTO) throws URISyntaxException {
        log.debug("REST request to save UserRelation : {}", userRelationDTO);
        if (userRelationDTO.getId() != null) {
            throw new BadRequestAlertException("A new userRelation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UserRelationDTO result = userRelationService.save(userRelationDTO);
        return ResponseEntity.created(new URI("/api/user-relations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /user-relations : Updates an existing userRelation.
     *
     * @param userRelationDTO the userRelationDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated userRelationDTO,
     * or with status 400 (Bad Request) if the userRelationDTO is not valid,
     * or with status 500 (Internal Server Error) if the userRelationDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/user-relations")
    @Timed
    public ResponseEntity<UserRelationDTO> updateUserRelation(@Valid @RequestBody UserRelationDTO userRelationDTO) throws URISyntaxException {
        log.debug("REST request to update UserRelation : {}", userRelationDTO);
        if (userRelationDTO.getId() == null) {
            return createUserRelation(userRelationDTO);
        }
        UserRelationDTO result = userRelationService.save(userRelationDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, userRelationDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /user-relations : get all the userRelations.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of userRelations in body
     */
    @GetMapping("/user-relations")
    @Timed
    public List<UserRelationDTO> getAllUserRelations() {
        log.debug("REST request to get all UserRelations");
        return userRelationService.findAll();
        }

    /**
     * GET  /user-relations/:id : get the "id" userRelation.
     *
     * @param id the id of the userRelationDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the userRelationDTO, or with status 404 (Not Found)
     */
    @GetMapping("/user-relations/{id}")
    @Timed
    public ResponseEntity<UserRelationDTO> getUserRelation(@PathVariable Long id) {
        log.debug("REST request to get UserRelation : {}", id);
        UserRelationDTO userRelationDTO = userRelationService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(userRelationDTO));
    }

    /**
     * DELETE  /user-relations/:id : delete the "id" userRelation.
     *
     * @param id the id of the userRelationDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/user-relations/{id}")
    @Timed
    public ResponseEntity<Void> deleteUserRelation(@PathVariable Long id) {
        log.debug("REST request to delete UserRelation : {}", id);
        userRelationService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
