package com.eikesi.im.repository;

import com.eikesi.im.domain.CustomerRelation;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CustomerRelation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CustomerRelationRepository extends JpaRepository<CustomerRelation, Long> {

}
