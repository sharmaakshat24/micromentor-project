package com.micromentorship.mm.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.micromentorship.mm.dto.*;
import com.micromentorship.mm.service.PasswordService;
import com.micromentorship.mm.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

	public AuthController(UserService userService, PasswordService passwordService) {
		super();
		this.userService = userService;
		this.passwordService = passwordService;
	}

	private final UserService userService;
	private final PasswordService passwordService;

	// register
	@PostMapping("/register")
	public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
		try {

			String message = userService.register(request);

			return ResponseEntity.ok(message);

		} catch (RuntimeException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}

	}

	// login
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginRequest request) {
		try {
			AuthResponse response = userService.login(request);
			return ResponseEntity.ok(response);
		} catch (RuntimeException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}

	@PostMapping("/forgot-password")
	public String forgotPassword(@RequestBody Map<String, String> request) {

		passwordService.createResetToken(request.get("email"));

		return "Reset email sent";
	}

	@PostMapping("/reset-password")
	public String resetPassword(@RequestBody Map<String, String> request) {

		passwordService.resetPassword(request.get("token"), request.get("newPassword"));

		return "Password Update Successfully";
	}

}
