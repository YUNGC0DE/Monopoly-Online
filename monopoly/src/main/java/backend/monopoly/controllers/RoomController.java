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
        return roomRepo.findAll();
    }

    @GetMapping("{roomId}")
    public Room getOne(@PathVariable("roomId") Room room){
        return room;
    }

    @PostMapping
    public Room create(@RequestBody Room room) {
        return roomRepo.save(room);
    }

    @PutMapping("{roomId}")
    public Room update(@PathVariable("roomId") Room roomFromDb,
                                      @RequestBody Room room){
        BeanUtils.copyProperties(room, roomFromDb, "roomId");
        return roomRepo.save(roomFromDb);
    }

    @DeleteMapping("{roomId}")
    public void delete(@PathVariable("roomId") Room room){
        roomRepo.delete(room);
    }
}
