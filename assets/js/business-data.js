/**
 * Business Data Integration
 * Handles frontend data visualization and interaction
 */

class BusinessDataManager {
    constructor(globe) {
        this.globe = globe;
        this.dataCache = new Map();
        this.activeDataLayer = null;
        this.currentPopup = null;
        this.selectedContinent = null;
        this.continentData = {
            "North America": {
                metrics: {
                    revenue: 34000000000000, // $34 trillion
                    employees: 235000000, // 235 million
                    market_share: 31
                },
                details: {
                    revenue_growth: 3.2,
                    employment_distribution: "68% USA, 8.5% Canada, 23.5% Mexico",
                    market_position: "Second largest economic region globally",
                    key_sectors: ["Technology", "Finance", "Manufacturing", "Agriculture"],
                    economic_indicators: {
                        gdp_per_capita: "$68,000",
                        labor_participation: "62%",
                        major_industries: "Technology, Finance, Manufacturing"
                    }
                },
                locations: [
                    {
                        name: "New York HQ",
                        lat: 40.7128,
                        lng: -74.0060,
                        type: "headquarters",
                        metrics: {
                            revenue: 8500000000000, // $8.5 trillion
                            employees: 160000000, // USA workforce
                            market_share: 21
                        }
                    },
                    {
                        name: "Toronto Office",
                        lat: 43.6532,
                        lng: -79.3832,
                        type: "regional_office",
                        metrics: {
                            revenue: 2100000000000, // $2.1 trillion
                            employees: 20000000, // Canadian workforce
                            market_share: 5
                        }
                    }
                ]
            },
            "Europe": {
                metrics: {
                    revenue: 27100000000000, // $27.1 trillion
                    employees: 450000000, // 450 million
                    market_share: 25
                },
                details: {
                    revenue_growth: 2.8,
                    employment_distribution: "Western Europe 45%, Eastern Europe 30%, Southern Europe 25%",
                    market_position: "Third largest economic region",
                    key_sectors: ["Services", "Manufacturing", "Technology"],
                    economic_indicators: {
                        gdp_per_capita: "$60,200",
                        labor_participation: "57%",
                        major_industries: "Automotive, Finance, Tourism"
                    }
                },
                locations: [
                    {
                        name: "London Office",
                        lat: 51.5074,
                        lng: -0.1278,
                        type: "regional_office",
                        metrics: {
                            revenue: 3200000000000, // $3.2 trillion
                            employees: 33000000,
                            market_share: 8
                        }
                    },
                    {
                        name: "Frankfurt Hub",
                        lat: 50.1109,
                        lng: 8.6821,
                        type: "financial_center",
                        metrics: {
                            revenue: 4100000000000, // $4.1 trillion
                            employees: 45000000,
                            market_share: 9
                        }
                    }
                ]
            },
            "Asia": {
                metrics: {
                    revenue: 39800000000000, // $39.8 trillion
                    employees: 2100000000, // 2.1 billion
                    market_share: 36
                },
                details: {
                    revenue_growth: 4.5,
                    employment_distribution: "East Asia 40%, South Asia 35%, Southeast Asia 25%",
                    market_position: "Largest economic region globally",
                    key_sectors: ["Manufacturing", "Technology", "Services"],
                    economic_indicators: {
                        gdp_per_capita: "$18,952",
                        labor_participation: "59%",
                        major_industries: "Manufacturing, Technology, Agriculture"
                    }
                },
                locations: [
                    {
                        name: "Tokyo Hub",
                        lat: 35.6762,
                        lng: 139.6503,
                        type: "regional_office",
                        metrics: {
                            revenue: 4900000000000, // $4.9 trillion
                            employees: 68000000,
                            market_share: 11
                        }
                    },
                    {
                        name: "Shanghai Center",
                        lat: 31.2304,
                        lng: 121.4737,
                        type: "regional_office",
                        metrics: {
                            revenue: 7100000000000, // $7.1 trillion
                            employees: 780000000,
                            market_share: 15
                        }
                    }
                ]
            },
            "South America": {
                metrics: {
                    revenue: 4200000000000, // $4.2 trillion
                    employees: 175000000, // 175 million (mid-range of 150-200 million)
                    market_share: 3.8
                },
                details: {
                    revenue_growth: 2.1,
                    employment_distribution: "Brazil 50%, Argentina 15%, Colombia 12%, Others 23%",
                    market_position: "Growing emerging market region",
                    key_sectors: ["Agriculture", "Mining", "Manufacturing", "Services"],
                    economic_indicators: {
                        gdp_per_capita: "$24,000",
                        labor_participation: "58%",
                        major_industries: "Agriculture, Mining, Manufacturing"
                    }
                },
                locations: [
                    {
                        name: "São Paulo Hub",
                        lat: -23.5505,
                        lng: -46.6333,
                        type: "regional_office",
                        metrics: {
                            revenue: 1800000000000,
                            employees: 85000000,
                            market_share: 1.8
                        }
                    },
                    {
                        name: "Buenos Aires Office",
                        lat: -34.6037,
                        lng: -58.3816,
                        type: "branch",
                        metrics: {
                            revenue: 850000000000,
                            employees: 25000000,
                            market_share: 0.8
                        }
                    }
                ]
            },
            "Africa": {
                metrics: {
                    revenue: 2780000000000, // $2.78 trillion
                    employees: 650000000, // 650 million (mid-range of 600-700 million)
                    market_share: 2.5
                },
                details: {
                    revenue_growth: 3.8,
                    employment_distribution: "North Africa 25%, Sub-Saharan 75%",
                    market_position: "Rapidly growing emerging market",
                    key_sectors: ["Agriculture", "Mining", "Services", "Manufacturing"],
                    economic_indicators: {
                        gdp_per_capita: "$4,277",
                        labor_participation: "63%",
                        major_industries: "Agriculture, Mining, Telecommunications"
                    }
                },
                locations: [
                    {
                        name: "Cairo Office",
                        lat: 30.0444,
                        lng: 31.2357,
                        type: "regional_office",
                        metrics: {
                            revenue: 850000000000,
                            employees: 160000000,
                            market_share: 0.8
                        }
                    },
                    {
                        name: "Johannesburg Hub",
                        lat: -26.2041,
                        lng: 28.0473,
                        type: "regional_office",
                        metrics: {
                            revenue: 650000000000,
                            employees: 140000000,
                            market_share: 0.6
                        }
                    }
                ]
            },
            "Australia": {
                metrics: {
                    revenue: 2100000000000, // $2.1 trillion
                    employees: 30000000, // 30 million (Oceania total)
                    market_share: 1.9
                },
                details: {
                    revenue_growth: 2.5,
                    employment_distribution: "Australia 75%, New Zealand 15%, Pacific Islands 10%",
                    market_position: "Advanced developed economy",
                    key_sectors: ["Mining", "Services", "Agriculture", "Technology"],
                    economic_indicators: {
                        gdp_per_capita: "$70,000",
                        labor_participation: "66%",
                        major_industries: "Mining, Finance, Education"
                    }
                },
                locations: [
                    {
                        name: "Sydney HQ",
                        lat: -33.8688,
                        lng: 151.2093,
                        type: "headquarters",
                        metrics: {
                            revenue: 1200000000000,
                            employees: 18000000,
                            market_share: 1.1
                        }
                    },
                    {
                        name: "Wellington Office",
                        lat: -41.2866,
                        lng: 174.7756,
                        type: "branch",
                        metrics: {
                            revenue: 450000000000,
                            employees: 4500000,
                            market_share: 0.4
                        }
                    }
                ]
            },
            "Antarctica": {
                metrics: {
                    revenue: 0, // No traditional economy
                    employees: 4000, // Approximate number of researchers during peak season
                    market_share: 0
                },
                details: {
                    revenue_growth: 0,
                    employment_distribution: "Research Stations 100%",
                    market_position: "Research-only territory",
                    key_sectors: ["Scientific Research", "Environmental Monitoring"],
                    economic_indicators: {
                        gdp_per_capita: "N/A",
                        labor_participation: "N/A",
                        major_industries: "Scientific Research"
                    }
                },
                locations: [
                    {
                        name: "McMurdo Station",
                        lat: -77.8419,
                        lng: 166.6863,
                        type: "research_station",
                        metrics: {
                            revenue: 0,
                            employees: 1200,
                            market_share: 0
                        }
                    },
                    {
                        name: "Amundsen-Scott Station",
                        lat: -90,
                        lng: 0,
                        type: "research_station",
                        metrics: {
                            revenue: 0,
                            employees: 800,
                            market_share: 0
                        }
                    }
                ]
            }
        };

        // Wait for DOM content to be loaded before initializing
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    init() {
        this.setupEventListeners();
        this.setupContinentListener();
        
        // Set up marker click handler
        this.globe.onMarkerClick = (data) => this.showLocationDetails(data);
        
        // Initialize buttons state
        this.updateButtonsState(false);
    }

    updateButtonsState(enabled) {
        const buttons = document.querySelectorAll('.data-layer-toggle');
        buttons.forEach(button => {
            if (enabled) {
                button.removeAttribute('disabled');
                button.style.pointerEvents = 'auto';
                button.style.opacity = '1';
                button.classList.add('active');
            } else {
                button.setAttribute('disabled', 'disabled');
                button.style.pointerEvents = 'none';
                button.style.opacity = '0.6';
                button.classList.remove('active');
            }
        });
    }

    setupContinentListener() {
        document.addEventListener('continentSelected', (event) => {
            console.log('Continent selected:', event.detail);
            this.selectedContinent = event.detail;
            this.loadContinentData(event.detail);
            this.updateButtonsState(true);
        });

        document.addEventListener('continentDeselected', () => {
            console.log('Continent deselected');
            this.selectedContinent = null;
            this.hideDataLayer();
            this.clearMarkers();
            this.updateButtonsState(false);
        });
    }

    setupEventListeners() {
        const buttons = document.querySelectorAll('.data-layer-toggle');
        console.log('Setting up event listeners for buttons:', buttons.length);
        
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                if (button.hasAttribute('disabled')) {
                    this.showWarning('Please select a continent first');
                    return;
                }
                
                console.log('Button clicked:', e.target.dataset.layer);
                const layerType = e.target.dataset.layer;
                this.toggleDataLayer(layerType);
            });
        });
    }

    showWarning(message) {
        const warning = document.createElement('div');
        warning.className = 'warning-popup';
        warning.innerHTML = `
            <div class="warning-content">
                <p>${message}</p>
            </div>
        `;
        document.body.appendChild(warning);

        // Remove warning after 3 seconds
        setTimeout(() => {
            warning.classList.add('fade-out');
            setTimeout(() => {
                document.body.removeChild(warning);
            }, 300);
        }, 3000);
    }

    async loadContinentData(continent) {
        try {
            const data = this.continentData[continent.name];
            if (data && data.locations) {
                this.renderLocations(data.locations);
            }
        } catch (error) {
            console.error('Failed to load continent data:', error);
        }
    }

    clearMarkers() {
        if (this.globe.markers) {
            this.globe.markers.forEach(marker => {
                this.globe.scene.remove(marker);
            });
            this.globe.markers = [];
        }
    }

    async loadInitialData() {
        try {
            const response = await fetch('/api/sample-data.php');
            const locations = await response.json();
            this.renderLocations(locations);
        } catch (error) {
            console.error('Failed to load initial data:', error);
        }
    }

    async fetchLocations() {
        const response = await fetch('/wp-json/interactive-globe/v1/locations', {
            credentials: 'same-origin'
        });
        return await response.json();
    }

    async fetchMetrics(type, region) {
        const response = await fetch(`/wp-json/interactive-globe/v1/metrics?type=${type}&region=${region}`, {
            credentials: 'same-origin'
        });
        return await response.json();
    }

    renderLocations(locations) {
        console.log('Rendering locations:', locations);
        // Clear existing markers
        this.clearMarkers();

        // Add new markers
        locations.forEach(location => {
            const marker = this.globe.addBusinessMarker(
                location.lat,
                location.lng,
                location
            );
        });
    }

    async toggleDataLayer(type) {
        console.log('Toggling data layer:', type);
        
        // Remove active class from all buttons
        document.querySelectorAll('.data-layer-toggle').forEach(button => {
            button.classList.remove('selected');
        });

        // Clear any existing data popup
        this.hideDataPopup();

        if (this.activeDataLayer === type) {
            this.hideDataLayer();
            return;
        }

        try {
            // Add selected class to clicked button
            const button = document.querySelector(`[data-layer="${type}"]`);
            button.classList.add('selected');

            console.log('Selected continent:', this.selectedContinent.name);
            
            // Get data for the selected continent
            const continentData = this.continentData[this.selectedContinent.name];
            console.log('Using data:', continentData);
            
            if (continentData && continentData.locations) {
                this.visualizeData(type, continentData.locations);
                this.showDataLayerInfo(type, continentData);
                this.activeDataLayer = type;
            }
        } catch (error) {
            console.error('Failed to toggle data layer:', error);
        }
    }

    visualizeData(type, locations) {
        console.log('Visualizing data:', type, locations);
        // Clear existing markers
        this.clearMarkers();

        // Create markers for the data
        locations.forEach(location => {
            const value = location.metrics[type];
            console.log('Creating marker for:', location.name, 'with value:', value);
            const marker = this.globe.addBusinessMarker(
                location.lat,
                location.lng,
                {
                    ...location,
                    highlightValue: value
                }
            );
        });
    }

    hideDataLayer() {
        console.log('Hiding data layer');
        this.clearMarkers();
        this.hideDataPopup();
        this.activeDataLayer = null;
        
        // Remove selected class from all buttons
        document.querySelectorAll('.data-layer-toggle').forEach(button => {
            button.classList.remove('selected');
        });
    }

    showLocationDetails(location) {
        // Remove existing popup if any
        if (this.currentPopup) {
            document.body.removeChild(this.currentPopup);
        }

        // Create new popup
        const popup = document.createElement('div');
        popup.className = 'location-details-popup';
        popup.innerHTML = `
            <div class="popup-header">
                <h3>${location.name}</h3>
                <button class="close-popup">×</button>
            </div>
            <div class="metrics">
                <div class="metric">
                    <label>Revenue</label>
                    <value>${this.formatCurrency(location.metrics.revenue)}</value>
                </div>
                <div class="metric">
                    <label>Employees</label>
                    <value>${location.metrics.employees}</value>
                </div>
                <div class="metric">
                    <label>Market Share</label>
                    <value>${location.metrics.market_share}%</value>
                </div>
            </div>
            <div class="location-info">
                <p><strong>Address:</strong><br>${location.address}</p>
                <p><strong>Contact:</strong><br>${location.contact_info}</p>
            </div>
            <div class="actions">
                <button class="details-btn">View Details</button>
                <button class="contact-btn">Contact Info</button>
            </div>
        `;

        // Add close button functionality
        popup.querySelector('.close-popup').addEventListener('click', () => {
            document.body.removeChild(popup);
            this.currentPopup = null;
        });

        // Add to page
        document.body.appendChild(popup);
        this.currentPopup = popup;

        // Add animation
        requestAnimationFrame(() => {
            popup.style.opacity = '1';
            popup.style.transform = 'translateY(0)';
        });
    }

    formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    }

    showDataLayerInfo(type, data) {
        console.log('Showing data layer info:', type);
        const metrics = this.calculateMetrics(type, data);
        console.log('Calculated metrics:', metrics);
        
        const popup = document.createElement('div');
        popup.className = 'data-layer-popup';
        
        let content = '';
        switch (type) {
            case 'revenue':
                content = `
                    <h3>Revenue Distribution - ${this.selectedContinent.name}</h3>
                    <div class="metrics-grid">
                        <div class="metric">
                            <label>Total Revenue</label>
                            <value>${this.formatCurrency(metrics.total)}</value>
                        </div>
                        <div class="metric">
                            <label>Average per Location</label>
                            <value>${this.formatCurrency(metrics.average)}</value>
                        </div>
                        <div class="metric">
                            <label>Highest Revenue</label>
                            <value>${this.formatCurrency(metrics.highest)} (${metrics.highestLocation})</value>
                        </div>
                        <div class="metric">
                            <label>Growth Rate</label>
                            <value>${metrics.growthRate}% YoY</value>
                        </div>
                    </div>
                    <div class="insights">
                        <h4>Key Insights</h4>
                        <ul>
                            <li>Revenue concentration: ${metrics.concentration}% in top locations</li>
                            <li>Year-over-year growth: ${metrics.growthRate}% increase</li>
                            <li>Market position: ${metrics.marketPosition}</li>
                        </ul>
                    </div>
                `;
                break;

            case 'employees':
                content = `
                    <h3>Employee Distribution - ${this.selectedContinent.name}</h3>
                    <div class="metrics-grid">
                        <div class="metric">
                            <label>Total Employees</label>
                            <value>${metrics.total.toLocaleString()}</value>
                        </div>
                        <div class="metric">
                            <label>Average per Location</label>
                            <value>${metrics.average.toFixed(0)}</value>
                        </div>
                        <div class="metric">
                            <label>Largest Office</label>
                            <value>${metrics.highest} (${metrics.highestLocation})</value>
                        </div>
                        <div class="metric">
                            <label>Growth Rate</label>
                            <value>${metrics.growthRate}% YoY</value>
                        </div>
                    </div>
                    <div class="insights">
                        <h4>Workforce Insights</h4>
                        <ul>
                            <li>Workforce distribution: ${metrics.distribution}</li>
                            <li>Employment trends: ${metrics.trends}</li>
                            <li>Diversity ratio: ${metrics.diversityRatio}</li>
                        </ul>
                    </div>
                `;
                break;

            case 'market_share':
                content = `
                    <h3>Market Share Analysis - ${this.selectedContinent.name}</h3>
                    <div class="metrics-grid">
                        <div class="metric">
                            <label>Total Market Share</label>
                            <value>${metrics.total}%</value>
                        </div>
                        <div class="metric">
                            <label>Leading Market</label>
                            <value>${metrics.leadingMarket}</value>
                        </div>
                        <div class="metric">
                            <label>Market Position</label>
                            <value>${metrics.position}</value>
                        </div>
                        <div class="metric">
                            <label>Growth Potential</label>
                            <value>${metrics.growthPotential}</value>
                        </div>
                    </div>
                    <div class="insights">
                        <h4>Market Insights</h4>
                        <ul>
                            <li>Market dominance: ${metrics.dominance}</li>
                            <li>Competitive position: ${metrics.competitivePosition}</li>
                            <li>Growth opportunities: ${metrics.opportunities}</li>
                        </ul>
                    </div>
                `;
                break;
        }

        popup.innerHTML = `
            <button class="close-popup">×</button>
            <div class="content">
                ${content}
            </div>
        `;

        // Add close button functionality
        popup.querySelector('.close-popup').addEventListener('click', () => {
            this.hideDataPopup();
        });

        document.body.appendChild(popup);
        this.dataLayerPopup = popup;

        // Animate entrance
        requestAnimationFrame(() => {
            popup.style.opacity = '1';
            popup.style.transform = 'translateX(0)';
        });
    }

    calculateMetrics(type, data) {
        const continentData = this.continentData[this.selectedContinent.name];
        const metrics = {
            total: 0,
            average: 0,
            highest: 0,
            highestLocation: '',
            growthRate: 0
        };

        switch (type) {
            case 'revenue':
                metrics.total = continentData.metrics.revenue;
                metrics.average = metrics.total / continentData.locations.length;
                const highestRev = continentData.locations.reduce((max, loc) => 
                    loc.metrics.revenue > max.revenue ? 
                    { revenue: loc.metrics.revenue, name: loc.name } : max, 
                    { revenue: 0, name: '' }
                );
                metrics.highest = highestRev.revenue;
                metrics.highestLocation = highestRev.name;
                metrics.growthRate = continentData.details.revenue_growth;
                metrics.concentration = Math.round((highestRev.revenue / metrics.total) * 100);
                metrics.marketPosition = continentData.details.market_position;
                metrics.economic_indicators = continentData.details.economic_indicators;
                break;

            case 'employees':
                metrics.total = continentData.metrics.employees;
                metrics.average = metrics.total / continentData.locations.length;
                metrics.distribution = continentData.details.employment_distribution;
                metrics.labor_participation = continentData.details.economic_indicators.labor_participation;
                metrics.major_industries = continentData.details.economic_indicators.major_industries;
                break;

            case 'market_share':
                metrics.total = continentData.metrics.market_share;
                metrics.position = continentData.details.market_position;
                metrics.key_sectors = continentData.details.key_sectors;
                metrics.economic_indicators = continentData.details.economic_indicators;
                break;
        }

        return metrics;
    }

    hideDataPopup() {
        if (this.dataLayerPopup) {
            document.body.removeChild(this.dataLayerPopup);
            this.dataLayerPopup = null;
        }
    }
} 