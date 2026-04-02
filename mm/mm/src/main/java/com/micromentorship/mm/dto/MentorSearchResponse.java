package com.micromentorship.mm.dto;

import lombok.*;

@Data
@AllArgsConstructor
public class MentorSearchResponse {

	public MentorSearchResponse() {

	}

	public MentorSearchResponse(Long mentorId, String name, String photoUrl, int experienceYears,
			double pricePerSession, double rating) {
		super();
		this.mentorId = mentorId;
		this.name = name;
		this.photoUrl = photoUrl;
		this.experienceYears = experienceYears;
		this.pricePerSession = pricePerSession;
		this.rating = rating;
	}

	private Long mentorId;
	private String name;
	private String photoUrl;
	private int experienceYears;
	private double pricePerSession;
	private double rating;

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

	public Long getMentorId() {
		return mentorId;
	}

	public void setMentorId(Long mentorId) {
		this.mentorId = mentorId;
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

	public double getRating() {
		return rating;
	}

	public void setRating(double rating) {
		this.rating = rating;
	}

}
