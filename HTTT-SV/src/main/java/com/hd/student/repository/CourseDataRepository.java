package com.hd.student.repository;

import com.hd.student.entity.CourseData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseDataRepository extends JpaRepository<CourseData, Integer> {
    List<CourseData> findByCourse_CourseNameContainsIgnoreCase(String courseName);
}