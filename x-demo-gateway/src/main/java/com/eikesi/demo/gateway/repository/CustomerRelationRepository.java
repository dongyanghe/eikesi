package com.eikesi.demo.gateway.repository;

import com.eikesi.demo.gateway.domain.CustomerRelation;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CustomerRelation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CustomerRelationRepository extends JpaRepository<CustomerRelation, Long> {

}
