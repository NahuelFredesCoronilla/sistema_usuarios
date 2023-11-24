package com.nFredes.demojwt.repository;

import com.nFredes.demojwt.Model.Alquiler;
import com.nFredes.demojwt.Model.Maquinaria;
import com.nFredes.demojwt.Model.User;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AlquilerRepository extends JpaRepository<Alquiler, Long> {

    List<Alquiler> findByUser(User user);

    List<Alquiler> findByUserId(Long userId);

    List<Alquiler> findByActivo(boolean activo);

    List<Alquiler> findByMaquinariaId(Long maquinaId);

    List<Alquiler> findByMaquinariaAndActivo(Maquinaria maquinaria, boolean activo);

    @Query(value = "SELECT maquinaria.id as maquinaria_id, maquinaria.tipo, SUM(alquiler.duracion) as duracion_total FROM alquiler JOIN maquinaria ON alquiler.maquinaria_id = maquinaria.id GROUP BY maquinaria.id, maquinaria.tipo;", nativeQuery = true)
    List<Object[]> obtenerDuracionTotalPorMaquinarias();
}
