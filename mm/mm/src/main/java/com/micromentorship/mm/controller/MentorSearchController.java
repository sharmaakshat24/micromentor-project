package com.micromentorship.mm.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.micromentorship.mm.dto.MentorSearchResponse;
import com.micromentorship.mm.service.MentorSearchService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/search")
@RequiredArgsConstructor
public class MentorSearchController {

	public MentorSearchController(MentorSearchService service) {
		super();
		this.service = service;
	}

	private final MentorSearchService service;

	@GetMapping("/mentors")
	public List<MentorSearchResponse> searchMentors(@RequestParam(required = false) Long skillId,
			@RequestParam(required = false) Double maxPrice, @RequestParam(required = false) Double minRating) {
		return service.searchMentors(skillId, maxPrice, minRating);
	}

}
