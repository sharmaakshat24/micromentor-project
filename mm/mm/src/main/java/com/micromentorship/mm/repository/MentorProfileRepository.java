package com.micromentorship.mm.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.micromentorship.mm.entity.MentorProfile;

public interface MentorProfileRepository extends JpaRepository<MentorProfile, Long>{
	
	Optional<MentorProfile> findByUser_Id(Long userId);
	
	List<MentorProfile> findByUser_IdIn(List<Long> userIds);

} 
