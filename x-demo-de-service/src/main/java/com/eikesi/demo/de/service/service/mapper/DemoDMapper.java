package com.eikesi.demo.de.service.service.mapper;

import com.eikesi.demo.de.service.domain.*;
import com.eikesi.demo.de.service.service.dto.DemoDDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity DemoD and its DTO DemoDDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface DemoDMapper extends EntityMapper<DemoDDTO, DemoD> {


    @Mapping(target = "demoES", ignore = true)
    @Mapping(target = "demoAS", ignore = true)
    DemoD toEntity(DemoDDTO demoDDTO);

    default DemoD fromId(Long id) {
        if (id == null) {
            return null;
        }
        DemoD demoD = new DemoD();
        demoD.setId(id);
        return demoD;
    }
}
