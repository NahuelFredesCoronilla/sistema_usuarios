/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nFredes.demojwt.service;

import com.nFredes.demojwt.Model.Alquiler;
import com.nFredes.demojwt.Model.Maquinaria;
import com.nFredes.demojwt.Model.User;
import com.nFredes.demojwt.repository.AlquilerRepository;
import com.nFredes.demojwt.repository.MaquinariaRepository;
import com.nFredes.demojwt.repository.UserRepository;
import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class AlquilerService {

    @Autowired
    private AlquilerRepository alquilerRepository;
    @Autowired
    private UserRepository usuarioRepository;
    @Autowired
    private MaquinariaRepository maquinariaRepository;

    public List<Alquiler> obtenerHistorialAlquileres(User user) {
        return alquilerRepository.findByUser(user);
    }

    public List<Alquiler> obtenerTodosLosAlquileres() {
        return alquilerRepository.findAll();
    }

    public Alquiler findAlquiler(Long id) {
        Alquiler alquiler = alquilerRepository.findById(id).orElse(null);
        return alquiler;
    }

    public List<Alquiler> obtenerAlquileresActivos() {
        return alquilerRepository.findByActivo(true);
    }

    public List<Alquiler> obtenerAlquileresFinalizados() {
        return alquilerRepository.findByActivo(false);
    }

    public List<Alquiler> getAlquileresByUserId(Long userId) {
        return alquilerRepository.findByUserId(userId);
    }

    public Alquiler solicitarAlquiler(int usuarioId, Long maquinariaId, LocalDate fechaInicio, int duracion, double valorAlquilerPorDia) throws Exception {
        double valorTotal = calcularTotal(duracion, valorAlquilerPorDia);

        User usuario = usuarioRepository.findById(usuarioId).orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        Maquinaria maquinaria = maquinariaRepository.findById(maquinariaId).orElseThrow(() -> new RuntimeException("Maquinaria no encontrada"));

        List<Alquiler> alquileresRealizados = alquilerRepository.findByMaquinariaAndActivo(maquinaria, true);

        Alquiler nuevoAlquiler = new Alquiler(usuario, maquinaria, fechaInicio, duracion, valorAlquilerPorDia, valorTotal, true);

        if (nuevoAlquiler.isMaquinariaDisponible(alquileresRealizados)) {
            nuevoAlquiler.setValorAlquilerTotal(valorTotal);
            nuevoAlquiler.setActivo(true);
            return alquilerRepository.save(nuevoAlquiler);
        } else {
            throw new Exception("Maquinaria no disponible");
        }
    }

    private double calcularTotal(int duracion, double valorAlquilerPorDia) {
        double total = (duracion * valorAlquilerPorDia);
        return total;
    }

    public List<LocalDate> obtenerFechasOcupadas(Long maquinaId) {
        List<Alquiler> alquileres = alquilerRepository.findByMaquinariaId(maquinaId);
        List<LocalDate> fechasOcupadas = new ArrayList<>();

        for (Alquiler alquiler : alquileres) {
            //verifico que esta el alquiler no esta finalizado
            if (alquiler.isActivo()) {
                LocalDate fechaInicio = alquiler.getFechaInicio();
                int duracion = alquiler.getDuracion();
                //sumo los dias de duracion
                for (int i = 0; i < duracion; i++) {
                    fechasOcupadas.add(fechaInicio.plusDays(i));
                }
            }
        }

        return fechasOcupadas;
    }

    public void finalizarAlquiler(Long alquilerId) {
        Optional<Alquiler> optionalAlquiler = alquilerRepository.findById(alquilerId);
        if (optionalAlquiler.isPresent()) {
            Alquiler alquiler = optionalAlquiler.get();
            alquiler.setActivo(false);

            alquilerRepository.save(alquiler);
        }
    }

    public void finalizarAlquileresVencidos() {
        List<Alquiler> alquileresActivos = alquilerRepository.findByActivo(true);
        LocalDate fechaActual = LocalDate.now();

        for (Alquiler alquiler : alquileresActivos) {
            LocalDate fechaFinalizacion = alquiler.getFechaInicio().plusDays(alquiler.getDuracion());
            if (fechaFinalizacion.isBefore(fechaActual)) {
                alquiler.setActivo(false);
                alquilerRepository.save(alquiler);
            }
        }
    }

    @Scheduled(cron = "0 0 1 * * ?")
    public void ejecutarFinalizacionAutomatica() {
        finalizarAlquileresVencidos();
    }
    
    public List<Object[]> obtenerDuracionTotalPorMaquinarias() {
    return alquilerRepository.obtenerDuracionTotalPorMaquinarias();
}
    
   

}
