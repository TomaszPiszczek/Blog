package com.example.blog.dao.repository;


import com.example.blog.dao.model.Album;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;
@Repository
public interface AlbumRepository extends JpaRepository<Album, UUID> {
    List<Album> findByUserId(UUID userId);
}
