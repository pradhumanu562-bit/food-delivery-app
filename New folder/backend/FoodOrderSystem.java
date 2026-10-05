package backend;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

/**
 * ============================================================================
 * FEASTFLOW - Core Java Food Delivery System
 * Object-Oriented Architecture for Menu Management, Cart & Order Tracking
 * ============================================================================
 */
public class FoodOrderSystem {

    // 1. Dish Entity
    public static class Dish {
        private String id;
        private String name;
        private String category;
        private double price;
        private boolean isVeg;
        private int calories;
        private int prepTimeMinutes;

        public Dish(String id, String name, String category, double price, boolean isVeg, int calories, int prepTimeMinutes) {
            this.id = id;
            this.name = name;
            this.category = category;
            this.price = price;
            this.isVeg = isVeg;
            this.calories = calories;
            this.prepTimeMinutes = prepTimeMinutes;
        }

        public String getId() { return id; }
        public String getName() { return name; }
        public String getCategory() { return category; }
        public double getPrice() { return price; }
        public boolean isVeg() { return isVeg; }
        public int getCalories() { return calories; }
        public int getPrepTimeMinutes() { return prepTimeMinutes; }

        @Override
        public String toString() {
            return String.format("%s (%s) - $%.2f [%s, %d kcal]", 
                name, category, price, isVeg ? "Veg" : "Non-Veg", calories);
        }
    }

    // 2. Order Item in Cart
    public static class OrderItem {
        private Dish dish;
        private int quantity;
        private String spiceLevel;
        private List<String> addons;

        public OrderItem(Dish dish, int quantity, String spiceLevel, List<String> addons) {
            this.dish = dish;
            this.quantity = quantity;
            this.spiceLevel = spiceLevel;
            this.addons = addons != null ? addons : new ArrayList<>();
        }

        public Dish getDish() { return dish; }
        public int getQuantity() { return quantity; }
        public String getSpiceLevel() { return spiceLevel; }
        public List<String> getAddons() { return addons; }

        public double getSubtotal() {
            double extra = addons.size() * 1.50; // $1.50 per add-on
            return (dish.getPrice() + extra) * quantity;
        }

        @Override
        public String toString() {
            return String.format("%d x %s [%s] = $%.2f", quantity, dish.getName(), spiceLevel, getSubtotal());
        }
    }

    // 3. Delivery Rider Entity
    public static class DeliveryRider {
        private String id;
        private String name;
        private String phone;
        private String vehicle;
        private double rating;

        public DeliveryRider(String id, String name, String phone, String vehicle, double rating) {
            this.id = id;
            this.name = name;
            this.phone = phone;
            this.vehicle = vehicle;
            this.rating = rating;
        }

        public String getName() { return name; }
        public String getPhone() { return phone; }
        public String getVehicle() { return vehicle; }
        public double getRating() { return rating; }
    }

    // 4. Order Status Enum
    public enum OrderStatus {
        CONFIRMED("Order Received & Confirmed"),
        PREPARING("Master Chef is Cooking in the Kitchen"),
        OUT_FOR_DELIVERY("Rider is en route to your address"),
        DELIVERED("Successfully Delivered! Bon Appetit!");

        private final String description;
        OrderStatus(String description) { this.description = description; }
        public String getDescription() { return description; }
    }

    // 5. Customer Order Entity
    public static class Order {
        private String orderId;
        private String customerName;
        private String customerPhone;
        private String deliveryAddress;
        private List<OrderItem> items;
        private OrderStatus status;
        private DeliveryRider rider;
        private double totalAmount;
        private LocalDateTime orderTimestamp;

        public Order(String orderId, String customerName, String customerPhone, String deliveryAddress) {
            this.orderId = orderId;
            this.customerName = customerName;
            this.customerPhone = customerPhone;
            this.deliveryAddress = deliveryAddress;
            this.items = new ArrayList<>();
            this.status = OrderStatus.CONFIRMED;
            this.orderTimestamp = LocalDateTime.now();
        }

        public void addItem(OrderItem item) {
            items.add(item);
            calculateTotal();
        }

        public void calculateTotal() {
            double subtotal = items.stream().mapToDouble(OrderItem::getSubtotal).sum();
            double tax = subtotal * 0.08;
            double deliveryFee = subtotal >= 35.0 ? 0.0 : 3.99;
            this.totalAmount = subtotal + tax + deliveryFee;
        }

        public void applyDiscount(double percent) {
            this.totalAmount = this.totalAmount * (1.0 - (percent / 100.0));
        }

        public void setStatus(OrderStatus status) { this.status = status; }
        public void setRider(DeliveryRider rider) { this.rider = rider; }

        public String getOrderId() { return orderId; }
        public OrderStatus getStatus() { return status; }
        public double getTotalAmount() { return totalAmount; }

        public void printInvoice() {
            System.out.println("==================================================");
            System.out.println("            FEASTFLOW ORDER INVOICE              ");
            System.out.println("==================================================");
            System.out.println("Order ID : #" + orderId);
            System.out.println("Date     : " + orderTimestamp.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
            System.out.println("Customer : " + customerName + " (" + customerPhone + ")");
            System.out.println("Address  : " + deliveryAddress);
            System.out.println("Status   : " + status.getDescription());
            if (rider != null) {
                System.out.printf("Rider    : %s [%s] (%.1f ★)\n", rider.getName(), rider.getVehicle(), rider.getRating());
            }
            System.out.println("--------------------------------------------------");
            System.out.println("ITEMS ORDERED:");
            for (OrderItem item : items) {
                System.out.println(" - " + item);
            }
            System.out.println("--------------------------------------------------");
            System.out.printf("TOTAL AMOUNT PAYABLE: $%.2f\n", totalAmount);
            System.out.println("==================================================\n");
        }
    }

    // 6. Food Delivery Management Service
    public static class DeliveryService {
        private Map<String, Dish> menu = new HashMap<>();
        private List<DeliveryRider> riders = new ArrayList<>();
        private Map<String, Order> activeOrders = new HashMap<>();

        public DeliveryService() {
            initializeMenu();
            initializeRiders();
        }

        private void initializeMenu() {
            addDish(new Dish("D1", "Truffle Smash Double Burger", "Burgers", 14.99, false, 720, 15));
            addDish(new Dish("D2", "Wood-Fired Neapolitan Margherita", "Pizza", 16.99, true, 850, 20));
            addDish(new Dish("D3", "Chef's Signature Sushi Platter", "Asian", 24.99, false, 520, 25));
            addDish(new Dish("D4", "Mediterranean Quinoa Glow Bowl", "Bowls", 13.99, true, 460, 12));
            addDish(new Dish("D5", "Belgian Molten Chocolate Lava Cake", "Dessert", 8.99, true, 480, 10));
            addDish(new Dish("D6", "Dragonfruit Strawberry Refresher", "Drinks", 5.99, true, 130, 5));
        }

        private void initializeRiders() {
            riders.add(new DeliveryRider("R1", "Marcus Vance", "+1-555-0199", "Honda Hornet 160R (Red)", 4.9));
            riders.add(new DeliveryRider("R2", "Elena Rossi", "+1-555-0144", "Vespa Primavera (White)", 4.8));
        }

        public void addDish(Dish dish) {
            menu.put(dish.getId(), dish);
        }

        public Dish getDish(String id) {
            return menu.get(id);
        }

        public Order placeOrder(String customerName, String phone, String address, List<OrderItem> items, String couponCode) {
            String orderId = "FF-" + (100000 + new Random().nextInt(900000));
            Order order = new Order(orderId, customerName, phone, address);
            for (OrderItem item : items) {
                order.addItem(item);
            }

            if ("FEAST30".equalsIgnoreCase(couponCode)) {
                order.applyDiscount(30.0);
                System.out.println(">> Coupon 'FEAST30' Applied: 30% OFF successfully applied!");
            }

            // Assign rider
            if (!riders.isEmpty()) {
                order.setRider(riders.get(0));
            }

            activeOrders.put(orderId, order);
            return order;
        }

        public void printMenu() {
            System.out.println("\n--- FEASTFLOW GOURMET MENU ---");
            for (Dish d : menu.values()) {
                System.out.println("  [" + d.getId() + "] " + d);
            }
            System.out.println("-------------------------------\n");
        }
    }

    // 7. Demonstration Main Runner
    public static void main(String[] args) {
        System.out.println("==================================================");
        System.out.println("       WELCOME TO FEASTFLOW JAVA BACKEND          ");
        System.out.println("==================================================");

        DeliveryService service = new DeliveryService();
        service.printMenu();

        // Simulate creating a cart
        List<OrderItem> customerCart = new ArrayList<>();
        customerCart.add(new OrderItem(service.getDish("D1"), 2, "Medium", Arrays.asList("Extra Cheddar", "House Truffle Dip")));
        customerCart.add(new OrderItem(service.getDish("D6"), 2, "Standard", Collections.emptyList()));

        // Place an order with coupon
        System.out.println("Placing simulated order with coupon code 'FEAST30'...\n");
        Order order = service.placeOrder(
            "Alex Morgan",
            "+1 (555) 019-2834",
            "Apt 4B, 742 Evergreen Terrace, Downtown",
            customerCart,
            "FEAST30"
        );

        // Initial Invoice
        order.printInvoice();

        // Simulate Status Tracking Progression
        System.out.println(">> Simulating Real-Time Order Progression:");
        
        order.setStatus(OrderStatus.PREPARING);
        System.out.println("Stage 2 -> " + order.getStatus().getDescription());

        order.setStatus(OrderStatus.OUT_FOR_DELIVERY);
        System.out.println("Stage 3 -> " + order.getStatus().getDescription());

        order.setStatus(OrderStatus.DELIVERED);
        System.out.println("Stage 4 -> " + order.getStatus().getDescription());

        System.out.println("\nOrder lifecycle demonstration completed successfully!");
    }
}
