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
 * 群组
 * @author hedongyang
 * @version 2018-05-14
 */
@ApiModel(description = "群组 @author hedongyang @version 2018-05-14")
@Entity
@Table(name = "user_flock")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class UserFlock implements Serializable {

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

    @NotNull
    @Size(max = 255)
    @Column(name = "head_img_url", length = 255, nullable = false)
    private String headImgUrl;

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

    public UserFlock name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getHeadImgUrl() {
        return headImgUrl;
    }

    public UserFlock headImgUrl(String headImgUrl) {
        this.headImgUrl = headImgUrl;
        return this;
    }

    public void setHeadImgUrl(String headImgUrl) {
        this.headImgUrl = headImgUrl;
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
        UserFlock userFlock = (UserFlock) o;
        if (userFlock.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), userFlock.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "UserFlock{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", headImgUrl='" + getHeadImgUrl() + "'" +
            "}";
    }
}
