package com.micromentorship.mm.service;

import org.springframework.stereotype.Service;

import com.micromentorship.mm.dto.MentorProfileRequest;
import com.micromentorship.mm.entity.MentorProfile;
import com.micromentorship.mm.entity.User;
import com.micromentorship.mm.repository.MentorProfileRepository;
import com.micromentorship.mm.repository.UserRepository;

import lombok.*;

@Service
@RequiredArgsConstructor
public class MentorProfileService {

	public MentorProfileService(MentorProfileRepository repository, UserRepository userRepository) {
		super();
		this.repository = repository;
		this.userRepository = userRepository;
	}

	private final MentorProfileRepository repository;
	private final UserRepository userRepository;

	// create profile
	public MentorProfile createProfile(MentorProfileRequest request) {

		User user = userRepository.findById(request.getUserId())
				.orElseThrow(() -> new RuntimeException("User not found"));

		MentorProfile profile = repository.findByUser_Id(user.getId()).orElse(new MentorProfile());

		profile.setUser(user);
		profile.setName(request.getName());
		profile.setPhotoUrl(request.getPhotoUrl());
		profile.setExperienceYears(request.getExperienceYears());
		profile.setPricePerSession(request.getPricePerSession());
		profile.setBio(request.getBio());

		return repository.save(profile);
	}

	// get profile by userid
	public MentorProfile getByUserId(Long userId) {
		return repository.findByUser_Id(userId).orElseThrow(() -> new RuntimeException("Profile not found"));

	}

	public MentorProfile updateProfile(Long userId, MentorProfileRequest request) {

		MentorProfile profile = repository.findByUser_Id(userId)
				.orElseThrow(() -> new RuntimeException("Profile not found"));

		profile.setName(request.getName());
		profile.setPhotoUrl(request.getPhotoUrl());
		profile.setExperienceYears(request.getExperienceYears());
		profile.setPricePerSession(request.getPricePerSession());
		profile.setBio(request.getBio());

		return repository.save(profile);
	}

}
