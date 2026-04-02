package com.micromentorship.mm.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.micromentorship.mm.dto.BookingRequest;
import com.micromentorship.mm.entity.AvailabilitySlot;
import com.micromentorship.mm.entity.Booking;
import com.micromentorship.mm.entity.BookingStatus;
import com.micromentorship.mm.entity.MentorProfile;
import com.micromentorship.mm.repository.AvailabilitySlotRepository;
import com.micromentorship.mm.repository.BookingRepository;
import com.micromentorship.mm.repository.MentorProfileRepository;

import lombok.*;

@Service
@RequiredArgsConstructor
public class BookingService {

	public BookingService(BookingRepository bookingRepository, AvailabilitySlotRepository slotRepository,
			MentorProfileRepository mentorProfileRepository) {
		super();
		this.bookingRepository = bookingRepository;
		this.slotRepository = slotRepository;
		this.mentorProfileRepository = mentorProfileRepository;
	}

	private final BookingRepository bookingRepository;
	private final AvailabilitySlotRepository slotRepository;
	private final MentorProfileRepository mentorProfileRepository;

	// create booking
	public Booking createBooking(BookingRequest request) {

		AvailabilitySlot slot = slotRepository.findById(request.getSlotId())
				.orElseThrow(() -> new RuntimeException("Slot not found"));

		if (slot.isBooked()) {
			throw new RuntimeException("Slot already Booked");
		}

		MentorProfile mentor = mentorProfileRepository.findById(request.getMentorId())
				.orElseThrow(() -> new RuntimeException("Mentor not found"));

		slot.setBooked(true);
		slotRepository.save(slot);

		Booking booking = new Booking();
		booking.setMentorId(request.getMentorId());
		booking.setMenteeId(request.getMenteeId());
		booking.setSlotId(request.getSlotId());
		booking.setStatus(BookingStatus.PENDING);
		booking.setPaymentStatus("PENDING");
		booking.setPrice(mentor.getPricePerSession());

		booking.setMeetingLink("https://meet.google.com/sample-link");

		return bookingRepository.save(booking);

	}

	public void updateStatus(Long bookingId, BookingStatus status) {

		Booking booking = bookingRepository.findById(bookingId)
				.orElseThrow(() -> new RuntimeException("Booking not found"));

		booking.setStatus(status);

		bookingRepository.save(booking);

	}

	public Double getMentorEarnings(Long mentorId) {

		return bookingRepository.calculateEarnings(mentorId);

	}

	public List<Map<String, Object>> getWeeklyAnalytics(Long userId, String role) {

		LocalDateTime last7Days = LocalDateTime.now().minusDays(7);

		List<Object[]> data = bookingRepository.getWeeklyStats(userId, role, last7Days);

		List<Map<String, Object>> result = new ArrayList<>();

		for (Object[] row : data) {

			Map<String, Object> map = new HashMap<>();

			map.put("date", row[0].toString());
			map.put("count", row[1]);

			result.add(map);
		}

		return result;
	}

	public List<Booking> getEarningsHistory(Long mentorId) {
		return bookingRepository.getCompletedBookings(mentorId);
	}

	public List<Booking> getMenteeBookings(Long menteeId) {
		return bookingRepository.findByMenteeId(menteeId);
	}

	public List<Booking> getMentorBookings(Long mentorId) {
		return bookingRepository.findByMentorId(mentorId);
	}

}
