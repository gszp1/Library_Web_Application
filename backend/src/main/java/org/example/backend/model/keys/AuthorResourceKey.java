package org.example.backend.model.keys;

import jakarta.persistence.Embeddable;
import lombok.*;
import org.apache.commons.lang3.builder.HashCodeExclude;

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
