package com.hd.student.repository;

import com.hd.student.entity.OnlineService;
import com.hd.student.entity.enums.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Repository
public interface OnlineServiceRepository extends JpaRepository<OnlineService, Integer> {
    List<OnlineService> findByPayment_PaymentStatus(PaymentStatus paymentStatus);
    List<OnlineService> findByServiceCate_Id(Integer id);
    List<OnlineService> findAllByUserId(Integer userId);

    List<OnlineService> findByCreatedDateBetween(LocalDate fromDate, LocalDate toDate);

    List<OnlineService> findByCreatedDateBefore(LocalDate fromDate);

    List<OnlineService> findByCreatedDateAfter(LocalDate fromDate);
}