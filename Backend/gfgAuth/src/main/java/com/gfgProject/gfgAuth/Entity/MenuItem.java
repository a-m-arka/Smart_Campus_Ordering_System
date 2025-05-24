package com.gfgProject.gfgAuth.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "menu_items")
public class MenuItem {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private String name;

  private String description;

  @Column(nullable = false)
  private double price;

  @Column(name = "is_available", nullable = false)
  private boolean isAvailable;

  // Constructors
  public MenuItem() {
  }

  public MenuItem(String name, String description, double price, boolean isAvailable) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.isAvailable = isAvailable;
  }

  // Getters and Setters
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

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public double getPrice() {
    return price;
  }

  public void setPrice(double price) {
    this.price = price;
  }

  public boolean isAvailable() {
    return isAvailable;
  }

  public void setAvailable(boolean available) {
    isAvailable = available;
  }
}
