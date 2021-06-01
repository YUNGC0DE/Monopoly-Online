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

import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;


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
        return userToRoomRepo.save(userToRoom);
    }

}
