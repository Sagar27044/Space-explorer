const satelliteData = [
    { name: "GPS", description: "Global Positioning System satellite for navigation and timing services." },
    { name: "Hubble", description: "Space telescope for observing distant galaxies and celestial objects." },
    { name: "ISS", description: "International Space Station, a habitable artificial satellite in low Earth orbit." },
    { name: "GOES", description: "Geostationary Operational Environmental Satellite for weather monitoring and forecasting." },
    { name: "Iridium", description: "Communication satellite constellation for global voice and data coverage." },
    { name: "TDRS", description: "Tracking and Data Relay Satellite for NASA communications with other satellites and spacecraft." },
    { name: "Galileo", description: "European Union's global navigation satellite system, an alternative to GPS." },
    { name: "GLONASS", description: "Russian Global Navigation Satellite System, providing an alternative positioning service." }
];

function createSatellites() {
    const earthContainer = document.querySelector('.earth-container');
    const centerX = earthContainer.offsetWidth / 2;
    const centerY = earthContainer.offsetHeight / 2;

    satelliteData.forEach((sat, index) => {
        const satellite = document.createElement('div');
        satellite.classList.add('satellite');
        
        // Calculate angle based on index to spread satellites more evenly
        const baseAngle = (index / satelliteData.length) * 360;
        const randomAngleOffset = Math.random() * 20 - 10; // Random offset between -10 and 10 degrees
        const angle = baseAngle + randomAngleOffset;

        // Vary the distance for each satellite
        const minDistance = 130;
        const maxDistance = 170;
        const distance = minDistance + (Math.random() * (maxDistance - minDistance));
        
        const radian = angle * Math.PI / 180;
        const x = centerX + Math.cos(radian) * distance - 6; // Subtract half of satellite width
        const y = centerY + Math.sin(radian) * distance - 6; // Subtract half of satellite height
        
        satellite.style.left = `${x}px`;
        satellite.style.top = `${y}px`;

        // Add a small random rotation to each satellite
        const rotation = Math.random() * 360;
        satellite.style.transform = `rotate(${rotation}deg)`;

        satellite.addEventListener('click', (event) => {
            event.stopPropagation();
            showSatelliteInfo(sat);
        });
        earthContainer.appendChild(satellite);
    });
}

function showSatelliteInfo(satellite) {
    const modal = document.getElementById('satellite-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');

    modalTitle.textContent = satellite.name;
    modalDescription.textContent = satellite.description;

    modal.style.display = "block";
}

function addMoonInteractivity() {
    const moonOrbit = document.querySelector('.moon-orbit');
    const moon = moonOrbit.querySelector('.moon');
    moon.addEventListener('click', (event) => {
        event.stopPropagation();
        showCelestialInfo({
            name: "Moon",
            description: "Earth's only natural satellite and the fifth largest moon in the Solar System."
        });
    });
}

function addEarthInteractivity() {
    const earth = document.querySelector('.earth');
    earth.addEventListener('click', () => {
        showSatelliteInfo({
            name: "Earth",
            description: "Our home planet, the third planet from the Sun and the only known planet to harbor life."
        });
    });
}

// Close the modal when clicking on <span> (x)
document.querySelector('.close').onclick = function() {
    document.getElementById('satellite-modal').style.display = "none";
}

// Close the modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('satellite-modal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

const spaceFacts = [
    "The Sun accounts for 99.86% of the mass in the solar system.",
    "One day on Venus is longer than one year on Earth.",
    "The Great Red Spot on Jupiter has been raging for over 300 years.",
    "If you could fit Saturn in a bathtub, it would float.",
    "The Moon is slowly drifting away from Earth at a rate of about 1.5 inches per year.",
    "There are more trees on Earth than stars in the Milky Way.",
    "The footprints on the Moon will be there for 100 million years.",
    "The largest known star, VY Canis Majoris, is about 1,000 times larger than our Sun.",
    "A year on Mercury is just 88 days long.",
    "The Hubble Space Telescope has made more than 1.3 million observations since its launch in 1990."
];

let currentFactIndex = 0;

function displayFact() {
    const factDisplay = document.getElementById('fact-display');
    factDisplay.style.opacity = 0;
    
    setTimeout(() => {
        factDisplay.textContent = spaceFacts[currentFactIndex];
        factDisplay.style.opacity = 1;
        currentFactIndex = (currentFactIndex + 1) % spaceFacts.length;
    }, 500);
}

function rotateFacts() {
    displayFact();
    setInterval(displayFact, 10000);
}

document.addEventListener('DOMContentLoaded', () => {
    createSatellites();
    addMoonInteractivity();
    addEarthInteractivity();
    rotateFacts();
});

document.addEventListener('DOMContentLoaded', function() {
  const slider = document.querySelector('.org-slider');
  const sliderContent = document.querySelector('.slider-content');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  const orgItems = document.querySelectorAll('.org-item');
  let currentIndex = 0;

  function showOrg(index) {
    const newPosition = -index * orgItems[0].offsetHeight;
    sliderContent.style.transform = `translateY(${newPosition}px)`;
  }

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + orgItems.length) % orgItems.length;
    showOrg(currentIndex);
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % orgItems.length;
    showOrg(currentIndex);
  });

  // Show slider on hover
  slider.addEventListener('mouseenter', () => {
    slider.style.right = '0';
  });

  slider.addEventListener('mouseleave', () => {
    slider.style.right = '-300px';
  });
});
