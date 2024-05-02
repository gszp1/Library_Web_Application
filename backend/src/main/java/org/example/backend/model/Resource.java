package org.example.backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Entity
@Table(name = "resources")
public class Resource {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "resource_id")
    private int resourceId;

    @Column(length = 100, nullable = false, unique = true)
    private String title;

    @Column(length = 20, nullable = false, unique = true)
    private String identifier;

    private String description;

    @OneToMany(mappedBy = "resource")
    private List<ResourceInstance> resourceInstances = new ArrayList<>();

    @OneToMany(mappedBy = "resource")
    private List<Author> authors = new ArrayList<>();
}
