// Voice Recognition and Support for GBV Safe Corner
class VoiceSupport {
    constructor() {
        this.recognition = null;
        this.isListening = false;
        this.speechSynthesis = window.speechSynthesis;
        this.setupVoiceRecognition();
    }

    setupVoiceRecognition() {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            this.recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
            
            this.recognition.continuous = false;
            this.recognition.interimResults = false;
            this.recognition.lang = 'en-ZA'; // South African English
            
            this.recognition.onstart = () => {
                this.isListening = true;
                this.onListeningStart();
            };
            
            this.recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                this.isListening = false;
                this.onVoiceInput(transcript);
            };
            
            this.recognition.onerror = (event) => {
                this.isListening = false;
                this.onListeningError(event.error);
            };
            
            this.recognition.onend = () => {
                this.isListening = false;
                this.onListeningEnd();
            };
        } else {
            console.warn('Speech recognition not supported in this browser');
        }
    }

    startListening() {
        if (this.recognition && !this.isListening) {
            try {
                this.recognition.start();
            } catch (error) {
                console.error('Error starting voice recognition:', error);
            }
        }
    }

    stopListening() {
        if (this.recognition && this.isListening) {
            this.recognition.stop();
        }
    }

    onListeningStart() {
        // Update UI to show listening state
        const event = new CustomEvent('voiceListeningStart');
        window.dispatchEvent(event);
    }

    onVoiceInput(transcript) {
        // Process the voice input
        const event = new CustomEvent('voiceInput', { 
            detail: { transcript } 
        });
        window.dispatchEvent(event);
    }

    onListeningError(error) {
        console.error('Voice recognition error:', error);
        
        const event = new CustomEvent('voiceError', { 
            detail: { error } 
        });
        window.dispatchEvent(event);
    }

    onListeningEnd() {
        const event = new CustomEvent('voiceListeningEnd');
        window.dispatchEvent(event);
    }

    // Text-to-Speech functionality
    speak(text, options = {}) {
        if (this.speechSynthesis.speaking) {
            this.speechSynthesis.cancel();
        }

        const utterance = new SpeechSynthesisUtterance(text);
        
        // Set options
        utterance.rate = options.rate || 0.8;
        utterance.pitch = options.pitch || 1;
        utterance.volume = options.volume || 0.8;
        utterance.lang = options.lang || 'en-ZA';

        utterance.onstart = () => {
            const event = new CustomEvent('voiceSpeakingStart');
            window.dispatchEvent(event);
        };

        utterance.onend = () => {
            const event = new CustomEvent('voiceSpeakingEnd');
            window.dispatchEvent(event);
        };

        this.speechSynthesis.speak(utterance);
    }

    stopSpeaking() {
        if (this.speechSynthesis.speaking) {
            this.speechSynthesis.cancel();
        }
    }

    // Emergency voice commands
    setupEmergencyCommands() {
        const emergencyCommands = [
            'help',
            'emergency',
            'I need help',
            'call police',
            'danger',
            'I am not safe'
        ];

        window.addEventListener('voiceInput', (event) => {
            const transcript = event.detail.transcript.toLowerCase();
            
            if (emergencyCommands.some(command => transcript.includes(command))) {
                this.triggerEmergencyProtocol();
            }
        });
    }

    triggerEmergencyProtocol() {
        // Speak emergency instructions
        this.speak("Emergency detected. I'm connecting you with help immediately.");
        
        // Trigger emergency actions
        const event = new CustomEvent('emergencyVoiceTrigger');
        window.dispatchEvent(event);
    }

    // Multi-language support
    setLanguage(language) {
        if (this.recognition) {
            const languageMap = {
                'en': 'en-ZA',
                'zu': 'zu-ZA', 
                'xh': 'xh-ZA',
                'af': 'af-ZA'
            };
            
            this.recognition.lang = languageMap[language] || 'en-ZA';
        }
    }
}

// Export for use in main application
window.VoiceSupport = VoiceSupport;
