package com.gfgProject.gfgAuth.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "cart")
public class Cart {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;

  @Column(name = "vendor_id", nullable = false)
  private int vecdorId;

  @Column(name = "user_id", nullable = false)
  private int userId;

  @Column(name = "item_id", nullable = false)
  private int itemId;

  @Column(nullable = false)
  private int quantity;

  // Constructors
  public Cart() {
  }

  public Cart(int vecdorId, int userId, int itemId, int quantity) {
    this.vecdorId = vecdorId;
    this.userId = userId;
    this.itemId = itemId;
    this.quantity = quantity;
  }

  // Getters and Setters
  public int getId() {
    return id;
  }

  public int getVecdorId() {
    return vecdorId;
  }

  public void setVecdorId(int vecdorId) {
    this.vecdorId = vecdorId;
  }

  public int getUserId() {
    return userId;
  }

  public void setUserId(int userId) {
    this.userId = userId;
  }

  public int getItemId() {
    return itemId;
  }

  public void setItemId(int itemId) {
    this.itemId = itemId;
  }

  public int getQuantity() {
    return quantity;
  }

  public void setQuantity(int quantity) {
    this.quantity = quantity;
  }
}
