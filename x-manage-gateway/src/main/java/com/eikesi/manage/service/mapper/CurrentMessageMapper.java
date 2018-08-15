package com.eikesi.manage.service.mapper;

import com.eikesi.manage.domain.*;
import com.eikesi.manage.service.dto.CurrentMessageDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity CurrentMessage and its DTO CurrentMessageDTO.
 */
@Mapper(componentModel = "spring", uses = {DialogueMapper.class})
public interface CurrentMessageMapper extends EntityMapper<CurrentMessageDTO, CurrentMessage> {

    @Mapping(source = "dialogue.id", target = "dialogueId")
    @Mapping(source = "dialogue.targetId", target = "dialogueTargetId")
    CurrentMessageDTO toDto(CurrentMessage currentMessage);

    @Mapping(source = "dialogueId", target = "dialogue")
    CurrentMessage toEntity(CurrentMessageDTO currentMessageDTO);

    default CurrentMessage fromId(Long id) {
        if (id == null) {
            return null;
        }
        CurrentMessage currentMessage = new CurrentMessage();
        currentMessage.setId(id);
        return currentMessage;
    }
}
