package com.micromentorship.mm.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.micromentorship.mm.entity.ChatMessage;
import com.micromentorship.mm.entity.User;
import com.micromentorship.mm.service.ChatService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/chat")
@RequiredArgsConstructor
public class ChatController {

	public ChatController(ChatService chatService) {
		super();
		this.chatService = chatService;
	}

	private final ChatService chatService;

	@MessageMapping("/send")
	@SendTo("/topic/messages")
	public ChatMessage sendMessage(ChatMessage message) {
		if (message.getSenderId() == null) {
			throw new RuntimeException("SenderId and ReceiverId required");
		}
		message.setTimestamp(LocalDateTime.now());
		return chatService.saveMessage(message);
	}

	@GetMapping("/conversations/{userId}")
	public List<User> getConversations(@PathVariable Long userId) {
		return chatService.getConversationUsers(userId);
	}

	@GetMapping("/history")
	public List<ChatMessage> getHistory(@RequestParam Long user1, @RequestParam Long user2) {
		return chatService.getChatHistory(user1, user2);
	}

}
