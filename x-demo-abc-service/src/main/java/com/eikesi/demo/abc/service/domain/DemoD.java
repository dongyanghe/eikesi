package com.eikesi.demo.abc.service.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * 示例D
 * @author hedongyang
 * @version 2018-05-15
 */
@ApiModel(description = "示例D @author hedongyang @version 2018-05-15")
@Entity
@Table(name = "demo_d")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class DemoD implements Serializable {

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

    @OneToMany(mappedBy = "demoD")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<DemoE> demoES = new HashSet<>();

    @ManyToMany(mappedBy = "demoDS")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<DemoA> demoAS = new HashSet<>();

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

    public DemoD name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getStatus() {
        return status;
    }

    public DemoD status(String status) {
        this.status = status;
        return this;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Set<DemoE> getDemoES() {
        return demoES;
    }

    public DemoD demoES(Set<DemoE> demoES) {
        this.demoES = demoES;
        return this;
    }

    public DemoD addDemoE(DemoE demoE) {
        this.demoES.add(demoE);
        demoE.setDemoD(this);
        return this;
    }

    public DemoD removeDemoE(DemoE demoE) {
        this.demoES.remove(demoE);
        demoE.setDemoD(null);
        return this;
    }

    public void setDemoES(Set<DemoE> demoES) {
        this.demoES = demoES;
    }

    public Set<DemoA> getDemoAS() {
        return demoAS;
    }

    public DemoD demoAS(Set<DemoA> demoAS) {
        this.demoAS = demoAS;
        return this;
    }

    public DemoD addDemoA(DemoA demoA) {
        this.demoAS.add(demoA);
        demoA.getDemoDS().add(this);
        return this;
    }

    public DemoD removeDemoA(DemoA demoA) {
        this.demoAS.remove(demoA);
        demoA.getDemoDS().remove(this);
        return this;
    }

    public void setDemoAS(Set<DemoA> demoAS) {
        this.demoAS = demoAS;
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
        DemoD demoD = (DemoD) o;
        if (demoD.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), demoD.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DemoD{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
