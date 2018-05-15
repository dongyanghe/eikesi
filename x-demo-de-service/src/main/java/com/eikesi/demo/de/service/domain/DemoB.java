package com.eikesi.demo.de.service.domain;

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
 * 示例B
 * @author hedongyang
 * @version 2018-05-15
 */
@ApiModel(description = "示例B @author hedongyang @version 2018-05-15")
@Entity
@Table(name = "demo_b")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class DemoB implements Serializable {

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

    @OneToMany(mappedBy = "demoB")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<DemoC> demoCS = new HashSet<>();

    @OneToOne(mappedBy = "demoB")
    @JsonIgnore
    private DemoA demoA;

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

    public DemoB name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getStatus() {
        return status;
    }

    public DemoB status(String status) {
        this.status = status;
        return this;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Set<DemoC> getDemoCS() {
        return demoCS;
    }

    public DemoB demoCS(Set<DemoC> demoCS) {
        this.demoCS = demoCS;
        return this;
    }

    public DemoB addDemoC(DemoC demoC) {
        this.demoCS.add(demoC);
        demoC.setDemoB(this);
        return this;
    }

    public DemoB removeDemoC(DemoC demoC) {
        this.demoCS.remove(demoC);
        demoC.setDemoB(null);
        return this;
    }

    public void setDemoCS(Set<DemoC> demoCS) {
        this.demoCS = demoCS;
    }

    public DemoA getDemoA() {
        return demoA;
    }

    public DemoB demoA(DemoA demoA) {
        this.demoA = demoA;
        return this;
    }

    public void setDemoA(DemoA demoA) {
        this.demoA = demoA;
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
        DemoB demoB = (DemoB) o;
        if (demoB.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), demoB.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DemoB{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
