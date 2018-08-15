package com.eikesi.manage.domain;

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
 * 用户历史消息
 * 按天从CurrentMessage获取存储,定期清除
 * @wait [2018-05-15 21:01:51]需改为NoSql存储
 * @author hedongyang
 * @version 2018-05-15
 */
@ApiModel(description = "用户历史消息 按天从CurrentMessage获取存储,定期清除 @wait [2018-05-15 21:01:51]需改为NoSql存储 @author hedongyang @version 2018-05-15")
@Entity
@Table(name = "history_message")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "historymessage")
public class HistoryMessage implements Serializable {

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
     * 消息状态,历史消息不能有未读 {0: '未读', 1: '已读', 2: '违规'}
     */
    @NotNull
    @Size(min = 1, max = 2)
    @ApiModelProperty(value = "消息状态,历史消息不能有未读 {0: '未读', 1: '已读', 2: '违规'}", required = true)
    @Column(name = "status", length = 2, nullable = false)
    private String status;

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

    public HistoryMessage content(String content) {
        this.content = content;
        return this;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getStatus() {
        return status;
    }

    public HistoryMessage status(String status) {
        this.status = status;
        return this;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Instant getCreatedDate() {
        return createdDate;
    }

    public HistoryMessage createdDate(Instant createdDate) {
        this.createdDate = createdDate;
        return this;
    }

    public void setCreatedDate(Instant createdDate) {
        this.createdDate = createdDate;
    }

    public Long getCreatedId() {
        return createdId;
    }

    public HistoryMessage createdId(Long createdId) {
        this.createdId = createdId;
        return this;
    }

    public void setCreatedId(Long createdId) {
        this.createdId = createdId;
    }

    public Instant getTargetDate() {
        return targetDate;
    }

    public HistoryMessage targetDate(Instant targetDate) {
        this.targetDate = targetDate;
        return this;
    }

    public void setTargetDate(Instant targetDate) {
        this.targetDate = targetDate;
    }

    public Long getTargetId() {
        return targetId;
    }

    public HistoryMessage targetId(Long targetId) {
        this.targetId = targetId;
        return this;
    }

    public void setTargetId(Long targetId) {
        this.targetId = targetId;
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
        HistoryMessage historyMessage = (HistoryMessage) o;
        if (historyMessage.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), historyMessage.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "HistoryMessage{" +
            "id=" + getId() +
            ", content='" + getContent() + "'" +
            ", status='" + getStatus() + "'" +
            ", createdDate='" + getCreatedDate() + "'" +
            ", createdId=" + getCreatedId() +
            ", targetDate='" + getTargetDate() + "'" +
            ", targetId=" + getTargetId() +
            "}";
    }
}
