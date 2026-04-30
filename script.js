// Function to generate dynamic search URL for high-quality product images.
// Using source.unsplash.com with specific product name and 'tech' tag.
function getRealProductImageUrl(productName) {
    const cleanName = productName.replace(/\s+/g, '-'); // Remove spaces for URL compatibility
    return `https://source.unsplash.com/600x400/?${encodeURIComponent(cleanName)},tech,gadget`;
}

// Complete Product List - Now with Real Images derived dynamically
const products = [
    { name: "Keyboard", price: 2500, img: "Images/keyboard.jpg" },
    { name: "Mouse", price: 1200, img: "images/Mouse.jpg" },
    { name: "Wireless Mouse", price: 1800, img: "images/Wireless Mouse.jpg" },
    { name: "Graphics Card", price: 45000, img: "images/Graphics Card.jpg"  },
    { name: "HP 11th Gen Laptop", price: 120000, img: "images/HP 11th gen laptop.jpg" }, // Generic for better image matching
    { name: "Dell 8th Gen Laptop", price: 85000, img: "images/Dell 8th gen laptop.jpg" },  // Generic for better image matching
    { name: "Microphone", price: 5000, img: "images/microphone.jpg" },
    { name: "Speakers", price: 3000, img: "images/speakers.jpg" },
    { name: "Headphones", price: 4000, img: "images/headphones.jpg" },
    { name: "Airpods", price: 6000, img: "images/airpords.jpg" },
    { name: "Virtual Reality (VR)", price: 25000, img: "images/VR.jpg" }, // Generic for better image matching
    { name: "Webcam", price: 3500, img: "images/Webcam.jpg" },
    { name: "External HDD", price: 8000, img: "images/external hdd.jpg"  },
    { name: "Gaming Chair", price: 22000, img: "images/gaming chair.jpg" }
];

// Reusable function to create card HTML with consistent design and image handling
function createCard(p) {
    return `
        <div class="card">
            <img src="${p.img}" alt="${p.name}" loading="lazy"> <h3>${p.name}</h3>
            <p>Rs ${p.price.toLocaleString('en-IN')}</p>
            <button class="btn-buy" onclick="startCheckout('${p.name}', ${p.price})">Add to Cart</button>
        </div>
    `;
}

function showSection(id) {
    document.querySelectorAll('.content').forEach(s => s.style.display = 'none');
    document.getElementById(id).style.display = 'block';
    window.scrollTo(0, 0); 
    if(id === 'products') renderProducts();
}

function renderProducts() {
    const grid = document.getElementById('productGrid');
    grid.innerHTML = products.map(p => createCard(p)).join('');
}

function searchProduct() {
    const query = document.getElementById('searchInput').value.trim().toLowerCase();
    const resultDiv = document.getElementById('searchResult');
    resultDiv.innerHTML = ""; 

    if(query === "") {
        resultDiv.innerHTML = "<p style='color: #9ca3af;'>Please enter a search term.</p>";
        return;
    }

    const foundProducts = products.filter(p => p.name.toLowerCase().includes(query));
    
    if(foundProducts.length > 0) {
        // Result page now shows the large card with a real image.
        resultDiv.innerHTML = foundProducts.map(p => createCard(p)).join('');
    } else {
        resultDiv.innerHTML = "<p style='color: #9ca3af; text-align: center;'>No products found matching your search.</p>";
    }
}

let selectedProductName = "";
let selectedPrice = 0;

function startCheckout(name, price) {
    selectedProductName = name;
    selectedPrice = price;
    
    // Naye elements mein data fill karein
    document.getElementById('checkout-prod-name').innerText = name;
    document.getElementById('checkout-prod-price').innerText = price.toLocaleString('en-IN');
    
    showSection('checkout');
}

function placeOrder() {
    const name = document.getElementById('cName').value.trim();
    const phone = document.getElementById('cPhone').value.trim();
    const city = document.getElementById('cCity').value.trim();
    const address = document.getElementById('cAddress').value.trim();

    if(!name || !phone || !city || !address) return alert("Please fill all details!");

    document.getElementById('billContent').innerHTML = `
        <h2>Order Receipt</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>City:</b> ${city}</p>
        <p><b>Address:</b> ${address}</p>
        <hr style="border:0; border-top: 2px dashed #000; margin: 25px 0;">
        <p><b>Product:</b> ${selectedProductName}</p>
        <h3>Total Bill: Rs ${selectedPrice.toLocaleString('en-IN')}</h3>
        <p style="color:var(--highlight); font-weight: bold; font-size: 1.2rem; margin-top: 20px;">Thank you for shopping at Harsh Daraz Store!</p>
    `;
    showSection('bill');
}
