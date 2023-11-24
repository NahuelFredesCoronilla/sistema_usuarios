/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nFredes.demojwt.Controller;

import com.nFredes.demojwt.Model.FileEntity;
import com.nFredes.demojwt.response.ResponseFile;
import com.nFredes.demojwt.response.ResponseMessage;
import com.nFredes.demojwt.service.FileService;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.List;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/fileManager")
public class FileController {

    @Autowired
    private FileService fileService;

    @PostMapping("/uploadWithAlquiler")
    public ResponseEntity<ResponseMessage> uploadFileWithAlquiler(
            @RequestParam("file") MultipartFile file,
            @RequestParam("alquilerId") Long alquilerId
    ) {
        try {
            fileService.storeFileWithAlquiler(file, alquilerId);
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage("Archivo subido exitosamente con asociación a alquiler."));
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ResponseMessage("Error al subir el archivo."));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponseMessage(e.getMessage()));
        }
    }

    @GetMapping("/files/{id}")
    public ResponseEntity<byte[]> getFile(@PathVariable Long id) throws FileNotFoundException {
        FileEntity fileEntity = fileService.getFile(id).get();
        return ResponseEntity.status(HttpStatus.OK)
                .header(HttpHeaders.CONTENT_TYPE, fileEntity.getType())
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileEntity.getName()+"\"")
                .body(fileEntity.getData());
    }

    @GetMapping("/files")
    public ResponseEntity<List<ResponseFile>> getListFiles(){
        List<ResponseFile> files = fileService.getAllFiles();
        return ResponseEntity.status(HttpStatus.OK).body(files);
    }
}