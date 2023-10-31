/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nFredes.demojwt.Controller;

import com.nFredes.demojwt.User.User;

import com.nFredes.demojwt.service.UserService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
 @CrossOrigin(origins = "http://localhost:4200")
public class UserController {
       @Autowired
    private UserService userService;
   
    @GetMapping("/traer")
    public List<User> getUser() {
        return userService.getUser();

    }

    @GetMapping("/traer/{id}")
    public User getUserPorId(@PathVariable Integer id) {
        return userService.findUser(id);
    }



    @DeleteMapping("/borrar/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public void deleteUser(@PathVariable Integer id) {
        userService.deleteUser(id);

    }

    @PutMapping("/editar/{id}")
     @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<User> updateUser(@PathVariable Integer id, @RequestBody User user) {
        return userService.updateUser(id, user);
    }
}
