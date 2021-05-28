package backend.monopoly.controllers;

import backend.monopoly.domain.Property;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("property")
public class PropertyController {

    @GetMapping("{id}")
    public Property getOne(@PathVariable("id") Property property){
        return property;
    }
}
