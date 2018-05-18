package com.eikesi.demo.gateway.service.dto;


import java.time.Instant;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the FlockRelation entity.
 */
public class FlockRelationDTO implements Serializable {

    private Long id;

    @Size(min = 2, max = 14)
    private String remarkName;

    @NotNull
    @Size(min = 1, max = 255)
    private String py;

    @NotNull
    @Size(min = 1, max = 255)
    private String pinYin;

    @NotNull
    @Size(min = 1, max = 2)
    private String type;

    @NotNull
    private Instant createdDate;

    private Long customerId;

    private String customerFirstName;

    private Long customerFlockId;

    private String customerFlockName;

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

    public String getPy() {
        return py;
    }

    public void setPy(String py) {
        this.py = py;
    }

    public String getPinYin() {
        return pinYin;
    }

    public void setPinYin(String pinYin) {
        this.pinYin = pinYin;
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

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public String getCustomerFirstName() {
        return customerFirstName;
    }

    public void setCustomerFirstName(String customerFirstName) {
        this.customerFirstName = customerFirstName;
    }

    public Long getCustomerFlockId() {
        return customerFlockId;
    }

    public void setCustomerFlockId(Long customerFlockId) {
        this.customerFlockId = customerFlockId;
    }

    public String getCustomerFlockName() {
        return customerFlockName;
    }

    public void setCustomerFlockName(String customerFlockName) {
        this.customerFlockName = customerFlockName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        FlockRelationDTO flockRelationDTO = (FlockRelationDTO) o;
        if(flockRelationDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), flockRelationDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "FlockRelationDTO{" +
            "id=" + getId() +
            ", remarkName='" + getRemarkName() + "'" +
            ", py='" + getPy() + "'" +
            ", pinYin='" + getPinYin() + "'" +
            ", type='" + getType() + "'" +
            ", createdDate='" + getCreatedDate() + "'" +
            "}";
    }
}
