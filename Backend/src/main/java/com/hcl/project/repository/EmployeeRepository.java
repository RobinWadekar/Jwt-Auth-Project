package com.hcl.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hcl.project.entity.Employee;
import com.hcl.project.entity.Role;

import java.util.List;
import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    public boolean existsByUserName(String userName);

    public Optional<Employee> findByUserName(String userName);

    public List<Employee> findAllByRole(Role role);
}
