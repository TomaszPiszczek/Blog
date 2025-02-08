package com.example.blog.dao.repository;


import com.example.blog.dao.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
@Repository
public interface PostRepository extends JpaRepository<Post, UUID> {
    List<Post> findByUserId(UUID userId);
    Optional<Post> findByPhotoId(UUID photoId);
    List<Post> findAllByPhotoId(UUID photoId);

}

