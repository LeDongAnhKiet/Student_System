package com.hd.student.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "course")
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "course_id", nullable = false)
    private Integer id;

    @Column(name = "course_name", length = 45)
    private String courseName;

    @Column(name = "credits_num")
    private Integer creditsNum;

    @Column(name = "note", length = 45)
    private String note;

    @OneToMany(mappedBy = "course")
    private Set<CourseData> courseData = new LinkedHashSet<>();

}