package org.example.backend.model;


import jakarta.persistence.*;
import lombok.*;
import org.example.backend.model.jointable.AuthorResource;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor()
@ToString
@Entity
@Table(name = "authors")
public class Author {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column (name = "author_id")
    private Integer authorId;

    @Column (length = 20, nullable = false)
    private String name;

    @Column (length = 20, nullable = false)
    private String surname;

    @OneToMany(mappedBy = "author")
    private List<AuthorResource> resources = new ArrayList<>();
}
