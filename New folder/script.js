/**
 * FEASTFLOW - Modern Food Delivery Application
 * Core Client-Side Logic & State Engine
 */

// 1. Food Menu Catalog
const MENU_DATA = [
  {
    id: 'dish-1',
    name: 'Truffle Smash Double Burger',
    category: 'burgers',
    cuisine: 'American Artisan',
    price: 14.99,
    oldPrice: 17.99,
    rating: 4.9,
    reviewsCount: 428,
    prepTime: '15-20 min',
    calories: '720 kcal',
    isVeg: false,
    badge: 'Chef Special',
    image: 'images/hero_burger.jpg',
    description: 'Double Angus beef smashed patties, melted aged Wisconsin cheddar, crispy caramelized onions, artisan brioche bun with secret truffle sauce.'
  },
  {
    id: 'dish-2',
    name: 'Wood-Fired Neapolitan Margherita',
    category: 'pizza',
    cuisine: 'Authentic Italian',
    price: 16.99,
    oldPrice: 19.99,
    rating: 4.9,
    reviewsCount: 382,
    prepTime: '20-25 min',
    calories: '850 kcal',
    isVeg: true,
    badge: 'Popular',
    image: 'images/woodfired_pizza.jpg',
    description: 'San Marzano DOP organic tomato sauce, fresh buffalo mozzarella, aromatic sweet basil leaves, finished with extra virgin cold pressed olive oil.'
  },
  {
    id: 'dish-3',
    name: "Chef's Signature Sushi Platter",
    category: 'asian',
    cuisine: 'Japanese Fine Dining',
    price: 24.99,
    oldPrice: 29.99,
    rating: 5.0,
    reviewsCount: 512,
    prepTime: '20-30 min',
    calories: '520 kcal',
    isVeg: false,
    badge: 'Top Rated',
    image: 'images/sushi_platter.jpg',
    description: 'Artisanal selection featuring premium Norwegian salmon nigiri, spicy tuna crunch roll, avocado dragon roll, served with fresh wasabi and unagi glaze.'
  },
  {
    id: 'dish-4',
    name: 'Mediterranean Quinoa Glow Bowl',
    category: 'bowls',
    cuisine: 'Healthy Mediterranean',
    price: 13.99,
    oldPrice: null,
    rating: 4.8,
    reviewsCount: 295,
    prepTime: '12-15 min',
    calories: '460 kcal',
    isVeg: true,
    badge: 'Superfood',
    image: 'images/fresh_bowl.jpg',
    description: 'Tricolor organic quinoa, creamy Hass avocado, tender herb-marinated grilled chicken or tofu, edamame beans, roasted sweet potatoes, and creamy tahini drizzle.'
  },
  {
    id: 'dish-5',
    name: 'Belgian Molten Chocolate Lava Cake',
    category: 'dessert',
    cuisine: 'French Patisserie',
    price: 8.99,
    oldPrice: 11.50,
    rating: 5.0,
    reviewsCount: 614,
    prepTime: '10-12 min',
    calories: '480 kcal',
    isVeg: true,
    badge: 'Must Try',
    image: 'images/dessert_cake.jpg',
    description: 'Warm oozing 70% dark Belgian chocolate center, handcrafted Tahitian vanilla bean gelato, fresh handpicked raspberries and delicate mint.'
  },
  {
    id: 'dish-6',
    name: 'Dragonfruit Strawberry Refresher',
    category: 'drinks',
    cuisine: 'Craft Mocktail',
    price: 5.99,
    oldPrice: null,
    rating: 4.9,
    reviewsCount: 189,
    prepTime: '5-7 min',
    calories: '130 kcal',
    isVeg: true,
    badge: 'Refreshing',
    image: 'images/refreshing_drink.jpg',
    description: 'Vibrant iced dragonfruit nectar, freshly sliced California strawberries, crushed mint sprigs, sparkling splash of key lime juice.'
  },
  {
    id: 'dish-7',
    name: 'Crispy Korean Fried Chicken Wings',
    category: 'asian',
    cuisine: 'Korean Street Food',
    price: 15.50,
    oldPrice: 18.00,
    rating: 4.9,
    reviewsCount: 340,
    prepTime: '15-20 min',
    calories: '690 kcal',
    isVeg: false,
    badge: 'Spicy 🔥',
    image: 'images/hero_burger.jpg', // fallback image
    description: 'Ultra-crispy double-fried chicken wings glazed in sweet spicy gochujang chili sauce, sprinkled with toasted sesame seeds and crushed peanuts.'
  },
  {
    id: 'dish-8',
    name: 'Artisan Four Cheese Quattro Formaggi',
    category: 'pizza',
    cuisine: 'Italian Gourmet',
    price: 17.50,
    oldPrice: null,
    rating: 4.7,
    reviewsCount: 220,
    prepTime: '20-25 min',
    calories: '890 kcal',
    isVeg: true,
    badge: 'Cheesy',
    image: 'images/woodfired_pizza.jpg',
    description: 'Rich blend of creamy Mozzarella, aged Gorgonzola, delicate Fontina, and shaved Parmigiano-Reggiano with a drizzle of white truffle honey.'
  }
];

// 2. Application State
const state = {
  cart: JSON.parse(localStorage.getItem('feastflow_cart')) || [],
  favorites: JSON.parse(localStorage.getItem('feastflow_favs')) || [],
  theme: localStorage.getItem('feastflow_theme') || 'dark',
  activeCategory: 'all',
  activeDiet: 'all',
  searchQuery: '',
  sortBy: 'popular',
  appliedCoupon: null,
  activeOrder: JSON.parse(localStorage.getItem('feastflow_order')) || null,
  deliveryAddress: '742 Evergreen Terrace, Downtown'
};

// Available Promo Coupons
const COUPONS = {
  'FEAST30': { discountPercent: 30, maxDiscount: 15, label: '30% OFF' },
  'FREEDEL': { freeDelivery: true, label: 'Free Delivery' },
  'BITE10': { discountFixed: 10, minOrder: 30, label: '$10 OFF' }
};

// 3. Initialization
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  setupEventListeners();
  renderDishes();
  updateCartUI();
  updateFavoritesUI();
  
  if (state.activeOrder) {
    setupOrderTimer();
  }
});

// 4. Theme Handling
function initTheme() {
  document.documentElement.setAttribute('data-theme', state.theme);
  const themeBtn = document.getElementById('themeToggleBtn');
  if (themeBtn) {
    themeBtn.innerHTML = state.theme === 'dark' ? '☀️' : '🌙';
  }
}

function toggleTheme() {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', state.theme);
  localStorage.setItem('feastflow_theme', state.theme);
  const themeBtn = document.getElementById('themeToggleBtn');
  if (themeBtn) {
    themeBtn.innerHTML = state.theme === 'dark' ? '☀️' : '🌙';
  }
  showToast(`Switched to ${state.theme} mode`, 'info');
}

// 5. Dish Filtering & Rendering
function getFilteredDishes() {
  return MENU_DATA.filter(dish => {
    // Category Filter
    if (state.activeCategory !== 'all' && dish.category !== state.activeCategory) {
      return false;
    }
    // Dietary Filter
    if (state.activeDiet === 'veg' && !dish.isVeg) return false;
    if (state.activeDiet === 'non-veg' && dish.isVeg) return false;
    // Search Query
    if (state.searchQuery.trim() !== '') {
      const q = state.searchQuery.toLowerCase();
      const matchName = dish.name.toLowerCase().includes(q);
      const matchCuisine = dish.cuisine.toLowerCase().includes(q);
      const matchDesc = dish.description.toLowerCase().includes(q);
      if (!matchName && !matchCuisine && !matchDesc) return false;
    }
    return true;
  }).sort((a, b) => {
    if (state.sortBy === 'price-low') return a.price - b.price;
    if (state.sortBy === 'price-high') return b.price - a.price;
    if (state.sortBy === 'rating') return b.rating - a.rating;
    return b.reviewsCount - a.reviewsCount; // popular
  });
}

function renderDishes() {
  const container = document.getElementById('dishesGrid');
  if (!container) return;

  const dishes = getFilteredDishes();

  if (dishes.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 4rem 1rem;">
        <div style="font-size: 3.5rem; margin-bottom: 1rem;">🔍</div>
        <h3 style="font-size: 1.4rem; font-family: var(--font-display); margin-bottom: 0.5rem;">No delicious matches found</h3>
        <p style="color: var(--text-secondary);">Try changing your search keywords or dietary filters.</p>
        <button onclick="resetFilters()" style="margin-top: 1.25rem; background: var(--primary); color: white; padding: 0.6rem 1.4rem; border-radius: var(--radius-full); font-weight: 700;">Reset Filters</button>
      </div>
    `;
    return;
  }

  container.innerHTML = dishes.map(dish => {
    const cartItem = state.cart.find(item => item.id === dish.id);
    const isFav = state.favorites.includes(dish.id);

    return `
      <div class="dish-card" data-dish-id="${dish.id}">
        <div class="dish-image-box" onclick="openDishModal('${dish.id}')">
          <img src="${dish.image}" alt="${dish.name}" class="dish-img" loading="lazy">
          
          <div class="dish-diet-indicator ${dish.isVeg ? 'veg' : 'non-veg'}" title="${dish.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}">
            <span class="diet-dot"></span>
          </div>

          <button class="fav-btn ${isFav ? 'favorited' : ''}" onclick="event.stopPropagation(); toggleFavorite('${dish.id}')" aria-label="Save to favorites">
            ${isFav ? '❤️' : '🤍'}
          </button>

          ${dish.badge ? `<div class="dish-badge-overlay">✨ ${dish.badge}</div>` : ''}
        </div>

        <div class="dish-body">
          <div class="dish-cuisine">${dish.cuisine}</div>
          <h3 class="dish-title" onclick="openDishModal('${dish.id}')">${dish.name}</h3>
          <p class="dish-desc">${dish.description}</p>

          <div class="dish-meta-row">
            <span class="dish-rating">
              <span class="star-icon">★</span> ${dish.rating} <span style="color: var(--text-muted); font-size: 0.78rem;">(${dish.reviewsCount})</span>
            </span>
            <span class="dish-calories">🔥 ${dish.calories}</span>
            <span>⏱️ ${dish.prepTime}</span>
          </div>

          <div class="dish-footer">
            <div class="dish-price-box">
              <span class="dish-price">$${dish.price.toFixed(2)}</span>
              ${dish.oldPrice ? `<span class="dish-old-price">$${dish.oldPrice.toFixed(2)}</span>` : ''}
            </div>

            <div id="btn-container-${dish.id}">
              ${cartItem ? renderCardStepper(dish.id, cartItem.qty) : `
                <button class="add-cart-btn" onclick="addToCart('${dish.id}')">
                  <span>+</span> Add
                </button>
              `}
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function renderCardStepper(dishId, qty) {
  return `
    <div class="cart-stepper">
      <button class="stepper-btn" onclick="changeQty('${dishId}', -1)" aria-label="Decrease quantity">−</button>
      <span class="stepper-val">${qty}</span>
      <button class="stepper-btn" onclick="changeQty('${dishId}', 1)" aria-label="Increase quantity">+</button>
    </div>
  `;
}

// 6. Cart Management
function addToCart(dishId, customDetails = null) {
  const dish = MENU_DATA.find(d => d.id === dishId);
  if (!dish) return;

  const existingIndex = state.cart.findIndex(item => item.id === dishId);
  if (existingIndex > -1) {
    state.cart[existingIndex].qty += 1;
  } else {
    state.cart.push({
      id: dish.id,
      name: dish.name,
      price: dish.price,
      image: dish.image,
      qty: 1,
      spiceLevel: customDetails ? customDetails.spiceLevel : 'Medium',
      addons: customDetails ? customDetails.addons : []
    });
  }

  saveCart();
  updateCartUI();
  renderDishes();
  showToast(`Added ${dish.name} to cart! 🍔`, 'success');
}

function changeQty(dishId, delta) {
  const itemIndex = state.cart.findIndex(i => i.id === dishId);
  if (itemIndex === -1) return;

  state.cart[itemIndex].qty += delta;
  if (state.cart[itemIndex].qty <= 0) {
    const removedName = state.cart[itemIndex].name;
    state.cart.splice(itemIndex, 1);
    showToast(`Removed ${removedName} from cart`, 'info');
  }

  saveCart();
  updateCartUI();
  renderDishes();
}

function removeFromCart(dishId) {
  const itemIndex = state.cart.findIndex(i => i.id === dishId);
  if (itemIndex > -1) {
    const removedName = state.cart[itemIndex].name;
    state.cart.splice(itemIndex, 1);
    saveCart();
    updateCartUI();
    renderDishes();
    showToast(`Removed ${removedName} from cart`, 'info');
  }
}

function saveCart() {
  localStorage.setItem('feastflow_cart', JSON.stringify(state.cart));
}

function updateCartUI() {
  const totalItems = state.cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  // Update Nav Cart Buttons
  const navBadge = document.getElementById('navCartCount');
  const navPrice = document.getElementById('navCartPrice');
  if (navBadge) navBadge.textContent = totalItems;
  if (navPrice) navPrice.textContent = `$${subtotal.toFixed(2)}`;

  // Update Drawer
  renderCartDrawer(subtotal, totalItems);
}

function renderCartDrawer(subtotal, totalItems) {
  const listContainer = document.getElementById('cartItemsList');
  const emptyState = document.getElementById('cartEmptyState');
  const footerContainer = document.getElementById('cartFooter');
  const checkoutBtn = document.getElementById('checkoutProceedBtn');

  if (!listContainer) return;

  if (state.cart.length === 0) {
    listContainer.style.display = 'none';
    if (emptyState) emptyState.style.display = 'flex';
    if (footerContainer) footerContainer.style.display = 'none';
    if (checkoutBtn) checkoutBtn.disabled = true;
    updateFreeDeliveryBar(0);
    return;
  }

  listContainer.style.display = 'flex';
  if (emptyState) emptyState.style.display = 'none';
  if (footerContainer) footerContainer.style.display = 'block';
  if (checkoutBtn) checkoutBtn.disabled = false;

  listContainer.innerHTML = state.cart.map(item => `
    <div class="cart-item-row">
      <img src="${item.image}" alt="${item.name}" class="cart-item-thumb">
      <div class="cart-item-info">
        <h4 class="cart-item-name">${item.name}</h4>
        <div class="cart-item-price">$${(item.price * item.qty).toFixed(2)}</div>
      </div>
      <div class="cart-item-stepper">
        <button class="cart-item-btn" onclick="changeQty('${item.id}', -1)">−</button>
        <span style="font-weight: 700; font-size: 0.85rem; padding: 0 4px;">${item.qty}</span>
        <button class="cart-item-btn" onclick="changeQty('${item.id}', 1)">+</button>
      </div>
      <button class="cart-item-delete" onclick="removeFromCart('${item.id}')" title="Delete">🗑️</button>
    </div>
  `).join('');

  // Calculations
  updateFreeDeliveryBar(subtotal);

  let deliveryFee = subtotal >= 35 ? 0 : 3.99;
  let tax = subtotal * 0.08;
  let discount = 0;

  if (state.appliedCoupon) {
    const coupon = state.appliedCoupon;
    if (coupon.freeDelivery) {
      deliveryFee = 0;
    } else if (coupon.discountPercent) {
      discount = (subtotal * coupon.discountPercent) / 100;
      if (coupon.maxDiscount && discount > coupon.maxDiscount) {
        discount = coupon.maxDiscount;
      }
    } else if (coupon.discountFixed) {
      discount = coupon.discountFixed;
    }
  }

  const grandTotal = Math.max(0, subtotal + deliveryFee + tax - discount);

  document.getElementById('cartSubtotal').textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById('cartDeliveryFee').textContent = deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`;
  document.getElementById('cartTax').textContent = `$${tax.toFixed(2)}`;
  
  const discountRow = document.getElementById('cartDiscountRow');
  if (discount > 0) {
    discountRow.style.display = 'flex';
    document.getElementById('cartDiscountVal').textContent = `-$${discount.toFixed(2)}`;
  } else {
    discountRow.style.display = 'none';
  }

  document.getElementById('cartGrandTotal').textContent = `$${grandTotal.toFixed(2)}`;
}

function updateFreeDeliveryBar(subtotal) {
  const target = 35;
  const pct = Math.min(100, (subtotal / target) * 100);
  const fill = document.getElementById('freeShippingFill');
  const text = document.getElementById('freeShippingText');

  if (fill) fill.style.width = `${pct}%`;
  if (text) {
    if (subtotal >= target) {
      text.innerHTML = '🎉 You unlocked <strong>FREE Delivery!</strong>';
    } else {
      const remaining = (target - subtotal).toFixed(2);
      text.innerHTML = `Add <strong>$${remaining}</strong> more for FREE Delivery 🚚`;
    }
  }
}

// 7. Coupon Handling
function applyCouponCode() {
  const input = document.getElementById('couponCodeInput');
  if (!input) return;
  const code = input.value.trim().toUpperCase();

  if (!code) {
    showToast('Please enter a coupon code', 'error');
    return;
  }

  if (COUPONS[code]) {
    state.appliedCoupon = COUPONS[code];
    showToast(`Coupon ${code} applied successfully! 🎉`, 'success');
    updateCartUI();
  } else {
    showToast('Invalid promo code. Try "FEAST30"', 'error');
  }
}

function quickApplyCoupon(code) {
  const input = document.getElementById('couponCodeInput');
  if (input) input.value = code;
  if (COUPONS[code]) {
    state.appliedCoupon = COUPONS[code];
    showToast(`Code ${code} activated! 🎁`, 'success');
    updateCartUI();
    openCartDrawer();
  }
}

// 8. Favorites / Wishlist
function toggleFavorite(dishId) {
  const index = state.favorites.indexOf(dishId);
  const dish = MENU_DATA.find(d => d.id === dishId);
  if (index > -1) {
    state.favorites.splice(index, 1);
    showToast(`Removed from favorites`, 'info');
  } else {
    state.favorites.push(dishId);
    showToast(`Added ${dish?.name || 'dish'} to favorites! ❤️`, 'success');
  }
  localStorage.setItem('feastflow_favs', JSON.stringify(state.favorites));
  updateFavoritesUI();
  renderDishes();
}

function updateFavoritesUI() {
  const favBadge = document.getElementById('navFavCount');
  if (favBadge) favBadge.textContent = state.favorites.length;
}

// 9. Quick-View Dish Modal
let currentModalDish = null;

function openDishModal(dishId) {
  const dish = MENU_DATA.find(d => d.id === dishId);
  if (!dish) return;
  currentModalDish = dish;

  const modal = document.getElementById('dishDetailModal');
  const img = document.getElementById('modalDishImage');
  const title = document.getElementById('modalDishTitle');
  const desc = document.getElementById('modalDishDesc');
  const price = document.getElementById('modalDishPrice');
  const rating = document.getElementById('modalDishRating');
  const cal = document.getElementById('modalDishCalories');
  const time = document.getElementById('modalDishTime');

  if (img) img.src = dish.image;
  if (title) title.textContent = dish.name;
  if (desc) desc.textContent = dish.description;
  if (price) price.textContent = `$${dish.price.toFixed(2)}`;
  if (rating) rating.innerHTML = `★ ${dish.rating} (${dish.reviewsCount} reviews)`;
  if (cal) cal.textContent = dish.calories;
  if (time) time.textContent = dish.prepTime;

  // Reset spice selectors
  document.querySelectorAll('.spice-radio-btn').forEach(btn => {
    btn.classList.toggle('selected', btn.dataset.spice === 'Medium');
  });

  // Reset checkboxes
  document.querySelectorAll('.addon-checkbox').forEach(box => box.checked = false);

  modal.classList.add('open');
}

function closeDishModal() {
  const modal = document.getElementById('dishDetailModal');
  if (modal) modal.classList.remove('open');
  currentModalDish = null;
}

function addCustomDishFromModal() {
  if (!currentModalDish) return;
  const selectedSpice = document.querySelector('.spice-radio-btn.selected')?.dataset.spice || 'Medium';
  const addons = Array.from(document.querySelectorAll('.addon-checkbox:checked')).map(cb => cb.value);

  addToCart(currentModalDish.id, {
    spiceLevel: selectedSpice,
    addons: addons
  });

  closeDishModal();
}

// 10. Drawer & Modal Controls
function openCartDrawer() {
  const drawerOverlay = document.getElementById('cartDrawerOverlay');
  if (drawerOverlay) drawerOverlay.classList.add('open');
}

function closeCartDrawer() {
  const drawerOverlay = document.getElementById('cartDrawerOverlay');
  if (drawerOverlay) drawerOverlay.classList.remove('open');
}

function openCheckoutModal() {
  if (state.cart.length === 0) {
    showToast('Your cart is empty!', 'error');
    return;
  }
  closeCartDrawer();
  const modal = document.getElementById('checkoutModal');
  if (modal) modal.classList.add('open');
}

function closeCheckoutModal() {
  const modal = document.getElementById('checkoutModal');
  if (modal) modal.classList.remove('open');
}

// 11. Checkout & Order Placement
function handleCheckoutSubmit(e) {
  e.preventDefault();

  const nameInput = document.getElementById('orderCustName').value.trim();
  const phoneInput = document.getElementById('orderCustPhone').value.trim();
  const addressInput = document.getElementById('orderCustAddress').value.trim();
  const paymentMethod = document.querySelector('.payment-card-opt.selected')?.dataset.payment || 'Card';

  if (!nameInput || !phoneInput || !addressInput) {
    showToast('Please fill out all delivery fields!', 'error');
    return;
  }

  // Generate order
  const orderId = 'FF-' + Math.floor(100000 + Math.random() * 900000);
  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const deliveryFee = subtotal >= 35 ? 0 : 3.99;
  const grandTotal = subtotal + deliveryFee + (subtotal * 0.08);

  const orderData = {
    id: orderId,
    customerName: nameInput,
    phone: phoneInput,
    address: addressInput,
    paymentMethod: paymentMethod,
    items: [...state.cart],
    total: grandTotal.toFixed(2),
    timestamp: Date.now(),
    currentStage: 1, // 1: Confirmed, 2: Preparing, 3: On The Way, 4: Delivered
    etaMinutes: 28
  };

  state.activeOrder = orderData;
  localStorage.setItem('feastflow_order', JSON.stringify(orderData));

  // Clear Cart
  state.cart = [];
  state.appliedCoupon = null;
  saveCart();
  updateCartUI();
  renderDishes();

  closeCheckoutModal();
  showToast('Order placed successfully! 🚀', 'success');
  openLiveTrackerModal();
  setupOrderTimer();
}

// 12. Live Order Tracker
function openLiveTrackerModal() {
  if (!state.activeOrder) {
    showToast('No active order to track!', 'info');
    return;
  }
  const modal = document.getElementById('trackerModal');
  if (modal) {
    renderTrackerContent();
    modal.classList.add('open');
  }
}

function closeLiveTrackerModal() {
  const modal = document.getElementById('trackerModal');
  if (modal) modal.classList.remove('open');
}

function renderTrackerContent() {
  if (!state.activeOrder) return;
  const order = state.activeOrder;

  document.getElementById('trackerOrderId').textContent = `Order #${order.id}`;
  document.getElementById('trackerEtaDisplay').textContent = `${order.etaMinutes} mins`;
  document.getElementById('trackerAddressDisplay').textContent = order.address;

  // Stages
  const steps = [
    { num: 1, id: 'step-1' },
    { num: 2, id: 'step-2' },
    { num: 3, id: 'step-3' },
    { num: 4, id: 'step-4' }
  ];

  steps.forEach(step => {
    const el = document.getElementById(step.id);
    if (!el) return;
    el.classList.remove('completed', 'active');
    if (order.currentStage > step.num) {
      el.classList.add('completed');
    } else if (order.currentStage === step.num) {
      el.classList.add('active');
    }
  });

  // Progress line width
  const progressLine = document.getElementById('trackerProgressLine');
  if (progressLine) {
    const pcts = [0, 15, 50, 85, 100];
    progressLine.style.width = `${pcts[order.currentStage]}%`;
  }
}

function advanceOrderStage() {
  if (!state.activeOrder) return;
  if (state.activeOrder.currentStage < 4) {
    state.activeOrder.currentStage += 1;
    state.activeOrder.etaMinutes = Math.max(0, state.activeOrder.etaMinutes - 8);
    localStorage.setItem('feastflow_order', JSON.stringify(state.activeOrder));
    renderTrackerContent();

    const stageNames = ['', 'Order Confirmed', 'Chef is Preparing', 'Rider is on the Way 🛵', 'Delivered! Enjoy your meal 😋'];
    showToast(stageNames[state.activeOrder.currentStage], 'success');
  } else {
    showToast('Order has already been delivered! Thank you!', 'info');
  }
}

function setupOrderTimer() {
  // Automatically advance stages over time for realistic demo experience
  if (!state.activeOrder) return;
  if (state.activeOrder.currentStage >= 4) return;

  const timer = setInterval(() => {
    if (!state.activeOrder || state.activeOrder.currentStage >= 4) {
      clearInterval(timer);
      return;
    }
    advanceOrderStage();
  }, 25000); // progresses every 25 seconds for demonstration
}

// 13. Toast Notification
function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  const icon = type === 'success' ? '✅' : type === 'error' ? '⚠️' : 'ℹ️';
  toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('hide');
    setTimeout(() => toast.remove(), 350);
  }, 3200);
}

// 14. Event Listeners & Interactions
function setupEventListeners() {
  // Theme Toggle
  const themeBtn = document.getElementById('themeToggleBtn');
  if (themeBtn) themeBtn.addEventListener('click', toggleTheme);

  // Cart Drawer open/close
  document.getElementById('navCartBtn')?.addEventListener('click', openCartDrawer);
  document.getElementById('closeCartDrawerBtn')?.addEventListener('click', closeCartDrawer);
  document.getElementById('cartDrawerOverlay')?.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeCartDrawer();
  });

  // Modal overlays click outside
  document.getElementById('dishDetailModal')?.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeDishModal();
  });
  document.getElementById('checkoutModal')?.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeCheckoutModal();
  });
  document.getElementById('trackerModal')?.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeLiveTrackerModal();
  });

  // Category Pills
  document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.category-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      state.activeCategory = card.dataset.category;
      renderDishes();
    });
  });

  // Dietary Pills
  document.querySelectorAll('.diet-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.diet-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      state.activeDiet = pill.dataset.diet;
      renderDishes();
    });
  });

  // Search Inputs
  const handleSearch = (e) => {
    state.searchQuery = e.target.value;
    renderDishes();
  };

  document.getElementById('heroSearchInput')?.addEventListener('input', (e) => {
    state.searchQuery = e.target.value;
    renderDishes();
    document.getElementById('menuSection')?.scrollIntoView({ behavior: 'smooth' });
  });

  document.getElementById('menuSearchInput')?.addEventListener('input', handleSearch);

  // Sorting
  document.getElementById('sortSelect')?.addEventListener('change', (e) => {
    state.sortBy = e.target.value;
    renderDishes();
  });

  // Spice selectors in modal
  document.querySelectorAll('.spice-radio-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.spice-radio-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
    });
  });

  // Payment method selection in checkout
  document.querySelectorAll('.payment-card-opt').forEach(opt => {
    opt.addEventListener('click', () => {
      document.querySelectorAll('.payment-card-opt').forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
    });
  });

  // Checkout form submit
  document.getElementById('checkoutForm')?.addEventListener('submit', handleCheckoutSubmit);

  // Location selector change prompt
  document.getElementById('locationSelector')?.addEventListener('click', () => {
    const newAddress = prompt('Enter your delivery address:', state.deliveryAddress);
    if (newAddress && newAddress.trim() !== '') {
      state.deliveryAddress = newAddress.trim();
      document.getElementById('currentLocationText').textContent = state.deliveryAddress;
      showToast(`Delivery location set to: ${state.deliveryAddress}`, 'info');
    }
  });
}

function resetFilters() {
  state.activeCategory = 'all';
  state.activeDiet = 'all';
  state.searchQuery = '';
  document.querySelectorAll('.category-card').forEach(c => c.classList.toggle('active', c.dataset.category === 'all'));
  document.querySelectorAll('.diet-pill').forEach(p => p.classList.toggle('active', p.dataset.diet === 'all'));
  const searchInput = document.getElementById('menuSearchInput');
  if (searchInput) searchInput.value = '';
  renderDishes();
}
