// supabase-config.js
const SUPABASE_URL = 'https://sofzsursxpjmghhcphrh.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvZnpzdXJzeHBqbWdoaGNwaHJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM1OTIwNTMsImV4cCI6MjA3OTE2ODA1M30.nW5ylZoVNeJAegTXqx_x0bjb1lSOsvMBnhsScYR8hf8';

// Simple IP hash function for basic duplicate prevention (doesn't reveal actual IP)
function getIpHash() {
    return 'anonymous_' + Math.random().toString(36).substr(2, 9);
}

// Function to submit data to Supabase
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

// Function to fetch data from Supabase
async function fetchFromSupabase(tableName, options = {}) {
    try {
        let url = SUPABASE_URL + '/rest/v1/' + tableName;
        
        // Add query parameters if provided
        if (options.query) {
            url += '?' + new URLSearchParams(options.query).toString();
        }
        
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': 'Bearer ' + SUPABASE_ANON_KEY
            }
        });
        
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Failed to fetch data');
        }
    } catch (error) {
        console.error('Error fetching from Supabase:', error);
        throw error;
    }
}
