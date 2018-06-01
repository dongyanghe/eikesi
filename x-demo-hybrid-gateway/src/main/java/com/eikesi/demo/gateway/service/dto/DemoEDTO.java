package com.eikesi.demo.gateway.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the DemoE entity.
 */
public class DemoEDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(min = 2, max = 14)
    private String name;

    @NotNull
    @Size(min = 1, max = 2)
    private String status;

    private Long demoDId;

    private String demoDName;

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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Long getDemoDId() {
        return demoDId;
    }

    public void setDemoDId(Long demoDId) {
        this.demoDId = demoDId;
    }

    public String getDemoDName() {
        return demoDName;
    }

    public void setDemoDName(String demoDName) {
        this.demoDName = demoDName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        DemoEDTO demoEDTO = (DemoEDTO) o;
        if(demoEDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), demoEDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DemoEDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
