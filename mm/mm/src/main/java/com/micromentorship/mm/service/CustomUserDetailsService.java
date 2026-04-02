package com.micromentorship.mm.service;

import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import com.micromentorship.mm.entity.User;
import com.micromentorship.mm.repository.UserRepository;

import lombok.*;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

	public CustomUserDetailsService(UserRepository repository) {
		super();
		this.repository = repository;
	}

	private final UserRepository repository;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		User user = repository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found"));

		return org.springframework.security.core.userdetails.User.withUsername(user.getEmail())
				.password(user.getPassword()).roles(user.getRole()).build();
	}

}
