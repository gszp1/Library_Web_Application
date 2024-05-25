package org.example.backend.model.key;

import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@Embeddable
public class AuthorResourceKey implements Serializable {

    private int authorId;

    private int resourceId;
}
