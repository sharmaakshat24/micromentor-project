package com.micromentorship.mm.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.micromentorship.mm.entity.ChatMessage;
import com.micromentorship.mm.entity.User;
import com.micromentorship.mm.repository.ChatRepository;
import com.micromentorship.mm.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChatService {

	public ChatService(ChatRepository chatRepository, NotificationsService notificationsService,
			UserRepository userRepository) {
		super();
		this.chatRepository = chatRepository;
		this.notificationsService = notificationsService;
		this.userRepository = userRepository;
	}

	private final ChatRepository chatRepository;
	private final NotificationsService notificationsService;
	private final UserRepository userRepository;

	public ChatMessage saveMessage(ChatMessage message) {

		if (message.getSenderId() == null || message.getReceiverId() == null) {
			throw new RuntimeException("SenderId or ReceiverId missing");
		}

		message.setTimestamp(LocalDateTime.now());
		ChatMessage saved = chatRepository.save(message);
		User sender = userRepository.findById(message.getSenderId())
				.orElseThrow(() -> new RuntimeException("user not found"));
		notificationsService.createNotification(message.getReceiverId(), "New message from user: " + sender.getName(),
				sender.getId(), "CHAT");
		return saved;
	}

	public List<User> getConversationUsers(Long userId) {
		User currentUser = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

		List<Long> ids = chatRepository.findConversationUsers(userId);

		List<User> users = userRepository.findAllById(ids);

		if (currentUser.getRole().equals("MENTOR")) {
			return users.stream().filter(u -> u.getRole().equals("MENTEE")).toList();
		} else {
			return users.stream().filter(u -> u.getRole().equals("MENTOR")).toList();
		}

	}

	public List<ChatMessage> getChatHistory(Long user1, Long user2) {
		return chatRepository.findBySenderIdAndReceiverIdOrSenderIdAndReceiverIdOrderByTimestampAsc(user1, user2, user2,
				user1);
	}

}
