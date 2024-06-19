package org.example.backend.service;

import org.example.backend.dto.AdminInstanceDto;
import org.example.backend.dto.InstanceDto;
import org.example.backend.model.Reservation;
import org.example.backend.model.ResourceInstance;
import org.example.backend.repository.ReservationRepository;
import org.example.backend.repository.ResourceInstanceRepository;
import org.example.backend.util.InstanceStatus;
import org.example.backend.util.ReservationStatus;
import org.example.backend.util.exception.NoSuchInstanceException;
import org.example.backend.util.exception.OperationNotAvailableException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.management.InstanceNotFoundException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ResourceInstanceService {

    private final ResourceInstanceRepository resourceInstanceRepository;

    private final ReservationRepository ReservationRepository;
    private final ReservationRepository reservationRepository;

    @Autowired
    public ResourceInstanceService(ResourceInstanceRepository resourceInstanceRepository, ReservationRepository ReservationRepository, ReservationRepository reservationRepository) {
        this.resourceInstanceRepository = resourceInstanceRepository;
        this.ReservationRepository = ReservationRepository;
        this.reservationRepository = reservationRepository;
    }

    public List<InstanceDto> getNotReservedInstancesOfResource(Integer resourceId) {
        return resourceInstanceRepository
                .findByResourceResourceIdAndIsReservedFalse(resourceId)
                .stream()
                .map(instance -> new InstanceDto(
                        instance.getResourceInstanceId(),
                        resourceId,
                        instance.getIsReserved())
                ).collect(Collectors.toList());
    }

    public Optional<ResourceInstance> getResourceInstanceById(Integer resourceInstanceId) {
        return resourceInstanceRepository.findById(resourceInstanceId);
    }

    public ResourceInstance saveResourceInstance(ResourceInstance resourceInstance) {
        return resourceInstanceRepository.save(resourceInstance);
    }

    public List<InstanceDto> getAllInstancesByResourceId(Integer id, Sort sort) {
        return resourceInstanceRepository
                .findByResourceResourceId(id, sort)
                .stream()
                .map(instance -> new InstanceDto(instance.getResourceInstanceId(), id, instance.getIsReserved()))
                .collect(Collectors.toList());
    }

    public List<AdminInstanceDto> getAllAdminInstancesByResourceId(Integer id, Sort sort) {
        return resourceInstanceRepository
                .findByResourceResourceIdWithData(id, sort)
                .stream()
                .map(instance -> new AdminInstanceDto(
                        instance.getResource().getResourceId(),
                        instance.getResourceInstanceId(),
                        instance.getIsReserved(),
                        instance.getInstanceStatus()
                ))
                .collect(Collectors.toList());
    }

    public List<ResourceInstance> saveAll(List<ResourceInstance> resourceInstances) {
        return resourceInstanceRepository.saveAll(resourceInstances);
    }

    public ResourceInstance save(ResourceInstance resourceInstance) {
        return resourceInstanceRepository.save(resourceInstance);
    }

    public void withdrawInstance(Integer id) throws NoSuchInstanceException, OperationNotAvailableException {
        Optional<ResourceInstance> instanceOptional = resourceInstanceRepository.findByIdWithData(id);
        if (instanceOptional.isEmpty()) {
            throw new NoSuchInstanceException();
        }
        ResourceInstance instance = instanceOptional.get();
        if (!instance.getIsReserved()) {
            instance.setInstanceStatus(InstanceStatus.WITHDRAWN);
            resourceInstanceRepository.save(instance);
            return;
        }
        List<Reservation> activeReservations = instance
                .getReservations()
                .stream()
                .filter(reservation -> reservation.getReservationStatus() == ReservationStatus.ACTIVE)
                .collect(Collectors.toList());
        List<Reservation> borrowedReservations = instance
                .getReservations()
                .stream()
                .filter(reservation -> reservation.getReservationStatus() == ReservationStatus.BORROWED)
                .collect(Collectors.toList());
        if(activeReservations.size() == 1) {
            Reservation reservation = activeReservations.get(0);
            reservation.setReservationStatus(ReservationStatus.CANCELLED);
            instance.setInstanceStatus(InstanceStatus.WITHDRAWN);
            instance.setIsReserved(false);
            reservationRepository.save(reservation);
            resourceInstanceRepository.save(instance);
            return;
        }
        if(borrowedReservations.size() == 1) {
            Reservation reservation = borrowedReservations.get(0);
            instance.setInstanceStatus(InstanceStatus.AWAITING_WITHDRAWAL);
            resourceInstanceRepository.save(instance);
            throw new OperationNotAvailableException("Could not withdraw resource - resource is borrowed.");
        }
    }

    public void updateInstance(AdminInstanceDto dto) throws NoSuchInstanceException, OperationNotAvailableException {
        Optional<ResourceInstance> instanceOptional = resourceInstanceRepository.findByIdWithData(dto.id());
        if (instanceOptional.isEmpty()) {
            throw new NoSuchInstanceException();
        }
        if (dto.isReserved() && dto.instanceStatus() == InstanceStatus.WITHDRAWN ||
            (!dto.isReserved() && (dto.instanceStatus() == InstanceStatus.AWAITING_WITHDRAWAL))
        ) {
            throw new OperationNotAvailableException("Invalid parameters");
        }
        ResourceInstance instance = instanceOptional.get();
        instance.setIsReserved(dto.isReserved());
        instance.setInstanceStatus(dto.instanceStatus());
        resourceInstanceRepository.save(instance);
    }
}
