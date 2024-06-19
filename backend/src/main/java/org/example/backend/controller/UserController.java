package org.example.backend.controller;

import org.example.backend.dto.AdminUserDto;
import org.example.backend.dto.UserDto;
import org.example.backend.service.UserService;
import org.example.backend.util.exception.NoSuchUserException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
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

    @PreAuthorize("hasAuthority('admin:read')")
    @GetMapping("/all")
    public ResponseEntity<List<AdminUserDto>> getAllUsersByEmailKeyword(@RequestParam(required = false) String keyword) {
        if (keyword == null || keyword.isEmpty()) {
            return ResponseEntity.ok(userService.findAll());
        } else {
            return ResponseEntity.ok(userService.findAllByEmailKeyword(keyword));
        }
    }

    @PreAuthorize("hasAuthority('admin:read')")
    @GetMapping("/{id}")
    public ResponseEntity<AdminUserDto> getUserById(@PathVariable Integer id) {
        return ResponseEntity.ok(userService.findById(id));
    }

    @PreAuthorize("hasAuthority('admin:update')")
    @PutMapping("/admin/update")
    public ResponseEntity<String> updateUser(@RequestBody AdminUserDto userDto) {
        try {
            userService.updateUser(userDto);
            return ResponseEntity.ok("User updated successfully");
        } catch (NoSuchUserException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
