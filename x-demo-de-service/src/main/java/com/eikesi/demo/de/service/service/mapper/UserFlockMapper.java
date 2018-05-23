package com.eikesi.demo.de.service.service.mapper;

import com.eikesi.demo.de.service.domain.*;
import com.eikesi.demo.de.service.service.dto.UserFlockDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity UserFlock and its DTO UserFlockDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface UserFlockMapper extends EntityMapper<UserFlockDTO, UserFlock> {



    default UserFlock fromId(Long id) {
        if (id == null) {
            return null;
        }
        UserFlock userFlock = new UserFlock();
        userFlock.setId(id);
        return userFlock;
    }
}