package com.eikesi.demo.abc.service.service.mapper;

import com.eikesi.demo.abc.service.domain.*;
import com.eikesi.demo.abc.service.service.dto.DemoBDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity DemoB and its DTO DemoBDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface DemoBMapper extends EntityMapper<DemoBDTO, DemoB> {


    @Mapping(target = "demoCS", ignore = true)
    @Mapping(target = "demoA", ignore = true)
    DemoB toEntity(DemoBDTO demoBDTO);

    default DemoB fromId(Long id) {
        if (id == null) {
            return null;
        }
        DemoB demoB = new DemoB();
        demoB.setId(id);
        return demoB;
    }
}
