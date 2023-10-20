package com.hd.student.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "course_data")
public class CourseData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "course_data_id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id")
    private Course course;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lecture_id")
    private Lecture lecture;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @Column(name = "is_ended")
    private Boolean isEnded;

    @OneToMany(mappedBy = "courseData")
    private Set<SemesterDetail> semesterDetails = new LinkedHashSet<>();

//    public void addScheduleInfo(ScheduleInfo scheduleInfo) {
//        this.scheduleInfos.add(scheduleInfo);
//        scheduleInfo.setCourseData(this);
//    }

}