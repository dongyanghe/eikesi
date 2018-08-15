package com.eikesi.manage.service.mapper;

import com.eikesi.manage.domain.*;
import com.eikesi.manage.service.dto.CustomerFlockDTO;

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
