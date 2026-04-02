package com.micromentorship.mm.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.micromentorship.mm.dto.FeedbackRequest;
import com.micromentorship.mm.entity.Feedback;
import com.micromentorship.mm.service.FeedbackService;

import lombok.*;

@RestController
@RequestMapping("/feedback")
@RequiredArgsConstructor
public class FeedbackController {

	public FeedbackController(FeedbackService service) {
		super();
		this.service = service;
	}

	private final FeedbackService service;

	@PostMapping
	public String submitFeedback(@RequestBody FeedbackRequest request) {
		return service.submitFeedback(request);
	}
	
	@GetMapping("/mentor/{mentorId}")
	public List<Feedback> getMentorFeedback(@PathVariable Long mentorId){
		return service.getMentorFeedback(mentorId);
	}
	
}
