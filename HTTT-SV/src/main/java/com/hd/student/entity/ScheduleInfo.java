package com.hd.student.entity;

import com.hd.student.entity.enums.Weekdays;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@Table(name = "schedule_info")
public class ScheduleInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "schedule_info_id", nullable = false)
    private Integer id;

    @Column(name = "weekdays", length = 45)
    @Enumerated(EnumType.STRING)
    private Weekdays weekdays;

    @Column(name = "start_at")
    private Integer startAt;

    @Column(name = "end_at")
    private Integer endAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "study_room")
    private StudyRoom studyRoom;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_data_id")
    private CourseData courseData;

}