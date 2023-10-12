package com.hd.student.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "semester_details")
public class SemesterDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "semester_details_id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "semester_user_id")
    private SemesterUser semesterUser;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_data_id")
    private CourseData courseData;

    @Column(name = "score")
    private Double score;

    @Column(name = "is_passed")
    private Boolean isPassed;

}