package com.micromentorship.mm.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.micromentorship.mm.dto.SkillRequest;
import com.micromentorship.mm.entity.Skill;
import com.micromentorship.mm.service.SkillService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/skills")
@RequiredArgsConstructor
public class SkillController {

	public SkillController(SkillService service) {
		super();
		this.service = service;
	}

	private final SkillService service;

	// create skill
	@PostMapping
	public Skill createSkill(@RequestParam String name) {
		return service.createSkill(name);
	}

	// get all skill
	@GetMapping
	public List<Skill> getAllSkills() {
		return service.getAllSkills();
	}

	// assign skill to mentor
	@PostMapping("/assign")
	public String assignSkills(@RequestBody SkillRequest request) {
		return service.assignSkills(request);
	}

}
