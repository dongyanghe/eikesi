package com.eikesi.demoABC.service.repository;

import com.eikesi.demoABC.service.domain.CustomerRelation;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CustomerRelation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CustomerRelationRepository extends JpaRepository<CustomerRelation, Long> {

}
