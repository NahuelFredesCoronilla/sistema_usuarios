/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nFredes.demojwt.service;

import com.nFredes.demojwt.Model.Alquiler;
import com.nFredes.demojwt.Model.FileEntity;
import com.nFredes.demojwt.repository.AlquilerRepository;
import com.nFredes.demojwt.repository.FileRepository;
import com.nFredes.demojwt.response.ResponseFile;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

/**
 *
 * @author nahue
 */
@Service
public class FileServiceImpl implements FileService{

    @Autowired
    private FileRepository fileRepository;
    @Autowired
    private AlquilerRepository alquilerRepository;
    @Override
    public FileEntity store(MultipartFile file) throws IOException {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        FileEntity fileEntity = FileEntity.builder()
                .name(fileName)
                .type(file.getContentType())
                .data(file.getBytes())
                .build();
        return fileRepository.save(fileEntity);
    }
    @Override
    public FileEntity storeFileWithAlquiler(MultipartFile file, Long alquilerId) throws IOException {
        // Obtén el alquiler desde la base de datos
        Optional<Alquiler> alquilerOptional = alquilerRepository.findById(alquilerId);
       

        Alquiler alquiler = alquilerOptional.get();

        // Guarda el archivo en la tabla de archivos
        FileEntity fileEntity = store(file);

        // Asocia el archivo con el alquiler
        alquiler.setFile(fileEntity);

        // Actualiza el alquiler en la base de datos
        alquilerRepository.save(alquiler);

        return fileEntity;
    }

    @Override
    public Optional<FileEntity> getFile(Long id) throws FileNotFoundException {
        Optional<FileEntity> file = fileRepository.findById(id);
        if(file.isPresent()){
            return file;
        }
        throw new FileNotFoundException();
    }

    @Override
    public List<ResponseFile> getAllFiles() {
        List<ResponseFile> files = fileRepository.findAll().stream().map(dbFile -> {
            String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("api/fileManager/files/")
                    .path(dbFile.getId().toString())
                    .toUriString();
            return ResponseFile.builder()
                    .name(dbFile.getName())
                    .url(fileDownloadUri)
                    .type(dbFile.getType())
                    .size(dbFile.getData().length).build();

        }).collect(Collectors.toList());
        return files;
    }
}