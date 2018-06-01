package com.eikesi.demo.gateway.repository;

import com.eikesi.demo.gateway.domain.DemoB;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the DemoB entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DemoBRepository extends JpaRepository<DemoB, Long> {

}
