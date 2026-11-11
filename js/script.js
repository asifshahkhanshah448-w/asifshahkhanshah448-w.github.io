/**
 * ============================================================================
 * LUXESTAY - LUXURY HOTEL & RESORT BOOKING JAVASCRIPT
 * Web Development Internship — Task 5 (Asif Shah)
 * Pure Vanilla JavaScript ES6+ &bull; Zero External Dependencies
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. Announcement Bar Close Action
  // --------------------------------------------------------------------------
  const announcementBar = document.getElementById('announcement-bar');
  const announcementClose = document.getElementById('announcement-close');

  if (announcementClose && announcementBar) {
    announcementClose.addEventListener('click', () => {
      announcementBar.classList.add('closed');
    });
  }

  // --------------------------------------------------------------------------
  // 2. Responsive Mobile Navigation Menu
  // --------------------------------------------------------------------------
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  const toggleMobileMenu = (open) => {
    const shouldOpen = open !== undefined ? open : !navMenu.classList.contains('open');
    if (shouldOpen) {
      navMenu.classList.add('open');
      mobileToggle.classList.add('active');
      mobileToggle.setAttribute('aria-expanded', 'true');
    } else {
      navMenu.classList.remove('open');
      mobileToggle.classList.remove('active');
      mobileToggle.setAttribute('aria-expanded', 'false');
    }
  };

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMobileMenu();
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          toggleMobileMenu(false);
        }
      });
    });

    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        toggleMobileMenu(false);
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        toggleMobileMenu(false);
        mobileToggle.focus();
      }
    });
  }

  // --------------------------------------------------------------------------
  // 3. Sticky Header Scroll Effect & Back-to-Top Button
  // --------------------------------------------------------------------------
  const siteHeader = document.getElementById('site-header');
  const backToTopBtn = document.getElementById('back-to-top');

  const handleScroll = () => {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    if (siteHeader) {
      if (scrollY > 60) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }

    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --------------------------------------------------------------------------
  // 4. Hotel Search Interface Validation & Booking Hand-off
  // --------------------------------------------------------------------------
  const searchForm = document.getElementById('hotel-search-form');
  const destinationSelect = document.getElementById('search-destination');
  const checkinInput = document.getElementById('search-checkin');
  const checkoutInput = document.getElementById('search-checkout');
  const guestsSelect = document.getElementById('search-guests');
  const searchFeedback = document.getElementById('search-feedback');

  // Format date helper (YYYY-MM-DD)
  const formatDateForInput = (date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  // Set default search dates (Check-in = tomorrow, Check-out = +4 days)
  const today = new Date();
  const defaultCheckin = new Date(today);
  defaultCheckin.setDate(today.getDate() + 1);

  const defaultCheckout = new Date(defaultCheckin);
  defaultCheckout.setDate(defaultCheckin.getDate() + 3);

  if (checkinInput && checkoutInput) {
    checkinInput.min = formatDateForInput(today);
    checkinInput.value = formatDateForInput(defaultCheckin);

    checkoutInput.min = formatDateForInput(defaultCheckin);
    checkoutInput.value = formatDateForInput(defaultCheckout);

    checkinInput.addEventListener('change', () => {
      if (checkinInput.value) {
        const selectedCheckin = new Date(checkinInput.value);
        const minCheckout = new Date(selectedCheckin);
        minCheckout.setDate(selectedCheckin.getDate() + 1);
        checkoutInput.min = formatDateForInput(minCheckout);

        if (new Date(checkoutInput.value) <= selectedCheckin) {
          checkoutInput.value = formatDateForInput(minCheckout);
        }
      }
    });
  }

  if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const destError = document.getElementById('destination-error');
      const inError = document.getElementById('checkin-error');
      const outError = document.getElementById('checkout-error');

      let isValid = true;

      // Validate destination
      if (!destinationSelect.value) {
        if (destError) destError.classList.add('visible');
        isValid = false;
      } else {
        if (destError) destError.classList.remove('visible');
      }

      // Validate dates
      if (!checkinInput.value) {
        if (inError) inError.classList.add('visible');
        isValid = false;
      } else {
        if (inError) inError.classList.remove('visible');
      }

      const dIn = new Date(checkinInput.value);
      const dOut = new Date(checkoutInput.value);

      if (!checkoutInput.value || dOut <= dIn) {
        if (outError) outError.classList.add('visible');
        isValid = false;
      } else {
        if (outError) outError.classList.remove('visible');
      }

      if (!isValid) {
        if (searchFeedback) {
          searchFeedback.textContent = 'Please select a valid destination and valid travel dates.';
          searchFeedback.className = 'search-feedback error';
        }
        return;
      }

      const destinationName = destinationSelect.options[destinationSelect.selectedIndex].text;
      const guests = guestsSelect ? guestsSelect.options[guestsSelect.selectedIndex].text : '2 Adults';

      // Open booking modal with pre-populated values
      openBookingModal({
        hotel: destinationName,
        checkin: checkinInput.value,
        checkout: checkoutInput.value,
        guests: guests
      });

      if (searchFeedback) {
        searchFeedback.textContent = `Available suites found for ${destinationName}! Reservation window opened below.`;
        searchFeedback.className = 'search-feedback success';
      }
    });
  }

  // --------------------------------------------------------------------------
  // 5. Destination Card Click -> Pre-fill Search
  // --------------------------------------------------------------------------
  const destinationCards = document.querySelectorAll('.destination-card');
  destinationCards.forEach((card) => {
    card.addEventListener('click', () => {
      const destKey = card.getAttribute('data-dest');
      if (destinationSelect && destKey) {
        destinationSelect.value = destKey;
        // Scroll smoothly to search section
        const searchEl = document.querySelector('.search-card');
        if (searchEl) {
          searchEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
          searchEl.style.boxShadow = '0 0 40px rgba(212, 175, 55, 0.6)';
          setTimeout(() => {
            searchEl.style.boxShadow = '';
          }, 1500);
        }
      }
    });
  });

  // --------------------------------------------------------------------------
  // 6. Room Category Filtering
  // --------------------------------------------------------------------------
  const roomFilterButtons = document.querySelectorAll('.room-filter-btn');
  const roomCards = document.querySelectorAll('.room-card');

  if (roomFilterButtons.length > 0 && roomCards.length > 0) {
    roomFilterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        roomFilterButtons.forEach((b) => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        const category = btn.getAttribute('data-category');

        roomCards.forEach((card) => {
          const cardCat = card.getAttribute('data-category');
          if (category === 'all' || cardCat === category) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // --------------------------------------------------------------------------
  // 7. Interactive Lightbox for Image Gallery
  // --------------------------------------------------------------------------
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxOverlay = document.getElementById('lightbox-overlay');
  const lightboxImage = document.getElementById('lightbox-image');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');

  let currentGalleryIndex = 0;

  const showLightboxImage = (index) => {
    if (!galleryItems[index]) return;
    currentGalleryIndex = index;
    const item = galleryItems[index];
    const fullSrc = item.getAttribute('data-full');
    const caption = item.getAttribute('data-caption') || '';

    if (lightboxImage) {
      lightboxImage.src = fullSrc;
      lightboxImage.alt = caption;
    }
    if (lightboxCaption) {
      lightboxCaption.textContent = caption;
    }
  };

  const openLightbox = (index) => {
    showLightboxImage(index);
    if (lightboxModal) {
      lightboxModal.classList.add('active');
      lightboxModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeLightbox = () => {
    if (lightboxModal) {
      lightboxModal.classList.remove('active');
      lightboxModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  };

  if (galleryItems.length > 0 && lightboxModal) {
    galleryItems.forEach((item, idx) => {
      item.addEventListener('click', () => openLightbox(idx));
    });

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxOverlay) lightboxOverlay.addEventListener('click', closeLightbox);

    if (lightboxPrev) {
      lightboxPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        const newIndex = (currentGalleryIndex - 1 + galleryItems.length) % galleryItems.length;
        showLightboxImage(newIndex);
      });
    }

    if (lightboxNext) {
      lightboxNext.addEventListener('click', (e) => {
        e.stopPropagation();
        const newIndex = (currentGalleryIndex + 1) % galleryItems.length;
        showLightboxImage(newIndex);
      });
    }

    document.addEventListener('keydown', (e) => {
      if (!lightboxModal.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft' && lightboxPrev) lightboxPrev.click();
      if (e.key === 'ArrowRight' && lightboxNext) lightboxNext.click();
    });
  }

  // --------------------------------------------------------------------------
  // 8. FAQ Accordion
  // --------------------------------------------------------------------------
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close other items
        faqItems.forEach((other) => {
          other.classList.remove('active');
          const btn = other.querySelector('.faq-question');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        });

        // Toggle clicked item
        if (!isActive) {
          item.classList.add('active');
          questionBtn.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });

  // --------------------------------------------------------------------------
  // 9. Interactive Reservation & Booking Modal
  // --------------------------------------------------------------------------
  const bookingModal = document.getElementById('booking-modal');
  const bookingOverlay = document.getElementById('booking-modal-overlay');
  const bookingCloseBtn = document.getElementById('booking-modal-close');
  const resHotelInput = document.getElementById('res-hotel');
  const resCheckinInput = document.getElementById('res-checkin');
  const resCheckoutInput = document.getElementById('res-checkout');
  const resSuiteSelect = document.getElementById('res-suite-type');
  const resGuestsSelect = document.getElementById('res-guests');
  const resNameInput = document.getElementById('res-name');
  const resEmailInput = document.getElementById('res-email');
  const resForm = document.getElementById('reservation-form');
  const resFeedback = document.getElementById('res-feedback');
  const bookingPropertyLabel = document.getElementById('booking-modal-property-label');

  const summaryNights = document.getElementById('summary-nights');
  const summaryRate = document.getElementById('summary-rate');
  const summaryTotal = document.getElementById('summary-total');

  // Calculate pricing breakdown
  const updateBookingSummary = () => {
    if (!resCheckinInput || !resCheckoutInput || !resSuiteSelect) return;

    const d1 = new Date(resCheckinInput.value);
    const d2 = new Date(resCheckoutInput.value);
    const diffTime = d2.getTime() - d1.getTime();
    let nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (isNaN(nights) || nights < 1) nights = 1;

    const rate = parseInt(resSuiteSelect.value, 10) || 1450;
    const total = nights * rate;

    if (summaryNights) summaryNights.textContent = `${nights} Night${nights > 1 ? 's' : ''}`;
    if (summaryRate) summaryRate.textContent = `$${rate.toLocaleString()}`;
    if (summaryTotal) summaryTotal.textContent = `$${total.toLocaleString()}`;
  };

  const openBookingModal = (options = {}) => {
    if (!bookingModal) return;

    if (options.hotel && resHotelInput) {
      resHotelInput.value = options.hotel;
      if (bookingPropertyLabel) bookingPropertyLabel.textContent = options.hotel;
    }

    if (options.checkin && resCheckinInput) {
      resCheckinInput.value = options.checkin;
    } else if (resCheckinInput && !resCheckinInput.value) {
      resCheckinInput.value = formatDateForInput(defaultCheckin);
    }

    if (options.checkout && resCheckoutInput) {
      resCheckoutInput.value = options.checkout;
    } else if (resCheckoutInput && !resCheckoutInput.value) {
      resCheckoutInput.value = formatDateForInput(defaultCheckout);
    }

    if (options.price && resSuiteSelect) {
      // Attempt to match suite select option
      for (let i = 0; i < resSuiteSelect.options.length; i++) {
        if (resSuiteSelect.options[i].value === String(options.price)) {
          resSuiteSelect.selectedIndex = i;
          break;
        }
      }
    }

    updateBookingSummary();

    if (resFeedback) {
      resFeedback.style.display = 'none';
      resFeedback.className = 'res-feedback';
    }

    bookingModal.classList.add('active');
    bookingModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeBookingModal = () => {
    if (!bookingModal) return;
    bookingModal.classList.remove('active');
    bookingModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  // Attach open modal buttons
  document.querySelectorAll('.open-booking-modal').forEach((btn) => {
    btn.addEventListener('click', () => {
      const hotel = btn.getAttribute('data-hotel') || btn.getAttribute('data-room') || 'LUXESTAY Curated Collection';
      const price = btn.getAttribute('data-price');
      openBookingModal({ hotel, price });
    });
  });

  if (bookingCloseBtn) bookingCloseBtn.addEventListener('click', closeBookingModal);
  if (bookingOverlay) bookingOverlay.addEventListener('click', closeBookingModal);

  [resCheckinInput, resCheckoutInput, resSuiteSelect].forEach((el) => {
    if (el) el.addEventListener('change', updateBookingSummary);
  });

  // Handle Reservation Submission (Demonstration Mode)
  if (resForm) {
    resForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameVal = resNameInput ? resNameInput.value.trim() : '';
      const emailVal = resEmailInput ? resEmailInput.value.trim() : '';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (nameVal.length < 2 || !emailRegex.test(emailVal)) {
        if (resFeedback) {
          resFeedback.textContent = 'Please provide a valid lead guest name and email address.';
          resFeedback.className = 'res-feedback error';
        }
        return;
      }

      // Generate simulated confirmation number
      const confNum = 'LUXE-' + Math.floor(100000 + Math.random() * 900000);
      const hotelName = resHotelInput ? resHotelInput.value : 'LUXESTAY Property';
      const suiteName = resSuiteSelect ? resSuiteSelect.options[resSuiteSelect.selectedIndex].text : 'Suite';

      if (resFeedback) {
        resFeedback.innerHTML = `
          <strong>Reservation Confirmed (Demo)!</strong><br>
          Confirmation Code: <strong>${confNum}</strong><br>
          Guest: ${nameVal} &bull; Property: ${hotelName}<br>
          Room: ${suiteName}<br>
          <em>*A simulated welcome itinerary has been generated for this frontend demonstration.</em>
        `;
        resFeedback.className = 'res-feedback success';
      }
    });
  }

  // --------------------------------------------------------------------------
  // 10. Newsletter Form Validation
  // --------------------------------------------------------------------------
  const newsletterForm = document.getElementById('newsletter-form');
  const newsletterEmail = document.getElementById('newsletter-email');
  const newsletterFeedback = document.getElementById('newsletter-feedback');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = newsletterEmail ? newsletterEmail.value.trim() : '';

      if (!emailRegex.test(val)) {
        if (newsletterFeedback) {
          newsletterFeedback.textContent = 'Please enter a valid email address.';
          newsletterFeedback.className = 'newsletter-feedback error';
        }
        return;
      }

      if (newsletterFeedback) {
        newsletterFeedback.textContent = `Welcome to the LUXESTAY Connoisseur Circle! (Demonstration: No actual emails stored).`;
        newsletterFeedback.className = 'newsletter-feedback success';
      }
      if (newsletterEmail) newsletterEmail.value = '';
    });
  }

  // --------------------------------------------------------------------------
  // 11. Contact & Concierge Form (Client-Side & Mailto)
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  const contactName = document.getElementById('contact-name');
  const contactEmail = document.getElementById('contact-email');
  const contactProperty = document.getElementById('contact-property');
  const contactSubject = document.getElementById('contact-subject');
  const contactMessage = document.getElementById('contact-message');
  const contactFeedback = document.getElementById('contact-feedback');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameVal = contactName ? contactName.value.trim() : '';
      const emailVal = contactEmail ? contactEmail.value.trim() : '';
      const propertyVal = contactProperty ? contactProperty.value : 'General';
      const subjectVal = contactSubject ? contactSubject.value.trim() : '';
      const messageVal = contactMessage ? contactMessage.value.trim() : '';

      const nameErr = document.getElementById('name-error');
      const emailErr = document.getElementById('email-error');
      const subjectErr = document.getElementById('subject-error');
      const msgErr = document.getElementById('message-error');

      let isValid = true;

      if (nameVal.length < 2) {
        if (nameErr) nameErr.classList.add('visible');
        isValid = false;
      } else {
        if (nameErr) nameErr.classList.remove('visible');
      }

      if (!emailRegex.test(emailVal)) {
        if (emailErr) emailErr.classList.add('visible');
        isValid = false;
      } else {
        if (emailErr) emailErr.classList.remove('visible');
      }

      if (subjectVal.length < 3) {
        if (subjectErr) subjectErr.classList.add('visible');
        isValid = false;
      } else {
        if (subjectErr) subjectErr.classList.remove('visible');
      }

      if (messageVal.length < 10) {
        if (msgErr) msgErr.classList.add('visible');
        isValid = false;
      } else {
        if (msgErr) msgErr.classList.remove('visible');
      }

      if (!isValid) {
        if (contactFeedback) {
          contactFeedback.textContent = 'Please fill out all required fields properly.';
          contactFeedback.className = 'contact-feedback error';
        }
        return;
      }

      // Generate mailto link
      const recipient = 'asifshahkhanshah448@gmail.com';
      const encodedSubject = encodeURIComponent(`[LUXESTAY Inquiry] ${subjectVal} (${propertyVal}) - from ${nameVal}`);
      const bodyContent = `Guest Name: ${nameVal}\nGuest Email: ${emailVal}\nPreferred Sanctuary: ${propertyVal}\n\nInquiry Details:\n${messageVal}\n\n---\nSent via LUXESTAY Luxury Hotel Website (https://asifshahkhanshah448-w.github.io/)`;
      const encodedBody = encodeURIComponent(bodyContent);

      window.location.href = `mailto:${recipient}?subject=${encodedSubject}&body=${encodedBody}`;

      if (contactFeedback) {
        contactFeedback.textContent = 'Opening your email client to dispatch concierge inquiry to asifshahkhanshah448@gmail.com...';
        contactFeedback.className = 'contact-feedback success';
      }
    });
  }

  // --------------------------------------------------------------------------
  // 12. Dynamic Copyright Year
  // --------------------------------------------------------------------------
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
