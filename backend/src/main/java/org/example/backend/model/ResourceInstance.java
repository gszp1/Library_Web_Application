package org.example.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Entity
@Table(name = "resources_instances")
public class ResourceInstance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "resource_instance_id")
    private int resourceInstanceId;

    @ManyToOne
    @JoinColumn(name = "FK_resource", nullable = false)
    private Resource resource;
}
