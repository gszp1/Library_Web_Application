package org.example.backend.model;

import jakarta.persistence.*;
import lombok.*;
import org.example.backend.model.jointable.AuthorResource;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Entity
@Table(name = "resources")
public class Resource {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "resource_id")
    private Integer resourceId;

    @Column(length = 100, nullable = false, unique = true)
    private String title;

    @Column(length = 20, nullable = false, unique = true)
    private String identifier;

    private String description;

    @Column(name = "image_path")
    private String imagePath;

    @OneToMany(mappedBy = "resource")
    @Builder.Default
    private List<ResourceInstance> resourceInstances = new ArrayList<>();

    @OneToMany(mappedBy = "resource")
    @Builder.Default
    private List<AuthorResource> authors = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "FK_publisher")
    private Publisher publisher;
}
