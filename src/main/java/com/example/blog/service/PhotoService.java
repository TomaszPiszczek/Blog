package com.example.blog.service;

import com.example.blog.controller.auth.dto.PhotoUploadRequest;
import com.example.blog.controller.dto.PhotoDTO;
import com.example.blog.dao.model.*;
import com.example.blog.dao.repository.*;
import com.example.blog.service.mapper.EntityMapper;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.UUID;
@Slf4j
@Service
@RequiredArgsConstructor
public class PhotoService {

    private final PhotoRepository photoRepository;
    private final AlbumRepository albumRepository;
    private final PostRepository postRepository;
    private final AuthService authService;
    private final EntityMapper entityMapper;
    public List<PhotoDTO> getPhotosByAlbum( UUID albumId) {




        List<Photo> photos = photoRepository.findByAlbumId(albumId);
        return photos.stream().map(entityMapper::toPhotoDTO).toList();
    }


    @Transactional
    public PhotoDTO uploadPhoto(UserDetails userDetails, PhotoUploadRequest request) throws IOException {
        User user = authService.getAuthenticatedUser(userDetails);

        UUID albumId = null;
        if (request.getAlbumId() != null && !request.getAlbumId().isEmpty()) {
            albumId = UUID.fromString(request.getAlbumId());
        }

        Album album = albumId != null
                ? albumRepository.findById(albumId).orElseThrow(() -> new RuntimeException("Album not found"))
                : null;

        if (album != null && !album.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("You can only add photos to your own album");
        }

        byte[] imageBytes = Base64.getDecoder().decode(request.getFileData().split(",")[1]); // 📌 Konwersja Base64 → byte[]

        Photo photo = Photo.builder()
                .user(user)
                .album(album)
                .imageData(imageBytes)
                .createdAt(java.time.Instant.now())
                .build();

        return entityMapper.toPhotoDTO(photoRepository.save(photo));
    }

    @Transactional
    public void deletePhoto(UserDetails userDetails, UUID photoId) {
        Photo photo = photoRepository.findById(photoId)
                .orElseThrow(() -> new RuntimeException("Photo not found"));

        if (!photo.getUser().getId().equals(authService.getAuthenticatedUser(userDetails).getId())) {
            throw new RuntimeException("You can only delete your own photos");
        }
        List<Post> posts = new ArrayList<>();
        posts = postRepository.findAllByPhotoId(photo.getId());

        for (Post post : posts) {
            post.setPhoto(null);
            postRepository.save(post);
        }

        photoRepository.delete(photo);
    }



    public PhotoDTO addPhotoToPost(UserDetails userDetails, UUID postId, UUID photoId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        Photo photo = photoRepository.findById(photoId)
                .orElseThrow(() -> new RuntimeException("Photo not found"));

        if (!photo.getUser().getId().equals(authService.getAuthenticatedUser(userDetails).getId())) {
            throw new RuntimeException("You can only add your own photos to posts");
        }

        post.setPhoto(photo);
        postRepository.save(post);

        return entityMapper.toPhotoDTO(photo);
    }

    public PhotoDTO removePhotoFromAlbum(UserDetails userDetails, UUID photoId) {
        Photo photo = photoRepository.findById(photoId)
                .orElseThrow(() -> new RuntimeException("Photo not found"));

        if (!photo.getUser().getId().equals(authService.getAuthenticatedUser(userDetails).getId())) {
            throw new RuntimeException("You can only remove your own photos from albums");
        }

        photo.setAlbum(null);
        return entityMapper.toPhotoDTO(photoRepository.save(photo));
    }

    public List<PhotoDTO> getPhotosByUser(UserDetails userDetails) {
        User user = authService.getAuthenticatedUser(userDetails);
        List<Photo> photos = photoRepository.findByUserId(user.getId());
        return photos.stream().map(entityMapper::toPhotoDTO).toList();
    }
}
