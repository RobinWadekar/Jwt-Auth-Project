package com.hcl.project.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.hcl.project.entity.Employee;
import com.hcl.project.entity.Role;
import com.hcl.project.service.EmployeeService;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
public class EmployeeController {

    @Autowired
    private EmployeeService empService;

    @GetMapping("/check")
    private ResponseEntity<String> serverCheck() {
        return ResponseEntity.ok("Employee Service is up and running");
    }

    @PostMapping("/registerEmployee")
    public ResponseEntity<Map<String, Object>> registerEmp(@RequestBody Employee emp) {
        return new ResponseEntity<>(empService.registerEmp(emp), HttpStatus.valueOf(201));
    }

    @GetMapping("/ceo-page")
    public ResponseEntity<String> ceoPage() {
        return new ResponseEntity<>("This is a CEO's Page and is highly restricted", HttpStatus.OK);
    }

    @GetMapping("/hr-page")
    public ResponseEntity<String> hrPage() {
        return new ResponseEntity<>("This is a HR's Page and is highly restricted", HttpStatus.OK);
    }

    @GetMapping("/manager-page")
    public ResponseEntity<String> managerPage() {
        return new ResponseEntity<>("This is a Manager's Page and is highly restricted", HttpStatus.OK);
    }

    @GetMapping("/emp-page")
    public ResponseEntity<String> empPage() {
        return new ResponseEntity<>("This is an Employee's Page and is highly restricted", HttpStatus.OK);
    }

    @GetMapping("/getAllEmpsByRole/{role}")
    public ResponseEntity<List<Employee>> findAllByRole(@PathVariable String role) {
        try {
            Role parsedRole = Role.valueOf(role.toUpperCase());
            return ResponseEntity.ok(empService.findAllByRole(parsedRole));
        } catch (Exception e) {
            System.out.println("\n\nAn Error occurred. Here are the details : " + e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/getEmpByUsername/{userName}")
    public ResponseEntity<Employee> getMethodName(@PathVariable String userName) {
        try {
            return empService.getEmpByUsername(userName)
                    .map(ResponseEntity::ok)
                    .orElseThrow(() -> new Exception("Employee not found"));
        } catch (Exception e) {
            System.out.println("\n\nAn Error occurred. Here are the details : " + e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

}
