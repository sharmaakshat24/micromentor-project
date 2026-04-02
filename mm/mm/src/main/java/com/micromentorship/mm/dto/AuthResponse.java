package com.micromentorship.mm.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponse {

	private String token;

	public AuthResponse(String token) {
		super();
		this.token = token;
	}

	public AuthResponse() {
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

}
