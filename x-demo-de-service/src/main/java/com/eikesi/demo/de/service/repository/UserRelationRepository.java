package com.eikesi.demo.de.service.repository;

import com.eikesi.demo.de.service.domain.UserRelation;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the UserRelation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserRelationRepository extends JpaRepository<UserRelation, Long> {

}
