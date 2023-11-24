
package com.nFredes.demojwt.DTO;

import java.math.BigDecimal;


public class MaquinariaDuracionDTO {
    private Long maquinariaId;
    private String tipoMaquinaria;
    private BigDecimal duracionTotal;

    public MaquinariaDuracionDTO() {
    }

    public MaquinariaDuracionDTO(Long maquinariaId, String tipoMaquinaria, BigDecimal duracionTotal) {
        this.maquinariaId = maquinariaId;
        this.tipoMaquinaria = tipoMaquinaria;
        this.duracionTotal = duracionTotal;
    }

    public Long getMaquinariaId() {
        return maquinariaId;
    }

    public String getTipoMaquinaria() {
        return tipoMaquinaria;
    }

    public BigDecimal getDuracionTotal() {
        return duracionTotal;
    }

    public void setMaquinariaId(Long maquinariaId) {
        this.maquinariaId = maquinariaId;
    }

    public void setTipoMaquinaria(String tipoMaquinaria) {
        this.tipoMaquinaria = tipoMaquinaria;
    }

    public void setDuracionTotal(BigDecimal duracionTotal) {
        this.duracionTotal = duracionTotal;
    }

    
}
