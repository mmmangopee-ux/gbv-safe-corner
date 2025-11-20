// navigation.js - Global navigation system
function loadNavigation() {
    const navHTML = `
    <div class="nav-container">
        <button class="nav-button" onclick="toggleNav()">☰ Menu</button>
        <div class="nav-grid" id="navGrid">
            <a href="index.html" class="nav-item">Home</a>
            <a href="report.html" class="nav-item">Report</a>
            <a href="support.html" class="nav-item">Support</a>
            <a href="stories.html" class="nav-item">Stories</a>
            <a href="library.html" class="nav-item">Resources</a>
            <a href="community.html" class="nav-item">Community</a>
            <a href="events.html" class="nav-item">Events</a>
            <a href="about.html" class="nav-item">About</a>
            <a href="safety-plan.html" class="nav-item">Safety</a>
            <a href="risk-assessment.html" class="nav-item">Risk Check</a>
            <a href="education-hub.html" class="nav-item">Education</a>
            <a href="login.html" class="nav-item">Admin</a>
        </div>
    </div>
    `;
    
    // Add navigation styles
    const navStyles = `
    <style>
    .nav-container {
        background: white;
        border-radius: 10px;
        padding: 10px;
        margin: 20px 0;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    
    .nav-button {
        display: block;
        width: 100%;
        background: #6A0DAD;
        color: white;
        border: none;
        padding: 15px;
        border-radius: 8px;
        font-size: 18px;
        font-weight: bold;
        cursor: pointer;
        margin-bottom: 10px;
        text-align: center;
    }
    
    .nav-grid {
        display: none;
        grid-template-columns: repeat(3, 1fr);
        gap: 8px;
        padding: 10px;
    }
    
    .nav-grid.active {
        display: grid;
    }
    
    .nav-item {
        background: #f8f8f8;
        padding: 12px 8px;
        text-align: center;
        text-decoration: none;
        color: #6A0DAD;
        font-weight: bold;
        border-radius: 6px;
        font-size: 14px;
        border: 2px solid #e0e0e0;
        transition: all 0.3s ease;
    }
    
    .nav-item:hover {
        background: #6A0DAD;
        color: white;
        border-color: #6A0DAD;
    }
    
    .nav-item.current {
        background: #8A2BE2;
        color: white;
        border-color: #8A2BE2;
    }

    @media (min-width: 769px) {
        .nav-button {
            display: none;
        }
        
        .nav-grid {
            display: grid;
            grid-template-columns: repeat(6, 1fr);
        }
    }
    </style>
    `;
    
    // Insert styles and navigation
    document.head.insertAdjacentHTML('beforeend', navStyles);
    
    // Find where to insert navigation (after header)
    const header = document.querySelector('.header');
    if (header) {
        header.insertAdjacentHTML('afterend', navHTML);
    }
}

function toggleNav() {
    const navGrid = document.getElementById('navGrid');
    if (navGrid) {
        navGrid.classList.toggle('active');
    }
}

// Load navigation when page loads
document.addEventListener('DOMContentLoaded', loadNavigation);
