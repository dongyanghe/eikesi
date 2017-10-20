package com.eikesi.snapshot.repository;

import com.eikesi.snapshot.domain.SnapshotPending;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the SnapshotPending entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SnapshotPendingRepository extends JpaRepository<SnapshotPending, Long> {

}
