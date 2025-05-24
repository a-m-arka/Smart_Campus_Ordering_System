package com.gfgProject.gfgAuth.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "payments")
public class Payment {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int paymentId;

  @Column(name = "order_id", nullable = false)
  private int orderId;

  @Column(name = "user_id", nullable = false)
  private int userId;

  @Column(nullable = false)
  private double amount;

  @Column(name = "transaction_no", nullable = false, unique = true)
  private String transactionno;

  // Constructors
  public Payment() {
  }

  public Payment(int orderId, int userId, double amount, String transactionno) {
    this.orderId = orderId;
    this.userId = userId;
    this.amount = amount;
    this.transactionno = transactionno;
  }

  // Getters and Setters
  public int getPaymentId() {
    return paymentId;
  }

  public void setPaymentId(int paymentId) {
    this.paymentId = paymentId;
  }

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

  public double getAmount() {
    return amount;
  }

  public void setAmount(double amount) {
    this.amount = amount;
  }

  public String getTransactionno() {
    return transactionno;
  }

  public void setTransactionno(String transactionno) {
    this.transactionno = transactionno;
  }
}
