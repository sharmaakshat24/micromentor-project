package com.micromentorship.mm.service;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.micromentorship.mm.entity.PasswordResetToken;
import com.micromentorship.mm.entity.User;
import com.micromentorship.mm.repository.PasswordResetTokenRepository;
import com.micromentorship.mm.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PasswordService {

	public PasswordService(UserRepository userRepository, PasswordResetTokenRepository tokenRepository,
			EmailService emailService, PasswordEncoder passwordEncoder) {
		super();
		this.userRepository = userRepository;
		this.tokenRepository = tokenRepository;
		this.emailService = emailService;
		this.passwordEncoder = passwordEncoder;
	}

	private final UserRepository userRepository;
	private final PasswordResetTokenRepository tokenRepository;
	private final EmailService emailService;
	private final PasswordEncoder passwordEncoder;

	public void createResetToken(String email) {

		User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

		String token = UUID.randomUUID().toString();

		PasswordResetToken resetToken = new PasswordResetToken();

		resetToken.setToken(token);
		resetToken.setUser(user);
		resetToken.setExpiryDate(LocalDateTime.now().plusMinutes(15));

		tokenRepository.save(resetToken);

		String link = "http://localhost:5173/reset-password?token=" + token;

		emailService.sendEmail(email, "Password Reset Request", "Click here to reset password" + link);

	}

	public void resetPassword(String token, String newPassword) {

		PasswordResetToken resetToken = tokenRepository.findByToken(token)
				.orElseThrow(() -> new RuntimeException("Invalid Token"));

		if (resetToken.getExpiryDate().isBefore(LocalDateTime.now())) {

			throw new RuntimeException("Token Expired");

		}

		User user = resetToken.getUser();

		user.setPassword(passwordEncoder.encode(newPassword));

		userRepository.save(user);

		tokenRepository.delete(resetToken);
	}
}
