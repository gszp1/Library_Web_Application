package org.example.backend.model;

import jakarta.persistence.*;
import lombok.*;
import org.example.backend.auth.Role;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Integer userId;

    @Column(length = 40, unique = true, nullable = false)
    private String email;

    @Column(length = 20, nullable = false)
    private String name;

    @Column(length = 20, nullable = false)
    private String surname;

    @Column(name = "phone_number", length = 12)
    private String phoneNumber;

    @Column(nullable = false)
    private String password;

    @Column(name="image_path")
    private String imagePath;

    @Column(name = "join_date", nullable = false)
    private LocalDate joinDate;

    @Enumerated(EnumType.STRING)
    private Role role;

    @OneToMany(mappedBy = "user")
    private List<Reservation> reservation;
}
