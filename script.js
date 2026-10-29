const properties = [
  {
    title: 'Sunrise Villa',
    location: 'Shradha Shree Colony',
    rent: '₹7,000 / month',
    type: '1 RK',
    image: 'WhatsApp Image 2026-10-29 at 11.02.58 PM.jpeg',
    phone: '+91 79998 04869',
    features: ['Parking', 'Wi‑Fi'],
    video: null
  },
  {
    title: 'Green Park Rooms',
    location: 'Shradha Shree Colony',
    rent: '₹7,000 / month',
    type: 'Single Room',
    image: 'WhatsApp Image 2026-10-29 at 11.02.59 PM.jpeg',
    phone: '+91 79998 04869',
    features: ['Shared Kitchen', 'Water Supply', 'Security'],
    video: null
  },
  {
    title: 'Lake View House',
    location: 'Shradha Shree Colony',
    rent: '₹7,000 / month',
    type: '1 BHK',
    image: 'WhatsApp Image 2026-10-29 at 11.03.12 PM.jpeg',
    phone: '+91 79998 04869',
    features: ['Balcony', 'Power Backup', 'Garden'],
    video: null
  },
  {
    title: 'Comfort Stay',
    location: 'Malviya Nagar, Indore, near Robot Square',
    rent: '₹4,000 / month',
    type: 'Single Room',
    image: 'WhatsApp Image 2026-10-29 at 11.03.12 PM (1).jpeg',
    phone: '+91 79998 04869',
    features: ['Laundry', 'Close to Metro'],
    video: 'WhatsApp Video 2026-10-29 at 11.03.12 PM.mp4'
  },
  {
    title: 'City Nest Home',
    location: 'Malviya Nagar, Indore, near Robot Square',
    rent: '₹6,000 / month',
    type: '1 RK',
    image: 'WhatsApp Image 2026-10-29 at 11.03.13 PM.jpeg',
    phone: '+91 79998 04869',
    features: ['Modern Kitchen', 'Lift', 'CCTV'],
    video: 'WhatsApp Video 2026-10-29 at 11.02.58 PM.mp4'
  },
  {
    title: 'Skyline Apartments',
    location: 'Malviya Nagar, Indore, near Robot Square',
    rent: '₹7,000 / month',
    type: '1 BHK',
    image: 'WhatsApp Image 2026-10-29 at 11.03.13 PM (1).jpeg',
    phone: '+91 79998 04869',
    features: ['Storage', 'Generator', 'Parking'],
    video: 'WhatsApp Video 2026-10-29 at 11.02.57 PM.mp4'
  }
];

const propertyGrid = document.getElementById('propertyGrid');
const searchInput = document.getElementById('searchInput');

function renderProperties(items) {
  propertyGrid.innerHTML = items
    .map(
      (property) => `
        <article class="property-card">
          <div class="media-box">
            <img src="${property.image}" alt="${property.title} property" />
            ${
              property.video
                ? `<button class="play-btn" type="button" data-video="${property.video}" data-title="${property.title}" aria-label="Play video for ${property.title}">▶</button>`
                : ''
            }
          </div>
          <div class="property-body">
            <div class="card-topline">
              <h3>${property.title}</h3>
              <span class="card-rent">${property.rent}</span>
            </div>

            <div class="location">${property.location}</div>

            <div class="room-meta">
              ${property.features
                .map((feature) => `<span>${feature}</span>`)
                .join('')}
            </div>

            <div class="card-footer">
              <span class="card-phone">${property.phone}</span>
              <button class="book-btn" type="button" data-video="${property.video || ''}" data-title="${property.title}" aria-label="View ${property.title}">
                ${property.video ? 'Play' : 'View'}
              </button>
            </div>
          </div>
        </article>
      `
    )
    .join('');
}

function openVideoModal(title, src) {
  const existingModal = document.getElementById('videoModal');
  if (existingModal) existingModal.remove();

  const modal = document.createElement('div');
  modal.id = 'videoModal';
  modal.className = 'video-modal';
  modal.innerHTML = `
    <div class="video-modal-backdrop" data-close="true"></div>
    <div class="video-modal-content">
      <button class="video-close" type="button" aria-label="Close video">×</button>
      <h3>${title}</h3>
      <video controls autoplay playsinline>
        <source src="${src}" type="video/mp4" />
      </video>
    </div>
  `;

  document.body.appendChild(modal);

  modal.querySelector('.video-close').addEventListener('click', () => modal.remove());
  modal.querySelector('[data-close="true"]').addEventListener('click', () => modal.remove());
}

function handleCardAction(event) {
  const button = event.target.closest('[data-video]');
  if (!button) return;

  const src = button.dataset.video;
  if (!src) return;

  openVideoModal(button.dataset.title || 'Property Video', src);
}

function filterProperties(query) {
  const normalized = query.trim().toLowerCase();

  if (!normalized) {
    renderProperties(properties);
    return;
  }

  const filtered = properties.filter((property) => {
    const searchable = `${property.title} ${property.location} ${property.type}`.toLowerCase();
    return searchable.includes(normalized);
  });

  renderProperties(filtered);
}

searchInput.addEventListener('input', (event) => {
  filterProperties(event.target.value);
});

document.addEventListener('click', handleCardAction);

renderProperties(properties);
