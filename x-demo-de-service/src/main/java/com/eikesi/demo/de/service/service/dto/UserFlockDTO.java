package com.eikesi.demo.de.service.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the UserFlock entity.
 */
public class UserFlockDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(min = 2, max = 14)
    private String name;

    @NotNull
    @Size(max = 255)
    private String headImgUrl;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getHeadImgUrl() {
        return headImgUrl;
    }

    public void setHeadImgUrl(String headImgUrl) {
        this.headImgUrl = headImgUrl;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        UserFlockDTO userFlockDTO = (UserFlockDTO) o;
        if(userFlockDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), userFlockDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "UserFlockDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", headImgUrl='" + getHeadImgUrl() + "'" +
            "}";
    }
}
