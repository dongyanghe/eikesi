package com.eikesi.im.desktop.domain;

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
 * 用户当天流通的消息
 * @wait 当当日无未读消息时转入HistoryMessage
 * @author hedongyang
 * @version 2018-05-15
 */
@ApiModel(description = "用户当天流通的消息 @wait 当当日无未读消息时转入HistoryMessage @author hedongyang @version 2018-05-15")
@Entity
@Table(name = "current_message")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "currentmessage")
public class CurrentMessage implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * 消息内容
     */
    @Size(min = 2, max = 14)
    @ApiModelProperty(value = "消息内容")
    @Column(name = "content", length = 14)
    private String content;

    /**
     * 消息状态 {0: '未读', 1: '已读', 2: '违规'}
     */
    @NotNull
    @Size(min = 1, max = 2)
    @ApiModelProperty(value = "消息状态 {0: '未读', 1: '已读', 2: '违规'}", required = true)
    @Column(name = "status", length = 2, nullable = false)
    private String status;

    /**
     * 数据类型 {0: '文本消息 + 表情 + 图片', 1: '纯表情', 2: '图片', 3: '文件'}
     */
    @NotNull
    @Size(min = 1, max = 2)
    @ApiModelProperty(value = "数据类型 {0: '文本消息 + 表情 + 图片', 1: '纯表情', 2: '图片', 3: '文件'}", required = true)
    @Column(name = "jhi_type", length = 2, nullable = false)
    private String type;

    /**
     * 消息创建时间
     */
    @NotNull
    @ApiModelProperty(value = "消息创建时间", required = true)
    @Column(name = "created_date", nullable = false)
    private Instant createdDate;

    /**
     * 发消息着id
     */
    @NotNull
    @ApiModelProperty(value = "发消息着id", required = true)
    @Column(name = "created_id", nullable = false)
    private Long createdId;

    /**
     * 接收消息时间
     */
    @NotNull
    @ApiModelProperty(value = "接收消息时间", required = true)
    @Column(name = "target_date", nullable = false)
    private Instant targetDate;

    /**
     * 接收消息着id
     */
    @NotNull
    @ApiModelProperty(value = "接收消息着id", required = true)
    @Column(name = "target_id", nullable = false)
    private Long targetId;

    @ManyToOne
    @JsonIgnoreProperties("currentMessages")
    private Dialogue dialogue;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public CurrentMessage content(String content) {
        this.content = content;
        return this;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getStatus() {
        return status;
    }

    public CurrentMessage status(String status) {
        this.status = status;
        return this;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getType() {
        return type;
    }

    public CurrentMessage type(String type) {
        this.type = type;
        return this;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Instant getCreatedDate() {
        return createdDate;
    }

    public CurrentMessage createdDate(Instant createdDate) {
        this.createdDate = createdDate;
        return this;
    }

    public void setCreatedDate(Instant createdDate) {
        this.createdDate = createdDate;
    }

    public Long getCreatedId() {
        return createdId;
    }

    public CurrentMessage createdId(Long createdId) {
        this.createdId = createdId;
        return this;
    }

    public void setCreatedId(Long createdId) {
        this.createdId = createdId;
    }

    public Instant getTargetDate() {
        return targetDate;
    }

    public CurrentMessage targetDate(Instant targetDate) {
        this.targetDate = targetDate;
        return this;
    }

    public void setTargetDate(Instant targetDate) {
        this.targetDate = targetDate;
    }

    public Long getTargetId() {
        return targetId;
    }

    public CurrentMessage targetId(Long targetId) {
        this.targetId = targetId;
        return this;
    }

    public void setTargetId(Long targetId) {
        this.targetId = targetId;
    }

    public Dialogue getDialogue() {
        return dialogue;
    }

    public CurrentMessage dialogue(Dialogue dialogue) {
        this.dialogue = dialogue;
        return this;
    }

    public void setDialogue(Dialogue dialogue) {
        this.dialogue = dialogue;
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
        CurrentMessage currentMessage = (CurrentMessage) o;
        if (currentMessage.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), currentMessage.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CurrentMessage{" +
            "id=" + getId() +
            ", content='" + getContent() + "'" +
            ", status='" + getStatus() + "'" +
            ", type='" + getType() + "'" +
            ", createdDate='" + getCreatedDate() + "'" +
            ", createdId=" + getCreatedId() +
            ", targetDate='" + getTargetDate() + "'" +
            ", targetId=" + getTargetId() +
            "}";
    }
}
