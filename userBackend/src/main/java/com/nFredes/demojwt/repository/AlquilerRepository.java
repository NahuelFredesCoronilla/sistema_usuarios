
package com.nFredes.demojwt.repository;

import com.nFredes.demojwt.Model.Alquiler;
import com.nFredes.demojwt.Model.Maquinaria;
import com.nFredes.demojwt.Model.User;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AlquilerRepository extends JpaRepository<Alquiler,Long>{
    List<Alquiler> findByUser(User user);
    List<Alquiler> findByUserId(Long userId);
    List<Alquiler> findByActivo(boolean activo);
    List<Alquiler>findByMaquinariaAndActivo(Maquinaria maquinaria,boolean activo);
}
