package com.micromentorship.mm.dto;

import java.util.List;

import lombok.*;

@Data
public class SkillRequest {

	public SkillRequest() {
	}

	public SkillRequest(Long mentorId, List<Long> skillIds) {
		super();
		this.mentorId = mentorId;
		this.skillIds = skillIds;
	}

	private Long mentorId;

	private List<Long> skillIds;

	public Long getMentorId() {
		return mentorId;
	}

	public void setMentorId(Long mentorId) {
		this.mentorId = mentorId;
	}

	public List<Long> getSkillIds() {
		return skillIds;
	}

	public void setSkillIds(List<Long> skillIds) {
		this.skillIds = skillIds;
	}

}
