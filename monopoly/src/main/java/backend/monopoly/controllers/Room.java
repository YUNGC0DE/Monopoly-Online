package backend.monopoly.controllers;
import backend.monopoly.exceptions.NotFoundException;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("room")
public class Room {

    public List<Map<String, String>> rooms = new ArrayList<>() {{
        add(new HashMap<>() {{
            put("roomId", "1");
            put("name", "Best Room");
        }});
        add(new HashMap<>() {{
            put("roomId", "2");
            put("name", "Good Room");
        }});
    }};
    private int counter = rooms.size();

    public Map<String, String> getRoom(String roomId){
        return rooms.stream()
                .filter(room -> room.get("roomId").equals(roomId))
                .findFirst()
                .orElseThrow(NotFoundException::new);
    }

    @GetMapping
    public List<Map<String, String>> list() {
        return rooms;
    }

    @GetMapping("{roomId}")
    public Map<String, String> getOne(@PathVariable String roomId){
        return getRoom(roomId);
    }

    @PostMapping
    public Map<String, String> create(@RequestBody Map<String, String> room) {
        room.put("roomId", String.valueOf(counter++));
        rooms.add(room);

        return room;
    }

    @PutMapping("{roomId}")
    public Map<String, String> update(@PathVariable String roomId, @RequestBody Map<String, String> room){
        Map<String, String> roomToUpdate = getRoom(roomId);
        roomToUpdate.putAll(room);
        roomToUpdate.put("roomId", roomId);

        return roomToUpdate;
    }

    @DeleteMapping("{roomId}")
    public void delete(@PathVariable String roomId){
        Map<String, String> room = getRoom(roomId);
        rooms.remove(room);
    }
}
