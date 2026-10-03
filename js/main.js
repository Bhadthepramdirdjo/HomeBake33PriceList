// Navbar active state on page load - fixed untuk konsistensi
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Reset semua active state
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // Set active berdasarkan current page
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        // Cek untuk beranda
        if ((currentPage.includes('index.html') || currentPage.endsWith('/')) && href.includes('index.html')) {
            link.classList.add('active');
        }
        // Cek untuk halaman lain
        else if (href.includes(currentPage.split('/').pop())) {
            link.classList.add('active');
        }
    });

    // Dark Mode Toggle
    const themeToggle = document.getElementById('themeToggle');
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    // Set initial state
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        themeToggle.textContent = '🌙';
    } else {
        themeToggle.textContent = '☀️';
    }
    
    // Toggle dark mode
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDark);
        themeToggle.textContent = isDark ? '🌙' : '☀️';
    });
});

// Smooth scroll untuk category cards
document.addEventListener('DOMContentLoaded', function() {
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Load products from JSON (optional - untuk nanti kalau mau dinamis)
async function loadProducts(category) {
    try {
        const response = await fetch('../data/products.json');
        const data = await response.json();
        const products = data[category] || [];
        
        const container = document.getElementById('productsContainer');
        if (container) {
            container.innerHTML = '';
            products.forEach(product => {
                container.innerHTML += `
                    <div class="product-card">
                        <div class="product-image">${product.icon || '🍰'}</div>
                        <div class="product-info">
                            <div class="product-name">${product.name}</div>
                            <div class="product-description">${product.description}</div>
                            <div class="product-price">${product.price}</div>
                            <div class="product-footer">${product.info}</div>
                        </div>
                    </div>
                `;
            });
        }
    } catch (error) {
        console.log('Produk dimuat dari HTML static (JSON optional)');
    }
}

// Mobile menu toggle (untuk nanti kalau mau responsive menu)
function toggleMobileMenu() {
    const navContainer = document.querySelector('.nav-container');
    if (navContainer) {
        navContainer.classList.toggle('active');
    }
}
