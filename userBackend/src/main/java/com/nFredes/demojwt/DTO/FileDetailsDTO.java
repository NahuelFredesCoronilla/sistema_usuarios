/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nFredes.demojwt.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 *
 * @author nahue
 */
@Data
@AllArgsConstructor
public class FileDetailsDTO {
    private String name;
    private String type;
    private String url;
}
