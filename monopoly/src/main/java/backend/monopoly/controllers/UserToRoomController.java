package backend.monopoly.controllers;

import backend.monopoly.domain.Room;
import backend.monopoly.domain.User;
import backend.monopoly.domain.UserToRoom;
import backend.monopoly.repo.RoomRepo;
import backend.monopoly.repo.UserToRoomRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;


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

    @GetMapping("{id}")
    public UserToRoom getOne(@PathVariable("id") UserToRoom userToRoom){
        return userToRoom;
    }

    @PostMapping
    public UserToRoom create(@AuthenticationPrincipal User user, @RequestBody Room roomData) {
        Room room = roomRepo.findById(roomData.getId()).get();
        UserToRoom userToRoom = new UserToRoom();
        userToRoom.setRoom(room);
        userToRoom.setUser(user);
        return userToRoomRepo.save(userToRoom);
    }
}
