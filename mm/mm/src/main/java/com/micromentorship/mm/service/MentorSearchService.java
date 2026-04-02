package com.micromentorship.mm.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.micromentorship.mm.dto.MentorSearchResponse;
import com.micromentorship.mm.entity.MentorProfile;
import com.micromentorship.mm.entity.MentorSkill;
import com.micromentorship.mm.repository.MentorProfileRepository;
import com.micromentorship.mm.repository.MentorSkillRepository;

import lombok.*;

@Service
@RequiredArgsConstructor
public class MentorSearchService {

	public MentorSearchService(MentorSkillRepository skillRepository, MentorProfileRepository profileRepository) {
		super();
		this.skillRepository = skillRepository;
		this.profileRepository = profileRepository;
	}

	private final MentorSkillRepository skillRepository;
	private final MentorProfileRepository profileRepository;

	public List<MentorSearchResponse> searchMentors(Long skillId, Double maxPrice, Double minRating) {

		List<MentorProfile> mentors;

		if (skillId != null) {
			List<MentorSkill> mentorSkills = skillRepository.findBySkillId(skillId);
			List<Long> mentorIds = mentorSkills.stream().map(MentorSkill::getMentorId).collect(Collectors.toList());
			mentors = profileRepository.findByUser_IdIn(mentorIds);
		} else {
			mentors = profileRepository.findAll();
		}

		// apply filter
		return mentors.stream().filter(m -> maxPrice == null || m.getPricePerSession() <= maxPrice)
				.filter(m -> minRating == null || m.getRating() >= minRating)
				.map(m -> new MentorSearchResponse(m.getUser().getId(), m.getName(), m.getPhotoUrl(),
						m.getExperienceYears(), m.getPricePerSession(), m.getRating()))
				.collect(Collectors.toList());

	}

}
