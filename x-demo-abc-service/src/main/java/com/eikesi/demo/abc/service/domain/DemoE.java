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
 * 示例E
 * @author hedongyang
 * @version 2018-05-15
 */
@ApiModel(description = "示例E @author hedongyang @version 2018-05-15")
@Entity
@Table(name = "demo_e")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class DemoE implements Serializable {

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

    @ManyToOne
    private DemoD demoD;

    @OneToMany(mappedBy = "demoE")
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

    public DemoE name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getStatus() {
        return status;
    }

    public DemoE status(String status) {
        this.status = status;
        return this;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public DemoD getDemoD() {
        return demoD;
    }

    public DemoE demoD(DemoD demoD) {
        this.demoD = demoD;
        return this;
    }

    public void setDemoD(DemoD demoD) {
        this.demoD = demoD;
    }

    public Set<DemoA> getDemoAS() {
        return demoAS;
    }

    public DemoE demoAS(Set<DemoA> demoAS) {
        this.demoAS = demoAS;
        return this;
    }

    public DemoE addDemoA(DemoA demoA) {
        this.demoAS.add(demoA);
        demoA.setDemoE(this);
        return this;
    }

    public DemoE removeDemoA(DemoA demoA) {
        this.demoAS.remove(demoA);
        demoA.setDemoE(null);
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
        DemoE demoE = (DemoE) o;
        if (demoE.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), demoE.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DemoE{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
