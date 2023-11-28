/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.nFredes.demojwt.service;

import com.nFredes.demojwt.Model.FileEntity;
import com.nFredes.demojwt.response.ResponseFile;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author nahue
 */
public interface FileService {

    // Permite almacenar o cargar archivos a la base de datos
    FileEntity store(MultipartFile file) throws IOException;

    FileEntity storeFileWithAlquiler(MultipartFile file, Long alquilerId) throws IOException;

    // Permite descargar archivos de nuestra base de datos
    Optional<FileEntity> getFile(Long id) throws FileNotFoundException;

    // Permite consultar la lista de archivos cargados a nuestra base de datos
    List<ResponseFile> getAllFiles();
}
