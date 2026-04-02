package com.micromentorship.mm.dto;

import lombok.*;

@Data
public class SlotRequest {

	public SlotRequest() {
	}

	public SlotRequest(Long mentorId, String date, String startTime, String endTime) {
		super();
		this.mentorId = mentorId;
		this.date = date;
		this.startTime = startTime;
		this.endTime = endTime;
	}

	private Long mentorId;

	private String date;

	private String startTime;

	private String endTime;

	public Long getMentorId() {
		return mentorId;
	}

	public void setMentorId(Long mentorId) {
		this.mentorId = mentorId;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getStartTime() {
		return startTime;
	}

	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}

	public String getEndTime() {
		return endTime;
	}

	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}

}
