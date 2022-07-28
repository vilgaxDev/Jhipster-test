package com.niche.ng.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A Zonal.
 */
@Entity
@Table(name = "zonal")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Zonal implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "zone_name", nullable = false)
    private String zoneName;

    @Column(name = "zone_address")
    private String zoneAddress;

    @Column(name = "zone_incharge")
    private String zoneIncharge;

    @Column(name = "status")
    private Integer status;

    @Column(name = "created_at")
    private Instant createdAt;

    @Column(name = "updated_at")
    private Instant updatedAt;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getZoneName() {
        return zoneName;
    }

    public Zonal zoneName(String zoneName) {
        this.zoneName = zoneName;
        return this;
    }

    public void setZoneName(String zoneName) {
        this.zoneName = zoneName;
    }

    public String getZoneAddress() {
        return zoneAddress;
    }

    public Zonal zoneAddress(String zoneAddress) {
        this.zoneAddress = zoneAddress;
        return this;
    }

    public void setZoneAddress(String zoneAddress) {
        this.zoneAddress = zoneAddress;
    }

    public String getZoneIncharge() {
        return zoneIncharge;
    }

    public Zonal zoneIncharge(String zoneIncharge) {
        this.zoneIncharge = zoneIncharge;
        return this;
    }

    public void setZoneIncharge(String zoneIncharge) {
        this.zoneIncharge = zoneIncharge;
    }

    public Integer getStatus() {
        return status;
    }

    public Zonal status(Integer status) {
        this.status = status;
        return this;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public Zonal createdAt(Instant createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public Zonal updatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
        return this;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
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
        Zonal zonal = (Zonal) o;
        if (zonal.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), zonal.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Zonal{" +
            "id=" + getId() +
            ", zoneName='" + getZoneName() + "'" +
            ", zoneAddress='" + getZoneAddress() + "'" +
            ", zoneIncharge='" + getZoneIncharge() + "'" +
            ", status=" + getStatus() +
            ", createdAt='" + getCreatedAt() + "'" +
            ", updatedAt='" + getUpdatedAt() + "'" +
            "}";
    }
}
