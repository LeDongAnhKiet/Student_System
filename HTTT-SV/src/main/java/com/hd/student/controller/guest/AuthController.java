package com.hd.student.controller.guest;

import com.hd.student.entity.User;
import com.hd.student.payload.request.LoginRequest;
import com.hd.student.payload.response.MessageResponse;
import com.hd.student.security.JwtUtils;
import com.hd.student.security.UserPrincipal;
import com.hd.student.service.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin
@Tag(name = "01. Authentication", description = "Authentication")
@RequestMapping("/api/guest/auth/")
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private UserService userDetailsService;


    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody User user) {
        this.userDetailsService.saveUser(user);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }


    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest rq) {

        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(rq.getEmail(), rq.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserPrincipal u = (UserPrincipal) authentication.getPrincipal();
        if(u.getUsername() != null) {
            String jwtCookie = jwtUtils.generateTokenLogin(u.getEmail());
            return new ResponseEntity<>(jwtCookie, HttpStatus.OK);
        }
        return new ResponseEntity<>("error", HttpStatus.BAD_REQUEST);
    }
}
