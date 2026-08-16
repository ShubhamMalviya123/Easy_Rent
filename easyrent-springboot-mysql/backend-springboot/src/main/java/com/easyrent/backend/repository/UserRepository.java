package com.easyrent.backend.repository;

import com.easyrent.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findByEmail(String email);

    List<User> findByUserType(User.UserType userType);

    Optional<User> findByResetPasswordToken(String resetPasswordToken);
}
