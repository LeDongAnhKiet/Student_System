package com.hd.student.controller.user;

import com.hd.student.exception.UnauthorizedException;
import com.hd.student.payload.response.PaymentResponse;
import com.hd.student.security.UserPrincipal;
import com.hd.student.service.PaymentService;
import com.hd.student.service.impl.PaymentServiceImpl;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.text.ParseException;

@RestController
@RequestMapping("/api/user/payment")
@Tag(name = "05. Thanh toán", description = "Thanh toán dịch vụ")
@CrossOrigin
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping ("/create-payment/{onlineServiceId}")
    public ResponseEntity<?> createPayment(@PathVariable int onlineServiceId, Authentication auth, HttpServletRequest rq){
        UserPrincipal u = (UserPrincipal) auth.getPrincipal();
        PaymentResponse rp =  this.paymentService
                .createPayment(onlineServiceId, u.getId(), "13.160.92.202");
        // servletRequest.getRemoteAddr()

        return ResponseEntity.ok(rp);

    }
    @PreAuthorize("permitAll()")
    @GetMapping("/payment-status")
    public ResponseEntity<?> getPaymentInfo(
            @RequestParam(value = "vnp_Amount", required = false) String amount,
            @RequestParam(value = "vnp_OrderInfo", required = false) String title,
            @RequestParam(value = "vnp_TxnRef", required = false) String IdRef,
            @RequestParam(value = "vnp_PayDate", required = false) String date,
            @RequestParam(value = "vnp_TransactionStatus", required = false) String success) throws ParseException {
        return ResponseEntity.ok(this.paymentService.getStatusAfterPay(amount, title, date, success, IdRef));
    }

    @GetMapping("/get/{onlineServiceId}")
    public ResponseEntity<?> getPaymentInfor(Authentication auth, @PathVariable int onlineServiceId){
        String username = auth.getName();
        return ResponseEntity.ok(this.paymentService.getFromOnlineServiceId(username,onlineServiceId));
    }

    @GetMapping("/verify/{onlineServiceId}")
    public ResponseEntity<?> verifyPaymentById(Principal principal, @PathVariable int onlineServiceId) {
        return ResponseEntity.ok().body(paymentService.verifyPayment(principal.getName(), onlineServiceId));
    }
}
