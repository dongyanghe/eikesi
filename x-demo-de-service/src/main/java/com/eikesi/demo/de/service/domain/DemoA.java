package com.eikesi.demo.de.service.domain;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.eikesi.demo.de.service.domain.enumeration.Language;

/**
 * 示例A
 * @author hedongyang
 * @version 2018-05-15
 */
@ApiModel(description = "示例A @author hedongyang @version 2018-05-15")
@Entity
@Table(name = "demo_a")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class DemoA implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * 名称
     */
    @NotNull
    @Size(min = 2, max = 14)
    @ApiModelProperty(value = "名称", required = true)
    @Column(name = "name", length = 14, nullable = false)
    private String name;

    /**
     * 状态 {0: '状态0', 1: '状态1'}
     */
    @NotNull
    @Size(min = 1, max = 2)
    @ApiModelProperty(value = "状态 {0: '状态0', 1: '状态1'}", required = true)
    @Column(name = "status", length = 2, nullable = false)
    private String status;

    /**
     * 整型
     */
    @NotNull
    @Min(value = 100)
    @ApiModelProperty(value = "整型", required = true)
    @Column(name = "jhi_number", nullable = false)
    private Integer number;

    /**
     * 小数
     */
    @NotNull
    @DecimalMin(value = "10")
    @ApiModelProperty(value = "小数", required = true)
    @Column(name = "big_decimal_num", precision=10, scale=2, nullable = false)
    private BigDecimal bigDecimalNum;

    /**
     * float
     */
    @NotNull
    @DecimalMin(value = "10")
    @ApiModelProperty(value = "float", required = true)
    @Column(name = "float_num", nullable = false)
    private Float floatNum;

    /**
     * double
     */
    @NotNull
    @DecimalMin(value = "10")
    @ApiModelProperty(value = "double", required = true)
    @Column(name = "double_num", nullable = false)
    private Double doubleNum;

    /**
     * Language
     */
    @ApiModelProperty(value = "Language")
    @Enumerated(EnumType.STRING)
    @Column(name = "language_enum")
    private Language languageEnum;

    /**
     * Blob
     */
    @NotNull
    @Size(min = 100)
    @ApiModelProperty(value = "Blob", required = true)
    @Lob
    @Column(name = "blob_num", nullable = false)
    private byte[] blobNum;

    @Column(name = "blob_num_content_type", nullable = false)
    private String blobNumContentType;

    /**
     * AnyBlob
     */
    @NotNull
    @Size(min = 10)
    @ApiModelProperty(value = "AnyBlob", required = true)
    @Lob
    @Column(name = "any_blob_num", nullable = false)
    private byte[] anyBlobNum;

    @Column(name = "any_blob_num_content_type", nullable = false)
    private String anyBlobNumContentType;

    /**
     * ImageBlob
     */
    @NotNull
    @Size(min = 10)
    @ApiModelProperty(value = "ImageBlob", required = true)
    @Lob
    @Column(name = "image_blob_num", nullable = false)
    private byte[] imageBlobNum;

    @Column(name = "image_blob_num_content_type", nullable = false)
    private String imageBlobNumContentType;

    /**
     * TextBlob
     */
    @NotNull
    @Size(min = 10)
    @ApiModelProperty(value = "TextBlob", required = true)
    @Lob
    @Column(name = "text_blob_num", nullable = false)
    private String textBlobNum;

    /**
     * Boolean
     */
    @NotNull
    @ApiModelProperty(value = "Boolean", required = true)
    @Column(name = "boolean_check", nullable = false)
    private Boolean booleanCheck;

    /**
     * LocalDate
     */
    @NotNull
    @ApiModelProperty(value = "LocalDate", required = true)
    @Column(name = "local_date_when", nullable = false)
    private LocalDate localDateWhen;

    /**
     * ZonedDateTime
     */
    @NotNull
    @ApiModelProperty(value = "ZonedDateTime", required = true)
    @Column(name = "zoned_date_time_when", nullable = false)
    private ZonedDateTime zonedDateTimeWhen;

    /**
     * Instant
     */
    @NotNull
    @ApiModelProperty(value = "Instant", required = true)
    @Column(name = "instant_type", nullable = false)
    private Instant instantType;

    @OneToOne
    @JoinColumn(unique = true)
    private DemoB demoB;

    @ManyToOne
    private DemoE demoE;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "demoa_demod",
               joinColumns = @JoinColumn(name="demoas_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="demods_id", referencedColumnName="id"))
    private Set<DemoD> demoDS = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public DemoA name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getStatus() {
        return status;
    }

    public DemoA status(String status) {
        this.status = status;
        return this;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getNumber() {
        return number;
    }

    public DemoA number(Integer number) {
        this.number = number;
        return this;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }

    public BigDecimal getBigDecimalNum() {
        return bigDecimalNum;
    }

    public DemoA bigDecimalNum(BigDecimal bigDecimalNum) {
        this.bigDecimalNum = bigDecimalNum;
        return this;
    }

    public void setBigDecimalNum(BigDecimal bigDecimalNum) {
        this.bigDecimalNum = bigDecimalNum;
    }

    public Float getFloatNum() {
        return floatNum;
    }

    public DemoA floatNum(Float floatNum) {
        this.floatNum = floatNum;
        return this;
    }

    public void setFloatNum(Float floatNum) {
        this.floatNum = floatNum;
    }

    public Double getDoubleNum() {
        return doubleNum;
    }

    public DemoA doubleNum(Double doubleNum) {
        this.doubleNum = doubleNum;
        return this;
    }

    public void setDoubleNum(Double doubleNum) {
        this.doubleNum = doubleNum;
    }

    public Language getLanguageEnum() {
        return languageEnum;
    }

    public DemoA languageEnum(Language languageEnum) {
        this.languageEnum = languageEnum;
        return this;
    }

    public void setLanguageEnum(Language languageEnum) {
        this.languageEnum = languageEnum;
    }

    public byte[] getBlobNum() {
        return blobNum;
    }

    public DemoA blobNum(byte[] blobNum) {
        this.blobNum = blobNum;
        return this;
    }

    public void setBlobNum(byte[] blobNum) {
        this.blobNum = blobNum;
    }

    public String getBlobNumContentType() {
        return blobNumContentType;
    }

    public DemoA blobNumContentType(String blobNumContentType) {
        this.blobNumContentType = blobNumContentType;
        return this;
    }

    public void setBlobNumContentType(String blobNumContentType) {
        this.blobNumContentType = blobNumContentType;
    }

    public byte[] getAnyBlobNum() {
        return anyBlobNum;
    }

    public DemoA anyBlobNum(byte[] anyBlobNum) {
        this.anyBlobNum = anyBlobNum;
        return this;
    }

    public void setAnyBlobNum(byte[] anyBlobNum) {
        this.anyBlobNum = anyBlobNum;
    }

    public String getAnyBlobNumContentType() {
        return anyBlobNumContentType;
    }

    public DemoA anyBlobNumContentType(String anyBlobNumContentType) {
        this.anyBlobNumContentType = anyBlobNumContentType;
        return this;
    }

    public void setAnyBlobNumContentType(String anyBlobNumContentType) {
        this.anyBlobNumContentType = anyBlobNumContentType;
    }

    public byte[] getImageBlobNum() {
        return imageBlobNum;
    }

    public DemoA imageBlobNum(byte[] imageBlobNum) {
        this.imageBlobNum = imageBlobNum;
        return this;
    }

    public void setImageBlobNum(byte[] imageBlobNum) {
        this.imageBlobNum = imageBlobNum;
    }

    public String getImageBlobNumContentType() {
        return imageBlobNumContentType;
    }

    public DemoA imageBlobNumContentType(String imageBlobNumContentType) {
        this.imageBlobNumContentType = imageBlobNumContentType;
        return this;
    }

    public void setImageBlobNumContentType(String imageBlobNumContentType) {
        this.imageBlobNumContentType = imageBlobNumContentType;
    }

    public String getTextBlobNum() {
        return textBlobNum;
    }

    public DemoA textBlobNum(String textBlobNum) {
        this.textBlobNum = textBlobNum;
        return this;
    }

    public void setTextBlobNum(String textBlobNum) {
        this.textBlobNum = textBlobNum;
    }

    public Boolean isBooleanCheck() {
        return booleanCheck;
    }

    public DemoA booleanCheck(Boolean booleanCheck) {
        this.booleanCheck = booleanCheck;
        return this;
    }

    public void setBooleanCheck(Boolean booleanCheck) {
        this.booleanCheck = booleanCheck;
    }

    public LocalDate getLocalDateWhen() {
        return localDateWhen;
    }

    public DemoA localDateWhen(LocalDate localDateWhen) {
        this.localDateWhen = localDateWhen;
        return this;
    }

    public void setLocalDateWhen(LocalDate localDateWhen) {
        this.localDateWhen = localDateWhen;
    }

    public ZonedDateTime getZonedDateTimeWhen() {
        return zonedDateTimeWhen;
    }

    public DemoA zonedDateTimeWhen(ZonedDateTime zonedDateTimeWhen) {
        this.zonedDateTimeWhen = zonedDateTimeWhen;
        return this;
    }

    public void setZonedDateTimeWhen(ZonedDateTime zonedDateTimeWhen) {
        this.zonedDateTimeWhen = zonedDateTimeWhen;
    }

    public Instant getInstantType() {
        return instantType;
    }

    public DemoA instantType(Instant instantType) {
        this.instantType = instantType;
        return this;
    }

    public void setInstantType(Instant instantType) {
        this.instantType = instantType;
    }

    public DemoB getDemoB() {
        return demoB;
    }

    public DemoA demoB(DemoB demoB) {
        this.demoB = demoB;
        return this;
    }

    public void setDemoB(DemoB demoB) {
        this.demoB = demoB;
    }

    public DemoE getDemoE() {
        return demoE;
    }

    public DemoA demoE(DemoE demoE) {
        this.demoE = demoE;
        return this;
    }

    public void setDemoE(DemoE demoE) {
        this.demoE = demoE;
    }

    public Set<DemoD> getDemoDS() {
        return demoDS;
    }

    public DemoA demoDS(Set<DemoD> demoDS) {
        this.demoDS = demoDS;
        return this;
    }

    public DemoA addDemoD(DemoD demoD) {
        this.demoDS.add(demoD);
        demoD.getDemoAS().add(this);
        return this;
    }

    public DemoA removeDemoD(DemoD demoD) {
        this.demoDS.remove(demoD);
        demoD.getDemoAS().remove(this);
        return this;
    }

    public void setDemoDS(Set<DemoD> demoDS) {
        this.demoDS = demoDS;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        DemoA demoA = (DemoA) o;
        if (demoA.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), demoA.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DemoA{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", status='" + getStatus() + "'" +
            ", number=" + getNumber() +
            ", bigDecimalNum=" + getBigDecimalNum() +
            ", floatNum=" + getFloatNum() +
            ", doubleNum=" + getDoubleNum() +
            ", languageEnum='" + getLanguageEnum() + "'" +
            ", blobNum='" + getBlobNum() + "'" +
            ", blobNumContentType='" + getBlobNumContentType() + "'" +
            ", anyBlobNum='" + getAnyBlobNum() + "'" +
            ", anyBlobNumContentType='" + getAnyBlobNumContentType() + "'" +
            ", imageBlobNum='" + getImageBlobNum() + "'" +
            ", imageBlobNumContentType='" + getImageBlobNumContentType() + "'" +
            ", textBlobNum='" + getTextBlobNum() + "'" +
            ", booleanCheck='" + isBooleanCheck() + "'" +
            ", localDateWhen='" + getLocalDateWhen() + "'" +
            ", zonedDateTimeWhen='" + getZonedDateTimeWhen() + "'" +
            ", instantType='" + getInstantType() + "'" +
            "}";
    }
}
