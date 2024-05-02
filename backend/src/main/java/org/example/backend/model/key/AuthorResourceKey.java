package org.example.backend.model.key;

import jakarta.persistence.Embeddable;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@EqualsAndHashCode
@Embeddable
public class AuthorResourceKey {

    private int authorId;

    private int resourceId;
}
