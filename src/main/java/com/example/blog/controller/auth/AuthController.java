package com.example.blog.controller.auth;

import com.example.blog.controller.auth.dto.UserLoginDTO;
import com.example.blog.controller.auth.dto.UserRegisterDTO;
import com.example.blog.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthController {

    private final AuthService userService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody UserRegisterDTO request) {
        log.info("User registration request for email: {}", request.email());
        return ResponseEntity.ok(userService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UserLoginDTO request) {
        log.info("User login request for email: {}", request.email());
        return ResponseEntity.ok(userService.login(request));
    }
}
