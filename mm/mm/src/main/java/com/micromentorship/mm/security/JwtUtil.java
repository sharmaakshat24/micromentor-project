package com.micromentorship.mm.security;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.*;

@Component
public class JwtUtil {

	private final String SECRET = "micromentorshipsecretkeymicromentorshipsecretkey123";

	public String generateToken(Long userId, String email, String role) {

		Map<String, Object> claims = new HashMap<>();
		claims.put("userId", userId);
		claims.put("role", role);

		return Jwts.builder().setClaims(claims).setSubject(email).setIssuedAt(new Date())
				.setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10))
				.signWith(SignatureAlgorithm.HS256, SECRET).compact();

	}

	public String extractEmail(String token) {
		return Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token).getBody().getSubject();
	}

	public boolean validateToken(String token) {
		try {
			Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token);
			return true;
		} catch (Exception e) {
			return false;
		}
	}
}
