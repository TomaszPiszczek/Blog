package com.example.blog.controller.dto;

import java.time.Instant;
import java.util.UUID;

public record PhotoDTO(
        UUID id,
        byte[] imageData,
        Instant createdAt,
        UUID albumId,
        UUID userId
) {
}
