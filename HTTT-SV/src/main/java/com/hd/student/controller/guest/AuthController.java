package com.hd.student.controller.guest;

import com.hd.student.entity.User;
import com.hd.student.payload.request.LoginRequest;
import com.hd.student.payload.response.MessageResponse;
import com.hd.student.security.JwtUtils;
import com.hd.student.security.UserPrincipal;
import com.hd.student.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
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
@RequestMapping("/api/auth/")
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
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        this.userDetailsService.saveUser(user);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }
    @PostMapping(value = "/signout")
    public ResponseEntity<?> logoutUser() {
        ResponseCookie cookie = jwtUtils.getCleanJwtCookie();
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(new MessageResponse("You've been signed out!"));
    }


    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest rq) {

        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(rq.getEmail(), rq.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserPrincipal u = (UserPrincipal) authentication.getPrincipal();

        ResponseCookie jwtCookie = jwtUtils.generateJwtCookie(u);

        Map<String, String> responseBody = new HashMap<>();
        responseBody.put("email", u.getUsername());
        responseBody.put("role", u.getAuthorities().toString());

        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
                .body(responseBody);
    }
}
