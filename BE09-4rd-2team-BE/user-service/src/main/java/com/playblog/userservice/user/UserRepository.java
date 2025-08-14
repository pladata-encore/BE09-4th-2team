package com.playblog.userservice.user;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

  Optional<User> findByEmailId(String emailId);

  boolean existsByEmailId(String emailId);
}
