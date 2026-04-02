package com.micromentorship.mm.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.micromentorship.mm.entity.Booking;

public interface BookingRepository extends JpaRepository<Booking, Long> {

	List<Booking> findByMenteeId(Long menteeId);

	List<Booking> findByMentorId(Long mentorId);

	@Query("""
			SELECT COALESCE(SUM(b.price), 0)
			FROM Booking b
			WHERE b.mentorId = :mentorId
			AND b.status = com.micromentorship.mm.entity.BookingStatus.COMPLETED
			""")
	Double calculateEarnings(@Param("mentorId") Long mentorId);

	@Query("""
			SELECT DATE(b.createdAt), COUNT(b)
			FROM Booking b
			WHERE b.createdAt >= :startDate
			AND b.status = 'COMPLETED'
			AND (
			     (:role = 'MENTOR' AND b.mentorId = :userId)
			     OR
			     (:role = 'MENTEE' AND b.menteeId = :userId)
			)
			GROUP BY DATE(b.createdAt)
			ORDER BY DATE(b.createdAt)
			""")
	List<Object[]> getWeeklyStats(@Param("userId") Long userId, @Param("role") String role,
			@Param("startDate") LocalDateTime startDate);

	@Query("""
			SELECT b
			FROM Booking b
			WHERE b.mentorId = :mentorId
			AND b.status = com.micromentorship.mm.entity.BookingStatus.COMPLETED
			ORDER BY b.createdAt DESC
			""")
	List<Booking> getCompletedBookings(@Param("mentorId") Long mentorId);

}
