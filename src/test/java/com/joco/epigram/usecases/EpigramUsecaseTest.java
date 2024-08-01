package com.joco.epigram.usecases;

import com.joco.epigram.entities.Epigram;
import com.joco.epigram.entities.EpigramRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.mockito.MockitoAnnotations.initMocks;

class EpigramUsecaseTest {

    private EpigramUsecase subjectUnderTest;

    @Mock
    private EpigramRepository mockEpigramRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        subjectUnderTest = new EpigramUsecase(mockEpigramRepository);
    }

    @Test
    public void addEpigram_withValidEpigram_savesCorrectly()
    {
        subjectUnderTest.addEpigram("Testing will make you feel better");
        Epigram expectedEpigram = new Epigram(-1, "Testing will make you feel better");

        verify(mockEpigramRepository).save(expectedEpigram);
    }

    @Test
    public void addEpigram_withEmptyEpigramText_throwsException()
    {
        assertThrows(IllegalArgumentException.class, () -> subjectUnderTest.addEpigram(""));

    }
}