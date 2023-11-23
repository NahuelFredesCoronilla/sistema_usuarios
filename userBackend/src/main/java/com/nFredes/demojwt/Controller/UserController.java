/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nFredes.demojwt.Controller;

import com.nFredes.demojwt.Auth.AuthService;
import com.nFredes.demojwt.Model.User;

import com.nFredes.demojwt.service.UserService;
import java.util.List;
import java.util.NoSuchElementException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
       @Autowired
    private AuthService authService;
   
      @GetMapping("/traer")
    public ResponseEntity<List<User>> getUser() {
        try {
            List<User> users = userService.getUser();
            return new ResponseEntity<>(users, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

     @GetMapping("/traer/{id}")
    public ResponseEntity<User> getUserPorId(@PathVariable Integer id) {
        try {
            User user = userService.findUser(id);
            return new ResponseEntity<>(user, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    @DeleteMapping("/borrar/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public void deleteUser(@PathVariable Integer id) {
        
        userService.deleteUser(id);

    }

   @PutMapping("/editar/{id}")
@PreAuthorize("hasAuthority('ADMIN')")
public ResponseEntity<User> updateUser(@PathVariable Integer id, @RequestBody User user) {
    try {
        return userService.updateUser(id, user);
    } catch (NoSuchElementException e) {
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    } catch (Exception e) {
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

    //editar usuario logueado
    
    
     @GetMapping("/current-id")
     @PreAuthorize("isAuthenticated()")
    public Integer getCurrentUserId() {
        // Obtener el ID del usuario autenticado
        return authService.getCurrentUserId();
    }
    

@PutMapping("/edita/current")
@PreAuthorize("isAuthenticated()")
public ResponseEntity<User> updateCurrentUser(@RequestBody User user) {
    // Obtén el ID del usuario autenticado
    Integer currentUserId = Integer.valueOf(authService.getCurrentUserId());
    
    if(currentUserId.equals(user.getId())){
        // Actualiza el usuario actual
    return userService.updateUser(currentUserId, user);
    }else{
        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }
    
    
}

}
