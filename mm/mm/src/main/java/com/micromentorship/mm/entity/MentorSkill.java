package com.micromentorship.mm.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "mentor_skills")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MentorSkill {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private Long mentorId;
	private Long skillId;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getMentorId() {
		return mentorId;
	}

	public void setMentorId(Long mentorId) {
		this.mentorId = mentorId;
	}

	public Long getSkillId() {
		return skillId;
	}

	public void setSkillId(Long skillId) {
		this.skillId = skillId;
	}

}
