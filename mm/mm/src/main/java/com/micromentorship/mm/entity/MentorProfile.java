package com.micromentorship.mm.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "mentor_profile")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MentorProfile {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	// mentor userId as foreign key
//	private Long userId;
	private int experienceYears;
	private double pricePerSession;

	@Column(length = 2000)
	private String bio;

	private double rating = 0;
	private int totalSessions = 0;

	private String name;
	private String photoUrl;

	@OneToOne
	@JoinColumn(name = "user_id", nullable = false, unique = true)
	private User user;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPhotoUrl() {
		return photoUrl;
	}

	public void setPhotoUrl(String photoUrl) {
		this.photoUrl = photoUrl;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

//	public Long getUserId() {
//		return userId;
//	}
//
//	public void setUserId(Long userId) {
//		this.userId = userId;
//	}

	public int getExperienceYears() {
		return experienceYears;
	}

	public void setExperienceYears(int experienceYears) {
		this.experienceYears = experienceYears;
	}

	public double getPricePerSession() {
		return pricePerSession;
	}

	public void setPricePerSession(double pricePerSession) {
		this.pricePerSession = pricePerSession;
	}

	public String getBio() {
		return bio;
	}

	public void setBio(String bio) {
		this.bio = bio;
	}

	public double getRating() {
		return rating;
	}

	public void setRating(double rating) {
		this.rating = rating;
	}

	public int getTotalSessions() {
		return totalSessions;
	}

	public void setTotalSessions(int totalSessions) {
		this.totalSessions = totalSessions;
	}

}
