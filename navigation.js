// navigation.js - Complete Global Navigation System
function loadNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    const navHTML = `
    <div class="nav-container">
        <button class="nav-button" onclick="toggleNav()">☰ Menu</button>
        <div class="nav-grid" id="navGrid">
            <a href="index.html" class="nav-item ${currentPage === 'index.html' ? 'current' : ''}" data-translate="home">Home</a>
            <a href="report.html" class="nav-item ${currentPage === 'report.html' ? 'current' : ''}" data-translate="report">Report</a>
            <a href="support.html" class="nav-item ${currentPage === 'support.html' ? 'current' : ''}" data-translate="support">Support</a>
            <a href="stories.html" class="nav-item ${currentPage === 'stories.html' ? 'current' : ''}" data-translate="stories">Stories</a>
            <a href="library.html" class="nav-item ${currentPage === 'library.html' ? 'current' : ''}" data-translate="library">Resources</a>
            <a href="community.html" class="nav-item ${currentPage === 'community.html' ? 'current' : ''}" data-translate="community">Community</a>
            <a href="events.html" class="nav-item ${currentPage === 'events.html' ? 'current' : ''}" data-translate="events">Events</a>
            <a href="about.html" class="nav-item ${currentPage === 'about.html' ? 'current' : ''}" data-translate="about">About</a>
            <a href="safety-plan.html" class="nav-item ${currentPage === 'safety-plan.html' ? 'current' : ''}" data-translate="safety">Safety</a>
            <a href="risk-assessment.html" class="nav-item ${currentPage === 'risk-assessment.html' ? 'current' : ''}" data-translate="assessment">Risk Check</a>
            <a href="education-hub.html" class="nav-item ${currentPage === 'education-hub.html' ? 'current' : ''}" data-translate="education">Education</a>
            <a href="login.html" class="nav-item ${currentPage === 'login.html' ? 'current' : ''}" data-translate="login">Admin</a>
        </div>
    </div>
    `;
    
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
        display: none;
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
        transition: all 0.3s ease;
    }
    
    .nav-button:hover {
        background: #8A2BE2;
    }
    
    .nav-grid {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        gap: 8px;
        padding: 10px;
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
        transform: translateY(-2px);
    }
    
    .nav-item.current {
        background: #8A2BE2;
        color: white;
        border-color: #8A2BE2;
    }

    @media (max-width: 768px) {
        .nav-button {
            display: block;
        }
        
        .nav-grid {
            display: none;
            grid-template-columns: repeat(2, 1fr);
        }
        
        .nav-grid.active {
            display: grid;
        }
        
        .nav-item {
            padding: 15px 8px;
            font-size: 16px;
        }
    }
    </style>
    `;
    
    // Only add styles once
    if (!document.querySelector('#nav-styles')) {
        const styleElement = document.createElement('style');
        styleElement.id = 'nav-styles';
        styleElement.textContent = navStyles;
        document.head.appendChild(styleElement);
    }
    
    // Insert navigation after header
    const header = document.querySelector('.header');
    if (header && !document.querySelector('.nav-container')) {
        header.insertAdjacentHTML('afterend', navHTML);
    }
}

function toggleNav() {
    const navGrid = document.getElementById('navGrid');
    if (navGrid) {
        navGrid.classList.toggle('active');
        
        // ANALYTICS TRACKING
        if (typeof analytics !== 'undefined') {
            analytics.trackFeatureUse('mobile_nav_toggle');
        }
    }
}

// Load navigation when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadNavigation);
} else {
    loadNavigation();
}
