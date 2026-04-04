package com.example.projectbackend;

import jakarta.persistence.*;

@Entity
@Table(name = "workshop")
public class Workshop {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;   // Auto-generated ID

    private String title;
    private String description;
    private boolean completed;
    private String zoomLink;

    // ✅ Default Constructor (REQUIRED)
    public Workshop() {}

    // ✅ Parameterized Constructor (Optional but useful)
    public Workshop(String title, String description, boolean completed, String zoomLink) {
        this.title = title;
        this.description = description;
        this.completed = completed;
        this.zoomLink = zoomLink;
    }

    // ✅ Getters and Setters

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public boolean isCompleted() {
        return completed;
    }

    public String getZoomLink() {
        return zoomLink;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    public void setZoomLink(String zoomLink) {
        this.zoomLink = zoomLink;
    }

    // ✅ Debugging helper
    @Override
    public String toString() {
        return "Workshop{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", completed=" + completed +
                ", zoomLink='" + zoomLink + '\'' +
                '}';
    }
}