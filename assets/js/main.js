// AuraStep Global Controller
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  injectHeaderFooter();
  initCart();
  initScrollAnimations();
  initNewsletter();
});

/* ==========================================================================
   1. Theme Management (Light / Dark Mode)
   ========================================================================== */
function initTheme() {
  const currentTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", currentTheme);
  
  // Theme toggle button click listener is delegated because header is injected dynamically
  document.addEventListener("click", (e) => {
    if (e.target.closest("#theme-toggle")) {
      const theme = document.documentElement.getAttribute("data-theme");
      const newTheme = theme === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
      updateThemeIcon(newTheme);
    }
  });
}

function updateThemeIcon(theme) {
  const btn = document.getElementById("theme-toggle");
  if (!btn) return;
  if (theme === "dark") {
    btn.innerHTML = `
      <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" height="20" width="20">
        <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707-.707M12 5a7 7 0 1 0 0 14 7 7 0 0 0 0-14z"></path>
      </svg>
    `;
  } else {
    btn.innerHTML = `
      <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" height="20" width="20">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    `;
  }
}

/* ==========================================================================
   2. Inject Header & Footer (DRY implementation)
   ========================================================================== */
function injectHeaderFooter() {
  const currentPath = window.location.pathname;
  const pageName = currentPath.substring(currentPath.lastIndexOf("/") + 1) || "index.html";

  // --- Inject Header ---
  const headerContainer = document.getElementById("global-header");
  if (headerContainer) {
    headerContainer.className = "header";
    headerContainer.innerHTML = `
      <div class="container header-container">
        <a href="index.html" class="logo-wrapper">
          <img src="assets/images/logo.png" alt="AuraStep Logo" class="logo-img">
          <span class="logo-text">AuraStep</span>
        </a>
        <nav>
          <ul class="nav-menu" id="nav-menu">
            <li><a href="index.html" class="nav-link ${pageName === "index.html" ? "active" : ""}">首頁</a></li>
            <li><a href="about.html" class="nav-link ${pageName === "about.html" ? "active" : ""}">公司簡介</a></li>
            <li><a href="sports.html" class="nav-link ${pageName === "sports.html" ? "active" : ""}">運動鞋</a></li>
            <li><a href="casual.html" class="nav-link ${pageName === "casual.html" ? "active" : ""}">休閒鞋</a></li>
            <li><a href="slippers.html" class="nav-link ${pageName === "slippers.html" ? "active" : ""}">拖鞋</a></li>
            <li><a href="sandals.html" class="nav-link ${pageName === "sandals.html" ? "active" : ""}">涼鞋</a></li>
            <li><a href="kids.html" class="nav-link ${pageName === "kids.html" ? "active" : ""}">童鞋</a></li>
            <li><a href="contact.html" class="nav-link ${pageName === "contact.html" ? "active" : ""}">聯絡我們</a></li>
          </ul>
        </nav>
        <div class="header-actions">
          <button id="theme-toggle" class="action-btn" aria-label="切換主題模式">
            <!-- SVG Icon will be set dynamically -->
          </button>
          <button id="cart-toggle" class="action-btn" aria-label="打開購物車">
            <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" height="20" width="20">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            <span class="badge" id="cart-badge">0</span>
          </button>
        </div>
      </div>
    `;
    const theme = document.documentElement.getAttribute("data-theme") || "light";
    updateThemeIcon(theme);
  }

  // --- Inject Footer ---
  const footerContainer = document.getElementById("global-footer");
  if (footerContainer) {
    footerContainer.className = "footer";
    footerContainer.innerHTML = `
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <a href="index.html" class="logo-wrapper">
              <img src="assets/images/logo.png" alt="AuraStep Logo" class="logo-img">
              <span class="logo-text">AuraStep</span>
            </a>
            <p class="footer-desc">極光步履，踏出你的自信步伐。結合尖端運動科技與極致現代美學，打造無與倫比的舒適穿著體驗。</p>
            <div class="footer-socials">
              <a href="#" class="social-icon" aria-label="Facebook">
                <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" height="18" width="18"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="#" class="social-icon" aria-label="Instagram">
                <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" height="18" width="18"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" class="social-icon" aria-label="Twitter">
                <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" height="18" width="18"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
              </a>
            </div>
          </div>
          <div>
            <h4 class="footer-title">產品分類</h4>
            <ul class="footer-links">
              <li><a href="sports.html" class="footer-link">運動鞋系列</a></li>
              <li><a href="casual.html" class="footer-link">日常休閒鞋</a></li>
              <li><a href="slippers.html" class="footer-link">潮流室內拖</a></li>
              <li><a href="sandals.html" class="footer-link">戶外機能涼鞋</a></li>
              <li><a href="kids.html" class="footer-link">安全舒適童鞋</a></li>
            </ul>
          </div>
          <div>
            <h4 class="footer-title">幫助與支援</h4>
            <ul class="footer-links">
              <li><a href="about.html" class="footer-link">品牌故事</a></li>
              <li><a href="contact.html" class="footer-link">聯絡客服</a></li>
              <li><a href="#" class="footer-link">尺碼對照表</a></li>
              <li><a href="#" class="footer-link">退換貨政策</a></li>
              <li><a href="#" class="footer-link">配送說明</a></li>
            </ul>
          </div>
          <div class="footer-newsletter">
            <h4 class="footer-title">訂閱電子報</h4>
            <p class="footer-desc">獲取 AuraStep 的最新產品上市資訊與專屬優惠禮遇。</p>
            <form class="newsletter-form" id="newsletter-form">
              <input type="email" placeholder="輸入您的電子信箱" required class="newsletter-input" id="newsletter-input">
              <button type="submit" class="newsletter-btn" aria-label="提交訂閱">
                <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" height="20" width="20"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
              </button>
            </form>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2026 AuraStep 極光步履. All Rights Reserved. Designed for Supreme Quality.</p>
        </div>
      </div>
    `;
  }

  // --- Inject Cart Drawer & Backdrop ---
  const body = document.body;
  if (!document.getElementById("cart-drawer")) {
    const drawerHtml = `
      <div class="cart-backdrop" id="cart-backdrop"></div>
      <div class="cart-drawer" id="cart-drawer">
        <div class="cart-header">
          <h3>您的購物袋</h3>
          <button class="cart-close-btn" id="cart-close" aria-label="關閉購物車">&times;</button>
        </div>
        <div class="cart-items-list" id="cart-items-list">
          <!-- Dynamically Rendered -->
        </div>
        <div class="cart-footer">
          <div class="cart-total-row">
            <span>小計:</span>
            <span id="cart-total">NT$ 0</span>
          </div>
          <button class="btn btn-primary" id="checkout-btn">前往結帳</button>
        </div>
      </div>
    `;
    body.insertAdjacentHTML("beforeend", drawerHtml);
  }
}

/* ==========================================================================
   3. Shopping Cart System (State Management)
   ========================================================================== */
let cart = [];

function initCart() {
  // Load initial cart
  try {
    cart = JSON.parse(localStorage.getItem("aurastep_cart")) || [];
  } catch (e) {
    cart = [];
  }
  updateCartUI();

  // Cart Drawer opening / closing logic
  document.addEventListener("click", (e) => {
    if (e.target.closest("#cart-toggle")) {
      toggleCartDrawer(true);
    }
    if (e.target.closest("#cart-close") || e.target.closest("#cart-backdrop")) {
      toggleCartDrawer(false);
    }
    if (e.target.closest("#checkout-btn")) {
      if (cart.length === 0) {
        showToast("您的購物車是空的，快去選購吧！");
      } else {
        showToast("已成功模擬結帳！感謝您的購買！");
        cart = [];
        localStorage.setItem("aurastep_cart", JSON.stringify(cart));
        updateCartUI();
        toggleCartDrawer(false);
      }
    }
  });

  // Event delegation for removing cart items
  document.addEventListener("click", (e) => {
    const removeBtn = e.target.closest(".cart-item-remove");
    if (removeBtn) {
      const index = parseInt(removeBtn.getAttribute("data-index"), 10);
      cart.splice(index, 1);
      localStorage.setItem("aurastep_cart", JSON.stringify(cart));
      updateCartUI();
    }
  });
}

function toggleCartDrawer(open) {
  const drawer = document.getElementById("cart-drawer");
  const backdrop = document.getElementById("cart-backdrop");
  if (drawer && backdrop) {
    if (open) {
      drawer.classList.add("open");
      backdrop.classList.add("open");
    } else {
      drawer.classList.remove("open");
      backdrop.classList.remove("open");
    }
  }
}

// Global functions for add-to-cart (can be called by other scripts)
window.addProductToCart = function(productId, size = "F") {
  // Find product from database
  if (typeof productsData === "undefined") {
    console.error("productsData is not defined");
    return;
  }
  const product = productsData.find(p => p.id === productId);
  if (!product) return;

  const cartItem = {
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image,
    size: size
  };

  cart.push(cartItem);
  localStorage.setItem("aurastep_cart", JSON.stringify(cart));
  updateCartUI();
  toggleCartDrawer(true);
  showToast(`已成功將 ${product.name} (尺寸: ${size}) 加入購物袋！`);
};

function updateCartUI() {
  const badge = document.getElementById("cart-badge");
  const listContainer = document.getElementById("cart-items-list");
  const totalContainer = document.getElementById("cart-total");

  if (badge) badge.innerText = cart.length;

  if (listContainer) {
    if (cart.length === 0) {
      listContainer.innerHTML = `
        <div style="text-align: center; color: var(--text-muted); margin-top: 40px;">
          <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" height="48" width="48" style="margin-bottom: 12px; opacity: 0.5;">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <p>購物袋中沒有商品</p>
        </div>
      `;
    } else {
      listContainer.innerHTML = cart.map((item, idx) => `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name}" class="cart-item-img">
          <div class="cart-item-info">
            <h4 class="cart-item-title">${item.name}</h4>
            <div class="cart-item-meta">尺寸: ${item.size}</div>
            <div class="cart-item-price">NT$ ${item.price.toLocaleString()}</div>
          </div>
          <div class="cart-item-remove" data-index="${idx}" aria-label="移除商品">
            <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" height="18" width="18">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </div>
        </div>
      `).join("");
    }
  }

  if (totalContainer) {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    totalContainer.innerText = `NT$ ${total.toLocaleString()}`;
  }
}

/* ==========================================================================
   4. Scroll & Viewport Animations
   ========================================================================== */
function initScrollAnimations() {
  const elements = document.querySelectorAll(".animate-on-scroll");
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("appear");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    });
    
    elements.forEach(el => observer.observe(el));
  } else {
    // Fallback if not supported
    elements.forEach(el => el.classList.add("appear"));
  }
}

/* ==========================================================================
   5. Interactive Toast Notifications
   ========================================================================== */
window.showToast = function(message) {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `
    <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" height="18" width="18" style="color: var(--accent-purple);">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span>${message}</span>
  `;
  container.appendChild(toast);

  // Animate slide out and remove
  setTimeout(() => {
    toast.classList.add("fade-out");
    toast.addEventListener("animationend", () => {
      toast.remove();
    });
  }, 3500);
};

/* ==========================================================================
   6. Newsletter Subscription
   ========================================================================== */
function initNewsletter() {
  document.addEventListener("submit", (e) => {
    const form = e.target.closest("#newsletter-form");
    if (form) {
      e.preventDefault();
      const input = document.getElementById("newsletter-input");
      if (input && input.value) {
        showToast("感謝您的訂閱！極光最新優惠折扣碼已發送至您的信箱。");
        input.value = "";
      }
    }
  });
}
