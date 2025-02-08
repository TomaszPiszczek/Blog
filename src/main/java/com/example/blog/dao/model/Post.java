package com.example.blog.dao.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "posts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "photo_id", referencedColumnName = "id")
    private Photo photo;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments;

    @Column(nullable = false, updatable = false)
    private Instant createdAt = Instant.now();
}
