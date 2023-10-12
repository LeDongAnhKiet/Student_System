package com.hd.student.utils;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

import org.springframework.stereotype.Service;

@Service
public class TwilioUtils {
//    @Value("${twilio.account-sid")
    public static final String ACCOUNT_SID = "";

//    @Value("${twilio.auth-token")
    public static final String AUTH_TOKEN = "";

//    @Value("${twilio.to-phone}")
    public static final String TO_PHONE = "+84931867427";

//    @Value("${twilio.from-phone}")
    public static final String FROM_PHONE = "+12568264993";

    public String sendSMS(String payment){
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        PhoneNumber fromPhone = new PhoneNumber(FROM_PHONE);
        PhoneNumber toPhone = new PhoneNumber(TO_PHONE);

        Message message = Message.creator(toPhone, fromPhone, payment).create();

        return "success";
    }
}
