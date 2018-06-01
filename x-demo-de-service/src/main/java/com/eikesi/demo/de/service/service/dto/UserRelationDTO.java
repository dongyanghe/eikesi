package com.eikesi.demo.de.service.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the UserRelation entity.
 */
public class UserRelationDTO implements Serializable {

    private Long id;

    @Size(min = 2, max = 14)
    private String remarkName;

    @NotNull
    @Size(min = 1, max = 2)
    private String type;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRemarkName() {
        return remarkName;
    }

    public void setRemarkName(String remarkName) {
        this.remarkName = remarkName;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        UserRelationDTO userRelationDTO = (UserRelationDTO) o;
        if(userRelationDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), userRelationDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "UserRelationDTO{" +
            "id=" + getId() +
            ", remarkName='" + getRemarkName() + "'" +
            ", type='" + getType() + "'" +
            "}";
    }
}
