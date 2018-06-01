package com.eikesi.demo.abc.service.service.mapper;

import com.eikesi.demo.abc.service.domain.*;
import com.eikesi.demo.abc.service.service.dto.UserRelationDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity UserRelation and its DTO UserRelationDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface UserRelationMapper extends EntityMapper<UserRelationDTO, UserRelation> {



    default UserRelation fromId(Long id) {
        if (id == null) {
            return null;
        }
        UserRelation userRelation = new UserRelation();
        userRelation.setId(id);
        return userRelation;
    }
}
