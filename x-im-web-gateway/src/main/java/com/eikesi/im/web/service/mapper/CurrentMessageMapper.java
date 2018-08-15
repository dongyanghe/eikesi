package com.eikesi.im.web.service.mapper;

import com.eikesi.im.web.domain.*;
import com.eikesi.im.web.service.dto.CurrentMessageDTO;

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
