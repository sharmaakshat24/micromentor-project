package com.micromentorship.mm.dto;

import lombok.*;

@Data
public class MentorProfileRequest {

	public MentorProfileRequest() {
	}

	public MentorProfileRequest(Long userId, int experienceYears, double pricePerSession, String bio) {
		super();
		this.userId = userId;
		this.experienceYears = experienceYears;
		this.pricePerSession = pricePerSession;
		this.bio = bio;
	}

	private Long userId;
	private int experienceYears;
	private double pricePerSession;
	private String bio;

	private String name;
	private String photoUrl;

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

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

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

}
