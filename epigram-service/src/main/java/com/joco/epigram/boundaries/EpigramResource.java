package com.joco.epigram.boundaries;

import com.joco.epigram.entities.Epigram;
import com.joco.epigram.entities.NullEpigram;
import com.joco.epigram.usecases.EpigramUsecase;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@Slf4j

public class EpigramResource {
    private final EpigramUsecase epigramUsecase;

    public EpigramResource(EpigramUsecase epigramUsecase) {
        this.epigramUsecase = epigramUsecase;
    }

    @CrossOrigin
    @RequestMapping(value = {"/epigram"}, method = RequestMethod.GET)
    public EpigramResponse getRandomEpigram() {
        Epigram epigram = epigramUsecase.getRandomEpigram();
        if (epigram instanceof NullEpigram) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No epigrams available");
        }
        return convertToResponse(epigramUsecase.getRandomEpigram());
    }

    private EpigramResponse convertToResponse(Epigram epigram) {
        return new EpigramResponse(epigram.getText());
    }

    @RequestMapping(value = {"/epigram"}, method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public void addEpigram(@RequestBody AddEpigramRequest addEpigramRequest) {
        try {
            epigramUsecase.addEpigram(addEpigramRequest.text());
        } catch (IllegalArgumentException ex) {
            log.error("Cannot add epigram:", ex);
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, ex.getMessage());
        }
    }


}
