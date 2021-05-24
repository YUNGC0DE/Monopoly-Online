package backend.monopoly.controllers;

import backend.monopoly.domain.User;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("profile")
public class UserController {
    @GetMapping
    public User getUserInformation(@AuthenticationPrincipal User user){
        return user;
    }
}
