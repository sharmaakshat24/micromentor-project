package com.micromentorship.mm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.micromentorship.mm.entity.Feedback;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {

	List<Feedback> findByBookingId(Long bookingId);
	boolean existsByBookingId(Long bookingId);
	List<Feedback> findByMentorId(Long mentorId);

}
