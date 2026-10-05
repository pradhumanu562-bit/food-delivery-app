# 🍔 FeastFlow - Gourmet Food Delivery Web Application

A full-stack, responsive food delivery platform built with clean **HTML5**, **CSS3**, **JavaScript (ES6+)**, and a complete **Java** order processing backend.

---

## 🌟 Key Features

### 🎨 Frontend (HTML5 & CSS3)
- **Design System**: Tailored dark & light mode palettes with glassmorphism (`backdrop-filter: blur`), smooth micro-interactions, responsive flexbox & CSS grid.
- **Rich Food Imagery**: High-definition, artisan food photography for Gourmet Burgers, Wood-Fired Pizza, Signature Sushi, Healthy Quinoa Bowls, Desserts, and Craft Mocktails.
- **Dynamic Category Navigation**: Filter smoothly between Burgers, Pizza, Asian, Healthy Bowls, Desserts, and Drinks.
- **Dietary Indicators**: Color-coded markers for Pure Veg (🌱 Green) and Non-Veg (🥩 Red).
- **Instant Search & Sorting**: Real-time keyword filter across dishes, cuisines, and descriptions, plus sorting by popularity, rating, or price.
- **Dish Customization Modal**: Quick-view modal with spice level selector (Mild, Medium, Hot, Extra Fire) and add-on toppings.
- **Slide-out Cart Drawer**:
  - Live subtotal, tax (8%), and dynamic free delivery progress bar.
  - Interactive coupon engine (e.g. `FEAST30` for 30% off, `FREEDEL` for free delivery, `BITE10` for $10 off).
  - Quantity steppers and item deletion.
- **Express Checkout Modal**:
  - Customer name, phone, delivery address, and notes.
  - Payment method choices (Credit Card, Apple / Google Pay, Cash on Delivery).
- **Live Order Tracking Simulation**:
  - Real-time 4-stage animated stepper:
    1. ✅ Order Confirmed
    2. 👨‍🍳 Chef Preparing
    3. 🛵 Rider En Route
    4. 📦 Delivered
  - Courier rider info card with photo avatar, rating, vehicle model, and contact buttons.
  - "Simulate Next Stage" button to demo state progression instantly.
- **Wishlist & Toast Notifications**: Interactive heart icons and floating feedback toasts.

---

## ☕ Java Backend (`backend/FoodOrderSystem.java`)
For object-oriented programming requirements, assignments, or backend architecture:
- **`Dish` Model**: Encapsulates ID, name, cuisine category, pricing, calories, preparation time, and dietary tags.
- **`OrderItem` Model**: Handles item quantities, customizable spice levels, and add-on pricing.
- **`Order` Model**: Manages customer contact info, delivery address, invoice generation, tax & discount logic, and lifecycle statuses (`CONFIRMED`, `PREPARING`, `OUT_FOR_DELIVERY`, `DELIVERED`).
- **`DeliveryRider` Model**: Assigns local riders with vehicle and rating info.
- **`DeliveryService`**: Simulates the food ordering lifecycle, automated invoices, and status updates.

---

## 🚀 How to Run

### 1. View the Website (Frontend)
Simply open `index.html` in any web browser (Google Chrome, Microsoft Edge, Firefox, etc.) or launch it using VS Code "Live Server".

### 2. Run the Java Backend (Optional)
If you have Java (JDK 8 or higher) installed:
```bash
# Compile the Java file
javac backend/FoodOrderSystem.java

# Run the system
java backend.FoodOrderSystem
```

---

## 📁 Project Structure

```text
├── index.html                   # Semantic markup, hero, menus, modals & cart drawer
├── styles.css                   # Responsive design system & animations
├── script.js                    # Shopping cart, search, coupons & tracking logic
├── images/                      # High-res photography assets
│   ├── hero_burger.jpg
│   ├── woodfired_pizza.jpg
│   ├── sushi_platter.jpg
│   ├── fresh_bowl.jpg
│   ├── dessert_cake.jpg
│   └── refreshing_drink.jpg
├── backend/
│   └── FoodOrderSystem.java     # Complete Object-Oriented Java backend system
└── README.md                    # Project documentation
```
