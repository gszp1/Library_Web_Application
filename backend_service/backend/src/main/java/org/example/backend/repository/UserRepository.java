package org.example.backend.repository;

import org.example.backend.auth.Role;
import org.example.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    @Query("SELECT u FROM User u WHERE LOWER(u.email) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<User> findAllByEmailKeyword(String keyword);

    Optional<User> findByUserId(Integer userId);

    @Query("SELECT COUNT(u) FROM User u WHERE u.role = org.example.backend.auth.Role.USER")
    Long countUsers();

    @Query("SELECT COUNT(u) FROM User u WHERE MONTH(u.joinDate)=:month AND u.role = org.example.backend.auth.Role.USER")
    Long countByRegistrationDateMonth(@Param("month") int month);
}
