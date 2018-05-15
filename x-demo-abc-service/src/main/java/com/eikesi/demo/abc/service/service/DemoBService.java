package com.eikesi.demo.abc.service.service;

import com.eikesi.demo.abc.service.domain.DemoB;
import com.eikesi.demo.abc.service.repository.DemoBRepository;
import com.eikesi.demo.abc.service.service.dto.DemoBDTO;
import com.eikesi.demo.abc.service.service.mapper.DemoBMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * Service Implementation for managing DemoB.
 */
@Service
@Transactional
public class DemoBService {

    private final Logger log = LoggerFactory.getLogger(DemoBService.class);

    private final DemoBRepository demoBRepository;

    private final DemoBMapper demoBMapper;

    public DemoBService(DemoBRepository demoBRepository, DemoBMapper demoBMapper) {
        this.demoBRepository = demoBRepository;
        this.demoBMapper = demoBMapper;
    }

    /**
     * Save a demoB.
     *
     * @param demoBDTO the entity to save
     * @return the persisted entity
     */
    public DemoBDTO save(DemoBDTO demoBDTO) {
        log.debug("Request to save DemoB : {}", demoBDTO);
        DemoB demoB = demoBMapper.toEntity(demoBDTO);
        demoB = demoBRepository.save(demoB);
        return demoBMapper.toDto(demoB);
    }

    /**
     * Get all the demoBS.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<DemoBDTO> findAll() {
        log.debug("Request to get all DemoBS");
        return demoBRepository.findAll().stream()
            .map(demoBMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     *  get all the demoBS where DemoA is null.
     *  @return the list of entities
     */
    @Transactional(readOnly = true) 
    public List<DemoBDTO> findAllWhereDemoAIsNull() {
        log.debug("Request to get all demoBS where DemoA is null");
        return StreamSupport
            .stream(demoBRepository.findAll().spliterator(), false)
            .filter(demoB -> demoB.getDemoA() == null)
            .map(demoBMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one demoB by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public DemoBDTO findOne(Long id) {
        log.debug("Request to get DemoB : {}", id);
        DemoB demoB = demoBRepository.findOne(id);
        return demoBMapper.toDto(demoB);
    }

    /**
     * Delete the demoB by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete DemoB : {}", id);
        demoBRepository.delete(id);
    }
}
