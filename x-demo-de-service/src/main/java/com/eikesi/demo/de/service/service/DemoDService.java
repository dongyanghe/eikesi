package com.eikesi.demo.de.service.service;

import com.eikesi.demo.de.service.domain.DemoD;
import com.eikesi.demo.de.service.repository.DemoDRepository;
import com.eikesi.demo.de.service.service.dto.DemoDDTO;
import com.eikesi.demo.de.service.service.mapper.DemoDMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing DemoD.
 */
@Service
@Transactional
public class DemoDService {

    private final Logger log = LoggerFactory.getLogger(DemoDService.class);

    private final DemoDRepository demoDRepository;

    private final DemoDMapper demoDMapper;

    public DemoDService(DemoDRepository demoDRepository, DemoDMapper demoDMapper) {
        this.demoDRepository = demoDRepository;
        this.demoDMapper = demoDMapper;
    }

    /**
     * Save a demoD.
     *
     * @param demoDDTO the entity to save
     * @return the persisted entity
     */
    public DemoDDTO save(DemoDDTO demoDDTO) {
        log.debug("Request to save DemoD : {}", demoDDTO);
        DemoD demoD = demoDMapper.toEntity(demoDDTO);
        demoD = demoDRepository.save(demoD);
        return demoDMapper.toDto(demoD);
    }

    /**
     * Get all the demoDS.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<DemoDDTO> findAll() {
        log.debug("Request to get all DemoDS");
        return demoDRepository.findAll().stream()
            .map(demoDMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one demoD by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public DemoDDTO findOne(Long id) {
        log.debug("Request to get DemoD : {}", id);
        DemoD demoD = demoDRepository.findOne(id);
        return demoDMapper.toDto(demoD);
    }

    /**
     * Delete the demoD by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete DemoD : {}", id);
        demoDRepository.delete(id);
    }
}
