package backend.monopoly.repo;

import backend.monopoly.domain.UserToRoom;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserToRoomRepo extends JpaRepository<UserToRoom, Long> {

}
