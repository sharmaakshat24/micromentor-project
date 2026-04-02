package com.micromentorship.mm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.micromentorship.mm.entity.Notifications;

public interface NotificationsRepository extends JpaRepository<Notifications, Long> {

	List<Notifications> findByUserId(Long userId);

	List<Notifications> findByUserIdOrderByCreatedAtDesc(Long userId);	

}
