package com.micromentorship.mm.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.micromentorship.mm.dto.MentorProfileRequest;
import com.micromentorship.mm.entity.MentorProfile;
import com.micromentorship.mm.service.MentorProfileService;

import lombok.*;

@RestController
@RequestMapping("/mentor/profile")
@RequiredArgsConstructor
public class MentorProfileController {

	public MentorProfileController(MentorProfileService service) {
		super();
		this.service = service;
	}

	private final MentorProfileService service;
	
	//create profile
	@PostMapping
	public ResponseEntity<MentorProfile> createProfile(@RequestBody MentorProfileRequest request) {
		MentorProfile profile = service.createProfile(request);
		return ResponseEntity.ok(profile);
	}
	
	//get profile
	@GetMapping("/{userId}")
	public ResponseEntity<MentorProfile> getProfile(@PathVariable Long userId) {
		return ResponseEntity.ok(service.getByUserId(userId));
	}
	
	//update profile
	@PutMapping("/{userId}")
	public ResponseEntity<MentorProfile> updateProfile(@PathVariable Long userId, @RequestBody MentorProfileRequest request) {
			MentorProfile profile = service.updateProfile(userId, request);
			return ResponseEntity.ok(profile);
	}
	
	
}
