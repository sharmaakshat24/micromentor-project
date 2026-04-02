package com.micromentorship.mm.service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.micromentorship.mm.dto.SlotRequest;
import com.micromentorship.mm.entity.AvailabilitySlot;
import com.micromentorship.mm.repository.AvailabilitySlotRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SlotService {

	public SlotService(AvailabilitySlotRepository repository) {
		super();
		this.repository = repository;
	}

	private final AvailabilitySlotRepository repository;

	// create 15min slot
	public String createSlots(SlotRequest request) {

		LocalDate date = LocalDate.parse(request.getDate());

		LocalTime start = LocalTime.parse(request.getStartTime());

		LocalTime end = LocalTime.parse(request.getEndTime());
		
		if(request.getDate() == null || request.getStartTime() == null || request.getEndTime() == null) {
			throw new RuntimeException("Invalid slot data");
		}

		while (start.isBefore(end)) {

			LocalTime slotEnd = start.plusMinutes(15);

			AvailabilitySlot slot = new AvailabilitySlot();
			slot.setMentorId(request.getMentorId());
			slot.setDate(date);
			slot.setStartTime(start);
			slot.setEndTime(slotEnd);

			repository.save(slot);

			start = slotEnd;

		}

		return "Slots Created Successfully";

	}

	public List<AvailabilitySlot> getSlotsByMentor(Long mentorId) {
		return repository.findByMentorId(mentorId);
	}

	public void deleteSlot(Long slotId) {

		AvailabilitySlot slot = repository.findById(slotId).orElseThrow(() -> new RuntimeException("Slot not found"));
		repository.delete(slot);

	}

}
