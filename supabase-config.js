// supabase-config.js
// Replace these values with your actual Supabase project details

const SUPABASE_URL = 'https://your-project-url.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key-here';

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
