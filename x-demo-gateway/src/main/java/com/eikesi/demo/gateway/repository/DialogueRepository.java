package com.eikesi.demo.gateway.repository;

import com.eikesi.demo.gateway.domain.Dialogue;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Dialogue entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DialogueRepository extends JpaRepository<Dialogue, Long> {

}
