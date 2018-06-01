package com.eikesi.demo.gateway.repository;

import com.eikesi.demo.gateway.domain.DemoD;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the DemoD entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DemoDRepository extends JpaRepository<DemoD, Long> {

}
