package com.wipro.registervehicle.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.wipro.registervehicle.model.User;


@Repository
public interface UserRepository extends JpaRepository<User, Long> {

	public User findByUsername(String username);

	@Query(value = "SELECT * FROM tb_users u where (u.username = :username AND u.password= :password)", nativeQuery = true)
	public User findUserByUsernameAndPassword(@Param(value = "username") String username,
			@Param(value = "password") String password);

}
