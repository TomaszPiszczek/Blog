package com.example.blog.controller.dto;

import java.time.Instant;
import java.util.UUID;

public record CommentDTO(String content, Instant createdAt, String username, UUID postId) {
}
