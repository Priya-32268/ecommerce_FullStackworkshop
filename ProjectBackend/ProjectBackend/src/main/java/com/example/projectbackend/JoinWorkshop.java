package com.example.projectbackend;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(
    uniqueConstraints = @UniqueConstraint(columnNames = {"workshopId", "email"})
)
public class JoinWorkshop {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private Long workshopId;

    @Email(message = "Invalid email format")
    @NotNull
    private String email;

    // ✅ Getters & Setters
    public Long getId() { return id; }

    public Long getWorkshopId() { return workshopId; }
    public void setWorkshopId(Long workshopId) { this.workshopId = workshopId; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}