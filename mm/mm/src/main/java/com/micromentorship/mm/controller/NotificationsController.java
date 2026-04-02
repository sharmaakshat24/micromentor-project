package com.micromentorship.mm.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.micromentorship.mm.entity.Notifications;
import com.micromentorship.mm.service.NotificationsService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/notifications")
@RequiredArgsConstructor
public class NotificationsController {

	public NotificationsController(NotificationsService service) {
		super();
		this.service = service;
	}

	private final NotificationsService service;

	@GetMapping("/{userId}")
	public List<Notifications> getNotifications(@PathVariable Long userId) {
		return service.getUserNotifications(userId);
	}

	@PutMapping("/read/{id}")
	public void markAsRead(@PathVariable Long id) {
		service.markAsRead(id);
	}

	@DeleteMapping("/{id}")
	public void deleteNotification(@PathVariable Long id) {
		service.deleteNotification(id);
	}

}
