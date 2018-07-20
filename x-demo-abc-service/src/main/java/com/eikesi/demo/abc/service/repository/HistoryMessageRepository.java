package com.eikesi.demoABC.service.repository;

import com.eikesi.demoABC.service.domain.HistoryMessage;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the HistoryMessage entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HistoryMessageRepository extends JpaRepository<HistoryMessage, Long> {

}
