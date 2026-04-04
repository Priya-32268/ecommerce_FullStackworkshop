package com.example.projectbackend;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public class JoinRequest {

    @NotNull(message = "Email cannot be empty")
    @Email(message = "Invalid email format")
    @Pattern(regexp = "^[A-Za-z0-9+_.-]+@gmail\\.com$", message = "Only Gmail emails allowed")
    private String email;

    @NotNull(message = "Workshop ID is required")
    private Long workshopId;

    // Getters and Setters
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public Long getWorkshopId() { return workshopId; }
    public void setWorkshopId(Long workshopId) { this.workshopId = workshopId; }
}