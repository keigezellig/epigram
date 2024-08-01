package com.joco.epigram.entities;

import org.springframework.data.repository.Repository;

import java.util.Optional;

public interface EpigramRepository extends Repository<Epigram, Long> {
    Epigram save(Epigram epigram);

    Optional<Epigram> findById(long id);
}
