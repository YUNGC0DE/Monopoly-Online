package backend.monopoly.controllers;

import backend.monopoly.domain.Property;
import backend.monopoly.repo.PropertyRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("property")
public class PropertyController {

    @Autowired
    PropertyRepo propertyRepo;

    @GetMapping("{id}")
    public Property getOne(@PathVariable("id") Property property){
        return property;
    }

    @GetMapping
    public List<Property> getAll(){
        return propertyRepo.findAll();
    }
}
