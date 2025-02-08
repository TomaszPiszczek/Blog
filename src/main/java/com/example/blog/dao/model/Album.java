package com.example.blog.dao.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "albums")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Album {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @OneToMany(mappedBy = "album", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Photo> photos;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, updatable = false)
    private Instant createdAt = Instant.now();
}
