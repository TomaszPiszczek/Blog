package com.example.blog.controller;

import com.example.blog.controller.auth.dto.PhotoUploadRequest;
import com.example.blog.controller.dto.PhotoDTO;
import com.example.blog.service.PhotoService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/photos")
@RequiredArgsConstructor
@Slf4j
public class PhotoController {

    private final PhotoService photoService;
    @GetMapping
    public ResponseEntity<List<PhotoDTO>> getPhotosByAlbum(
            @RequestParam UUID albumId) {

        log.info("Fetching photos for album: {} by user: {}");
        return ResponseEntity.ok(photoService.getPhotosByAlbum( albumId));
    }
    @GetMapping("/user")
    public ResponseEntity<List<PhotoDTO>> getPhotosByUser(
            @AuthenticationPrincipal UserDetails userDetails) {

        log.info("Fetching photos for album: {} by user: {}");
        return ResponseEntity.ok(photoService.getPhotosByUser( userDetails));
    }




    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE) // 📌 JSON zamiast `multipart/form-data`
    public ResponseEntity<PhotoDTO> uploadPhoto(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody PhotoUploadRequest request) throws IOException {

        log.info("📸 Uploading photo for user: {}", userDetails.getUsername());
        log.info("📂 Received file name: {}", request.getFileName());
        log.info("📦 Received Base64 data (length): {}", request.getFileData().length());

        return ResponseEntity.ok(photoService.uploadPhoto(userDetails, request));
    }



    @DeleteMapping("/{photoId}")
    public ResponseEntity<Void> deletePhoto(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable UUID photoId) {

        log.info("Deleting photo: {} by user: {}", photoId, userDetails.getUsername());
        photoService.deletePhoto(userDetails, photoId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{photoId}/post/{postId}")
    public ResponseEntity<PhotoDTO> addPhotoToPost(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable UUID photoId,
            @PathVariable UUID postId) {

        log.info("Adding photo: {} to post: {} by user: {}", photoId, postId, userDetails.getUsername());
        return ResponseEntity.ok(photoService.addPhotoToPost(userDetails, postId, photoId));
    }

    @PostMapping("/{photoId}/remove-from-album")
    public ResponseEntity<PhotoDTO> removePhotoFromAlbum(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable UUID photoId) {

        log.info("Removing photo: {} from album by user: {}", photoId, userDetails.getUsername());
        return ResponseEntity.ok(photoService.removePhotoFromAlbum(userDetails, photoId));
    }
}

