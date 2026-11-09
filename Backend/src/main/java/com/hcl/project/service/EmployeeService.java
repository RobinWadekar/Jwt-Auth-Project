package com.hcl.project.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hcl.project.entity.Employee;
import com.hcl.project.entity.Role;
import com.hcl.project.repository.EmployeeRepository;
import com.hcl.project.security.JwtUtil;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository empRepo;

    @Autowired
    private JwtUtil jwtUtil;

    public Map<String, Object> registerEmp(Employee emp) {
        Map<String, Object> mp;
        if (empRepo.existsByUserName(emp.getUserName())) {
            Employee savedEmp = empRepo.findByUserName(emp.getUserName()).get();
            mp = new ObjectMapper().convertValue(savedEmp, Map.class);
        } else {
            mp = new ObjectMapper().convertValue(empRepo.save(emp), Map.class);
        }
        mp.put("token", jwtUtil.generateToken(emp.getUserName(), emp.getRole().toString()));
        return mp;
    }

    public List<Employee> findAllByRole(Role role) {
        return empRepo.findAllByRole(role);
    }

    public Optional<Employee> getEmpByUsername(String userName) {
        return empRepo.findByUserName(userName);
    }

}
