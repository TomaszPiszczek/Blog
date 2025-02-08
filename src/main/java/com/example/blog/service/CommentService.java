package com.example.blog.service;

import com.example.blog.controller.dto.CommentDTO;
import com.example.blog.dao.model.Comment;
import com.example.blog.dao.model.Post;
import com.example.blog.dao.model.User;
import com.example.blog.dao.repository.CommentRepository;
import com.example.blog.dao.repository.PostRepository;
import com.example.blog.service.mapper.EntityMapper;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final PostRepository postRepository;
    private final AuthService authService;
    private final EntityMapper entityMapper;

    public List<CommentDTO> getCommentsByPost(UUID postId) {
        return commentRepository.findByPostId(postId)
                .stream()
                .map(entityMapper::toCommentDTO)
                .toList();
    }

    public CommentDTO addComment(UserDetails userDetails, CommentDTO request) {
        User user = authService.getAuthenticatedUser(userDetails);

        Post post = postRepository.findById(request.postId())
                .orElseThrow(() -> new EntityNotFoundException("Post not found"));

        Comment comment = Comment.builder()
                .post(post)
                .user(user)
                .content(request.content())
                .createdAt(Instant.now())
                .build();

        return entityMapper.toCommentDTO(commentRepository.save(comment));
    }

    public CommentDTO editComment(UserDetails userDetails, UUID commentId, String newContent) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new EntityNotFoundException("Comment not found"));

        if (!comment.getUser().getUsername().equals(userDetails.getUsername())) {
            throw new RuntimeException("You can only edit your own comments");
        }

        comment.setContent(newContent);
        return entityMapper.toCommentDTO(commentRepository.save(comment));
    }

    public void deleteComment(UserDetails userDetails, UUID commentId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Comment not found"));

        if (!comment.getUser().getUsername().equals(userDetails.getUsername())) {
            throw new RuntimeException("You can only delete your own comments");
        }

        commentRepository.delete(comment);
    }
}
