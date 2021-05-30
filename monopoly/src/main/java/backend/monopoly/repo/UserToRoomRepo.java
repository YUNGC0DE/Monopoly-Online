package backend.monopoly.repo;

import backend.monopoly.domain.UserToRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserToRoomRepo extends JpaRepository<UserToRoom, Long> {
    public List<UserToRoom> RoomId(Long roomId);
}
