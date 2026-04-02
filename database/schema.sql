SELECT
    *
FROM
    availability_slots;

SELECT
    *
FROM
    bookings;

SELECT
    *
FROM
    feedback;

SELECT
    *
FROM
    mentor_profile;

SELECT
    *
FROM
    mentor_skills;

SELECT
    *
FROM
    skills;

SELECT
    *
FROM
    users;

SELECT
    *
FROM
    password_reset_token;

SELECT
    *
FROM
    notifications;

SELECT
    *
FROM
    chat_messages;

CREATE TABLE password_reset_token (
    id BIGSERIAL PRIMARY KEY,
    token VARCHAR(255) NOT NULL,
    user_id BIGINT REFERENCES users(id),
    expiry_date TIMESTAMP NOT NULL
);

UPDATE
    bookings
SET
    s CREATE TABLE password_reset_token (
        id BIGSERIAL PRIMARY KEY,
        token VARCHAR(255) NOT NULL,
        user_id BIGINT REFERENCES users(id),
        expiry_date TIMESTAMP NOT NULL
    );

CREATE TABLE notifications (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT,
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

UPDATE
    chat_messages
SET
    sender_id = 2
WHERE
    sender_id IS NULL;