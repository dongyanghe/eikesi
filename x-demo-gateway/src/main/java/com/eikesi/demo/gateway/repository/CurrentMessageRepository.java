package com.eikesi.demo.gateway.repository;

import com.eikesi.demo.gateway.domain.CurrentMessage;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CurrentMessage entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CurrentMessageRepository extends JpaRepository<CurrentMessage, Long> {

}
