package com.hd.student.service.impl;

import com.hd.student.configs.VNPayConfig;
import com.hd.student.entity.*;
import com.hd.student.entity.enums.PaymentStatus;
import com.hd.student.entity.enums.ServiceStatus;
import com.hd.student.exception.AccessDeniedException;
import com.hd.student.exception.ResourceExistException;
import com.hd.student.exception.ResourceNotFoundException;
import com.hd.student.payload.response.ApiResponse;
import com.hd.student.payload.response.PaymentResponse;
import com.hd.student.payload.response.TransactionPaymentResponse;
import com.hd.student.repository.OnlineServiceRepository;
import com.hd.student.repository.PaymentRepository;
import com.hd.student.service.PaymentService;
import com.hd.student.utils.TwilioUtils;
import jakarta.servlet.ServletException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Optional;
import java.util.TimeZone;

@Service
@EnableScheduling
public class PaymentServiceImpl implements PaymentService {


    @Autowired
    private OnlineServiceRepository onlineServiceRepository;
    @Autowired
    private com.hd.student.utils.VNPayUtil VNPayUtil;
    @Autowired
    private PaymentRepository paymentRepository;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private TwilioUtils twilioUtils;


    @Override
    public PaymentResponse createPayment(int onlineServiceId, int userId, String url){
        OnlineService onlineService = this.onlineServiceRepository.findById(onlineServiceId)
                .orElseThrow(()-> new ResourceNotFoundException("Không tìm thấy yêu cầu, mã yêu cầu"
                        + onlineServiceId));
        if (!onlineService.getStatus().equals(ServiceStatus.PENDING))
            throw new ResourceExistException("Yêu cầu đang được xử lý");
        Optional<Payment> payment = paymentRepository.findByServiceOnline_Id(onlineServiceId);
        if (payment.isPresent())
            throw new ResourceExistException("Đã có thanh toán, vui lòng kiểm tra tình trạng");

        Payment ps = new Payment();
        ps.setServiceOnline(onlineService);
        ps.setPaymentStatus(PaymentStatus.PENDING);
        if(onlineService.getUser().getId() == userId){
            ps.setCreatedDate(new Date());
            ps.setPrice(onlineService.getPrice());
            ps.setVnpayTxnred(VNPayConfig.getRandomNumber(8));
            String resUrl = "";
            try{
                resUrl = VNPayUtil.CreatePayment(ps, url);
            } catch (UnsupportedEncodingException e) {
                ps.setPaymentStatus(PaymentStatus.CANCEL);
            }
            Payment save = paymentRepository.save(ps);
            PaymentResponse rp = modelMapper.map(save, PaymentResponse.class);
            rp.setUrl(resUrl);
            return rp;
        }
        else throw new AccessDeniedException("Không có quyền làm điều này");
    }

    @Override
    public TransactionPaymentResponse getStatusAfterPay(String amount, String title,
                                                        String date, String success, String IdRef) throws ParseException {
        TransactionPaymentResponse rp = new TransactionPaymentResponse();
        if (success.equals("00")) {
            rp.setStatus("Thành công");
            rp.setMessage("Bạn đã thanh toán thành công yêu cầu này, hãy đợi trường xác nhận yêu cầu");
        } else {
            rp.setStatus("Thất bại");
            rp.setMessage("Có lỗi xảy ra ở yêu cầu này");
        }

        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
        sdf.setTimeZone(TimeZone.getTimeZone("GMT+7"));

        Date newDate = null;
        try {
            newDate = sdf.parse(date);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        rp.setDate(newDate);
        rp.setTitle(title);
        rp.setAmount(Double.parseDouble(amount) / 100);

        String paymentMessage = "Bạn đã thanh toán " + rp.getStatus() + "\n" +
                "Ngày thực hiện thanh toán: " + rp.getDate() + "\n" + "Số tiền: " +
                rp.getAmount();
        this.twilioUtils.sendSMS(paymentMessage);
        return rp;

    }

    @Override
    public PaymentResponse getFromOnlineServiceId(String username, int onlineServiceId) {
        Payment payment = paymentRepository.findByServiceOnline_Id(onlineServiceId).orElseThrow(()
                -> new ResourceNotFoundException("Không tìm thấy thanh toán của yêu cầu này, mã yêu cầu"+ onlineServiceId));
        String userOfPayment = payment.getServiceOnline().getUser().getEmail();
        if (username.equals(userOfPayment))
            return modelMapper.map(payment, PaymentResponse.class);
        throw new ResourceNotFoundException("Không tìm thấy thanh toán của yêu cầu này" + onlineServiceId);
    }

    @Override
    public ApiResponse verifyPayment(String username, int onlineServiceId) {
        Payment payment = paymentRepository.findByServiceOnline_Id(onlineServiceId).orElseThrow(()
                -> new ResourceNotFoundException("Không tồn tại giao dịch"));
        String userOfPayment = payment.getServiceOnline().getUser().getEmail();
        if (username.equals(userOfPayment)) {
            if (payment.getPaymentStatus() != PaymentStatus.PENDING)
                return new ApiResponse("Hóa đơn đã được thanh toán hoặc đã bị trì hoãn", true);

            try {
                Integer paid = VNPayUtil.querydrPayment(payment);

                if (paid == 0) {
                    payment.setPaymentStatus(PaymentStatus.PAID);
                    this.paymentRepository.save(payment);
                    return new ApiResponse("Bạn đã thanh toán xong dịch vụ.", true);
                } else if (paid == 2) {
                    payment.setPaymentStatus(PaymentStatus.CANCEL);
                    this.paymentRepository.save(payment);
                    return new ApiResponse("Yêu cầu đã bị hủy", true);
                }

                return new ApiResponse("Ticket is pending", true);
            } catch (RuntimeException | ServletException | IOException e) {
                e.printStackTrace();
            }
        }

        throw new ResourceNotFoundException("Không tìm thấy kết quả, thử lại sau");
    }
}
