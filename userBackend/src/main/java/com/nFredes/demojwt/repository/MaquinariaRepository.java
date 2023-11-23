
package com.nFredes.demojwt.repository;

import com.nFredes.demojwt.Model.Maquinaria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MaquinariaRepository extends JpaRepository <Maquinaria,Long> {
    
}
