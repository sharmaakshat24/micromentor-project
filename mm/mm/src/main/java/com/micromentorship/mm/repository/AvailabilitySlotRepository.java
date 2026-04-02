package com.micromentorship.mm.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.micromentorship.mm.entity.AvailabilitySlot;

public interface AvailabilitySlotRepository extends JpaRepository<AvailabilitySlot, Long> {

	List<AvailabilitySlot> findByMentorIdAndDate(Long mentorId, LocalDate date);

	List<AvailabilitySlot> findByMentorId(Long mentorId);

}
