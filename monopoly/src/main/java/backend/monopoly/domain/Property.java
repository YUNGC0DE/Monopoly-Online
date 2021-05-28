package backend.monopoly.domain;

import java.util.Set;

import javax.persistence.*;
import java.util.HashSet;


@Entity
@Table
public class Property{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private int price;

    @ManyToMany(mappedBy = "properties")
    private final Set<UserToRoom> userToRoomSet =new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }
}
