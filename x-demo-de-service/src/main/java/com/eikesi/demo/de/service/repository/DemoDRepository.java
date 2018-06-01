package com.eikesi.demo.de.service.repository;

import com.eikesi.demo.de.service.domain.DemoD;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the DemoD entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DemoDRepository extends JpaRepository<DemoD, Long> {

}
