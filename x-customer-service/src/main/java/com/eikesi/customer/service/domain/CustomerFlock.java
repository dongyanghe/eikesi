package com.eikesi.customer.service.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * 群组
 * @author hedongyang
 * @version 2018-05-14
 */
@ApiModel(description = "群组 @author hedongyang @version 2018-05-14")
@Entity
@Table(name = "customer_flock")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class CustomerFlock implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * 群组名称
     */
    @NotNull
    @Size(min = 2, max = 14)
    @ApiModelProperty(value = "群组名称", required = true)
    @Column(name = "name", length = 14, nullable = false)
    private String name;

    /**
     * 拼音首字母
     */
    @NotNull
    @Size(min = 1, max = 255)
    @ApiModelProperty(value = "拼音首字母", required = true)
    @Column(name = "py", length = 255, nullable = false)
    private String py;

    /**
     * 拼音全拼
     */
    @NotNull
    @Size(min = 1, max = 255)
    @ApiModelProperty(value = "拼音全拼", required = true)
    @Column(name = "pin_yin", length = 255, nullable = false)
    private String pinYin;

    /**
     * 头像
     */
    @NotNull
    @Size(max = 255)
    @ApiModelProperty(value = "头像", required = true)
    @Column(name = "image_url", length = 255, nullable = false)
    private String imageUrl;

    /**
     * 群组创建时间
     */
    @NotNull
    @ApiModelProperty(value = "群组创建时间", required = true)
    @Column(name = "created_date", nullable = false)
    private Instant createdDate;

    /**
     * 一个群组关联多个群组关系
     */
    @ApiModelProperty(value = "一个群组关联多个群组关系")
    @OneToMany(mappedBy = "customerFlock")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<FlockRelation> flockRelations = new HashSet<>();

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

    public CustomerFlock name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPy() {
        return py;
    }

    public CustomerFlock py(String py) {
        this.py = py;
        return this;
    }

    public void setPy(String py) {
        this.py = py;
    }

    public String getPinYin() {
        return pinYin;
    }

    public CustomerFlock pinYin(String pinYin) {
        this.pinYin = pinYin;
        return this;
    }

    public void setPinYin(String pinYin) {
        this.pinYin = pinYin;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public CustomerFlock imageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
        return this;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Instant getCreatedDate() {
        return createdDate;
    }

    public CustomerFlock createdDate(Instant createdDate) {
        this.createdDate = createdDate;
        return this;
    }

    public void setCreatedDate(Instant createdDate) {
        this.createdDate = createdDate;
    }

    public Set<FlockRelation> getFlockRelations() {
        return flockRelations;
    }

    public CustomerFlock flockRelations(Set<FlockRelation> flockRelations) {
        this.flockRelations = flockRelations;
        return this;
    }

    public CustomerFlock addFlockRelation(FlockRelation flockRelation) {
        this.flockRelations.add(flockRelation);
        flockRelation.setCustomerFlock(this);
        return this;
    }

    public CustomerFlock removeFlockRelation(FlockRelation flockRelation) {
        this.flockRelations.remove(flockRelation);
        flockRelation.setCustomerFlock(null);
        return this;
    }

    public void setFlockRelations(Set<FlockRelation> flockRelations) {
        this.flockRelations = flockRelations;
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
        CustomerFlock customerFlock = (CustomerFlock) o;
        if (customerFlock.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), customerFlock.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CustomerFlock{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", py='" + getPy() + "'" +
            ", pinYin='" + getPinYin() + "'" +
            ", imageUrl='" + getImageUrl() + "'" +
            ", createdDate='" + getCreatedDate() + "'" +
            "}";
    }
}
