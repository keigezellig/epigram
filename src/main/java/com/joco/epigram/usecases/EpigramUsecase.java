package com.joco.epigram.usecases;

import com.joco.epigram.entities.Epigram;
import com.joco.epigram.entities.EpigramRepository;
import com.joco.epigram.entities.NullEpigram;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Component;

import java.util.Random;

@Component
@Slf4j
public class EpigramUsecase {
    private final EpigramRepository epigramRepository;
    private final Random randomGenerator    ;

    public EpigramUsecase(EpigramRepository repository) {
        this.epigramRepository = repository;
        this.randomGenerator = new Random();
    }

    public void addEpigram(String epigramText) {
        if (epigramText.isEmpty()) {
            throw new IllegalArgumentException("Epigram text cannot be empty");
        }
        this.epigramRepository.save(new Epigram(0, epigramText));
    }

    public Epigram getRandomEpigram() {

        int epigramCount = (int)epigramRepository.count();
        if (epigramCount < 1) {
            return new NullEpigram();
        }

        int randomIndex = this.randomGenerator.nextInt(epigramCount);
        Page<Epigram> epigramPage = epigramRepository.findAll(PageRequest.of(randomIndex, 1));
        return epigramPage.getContent().getFirst();

    }
}
