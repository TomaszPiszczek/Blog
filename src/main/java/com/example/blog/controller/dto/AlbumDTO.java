package com.example.blog.controller.dto;

import java.time.Instant;
import java.util.UUID;

public record AlbumDTO(
        UUID id,
        String name,
        Instant createdAt,
        String userName
) {
}
