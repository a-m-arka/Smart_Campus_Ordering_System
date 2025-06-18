const createTableQueries = {
  createStudentTable: `
    CREATE TABLE IF NOT EXISTS Students (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      phone VARCHAR(20),
      address TEXT,
      profile_picture_url TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `,

  createVendorTable: `
    CREATE TABLE IF NOT EXISTS Vendors (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      phone VARCHAR(20),
      stall_name VARCHAR(100) NOT NULL,
      stall_location VARCHAR(255),
      logo_url TEXT,
      is_open BOOLEAN DEFAULT TRUE,
      average_rating DECIMAL(3,2) DEFAULT 0.0,
      review_count INT DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `,

  createFoodItemTable: `
    CREATE TABLE IF NOT EXISTS FoodItems (
      id INT PRIMARY KEY AUTO_INCREMENT,
      vendor_id INT NOT NULL,
      name VARCHAR(100) NOT NULL,
      description TEXT,
      price DECIMAL(10, 2) NOT NULL,
      image_url TEXT,
      is_available BOOLEAN DEFAULT TRUE,
      category VARCHAR(100),
      average_rating DECIMAL(3,2) DEFAULT 0.0,
      review_count INT DEFAULT 0,
      FOREIGN KEY (vendor_id) REFERENCES Vendors(id) ON DELETE CASCADE
    );
  `,

  createCartTable: `
    CREATE TABLE IF NOT EXISTS Carts (
      id INT PRIMARY KEY AUTO_INCREMENT,
      student_id INT NOT NULL,
      food_item_id INT NOT NULL,
      quantity INT NOT NULL DEFAULT 1,
      added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (student_id) REFERENCES Students(id) ON DELETE CASCADE,
      FOREIGN KEY (food_item_id) REFERENCES FoodItems(id) ON DELETE CASCADE
    );
  `,

  createOrderTable: `
    CREATE TABLE IF NOT EXISTS Orders (
      id INT PRIMARY KEY AUTO_INCREMENT,
      student_id INT NOT NULL,
      vendor_id INT NOT NULL,
      total_amount DECIMAL(10, 2) NOT NULL,
      status ENUM('pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled') DEFAULT 'pending',
      payment_status ENUM('pending', 'paid', 'failed') DEFAULT 'pending',
      delivery_address VARCHAR(255) DEFAULT 'Main Gate, CUET',
      order_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (student_id) REFERENCES Students(id),
      FOREIGN KEY (vendor_id) REFERENCES Vendors(id)
    );
  `,

  createOrderItemTable: `
    CREATE TABLE IF NOT EXISTS OrderItems (
      id INT PRIMARY KEY AUTO_INCREMENT,
      order_id INT NOT NULL,
      food_item_id INT NOT NULL,
      quantity INT NOT NULL,
      price DECIMAL(10, 2) NOT NULL,
      FOREIGN KEY (order_id) REFERENCES Orders(id) ON DELETE CASCADE,
      FOREIGN KEY (food_item_id) REFERENCES FoodItems(id)
    );
  `,

  createPaymentTable: `
    CREATE TABLE IF NOT EXISTS Payments (
      id INT PRIMARY KEY AUTO_INCREMENT,
      order_id INT NOT NULL,
      payment_method VARCHAR(50),
      transaction_id VARCHAR(100),
      amount DECIMAL(10, 2) NOT NULL,
      payment_status ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
      payment_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (order_id) REFERENCES Orders(id) ON DELETE CASCADE
    );
  `,

  createReviewTable: `
    CREATE TABLE IF NOT EXISTS Reviews (
      id INT PRIMARY KEY AUTO_INCREMENT,
      student_id INT NOT NULL,
      vendor_id INT,
      food_item_id INT,
      rating INT CHECK (rating BETWEEN 1 AND 5),
      comment TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (student_id) REFERENCES Students(id) ON DELETE CASCADE,
      FOREIGN KEY (vendor_id) REFERENCES Vendors(id) ON DELETE CASCADE,
      FOREIGN KEY (food_item_id) REFERENCES FoodItems(id) ON DELETE CASCADE
    );
  `
};

export default createTableQueries;
