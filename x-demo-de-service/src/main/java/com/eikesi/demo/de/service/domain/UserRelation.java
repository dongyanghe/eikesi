package com.eikesi.demo.de.service.domain;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * 用户关系表
 * @author hedongyang
 * @version 2018-05-14
 */
@ApiModel(description = "用户关系表 @author hedongyang @version 2018-05-14")
@Entity
@Table(name = "user_relation")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class UserRelation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * 用户名备注,默认为用户昵称
     */
    @Size(min = 2, max = 14)
    @ApiModelProperty(value = "用户名备注,默认为用户昵称")
    @Column(name = "remark_name", length = 14)
    private String remarkName;

    /**
     * 关系类型 {0: '黑名单', 1: '好友'}
     */
    @NotNull
    @Size(min = 1, max = 2)
    @ApiModelProperty(value = "关系类型 {0: '黑名单', 1: '好友'}", required = true)
    @Column(name = "jhi_type", length = 2, nullable = false)
    private String type;

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

    public UserRelation remarkName(String remarkName) {
        this.remarkName = remarkName;
        return this;
    }

    public void setRemarkName(String remarkName) {
        this.remarkName = remarkName;
    }

    public String getType() {
        return type;
    }

    public UserRelation type(String type) {
        this.type = type;
        return this;
    }

    public void setType(String type) {
        this.type = type;
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
        UserRelation userRelation = (UserRelation) o;
        if (userRelation.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), userRelation.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "UserRelation{" +
            "id=" + getId() +
            ", remarkName='" + getRemarkName() + "'" +
            ", type='" + getType() + "'" +
            "}";
    }
}
