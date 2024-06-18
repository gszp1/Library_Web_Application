package org.example.backend.model;


import jakarta.persistence.*;
import lombok.*;
import org.example.backend.model.jointable.AuthorResource;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor()
@ToString
@Builder
@Entity
@Table(name = "authors")
public class Author {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column (name = "author_id")
    private Integer authorId;

    @Column (name = "first_name", length = 20, nullable = false)
    private String firstName;

    @Column (name = "last_name", length = 20, nullable = false)
    private String lastName;

    @Column (length = 40, nullable = false, unique = true)
    private String email;

    @OneToMany(mappedBy = "author")
    @Builder.Default
    private List<AuthorResource> resources = new ArrayList<>();
}
