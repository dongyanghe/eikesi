package com.eikesi.demoABC.service.repository;

import com.eikesi.demoABC.service.domain.CustomerFlock;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CustomerFlock entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CustomerFlockRepository extends JpaRepository<CustomerFlock, Long> {

}
