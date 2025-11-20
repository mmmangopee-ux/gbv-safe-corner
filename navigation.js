// navigation.js
function loadNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    const navHTML = `
    <div class="nav-container">
        <button class="nav-button" onclick="toggleNav()">☰ Menu</button>
        <div class="nav-grid" id="navGrid">
            <a href="index.html" class="nav-item ${currentPage === 'index.html' ? 'current' : ''}">Home</a>
            <a href="report.html" class="nav-item ${currentPage === 'report.html' ? 'current' : ''}">Report</a>
            <a href="support.html" class="nav-item ${currentPage === 'support.html' ? 'current' : ''}">Support</a>
            <a href="stories.html" class="nav-item ${currentPage === 'stories.html' ? 'current' : ''}">Stories</a>
            <a href="library.html" class="nav-item ${currentPage === 'library.html' ? 'current' : ''}">Resources</a>
            <a href="community.html" class="nav-item ${currentPage === 'community.html' ? 'current' : ''}">Community</a>
            <a href="events.html" class="nav-item ${currentPage === 'events.html' ? 'current' : ''}">Events</a>
            <a href="about.html" class="nav-item ${currentPage === 'about.html' ? 'current' : ''}">About</a>
            <a href="safety-plan.html" class="nav-item ${currentPage === 'safety-plan.html' ? 'current' : ''}">Safety</a>
            <a href="risk-assessment.html" class="nav-item ${currentPage === 'risk-assessment.html' ? 'current' : ''}">Risk Check</a>
            <a href="education-hub.html" class="nav-item ${currentPage === 'education-hub.html' ? 'current' : ''}">Education</a>
            <a href="login.html" class="nav-item ${currentPage === 'login.html' ? 'current' : ''}">Admin</a>
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
    }
    </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', navStyles);
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

document.addEventListener('DOMContentLoaded', loadNavigation);
