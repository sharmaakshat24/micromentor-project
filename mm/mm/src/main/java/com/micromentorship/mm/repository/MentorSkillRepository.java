package com.micromentorship.mm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.micromentorship.mm.entity.MentorSkill;

public interface MentorSkillRepository extends JpaRepository<MentorSkill, Long>{
	
	List<MentorSkill> findByMentorId(Long mentorId);
	
	void deleteByMentorId(Long mentorId);
	
	List<MentorSkill> findBySkillId(Long skillId);

}
