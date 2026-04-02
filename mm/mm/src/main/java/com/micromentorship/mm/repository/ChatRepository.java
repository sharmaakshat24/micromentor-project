package com.micromentorship.mm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.micromentorship.mm.entity.ChatMessage;

public interface ChatRepository extends JpaRepository<ChatMessage, Long> {
	List<ChatMessage> findBySenderIdAndReceiverIdOrSenderIdAndReceiverIdOrderByTimestampAsc(Long sender1,
			Long receiver1, Long sender2, Long receiver2);

	@Query("""
			SELECT DISTINCT
			CASE
			 WHEN c.senderId = :userId THEN c.receiverId
			 ELSE c.senderId
			END
			FROM ChatMessage c
			WHERE (c.senderId = :userId OR c.receiverId = :userId)
			AND c.senderId IS NOT NULL
			AND c.receiverId IS NOT NULL
			""")
	List<Long> findConversationUsers(@Param("userId") Long userId);
}
