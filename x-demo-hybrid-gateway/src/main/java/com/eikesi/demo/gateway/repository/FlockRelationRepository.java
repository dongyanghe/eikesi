package com.eikesi.demo.gateway.repository;

import com.eikesi.demo.gateway.domain.FlockRelation;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the FlockRelation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FlockRelationRepository extends JpaRepository<FlockRelation, Long> {

}
