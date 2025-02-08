package com.example.blog.service;

import com.example.blog.controller.dto.PostDTO;
import com.example.blog.controller.dto.PostCreationRequest;
import com.example.blog.dao.model.Photo;
import com.example.blog.dao.model.Post;
import com.example.blog.dao.model.User;
import com.example.blog.dao.repository.PhotoRepository;
import com.example.blog.dao.repository.PostRepository;
import com.example.blog.service.mapper.EntityMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final PhotoRepository photoRepository;
    private final AuthService authService;
    private final EntityMapper entityMapper;

    public List<PostDTO> getAllPosts() {
        return postRepository.findAll().stream()
                .map(entityMapper::toPostDTO)
                .toList();
    }

    public Optional<PostDTO> getPostById(UUID id) {
        return postRepository.findById(id)
                .map(entityMapper::toPostDTO);
    }

    @Transactional
    public PostDTO createPost(UserDetails userDetails, PostCreationRequest request) {
        User user = authService.getAuthenticatedUser(userDetails);
        Photo photo = null;
        if (request.photoId() != null && !request.photoId().isBlank()) {
            UUID photoUUID = UUID.fromString(request.photoId());
            photo = photoRepository.findById(photoUUID)
                    .orElseThrow(() -> new RuntimeException("Photo not found"));
        }
        Post post = Post.builder()
                .user(user)
                .content(request.content())
                .photo(photo)
                .createdAt(Instant.now())
                .build();
        return entityMapper.toPostDTO(postRepository.save(post));
    }

    public void deletePost(UUID id) {
        postRepository.deleteById(id);

    }
}
