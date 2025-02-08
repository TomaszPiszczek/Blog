package com.example.blog.dao.repository;


import com.example.blog.dao.model.Photo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface PhotoRepository extends JpaRepository<Photo, UUID> {
    List<Photo> findByUserId(UUID userId);
    List<Photo> findByAlbumId(UUID albumId);
}
