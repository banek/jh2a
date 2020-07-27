package com.mycompany.myapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A Parking. Novi komentar
 */
@Entity
@Table(name = "parking")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Parking implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "naziv", nullable = false)
    private String naziv;

    @NotNull
    @Column(name = "povrsina", nullable = false)
    private Double povrsina;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNaziv() {
        return naziv;
    }

    public Parking naziv(String naziv) {
        this.naziv = naziv;
        return this;
    }

    public void setNaziv(String naziv) {
        this.naziv = naziv;
    }

    public Double getPovrsina() {
        return povrsina;
    }

    public Parking povrsina(Double povrsina) {
        this.povrsina = povrsina;
        return this;
    }

    public void setPovrsina(Double povrsina) {
        this.povrsina = povrsina;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Parking)) {
            return false;
        }
        return id != null && id.equals(((Parking) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Parking{" +
            "id=" + getId() +
            ", naziv='" + getNaziv() + "'" +
            ", povrsina=" + getPovrsina() +
            "}";
    }
}
