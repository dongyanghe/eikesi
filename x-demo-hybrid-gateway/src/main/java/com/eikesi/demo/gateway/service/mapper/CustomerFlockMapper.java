package com.eikesi.demo.gateway.service.mapper;

import com.eikesi.demo.gateway.domain.*;
import com.eikesi.demo.gateway.service.dto.CustomerFlockDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity CustomerFlock and its DTO CustomerFlockDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface CustomerFlockMapper extends EntityMapper<CustomerFlockDTO, CustomerFlock> {


    @Mapping(target = "flockRelations", ignore = true)
    CustomerFlock toEntity(CustomerFlockDTO customerFlockDTO);

    default CustomerFlock fromId(Long id) {
        if (id == null) {
            return null;
        }
        CustomerFlock customerFlock = new CustomerFlock();
        customerFlock.setId(id);
        return customerFlock;
    }
}
