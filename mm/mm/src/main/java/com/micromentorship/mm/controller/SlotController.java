package com.micromentorship.mm.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.micromentorship.mm.dto.SlotRequest;
import com.micromentorship.mm.entity.AvailabilitySlot;
import com.micromentorship.mm.service.SlotService;

import lombok.*;

@RestController
@RequestMapping("/slots")
@RequiredArgsConstructor
public class SlotController {

	public SlotController(SlotService service) {
		super();
		this.service = service;
	}

	private final SlotService service;

	// create slot
	@PostMapping("/create")
	public String createSlots(@RequestBody SlotRequest request) {
		return service.createSlots(request);
	}

	// GET Slots by Mentor
	@GetMapping("/mentor/{mentorId}")
	public List<AvailabilitySlot> getSlotsByMentor(@PathVariable Long mentorId) {
		return service.getSlotsByMentor(mentorId);
	}

	// delete slot
	@DeleteMapping("/{slotId}")
	public String deleteSlot(@PathVariable Long slotId) {
		service.deleteSlot(slotId);
		return "Slot deleted successfully";
	}

}
