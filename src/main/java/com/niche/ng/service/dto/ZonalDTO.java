package com.niche.ng.service.dto;

import java.time.Instant;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Zonal entity.
 */
public class ZonalDTO implements Serializable {

    private Long id;

    @NotNull(message = "Zone name cannot be blank.")
    private String zoneName;

    private String zoneAddress;

    private String zoneIncharge;

    private Integer status;

    private Instant createdAt;

    private Instant updatedAt;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getZoneName() {
        return zoneName;
    }

    public void setZoneName(String zoneName) {
        this.zoneName = zoneName;
    }

    public String getZoneAddress() {
        return zoneAddress;
    }

    public void setZoneAddress(String zoneAddress) {
        this.zoneAddress = zoneAddress;
    }

    public String getZoneIncharge() {
        return zoneIncharge;
    }

    public void setZoneIncharge(String zoneIncharge) {
        this.zoneIncharge = zoneIncharge;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ZonalDTO zonalDTO = (ZonalDTO) o;
        if (zonalDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), zonalDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ZonalDTO{" +
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
