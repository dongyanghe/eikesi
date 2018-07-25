package com.eikesi.im.web.repository;

import com.eikesi.im.web.domain.FlockRelation;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the FlockRelation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FlockRelationRepository extends JpaRepository<FlockRelation, Long> {

}
