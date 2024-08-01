package com.joco.epigram.usecases;

import com.joco.epigram.entities.Epigram;
import com.joco.epigram.entities.EpigramRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class EpigramUsecase {
    private final EpigramRepository epigramRepository;

    public EpigramUsecase(EpigramRepository repository) {
        this.epigramRepository = repository;
    }

    public void addEpigram(String epigramText) {
        if (epigramText.isEmpty()) {
            throw new IllegalArgumentException("Epigram text cannot be empty");
        }
        this.epigramRepository.save(new Epigram(-1, epigramText));
    }
}
