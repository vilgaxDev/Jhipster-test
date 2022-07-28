package com.niche.ng.service.dto;

import java.io.Serializable;
import io.github.jhipster.service.filter.BooleanFilter;
import io.github.jhipster.service.filter.DoubleFilter;
import io.github.jhipster.service.filter.Filter;
import io.github.jhipster.service.filter.FloatFilter;
import io.github.jhipster.service.filter.IntegerFilter;
import io.github.jhipster.service.filter.LongFilter;
import io.github.jhipster.service.filter.StringFilter;

import io.github.jhipster.service.filter.InstantFilter;




/**
 * Criteria class for the Zonal entity. This class is used in ZonalResource to
 * receive all the possible filtering options from the Http GET request parameters.
 * For example the following could be a valid requests:
 * <code> /zonals?id.greaterThan=5&amp;attr1.contains=something&amp;attr2.specified=false</code>
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class ZonalCriteria implements Serializable {
    private static final long serialVersionUID = 1L;


    private LongFilter id;

    private StringFilter zoneName;

    private StringFilter zoneAddress;

    private StringFilter zoneIncharge;

    private IntegerFilter status;

    private InstantFilter createdAt;

    private InstantFilter updatedAt;

    public ZonalCriteria() {
    }

    public LongFilter getId() {
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public StringFilter getZoneName() {
        return zoneName;
    }

    public void setZoneName(StringFilter zoneName) {
        this.zoneName = zoneName;
    }

    public StringFilter getZoneAddress() {
        return zoneAddress;
    }

    public void setZoneAddress(StringFilter zoneAddress) {
        this.zoneAddress = zoneAddress;
    }

    public StringFilter getZoneIncharge() {
        return zoneIncharge;
    }

    public void setZoneIncharge(StringFilter zoneIncharge) {
        this.zoneIncharge = zoneIncharge;
    }

    public IntegerFilter getStatus() {
        return status;
    }

    public void setStatus(IntegerFilter status) {
        this.status = status;
    }

    public InstantFilter getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(InstantFilter createdAt) {
        this.createdAt = createdAt;
    }

    public InstantFilter getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(InstantFilter updatedAt) {
        this.updatedAt = updatedAt;
    }

    @Override
    public String toString() {
        return "ZonalCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (zoneName != null ? "zoneName=" + zoneName + ", " : "") +
                (zoneAddress != null ? "zoneAddress=" + zoneAddress + ", " : "") +
                (zoneIncharge != null ? "zoneIncharge=" + zoneIncharge + ", " : "") +
                (status != null ? "status=" + status + ", " : "") +
                (createdAt != null ? "createdAt=" + createdAt + ", " : "") +
                (updatedAt != null ? "updatedAt=" + updatedAt + ", " : "") +
            "}";
    }

}
