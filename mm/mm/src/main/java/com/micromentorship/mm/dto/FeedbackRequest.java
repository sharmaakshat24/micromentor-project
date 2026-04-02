package com.micromentorship.mm.dto;

import lombok.*;

@Data
public class FeedbackRequest {

	public FeedbackRequest() {
	}

	public FeedbackRequest(Long bookingId, int rating, String comment) {
		super();
		this.bookingId = bookingId;
		this.rating = rating;
		this.comment = comment;
	}

	private Long bookingId;

	private int rating;

	private String comment;

	public Long getBookingId() {
		return bookingId;
	}

	public void setBookingId(Long bookingId) {
		this.bookingId = bookingId;
	}

	public int getRating() {
		return rating;
	}

	public void setRating(int rating) {
		this.rating = rating;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

}
