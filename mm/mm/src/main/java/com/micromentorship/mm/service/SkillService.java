package com.micromentorship.mm.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.micromentorship.mm.dto.SkillRequest;
import com.micromentorship.mm.entity.MentorSkill;
import com.micromentorship.mm.entity.Skill;
import com.micromentorship.mm.repository.MentorSkillRepository;
import com.micromentorship.mm.repository.SkillRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SkillService {

	public SkillService(SkillRepository skillRepository, MentorSkillRepository mentorSkillRepository) {
		super();
		this.skillRepository = skillRepository;
		this.mentorSkillRepository = mentorSkillRepository;
	}

	private final SkillRepository skillRepository;
	private final MentorSkillRepository mentorSkillRepository;

	// create skill
	public Skill createSkill(String name) {
		Skill skill = new Skill();
		skill.setName(name);

		return skillRepository.save(skill);
	}

	// get all skill
	public List<Skill> getAllSkills() {
		return skillRepository.findAll();
	}
	
	//assign skill to mentor
	public String assignSkills(SkillRequest request) {
		
		//remove old skills
		mentorSkillRepository.deleteByMentorId(request.getMentorId());
		
		//add new skills
		for(Long skillId : request.getSkillIds()) {
			
			MentorSkill ms = new MentorSkill();
			ms.setMentorId(request.getMentorId());
			ms.setSkillId(skillId);
			
			mentorSkillRepository.save(ms);
		}
		
		return "Skills Assigned Successfully";
		
	}
	
	
}
