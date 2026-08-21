// ── DATA ──
  const products = [
    { id:1, name:"Wireless Headphones", brand:"SoundMax", category:"Electronics", price:1299, oldPrice:1999, rating:4.5, reviews:245, emoji:"🎧", badge:"sale", inStock:true, desc:"Premium wireless headphones with 30-hour battery life, active noise cancellation, and crystal-clear audio. Foldable design for easy carrying." },
    { id:2, name:"Smartphone Stand", brand:"DeskMate", category:"Electronics", price:399, oldPrice:null, rating:4.2, reviews:89, emoji:"📱", badge:null, inStock:true, desc:"Adjustable aluminum smartphone stand. Compatible with all phone sizes. Anti-slip base, 360-degree rotation." },
    { id:3, name:"Python Programming Book", brand:"TechPress", category:"Books", price:549, oldPrice:699, rating:4.8, reviews:512, emoji:"📘", badge:"sale", inStock:true, desc:"Comprehensive guide to Python programming from basics to advanced concepts. Includes 200+ exercises and real-world projects." },
    { id:4, name:"Men's Polo T-Shirt", brand:"StyleCo", category:"Clothing", price:499, oldPrice:799, rating:4.1, reviews:178, emoji:"👕", badge:"sale", inStock:true, desc:"100% cotton premium polo T-shirt. Available in 8 colors. Machine washable. Regular fit for everyday comfort." },
    { id:5, name:"Yoga Mat", brand:"FitLife", category:"Sports", price:699, oldPrice:null, rating:4.6, reviews:334, emoji:"🧘", badge:"new", inStock:true, desc:"Eco-friendly non-slip yoga mat with alignment lines. 6mm thickness for joint support. Includes carry strap." },
    { id:6, name:"LED Table Lamp", brand:"BrightHome", category:"Home", price:899, oldPrice:1200, rating:4.3, reviews:156, emoji:"💡", badge:"sale", inStock:true, desc:"Touch-controlled LED table lamp with 3 brightness levels and colour temperature settings. USB charging port built-in." },
    { id:7, name:"Face Serum", brand:"GlowUp", category:"Beauty", price:649, oldPrice:null, rating:4.7, reviews:421, emoji:"✨", badge:"new", inStock:true, desc:"Vitamin C brightening face serum with hyaluronic acid. Dermatologist tested. Suitable for all skin types. 30ml bottle." },
    { id:8, name:"Building Blocks Set", brand:"KidZone", category:"Toys", price:799, oldPrice:999, rating:4.9, reviews:267, emoji:"🧱", badge:"sale", inStock:true, desc:"Creative 500-piece building blocks set for children aged 4+. Develops motor skills and creativity. BPA-free certified." },
    { id:9, name:"Bluetooth Speaker", brand:"SoundMax", category:"Electronics", price:1599, oldPrice:2199, rating:4.4, reviews:198, emoji:"🔊", badge:"sale", inStock:true, desc:"Portable waterproof Bluetooth speaker with 360° sound. 12-hour battery. IPX7 rating. Works up to 10 metres range." },
    { id:10, name:"Cotton Kurta", brand:"EthnicWear", category:"Clothing", price:599, oldPrice:null, rating:4.0, reviews:93, emoji:"👘", badge:"new", inStock:true, desc:"Traditional handwoven cotton kurta. Breathable fabric, perfect for everyday wear. Available in multiple sizes and prints." },
    { id:11, name:"Data Structures Book", brand:"TechPress", category:"Books", price:449, oldPrice:600, rating:4.7, reviews:389, emoji:"📗", badge:"sale", inStock:true, desc:"Master DSA concepts with this comprehensive guide. Covers arrays, linked lists, trees, graphs, and dynamic programming with Java examples." },
    { id:12, name:"Dumbbell Set 5kg", brand:"FitLife", category:"Sports", price:1299, oldPrice:1600, rating:4.5, reviews:211, emoji:"🏋️", badge:null, inStock:false, desc:"Cast iron dumbbell set with rubber coating. Anti-slip grip handle. Ideal for home gym workouts. Pair of 5kg dumbbells." },
    { id:13, name:"Ceramic Coffee Mug", brand:"BrewHouse", category:"Home", price:299, oldPrice:null, rating:4.2, reviews:134, emoji:"☕", badge:"new", inStock:true, desc:"350ml ceramic coffee mug with comfortable handle. Microwave and dishwasher safe. Available in pastel colour collection." },
    { id:14, name:"Lip Care Set", brand:"GlowUp", category:"Beauty", price:349, oldPrice:499, rating:4.3, reviews:187, emoji:"💋", badge:"sale", inStock:true, desc:"4-piece lip care set including SPF lip balm, overnight mask, scrub, and moisturising gloss. All-day hydration formula." },
    { id:15, name:"Mechanical Keyboard", brand:"TypePro", category:"Electronics", price:2499, oldPrice:3299, rating:4.6, reviews:302, emoji:"⌨️", badge:"sale", inStock:true, desc:"Full-size mechanical keyboard with blue switches. RGB backlit keys, anti-ghosting, and durable aluminium frame. Plug & play USB." },
    { id:16, name:"Kids Puzzle 100pc", brand:"KidZone", category:"Toys", price:349, oldPrice:null, rating:4.8, reviews:143, emoji:"🧩", badge:"new", inStock:true, desc:"100-piece educational jigsaw puzzle featuring world maps and animals. Develops problem-solving skills for children aged 5+." },
  ];

  let cart = [];
  let wishlist = new Set();
  let activeCategory = 'All';
  let maxPrice = 2000;
  let minRating = 0;
  let sortMode = 'default';
  let currentModalProduct = null;

  // ── RENDER ──
  function getFiltered() {
    let list = products.filter(p => {
      const matchCat = activeCategory === 'All' || p.category === activeCategory;
      const searchVal = document.getElementById('searchInput').value.toLowerCase();
      const matchSearch = p.name.toLowerCase().includes(searchVal) || p.brand.toLowerCase().includes(searchVal);
      const matchPrice = p.price <= maxPrice;
      const matchRating = p.rating >= minRating;
      return matchCat && matchSearch && matchPrice && matchRating;
    });
    if (sortMode === 'price-low') list.sort((a,b)=>a.price-b.price);
    else if (sortMode === 'price-high') list.sort((a,b)=>b.price-a.price);
    else if (sortMode === 'rating') list.sort((a,b)=>b.rating-a.rating);
    else if (sortMode === 'name') list.sort((a,b)=>a.name.localeCompare(b.name));
    return list;
  }

  function renderProducts() {
    const list = getFiltered();
    const grid = document.getElementById('productsGrid');
    document.getElementById('resultCount').textContent = list.length + ' products found';
    if (list.length === 0) {
      grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:3rem;color:var(--text-muted);">😔 No products found. Try a different search or filter.</div>';
      return;
    }
    grid.innerHTML = list.map(p => {
      const inCartItem = cart.find(c=>c.id===p.id);
      const liked = wishlist.has(p.id);
      return `
        <div class="product-card" onclick="openModal(${p.id})">
          ${p.badge==='sale'?'<span class="badge badge-sale">SALE</span>':''}
          ${p.badge==='new'?'<span class="badge badge-new">NEW</span>':''}
          <button class="wishlist-btn ${liked?'liked':''}" onclick="event.stopPropagation();toggleWishlist(${p.id},this)">
            ${liked?'❤️':'🤍'}
          </button>
          <div class="product-img">${p.emoji}</div>
          <div class="product-info">
            <div class="product-name">${p.name}</div>
            <div class="product-brand">${p.brand}</div>
            <div class="product-rating">
              <span class="stars">${getStars(p.rating)}</span>
              <span>${p.rating} (${p.reviews})</span>
            </div>
            <div class="product-price">
              <span class="price">₹${p.price}</span>
              ${p.oldPrice?`<span class="price-old">₹${p.oldPrice}</span>`:''}
            </div>
            <button class="add-cart-btn ${inCartItem?'in-cart':''}"
              onclick="event.stopPropagation();addToCart(${p.id})"
              ${!p.inStock?'disabled style="background:#94a3b8;cursor:not-allowed"':''}>
              ${!p.inStock?'Out of Stock':inCartItem?'✓ In Cart':'Add to Cart'}
            </button>
          </div>
        </div>`;
    }).join('');
  }

  function getStars(r) {
    const full = Math.floor(r);
    const half = r % 1 >= 0.5;
    let s = '';
    for(let i=0;i<full;i++) s+='★';
    if(half) s+='☆';
    return s;
  }

  // ── FILTERS ──
  function filterCategory(cat, el) {
    activeCategory = cat;
    document.querySelectorAll('.cat-chip').forEach(c=>c.classList.remove('active'));
    el.classList.add('active');
    renderProducts();
  }
  function filterProducts() { renderProducts(); }
  function applyPriceFilter(v) {
    maxPrice = parseInt(v);
    document.getElementById('priceLabel').textContent = '₹' + v;
    renderProducts();
  }
  function applyRatingFilter(v) { minRating = parseFloat(v); renderProducts(); }
  function sortProducts(v) { sortMode = v; renderProducts(); }

  // ── WISHLIST ──
  function toggleWishlist(id, btn) {
    if(wishlist.has(id)) { wishlist.delete(id); btn.textContent='🤍'; btn.classList.remove('liked'); }
    else { wishlist.add(id); btn.textContent='❤️'; btn.classList.add('liked'); showToast('Added to wishlist ❤️'); }
  }

  // ── CART ──
  function addToCart(id) {
    const p = products.find(x=>x.id===id);
    if(!p || !p.inStock) return;
    const existing = cart.find(c=>c.id===id);
    if(existing) existing.qty++;
    else cart.push({...p, qty:1});
    updateCartCount();
    renderProducts();
    renderCart();
    showToast('✅ ' + p.name + ' added to cart!');
  }
  function removeFromCart(id) {
    cart = cart.filter(c=>c.id!==id);
    updateCartCount();
    renderCart();
    renderProducts();
  }
  function changeQty(id, delta) {
    const item = cart.find(c=>c.id===id);
    if(!item) return;
    item.qty += delta;
    if(item.qty <= 0) { removeFromCart(id); return; }
    renderCart();
    updateCartCount();
  }
  function updateCartCount() {
    const total = cart.reduce((s,c)=>s+c.qty,0);
    document.getElementById('cartCount').textContent = total;
  }
  function renderCart() {
    const el = document.getElementById('cartItems');
    if(cart.length === 0) {
      el.innerHTML = '<div class="cart-empty"><span>🛒</span>Your cart is empty.<br><small>Add some products to get started!</small></div>';
      document.getElementById('cartSummary').innerHTML = '';
      return;
    }
    el.innerHTML = cart.map(c=>`
      <div class="cart-item">
        <div class="cart-item-img">${c.emoji}</div>
        <div class="cart-item-info">
          <div class="cart-item-name">${c.name}</div>
          <div class="cart-item-price">₹${(c.price * c.qty).toLocaleString()}</div>
          <div class="qty-control">
            <button class="qty-btn" onclick="changeQty(${c.id},-1)">−</button>
            <span class="qty-val">${c.qty}</span>
            <button class="qty-btn" onclick="changeQty(${c.id},1)">+</button>
          </div>
        </div>
        <button class="remove-btn" onclick="removeFromCart(${c.id})" title="Remove">🗑️</button>
      </div>`).join('');
    const subtotal = cart.reduce((s,c)=>s+c.price*c.qty,0);
    const delivery = subtotal > 999 ? 0 : 49;
    const tax = Math.round(subtotal * 0.05);
    const total = subtotal + delivery + tax;
    document.getElementById('cartSummary').innerHTML = `
      <div class="summary-row"><span>Subtotal (${cart.reduce((s,c)=>s+c.qty,0)} items)</span><span>₹${subtotal.toLocaleString()}</span></div>
      <div class="summary-row"><span>Delivery</span><span>${delivery===0?'FREE':'₹'+delivery}</span></div>
      <div class="summary-row"><span>Tax (5%)</span><span>₹${tax}</span></div>
      <div class="summary-row total"><span>Total</span><span>₹${total.toLocaleString()}</span></div>`;
  }
  function openCart() {
    document.getElementById('cartDrawer').classList.add('open');
    document.getElementById('overlay').classList.add('open');
    renderCart();
  }
  function closeCart() {
    document.getElementById('cartDrawer').classList.remove('open');
    document.getElementById('overlay').classList.remove('open');
  }

  // ── CHECKOUT ──
  function goToCheckout() {
    if(cart.length === 0) { showToast('Your cart is empty!'); return; }
    closeCart();
    document.getElementById('heroSection').style.display='none';
    document.getElementById('categoriesSection').style.display='none';
    document.getElementById('shopMain').style.display='none';
    document.getElementById('footerEl').style.display='none';
    document.getElementById('checkoutPage').classList.add('open');
    const subtotal = cart.reduce((s,c)=>s+c.price*c.qty,0);
    const delivery = subtotal > 999 ? 0 : 49;
    const tax = Math.round(subtotal * 0.05);
    const total = subtotal + delivery + tax;
    document.getElementById('checkoutSummary').innerHTML = cart.map(c=>`
      <div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid var(--border);font-size:0.87rem;">
        <span>${c.emoji} ${c.name} × ${c.qty}</span><span>₹${(c.price*c.qty).toLocaleString()}</span>
      </div>`).join('') + `
      <div style="display:flex;justify-content:space-between;padding:10px 0 4px;font-weight:700;font-size:1rem;">
        <span>Total</span><span>₹${total.toLocaleString()}</span>
      </div>`;
    window.scrollTo(0,0);
  }
  function closeCheckout() {
    document.getElementById('checkoutPage').classList.remove('open');
    document.getElementById('heroSection').style.display='';
    document.getElementById('categoriesSection').style.display='';
    document.getElementById('shopMain').style.display='';
    document.getElementById('footerEl').style.display='';
  }
  function placeOrder() {
    document.getElementById('checkoutPage').classList.remove('open');
    document.getElementById('successPage').classList.add('open');
    document.getElementById('footerEl').style.display='';
    const oid = '#HOA-' + Math.floor(100000+Math.random()*900000);
    document.getElementById('orderId').textContent = 'Order ID: ' + oid;
    cart = [];
    updateCartCount();
    window.scrollTo(0,0);
  }
  function continueShopping() {
    document.getElementById('successPage').classList.remove('open');
    document.getElementById('heroSection').style.display='';
    document.getElementById('categoriesSection').style.display='';
    document.getElementById('shopMain').style.display='';
    renderProducts();
    window.scrollTo(0,0);
  }

  // ── MODAL ──
  function openModal(id) {
    const p = products.find(x=>x.id===id);
    currentModalProduct = p;
    document.getElementById('modalImg').textContent = p.emoji;
    document.getElementById('modalTitle').textContent = p.name;
    document.getElementById('modalBrand').textContent = 'By ' + p.brand + ' | ' + p.category;
    document.getElementById('modalPrice').innerHTML = '₹' + p.price.toLocaleString() + (p.oldPrice?` <span style="font-size:0.9rem;text-decoration:line-through;color:var(--text-muted);font-weight:400"> ₹${p.oldPrice}</span>`:'');
    document.getElementById('modalRating').innerHTML = '<span class="stars" style="font-size:1.1rem">' + getStars(p.rating) + '</span> <span style="font-size:0.9rem;color:var(--text-muted)">' + p.rating + ' (' + p.reviews + ' reviews)</span>';
    const stockEl = document.getElementById('modalStock');
    stockEl.textContent = p.inStock ? '✅ In Stock' : '❌ Out of Stock';
    stockEl.className = 'stock-badge ' + (p.inStock ? 'in-stock' : 'out-stock');
    document.getElementById('modalDesc').textContent = p.desc;
    const addBtn = document.getElementById('modalAddBtn');
    if(!p.inStock) { addBtn.textContent='Out of Stock'; addBtn.disabled=true; addBtn.style.background='#94a3b8'; }
    else { addBtn.textContent='Add to Cart'; addBtn.disabled=false; addBtn.style.background=''; }
    document.getElementById('modalOverlay').classList.add('open');
  }
  function closeModal(e) {
    if(!e || e.target===document.getElementById('modalOverlay')) {
      document.getElementById('modalOverlay').classList.remove('open');
    }
  }
  function addFromModal() {
    if(currentModalProduct) { addToCart(currentModalProduct.id); closeModal(); }
  }

  // ── TOAST ──
  function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(()=>t.classList.remove('show'), 2500);
  }

  // ── INIT ──
  renderProducts();
