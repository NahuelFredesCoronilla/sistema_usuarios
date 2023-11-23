package com.nFredes.demojwt.Controller;

import com.nFredes.demojwt.Model.Maquinaria;
import com.nFredes.demojwt.service.MaquinariaService;
import java.util.List;
import java.util.NoSuchElementException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/maquinaria")
public class MaquinariaController {

    @Autowired
    private MaquinariaService maquinariaService;

    @GetMapping("/traer")
    public ResponseEntity<List<Maquinaria>> getMaquinaria() {
        try {
            List<Maquinaria> listmaq = maquinariaService.getMaquinaria();
            return new ResponseEntity<>(listmaq, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/traer/{id}")
    public ResponseEntity<Maquinaria> getMaquinariaPorId(@PathVariable Long id) {
        try {
            Maquinaria maquinaria = maquinariaService.findMaquinaria(id);
            return new ResponseEntity<>(maquinaria, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/borrar/{id}")
    public void deleteMaquinaria(@PathVariable Long id) {
        maquinariaService.deleteMaquinaria(id);
    }
   
    @PostMapping("/crear")
    public ResponseEntity<Maquinaria> createMaquinaria(@RequestBody Maquinaria nuevaMaquinaria) {
        try {
            Maquinaria maquinariaCreada = maquinariaService.createMaquinaria(nuevaMaquinaria);
            return new ResponseEntity<>(maquinariaCreada, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/editar/{id}")
    public ResponseEntity<Maquinaria> editarMaquinaria(@PathVariable Long id, @RequestBody Maquinaria maquinaria) {
        try {
            Maquinaria maquinariaActualizada = maquinariaService.updateMaquinaria(id, maquinaria);

            if (maquinariaActualizada != null) {
                return new ResponseEntity<>(maquinariaActualizada, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
