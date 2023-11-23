
package com.nFredes.demojwt.service;

import com.nFredes.demojwt.Model.Maquinaria;
import com.nFredes.demojwt.repository.MaquinariaRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MaquinariaService {
    @Autowired
    private MaquinariaRepository maquinariaRepository;
    
    public List<Maquinaria> getMaquinaria(){
        List<Maquinaria> maquinariaList= maquinariaRepository.findAll();
        return maquinariaList;
    }
    
    public Maquinaria findMaquinaria(Long id){
        Maquinaria maquinaria= maquinariaRepository.findById(id).orElse(null);
        return maquinaria;
    }
    
    public void deleteMaquinaria(Long id){
        maquinariaRepository.deleteById(id);
    }
    
    public Maquinaria createMaquinaria(Maquinaria maquinaria){
        return maquinariaRepository.save(maquinaria);
    }
    
    public Maquinaria updateMaquinaria(Long id, Maquinaria updatedMaquinaria){
       Maquinaria maquinariaExistente = maquinariaRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("No se encontró la maquinaria con ID " + id));
       maquinariaExistente.setMarca(updatedMaquinaria.getMarca());
       maquinariaExistente.setModelo(updatedMaquinaria.getModelo());
       maquinariaExistente.setPatente(updatedMaquinaria.getPatente());
       maquinariaExistente.setTipo(updatedMaquinaria.getTipo());
       maquinariaExistente.setCapacidad(updatedMaquinaria.getCapacidad());
       maquinariaExistente.setAnio(updatedMaquinaria.getAnio());
       maquinariaExistente.setPrecio(updatedMaquinaria.getPrecio());
       
       return maquinariaRepository.save(maquinariaExistente);
    }
}
