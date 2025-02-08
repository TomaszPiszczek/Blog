package com.example.blog.controller.auth.dto;

import lombok.Data;

@Data
public class PhotoUploadRequest {
    private String albumId;
    private String fileName;
    private String fileData;
}