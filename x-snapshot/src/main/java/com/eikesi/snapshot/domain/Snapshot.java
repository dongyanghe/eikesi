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
 * A Snapshot.
 */
@Entity
@Table(name = "snapshot")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "snapshot")
public class Snapshot implements Serializable {

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

    @Column(name = "day_time")
    private Long dayTime;

    @Column(name = "week_time")
    private Long weekTime;

    @Column(name = "month_time")
    private Long monthTime;

    @Column(name = "year_time")
    private Long yearTime;

    @Column(name = "history_time")
    private Long historyTime;

    @Column(name = "file_path")
    private String filePath;

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

    public Snapshot domainName(String domainName) {
        this.domainName = domainName;
        return this;
    }

    public void setDomainName(String domainName) {
        this.domainName = domainName;
    }

    public String getDomainPath() {
        return domainPath;
    }

    public Snapshot domainPath(String domainPath) {
        this.domainPath = domainPath;
        return this;
    }

    public void setDomainPath(String domainPath) {
        this.domainPath = domainPath;
    }

    public String getCreateSource() {
        return createSource;
    }

    public Snapshot createSource(String createSource) {
        this.createSource = createSource;
        return this;
    }

    public void setCreateSource(String createSource) {
        this.createSource = createSource;
    }

    public Long getDayTime() {
        return dayTime;
    }

    public Snapshot dayTime(Long dayTime) {
        this.dayTime = dayTime;
        return this;
    }

    public void setDayTime(Long dayTime) {
        this.dayTime = dayTime;
    }

    public Long getWeekTime() {
        return weekTime;
    }

    public Snapshot weekTime(Long weekTime) {
        this.weekTime = weekTime;
        return this;
    }

    public void setWeekTime(Long weekTime) {
        this.weekTime = weekTime;
    }

    public Long getMonthTime() {
        return monthTime;
    }

    public Snapshot monthTime(Long monthTime) {
        this.monthTime = monthTime;
        return this;
    }

    public void setMonthTime(Long monthTime) {
        this.monthTime = monthTime;
    }

    public Long getYearTime() {
        return yearTime;
    }

    public Snapshot yearTime(Long yearTime) {
        this.yearTime = yearTime;
        return this;
    }

    public void setYearTime(Long yearTime) {
        this.yearTime = yearTime;
    }

    public Long getHistoryTime() {
        return historyTime;
    }

    public Snapshot historyTime(Long historyTime) {
        this.historyTime = historyTime;
        return this;
    }

    public void setHistoryTime(Long historyTime) {
        this.historyTime = historyTime;
    }

    public String getFilePath() {
        return filePath;
    }

    public Snapshot filePath(String filePath) {
        this.filePath = filePath;
        return this;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

    public String getState() {
        return state;
    }

    public Snapshot state(String state) {
        this.state = state;
        return this;
    }

    public void setState(String state) {
        this.state = state;
    }

    public Long getCreateBy() {
        return createBy;
    }

    public Snapshot createBy(Long createBy) {
        this.createBy = createBy;
        return this;
    }

    public void setCreateBy(Long createBy) {
        this.createBy = createBy;
    }

    public ZonedDateTime getCreateDate() {
        return createDate;
    }

    public Snapshot createDate(ZonedDateTime createDate) {
        this.createDate = createDate;
        return this;
    }

    public void setCreateDate(ZonedDateTime createDate) {
        this.createDate = createDate;
    }

    public Long getUpdateBy() {
        return updateBy;
    }

    public Snapshot updateBy(Long updateBy) {
        this.updateBy = updateBy;
        return this;
    }

    public void setUpdateBy(Long updateBy) {
        this.updateBy = updateBy;
    }

    public ZonedDateTime getUpdateDate() {
        return updateDate;
    }

    public Snapshot updateDate(ZonedDateTime updateDate) {
        this.updateDate = updateDate;
        return this;
    }

    public void setUpdateDate(ZonedDateTime updateDate) {
        this.updateDate = updateDate;
    }

    public String getRemarks() {
        return remarks;
    }

    public Snapshot remarks(String remarks) {
        this.remarks = remarks;
        return this;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public String getDelFlag() {
        return delFlag;
    }

    public Snapshot delFlag(String delFlag) {
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
        Snapshot snapshot = (Snapshot) o;
        if (snapshot.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), snapshot.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Snapshot{" +
            "id=" + getId() +
            ", domainName='" + getDomainName() + "'" +
            ", domainPath='" + getDomainPath() + "'" +
            ", createSource='" + getCreateSource() + "'" +
            ", dayTime='" + getDayTime() + "'" +
            ", weekTime='" + getWeekTime() + "'" +
            ", monthTime='" + getMonthTime() + "'" +
            ", yearTime='" + getYearTime() + "'" +
            ", historyTime='" + getHistoryTime() + "'" +
            ", filePath='" + getFilePath() + "'" +
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
