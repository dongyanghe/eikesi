package com.eikesi.demo.gateway.service;

import com.eikesi.demo.gateway.domain.DemoE;
import com.eikesi.demo.gateway.repository.DemoERepository;
import com.eikesi.demo.gateway.service.dto.DemoEDTO;
import com.eikesi.demo.gateway.service.mapper.DemoEMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing DemoE.
 */
@Service
@Transactional
public class DemoEService {

    private final Logger log = LoggerFactory.getLogger(DemoEService.class);

    private final DemoERepository demoERepository;

    private final DemoEMapper demoEMapper;

    public DemoEService(DemoERepository demoERepository, DemoEMapper demoEMapper) {
        this.demoERepository = demoERepository;
        this.demoEMapper = demoEMapper;
    }

    /**
     * Save a demoE.
     *
     * @param demoEDTO the entity to save
     * @return the persisted entity
     */
    public DemoEDTO save(DemoEDTO demoEDTO) {
        log.debug("Request to save DemoE : {}", demoEDTO);
        DemoE demoE = demoEMapper.toEntity(demoEDTO);
        demoE = demoERepository.save(demoE);
        return demoEMapper.toDto(demoE);
    }

    /**
     * Get all the demoES.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<DemoEDTO> findAll() {
        log.debug("Request to get all DemoES");
        return demoERepository.findAll().stream()
            .map(demoEMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one demoE by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public DemoEDTO findOne(Long id) {
        log.debug("Request to get DemoE : {}", id);
        DemoE demoE = demoERepository.findOne(id);
        return demoEMapper.toDto(demoE);
    }

    /**
     * Delete the demoE by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete DemoE : {}", id);
        demoERepository.delete(id);
    }
}
