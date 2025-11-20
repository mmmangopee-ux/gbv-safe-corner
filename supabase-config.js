// Enhanced Supabase Configuration with Rate Limiting & Security
const SUPABASE_URL = 'https://sofzsursxpjmghhcphrh.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvZnpzdXJzeHBqbWdoaGNwaHJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM1OTIwNTMsImV4cCI6MjA3OTE2ODA1M30.nW5ylZoVNeJAegTXqx_x0bjb1lSOsvMBnhsScYR8hf8';

// Enhanced rate limiting
let lastSubmission = 0;
const SUBMISSION_DELAY = 5000;

function getIpHash() {
    return 'anonymous_' + Math.random().toString(36).substr(2, 9);
}

function getSessionId() {
    let sessionId = sessionStorage.getItem('gbv_session_id');
    if (!sessionId) {
        sessionId = 'session_' + Math.random().toString(36).substr(2, 9);
        sessionStorage.setItem('gbv_session_id', sessionId);
    }
    return sessionId;
}

function canSubmit() {
    const now = Date.now();
    if (now - lastSubmission < SUBMISSION_DELAY) {
        alert('Please wait a few seconds before submitting again.');
        return false;
    }
    lastSubmission = now;
    return true;
}

async function submitToSupabaseWithLimit(tableName, data) {
    if (!canSubmit()) {
        throw new Error('Rate limit exceeded');
    }
    
    const enhancedData = {
        ...data,
        submitted_at: new Date().toISOString(),
        session_id: getSessionId(),
        ip_hash: getIpHash()
    };
    
    return await submitToSupabase(tableName, enhancedData);
}

async function submitToSupabase(tableName, data) {
    try {
        const response = await fetch(SUPABASE_URL + '/rest/v1/' + tableName, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': 'Bearer ' + SUPABASE_ANON_KEY,
                'Prefer': 'return=minimal'
            },
            body: JSON.stringify(data)
        });
        return response;
    } catch (error) {
        console.error('Error submitting to Supabase:', error);
        throw error;
    }
}

async function fetchFromSupabase(tableName, options = {}) {
    try {
        let url = SUPABASE_URL + '/rest/v1/' + tableName;
        
        if (options.query) {
            url += '?' + new URLSearchParams(options.query).toString();
        }
        
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': 'Bearer ' + SUPABASE_ANON_KEY,
                'Content-Type': 'application/json'
            }
        });
        
        if (response.ok) {
            return await response.json();
        } else {
            const errorText = await response.text();
            throw new Error(`HTTP ${response.status}: ${errorText}`);
        }
    } catch (error) {
        console.error(`Error fetching from ${tableName}:`, error);
        throw error;
    }
}

// Sync offline reports when online
async function syncOfflineReports() {
    if (!navigator.onLine) return;
    
    const pendingReports = JSON.parse(localStorage.getItem('pending_reports') || '[]');
    if (pendingReports.length === 0) return;
    
    for (const report of pendingReports) {
        try {
            await submitToSupabase('gbv_reports', report);
            const updatedReports = pendingReports.filter(r => r.timestamp !== report.timestamp);
            localStorage.setItem('pending_reports', JSON.stringify(updatedReports));
        } catch (error) {
            console.error('Failed to sync offline report:', error);
        }
    }
}

// Initialize offline sync
if (typeof window !== 'undefined') {
    window.addEventListener('online', syncOfflineReports);
    document.addEventListener('DOMContentLoaded', syncOfflineReports);
}
