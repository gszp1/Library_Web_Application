package org.example.backend.controller;

import org.example.backend.dto.UserDto;
import org.example.backend.service.UserService;
import org.example.backend.util.exception.NoSuchUserException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Controller
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PreAuthorize("hasAuthority('user:read')")
    @GetMapping("/{email}/credentials")
    public ResponseEntity<UserDto> getUserByEmail(@PathVariable String email) {
        Optional<UserDto> user = userService.getUserCredentials(email);
        return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PreAuthorize("hasAuthority('user:update')")
    @PutMapping ("/update")
    public ResponseEntity<String> updateUserCredentials(@RequestBody UserDto userDto) {
        try {
            userService.updateUserCredentials(userDto);
            return ResponseEntity.ok("User updated successfully");
        } catch (NoSuchUserException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
