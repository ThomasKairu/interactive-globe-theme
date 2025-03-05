class Navigation {
    constructor(globe) {
        this.globe = globe;
        this.markers = new Map();
        this.currentPopup = null;
        this.init();
    }

    init() {
        const nav = document.getElementById('main-navigation');
        const locations = [
            { 
                name: 'North America',
                lat: 39.8283,
                lng: -98.5795,
                color: 0x4287f5,
                coverImage: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29',
                info: `
                    <h3>North America</h3>
                    <p>The third-largest continent, extending from the Arctic Circle to the tropics.</p>
                    <h4>Key Facts:</h4>
                    <ul>
                        <li>Population: Over 592 million</li>
                        <li>Largest country: Canada</li>
                        <li>Major mountain ranges: Rocky Mountains, Appalachians</li>
                        <li>Notable features: Great Lakes, Grand Canyon</li>
                    </ul>
                    <p>Home to diverse ecosystems from Arctic tundra to tropical rainforests.</p>
                `
            },
            { 
                name: 'South America',
                lat: -8.7832,
                lng: -55.4915,
                color: 0x2ecc71,
                coverImage: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325',
                info: `
                    <h3>South America</h3>
                    <p>Home to the world's largest rainforest and the Andes Mountains.</p>
                    <h4>Key Facts:</h4>
                    <ul>
                        <li>Population: Over 430 million</li>
                        <li>Largest country: Brazil</li>
                        <li>Major features: Amazon Rainforest, Andes Mountains</li>
                        <li>Notable landmarks: Machu Picchu, Christ the Redeemer</li>
                    </ul>
                `
            },
            { 
                name: 'Europe',
                lat: 48.8566,
                lng: 2.3522,
                color: 0xe74c3c,
                coverImage: 'https://images.unsplash.com/photo-1485081669829-bacb8c7bb1f3',
                info: `
                    <h3>Europe</h3>
                    <p>A culturally rich peninsula of the Eurasian supercontinent.</p>
                    <h4>Key Facts:</h4>
                    <ul>
                        <li>Population: Over 740 million</li>
                        <li>Largest country: Russia (partially in Europe)</li>
                        <li>Major features: Alps, Mediterranean Sea</li>
                        <li>Notable landmarks: Eiffel Tower, Colosseum</li>
                    </ul>
                `
            },
            { 
                name: 'Africa',
                lat: 0.3476,
                lng: 32.5825,
                color: 0xf1c40f,
                coverImage: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e',
                info: `
                    <h3>Africa</h3>
                    <p>The world's second-largest and second-most populous continent.</p>
                    <h4>Key Facts:</h4>
                    <ul>
                        <li>Population: Over 1.2 billion</li>
                        <li>Largest country: Algeria</li>
                        <li>Major features: Sahara Desert, Nile River</li>
                        <li>Notable landmarks: Pyramids of Giza, Mount Kilimanjaro</li>
                    </ul>
                `
            },
            { 
                name: 'Asia',
                lat: 34.0479,
                lng: 100.6197,
                color: 0x9b59b6,
                coverImage: 'https://images.unsplash.com/photo-1535139262971-c51845709a48',
                info: `
                    <h3>Asia</h3>
                    <p>Earth's largest and most populous continent.</p>
                    <h4>Key Facts:</h4>
                    <ul>
                        <li>Population: Over 4.5 billion</li>
                        <li>Largest country: Russia (partially in Asia)</li>
                        <li>Major features: Himalayas, Gobi Desert</li>
                        <li>Notable landmarks: Great Wall of China, Taj Mahal</li>
                    </ul>
                `
            },
            { 
                name: 'Australia',
                lat: -25.2744,
                lng: 133.7751,
                color: 0xe67e22,
                coverImage: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be',
                info: `
                    <h3>Australia</h3>
                    <p>The world's smallest continent and largest country by area.</p>
                    <h4>Key Facts:</h4>
                    <ul>
                        <li>Population: Over 25 million</li>
                        <li>Major features: Great Barrier Reef, Outback</li>
                        <li>Notable landmarks: Sydney Opera House, Uluru</li>
                        <li>Unique wildlife: Kangaroos, Koalas</li>
                    </ul>
                `
            },
            { 
                name: 'Antarctica',
                lat: -82.8628,
                lng: 135.0000,
                color: 0xbdc3c7,
                coverImage: 'https://images.unsplash.com/photo-1494500764479-0c8f2919a3d8',
                info: `
                    <h3>Antarctica</h3>
                    <p>The southernmost continent, 98% covered by ice.</p>
                    <h4>Key Facts:</h4>
                    <ul>
                        <li>Area: 14.2 million km²</li>
                        <li>Average temperature: -63°C</li>
                        <li>Major features: Ice Sheet, Antarctic Peninsula</li>
                        <li>Notable wildlife: Penguins, Seals</li>
                    </ul>
                `
            }
        ];

        // Create container for button groups
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'continent-buttons';
        nav.appendChild(buttonContainer);

        // Create popup container
        const popupContainer = document.createElement('div');
        popupContainer.id = 'popup-container';
        document.body.appendChild(popupContainer);

        locations.forEach(location => {
            const button = document.createElement('button');
            button.className = 'continent-button';
            button.innerHTML = `
                <span class="continent-color" style="background: #${location.color.toString(16)}"></span>
                <span class="continent-name">${location.name}</span>
            `;
            
            button.addEventListener('click', () => {
                this.navigateToLocation(location);
                this.showPopup(location);
            });
            
            buttonContainer.appendChild(button);
        });
    }

    showPopup(location) {
        const popupContainer = document.getElementById('popup-container');
        
        // If there's an existing popup, remove it with animation
        if (this.currentPopup) {
            const oldPopup = this.currentPopup;
            gsap.to(oldPopup, {
                opacity: 0,
                x: 50,
                duration: 0.3,
                onComplete: () => {
                    if (oldPopup.parentNode) {
                        popupContainer.removeChild(oldPopup);
                    }
                }
            });
        }

        // Create new popup
        const popup = document.createElement('div');
        popup.className = 'location-popup';
        popup.innerHTML = `
            <button class="close-popup">×</button>
            <img class="cover-image" src="${location.coverImage}?auto=format&fit=crop&w=600&q=80" alt="${location.name}">
            <div class="content">
                ${location.info}
            </div>
        `;

        // Add close button functionality
        popup.querySelector('.close-popup').addEventListener('click', () => {
            this.closePopup();
        });

        // Add popup to container
        popupContainer.appendChild(popup);
        this.currentPopup = popup;

        // Animate popup entrance
        gsap.fromTo(popup,
            {
                opacity: 0,
                x: 50
            },
            {
                opacity: 1,
                x: 0,
                duration: 0.3,
                ease: "power2.out"
            }
        );
    }

    navigateToLocation(location) {
        console.log('Navigating to:', location);
        // Dispatch continent selected event
        const event = new CustomEvent('continentSelected', {
            detail: location,
            bubbles: true  // Make sure event bubbles up
        });
        document.dispatchEvent(event);
        console.log('Dispatched continentSelected event');

        const { lat, lng } = location;
        const phi = (90 - lat) * (Math.PI / 180);
        const theta = (lng + 180) * (Math.PI / 180);
        
        const targetX = -(Math.sin(phi) * Math.cos(theta)) * 4;
        const targetY = Math.cos(phi) * 4;
        const targetZ = Math.sin(phi) * Math.sin(theta) * 4;
        
        this.globe.autoRotationSpeed = 0;
        
        gsap.to(this.globe.camera.position, {
            x: targetX,
            y: targetY,
            z: targetZ,
            duration: 2,
            ease: "power2.inOut",
            onUpdate: () => {
                this.globe.camera.lookAt(0, 0, 0);
            },
            onComplete: () => {
                this.globe.autoRotationSpeed = 0.001;
            }
        });
    }

    closePopup() {
        if (this.currentPopup) {
            console.log('Closing popup, dispatching deselect event');
            // Dispatch continent deselected event
            const event = new Event('continentDeselected', {
                bubbles: true  // Make sure event bubbles up
            });
            document.dispatchEvent(event);
            
            this.currentPopup.remove();
            this.currentPopup = null;
        }
    }
}
