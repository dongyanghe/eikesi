package com.eikesi.demo.gateway.repository;

import com.eikesi.demo.gateway.domain.CustomerFlock;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the CustomerFlock entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CustomerFlockRepository extends JpaRepository<CustomerFlock, Long> {

}
