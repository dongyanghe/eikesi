package com.eikesi.im.desktop.service.dto;

import java.time.Instant;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the CustomerRelation entity.
 */
public class CustomerRelationDTO implements Serializable {

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

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CustomerRelationDTO customerRelationDTO = (CustomerRelationDTO) o;
        if (customerRelationDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), customerRelationDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CustomerRelationDTO{" +
            "id=" + getId() +
            ", remarkName='" + getRemarkName() + "'" +
            ", py='" + getPy() + "'" +
            ", pinYin='" + getPinYin() + "'" +
            ", type='" + getType() + "'" +
            ", createdDate='" + getCreatedDate() + "'" +
            ", customer=" + getCustomerId() +
            ", customer='" + getCustomerFirstName() + "'" +
            "}";
    }
}
