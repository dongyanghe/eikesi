package com.eikesi.manage.service.dto;

import java.time.Instant;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the HistoryMessage entity.
 */
public class HistoryMessageDTO implements Serializable {

    private Long id;

    @Size(min = 2, max = 14)
    private String content;

    @NotNull
    @Size(min = 1, max = 2)
    private String status;

    @NotNull
    private Instant createdDate;

    @NotNull
    private Long createdId;

    @NotNull
    private Instant targetDate;

    @NotNull
    private Long targetId;

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

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        HistoryMessageDTO historyMessageDTO = (HistoryMessageDTO) o;
        if (historyMessageDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), historyMessageDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "HistoryMessageDTO{" +
            "id=" + getId() +
            ", content='" + getContent() + "'" +
            ", status='" + getStatus() + "'" +
            ", createdDate='" + getCreatedDate() + "'" +
            ", createdId=" + getCreatedId() +
            ", targetDate='" + getTargetDate() + "'" +
            ", targetId=" + getTargetId() +
            "}";
    }
}
