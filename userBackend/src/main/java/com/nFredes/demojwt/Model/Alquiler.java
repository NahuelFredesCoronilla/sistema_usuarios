/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nFredes.demojwt.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Transient;
import java.time.LocalDate;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Alquiler {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "maquinaria_id")
    private Maquinaria maquinaria;
    
     @OneToOne
    @JoinColumn(name = "file_id") 
    private FileEntity file;

    private LocalDate fechaInicio;
    private int duracion;
    private double valorAlquilerPorDia;
    private double valorAlquilerTotal;
    private boolean activo;
    

    public Alquiler(User user, Maquinaria maquinaria, LocalDate fechaInicio, int duracion, double valorAlquilerPorDia, double valorAlquilerTotal, boolean activo) {
        this.user = user;
        this.maquinaria = maquinaria;
        this.fechaInicio = fechaInicio;
        this.duracion = duracion;
        this.valorAlquilerPorDia = valorAlquilerPorDia;
        this.valorAlquilerTotal = valorAlquilerTotal;
        this.activo = activo;
    }

    @Transient
    public boolean isMaquinariaDisponible(List<Alquiler> alquileres) {
        for (Alquiler alquilerExistente : alquileres) {
            if (comprobarDisponibilidad(alquilerExistente.getFechaInicio(), alquilerExistente.getDuracion(), fechaInicio, duracion)) {
                return false;
            }
        }
        return true;
    }

    private boolean comprobarDisponibilidad(LocalDate inicio1, int duracion1, LocalDate inicio2, int duracion2) {
        LocalDate fin1 = inicio1.plusDays(duracion1);
        LocalDate fin2 = inicio2.plusDays(duracion2);

        return !inicio1.isAfter(fin2) && !inicio2.isAfter(fin1);
    }

}
