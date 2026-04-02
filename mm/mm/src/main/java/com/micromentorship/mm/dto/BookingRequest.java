package com.micromentorship.mm.dto;

import lombok.*;

@Data
public class BookingRequest {

	public BookingRequest() {
	}

	public BookingRequest(Long mentorId, Long menteeId, Long slotId) {
		super();
		this.mentorId = mentorId;
		this.menteeId = menteeId;
		this.slotId = slotId;
	}

	private Long mentorId;
	private Long menteeId;
	private Long slotId;

	public Long getMentorId() {
		return mentorId;
	}

	public void setMentorId(Long mentorId) {
		this.mentorId = mentorId;
	}

	public Long getMenteeId() {
		return menteeId;
	}

	public void setMenteeId(Long menteeId) {
		this.menteeId = menteeId;
	}

	public Long getSlotId() {
		return slotId;
	}

	public void setSlotId(Long slotId) {
		this.slotId = slotId;
	}

}
