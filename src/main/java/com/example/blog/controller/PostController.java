package com.example.blog.controller;

import com.example.blog.controller.dto.PostDTO;
import com.example.blog.service.PostService;
import com.example.blog.controller.dto.PostCreationRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/posts")
@RequiredArgsConstructor
@Slf4j
public class PostController {

    private final PostService postService;

    @GetMapping
    public ResponseEntity<List<PostDTO>> getAllPosts() {
        log.info("Fetching all posts");
        return ResponseEntity.ok(postService.getAllPosts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostDTO> getPostById(@PathVariable UUID id) {
        log.info("Fetching post with ID: {}", id);
        return postService.getPostById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<PostDTO> createPost(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody PostCreationRequest request) {
        log.info("Creating new post for user: {}", userDetails.getUsername());
        return ResponseEntity.ok(postService.createPost(userDetails, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable UUID id) {
        log.info("Deleting post with ID: {}", id);
        postService.deletePost(id);
        return ResponseEntity.noContent().build();
    }
}
