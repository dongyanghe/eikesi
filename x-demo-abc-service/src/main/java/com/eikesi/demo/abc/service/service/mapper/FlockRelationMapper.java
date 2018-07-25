package com.eikesi.demoABC.service.service.mapper;

import com.eikesi.demoABC.service.domain.*;
import com.eikesi.demoABC.service.service.dto.FlockRelationDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity FlockRelation and its DTO FlockRelationDTO.
 */
@Mapper(componentModel = "spring", uses = {CustomerMapper.class, CustomerFlockMapper.class})
public interface FlockRelationMapper extends EntityMapper<FlockRelationDTO, FlockRelation> {

    @Mapping(source = "customer.id", target = "customerId")
    @Mapping(source = "customer.firstName", target = "customerFirstName")
    @Mapping(source = "customerFlock.id", target = "customerFlockId")
    @Mapping(source = "customerFlock.name", target = "customerFlockName")
    FlockRelationDTO toDto(FlockRelation flockRelation);

    @Mapping(source = "customerId", target = "customer")
    @Mapping(source = "customerFlockId", target = "customerFlock")
    FlockRelation toEntity(FlockRelationDTO flockRelationDTO);

    default FlockRelation fromId(Long id) {
        if (id == null) {
            return null;
        }
        FlockRelation flockRelation = new FlockRelation();
        flockRelation.setId(id);
        return flockRelation;
    }
}
