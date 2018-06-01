package com.eikesi.demo.de.service.repository;

import com.eikesi.demo.de.service.domain.UserFlock;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the UserFlock entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserFlockRepository extends JpaRepository<UserFlock, Long> {

}
