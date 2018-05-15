package com.eikesi.demo.abc.service.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the DemoC entity.
 */
public class DemoCDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(min = 2, max = 14)
    private String name;

    @NotNull
    @Size(min = 1, max = 2)
    private String status;

    private Long demoBId;

    private String demoBName;

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

    public Long getDemoBId() {
        return demoBId;
    }

    public void setDemoBId(Long demoBId) {
        this.demoBId = demoBId;
    }

    public String getDemoBName() {
        return demoBName;
    }

    public void setDemoBName(String demoBName) {
        this.demoBName = demoBName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        DemoCDTO demoCDTO = (DemoCDTO) o;
        if(demoCDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), demoCDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DemoCDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
