# LUXESTAY — Luxury Hotel & Resort Booking Website

[![Hosted on GitHub Pages](https://img.shields.io/badge/Hosted%20On-GitHub%20Pages-22c55e?style=for-the-badge&logo=github)](https://asifshahkhanshah448-w.github.io/)
[![HTML5](https://img.shields.io/badge/HTML5-Semantic%20Markup-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-Luxury%20Aesthetic-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla%20ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-d4af37.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

---

## 🏨 Project Overview

**LUXESTAY** is a premium, five-star luxury hotel and resort booking website designed and developed for **Web Development Internship — Task 5**. 

Built entirely with **semantic HTML5**, **modern CSS3**, and **Vanilla JavaScript**, LUXESTAY delivers a visually breathtaking hospitality experience featuring an ivory, champagne gold, deep forest green, and charcoal aesthetic with zero external framework overhead.

- **Project Name**: LUXESTAY
- **Project Type**: Luxury Hotel & Resort Booking Website
- **Developer**: Asif Shah
- **GitHub Username**: [@asifshahkhanshah448-w](https://github.com/asifshahkhanshah448-w)
- **Target Repository**: [asifshahkhanshah448-w.github.io](https://github.com/asifshahkhanshah448-w/asifshahkhanshah448-w.github.io)
- **Live Website**: [https://asifshahkhanshah448-w.github.io/](https://asifshahkhanshah448-w.github.io/)
- **Contact Email**: [asifshahkhanshah448@gmail.com](mailto:asifshahkhanshah448@gmail.com)

> ⚠️ **Notice**: This website is an interactive frontend demonstration created for internship submission. It does not process real financial transactions or live hotel room reservations.

---

## 🌟 16 Core Website Sections

1. **Announcement Bar**: Top promotional header showcasing seasonal escape discounts and promo code with dismiss action.
2. **Sticky Luxury Navigation**: Glassmorphic header featuring the LUXESTAY crown branding, navigation links, 24/7 concierge telephone hotline, "Reserve A Stay" CTA, and responsive mobile menu.
3. **Full-Width Hero Section**: Dramatic resort photography backdrop with dark luxury scrim, five-star hospitality badge, serif headline, and key estate metrics (45+ Sanctuaries, 18 Countries).
4. **Hotel Search Booking Interface**: Embedded availability finder featuring destination selection, dynamic check-in/check-out date validation, guest selection, and interactive validation error handling.
5. **Featured Luxury Resorts**: Flagship properties in Santorini, the Maldives, Amalfi Coast, and the Swiss Alps with guest rating badges, location tags, signature perks, nightly rates, and direct booking triggers.
6. **Popular Destinations**: Curated visual cards highlighting the world's most sought-after travel locations (Maldives, Santorini, Amalfi Coast, Swiss Alps, Kyoto) with quick pre-fill search functionality.
7. **Signature Room Categories**: Filterable accommodation showcase (Presidential Suites, Private Ocean Villas, Sky Penthouses, Wellness Sanctuaries) with detailed floorplans, amenity checklists, and pricing.
8. **Special Packages & Offers**: Curated romantic honeymoons, Ayurvedic wellness retreats, and private yacht discovery packages.
9. **Hotel Facilities & Amenities**: Highlighted luxury services including infinity pools, Michelin-starred gastronomy, hydrothermal thalassotherapy spas, private helipads, and 24/7 butler service.
10. **Guest Testimonials**: Verified sample reviews from travelers praising the bespoke service and scenic vistas.
11. **Image Gallery with Lightbox**: High-resolution gallery grid with click-to-zoom interactive modal lightbox supporting keyboard navigation (Arrow keys, Escape).
12. **About LUXESTAY**: The heritage, ethos, and sustainable luxury philosophy behind the brand with key performance metrics.
13. **FAQ Accordion**: Interactive questions and answers covering check-in policies, private transfers, and cancellation flexibility.
14. **Connoisseur Circle Newsletter**: Frontend-only email subscription form with real-time validation and clear demonstration feedback.
15. **Concierge Contact Section**: VIP inquiry form with validation that constructs pre-formatted `mailto:` links with subject and property parameters.
16. **Professional Footer**: Full sitemap, destination links, accommodation categories, developer internship attribution for Asif Shah, and GitHub links.

---

## ⚡ JavaScript Functionality

* **Mobile Hamburger Navigation**: Slide-down drawer with touch/click outside to close and `Escape` key support.
* **Hotel Search Validation**: Real-time validation ensuring check-out occurs after check-in, automatically opening the booking modal pre-populated with criteria.
* **Destination Quick-Filter**: Clicking on any destination card smoothly scrolls to and selects that sanctuary in the search interface.
* **Accommodation Category Filters**: Filter buttons (`All`, `Presidential Suites`, `Ocean Villas`, `Sky Penthouses`) with smooth CSS transitions.
* **Interactive Lightbox Modal**: Fullscreen photo preview with caption, next/previous buttons, and keyboard controls.
* **FAQ Accordion**: Smoothly expands and collapses questions with accessible ARIA states (`aria-expanded`).
* **Booking & Reservation Modal**: Calculates total estimated stay duration and price dynamically based on chosen dates and room rate, generating a simulated reservation code (e.g. `LUXE-849201`).
* **Newsletter Validation**: Validates email format and displays a celebratory confirmation notice.
* **Concierge Contact Form**: Validates all fields and safely opens the user's default email client pre-addressed to `asifshahkhanshah448@gmail.com`.
* **Sticky Header & Back-to-Top**: Dynamically fades in after scrolling past 400px with smooth scroll-to-top execution.

---

## 🛠️ Technology Stack

| Technology | Implementation |
| :--- | :--- |
| **HTML5** | Semantic tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`), OpenGraph metadata. |
| **CSS3** | CSS Custom Properties, Flexbox, CSS Grid, Glassmorphism (`backdrop-filter`), smooth hover elevation, fluid media queries. |
| **Vanilla JavaScript (ES6+)** | Pure client-side DOM manipulation, modal state management, event listeners, form validation. |
| **Hosting** | Free, zero-build deployment on **GitHub Pages**. |

---

## 📁 Repository Structure

```text
asifshahkhanshah448-w.github.io/
├── index.html              # Main HTML5 entry point for GitHub Pages root
├── css/
│   └── style.css           # Luxury design system, gold accents & responsive styles
├── js/
│   └── script.js           # Vanilla JavaScript interactions, search, modals & lightbox
└── README.md               # Complete project documentation
```

---

## 💻 How to Run Locally

Because this project is built using pure static web technologies, **no build step, npm install, or backend server is required**:

1. **Directly in Browser**: Double-click `index.html` to open it in Chrome, Firefox, Safari, or Edge.
2. **VS Code Live Server**: Right-click `index.html` and click **"Open with Live Server"**.
3. **Local HTTP Server**:
   ```bash
   # Using Python 3:
   python3 -m http.server 8000
   
   # Using Node.js:
   npx serve .
   ```

---

## 🚀 GitHub Pages Deployment Guide

To deploy this website to `https://asifshahkhanshah448-w.github.io/`:

```bash
# 1. Initialize git (if not already done)
git init

# 2. Stage all static files
git add index.html css/style.css js/script.js README.md

# 3. Commit files
git commit -m "feat: complete LUXESTAY luxury hotel & resort website for Task 5"

# 4. Set branch to main
git branch -M main

# 5. Connect remote repository
git remote add origin https://github.com/asifshahkhanshah448-w/asifshahkhanshah448-w.github.io.git

# 6. Push to GitHub
git push -u origin main
```

In GitHub:
1. Open repository **Settings** > **Pages**.
2. Select **Source**: `Deploy from a branch`.
3. Select **Branch**: `main` / `(root)`.
4. Click **Save**. The website will be live in minutes!

---

## 👤 Developer & Internship Information

- **Developer**: Asif Shah
- **Internship**: Web Development Internship — Task 5 Submission
- **GitHub Profile**: [@asifshahkhanshah448-w](https://github.com/asifshahkhanshah448-w)
- **Live URL**: [https://asifshahkhanshah448-w.github.io/](https://asifshahkhanshah448-w.github.io/)
- **Email**: [asifshahkhanshah448@gmail.com](mailto:asifshahkhanshah448@gmail.com)

---
*Created as part of the Web Development Internship Program &bull; Task 5 Submission.*
