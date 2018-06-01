package com.eikesi.im.gateway.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * 用户对话
 * @author hedongyang
 * @version 2018-05-15
 */
@ApiModel(description = "用户对话 @author hedongyang @version 2018-05-15")
@Entity
@Table(name = "dialogue")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Dialogue implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * 对话创建时间
     */
    @NotNull
    @ApiModelProperty(value = "对话创建时间", required = true)
    @Column(name = "created_date", nullable = false)
    private Instant createdDate;

    /**
     * 对话所属用户id
     */
    @NotNull
    @ApiModelProperty(value = "对话所属用户id", required = true)
    @Column(name = "created_id", nullable = false)
    private Long createdId;

    /**
     * 会话目标id（可能是用户,可能是群组）
     */
    @NotNull
    @ApiModelProperty(value = "会话目标id（可能是用户,可能是群组）", required = true)
    @Column(name = "target_id", nullable = false)
    private Long targetId;

    /**
     * 目标类型 {0: '用户', 1: '群组'}
     */
    @NotNull
    @Size(min = 1, max = 2)
    @ApiModelProperty(value = "目标类型 {0: '用户', 1: '群组'}", required = true)
    @Column(name = "target_type", length = 2, nullable = false)
    private String targetType;

    /**
     * 一个对话包涵多条当日流通消息
     */
    @ApiModelProperty(value = "一个对话包涵多条当日流通消息")
    @OneToMany(mappedBy = "dialogue")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<CurrentMessage> currentMessages = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getCreatedDate() {
        return createdDate;
    }

    public Dialogue createdDate(Instant createdDate) {
        this.createdDate = createdDate;
        return this;
    }

    public void setCreatedDate(Instant createdDate) {
        this.createdDate = createdDate;
    }

    public Long getCreatedId() {
        return createdId;
    }

    public Dialogue createdId(Long createdId) {
        this.createdId = createdId;
        return this;
    }

    public void setCreatedId(Long createdId) {
        this.createdId = createdId;
    }

    public Long getTargetId() {
        return targetId;
    }

    public Dialogue targetId(Long targetId) {
        this.targetId = targetId;
        return this;
    }

    public void setTargetId(Long targetId) {
        this.targetId = targetId;
    }

    public String getTargetType() {
        return targetType;
    }

    public Dialogue targetType(String targetType) {
        this.targetType = targetType;
        return this;
    }

    public void setTargetType(String targetType) {
        this.targetType = targetType;
    }

    public Set<CurrentMessage> getCurrentMessages() {
        return currentMessages;
    }

    public Dialogue currentMessages(Set<CurrentMessage> currentMessages) {
        this.currentMessages = currentMessages;
        return this;
    }

    public Dialogue addCurrentMessage(CurrentMessage currentMessage) {
        this.currentMessages.add(currentMessage);
        currentMessage.setDialogue(this);
        return this;
    }

    public Dialogue removeCurrentMessage(CurrentMessage currentMessage) {
        this.currentMessages.remove(currentMessage);
        currentMessage.setDialogue(null);
        return this;
    }

    public void setCurrentMessages(Set<CurrentMessage> currentMessages) {
        this.currentMessages = currentMessages;
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
        Dialogue dialogue = (Dialogue) o;
        if (dialogue.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), dialogue.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Dialogue{" +
            "id=" + getId() +
            ", createdDate='" + getCreatedDate() + "'" +
            ", createdId=" + getCreatedId() +
            ", targetId=" + getTargetId() +
            ", targetType='" + getTargetType() + "'" +
            "}";
    }
}
