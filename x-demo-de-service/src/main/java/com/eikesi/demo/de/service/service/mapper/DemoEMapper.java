package com.eikesi.demo.de.service.service.mapper;

import com.eikesi.demo.de.service.domain.*;
import com.eikesi.demo.de.service.service.dto.DemoEDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity DemoE and its DTO DemoEDTO.
 */
@Mapper(componentModel = "spring", uses = {DemoDMapper.class})
public interface DemoEMapper extends EntityMapper<DemoEDTO, DemoE> {

    @Mapping(source = "demoD.id", target = "demoDId")
    @Mapping(source = "demoD.name", target = "demoDName")
    DemoEDTO toDto(DemoE demoE);

    @Mapping(source = "demoDId", target = "demoD")
    @Mapping(target = "demoAS", ignore = true)
    DemoE toEntity(DemoEDTO demoEDTO);

    default DemoE fromId(Long id) {
        if (id == null) {
            return null;
        }
        DemoE demoE = new DemoE();
        demoE.setId(id);
        return demoE;
    }
}
