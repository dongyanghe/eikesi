package com.eikesi.snapshot.repository;

import com.eikesi.snapshot.domain.Snapshot;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Snapshot entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SnapshotRepository extends JpaRepository<Snapshot, Long> {

}
