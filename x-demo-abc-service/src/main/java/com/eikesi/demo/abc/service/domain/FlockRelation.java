package com.eikesi.demoABC.service.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * 群组关系(多对多)
 * @author hedongyang
 * @version 2018-05-18
 */
@ApiModel(description = "群组关系(多对多) @author hedongyang @version 2018-05-18")
@Entity
@Table(name = "flock_relation")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "flockrelation")
public class FlockRelation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * 群组备注,默认为群组昵称
     */
    @Size(min = 2, max = 14)
    @ApiModelProperty(value = "群组备注,默认为群组昵称")
    @Column(name = "remark_name", length = 14)
    private String remarkName;

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
     * 关系类型 {0: '黑名单', 1: '成员'}
     */
    @NotNull
    @Size(min = 1, max = 2)
    @ApiModelProperty(value = "关系类型 {0: '黑名单', 1: '成员'}", required = true)
    @Column(name = "jhi_type", length = 2, nullable = false)
    private String type;

    /**
     * 关系创建时间
     */
    @NotNull
    @ApiModelProperty(value = "关系创建时间", required = true)
    @Column(name = "created_date", nullable = false)
    private Instant createdDate;

    @ManyToOne
    @JsonIgnoreProperties("flockRelations")
    private Customer customer;

    @ManyToOne
    @JsonIgnoreProperties("flockRelations")
    private CustomerFlock customerFlock;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRemarkName() {
        return remarkName;
    }

    public FlockRelation remarkName(String remarkName) {
        this.remarkName = remarkName;
        return this;
    }

    public void setRemarkName(String remarkName) {
        this.remarkName = remarkName;
    }

    public String getPy() {
        return py;
    }

    public FlockRelation py(String py) {
        this.py = py;
        return this;
    }

    public void setPy(String py) {
        this.py = py;
    }

    public String getPinYin() {
        return pinYin;
    }

    public FlockRelation pinYin(String pinYin) {
        this.pinYin = pinYin;
        return this;
    }

    public void setPinYin(String pinYin) {
        this.pinYin = pinYin;
    }

    public String getType() {
        return type;
    }

    public FlockRelation type(String type) {
        this.type = type;
        return this;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Instant getCreatedDate() {
        return createdDate;
    }

    public FlockRelation createdDate(Instant createdDate) {
        this.createdDate = createdDate;
        return this;
    }

    public void setCreatedDate(Instant createdDate) {
        this.createdDate = createdDate;
    }

    public Customer getCustomer() {
        return customer;
    }

    public FlockRelation customer(Customer customer) {
        this.customer = customer;
        return this;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public CustomerFlock getCustomerFlock() {
        return customerFlock;
    }

    public FlockRelation customerFlock(CustomerFlock customerFlock) {
        this.customerFlock = customerFlock;
        return this;
    }

    public void setCustomerFlock(CustomerFlock customerFlock) {
        this.customerFlock = customerFlock;
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
        FlockRelation flockRelation = (FlockRelation) o;
        if (flockRelation.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), flockRelation.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "FlockRelation{" +
            "id=" + getId() +
            ", remarkName='" + getRemarkName() + "'" +
            ", py='" + getPy() + "'" +
            ", pinYin='" + getPinYin() + "'" +
            ", type='" + getType() + "'" +
            ", createdDate='" + getCreatedDate() + "'" +
            "}";
    }
}
