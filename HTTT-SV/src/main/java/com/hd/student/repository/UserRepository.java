package com.hd.student.repository;

import com.hd.student.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    List<User> findByMajor_Id(Integer id);
    Optional<User> findByEmail(String email);
}