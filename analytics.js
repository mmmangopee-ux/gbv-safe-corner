// Privacy-focused analytics for GBV Safe Corner
const analytics = {
    trackPageView: function(page) {
        if (localStorage.getItem('analytics_optout')) return;
        
        const data = {
            page: page,
            timestamp: new Date().toISOString(),
            session_id: this.getSessionId(),
            language: localStorage.getItem('preferredLanguage') || 'en'
        };
        
        const views = JSON.parse(localStorage.getItem('page_views') || '[]');
        views.push(data);
        localStorage.setItem('page_views', JSON.stringify(views.slice(-100)));
    },
    
    trackFeatureUse: function(feature) {
        if (localStorage.getItem('analytics_optout')) return;
        
        const usage = JSON.parse(localStorage.getItem('feature_usage') || '{}');
        usage[feature] = (usage[feature] || 0) + 1;
        localStorage.setItem('feature_usage', JSON.stringify(usage));
    },
    
    trackError: function(error, context) {
        if (localStorage.getItem('analytics_optout')) return;
        
        const errors = JSON.parse(localStorage.getItem('error_logs') || '[]');
        errors.push({
            error: error.toString(),
            context: context,
            timestamp: new Date().toISOString(),
            user_agent: navigator.userAgent
        });
        localStorage.setItem('error_logs', JSON.stringify(errors.slice(-50)));
    },
    
    getSessionId: function() {
        let sessionId = sessionStorage.getItem('analytics_session_id');
        if (!sessionId) {
            sessionId = 'session_' + Math.random().toString(36).substr(2, 9);
            sessionStorage.setItem('analytics_session_id', sessionId);
        }
        return sessionId;
    },
    
    optOut: function() {
        localStorage.setItem('analytics_optout', 'true');
        this.clearData();
    },
    
    optIn: function() {
        localStorage.removeItem('analytics_optout');
    },
    
    clearData: function() {
        localStorage.removeItem('page_views');
        localStorage.removeItem('feature_usage');
        localStorage.removeItem('error_logs');
        sessionStorage.removeItem('analytics_session_id');
    }
};

// Auto-initialize
if (typeof window !== 'undefined') {
    window.analytics = analytics;
    
    window.addEventListener('error', function(e) {
        analytics.trackError(e.error, 'global_error');
    });
    
    window.addEventListener('unhandledrejection', function(e) {
        analytics.trackError(e.reason, 'unhandled_rejection');
    });
}
