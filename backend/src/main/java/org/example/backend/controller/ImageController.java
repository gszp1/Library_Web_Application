package org.example.backend.controller;
import jakarta.validation.constraints.NotNull;
import org.example.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.net.MalformedURLException;
import java.nio.file.*;

@RestController
@RequestMapping("/api/images")
public class ImageController {

    private final Path imagePath = Paths.get("src/main/resources/static/images/");

    private final Path userImagePath = Paths.get("src/main/resources/static/userImages/");

    private final UserService userService;

    @Autowired
    public ImageController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{filename:.+}")
    public ResponseEntity<Resource> getImage(@PathVariable(name="filename") String filename) {
        try {
            return readImage(filename, imagePath);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/userImage/{filename:.+}")
    public ResponseEntity<Resource> getUserImage(@PathVariable(name = "filename") String filename) {
        try {
            return readImage(filename, userImagePath);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    private ResponseEntity<Resource> readImage(String filename, Path imagePath) throws MalformedURLException {
        Path filePath =imagePath.resolve(filename);
        Resource resource = new UrlResource(filePath.toUri());
        if (resource.exists() || resource.isReadable()) {
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                    .body(resource);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PreAuthorize("hasAuthority('user:update')")
    @PutMapping("/user/{email}/image")
    public ResponseEntity<String> updateImage(
        @PathVariable(name="email") String email,
        @RequestParam("image") MultipartFile image
    ) {
        try {
            if (validateFileType(image) || image.getOriginalFilename() == null) {
                return ResponseEntity.badRequest().body("Invalid data provided.");
            }
            String originalFilename = image.getOriginalFilename();
            int lastDot = originalFilename.lastIndexOf('.');
            String extension = lastDot >= 0 ? originalFilename.substring(lastDot + 1) : "";
            Path targetLocation = userImagePath.resolve(email + '.' + extension);
            Files.copy(image.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            String url = "http://localhost:9090/api/images/userImage/" + email + '.' + extension;
            userService.updateUserImageUrl(email, url);
            return ResponseEntity.ok("Image updated.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Updating image failed.");
        }
    }

    private boolean validateFileType(MultipartFile file) {
        String type = file.getContentType();
        return (type == null || (
                !type.equals(MediaType.IMAGE_JPEG_VALUE) &&
                !type.equals(MediaType.IMAGE_PNG_VALUE) &&
                !type.equals("image/webp")
        ));
    }
}
