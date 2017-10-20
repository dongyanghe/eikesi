package com.eikesi.snapshot.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A SnapshotPending.
 */
@Entity
@Table(name = "snapshot_pending")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "snapshotpending")
public class SnapshotPending implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "domain_name", nullable = false)
    private String domainName;

    @Column(name = "domain_path")
    private String domainPath;

    @Column(name = "create_source")
    private String createSource;

    @Column(name = "priority")
    private String priority;

    @Column(name = "state")
    private String state;

    @Column(name = "create_by")
    private Long createBy;

    @Column(name = "create_date")
    private ZonedDateTime createDate;

    @Column(name = "update_by")
    private Long updateBy;

    @Column(name = "update_date")
    private ZonedDateTime updateDate;

    @Column(name = "remarks")
    private String remarks;

    @Column(name = "del_flag")
    private String delFlag;

    // jhipster-needle-entity-add-field - Jhipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDomainName() {
        return domainName;
    }

    public SnapshotPending domainName(String domainName) {
        this.domainName = domainName;
        return this;
    }

    public void setDomainName(String domainName) {
        this.domainName = domainName;
    }

    public String getDomainPath() {
        return domainPath;
    }

    public SnapshotPending domainPath(String domainPath) {
        this.domainPath = domainPath;
        return this;
    }

    public void setDomainPath(String domainPath) {
        this.domainPath = domainPath;
    }

    public String getCreateSource() {
        return createSource;
    }

    public SnapshotPending createSource(String createSource) {
        this.createSource = createSource;
        return this;
    }

    public void setCreateSource(String createSource) {
        this.createSource = createSource;
    }

    public String getPriority() {
        return priority;
    }

    public SnapshotPending priority(String priority) {
        this.priority = priority;
        return this;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public String getState() {
        return state;
    }

    public SnapshotPending state(String state) {
        this.state = state;
        return this;
    }

    public void setState(String state) {
        this.state = state;
    }

    public Long getCreateBy() {
        return createBy;
    }

    public SnapshotPending createBy(Long createBy) {
        this.createBy = createBy;
        return this;
    }

    public void setCreateBy(Long createBy) {
        this.createBy = createBy;
    }

    public ZonedDateTime getCreateDate() {
        return createDate;
    }

    public SnapshotPending createDate(ZonedDateTime createDate) {
        this.createDate = createDate;
        return this;
    }

    public void setCreateDate(ZonedDateTime createDate) {
        this.createDate = createDate;
    }

    public Long getUpdateBy() {
        return updateBy;
    }

    public SnapshotPending updateBy(Long updateBy) {
        this.updateBy = updateBy;
        return this;
    }

    public void setUpdateBy(Long updateBy) {
        this.updateBy = updateBy;
    }

    public ZonedDateTime getUpdateDate() {
        return updateDate;
    }

    public SnapshotPending updateDate(ZonedDateTime updateDate) {
        this.updateDate = updateDate;
        return this;
    }

    public void setUpdateDate(ZonedDateTime updateDate) {
        this.updateDate = updateDate;
    }

    public String getRemarks() {
        return remarks;
    }

    public SnapshotPending remarks(String remarks) {
        this.remarks = remarks;
        return this;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public String getDelFlag() {
        return delFlag;
    }

    public SnapshotPending delFlag(String delFlag) {
        this.delFlag = delFlag;
        return this;
    }

    public void setDelFlag(String delFlag) {
        this.delFlag = delFlag;
    }
    // jhipster-needle-entity-add-getters-setters - Jhipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        SnapshotPending snapshotPending = (SnapshotPending) o;
        if (snapshotPending.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), snapshotPending.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SnapshotPending{" +
            "id=" + getId() +
            ", domainName='" + getDomainName() + "'" +
            ", domainPath='" + getDomainPath() + "'" +
            ", createSource='" + getCreateSource() + "'" +
            ", priority='" + getPriority() + "'" +
            ", state='" + getState() + "'" +
            ", createBy='" + getCreateBy() + "'" +
            ", createDate='" + getCreateDate() + "'" +
            ", updateBy='" + getUpdateBy() + "'" +
            ", updateDate='" + getUpdateDate() + "'" +
            ", remarks='" + getRemarks() + "'" +
            ", delFlag='" + getDelFlag() + "'" +
            "}";
    }
}
