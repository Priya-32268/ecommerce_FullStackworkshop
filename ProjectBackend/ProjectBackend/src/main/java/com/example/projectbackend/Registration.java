package com.example.projectbackend;

import jakarta.persistence.*;

@Entity
public class Registration {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;

    private Long workshopId;

    public Registration() {}

    public Registration(String email, Long workshopId) {
        this.email = email;
        this.workshopId = workshopId;
    }

    public Long getId() { return id; }
    public String getEmail() { return email; }
    public Long getWorkshopId() { return workshopId; }

    public void setEmail(String email) { this.email = email; }
    public void setWorkshopId(Long workshopId) { this.workshopId = workshopId; }
}