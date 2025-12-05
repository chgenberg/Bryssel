// Service Modal - Detaljerad information om våra tjänster

class ServiceModal {
    constructor() {
        this.services = {
            konferenser: {
                title: 'Konferenser & Mässor',
                image: 'public/Bryssel_media/Bilder tom 2 dec/cs3sthlm-3568.jpg',
                description: 'Vi skapar konferenser och mässor som går bortom det vanliga. Professionellt genomförda, visuellt slående och alltid med en oväntad twist som får deltagarna att minnas och prata om upplevelsen långt efteråt.',
                features: [
                    'Komplett projektledning från idé till genomförande',
                    'Lokalbokning och scenografi anpassad efter ert varumärke',
                    'Teknisk produktion – ljud, ljus, video och streaming',
                    'Talare, moderatorer och underhållning',
                    'Catering och gästhantering',
                    'Mässmontrar och utställningsdesign',
                    'Interaktiva element som engagerar deltagarna',
                    'Efterarbete med dokumentation och uppföljning'
                ]
            },
            lanseringar: {
                title: 'Lanseringar & Invigningar',
                image: 'public/Bryssel_media/Bilder tom 2 dec/ga_sailracing_opening_clubhouse2014_1.jpg',
                description: 'När något nytt ska möta världen ska det kännas på riktigt. Vi skapar lanseringar och invigningar som bygger förväntan, levererar wow-ögonblick och ger er produkt eller tjänst den premiär den förtjänar.',
                features: [
                    'Strategisk planering för maximal medial genomslagskraft',
                    'Kreativ konceptutveckling som matchar ert varumärke',
                    'Dramaturgiskt uppbyggda reveal-moment',
                    'VIP-hantering och gästlistor',
                    'Presshantering och medieackreditering',
                    'Live-streaming och social media-aktivering',
                    'Produktpresentationer med impact',
                    'Minnesvärda give-aways och brandade upplevelser'
                ]
            },
            jubileum: {
                title: 'Jubileum & Firanden',
                image: 'public/Bryssel_media/Bilder tom 2 dec/Bingolotto25år4.JPG',
                description: 'Ett jubileum är så mycket mer än bara en fest – det är en möjlighet att hedra det förflutna, fira nuet och blicka mot framtiden. Vi skapar jubileum som bygger stolthet, stärker kulturen och skapar minnen för livet.',
                features: [
                    'Storytelling som lyfter företagets resa och milstolpar',
                    'Kreativa koncept som speglar er identitet och värderingar',
                    'Personalfester som bygger gemenskap och stolthet',
                    'Kundevent som stärker relationer',
                    'Jubileumsfilmer och dokumentation',
                    'Underhållning och aktiviteter för alla åldrar',
                    'Tematiserade miljöer och scenografi',
                    'Överraskningsmoment som ingen glömmer'
                ]
            },
            turneer: {
                title: 'Turnéer & Roadshows',
                image: 'public/Bryssel_media/Bilder tom 2 dec/Hamburg on tour48.jpg',
                description: 'Vi tar ditt varumärke ut på vägarna med turnéer och roadshows som engagerar publik över hela landet – eller världen. Med genomarbetad logistik, konsekvent kvalitet och lokal anpassning skapar vi upplevelser som når fram.',
                features: [
                    'Nationell eller internationell planering och logistik',
                    'Skalbart koncept som fungerar på flera platser',
                    'Lokal anpassning med bibehållen varumärkeskonsistens',
                    'Mobila produktionsenheter och scenografi',
                    'Koordinering med lokala partners och leverantörer',
                    'Personalrekrytering och utbildning på plats',
                    'Realtidsrapportering och resultatuppföljning',
                    'Flexibilitet för att anpassa efter lokala förutsättningar'
                ]
            }
        };

        this.modal = null;
        this.isOpen = false;
        this.init();
    }

    init() {
        this.modal = document.getElementById('service-modal');
        if (!this.modal) return;

        this.bindEvents();
    }

    bindEvents() {
        // Click on service items
        const serviceItems = document.querySelectorAll('.service-visual-item[data-service]');
        serviceItems.forEach(item => {
            item.addEventListener('click', () => {
                const serviceKey = item.dataset.service;
                this.openModal(serviceKey);
            });

            // Keyboard accessibility
            item.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const serviceKey = item.dataset.service;
                    this.openModal(serviceKey);
                }
            });
        });

        // Close button
        const closeBtn = this.modal.querySelector('.service-modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeModal());
        }

        // Click outside to close
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });

        // Escape key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeModal();
            }
        });

        // Contact button - close modal and scroll to contact
        const contactBtn = document.getElementById('service-contact-btn');
        if (contactBtn) {
            contactBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.closeModal();
                setTimeout(() => {
                    document.getElementById('kontakt').scrollIntoView({ behavior: 'smooth' });
                }, 300);
            });
        }

        // Event idea button - close modal and open event generator
        const ideaBtn = document.getElementById('service-idea-btn');
        if (ideaBtn) {
            ideaBtn.addEventListener('click', () => {
                this.closeModal();
                setTimeout(() => {
                    if (window.eventGenerator) {
                        window.eventGenerator.open();
                    }
                }, 300);
            });
        }
    }

    openModal(serviceKey) {
        const service = this.services[serviceKey];
        if (!service) return;

        // Populate modal content
        const titleEl = document.getElementById('service-modal-title');
        const descEl = document.getElementById('service-modal-description');
        const featuresEl = document.getElementById('service-modal-features');
        const imgEl = document.getElementById('service-modal-img');

        if (titleEl) titleEl.textContent = service.title;
        if (descEl) descEl.textContent = service.description;
        if (imgEl) {
            imgEl.src = service.image;
            imgEl.alt = service.title;
        }

        if (featuresEl) {
            featuresEl.innerHTML = service.features
                .map(feature => `<li>${feature}</li>`)
                .join('');
        }

        // Show modal
        this.modal.classList.add('active');
        this.modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        this.isOpen = true;

        // Focus on close button for accessibility
        const closeBtn = this.modal.querySelector('.service-modal-close');
        if (closeBtn) closeBtn.focus();
    }

    closeModal() {
        this.modal.classList.remove('active');
        this.modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        this.isOpen = false;
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.serviceModal = new ServiceModal();
});


