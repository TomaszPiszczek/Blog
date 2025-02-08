package com.example.blog.service;

import com.example.blog.config.security.JwtUtil;
import com.example.blog.controller.auth.dto.UserLoginDTO;
import com.example.blog.controller.auth.dto.UserRegisterDTO;
import com.example.blog.dao.model.Role;
import com.example.blog.dao.model.User;
import com.example.blog.dao.repository.RoleRepository;
import com.example.blog.dao.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;
    private final BCryptPasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;

    public String register(UserRegisterDTO request) {
        Role userRole = roleRepository.findByName("USER").orElse(null);


        User user = new User();
        user.setUsername(request.username());
        user.setEmail(request.email());
        user.setPassword(passwordEncoder.encode(request.password()));
        user.setRole(userRole);

        userRepository.save(user);
        return jwtUtil.generateToken(user);
    }

    public String login(UserLoginDTO request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email(), request.password())
        );
        User user = userRepository.findByEmail(request.email()).orElseThrow();

        return jwtUtil.generateToken(user);
    }


    public  User getAuthenticatedUser(UserDetails userDetails) {
        return userRepository.findByUsername(userDetails.getUsername()).orElseThrow(()->new EntityNotFoundException("User not authenticated"));
    }
}
