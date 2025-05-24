package com.gfgProject.gfgAuth.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "orders") // "order" is a reserved keyword in SQL, so we use "orders"
public class Order {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int orderId;

  @Column(name = "user_id", nullable = false)
  private int userId;

  @Column(name = "vendor_id", nullable = false)
  private int vendorId;

  @Column(name = "item_id", nullable = false)
  private int itemId;

  @Column(nullable = false)
  private int quantity;

  // Constructors
  public Order() {
  }

  public Order(int userId, int vendorId, int itemId, int quantity) {
    this.userId = userId;
    this.vendorId = vendorId;
    this.itemId = itemId;
    this.quantity = quantity;
  }

  // Getters and Setters
  public int getOrderId() {
    return orderId;
  }

  public void setOrderId(int orderId) {
    this.orderId = orderId;
  }

  public int getUserId() {
    return userId;
  }

  public void setUserId(int userId) {
    this.userId = userId;
  }

  public int getVendorId() {
    return vendorId;
  }

  public void setVendorId(int vendorId) {
    this.vendorId = vendorId;
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
