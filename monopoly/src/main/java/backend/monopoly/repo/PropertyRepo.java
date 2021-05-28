package backend.monopoly.repo;

import backend.monopoly.domain.Property;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PropertyRepo extends JpaRepository<Property, Long> {
}
