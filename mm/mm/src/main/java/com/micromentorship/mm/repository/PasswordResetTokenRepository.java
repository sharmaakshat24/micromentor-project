package com.micromentorship.mm.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.micromentorship.mm.entity.PasswordResetToken;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {

	Optional<PasswordResetToken> findByToken(String token);

}
