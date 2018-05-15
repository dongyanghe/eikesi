package com.eikesi.demo.abc.service.domain;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * 示例C
 * @author hedongyang
 * @version 2018-05-15
 */
@ApiModel(description = "示例C @author hedongyang @version 2018-05-15")
@Entity
@Table(name = "demo_c")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class DemoC implements Serializable {

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
    private DemoB demoB;

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

    public DemoC name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getStatus() {
        return status;
    }

    public DemoC status(String status) {
        this.status = status;
        return this;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public DemoB getDemoB() {
        return demoB;
    }

    public DemoC demoB(DemoB demoB) {
        this.demoB = demoB;
        return this;
    }

    public void setDemoB(DemoB demoB) {
        this.demoB = demoB;
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
        DemoC demoC = (DemoC) o;
        if (demoC.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), demoC.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DemoC{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
