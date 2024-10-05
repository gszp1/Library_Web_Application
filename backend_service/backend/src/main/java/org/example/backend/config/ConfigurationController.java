package org.example.backend.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/config")
public class ConfigurationController {

    private final ConfigurationService configurationService;

    @Autowired
    public ConfigurationController(
            ConfigurationService configurationService
    ) {
        this.configurationService = configurationService;
    }

    @PostMapping("/database/create")
    public ResponseEntity<String> createDatabase(@RequestParam boolean withData) {
        try {
            if (withData) {
                configurationService.createDatabaseWithExampleData();
            } else {
                configurationService.createEmptyDatabase();
            }
            return ResponseEntity.ok("Database created");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create database");
        }
    }
}
