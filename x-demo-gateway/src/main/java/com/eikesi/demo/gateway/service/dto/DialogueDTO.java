package com.eikesi.demo.gateway.service.dto;

import java.time.Instant;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Dialogue entity.
 */
public class DialogueDTO implements Serializable {

    private Long id;

    @NotNull
    private Instant createdDate;

    @NotNull
    private Long createdId;

    @NotNull
    private Long targetId;

    @NotNull
    @Size(min = 1, max = 2)
    private String targetType;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Instant createdDate) {
        this.createdDate = createdDate;
    }

    public Long getCreatedId() {
        return createdId;
    }

    public void setCreatedId(Long createdId) {
        this.createdId = createdId;
    }

    public Long getTargetId() {
        return targetId;
    }

    public void setTargetId(Long targetId) {
        this.targetId = targetId;
    }

    public String getTargetType() {
        return targetType;
    }

    public void setTargetType(String targetType) {
        this.targetType = targetType;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        DialogueDTO dialogueDTO = (DialogueDTO) o;
        if (dialogueDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), dialogueDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DialogueDTO{" +
            "id=" + getId() +
            ", createdDate='" + getCreatedDate() + "'" +
            ", createdId=" + getCreatedId() +
            ", targetId=" + getTargetId() +
            ", targetType='" + getTargetType() + "'" +
            "}";
    }
}
