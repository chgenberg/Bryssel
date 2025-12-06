// Event-Idé Generatorn - Lead Magnet för We Are Bryssel

class EventGenerator {
    constructor() {
        this.currentStep = 0;
        this.answers = {};
        this.userEmail = '';
        this.generatedIdea = null;
        this.isGenerating = false;

        this.steps = this.buildSteps();
        this.init();
    }

    t(key) {
        return window.t ? window.t(key) : key;
    }

    buildSteps() {
        return [
            {
                id: 'email',
                title: this.t('gen.email.title'),
                subtitle: this.t('gen.email.subtitle'),
                fields: [
                    { name: 'email', type: 'email', label: this.t('gen.email.label'), placeholder: this.t('gen.email.placeholder'), required: true },
                    { name: 'consent', type: 'checkbox', label: this.t('gen.email.consent'), required: true }
                ]
            },
            {
                id: 'industry',
                title: this.t('gen.industry.title'),
                subtitle: this.t('gen.industry.subtitle'),
                type: 'select',
                options: this.t('gen.industry.options')
            },
            {
                id: 'purpose',
                title: this.t('gen.purpose.title'),
                subtitle: this.t('gen.purpose.subtitle'),
                type: 'select',
                options: this.t('gen.purpose.options')
            },
            {
                id: 'guests',
                title: this.t('gen.guests.title'),
                subtitle: this.t('gen.guests.subtitle'),
                type: 'select',
                options: this.t('gen.guests.options')
            },
            {
                id: 'budget',
                title: this.t('gen.budget.title'),
                subtitle: this.t('gen.budget.subtitle'),
                type: 'select',
                options: this.t('gen.budget.options')
            },
            {
                id: 'feeling',
                title: this.t('gen.feeling.title'),
                subtitle: this.t('gen.feeling.subtitle'),
                type: 'multiselect',
                options: this.t('gen.feeling.options'),
                maxSelect: 3
            },
            {
                id: 'generating',
                title: this.t('gen.loading.title'),
                subtitle: this.t('gen.loading.subtitle'),
                type: 'loading'
            },
            {
                id: 'result',
                title: this.t('gen.result.title'),
                subtitle: '',
                type: 'result'
            }
        ];
    }

    init() {
        this.createModal();
        this.attachEventListeners();
    }

    createModal() {
        this.overlay = document.createElement('div');
        this.overlay.className = 'event-generator-overlay';
        this.overlay.innerHTML = `
            <div class="event-generator-modal">
                <button class="event-generator-close" aria-label="${this.t('gen.close')}">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
                
                <div class="event-generator-progress">
                    <div class="progress-bar">
                        <div class="progress-fill"></div>
                    </div>
                    <span class="progress-text"></span>
                </div>
                
                <div class="event-generator-content">
                    <!-- Content rendered dynamically -->
                </div>
                
                <div class="event-generator-navigation">
                    <button class="nav-btn nav-prev" style="visibility: hidden;">${this.t('gen.prev')}</button>
                    <button class="nav-btn nav-next">${this.t('gen.next')}</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(this.overlay);
        
        this.modal = this.overlay.querySelector('.event-generator-modal');
        this.content = this.overlay.querySelector('.event-generator-content');
        this.progressFill = this.overlay.querySelector('.progress-fill');
        this.progressText = this.overlay.querySelector('.progress-text');
        this.prevBtn = this.overlay.querySelector('.nav-prev');
        this.nextBtn = this.overlay.querySelector('.nav-next');
        this.closeBtn = this.overlay.querySelector('.event-generator-close');
    }

    attachEventListeners() {
        this.closeBtn.addEventListener('click', () => this.close());
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) this.close();
        });
        
        this.prevBtn.addEventListener('click', () => this.prevStep());
        this.nextBtn.addEventListener('click', () => this.nextStep());
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.overlay.classList.contains('active')) {
                this.close();
            }
        });

        document.addEventListener('languageChanged', () => {
            this.steps = this.buildSteps();
            this.applyTranslations();
            if (this.overlay.classList.contains('active')) {
                this.renderStep();
            }
        });
        
        // Add trigger buttons
        document.querySelectorAll('[data-event-generator]').forEach(btn => {
            btn.addEventListener('click', () => this.open());
        });
    }

    open() {
        this.currentStep = 0;
        this.answers = {};
        this.generatedIdea = null;
        this.overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        this.renderStep();
    }

    close() {
        this.overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    renderStep() {
        const step = this.steps[this.currentStep];
        const totalSteps = this.steps.length - 2; // Exclude loading and result
        
        // Update progress
        if (step.type !== 'loading' && step.type !== 'result') {
            const progress = ((this.currentStep + 1) / totalSteps) * 100;
            this.progressFill.style.width = `${progress}%`;
            this.progressText.textContent = this.t('gen.progress')
                .replace('{current}', `${this.currentStep + 1}`)
                .replace('{total}', `${totalSteps}`);
            this.overlay.querySelector('.event-generator-progress').style.display = 'block';
        } else {
            this.overlay.querySelector('.event-generator-progress').style.display = 'none';
        }
        
        // Update navigation
        this.prevBtn.style.visibility = this.currentStep > 0 && step.type !== 'loading' && step.type !== 'result' ? 'visible' : 'hidden';
        
        if (step.type === 'loading' || step.type === 'result') {
            this.overlay.querySelector('.event-generator-navigation').style.display = 'none';
        } else {
            this.overlay.querySelector('.event-generator-navigation').style.display = 'flex';
            this.nextBtn.textContent = this.currentStep === totalSteps - 1 ? this.t('gen.create') : this.t('gen.next');
        }
        
        // Render content based on step type
        let html = `
            <h2 class="step-title">${step.title}</h2>
            ${step.subtitle ? `<p class="step-subtitle">${step.subtitle}</p>` : ''}
        `;
        
        if (step.id === 'email') {
            html += this.renderEmailStep(step);
        } else if (step.type === 'select') {
            html += this.renderSelectStep(step);
        } else if (step.type === 'multiselect') {
            html += this.renderMultiselectStep(step);
        } else if (step.type === 'loading') {
            html += this.renderLoadingStep();
        } else if (step.type === 'result') {
            html += this.renderResultStep();
        }
        
        this.content.innerHTML = html;
        
        // Attach step-specific event listeners
        this.attachStepListeners(step);
        
        // Auto-generate if loading step
        if (step.type === 'loading' && !this.isGenerating) {
            this.generateIdea();
        }
    }

    renderEmailStep(step) {
        return `
            <div class="form-fields">
                <div class="form-group">
                    <label for="generator-email">${this.t('gen.email.label')}</label>
                    <input type="email" id="generator-email" name="email" placeholder="${this.t('gen.email.placeholder')}" required value="${this.userEmail}">
                </div>
                <div class="form-group checkbox-group">
                    <label class="checkbox-label">
                        <input type="checkbox" id="generator-consent" name="consent" ${this.answers.consent ? 'checked' : ''}>
                        <span class="checkbox-text">${this.t('gen.email.consent')}</span>
                    </label>
                </div>
            </div>
        `;
    }

    renderSelectStep(step) {
        const selected = this.answers[step.id] || '';
        return `
            <div class="options-list">
                ${step.options.map(option => `
                    <button class="option-btn ${selected === option ? 'selected' : ''}" data-value="${option}">
                        ${option}
                    </button>
                `).join('')}
            </div>
        `;
    }

    renderMultiselectStep(step) {
        const selected = this.answers[step.id] || [];
        return `
            <p class="multiselect-hint">${this.t('gen.multiselect.hint').replace('{max}', step.maxSelect)}</p>
            <div class="options-list multiselect">
                ${step.options.map(option => `
                    <button class="option-btn ${selected.includes(option) ? 'selected' : ''}" data-value="${option}">
                        ${option}
                    </button>
                `).join('')}
            </div>
        `;
    }

    renderLoadingStep() {
        return `
            <div class="loading-container">
                <div class="loading-spinner"></div>
                <p class="loading-text">${this.t('gen.loading.text')}</p>
            </div>
        `;
    }

    renderResultStep() {
        if (!this.generatedIdea) {
            return `<p>${this.t('gen.error.generic')}</p>`;
        }
        
        return `
            <div class="result-container">
                <div class="result-content">
                    <div class="result-section">
                        <h3>${this.t('gen.result.concept')}</h3>
                        <p class="concept-name">${this.generatedIdea.conceptName}</p>
                    </div>
                    
                    <div class="result-section">
                        <h3>${this.t('gen.result.description')}</h3>
                        <p>${this.generatedIdea.description}</p>
                    </div>
                    
                    <div class="result-section">
                        <h3>${this.t('gen.result.keymoments')}</h3>
                        <ul class="moments-list">
                            ${this.generatedIdea.keyMoments.map(m => `<li>${m}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="result-section">
                        <h3>${this.t('gen.result.wow')}</h3>
                        <p>${this.generatedIdea.wowFactor}</p>
                    </div>
                    
                    <div class="result-section result-recommendation">
                        <h3>${this.t('gen.result.recommendation')}</h3>
                        <p>${this.generatedIdea.recommendation || this.t('gen.fallback.recommendation')}</p>
                    </div>
                </div>
                
                <div class="result-actions">
                    <button class="action-btn primary" id="contactUs">${this.t('gen.result.actions.contact')}</button>
                    <button class="action-btn secondary" id="downloadPdf">${this.t('gen.result.actions.download')}</button>
                </div>
                
                <p class="result-note">${this.t('gen.result.note').replace('{email}', this.userEmail)}</p>
            </div>
        `;
    }

    attachStepListeners(step) {
        if (step.id === 'email') {
            const emailInput = this.content.querySelector('#generator-email');
            const consentInput = this.content.querySelector('#generator-consent');
            
            if (emailInput) {
                emailInput.addEventListener('input', (e) => {
                    this.userEmail = e.target.value;
                });
            }
            if (consentInput) {
                consentInput.addEventListener('change', (e) => {
                    this.answers.consent = e.target.checked;
                });
            }
        } else if (step.type === 'select') {
            this.content.querySelectorAll('.option-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    this.content.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
                    btn.classList.add('selected');
                    this.answers[step.id] = btn.dataset.value;
                });
            });
        } else if (step.type === 'multiselect') {
            this.content.querySelectorAll('.option-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    if (!this.answers[step.id]) this.answers[step.id] = [];
                    
                    const value = btn.dataset.value;
                    const index = this.answers[step.id].indexOf(value);
                    
                    if (index > -1) {
                        this.answers[step.id].splice(index, 1);
                        btn.classList.remove('selected');
                    } else if (this.answers[step.id].length < step.maxSelect) {
                        this.answers[step.id].push(value);
                        btn.classList.add('selected');
                    }
                });
            });
        } else if (step.type === 'result') {
            const downloadBtn = this.content.querySelector('#downloadPdf');
            const contactBtn = this.content.querySelector('#contactUs');
            
            if (downloadBtn) {
                downloadBtn.addEventListener('click', () => this.generatePDF());
            }
            if (contactBtn) {
                contactBtn.addEventListener('click', () => {
                    this.close();
                    window.location.href = '#kontakt';
                });
            }
        }
    }

    validateStep() {
        const step = this.steps[this.currentStep];
        
        if (step.id === 'email') {
            const email = this.userEmail.trim();
            const consent = this.answers.consent;
            
            if (!email || !this.isValidEmail(email)) {
                this.showError(this.t('gen.validation.email'));
                return false;
            }
            if (!consent) {
                this.showError(this.t('gen.validation.consent'));
                return false;
            }
            return true;
        }
        
        if (step.type === 'select') {
            if (!this.answers[step.id]) {
                this.showError(this.t('gen.validation.select'));
                return false;
            }
            return true;
        }
        
        if (step.type === 'multiselect') {
            if (!this.answers[step.id] || this.answers[step.id].length === 0) {
                this.showError(this.t('gen.validation.multiselect'));
                return false;
            }
            return true;
        }
        
        return true;
    }

    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    showError(message) {
        // Remove existing error
        const existing = this.content.querySelector('.error-message');
        if (existing) existing.remove();
        
        const error = document.createElement('div');
        error.className = 'error-message';
        error.textContent = message;
        this.content.insertBefore(error, this.content.firstChild.nextSibling);
        
        setTimeout(() => error.remove(), 3000);
    }

    nextStep() {
        if (!this.validateStep()) return;
        
        if (this.currentStep < this.steps.length - 1) {
            this.currentStep++;
            this.renderStep();
        }
    }

    prevStep() {
        if (this.currentStep > 0) {
            this.currentStep--;
            this.renderStep();
        }
    }

    async generateIdea() {
        this.isGenerating = true;
        
        try {
            const response = await fetch('/api/generate-event-idea', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: this.userEmail,
                    industry: this.answers.industry,
                    purpose: this.answers.purpose,
                    guests: this.answers.guests,
                    budget: this.answers.budget,
                    feeling: this.answers.feeling
                })
            });
            
            const data = await response.json();
            
            if (data.error) {
                throw new Error(data.error);
            }
            
            this.generatedIdea = data.idea;
            this.currentStep++;
            this.renderStep();
            
        } catch (error) {
            console.error('Error generating idea:', error);
            // Use fallback idea
            this.generatedIdea = this.generateFallbackIdea();
            this.currentStep++;
            this.renderStep();
        }
        
        this.isGenerating = false;
    }

    generateFallbackIdea() {
        const isSv = (typeof currentLanguage !== 'undefined') ? (currentLanguage === 'sv' || currentLanguage === 'gbg') : true;
        const purpose = this.answers.purpose || (isSv ? 'Event' : 'Event');
        const feeling = this.answers.feeling || (isSv ? ['Professionell'] : ['Professional']);
        
        if (isSv) {
            return {
                conceptName: `${purpose} med Wow-faktor`,
                description: `Ett skräddarsytt ${purpose.toLowerCase()} som kombinerar ${feeling.join(' och ').toLowerCase()} element för att skapa en minnesvärd upplevelse för era gäster. Konceptet bygger på er bransch och målgrupp för att maximera engagemang och resultat.`,
                keyMoments: [
                    'Välkomstupplevelse som sätter tonen direkt',
                    'Interaktivt huvudmoment som engagerar alla sinnen',
                    'Överraskande inslag mitt i programmet',
                    'Minnesvärt avslut som gästerna tar med sig hem'
                ],
                wowFactor: 'En oväntad upplevelse som knyter an till ert varumärke och som gästerna kommer prata om långt efter eventet är över.',
                recommendation: this.t('gen.fallback.recommendation')
            };
        }

        return {
            conceptName: `${purpose} with Wow Factor`,
            description: `A tailored ${purpose.toLowerCase()} that combines ${feeling.join(' and ').toLowerCase()} elements to create a memorable experience for your guests. The concept is based on your industry and audience to maximize engagement and results.`,
            keyMoments: [
                'Arrival experience that sets the tone immediately',
                'Interactive main moment engaging all senses',
                'Surprise element mid-program',
                'Memorable closing guests take with them'
            ],
            wowFactor: 'An unexpected experience linked to your brand that guests will talk about long after the event is over.',
            recommendation: this.t('gen.fallback.recommendation')
        };
    }

    generatePDF() {
        // Create PDF content
        const pdfContent = this.createPDFContent();
        
        // Open print dialog with styled content
        const printWindow = window.open('', '_blank');
        printWindow.document.write(pdfContent);
        printWindow.document.close();
        printWindow.focus();
        
        // Auto-trigger print after load
        printWindow.onload = function() {
            printWindow.print();
        };
    }

    createPDFContent() {
        const idea = this.generatedIdea;
        const locale = (typeof currentLanguage !== 'undefined' && currentLanguage === 'en') ? 'en-GB' : 'sv-SE';
        const date = new Date().toLocaleDateString(locale);
        const langAttr = (typeof currentLanguage !== 'undefined' && currentLanguage === 'en') ? 'en' : 'sv';
        
        return `
<!DOCTYPE html>
<html lang="${langAttr}">
<head>
    <meta charset="UTF-8">
    <title>Event-Idé - We Are Bryssel</title>
    <style>
        @page {
            margin: 2cm;
            size: A4;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
            font-size: 11pt;
            line-height: 1.6;
            color: #000000;
            background: #ffffff;
        }
        
        .pdf-container {
            max-width: 800px;
            margin: 0 auto;
            padding: 40px;
        }
        
        .pdf-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 40px;
            padding-bottom: 20px;
            border-bottom: 2px solid #a6894f;
        }
        
        .pdf-logo {
            font-size: 24pt;
            font-weight: 700;
            color: #000000;
        }
        
        .pdf-date {
            color: #666666;
            font-size: 10pt;
        }
        
        .pdf-title {
            text-align: center;
            margin-bottom: 40px;
        }
        
        .pdf-title h1 {
            font-size: 28pt;
            font-weight: 700;
            color: #000000;
            margin-bottom: 10px;
        }
        
        .pdf-title p {
            font-size: 12pt;
            color: #666666;
        }
        
        .pdf-section {
            margin-bottom: 30px;
        }
        
        .pdf-section h2 {
            font-size: 14pt;
            font-weight: 700;
            color: #a6894f;
            margin-bottom: 10px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }
        
        .pdf-section p {
            font-size: 11pt;
            line-height: 1.7;
        }
        
        .concept-name {
            font-size: 18pt;
            font-weight: 700;
            color: #000000;
        }
        
        .moments-list {
            list-style: none;
            padding-left: 0;
        }
        
        .moments-list li {
            padding: 8px 0;
            padding-left: 20px;
            position: relative;
            border-bottom: 1px solid #f0f0f0;
        }
        
        .moments-list li:before {
            content: "";
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 8px;
            height: 8px;
            background-color: #a6894f;
            border-radius: 50%;
        }
        
        .moments-list li:last-child {
            border-bottom: none;
        }
        
        .pdf-input-summary {
            background-color: #f8f8f8;
            padding: 20px;
            margin-bottom: 30px;
            border-radius: 4px;
        }
        
        .pdf-input-summary h3 {
            font-size: 12pt;
            font-weight: 700;
            margin-bottom: 15px;
        }
        
        .input-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
        }
        
        .input-item {
            font-size: 10pt;
        }
        
        .input-item strong {
            color: #666666;
        }
        
        .pdf-footer {
            margin-top: 60px;
            padding-top: 20px;
            border-top: 1px solid #e0e0e0;
            text-align: center;
        }
        
        .pdf-footer p {
            font-size: 10pt;
            color: #666666;
            margin-bottom: 5px;
        }
        
        .pdf-footer .contact {
            font-weight: 600;
            color: #000000;
        }
        
        .pdf-cta {
            background-color: #a6894f;
            color: #ffffff;
            padding: 15px 30px;
            text-align: center;
            margin-top: 30px;
        }
        
        .pdf-cta p {
            font-size: 11pt;
            margin-bottom: 5px;
        }
        
        .pdf-cta .cta-text {
            font-size: 14pt;
            font-weight: 700;
        }
        
        @media print {
            body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            .pdf-cta { background-color: #a6894f !important; }
        }
    </style>
</head>
<body>
    <div class="pdf-container">
        <div class="pdf-header">
            <div class="pdf-logo">Bryssel</div>
            <div class="pdf-date">Skapad: ${date}</div>
        </div>
        
        <div class="pdf-title">
            <h1>Din Event-Idé</h1>
            <p>Skräddarsydd för ${this.userEmail}</p>
        </div>
        
        <div class="pdf-input-summary">
            <h3>Baserat på dina svar</h3>
            <div class="input-grid">
                <div class="input-item"><strong>Bransch:</strong> ${this.answers.industry || '-'}</div>
                <div class="input-item"><strong>Syfte:</strong> ${this.answers.purpose || '-'}</div>
                <div class="input-item"><strong>Antal gäster:</strong> ${this.answers.guests || '-'}</div>
                <div class="input-item"><strong>Budget:</strong> ${this.answers.budget || '-'}</div>
                <div class="input-item" style="grid-column: span 2;"><strong>Känsla:</strong> ${(this.answers.feeling || []).join(', ') || '-'}</div>
            </div>
        </div>
        
        <div class="pdf-section">
            <h2>Koncept</h2>
            <p class="concept-name">${idea.conceptName}</p>
        </div>
        
        <div class="pdf-section">
            <h2>Beskrivning</h2>
            <p>${idea.description}</p>
        </div>
        
        <div class="pdf-section">
            <h2>Nyckelmoment</h2>
            <ul class="moments-list">
                ${idea.keyMoments.map(m => `<li>${m}</li>`).join('')}
            </ul>
        </div>
        
        <div class="pdf-section">
            <h2>Wow-faktor</h2>
            <p>${idea.wowFactor}</p>
        </div>
        
        <div class="pdf-section pdf-recommendation">
            <h2>Vår rekommendation</h2>
            <p>${idea.recommendation || 'Detta är bara en smakprov på vad vi kan skapa tillsammans! Kontakta oss på Bryssel så tar vi fram en komplett och djupgående rekommendation skräddarsydd efter just era behov, mål och vision.'}</p>
        </div>
        
        <div class="pdf-cta">
            <p>Redo att förverkliga denna idé?</p>
            <p class="cta-text">Kontakta oss för en komplett och djupgående personlig rekommendation</p>
        </div>
        
        <div class="pdf-footer">
            <p class="contact">We Are Bryssel AB</p>
            <p>Kungstorget 11, 411 10 Göteborg</p>
            <p>info@wearebryssel.se | wearebryssel.se</p>
        </div>
    </div>
</body>
</html>
        `;
    }

    applyTranslations() {
        if (this.closeBtn) this.closeBtn.setAttribute('aria-label', this.t('gen.close'));
        if (this.prevBtn) this.prevBtn.textContent = this.t('gen.prev');
        if (this.nextBtn) this.nextBtn.textContent = this.t('gen.next');
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.eventGenerator = new EventGenerator();
});

