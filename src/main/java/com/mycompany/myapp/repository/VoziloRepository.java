package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Vozilo;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Vozilo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VoziloRepository extends JpaRepository<Vozilo, Long> {
}
