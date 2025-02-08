package com.example.blog.controller;

import com.example.blog.controller.dto.AlbumDTO;
import com.example.blog.service.AlbumService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/albums")
@RequiredArgsConstructor
@Slf4j
public class AlbumController {

    private final AlbumService albumService;

     @GetMapping("/user")
    public ResponseEntity<List<AlbumDTO>> getUserAlbums(@AuthenticationPrincipal UserDetails userDetails) {
        log.info("Fetching albums for user: {}", userDetails.getUsername());
        return ResponseEntity.ok(albumService.getUserAlbums(userDetails));
    }
    @GetMapping()
    public ResponseEntity<List<AlbumDTO>> getAllAlbums() {
        log.info("Fetching all albums for user ");
        return ResponseEntity.ok(albumService.getAllAlbums());
    }

    @GetMapping("/{albumId}")
    public ResponseEntity<AlbumDTO> getAlbumById(@PathVariable UUID albumId) {
        log.info("Fetching album with ID: {}", albumId);
        return albumService.getAlbumById(albumId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<AlbumDTO> createAlbum(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody String name) {

        log.info("Creating new album for user: {}", userDetails.getUsername());
        return ResponseEntity.ok(albumService.createAlbum(userDetails, name));
    }

    @DeleteMapping("/{albumId}")
    public ResponseEntity<Void> deleteAlbum(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable UUID albumId) {

        log.info("Deleting album: {} by user: {}", albumId, userDetails.getUsername());
        albumService.deleteAlbum(userDetails, albumId);
        return ResponseEntity.noContent().build();
    }
}
