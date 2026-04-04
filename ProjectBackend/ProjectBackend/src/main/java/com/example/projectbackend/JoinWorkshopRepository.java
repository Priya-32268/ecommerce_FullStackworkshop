package com.example.projectbackend;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface JoinWorkshopRepository extends JpaRepository<JoinWorkshop, Long> {

    // ✅ Find all joined by email
    List<JoinWorkshop> findByEmail(String email);

    // ✅ Check already joined
    boolean existsByWorkshopIdAndEmail(Long workshopId, String email);
}