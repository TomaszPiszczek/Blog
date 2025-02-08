package com.example.blog.service;

import com.example.blog.controller.dto.AlbumDTO;
import com.example.blog.dao.model.Album;
import com.example.blog.dao.model.Photo;
import com.example.blog.dao.model.Post;
import com.example.blog.dao.model.User;
import com.example.blog.dao.repository.AlbumRepository;
import com.example.blog.dao.repository.PostRepository;
import com.example.blog.service.mapper.EntityMapper;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AlbumService {

    private final AlbumRepository albumRepository;
    private final AuthService authService;
    private final EntityMapper entityMapper;
    private final PostRepository postRepository;

    public List<AlbumDTO> getUserAlbums(UserDetails userDetails) {
        User user = authService.getAuthenticatedUser(userDetails);

        return albumRepository.findByUserId(user.getId())
                .stream()
                .map(entityMapper::toAlbumDTO)
                .toList();
    }
    public List<AlbumDTO> getAllAlbums() {

        return albumRepository.findAll()
                .stream()
                .map(entityMapper::toAlbumDTO)
                .toList();
    }

    public Optional<AlbumDTO> getAlbumById(UUID albumId) {
        return albumRepository.findById(albumId)
                .map(entityMapper::toAlbumDTO);
    }

    public AlbumDTO createAlbum(UserDetails userDetails, String name) {
        User user = authService.getAuthenticatedUser(userDetails);


        Album album = Album.builder()
                .user(user)
                .name(name)
                .createdAt(java.time.Instant.now())
                .build();

        return entityMapper.toAlbumDTO(albumRepository.save(album));
    }
    @Transactional
    public void deleteAlbum(UserDetails userDetails, UUID albumId) {
        Album album = albumRepository.findById(albumId)
                .orElseThrow(() -> new RuntimeException("Album not found"));

        if (!album.getUser().getId().equals(authService.getAuthenticatedUser(userDetails).getId())) {
            throw new RuntimeException("You can only delete your own albums");
        }

        for (Photo photo : album.getPhotos()) {
            postRepository.findAllByPhotoId(photo.getId()).forEach(post -> {
                post.setPhoto(null);
                postRepository.save(post);
            });
        }

        albumRepository.delete(album);
    }

}
