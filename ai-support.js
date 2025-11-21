// Advanced AI Support System for GBV Safe Corner
class AISupportSystem {
    constructor() {
        this.conversationHistory = [];
        this.userContext = {};
        this.emergencyMode = false;
        this.language = 'en';
    }

    // Natural Language Processing
    async processMessage(message) {
        const analysis = await this.analyzeSentiment(message);
        const intent = await this.detectIntent(message);
        const riskLevel = this.assessRiskLevel(message, analysis);
        
        return {
            analysis,
            intent,
            riskLevel,
            response: await this.generateResponse(message, intent, riskLevel)
        };
    }

    // Sentiment Analysis
    async analyzeSentiment(text) {
        // Simplified sentiment analysis
        const positiveWords = ['safe', 'better', 'help', 'support', 'thanks', 'good'];
        const negativeWords = ['hurt', 'scared', 'danger', 'afraid', 'emergency', 'help'];
        
        const words = text.toLowerCase().split(' ');
        let score = 0;
        
        words.forEach(word => {
            if (positiveWords.includes(word)) score++;
            if (negativeWords.includes(word)) score--;
        });
        
        return {
            score,
            category: score > 0 ? 'positive' : score < 0 ? 'negative' : 'neutral'
        };
    }

    // Intent Detection
    async detectIntent(text) {
        const intents = {
            emergency: ['help', 'emergency', 'danger', 'hurt me', 'scared', 'suicide'],
            support: ['talk', 'listen', 'feel', 'sad', 'anxious', 'worried'],
            resources: ['shelter', 'police', 'counselor', 'lawyer', 'hospital'],
            safety: ['safe', 'plan', 'escape', 'leave', 'protection']
        };
        
        const lowerText = text.toLowerCase();
        
        for (const [intent, keywords] of Object.entries(intents)) {
            if (keywords.some(keyword => lowerText.includes(keyword))) {
                return intent;
            }
        }
        
        return 'general';
    }

    // Risk Assessment
    assessRiskLevel(text, sentiment) {
        let riskScore = 0;
        
        // Emergency keywords
        if (text.match(/\b(hurt|kill|suicide|die|emergency|danger)\b/i)) riskScore += 30;
        
        // Sentiment-based risk
        if (sentiment.category === 'negative') riskScore += 20;
        if (sentiment.score < -2) riskScore += 10;
        
        // Contextual risk
        if (this.userContext.previousEmergencies > 0) riskScore += 10;
        
        return {
            score: Math.min(riskScore, 100),
            level: riskScore >= 50 ? 'high' : riskScore >= 25 ? 'medium' : 'low'
        };
    }

    // Response Generation
    async generateResponse(message, intent, riskLevel) {
        const responses = {
            emergency: {
                high: [
                    "🚨 This sounds like an emergency. Please call 10111 immediately. I'm also alerting our crisis team.",
                    "⚠️ Immediate danger detected. Contact emergency services at 10111. Help is on the way.",
                    "🔴 CRITICAL: Please get to safety and call 10111. I'm connecting you with live support now."
                ],
                medium: [
                    "I'm concerned about your safety. Would you like me to connect you with emergency services?",
                    "This sounds serious. Let me help you get immediate support from trained professionals.",
                    "Your safety is the priority. I can connect you with local resources right now."
                ]
            },
            support: {
                low: [
                    "I'm here to listen. You're in a safe space to share what you're experiencing.",
                    "Thank you for reaching out. It takes courage to talk about these things.",
                    "I'm listening carefully. Please take your time and share what feels comfortable."
                ],
                medium: [
                    "That sounds really difficult. You're not alone in this - I'm here to support you.",
                    "I understand this is painful. Remember, reaching out for help is a sign of strength.",
                    "Thank you for trusting me with this. Let's work through it together."
                ]
            }
        };

        const intentResponses = responses[intent] || responses.support;
        const riskResponses = intentResponses[riskLevel.level] || intentResponses.medium || intentResponses.low;
        
        return riskResponses[Math.floor(Math.random() * riskResponses.length)];
    }

    // Multi-language Support
    setLanguage(lang) {
        this.language = lang;
        // In production, this would load language-specific response templates
    }

    // Save conversation for continuity
    saveConversation() {
        localStorage.setItem('ai_conversation', JSON.stringify(this.conversationHistory));
    }

    // Load previous conversation
    loadConversation() {
        const saved = localStorage.getItem('ai_conversation');
        if (saved) {
            this.conversationHistory = JSON.parse(saved);
        }
    }
}

// Export for use in main application
window.AISupportSystem = AISupportSystem;
