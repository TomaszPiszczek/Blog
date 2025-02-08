package com.example.blog.service.mapper;

import com.example.blog.controller.dto.AlbumDTO;
import com.example.blog.controller.dto.CommentDTO;
import com.example.blog.controller.dto.PhotoDTO;
import com.example.blog.controller.dto.PostDTO;
import com.example.blog.dao.model.*;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
public class EntityMapper {

    public PostDTO toPostDTO(Post post) {
        byte[] photoData = post.getPhoto() != null ? post.getPhoto().getImageData() : null;
        String username = post.getUser() != null ? post.getUser().getUsername() : "Unknown";
        List<CommentDTO> comments = Optional.ofNullable(post.getComments())
                .orElse(Collections.emptyList())
                .stream()
                .map(this::toCommentDTO)
                .collect(Collectors.toList());
        return new PostDTO(post.getId().toString(),post.getContent(), post.getCreatedAt(), photoData, username, comments);
    }

    public CommentDTO toCommentDTO(Comment comment) {
        String username = comment.getUser() != null ? comment.getUser().getUsername() : "Unknown";
        UUID postId = comment.getPost() != null ? comment.getPost().getId() : null;

        return new CommentDTO(comment.getContent(), comment.getCreatedAt(), username, postId);
    }
    public PhotoDTO toPhotoDTO(Photo photo) {
        return new PhotoDTO(
                photo.getId(),
                photo.getImageData(),
                photo.getCreatedAt(),
                photo.getAlbum() != null ? photo.getAlbum().getId() : null,
                photo.getUser().getId()
        );
    }
    public AlbumDTO toAlbumDTO(Album album) {
        return new AlbumDTO(album.getId(), album.getName(), album.getCreatedAt(), album.getUser().getUsername());
    }

}
