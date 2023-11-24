package com.nFredes.demojwt.Controller;

import com.nFredes.demojwt.DTO.MaquinariaDuracionDTO;
import com.nFredes.demojwt.Model.Alquiler;
import com.nFredes.demojwt.Model.Maquinaria;
import com.nFredes.demojwt.Model.User;
import com.nFredes.demojwt.DTO.SolicitudAlquilerDTO;
import com.nFredes.demojwt.repository.AlquilerRepository;
import com.nFredes.demojwt.service.AlquilerService;
import com.nFredes.demojwt.service.MaquinariaService;
import com.nFredes.demojwt.service.UserService;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/alquileres")
public class AlquilerController {

    @Autowired
    private AlquilerService alquilerService;

    @Autowired
    private UserService userService;

    @Autowired
    private MaquinariaService maquinariaService;
    
      @Autowired
    private AlquilerRepository alquilerRepository;

    @GetMapping("/historial")
    public ResponseEntity<List<Alquiler>> obtenerHistorialAlquileres(@RequestParam Long userId) {
        try {
            User user = new User();
            List<Alquiler> historialAlquileres = alquilerService.obtenerHistorialAlquileres(user);
            return new ResponseEntity<>(historialAlquileres, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/traer/{id}")
    public ResponseEntity<Alquiler> getAlquilerPorId(@PathVariable Long id) {
        try {
            Alquiler alquiler = alquilerService.findAlquiler(id);
            return new ResponseEntity<>(alquiler, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/todos")
    public List<Alquiler> obtenerTodosLosAlquileres() {
        return alquilerService.obtenerTodosLosAlquileres();
    }

    @GetMapping("/activos")
    public ResponseEntity<List<Alquiler>> obtenerAlquileresActivos() {
        try {
            List<Alquiler> alquileresActivos = alquilerService.obtenerAlquileresActivos();
            return new ResponseEntity<>(alquileresActivos, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/finalizados")
    public ResponseEntity<List<Alquiler>> obtenerAlquileresFinalizados() {
        try {
            List<Alquiler> alquileresFinalizados = alquilerService.obtenerAlquileresFinalizados();
            return new ResponseEntity<>(alquileresFinalizados, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/usuario/{userId}")
    public ResponseEntity<List<Alquiler>> getAlquileresByUserId(@PathVariable Long userId) {
        try {
            List<Alquiler> alquileres = alquilerService.getAlquileresByUserId(userId);
            return new ResponseEntity<>(alquileres, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/solicitar")
    public ResponseEntity<?> solicitarAlquiler(@RequestBody SolicitudAlquilerDTO solicitud) {
        try {

            Alquiler alquiler = alquilerService.solicitarAlquiler(
                    solicitud.getUsuarioId(),
                    solicitud.getMaquinariaId(),
                    solicitud.getFechaInicio(),
                    solicitud.getDuracion(),
                    solicitud.getValorPorDia()
            );

            return new ResponseEntity<>(alquiler, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Error al solicitar alquiler: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/finalizar")
    public ResponseEntity<Void> finalizarAlquiler(@RequestParam Long alquilerId) {
        alquilerService.finalizarAlquiler(alquilerId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/fechas-ocupadas/{maquinaId}")
    public ResponseEntity<List<LocalDate>> obtenerFechasOcupadas(@PathVariable Long maquinaId) {
        List<LocalDate> fechasOcupadas = alquilerService.obtenerFechasOcupadas(maquinaId);
        return new ResponseEntity<>(fechasOcupadas, HttpStatus.OK);
    }

    @GetMapping("/duracion-total-maquinaria")
    public ResponseEntity<List<MaquinariaDuracionDTO>> obtenerDuracionTotalPorMaquinarias() {
        try {
            List<Object[]> resultados = alquilerService.obtenerDuracionTotalPorMaquinarias();

            List<MaquinariaDuracionDTO> dtos = new ArrayList<>();

            for (Object[] resultado : resultados) {
                Long maquinariaId = (Long) resultado[0];
                String tipoMaquinaria = (String) resultado[1];
                BigDecimal duracionTotal = (BigDecimal) resultado[2];

                MaquinariaDuracionDTO dto = new MaquinariaDuracionDTO(maquinariaId, tipoMaquinaria, duracionTotal);
                dtos.add(dto);
            }

            return new ResponseEntity<>(dtos, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



}
