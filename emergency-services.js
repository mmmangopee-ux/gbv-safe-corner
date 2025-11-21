// Emergency Services Integration for GBV Safe Corner
class EmergencyServices {
    constructor() {
        this.userLocation = null;
        this.safeLocations = [];
        this.emergencyContacts = {
            police: '10111',
            gbvCommand: '0800 428 428',
            lifeline: '0861 322 322',
            suicide: '0800 567 567'
        };
    }

    // Get user location
    async getUserLocation() {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocation not supported'));
                return;
            }

            navigator.geolocation.getCurrentPosition(
                position => {
                    this.userLocation = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        accuracy: position.coords.accuracy
                    };
                    resolve(this.userLocation);
                },
                error => {
                    reject(error);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 60000
                }
            );
        });
    }

    // Find nearest safe locations
    async findNearestSafeLocations() {
        if (!this.userLocation) {
            await this.getUserLocation();
        }

        // In production, this would call a real API
        const mockLocations = [
            {
                name: "Johannesburg Central Police Station",
                type: "police",
                distance: "1.2 km",
                address: "1 Commissioner St, Johannesburg",
                phone: "011 497 7000",
                coordinates: { lat: -26.2041, lng: 28.0473 }
            },
            {
                name: "People Opposing Women Abuse (POWA)",
                type: "shelter",
                distance: "2.5 km",
                address: "123 Bree Street, Johannesburg",
                phone: "011 642 4345",
                coordinates: { lat: -26.2050, lng: 28.0480 }
            },
            {
                name: "Charlotte Maxeke Hospital",
                type: "hospital",
                distance: "3.1 km",
                address: "17 Jubilee Rd, Auckland Park",
                phone: "011 488 4911",
                coordinates: { lat: -26.1850, lng: 28.0080 }
            }
        ];

        this.safeLocations = mockLocations;
        return this.safeLocations;
    }

    // Calculate distance between coordinates
    calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Earth's radius in km
        const dLat = this.deg2rad(lat2 - lat1);
        const dLon = this.deg2rad(lon2 - lon1);
        
        const a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
            Math.sin(dLon/2) * Math.sin(dLon/2);
        
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        const distance = R * c; // Distance in km
        
        return distance;
    }

    deg2rad(deg) {
        return deg * (Math.PI/180);
    }

    // Emergency contact methods
    callEmergency(number) {
        window.location.href = `tel:${number}`;
    }

    sendEmergencySMS(number, message) {
        window.location.href = `sms:${number}?body=${encodeURIComponent(message)}`;
    }

    // Share location with emergency contacts
    async shareLocationWithContacts() {
        if (!this.userLocation) {
            await this.getUserLocation();
        }

        const message = `EMERGENCY: I need help at https://maps.google.com/?q=${this.userLocation.latitude},${this.userLocation.longitude}`;
        
        // This would integrate with device sharing capabilities
        if (navigator.share) {
            navigator.share({
                title: 'Emergency Location',
                text: message,
                url: window.location.href
            });
        } else {
            // Fallback to SMS
            this.sendEmergencySMS(this.emergencyContacts.police, message);
        }
    }

    // Safe route calculation
    calculateSafeRoute(destination) {
        // In production, this would integrate with mapping APIs
        // and consider factors like well-lit areas, police presence, etc.
        
        return {
            distance: "2.3 km",
            duration: "8 minutes",
            safetyScore: 85,
            instructions: [
                "Head north on Main Street",
                "Turn right at Police Station",
                "Continue for 500m to safe location"
            ]
        };
    }
}

// Export for use in main application
window.EmergencyServices = EmergencyServices;
