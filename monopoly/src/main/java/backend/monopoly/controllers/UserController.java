package backend.monopoly.controllers;

import backend.monopoly.domain.User;
import backend.monopoly.repo.UserDetailsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("profile")
public class UserController {

    private final UserDetailsRepo userDetailsRepo;

    @Autowired
    public UserController(UserDetailsRepo userDetailsRepo) {
        this.userDetailsRepo = userDetailsRepo;
    }

    @GetMapping
    public User getUserInformation(@AuthenticationPrincipal User user){
        return user;
    }

    @PutMapping
    public User update(@AuthenticationPrincipal User userFromDb, @RequestBody  User user){
        userFromDb.setCurrentRoom(user.getCurrentRoom());
        return userDetailsRepo.save(userFromDb);
    }
}
