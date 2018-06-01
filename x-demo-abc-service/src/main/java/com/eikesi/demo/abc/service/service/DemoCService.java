package com.eikesi.demo.abc.service.service;

import com.eikesi.demo.abc.service.domain.DemoC;
import com.eikesi.demo.abc.service.repository.DemoCRepository;
import com.eikesi.demo.abc.service.service.dto.DemoCDTO;
import com.eikesi.demo.abc.service.service.mapper.DemoCMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing DemoC.
 */
@Service
@Transactional
public class DemoCService {

    private final Logger log = LoggerFactory.getLogger(DemoCService.class);

    private final DemoCRepository demoCRepository;

    private final DemoCMapper demoCMapper;

    public DemoCService(DemoCRepository demoCRepository, DemoCMapper demoCMapper) {
        this.demoCRepository = demoCRepository;
        this.demoCMapper = demoCMapper;
    }

    /**
     * Save a demoC.
     *
     * @param demoCDTO the entity to save
     * @return the persisted entity
     */
    public DemoCDTO save(DemoCDTO demoCDTO) {
        log.debug("Request to save DemoC : {}", demoCDTO);
        DemoC demoC = demoCMapper.toEntity(demoCDTO);
        demoC = demoCRepository.save(demoC);
        return demoCMapper.toDto(demoC);
    }

    /**
     * Get all the demoCS.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<DemoCDTO> findAll() {
        log.debug("Request to get all DemoCS");
        return demoCRepository.findAll().stream()
            .map(demoCMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one demoC by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public DemoCDTO findOne(Long id) {
        log.debug("Request to get DemoC : {}", id);
        DemoC demoC = demoCRepository.findOne(id);
        return demoCMapper.toDto(demoC);
    }

    /**
     * Delete the demoC by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete DemoC : {}", id);
        demoCRepository.delete(id);
    }
}
