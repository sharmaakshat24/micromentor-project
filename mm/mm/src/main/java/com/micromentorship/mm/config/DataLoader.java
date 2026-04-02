package com.micromentorship.mm.config;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Random;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.github.javafaker.Faker;
import com.micromentorship.mm.entity.AvailabilitySlot;
import com.micromentorship.mm.entity.Booking;
import com.micromentorship.mm.entity.BookingStatus;
import com.micromentorship.mm.entity.Feedback;
import com.micromentorship.mm.entity.MentorProfile;
import com.micromentorship.mm.entity.MentorSkill;
import com.micromentorship.mm.entity.Skill;
import com.micromentorship.mm.entity.User;
import com.micromentorship.mm.repository.AvailabilitySlotRepository;
import com.micromentorship.mm.repository.BookingRepository;
import com.micromentorship.mm.repository.FeedbackRepository;
import com.micromentorship.mm.repository.MentorProfileRepository;
import com.micromentorship.mm.repository.MentorSkillRepository;
import com.micromentorship.mm.repository.SkillRepository;
import com.micromentorship.mm.repository.UserRepository;

import lombok.*;

//@Configuration
@RequiredArgsConstructor
public class DataLoader {

	public DataLoader(UserRepository userRepository, MentorProfileRepository mentorProfileRepository,
			BookingRepository bookingRepository, FeedbackRepository feedbackRepository, SkillRepository skillRepository,
			AvailabilitySlotRepository availabilitySlotRepository, MentorSkillRepository mentorSkillRepository) {
		super();
		this.userRepository = userRepository;
		this.mentorProfileRepository = mentorProfileRepository;
		this.bookingRepository = bookingRepository;
		this.feedbackRepository = feedbackRepository;
		this.skillRepository = skillRepository;
		this.availabilitySlotRepository = availabilitySlotRepository;
		this.mentorSkillRepository = mentorSkillRepository;

	}

	private final UserRepository userRepository;
	private final MentorProfileRepository mentorProfileRepository;
	private final BookingRepository bookingRepository;
	private final FeedbackRepository feedbackRepository;
	private final SkillRepository skillRepository;
	private final AvailabilitySlotRepository availabilitySlotRepository;
	private final MentorSkillRepository mentorSkillRepository;

	@Bean
	public CommandLineRunner loadData() {

		return args -> {

			List<User> allUsers = userRepository.findAll();

			if (allUsers.isEmpty()) {
				System.out.println("⚠ No users found. Create users first.");
				return;
			}

			List<User> mentors = allUsers.stream().filter(u -> u.getRole().equalsIgnoreCase("MENTOR")).toList();

			List<User> mentees = allUsers.stream().filter(u -> u.getRole().equalsIgnoreCase("MENTEE")).toList();

			if (mentors.isEmpty() || mentees.isEmpty()) {
				System.out.println("⚠ Need at least 1 mentor and 1 mentee.");
				return;
			}

			Random random = new Random();

			// =====================================================
			// 1️⃣ APPEND SKILLS
			// =====================================================
			for (int i = 0; i < 10; i++) {

				Skill skill = new Skill();
				skill.setName("Skill_" + System.currentTimeMillis() + "_" + i);

				skillRepository.save(skill);
			}

			System.out.println("✅ Skills appended");

			// =====================================================
			// 2️⃣ CREATE MENTOR PROFILE IF NOT EXISTS
			// =====================================================
			for (User mentor : mentors) {

				boolean exists = mentorProfileRepository.findByUser_Id(mentor.getId()).isPresent();

				if (!exists) {

					MentorProfile profile = new MentorProfile();

					profile.setUser(mentor);
					profile.setName(mentor.getName());
					profile.setPhotoUrl("https://randomuser.me/api/portraits/men"+ random.nextInt(100) + ".jpg");
					profile.setExperienceYears(2 + random.nextInt(8));
					profile.setPricePerSession(1000 + random.nextInt(2000));
					profile.setBio("Experienced mentor in software development");
					profile.setRating(4.0);
					profile.setTotalSessions(0);

					mentorProfileRepository.save(profile);
				}
			}

			System.out.println("✅ Mentor profiles ensured");

			// =====================================================
			// 3️⃣ APPEND AVAILABILITY SLOTS
			// =====================================================
			for (User mentor : mentors) {

				for (int i = 0; i < 3; i++) {

					AvailabilitySlot slot = new AvailabilitySlot();

					slot.setMentorId(mentor.getId());

					LocalDate date = LocalDate.now().plusDays(random.nextInt(10));

					int hour = 9 + random.nextInt(8);

					LocalTime start = LocalTime.of(hour, 0);
					LocalTime end = start.plusHours(1);

					slot.setDate(date);
					slot.setStartTime(start);
					slot.setEndTime(end);
					slot.setBooked(false);

					availabilitySlotRepository.save(slot);
				}
			}

			System.out.println("✅ Availability slots appended");

			// =====================================================
			// APPEND MENTOR SKILLS (mapping mentors to skills)
			// =====================================================

			List<Skill> allSkills = skillRepository.findAll();

			for (User mentor : mentors) {

				int numberOfSkills = 2 + random.nextInt(3); // 2–4 skills per mentor

				for (int i = 0; i < numberOfSkills; i++) {

					Skill skill = allSkills.get(random.nextInt(allSkills.size()));

					MentorSkill mentorSkill = new MentorSkill();

					mentorSkill.setMentorId(mentor.getId());
					mentorSkill.setSkillId(skill.getId());

					mentorSkillRepository.save(mentorSkill);
				}
			}

			System.out.println("✅ Mentor skills appended");

			// =====================================================
			// 4️⃣ APPEND BOOKINGS
			// =====================================================
			List<AvailabilitySlot> slots = availabilitySlotRepository.findAll();

			for (int i = 0; i < 50; i++) {

				User mentor = mentors.get(random.nextInt(mentors.size()));

				User mentee = mentees.get(random.nextInt(mentees.size()));

				Booking booking = new Booking();

				booking.setMentorId(mentor.getId());
				booking.setMenteeId(mentee.getId());

				if (!slots.isEmpty()) {

					AvailabilitySlot slot = slots.get(random.nextInt(slots.size()));

					booking.setSlotId(slot.getId());
				}

				BookingStatus[] statuses = { BookingStatus.PENDING, BookingStatus.CONFIRMED, BookingStatus.COMPLETED,
						BookingStatus.CANCELLED };

				BookingStatus status = statuses[random.nextInt(statuses.length)];

				booking.setStatus(status);

				booking.setPrice(1000.0 + random.nextInt(2000));

				if (status == BookingStatus.COMPLETED) {
					booking.setPaymentStatus("PAID");
				} else {
					booking.setPaymentStatus("UNPAID");
				}

				booking.setMeetingLink("https://meet.google.com/demo-" + System.currentTimeMillis());

				booking.setCreatedAt(LocalDateTime.now().minusDays(random.nextInt(15)));

				Booking saved = bookingRepository.save(booking);

				// =====================================================
				// 5️⃣ ADD FEEDBACK
				// =====================================================
				if (status == BookingStatus.COMPLETED) {

					Feedback feedback = new Feedback();

					feedback.setBookingId(saved.getId());
					feedback.setRating(1 + random.nextInt(5));

					feedback.setComment("Very helpful mentoring session");

					feedbackRepository.save(feedback);
				}
			}

			System.out.println("🚀 Data appended successfully");

		};
	}

}
