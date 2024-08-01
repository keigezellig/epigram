package com.joco.epigram.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@EqualsAndHashCode
public class Epigram {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @NonNull
    private String text;
}
