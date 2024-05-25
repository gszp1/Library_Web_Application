package org.example.backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "resources_instances")
public class ResourceInstance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "resource_instance_id")
    private Integer resourceInstanceId;

    private boolean isBorrowed;

    @ManyToOne
    @JoinColumn(name = "FK_resource", nullable = false)
    private Resource resource;

    @OneToMany(mappedBy = "resourceInstance")
    private List<Reservation> reservations;
}
