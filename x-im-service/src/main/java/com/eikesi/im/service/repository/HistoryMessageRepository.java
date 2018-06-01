package com.eikesi.im.service.repository;

import com.eikesi.im.service.domain.HistoryMessage;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the HistoryMessage entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HistoryMessageRepository extends JpaRepository<HistoryMessage, Long> {

}
