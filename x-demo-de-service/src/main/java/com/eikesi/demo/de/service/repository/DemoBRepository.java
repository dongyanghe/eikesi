package com.eikesi.demo.de.service.repository;

import com.eikesi.demo.de.service.domain.DemoB;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the DemoB entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DemoBRepository extends JpaRepository<DemoB, Long> {

}
