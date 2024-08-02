package com.joco.epigram.usecases;

import com.joco.epigram.entities.Epigram;
import com.joco.epigram.entities.EpigramRepository;
import com.joco.epigram.entities.NullEpigram;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

import java.util.ArrayList;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

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
    public void addEpigram_withValidEpigram_savesCorrectly() {
        subjectUnderTest.addEpigram("Testing will make you feel better");
        Epigram expectedEpigram = new Epigram(0, "Testing will make you feel better");

        verify(mockEpigramRepository).save(expectedEpigram);
    }

    @Test
    public void addEpigram_withEmptyEpigramText_throwsException() {
        assertThrows(IllegalArgumentException.class, () -> subjectUnderTest.addEpigram(""));
    }

    @Test
    public void getRandomEpigram_withNoEpigrams_returnsNullEpigram() {
        when(mockEpigramRepository.findAll(any(PageRequest.class))).thenReturn(new PageImpl<>(new ArrayList<>()));
        Epigram expectedEpigram = new NullEpigram();
        Epigram actualEpigram = subjectUnderTest.getRandomEpigram();

        assertThat(actualEpigram, is(expectedEpigram));

    }
}