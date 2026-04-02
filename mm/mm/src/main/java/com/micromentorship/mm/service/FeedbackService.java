package com.micromentorship.mm.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.micromentorship.mm.dto.FeedbackRequest;
import com.micromentorship.mm.entity.Booking;
import com.micromentorship.mm.entity.Feedback;
import com.micromentorship.mm.entity.MentorProfile;
import com.micromentorship.mm.repository.BookingRepository;
import com.micromentorship.mm.repository.FeedbackRepository;
import com.micromentorship.mm.repository.MentorProfileRepository;

import lombok.*;

@Service
@RequiredArgsConstructor
public class FeedbackService {

	public FeedbackService(FeedbackRepository feedbackRepository, BookingRepository bookingRepository,
			MentorProfileRepository mentorProfileRepository) {
		super();
		this.feedbackRepository = feedbackRepository;
		this.bookingRepository = bookingRepository;
		this.mentorProfileRepository = mentorProfileRepository;
	}

	private final FeedbackRepository feedbackRepository;
	private final BookingRepository bookingRepository;
	private final MentorProfileRepository mentorProfileRepository;

	public String submitFeedback(FeedbackRequest request) {

		if (feedbackRepository.existsByBookingId(request.getBookingId())) {
			throw new RuntimeException("Feedback already submitted for this booking");
		}

		Booking booking = bookingRepository.findById(request.getBookingId())
				.orElseThrow(() -> new RuntimeException("Booking not found"));

		Feedback feedback = new Feedback();
		feedback.setBookingId(request.getBookingId());
		feedback.setRating(request.getRating());
		feedback.setComment(request.getComment());
		feedback.setMentorId(booking.getMentorId());

		feedbackRepository.save(feedback);

		MentorProfile mentor = mentorProfileRepository.findByUser_Id(booking.getMentorId())
				.orElseThrow(() -> new RuntimeException("Mentor not found"));

		if (!booking.getStatus().name().equals("COMPLETED")) {
			throw new RuntimeException("Feedback allowed only after session completion");
		}

		double totalRating = mentor.getRating() * mentor.getTotalSessions();
		totalRating += request.getRating();

		int sessions = mentor.getTotalSessions() + 1;
		mentor.setTotalSessions(sessions);
		mentor.setRating(totalRating / sessions);

		mentorProfileRepository.save(mentor);

		return "Feedback submitted Successfully";
	}

	public List<Feedback> getMentorFeedback(Long mentorId) {
		return feedbackRepository.findByMentorId(mentorId);
	}

}
