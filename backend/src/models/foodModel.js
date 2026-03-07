class FoodModel {
    constructor(food) {
        this.title = food.title;
        this.description = food.description;
        this.price = food.price;
        this.category = food.category;
        this.isAvailable = food.isAvailable;
    } 
}

export default FoodModel;