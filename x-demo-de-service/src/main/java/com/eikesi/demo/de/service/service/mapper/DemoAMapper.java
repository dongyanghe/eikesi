package com.eikesi.demo.de.service.service.mapper;

import com.eikesi.demo.de.service.domain.*;
import com.eikesi.demo.de.service.service.dto.DemoADTO;

import org.mapstruct.*;

/**
 * Mapper for the entity DemoA and its DTO DemoADTO.
 */
@Mapper(componentModel = "spring", uses = {DemoBMapper.class, DemoEMapper.class, DemoDMapper.class})
public interface DemoAMapper extends EntityMapper<DemoADTO, DemoA> {

    @Mapping(source = "demoB.id", target = "demoBId")
    @Mapping(source = "demoB.name", target = "demoBName")
    @Mapping(source = "demoE.id", target = "demoEId")
    @Mapping(source = "demoE.name", target = "demoEName")
    DemoADTO toDto(DemoA demoA);

    @Mapping(source = "demoBId", target = "demoB")
    @Mapping(source = "demoEId", target = "demoE")
    DemoA toEntity(DemoADTO demoADTO);

    default DemoA fromId(Long id) {
        if (id == null) {
            return null;
        }
        DemoA demoA = new DemoA();
        demoA.setId(id);
        return demoA;
    }
}
