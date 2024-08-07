package com.joco.epigram;

import com.joco.epigram.usecases.EpigramUsecase;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class DbInit {

    private final EpigramUsecase epigramUsecase;

    public DbInit(EpigramUsecase epigramUsecase) {
        this.epigramUsecase = epigramUsecase;
    }

    //This is executed after all dependencies are registered in the DI container and are thus available to the application
    @PostConstruct
    private void addSampleData() {
        log.info("Adding sample epigrams");
        epigramUsecase.addEpigram("Beware of a dark-haired man with a loud tie.");
        epigramUsecase.addEpigram("Beware of a tall black man with one blond shoe.");
        epigramUsecase.addEpigram("Beware of a tall blond man with one black shoe.");
        epigramUsecase.addEpigram("Beware of Bigfoot!");
        epigramUsecase.addEpigram("Beware of low-flying butterflies.");
        epigramUsecase.addEpigram("Beware the one behind you.");
        epigramUsecase.addEpigram("Blow it out your ear.");
        epigramUsecase.addEpigram("Break into jail and claim police brutality.");
        epigramUsecase.addEpigram("Bridge ahead.  Pay troll.");
        epigramUsecase.addEpigram("Caution: breathing may be hazardous to your health.");
        epigramUsecase.addEpigram("Caution: Keep out of reach of children.");
        epigramUsecase.addEpigram("Celebrate Hannibal Day this year.  Take an elephant to lunch.");
        epigramUsecase.addEpigram("Change your thoughts and you change your world.");
        epigramUsecase.addEpigram("Cheer Up!  Things are getting worse at a slower rate.");
        epigramUsecase.addEpigram("Chess tonight.");
        epigramUsecase.addEpigram("Communicate!  It can't make things any worse.");
        epigramUsecase.addEpigram("Courage is your greatest present need.");
    }


}
