package com.example.blog.controller.dto;

import java.time.Instant;
import java.util.List;

public record PostDTO(
        String uuid,
        String content,
        Instant createdAt,
        byte[] photoData,
        String username,
        List<CommentDTO> comments
) {
}
