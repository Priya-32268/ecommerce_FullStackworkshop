package com.example.projectbackend;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface RegistrationRepository extends JpaRepository<Registration, Long> {

    Optional<Registration> findByEmailAndWorkshopId(String email, Long workshopId);
}