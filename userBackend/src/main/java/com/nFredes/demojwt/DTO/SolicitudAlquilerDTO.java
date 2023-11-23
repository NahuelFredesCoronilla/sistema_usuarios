/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nFredes.demojwt.DTO;

import java.time.LocalDate;

/**
 *
 * @author nahue
 */ 
public class SolicitudAlquilerDTO {

    private int usuarioId;
    private Long maquinariaId;
    private LocalDate fechaInicio;
    private int duracion;
    private double valorPorDia;
    private double valorTotal;

    // Getters y Setters

    public int getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(int usuarioId) {
        this.usuarioId = usuarioId;
    }

    public Long getMaquinariaId() {
        return maquinariaId;
    }

    public void setMaquinariaId(Long maquinariaId) {
        this.maquinariaId = maquinariaId;
    }

    public LocalDate getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(LocalDate fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public int getDuracion() {
        return duracion;
    }

    public void setDuracion(int duracion) {
        this.duracion = duracion;
    }

    public double getValorPorDia() {
        return valorPorDia;
    }

    public void setValorPorDia(double valorPorDia) {
        this.valorPorDia = valorPorDia;
    }

    public double getValorTotal() {
        return valorTotal;
    }

    public void setValorTotal(double valorTotal) {
        this.valorTotal = valorTotal;
    }
}

