package com.example.projectbackend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendEmail(String to, String zoomLink, String title) {

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Workshop Confirmation");

        message.setText(
            "You have successfully joined the workshop: " + title +
            "\n\nZoom Link: " + zoomLink
        );

        mailSender.send(message);
    }
}