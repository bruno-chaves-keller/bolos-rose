# Delícias da Tia – Home Bakery Ordering Site

A mobile‑first, responsive ordering website for a home bakery. Customers can browse products, add items to a cart, and submit orders via WhatsApp with a simple, friendly experience.

This project was designed to be lightweight, fast, and easy to maintain using only HTML, CSS, and JavaScript (no frameworks).

## ✨ Highlights
- Mobile‑first design with a clean, pastel aesthetic
- Product gallery (carousel on mobile, grid on desktop)
- Add‑to‑cart with quantity management and a cart modal
- Order form modal (name, phone, delivery date/time, notes)
- WhatsApp integration to send the final order message
- Category modals for quick browsing on mobile
- “Our Story” section and contact details
- Embedded Google Maps (footer)
- Accessible, responsive navbar with a hamburger menu and cart badge

## 🧠 Project Vision
The focus is on simplicity and user comfort on small screens:
- One‑tap add to cart
- Compact, readable cards
- Clear, centralized modals
- Smooth navigation with mobile carousel and sticky conveniences
- A footer with practical contact and location info

## 🗂️ Structure
```
bolos-rose/
  images/
    bolos/          # product images
    logo/           # logo assets
    reviews/        # optional visuals
  index.html        # main page markup
  style.css         # styles (mobile-first)
  script.js         # cart, modals, carousel, WhatsApp
```

## 🚀 Getting Started
1. Clone this repository
2. Open `index.html` in your browser
3. That’s it! No build step required

Tip: Use a simple live server (e.g., VS Code Live Server) for a smoother local dev experience.

## 🔧 Configuration
- WhatsApp destination number (in `script.js`):
  - The function `sendOrderToWhatsApp(dados, numeroDestino)` handles message composition and opening WhatsApp.
  - Default number is set for testing. To change it, update the second parameter where it’s called, or set a new default in the function.

Example:
```js
// script.js
function sendOrderToWhatsApp(dados, numeroDestino = '447955603640') {
  // ...
}
```

## 📱 Features in Detail
- Navbar
  - Hamburger menu on mobile
  - Cart badge shows item count
- Products
  - Desktop: grid gallery
  - Mobile: circular carousel, plus category cards that open modals
  - Each product card includes a price label
- Cart & Checkout
  - Cart modal with quantity and remove controls
  - “Send Order” opens the contact modal
  - Contact form collects user info and sends via WhatsApp
- Content
  - “Our Story” section
  - Contact details and social links
  - Google Maps embedded in the footer

## 🔒 Privacy & Future‑Proofing
- Orders are sent via WhatsApp using a client‑side URL (`wa.me`).
- The code is structured so the WhatsApp sending logic is isolated (`sendOrderToWhatsApp`) to make it easy to swap in a secure API/backend later if needed.

## 🛣️ Roadmap Ideas
- Persist cart between sessions (localStorage)
- Product variants and pricing rules
- Basic admin JSON for products/prices
- Backend for order storage and analytics
- I18n (PT‑BR / EN) toggle

## 🤝 Contributing
Suggestions and improvements are welcome! Feel free to open an issue or a pull request.

## 📄 License
This project is open for learning and personal use. Add a formal license if you plan to distribute.

## 🙌 Acknowledgements
Built with a focus on straightforward UX, simple technologies, and mobile convenience. Special care was placed on usability for small screens and seamless ordering through WhatsApp. 