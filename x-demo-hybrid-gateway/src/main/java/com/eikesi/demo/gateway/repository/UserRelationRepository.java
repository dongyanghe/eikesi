package com.eikesi.demo.gateway.repository;

import com.eikesi.demo.gateway.domain.UserRelation;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the UserRelation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserRelationRepository extends JpaRepository<UserRelation, Long> {

}
