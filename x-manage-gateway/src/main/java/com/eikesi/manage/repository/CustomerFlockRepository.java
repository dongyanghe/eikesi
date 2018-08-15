package com.eikesi.manage.repository;

import com.eikesi.manage.domain.CustomerFlock;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CustomerFlock entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CustomerFlockRepository extends JpaRepository<CustomerFlock, Long> {

}
