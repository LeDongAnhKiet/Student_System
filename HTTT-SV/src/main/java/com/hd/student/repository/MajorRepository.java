package com.hd.student.repository;

import com.hd.student.entity.Major;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MajorRepository extends JpaRepository<Major, Integer> {
    Major findMajorById(Integer id);
}