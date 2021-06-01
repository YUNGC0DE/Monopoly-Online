package backend.monopoly.repo;

import backend.monopoly.domain.Room;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoomRepo extends JpaRepository<Room, Long> {
    public List<Room> isStarted(boolean isStarted);
}
