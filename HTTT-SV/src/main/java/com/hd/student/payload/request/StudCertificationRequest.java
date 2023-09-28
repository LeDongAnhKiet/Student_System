package com.hd.student.payload.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StudCertificationRequest {
    private Integer id;
    private Integer vietCopy;
    private Integer engCopy;
    private String phoneContact;

    private String email;
    private String content;
}