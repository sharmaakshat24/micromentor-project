package com.micromentorship.mm.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.micromentorship.mm.entity.User;

public interface UserRepository extends JpaRepository<User, Long>{
	Optional<User> findByEmail(String email);

}
