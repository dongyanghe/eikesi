package com.eikesi.demo.abc.service.service;

import com.eikesi.demo.abc.service.domain.DemoA;
import com.eikesi.demo.abc.service.repository.DemoARepository;
import com.eikesi.demo.abc.service.service.dto.DemoADTO;
import com.eikesi.demo.abc.service.service.mapper.DemoAMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing DemoA.
 */
@Service
@Transactional
public class DemoAService {

    private final Logger log = LoggerFactory.getLogger(DemoAService.class);

    private final DemoARepository demoARepository;

    private final DemoAMapper demoAMapper;

    public DemoAService(DemoARepository demoARepository, DemoAMapper demoAMapper) {
        this.demoARepository = demoARepository;
        this.demoAMapper = demoAMapper;
    }

    /**
     * Save a demoA.
     *
     * @param demoADTO the entity to save
     * @return the persisted entity
     */
    public DemoADTO save(DemoADTO demoADTO) {
        log.debug("Request to save DemoA : {}", demoADTO);
        DemoA demoA = demoAMapper.toEntity(demoADTO);
        demoA = demoARepository.save(demoA);
        return demoAMapper.toDto(demoA);
    }

    /**
     * Get all the demoAS.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<DemoADTO> findAll() {
        log.debug("Request to get all DemoAS");
        return demoARepository.findAllWithEagerRelationships().stream()
            .map(demoAMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one demoA by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public DemoADTO findOne(Long id) {
        log.debug("Request to get DemoA : {}", id);
        DemoA demoA = demoARepository.findOneWithEagerRelationships(id);
        return demoAMapper.toDto(demoA);
    }

    /**
     * Delete the demoA by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete DemoA : {}", id);
        demoARepository.delete(id);
    }
}
