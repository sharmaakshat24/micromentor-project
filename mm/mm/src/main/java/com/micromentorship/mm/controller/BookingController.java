package com.micromentorship.mm.controller;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.micromentorship.mm.dto.BookingRequest;
import com.micromentorship.mm.entity.Booking;
import com.micromentorship.mm.entity.BookingStatus;
import com.micromentorship.mm.service.BookingService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/booking")
@RequiredArgsConstructor
public class BookingController {

	public BookingController(BookingService service) {
		super();
		this.service = service;
	}

	private final BookingService service;

	// create booking
	@PostMapping
	public Booking createBooking(@RequestBody BookingRequest request) {
		return service.createBooking(request);

	}

	// booking by mentee
	@GetMapping("/mentee/{menteeId}")
	public List<Booking> getMenteeBookings(@PathVariable Long menteeId) {
		return service.getMenteeBookings(menteeId);
	}

	// booking by mentor
	@GetMapping("/mentor/{mentorId}")
	public List<Booking> getMentorBookings(@PathVariable Long mentorId) {
		return service.getMentorBookings(mentorId);
	}

	@PutMapping("/{id}/confirm")
	public String confirmBooking(@PathVariable Long id) {
		service.updateStatus(id, BookingStatus.CONFIRMED);
		return "Booking confirmed";
	}

	@PutMapping("/{id}/complete")
	public String completeBooking(@PathVariable Long id) {
		service.updateStatus(id, BookingStatus.COMPLETED);
		return "Booking completed";
	}

	@PutMapping("/{id}/cancel")
	public String cancelBooking(@PathVariable Long id) {
		service.updateStatus(id, BookingStatus.CANCELLED);
		return "Booking cancelled";
	}

	@GetMapping("/mentor/{mentorId}/earnings")
	public Double getEarnings(@PathVariable Long mentorId) {
		return service.getMentorEarnings(mentorId);
	}

	@GetMapping("/analytics/{userId}/{role}")
	public List<Map<String, Object>> getAnalytics(@PathVariable Long userId, @PathVariable String role) {
		return service.getWeeklyAnalytics(userId, role);
	}

	@GetMapping("/mentor/{mentorId}/earnings/history")
	public List<Booking> earningsHistory(@PathVariable Long mentorId) {
		return service.getEarningsHistory(mentorId);
	}

}
