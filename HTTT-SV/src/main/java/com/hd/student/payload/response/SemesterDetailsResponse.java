package com.hd.student.payload.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SemesterDetailsResponse {
    private Integer id;
    private Double score;

    private Boolean isPassed;

    private Set<CourseDatumResponse> courseData;
}
