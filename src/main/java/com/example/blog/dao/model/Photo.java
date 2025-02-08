package com.example.blog.dao.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;
import java.util.UUID;
@Entity
@Table(name = "photos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Photo {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Lob
    @Column(name = "image_data", nullable = false)
    private byte[] imageData;

    @ManyToOne
    @JoinColumn(name = "album_id", referencedColumnName = "id", nullable = true)
    private Album album;  // ✅ Sprawdzamy relację

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private User user;

    @Column(name = "created_at")
    private Instant createdAt;
}
