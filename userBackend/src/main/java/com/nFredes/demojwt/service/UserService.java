
package com.nFredes.demojwt.service;

import com.nFredes.demojwt.User.User;
import com.nFredes.demojwt.repository.UserRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    
@Autowired
    private UserRepository userRepository;
    
   
    public List<User> getUser() {
    List <User> UserList= userRepository.findAll();
    return UserList;
    }

    
    public void deleteUser(Integer id) {
      userRepository.deleteById(id);
    }

    
    public User findUser(Integer id) {
    User usuario = userRepository.findById(id).orElse(null);
    return usuario;
    }

    public ResponseEntity<User> updateUser(Integer id, User updatedUser) {
        if (userRepository.existsById(id)) {
            User existingUser = userRepository.findById(id).get();

            // Actualiza los campos necesarios
            existingUser.setUsername(updatedUser.getUsername());
            existingUser.setLastname(updatedUser.getLastname());
            existingUser.setFirstname(updatedUser.getFirstname());
            existingUser.setCreationDate(updatedUser.getCreationDate());
            existingUser.setRole(updatedUser.getRole());

            // comprobar si la contraseña debe actualizarse
            if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
                String encodedPassword = encodePassword(updatedUser.getPassword());
                existingUser.setPassword(encodedPassword);
            }

            //guardar en la base de datos
            User savedUser = userRepository.save(existingUser);

            return ResponseEntity.ok(savedUser);
        } else {
            return ResponseEntity.notFound().build();
        }    
    }
    
    //codificar la contraseña
    private String encodePassword(String password) {
        return new BCryptPasswordEncoder().encode(password);
    }
}


   
