package com.eikesi.demo.gateway.repository;

import com.eikesi.demo.gateway.domain.FlockRelation;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the FlockRelation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FlockRelationRepository extends JpaRepository<FlockRelation, Long> {

}
