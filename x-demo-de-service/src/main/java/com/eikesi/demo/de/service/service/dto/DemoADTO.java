package com.eikesi.demo.de.service.service.dto;


import java.time.Instant;
import java.time.LocalDate;
import java.time.ZonedDateTime;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import javax.persistence.Lob;
import com.eikesi.demo.de.service.domain.enumeration.Language;

/**
 * A DTO for the DemoA entity.
 */
public class DemoADTO implements Serializable {

    private Long id;

    @NotNull
    @Size(min = 2, max = 14)
    private String name;

    @NotNull
    @Size(min = 1, max = 2)
    private String status;

    @NotNull
    @Min(value = 100)
    private Integer number;

    @NotNull
    @DecimalMin(value = "10")
    private BigDecimal bigDecimalNum;

    @NotNull
    @DecimalMin(value = "10")
    private Float floatNum;

    @NotNull
    @DecimalMin(value = "10")
    private Double doubleNum;

    private Language languageEnum;

    @NotNull
    @Size(min = 100)
    @Lob
    private byte[] blobNum;
    private String blobNumContentType;

    @NotNull
    @Size(min = 10)
    @Lob
    private byte[] anyBlobNum;
    private String anyBlobNumContentType;

    @NotNull
    @Size(min = 10)
    @Lob
    private byte[] imageBlobNum;
    private String imageBlobNumContentType;

    @NotNull
    @Size(min = 10)
    @Lob
    private String textBlobNum;

    @NotNull
    private Boolean booleanCheck;

    @NotNull
    private LocalDate localDateWhen;

    @NotNull
    private ZonedDateTime zonedDateTimeWhen;

    @NotNull
    private Instant instantType;

    private Long demoBId;

    private String demoBName;

    private Long demoEId;

    private String demoEName;

    private Set<DemoDDTO> demoDS = new HashSet<>();

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

    public Integer getNumber() {
        return number;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }

    public BigDecimal getBigDecimalNum() {
        return bigDecimalNum;
    }

    public void setBigDecimalNum(BigDecimal bigDecimalNum) {
        this.bigDecimalNum = bigDecimalNum;
    }

    public Float getFloatNum() {
        return floatNum;
    }

    public void setFloatNum(Float floatNum) {
        this.floatNum = floatNum;
    }

    public Double getDoubleNum() {
        return doubleNum;
    }

    public void setDoubleNum(Double doubleNum) {
        this.doubleNum = doubleNum;
    }

    public Language getLanguageEnum() {
        return languageEnum;
    }

    public void setLanguageEnum(Language languageEnum) {
        this.languageEnum = languageEnum;
    }

    public byte[] getBlobNum() {
        return blobNum;
    }

    public void setBlobNum(byte[] blobNum) {
        this.blobNum = blobNum;
    }

    public String getBlobNumContentType() {
        return blobNumContentType;
    }

    public void setBlobNumContentType(String blobNumContentType) {
        this.blobNumContentType = blobNumContentType;
    }

    public byte[] getAnyBlobNum() {
        return anyBlobNum;
    }

    public void setAnyBlobNum(byte[] anyBlobNum) {
        this.anyBlobNum = anyBlobNum;
    }

    public String getAnyBlobNumContentType() {
        return anyBlobNumContentType;
    }

    public void setAnyBlobNumContentType(String anyBlobNumContentType) {
        this.anyBlobNumContentType = anyBlobNumContentType;
    }

    public byte[] getImageBlobNum() {
        return imageBlobNum;
    }

    public void setImageBlobNum(byte[] imageBlobNum) {
        this.imageBlobNum = imageBlobNum;
    }

    public String getImageBlobNumContentType() {
        return imageBlobNumContentType;
    }

    public void setImageBlobNumContentType(String imageBlobNumContentType) {
        this.imageBlobNumContentType = imageBlobNumContentType;
    }

    public String getTextBlobNum() {
        return textBlobNum;
    }

    public void setTextBlobNum(String textBlobNum) {
        this.textBlobNum = textBlobNum;
    }

    public Boolean isBooleanCheck() {
        return booleanCheck;
    }

    public void setBooleanCheck(Boolean booleanCheck) {
        this.booleanCheck = booleanCheck;
    }

    public LocalDate getLocalDateWhen() {
        return localDateWhen;
    }

    public void setLocalDateWhen(LocalDate localDateWhen) {
        this.localDateWhen = localDateWhen;
    }

    public ZonedDateTime getZonedDateTimeWhen() {
        return zonedDateTimeWhen;
    }

    public void setZonedDateTimeWhen(ZonedDateTime zonedDateTimeWhen) {
        this.zonedDateTimeWhen = zonedDateTimeWhen;
    }

    public Instant getInstantType() {
        return instantType;
    }

    public void setInstantType(Instant instantType) {
        this.instantType = instantType;
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

    public Long getDemoEId() {
        return demoEId;
    }

    public void setDemoEId(Long demoEId) {
        this.demoEId = demoEId;
    }

    public String getDemoEName() {
        return demoEName;
    }

    public void setDemoEName(String demoEName) {
        this.demoEName = demoEName;
    }

    public Set<DemoDDTO> getDemoDS() {
        return demoDS;
    }

    public void setDemoDS(Set<DemoDDTO> demoDS) {
        this.demoDS = demoDS;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        DemoADTO demoADTO = (DemoADTO) o;
        if(demoADTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), demoADTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DemoADTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", status='" + getStatus() + "'" +
            ", number=" + getNumber() +
            ", bigDecimalNum=" + getBigDecimalNum() +
            ", floatNum=" + getFloatNum() +
            ", doubleNum=" + getDoubleNum() +
            ", languageEnum='" + getLanguageEnum() + "'" +
            ", blobNum='" + getBlobNum() + "'" +
            ", anyBlobNum='" + getAnyBlobNum() + "'" +
            ", imageBlobNum='" + getImageBlobNum() + "'" +
            ", textBlobNum='" + getTextBlobNum() + "'" +
            ", booleanCheck='" + isBooleanCheck() + "'" +
            ", localDateWhen='" + getLocalDateWhen() + "'" +
            ", zonedDateTimeWhen='" + getZonedDateTimeWhen() + "'" +
            ", instantType='" + getInstantType() + "'" +
            "}";
    }
}
