package com.eikesi.demo.gateway.repository;

import com.eikesi.demo.gateway.domain.UserFlock;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the UserFlock entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserFlockRepository extends JpaRepository<UserFlock, Long> {

}
