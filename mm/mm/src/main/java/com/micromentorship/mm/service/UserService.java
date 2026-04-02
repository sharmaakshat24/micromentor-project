package com.micromentorship.mm.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.micromentorship.mm.dto.*;
import com.micromentorship.mm.entity.User;
import com.micromentorship.mm.repository.UserRepository;
import com.micromentorship.mm.security.JwtUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

	public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
		super();
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
		this.jwtUtil = jwtUtil;
	}

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private final JwtUtil jwtUtil;

	// register
	public String register(RegisterRequest request) {
		
		if(userRepository.findByEmail(request.getEmail()).isPresent()) {
			throw new RuntimeException("Email already exists");
		}

		User user = new User();
		user.setName(request.getName());
		user.setEmail(request.getEmail());
		user.setPassword(passwordEncoder.encode(request.getPassword()));
		user.setRole(request.getRole());
		userRepository.save(user);

		return "User Registered Successfull";

	}

	// login
	public AuthResponse login(LoginRequest request) {

		User user = userRepository.findByEmail(request.getEmail())
				.orElseThrow(() -> new RuntimeException("User not found"));

		if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
			throw new RuntimeException("Incorrect Password");
		}

		String token = jwtUtil.generateToken(user.getId(), user.getEmail(), user.getRole());

		return new AuthResponse(token);
	}
}
