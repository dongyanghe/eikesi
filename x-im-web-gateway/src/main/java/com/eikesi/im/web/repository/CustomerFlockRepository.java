package com.eikesi.im.web.repository;

import com.eikesi.im.web.domain.CustomerFlock;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CustomerFlock entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CustomerFlockRepository extends JpaRepository<CustomerFlock, Long> {

}
