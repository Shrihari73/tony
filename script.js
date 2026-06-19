/**
 * STARK GARAGE REGISTRY DATABASE
 * Add, edit, or remove objects here. The UI updates dynamically.
 */
const vehicleDatabase = {
  cars: [
    {
      id: "car-01",
      name: "Rolls Royce Standard Ghost",
      image: "images/rolls royce.png", 
      specs: { engine: "6.75 L Twin-Turbo V12", speed: "250 km/h", power: "563 BHP", torque: "820 Nm" }
    },
    {
      id: "car-02",
      name: "Mercedes-Benz A-Class Limousine",
      image: "images/mercedes benz.png",
      specs: { engine: " 1.3L Turbocharged Inline-4", speed: "230 km/h", power: "161 BHP", torque: " 270 Nm" }
    }
  ],
  bikes: [
    {
      id: "bike-01",
      name: "Ducati Panigale V4",
      image: "images/panigale.jpg",
      specs: { engine: "1,103 cc Desmosedici", speed: "299 km/h", power: "210 BHP", torque: "124 Nm" }
    }
  ]
};

document.addEventListener('DOMContentLoaded', () => {
  const bootBtn = document.getElementById('boot-btn');
  const splashScreen = document.getElementById('splash-screen');
  const mainContent = document.getElementById('main-content');
  const showroomGrid = document.getElementById('showroom-grid');
  const carBtn = document.getElementById('show-cars');
  const bikeBtn = document.getElementById('show-bikes');

  // PHASE 1: Boot-Up Transition Sequence
  bootBtn.addEventListener('click', () => {
    // Dismiss the splash card screen
    splashScreen.classList.add('shutdown-sequence');
    
    setTimeout(() => {
      splashScreen.style.display = 'none';
      mainContent.classList.remove('hidden');
      
      // Delay slightly to trigger secondary screen fade-in cleanly
      setTimeout(() => {
        mainContent.classList.add('boot-active');
        document.body.style.overflow = 'auto'; // Restore safe window scroll
      }, 50);
    }, 800);
  });

  // PHASE 2: Dynamic Content Rendering Engine
  function renderShowroom(category) {
    // Clear out active items
    showroomGrid.innerHTML = '';
    
    const collection = vehicleDatabase[category];
    
    if (!collection || collection.length === 0) {
      showroomGrid.innerHTML = `<div class="prompt-text" style="grid-column: 1/-1; text-align: center; padding: 40px;">NO TELEMETRY DATA RETURNED.</div>`;
      return;
    }

    collection.forEach(item => {
      const card = document.createElement('div');
      card.className = 'vehicle-card';
      
      card.innerHTML = `
        <div class="image-wrapper">
          <img src="${item.image}" alt="${item.name}" onerror="this.src='https://placehold.co/600x400/060a0f/00f0ff?text=TELEMETRY+REQUIRED'">
        </div>
        <div class="vehicle-info">
          <h3>${item.name}</h3>
          <div class="telemetry-specs">
            <div class="spec-line">
              <span class="spec-label">SYS.ENG //</span>
              <span class="spec-value">${item.specs.engine}</span>
            </div>
            <div class="spec-line">
              <span class="spec-label">MAX.SPD //</span>
              <span class="spec-value">${item.specs.speed}</span>
            </div>
            <div class="spec-line">
              <span class="spec-label">NET.BHP //</span>
              <span class="spec-value">${item.specs.power}</span>
            </div>
            <div class="spec-line">
              <span class="spec-label">NET.TRQ //</span>
              <span class="spec-value">${item.specs.torque}</span>
            </div>
          </div>
        </div>
      `;
      showroomGrid.appendChild(card);
    });
  }

  // Segment Controller Links
  carBtn.addEventListener('click', () => {
    carBtn.classList.add('active');
    bikeBtn.classList.remove('active');
    renderShowroom('cars');
  });

  bikeBtn.addEventListener('click', () => {
    bikeBtn.classList.add('active');
    carBtn.classList.remove('active');
    renderShowroom('bikes');
  });

  // Primary Default Load Sequence
  renderShowroom('cars');
});