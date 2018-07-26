package com.eikesi.manage.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * 客戶
 * @author hedongyang
 * @version 2018-05-15
 */
@ApiModel(description = "客戶 @author hedongyang @version 2018-05-15")
@Entity
@Table(name = "customer")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "customer")
public class Customer implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * 手机号
     */
    @NotNull
    @Size(min = 6, max = 18)
    @ApiModelProperty(value = "手机号", required = true)
    @Column(name = "mobile", length = 18, nullable = false)
    private String mobile;

    /**
     * 昵称
     */
    @NotNull
    @Size(min = 2, max = 14)
    @ApiModelProperty(value = "昵称", required = true)
    @Column(name = "first_name", length = 14, nullable = false)
    private String firstName;

    /**
     * 姓名
     */
    @NotNull
    @Size(min = 2, max = 14)
    @ApiModelProperty(value = "姓名", required = true)
    @Column(name = "last_name", length = 14, nullable = false)
    private String lastName;

    /**
     * 拼音首字母
     */
    @NotNull
    @Size(min = 1, max = 255)
    @ApiModelProperty(value = "拼音首字母", required = true)
    @Column(name = "py", length = 255, nullable = false)
    private String py;

    /**
     * 拼音全拼
     */
    @NotNull
    @Size(min = 1, max = 255)
    @ApiModelProperty(value = "拼音全拼", required = true)
    @Column(name = "pin_yin", length = 255, nullable = false)
    private String pinYin;

    /**
     * hash密码
     */
    @NotNull
    @Size(min = 1, max = 60)
    @ApiModelProperty(value = "hash密码", required = true)
    @Column(name = "password_hash", length = 60, nullable = false)
    private String passwordHash;

    /**
     * 邮箱
     */
    @Size(min = 1, max = 100)
    @ApiModelProperty(value = "邮箱")
    @Column(name = "email", length = 100)
    private String email;

    /**
     * 头像
     */
    @Size(min = 1, max = 100)
    @ApiModelProperty(value = "头像")
    @Column(name = "image_url", length = 100)
    private String imageUrl;

    /**
     * 状态 {0: '不可用', 1: '可用'}
     */
    @NotNull
    @ApiModelProperty(value = "状态 {0: '不可用', 1: '可用'}", required = true)
    @Column(name = "activated", nullable = false)
    private Boolean activated;

    /**
     * 语言key
     */
    @NotNull
    @Size(min = 1, max = 6)
    @ApiModelProperty(value = "语言key", required = true)
    @Column(name = "lang_key", length = 6, nullable = false)
    private String langKey;

    /**
     * 注册key
     */
    @NotNull
    @Size(min = 1, max = 20)
    @ApiModelProperty(value = "注册key", required = true)
    @Column(name = "activation_key", length = 20, nullable = false)
    private String activationKey;

    /**
     * 重置key
     */
    @NotNull
    @Size(min = 1, max = 20)
    @ApiModelProperty(value = "重置key", required = true)
    @Column(name = "reset_key", length = 20, nullable = false)
    private String resetKey;

    /**
     * 重置时间
     */
    @NotNull
    @ApiModelProperty(value = "重置时间", required = true)
    @Column(name = "reset_date", nullable = false)
    private Instant resetDate;

    /**
     * 后台创建则关联后台账号login,自己注册为空
     */
    @Size(min = 1, max = 50)
    @ApiModelProperty(value = "后台创建则关联后台账号login,自己注册为空")
    @Column(name = "created_by", length = 50)
    private String createdBy;

    /**
     * 创建时间
     */
    @NotNull
    @ApiModelProperty(value = "创建时间", required = true)
    @Column(name = "created_date", nullable = false)
    private Instant createdDate;

    /**
     * 一个客户关联多个客户关系
     */
    @ApiModelProperty(value = "一个客户关联多个客户关系")
    @OneToMany(mappedBy = "customer")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<CustomerRelation> customerRelations = new HashSet<>();

    /**
     * 一个客户关联多个群组关系
     */
    @ApiModelProperty(value = "一个客户关联多个群组关系")
    @OneToMany(mappedBy = "customer")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<FlockRelation> flockRelations = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMobile() {
        return mobile;
    }

    public Customer mobile(String mobile) {
        this.mobile = mobile;
        return this;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getFirstName() {
        return firstName;
    }

    public Customer firstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public Customer lastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPy() {
        return py;
    }

    public Customer py(String py) {
        this.py = py;
        return this;
    }

    public void setPy(String py) {
        this.py = py;
    }

    public String getPinYin() {
        return pinYin;
    }

    public Customer pinYin(String pinYin) {
        this.pinYin = pinYin;
        return this;
    }

    public void setPinYin(String pinYin) {
        this.pinYin = pinYin;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public Customer passwordHash(String passwordHash) {
        this.passwordHash = passwordHash;
        return this;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    public String getEmail() {
        return email;
    }

    public Customer email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public Customer imageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
        return this;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Boolean isActivated() {
        return activated;
    }

    public Customer activated(Boolean activated) {
        this.activated = activated;
        return this;
    }

    public void setActivated(Boolean activated) {
        this.activated = activated;
    }

    public String getLangKey() {
        return langKey;
    }

    public Customer langKey(String langKey) {
        this.langKey = langKey;
        return this;
    }

    public void setLangKey(String langKey) {
        this.langKey = langKey;
    }

    public String getActivationKey() {
        return activationKey;
    }

    public Customer activationKey(String activationKey) {
        this.activationKey = activationKey;
        return this;
    }

    public void setActivationKey(String activationKey) {
        this.activationKey = activationKey;
    }

    public String getResetKey() {
        return resetKey;
    }

    public Customer resetKey(String resetKey) {
        this.resetKey = resetKey;
        return this;
    }

    public void setResetKey(String resetKey) {
        this.resetKey = resetKey;
    }

    public Instant getResetDate() {
        return resetDate;
    }

    public Customer resetDate(Instant resetDate) {
        this.resetDate = resetDate;
        return this;
    }

    public void setResetDate(Instant resetDate) {
        this.resetDate = resetDate;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public Customer createdBy(String createdBy) {
        this.createdBy = createdBy;
        return this;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public Instant getCreatedDate() {
        return createdDate;
    }

    public Customer createdDate(Instant createdDate) {
        this.createdDate = createdDate;
        return this;
    }

    public void setCreatedDate(Instant createdDate) {
        this.createdDate = createdDate;
    }

    public Set<CustomerRelation> getCustomerRelations() {
        return customerRelations;
    }

    public Customer customerRelations(Set<CustomerRelation> customerRelations) {
        this.customerRelations = customerRelations;
        return this;
    }

    public Customer addCustomerRelation(CustomerRelation customerRelation) {
        this.customerRelations.add(customerRelation);
        customerRelation.setCustomer(this);
        return this;
    }

    public Customer removeCustomerRelation(CustomerRelation customerRelation) {
        this.customerRelations.remove(customerRelation);
        customerRelation.setCustomer(null);
        return this;
    }

    public void setCustomerRelations(Set<CustomerRelation> customerRelations) {
        this.customerRelations = customerRelations;
    }

    public Set<FlockRelation> getFlockRelations() {
        return flockRelations;
    }

    public Customer flockRelations(Set<FlockRelation> flockRelations) {
        this.flockRelations = flockRelations;
        return this;
    }

    public Customer addFlockRelation(FlockRelation flockRelation) {
        this.flockRelations.add(flockRelation);
        flockRelation.setCustomer(this);
        return this;
    }

    public Customer removeFlockRelation(FlockRelation flockRelation) {
        this.flockRelations.remove(flockRelation);
        flockRelation.setCustomer(null);
        return this;
    }

    public void setFlockRelations(Set<FlockRelation> flockRelations) {
        this.flockRelations = flockRelations;
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
        Customer customer = (Customer) o;
        if (customer.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), customer.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Customer{" +
            "id=" + getId() +
            ", mobile='" + getMobile() + "'" +
            ", firstName='" + getFirstName() + "'" +
            ", lastName='" + getLastName() + "'" +
            ", py='" + getPy() + "'" +
            ", pinYin='" + getPinYin() + "'" +
            ", passwordHash='" + getPasswordHash() + "'" +
            ", email='" + getEmail() + "'" +
            ", imageUrl='" + getImageUrl() + "'" +
            ", activated='" + isActivated() + "'" +
            ", langKey='" + getLangKey() + "'" +
            ", activationKey='" + getActivationKey() + "'" +
            ", resetKey='" + getResetKey() + "'" +
            ", resetDate='" + getResetDate() + "'" +
            ", createdBy='" + getCreatedBy() + "'" +
            ", createdDate='" + getCreatedDate() + "'" +
            "}";
    }
}
