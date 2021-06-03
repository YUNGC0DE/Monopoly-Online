package backend.monopoly.controllers;

import backend.monopoly.domain.Room;
import backend.monopoly.domain.User;
import backend.monopoly.domain.UserToRoom;
import backend.monopoly.repo.RoomRepo;
import backend.monopoly.repo.UserToRoomRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;


@RestController
@RequestMapping("user_to_room")
public class UserToRoomController {

    private final UserToRoomRepo userToRoomRepo;

    @Autowired
    private RoomRepo roomRepo;

    @Autowired
    public UserToRoomController(UserToRoomRepo userToRoomRepo) {
        this.userToRoomRepo = userToRoomRepo;
    }

    @GetMapping()
    public List<UserToRoom> getAllInTheRoom(@AuthenticationPrincipal User user){
        Long roomId =  (long) user.getCurrentRoom();
        List<UserToRoom> userToRoomList = userToRoomRepo.RoomId(roomId);
        Collections.sort(userToRoomList);
        return userToRoomList;
    }

    @PostMapping
    public UserToRoom create(@AuthenticationPrincipal User user, @RequestBody Room roomData) {
        Room room = roomRepo.findById(roomData.getId()).get();
        UserToRoom userToRoom = new UserToRoom();
        userToRoom.setRoom(room);
        userToRoom.setUser(user);
        return userToRoomRepo.save(userToRoom);
    }

    @MessageMapping("/changePlayer")
    @SendTo("/topic/activity")
    public UserToRoom change(UserToRoom userToRoom) {
        List<UserToRoom> userToRoomList = userToRoomRepo.RoomId(userToRoom.getRoom().getId());
        Collections.sort(userToRoomList);
        for (int i = 0; i < userToRoomList.size(); i++) {
            Long playerId = userToRoomList.get(i).getId();
            if (playerId.equals(userToRoom.getId())) {
                UserToRoom nextPlayer = userToRoomList.size() == i+1 ? userToRoomList.get(0): userToRoomList.get(i+1);
                nextPlayer.setIsYourTurn(true);
                userToRoomRepo.save(nextPlayer);
            }
        }
        userToRoom.setIsYourTurn(false);
        return userToRoomRepo.save(userToRoom);
    }

}
