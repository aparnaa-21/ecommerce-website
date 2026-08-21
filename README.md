# House of Aparna — E-commerce Front-End

A single-page e-commerce storefront built with plain HTML, CSS, and JavaScript (no framework, no backend).

## Files
- `index.html` — page structure and markup
- `style.css` — all styling (dark boutique theme, layout, animations)
- `script.js` — app logic (product data, cart, filters, checkout flow)

## How to run
Open `index.html` in any browser — no build step, no server, no install needed. Keep all three files in the same folder.

## Features
- Product grid with category, price, and rating filters
- Search bar
- Sort (price, rating, name)
- Wishlist toggle
- Cart drawer with quantity controls and live totals
- Product detail modal
- Checkout form flow with a mock order confirmation

## Stack
- HTML5
- CSS3 (custom properties / dark theme)
- Vanilla JavaScript (DOM manipulation, no libraries)
- Google Fonts (Cormorant Garamond + Jost, loaded via CDN)

## Notes
All product data is hardcoded in `script.js`. Cart and wishlist state live in memory only — nothing is saved between page reloads, and no real payment processing occurs.
