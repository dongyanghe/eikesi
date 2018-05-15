package com.eikesi.demo.gateway.repository;

import com.eikesi.demo.gateway.domain.DemoE;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the DemoE entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DemoERepository extends JpaRepository<DemoE, Long> {

}
