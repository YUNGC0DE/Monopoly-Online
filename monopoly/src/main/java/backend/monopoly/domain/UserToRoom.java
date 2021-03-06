package backend.monopoly.domain;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Entity
@Table
public class UserToRoom implements Comparable<UserToRoom> {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "room_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Room room;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    private int money = 1500;
    private boolean isYourTurn;
    private int position;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "user_to_room_to_property",
            joinColumns = @JoinColumn(name = "user_to_room_id"),
            inverseJoinColumns = @JoinColumn(name = "property_id")
    )

    private List<Property> properties =new ArrayList<>();

    @Override
    public int compareTo(UserToRoom o) {
        return this.getId().compareTo(o.getId());
    }

    public boolean getIsYourTurn() {
        return isYourTurn;
    }

    public void setIsYourTurn(boolean yourTurn) {
        isYourTurn = yourTurn;
    }

    public int getPosition() {
        return position;
    }

    public void setPosition(int position) {
        this.position = position;
    }

    public List<Property> getProperties() {
        return properties;
    }

    public void setProperties(List<Property> properties) {
        this.properties = properties;
    }

    public int getMoney() {
        return money;
    }

    public void setMoney(int money) {
        this.money = money;
    }
    public Room getRoom() {
        return room;
    }

    public void setRoom(Room room) {
        this.room = room;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Long getId() {
        return id;
    }


    public void setId(Long id) {
        this.id = id;
    }
}
