package backend.monopoly.controllers;

import backend.monopoly.domain.Room;
import backend.monopoly.repo.RoomRepo;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("room")
public class RoomController {

    private final RoomRepo roomRepo;

    @Autowired
    public RoomController(RoomRepo roomRepo) {
        this.roomRepo = roomRepo;
    }

    @GetMapping
    public List<Room> list() {
        return roomRepo.isStarted(false);
    }

    @GetMapping("{id}")
    public Room getOne(@PathVariable("id") Room room){
        return room;
    }

    @PostMapping
    public Room create(@RequestBody Room room) {
        return roomRepo.save(room);
    }

    @PutMapping("{id}")
    public Room start(@PathVariable("id") Room roomFromDb){
        roomFromDb.setStarted(true);
        return roomRepo.save(roomFromDb);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable("id") Room room){
        roomRepo.delete(room);
    }
}
