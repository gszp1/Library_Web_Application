package org.example.backend.controller;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/images")
public class ImageController {

    private final Path imagePath = Paths.get("src/main/resources/static/images/");

    private final Path userImagePath = Paths.get("src/main/resources/static/userImages/");

    @GetMapping("/{filename:.+}")
    public ResponseEntity<Resource> getImage(@PathVariable(name="filename") String filename) {
        try {
            Path filePath = imagePath.resolve(filename);
            Resource resource = new UrlResource(filePath.toUri());
            if (resource.exists() || resource.isReadable()) {
                return ResponseEntity.ok()
                        .header(
                                HttpHeaders.CONTENT_DISPOSITION,
                                "inline; filename=\"" + resource.getFilename() + "\"")
                        .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            System.out.println("Error reading image file.");
        }
        return ResponseEntity.notFound().build();
    }
}
