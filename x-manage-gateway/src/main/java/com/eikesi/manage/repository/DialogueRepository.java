package com.eikesi.manage.repository;

import com.eikesi.manage.domain.Dialogue;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Dialogue entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DialogueRepository extends JpaRepository<Dialogue, Long> {

}
