package com.eikesi.demo.de.service.service.mapper;

import com.eikesi.demo.de.service.domain.*;
import com.eikesi.demo.de.service.service.dto.DemoCDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity DemoC and its DTO DemoCDTO.
 */
@Mapper(componentModel = "spring", uses = {DemoBMapper.class})
public interface DemoCMapper extends EntityMapper<DemoCDTO, DemoC> {

    @Mapping(source = "demoB.id", target = "demoBId")
    @Mapping(source = "demoB.name", target = "demoBName")
    DemoCDTO toDto(DemoC demoC);

    @Mapping(source = "demoBId", target = "demoB")
    DemoC toEntity(DemoCDTO demoCDTO);

    default DemoC fromId(Long id) {
        if (id == null) {
            return null;
        }
        DemoC demoC = new DemoC();
        demoC.setId(id);
        return demoC;
    }
}
