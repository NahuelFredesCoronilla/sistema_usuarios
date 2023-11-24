/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nFredes.demojwt.response;

import lombok.Builder;
import lombok.Data;

/**
 *
 * @author nahue
 */

@Data
@Builder
public class ResponseFile {
    private String name;
    private String url;
    private String type;
    private long size;
}