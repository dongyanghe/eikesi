package com.eikesi.demo.abc.service.repository;

import com.eikesi.demo.abc.service.domain.DemoA;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the DemoA entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DemoARepository extends JpaRepository<DemoA, Long> {
    @Query("select distinct demo_a from DemoA demo_a left join fetch demo_a.demoDS")
    List<DemoA> findAllWithEagerRelationships();

    @Query("select demo_a from DemoA demo_a left join fetch demo_a.demoDS where demo_a.id =:id")
    DemoA findOneWithEagerRelationships(@Param("id") Long id);

}
