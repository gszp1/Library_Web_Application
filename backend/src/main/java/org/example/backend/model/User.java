package org.example.backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@ToString
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(length = 40, unique = true, nullable = false)
    private String email;

    @Column(length = 20, nullable = true)
    private String name;

    @Column(length = 20, nullable = true)
    private String surname;

    @Column(name = "phone_number", length = 12, nullable = false)
    private String phoneNumber;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private LocalDate joinDate;
}
