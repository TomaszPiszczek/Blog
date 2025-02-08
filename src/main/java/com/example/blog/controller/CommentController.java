package com.example.blog.controller;

import com.example.blog.controller.dto.CommentDTO;
import com.example.blog.service.CommentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/comments")
@RequiredArgsConstructor
@Slf4j
public class CommentController {

    private final CommentService commentService;

    @GetMapping("/{postId}")
    public ResponseEntity<List<CommentDTO>> getCommentsByPost(@PathVariable UUID postId) {
        log.info("Fetching comments for post: {}", postId);
        return ResponseEntity.ok(commentService.getCommentsByPost(postId));
    }

    @PostMapping
    public ResponseEntity<CommentDTO> addComment(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody CommentDTO request) {

        log.info("Adding comment to post: {} by user: {}", request.postId(), userDetails.getUsername());
        return ResponseEntity.ok(commentService.addComment(userDetails, request));
    }

    @PutMapping("/{commentId}")
    public ResponseEntity<CommentDTO> editComment(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable UUID commentId,
            @RequestBody String newContent) {

        log.info("Editing comment: {} by user: {}", commentId, userDetails.getUsername());
        return ResponseEntity.ok(commentService.editComment(userDetails, commentId, newContent));
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<Void> deleteComment(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable UUID commentId) {

        log.info("Deleting comment: {} by user: {}", commentId, userDetails.getUsername());
        commentService.deleteComment(userDetails, commentId);
        return ResponseEntity.noContent().build();
    }
}
