package com.hd.student.controller.user;

import com.hd.student.payload.response.SemesterDetailsResponse;
import com.hd.student.payload.response.SemesterUserResponse;
import com.hd.student.payload.response.UserInfoResponse;
import com.hd.student.security.JwtUtils;
import com.hd.student.security.UserPrincipal;
import com.hd.student.service.SemesterDetailService;
import com.hd.student.service.SemesterUserService;
import com.hd.student.service.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@CrossOrigin
@Tag(name = "03. User Information", description = "Thong tin User")
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private AuthenticationManager authenticationManager;


    @Autowired
    private UserService userDetailsService;
    @Autowired
    private SemesterUserService semesterUserService;
    @Autowired
    private SemesterDetailService semesterDetailService;

    @CrossOrigin
    @GetMapping("/info")
    public ResponseEntity<?> getInfo(Principal user){
        UserDetails u = this.userDetailsService.loadUserByUsername(user.getName());
        UserInfoResponse response = userDetailsService.getCurrentUserInfo(u.getUsername());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    @GetMapping("/semester")
    public ResponseEntity<?> getSemester(Authentication auth){
        UserPrincipal u = (UserPrincipal) auth.getPrincipal();
        List<SemesterUserResponse> smt = this.semesterUserService.getSemestersByUserId(u.getId());
        return new ResponseEntity<>(smt, HttpStatus.OK);
    }

    //Thoi khoa bieu tuan cua hoc sinh
    @GetMapping("/semester/{id}/course")
    public ResponseEntity<?> getCourseBySemesterAndUser(Authentication auth, @PathVariable int id){
        UserPrincipal u =(UserPrincipal) auth.getPrincipal();
        List<SemesterDetailsResponse> rp = this.semesterDetailService.getDetails(id);
        return new ResponseEntity<>(rp, HttpStatus.OK);
    }
}
