package com.eikesi.manage.service.mapper;

import com.eikesi.manage.domain.*;
import com.eikesi.manage.service.dto.DialogueDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Dialogue and its DTO DialogueDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface DialogueMapper extends EntityMapper<DialogueDTO, Dialogue> {


    @Mapping(target = "currentMessages", ignore = true)
    Dialogue toEntity(DialogueDTO dialogueDTO);

    default Dialogue fromId(Long id) {
        if (id == null) {
            return null;
        }
        Dialogue dialogue = new Dialogue();
        dialogue.setId(id);
        return dialogue;
    }
}
