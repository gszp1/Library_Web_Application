package org.example.backend.model.jointable;

import jakarta.persistence.*;
import lombok.*;
import org.example.backend.model.Author;
import org.example.backend.model.Resource;
import org.example.backend.model.key.AuthorResourceKey;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table(name = "authors_resources")
public class AuthorResource {

    @EmbeddedId
    private AuthorResourceKey id;

    @ManyToOne
    @MapsId("authorId")
    @JoinColumn(name = "FK_author")
    private Author author;

    @ManyToOne
    @MapsId("resourceId")
    @JoinColumn(name = "FK_resource")
    private Resource resource;
}
