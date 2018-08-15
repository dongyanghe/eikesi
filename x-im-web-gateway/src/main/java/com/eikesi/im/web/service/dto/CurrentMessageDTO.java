package com.eikesi.im.web.service.dto;

import java.time.Instant;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the CurrentMessage entity.
 */
public class CurrentMessageDTO implements Serializable {

    private Long id;

    @Size(min = 2, max = 14)
    private String content;

    @NotNull
    @Size(min = 1, max = 2)
    private String status;

    @NotNull
    @Size(min = 1, max = 2)
    private String type;

    @NotNull
    private Instant createdDate;

    @NotNull
    private Long createdId;

    @NotNull
    private Instant targetDate;

    @NotNull
    private Long targetId;

    private Long dialogueId;

    private String dialogueTargetId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
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

    public Instant getTargetDate() {
        return targetDate;
    }

    public void setTargetDate(Instant targetDate) {
        this.targetDate = targetDate;
    }

    public Long getTargetId() {
        return targetId;
    }

    public void setTargetId(Long targetId) {
        this.targetId = targetId;
    }

    public Long getDialogueId() {
        return dialogueId;
    }

    public void setDialogueId(Long dialogueId) {
        this.dialogueId = dialogueId;
    }

    public String getDialogueTargetId() {
        return dialogueTargetId;
    }

    public void setDialogueTargetId(String dialogueTargetId) {
        this.dialogueTargetId = dialogueTargetId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CurrentMessageDTO currentMessageDTO = (CurrentMessageDTO) o;
        if (currentMessageDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), currentMessageDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CurrentMessageDTO{" +
            "id=" + getId() +
            ", content='" + getContent() + "'" +
            ", status='" + getStatus() + "'" +
            ", type='" + getType() + "'" +
            ", createdDate='" + getCreatedDate() + "'" +
            ", createdId=" + getCreatedId() +
            ", targetDate='" + getTargetDate() + "'" +
            ", targetId=" + getTargetId() +
            ", dialogue=" + getDialogueId() +
            ", dialogue='" + getDialogueTargetId() + "'" +
            "}";
    }
}
