// ChatWidget Component for We Are Bryssel
// AI-powered chatbot with Gothenburg humor
class ChatWidget {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.conversationHistory = [];
        this.isTyping = false;
        this.showContactForm = false;
        this.apiEndpoint = '/api/chat';
        this.init();
    }

    t(key) {
        return window.t ? window.t(key) : key;
    }

    init() {
        this.createWidget();
        this.attachEventListeners();
        this.addWelcomeMessage();
    }

    createWidget() {
        // Create main container
        this.container = document.createElement('div');
        this.container.className = 'chat-widget-container';
        this.container.innerHTML = `
            <!-- Chat Button -->
            <button class="chat-widget-button" id="chat-widget-button">
                <svg class="chat-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"></path>
                </svg>
                <span data-i18n-chat="chat.button">${this.t('chat.button')}</span>
            </button>

            <!-- Chat Window -->
            <div class="chat-window" id="chat-window">
                <div class="chat-header">
                    <div class="chat-header-content">
                        <h3 data-i18n-chat="chat.title">${this.t('chat.title')}</h3>
                        <p data-i18n-chat="chat.subtitle">${this.t('chat.subtitle')}</p>
                    </div>
                    <button class="chat-close" id="chat-close">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>

                <div class="chat-messages" id="chat-messages"></div>

                <div class="common-questions" id="common-questions">
                    <p class="common-questions-title" data-i18n-chat="chat.common.title">${this.t('chat.common.title')}</p>
                    <div class="question-buttons" id="question-buttons"></div>
                </div>

                <div class="chat-input-container">
                    <input type="text" class="chat-input" id="chat-input" placeholder="${this.t('chat.input.placeholder')}" />
                    <button class="chat-send" id="chat-send">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="22" y1="2" x2="11" y2="13"></line>
                            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                        </svg>
                    </button>
                </div>
            </div>

            <!-- Contact Form Modal -->
            <div class="contact-form-modal" id="contact-form-modal">
                <div class="contact-form">
                    <div class="contact-form-header">
                        <h3 data-i18n-chat="chat.form.title">${this.t('chat.form.title')}</h3>
                        <button class="contact-form-close" id="contact-form-close">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                    <form id="contact-form">
                        <div class="form-group">
                            <label data-i18n-chat="chat.form.method">${this.t('chat.form.method')}</label>
                            <select id="contact-method" required>
                                <option value="">${this.t('chat.form.method.placeholder')}</option>
                                <option value="email">${this.t('chat.form.method.email')}</option>
                                <option value="phone">${this.t('chat.form.method.phone')}</option>
                                <option value="meeting">${this.t('chat.form.method.meeting')}</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label data-i18n-chat="chat.form.interest">${this.t('chat.form.interest')}</label>
                            <select id="interest" required>
                                <option value="">${this.t('chat.form.interest.placeholder')}</option>
                                <option value="event">${this.t('chat.form.interest.event')}</option>
                                <option value="conference">${this.t('chat.form.interest.conference')}</option>
                                <option value="launch">${this.t('chat.form.interest.launch')}</option>
                                <option value="roadshow">${this.t('chat.form.interest.roadshow')}</option>
                                <option value="other">${this.t('chat.form.interest.other')}</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label data-i18n-chat="chat.form.name">${this.t('chat.form.name')}</label>
                            <input type="text" id="contact-name" required />
                        </div>
                        
                        <div class="form-group" id="email-group">
                            <label data-i18n-chat="chat.form.email">${this.t('chat.form.email')}</label>
                            <input type="email" id="contact-email" />
                        </div>
                        
                        <div class="form-group" id="phone-group" style="display: none;">
                            <label data-i18n-chat="chat.form.phone">${this.t('chat.form.phone')}</label>
                            <input type="tel" id="contact-phone" />
                        </div>
                        
                        <div class="form-group">
                            <label data-i18n-chat="chat.form.description">${this.t('chat.form.description')}</label>
                            <textarea id="contact-description" rows="4"></textarea>
                        </div>
                        
                        <div class="form-group" id="date-group" style="display: none;">
                            <label data-i18n-chat="chat.form.date">${this.t('chat.form.date')}</label>
                            <input type="date" id="contact-date" />
                        </div>
                        
                        <div class="form-group" id="time-group" style="display: none;">
                            <label data-i18n-chat="chat.form.time">${this.t('chat.form.time')}</label>
                            <select id="contact-time">
                                <option value="">${this.t('chat.form.time.placeholder')}</option>
                            </select>
                        </div>
                        
                        <button type="submit" class="submit-button" data-i18n-chat="chat.form.submit">${this.t('chat.form.submit')}</button>
                    </form>
                </div>
            </div>
        `;
        
        document.body.appendChild(this.container);
    }

    attachEventListeners() {
        const button = document.getElementById('chat-widget-button');
        const closeBtn = document.getElementById('chat-close');
        const sendBtn = document.getElementById('chat-send');
        const input = document.getElementById('chat-input');
        const contactFormClose = document.getElementById('contact-form-close');
        const contactMethod = document.getElementById('contact-method');
        const contactForm = document.getElementById('contact-form');

        button.addEventListener('click', () => this.toggleChat());
        closeBtn.addEventListener('click', () => this.toggleChat());
        sendBtn.addEventListener('click', () => this.sendMessage());
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
        
        contactFormClose.addEventListener('click', () => this.toggleContactForm());
        contactMethod.addEventListener('change', (e) => this.handleContactMethodChange(e));
        contactForm.addEventListener('submit', (e) => this.handleContactFormSubmit(e));

        // Click outside to close
        document.addEventListener('click', (e) => {
            const chatWindow = document.getElementById('chat-window');
            const chatButton = document.getElementById('chat-widget-button');
            if (this.isOpen && !chatWindow.contains(e.target) && !chatButton.contains(e.target)) {
                this.toggleChat();
            }
        });

        this.updateCommonQuestions();

        document.addEventListener('languageChanged', () => this.applyTranslations());
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
        const window = document.getElementById('chat-window');
        const button = document.getElementById('chat-widget-button');
        
        if (this.isOpen) {
            window.classList.add('active');
            button.style.display = 'none';
            document.getElementById('chat-input').focus();
        } else {
            window.classList.remove('active');
            button.style.display = 'flex';
        }
    }

    addWelcomeMessage() {
        const welcomeMsg = {
            type: 'bot',
            content: this.t('chat.welcome'),
            time: new Date()
        };
        this.messages.push(welcomeMsg);
        this.renderMessages();
    }

    async sendMessage() {
        const input = document.getElementById('chat-input');
        const message = input.value.trim();
        
        if (!message) return;
        
        // Add user message
        this.messages.push({
            type: 'user',
            content: message,
            time: new Date()
        });
        
        input.value = '';
        this.renderMessages();
        
        // Show typing indicator
        this.showTypingIndicator();
        
        try {
            // Call AI API
            const response = await this.getAIResponse(message);
            
            this.messages.push({
                type: 'bot',
                content: response,
                time: new Date()
            });
        } catch (error) {
            console.error('Chat error:', error);
            this.messages.push({
                type: 'bot',
                content: this.t('chat.error'),
                time: new Date()
            });
        }
        
        this.hideTypingIndicator();
        this.renderMessages();
    }

    async getAIResponse(userMessage) {
        try {
            const response = await fetch(this.apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: userMessage,
                    conversationHistory: this.conversationHistory
                })
            });

            const data = await response.json();

            if (data.error && data.fallback) {
                return data.response;
            }

            if (data.conversationHistory) {
                this.conversationHistory = data.conversationHistory;
            }

            return data.response;
        } catch (error) {
            // Fallback to local responses if API fails
            return this.getLocalResponse(userMessage);
        }
    }

    getLocalResponse(userInput) {
        const input = userInput.toLowerCase();

        const isSv = (typeof currentLanguage !== 'undefined') ? (currentLanguage === 'sv' || currentLanguage === 'gbg') : true;
        const isGbg = (typeof currentLanguage !== 'undefined') ? currentLanguage === 'gbg' : false;

        const responsesSv = {
            hello: 'Tjena gansen! 👋<br><br>Najs att du hör av dig! Jag kan hjälpa dig med allt som har med <strong>event</strong> att göra. Vad funderar du på?',
            event: 'Åh, event va? Då snackar vi! 🎉<br><br>Det är ju det göttiga som finns! Vi på <strong>Bryssel</strong> fixar allt från läckra konferenser till feta lanseringar.<br><br>Berätta mer om vad du har i kikaren!',
            price: 'Priset beror helt på hur stort och fräckt event du vill ha!<br><br>Vi <strong>skräddarsyr alltid</strong>, ingen copy-paste här inte. Hojta till på <strong>info@wearebryssel.se</strong> så tar vi en käk... eller ja, en offert! 😄',
            gbg: '<strong>Göteborg!</strong> Bästa staden ansen! 💙🤍<br><br>Vi sitter på <strong>Kungstorget</strong> mitt i smeten. Perfekt läge för att fixa event i hela Västsverige... och resten av världen förstås!',
            contact: 'Klart du ska höra av dig!<br><br>• Maila <strong>info@wearebryssel.se</strong><br>• Kom förbi kontoret på <strong>Kungstorget 11</strong><br><br>Vi bjuder på kaffe! ☕',
            other: 'Intressant fråga! 🤔<br><br>Men jag är mest insnöad på <strong>event</strong> och <strong>Bryssel-relaterade</strong> grejer. Har du nån fråga om det så är jag på!<br><br>Annars kan du alltid maila oss på <strong>info@wearebryssel.se</strong>.'
        };

        const responsesGbg = {
            hello: 'Tjenixen gôtt folk! 👋<br><br>Här är din goa eventgôbbe. Vad har du på hjärtat?',
            event: 'Event säger du? Gött mos! 🎉<br><br>Vi fixar allt från stiliga konferenser till rejält feta lanseringar.<br><br>Berätta vad du vill hitta på så löser vi det bängens!',
            price: 'Priset beror på hur maffigt du vill ha det!<br><br>Vi <strong>skräddarsyr alltid</strong>. Släng iväg ett mail till <strong>info@wearebryssel.se</strong> så snackar vi ihop oss.',
            gbg: '<strong>Göteborg!</strong> Världens bästa stad! 💙🤍<br><br>Vi hänger på <strong>Kungstorget</strong>. Perfekt utgångspunkt för goa event i hela Västsverige – och resten av världen, såklart.',
            contact: 'Lätt som en plätt!<br><br>• Maila <strong>info@wearebryssel.se</strong><br>• Eller sväng förbi <strong>Kungstorget 11</strong><br><br>Vi bjuder på en go kopp!',
            other: 'Kul fråga! 🤔<br><br>Jag är mest inne på <strong>event</strong> och <strong>Bryssel</strong>-grejer. Har du nåt om det så kör!<br><br>Annars finns vi alltid på <strong>info@wearebryssel.se</strong>.'
        };

        const responsesEn = {
            hello: 'Hey there! 👋<br><br>Great to hear from you! I can help with anything <strong>event</strong>-related. What are you thinking about?',
            event: 'Oh, events? Now we’re talking! 🎉<br><br>That’s the fun stuff. At <strong>Bryssel</strong> we handle everything from sleek conferences to bold launches.<br><br>Tell me more about what you have in mind!',
            price: 'Pricing depends on how big and bold you want to go!<br><br>We <strong>always tailor</strong> – no copy-paste. Ping <strong>info@wearebryssel.se</strong> and we’ll whip up an estimate!',
            gbg: '<strong>Gothenburg!</strong> Best city around! 💙🤍<br><br>We’re based at <strong>Kungstorget</strong> in the heart of town. Perfect spot to deliver events across West Sweden… and beyond!',
            contact: 'Absolutely, let’s talk!<br><br>• Email <strong>info@wearebryssel.se</strong><br>• Drop by the office at <strong>Kungstorget 11</strong><br><br>Coffee’s on us! ☕',
            other: 'Interesting question! 🤔<br><br>I’m mainly focused on <strong>events</strong> and <strong>Bryssel-related</strong> topics. Got a question on that? I’m all ears!<br><br>Otherwise you can always email <strong>info@wearebryssel.se</strong>.'
        };

        const r = isSv ? (isGbg ? responsesGbg : responsesSv) : responsesEn;

        if (input.includes('hej') || input.includes('hallå') || input.includes('tjena') || input.includes('hello') || input.includes('hi')) {
            return r.hello;
        }
        
        if (input.includes('event') || input.includes('fest') || input.includes('konferens') || input.includes('conference') || input.includes('party')) {
            return r.event;
        }
        
        if (input.includes('pris') || input.includes('kosta') || input.includes('price') || input.includes('cost')) {
            return r.price;
        }
        
        if (input.includes('göteborg') || input.includes('gbg') || input.includes('gothenburg')) {
            return r.gbg;
        }
        
        if (input.includes('kontakt') || input.includes('boka') || input.includes('contact') || input.includes('book')) {
            return r.contact;
        }
        
        return r.other;
    }

    showTypingIndicator() {
        this.isTyping = true;
        this.renderMessages();
    }

    hideTypingIndicator() {
        this.isTyping = false;
        this.renderMessages();
    }

    renderMessages() {
        const container = document.getElementById('chat-messages');
        container.innerHTML = '';
        
        this.messages.forEach((msg, index) => {
            const messageEl = document.createElement('div');
            messageEl.className = `chat-message ${msg.type}`;
            
            const contentEl = document.createElement('div');
            contentEl.className = 'message-content';
            
            // Use innerHTML for bot messages to render HTML formatting, textContent for user messages (security)
            if (msg.type === 'bot') {
                contentEl.innerHTML = msg.content;
            } else {
                contentEl.textContent = msg.content;
            }
            
            const timeEl = document.createElement('div');
            timeEl.className = 'message-time';
            timeEl.textContent = this.formatTime(msg.time);
            
            messageEl.appendChild(contentEl);
            messageEl.appendChild(timeEl);
            container.appendChild(messageEl);
        });
        
        if (this.isTyping) {
            const typingEl = document.createElement('div');
            typingEl.className = 'chat-message bot typing';
            typingEl.innerHTML = '<div class="typing-indicator"><span></span><span></span><span></span></div>';
            container.appendChild(typingEl);
        }
        
        // Scroll to bottom
        container.scrollTop = container.scrollHeight;
    }

    formatTime(date) {
        const locale = (typeof currentLanguage !== 'undefined' && currentLanguage === 'en') ? 'en-GB' : 'sv-SE';
        return date.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });
    }

    updateCommonQuestions() {
        const questions = [
            this.t('chat.common.q1'),
            this.t('chat.common.q2'),
            this.t('chat.common.q3')
        ];
        
        const container = document.getElementById('question-buttons');
        container.innerHTML = '';
        
        questions.forEach(question => {
            const button = document.createElement('button');
            button.className = 'question-button';
            button.textContent = question;
            button.addEventListener('click', () => {
                document.getElementById('chat-input').value = question;
                this.sendMessage();
            });
            container.appendChild(button);
        });
        
        // Add contact button
        const contactButton = document.createElement('button');
        contactButton.className = 'question-button contact-button';
        contactButton.textContent = this.t('chat.common.contact');
        contactButton.addEventListener('click', () => this.toggleContactForm());
        container.appendChild(contactButton);
    }

    toggleContactForm() {
        this.showContactForm = !this.showContactForm;
        const modal = document.getElementById('contact-form-modal');
        
        if (this.showContactForm) {
            modal.classList.add('active');
            this.populateTimeSlots();
            this.setMinDate();
        } else {
            modal.classList.remove('active');
        }
    }

    handleContactMethodChange(e) {
        const method = e.target.value;
        const emailGroup = document.getElementById('email-group');
        const phoneGroup = document.getElementById('phone-group');
        const dateGroup = document.getElementById('date-group');
        const timeGroup = document.getElementById('time-group');
        
        // Reset visibility
        emailGroup.style.display = 'none';
        phoneGroup.style.display = 'none';
        dateGroup.style.display = 'none';
        timeGroup.style.display = 'none';
        
        // Show relevant fields
        if (method === 'email') {
            emailGroup.style.display = 'block';
        } else if (method === 'phone') {
            phoneGroup.style.display = 'block';
            dateGroup.style.display = 'block';
            timeGroup.style.display = 'block';
        } else if (method === 'meeting') {
            emailGroup.style.display = 'block';
            phoneGroup.style.display = 'block';
            dateGroup.style.display = 'block';
            timeGroup.style.display = 'block';
        }
    }

    populateTimeSlots() {
        const timeSelect = document.getElementById('contact-time');
        timeSelect.innerHTML = '<option value="">Välj tid</option>';
        
        for (let hour = 9; hour < 17; hour++) {
            for (let min = 0; min < 60; min += 30) {
                const time = `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
                const option = document.createElement('option');
                option.value = time;
                option.textContent = time;
                timeSelect.appendChild(option);
            }
        }
    }

    setMinDate() {
        const dateInput = document.getElementById('contact-date');
        const today = new Date();
        today.setDate(today.getDate() + 1); // Tomorrow
        dateInput.min = today.toISOString().split('T')[0];
        
        // Max date 30 days from now
        const maxDate = new Date();
        maxDate.setDate(maxDate.getDate() + 30);
        dateInput.max = maxDate.toISOString().split('T')[0];
    }

    handleContactFormSubmit(e) {
        e.preventDefault();
        
        // Collect form data
        const formData = {
            method: document.getElementById('contact-method').value,
            interest: document.getElementById('interest').value,
            name: document.getElementById('contact-name').value,
            email: document.getElementById('contact-email').value,
            phone: document.getElementById('contact-phone').value,
            description: document.getElementById('contact-description').value,
            date: document.getElementById('contact-date').value,
            time: document.getElementById('contact-time').value
        };
        
        // Here you would normally send this to your backend
        console.log('Contact form submitted:', formData);
        
        // Show success message
        this.showSuccessMessage();
        
        // Reset form and close
        e.target.reset();
        setTimeout(() => {
            this.toggleContactForm();
        }, 3000);
    }

    showSuccessMessage() {
        const form = document.getElementById('contact-form');
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#a6894f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <h3>${this.t('chat.form.success.title')}</h3>
            <p>${this.t('chat.form.success.text')}</p>
        `;
        
        form.style.display = 'none';
        form.parentElement.appendChild(successMessage);
        
        setTimeout(() => {
            form.style.display = 'block';
            successMessage.remove();
        }, 3000);
    }

    applyTranslations() {
        // Update static texts
        const map = {
            'chat.button': this.container.querySelector('[data-i18n-chat="chat.button"]'),
            'chat.title': this.container.querySelector('[data-i18n-chat="chat.title"]'),
            'chat.subtitle': this.container.querySelector('[data-i18n-chat="chat.subtitle"]'),
            'chat.common.title': this.container.querySelector('[data-i18n-chat="chat.common.title"]'),
            'chat.form.title': this.container.querySelector('[data-i18n-chat="chat.form.title"]'),
            'chat.form.method': this.container.querySelector('[data-i18n-chat="chat.form.method"]'),
            'chat.form.interest': this.container.querySelector('[data-i18n-chat="chat.form.interest"]'),
            'chat.form.name': this.container.querySelector('[data-i18n-chat="chat.form.name"]'),
            'chat.form.email': this.container.querySelector('[data-i18n-chat="chat.form.email"]'),
            'chat.form.phone': this.container.querySelector('[data-i18n-chat="chat.form.phone"]'),
            'chat.form.description': this.container.querySelector('[data-i18n-chat="chat.form.description"]'),
            'chat.form.date': this.container.querySelector('[data-i18n-chat="chat.form.date"]'),
            'chat.form.time': this.container.querySelector('[data-i18n-chat="chat.form.time"]'),
            'chat.form.submit': this.container.querySelector('[data-i18n-chat="chat.form.submit"]')
        };

        Object.keys(map).forEach(key => {
            if (map[key]) map[key].textContent = this.t(key);
        });

        // Placeholders
        const chatInput = document.getElementById('chat-input');
        if (chatInput) chatInput.placeholder = this.t('chat.input.placeholder');

        const contactMethod = document.getElementById('contact-method');
        if (contactMethod) {
            contactMethod.options[0].textContent = this.t('chat.form.method.placeholder');
            contactMethod.options[1].textContent = this.t('chat.form.method.email');
            contactMethod.options[2].textContent = this.t('chat.form.method.phone');
            contactMethod.options[3].textContent = this.t('chat.form.method.meeting');
        }

        const interest = document.getElementById('interest');
        if (interest) {
            interest.options[0].textContent = this.t('chat.form.interest.placeholder');
            interest.options[1].textContent = this.t('chat.form.interest.event');
            interest.options[2].textContent = this.t('chat.form.interest.conference');
            interest.options[3].textContent = this.t('chat.form.interest.launch');
            interest.options[4].textContent = this.t('chat.form.interest.roadshow');
            interest.options[5].textContent = this.t('chat.form.interest.other');
        }

        const timeSelect = document.getElementById('contact-time');
        if (timeSelect && timeSelect.options.length > 0) {
            timeSelect.options[0].textContent = this.t('chat.form.time.placeholder');
        }

        // Rebuild common questions
        this.updateCommonQuestions();
    }
}

// Initialize chat widget when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new ChatWidget();
    });
} else {
    new ChatWidget();
}
