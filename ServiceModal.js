// Service Modal - Detaljerad information om våra tjänster

class ServiceModal {
    constructor() {
        this.services = {
            konferenser: {
                image: 'public/Bryssel_media/Bilder tom 2 dec/cs3sthlm-3568.jpg',
                sv: {
                    title: 'Konferenser & Mässor',
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
                en: {
                    title: 'Conferences & Trade Fairs',
                    description: 'We create conferences and trade fairs that go beyond the ordinary. Professionally delivered, visually striking, always with an unexpected twist guests remember and talk about long after.',
                    features: [
                        'Full project management from idea to delivery',
                        'Venue booking and scenography tailored to your brand',
                        'Technical production – sound, light, video and streaming',
                        'Speakers, moderators and entertainment',
                        'Catering and guest management',
                        'Booth and exhibition design',
                        'Interactive elements that engage attendees',
                        'Post-event documentation and follow-up'
                    ]
                },
                gbg: {
                    title: 'Konferenser & Mässor (gôtt!)',
                    description: 'Vi snickrar konferenser och mässor som är långt ifrån vanliga. Proffsigt, snyggt och alltid med en göttig twist som folk snackar om efteråt.',
                    features: [
                        'Projektledning från idé till mål – vi håller i trådarna',
                        'Lokal och scenografi som passar ert gôa varumärke',
                        'Teknik: ljud, ljus, video, streaming – rubbet',
                        'Talare, moderatorer och underhållning som lyfter',
                        'Catering och gästhantering på göteborgskt manér',
                        'Montrar och utställningsdesign som sticker ut',
                        'Interaktiva grejer som får folk att vara med',
                        'Efterarbete med dokumentation och uppföljning'
                    ]
                }
            },
            lanseringar: {
                image: 'public/Bryssel_media/Bilder tom 2 dec/ga_sailracing_opening_clubhouse2014_1.jpg',
                sv: {
                    title: 'Lanseringar & Invigningar',
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
                en: {
                    title: 'Launches & Openings',
                    description: 'When something new meets the world it should feel real. We craft launches and openings that build anticipation, deliver wow moments, and give your product or service the premiere it deserves.',
                    features: [
                        'Strategic planning for maximum media impact',
                        'Creative concept development matching your brand',
                        'Dramatically staged reveal moments',
                        'VIP handling and guest lists',
                        'Press handling and media accreditation',
                        'Live streaming and social media activation',
                        'Impactful product presentations',
                        'Memorable giveaways and branded experiences'
                    ]
                },
                gbg: {
                    title: 'Lanseringar & Invigningar (goa grejer)',
                    description: 'När nåt nytt ska ut i världen ska det kännas på riktigt. Vi bygger förväntan, levererar wow och ger produkten en premiär med extra gött tryck.',
                    features: [
                        'Strategi som maxar snack och synlighet',
                        'Kreativa koncept som matchar er stil',
                        'Dramatiska reveal-moment – pang på',
                        'VIP-hantering och schysta gästlistor',
                        'Press och medieackreditering fixad',
                        'Livestream och sociala medie-aktivering',
                        'Produktpresentationer som sätter sig',
                        'Give-aways och upplevelser folk minns'
                    ]
                }
            },
            jubileum: {
                image: 'public/Bryssel_media/Bilder tom 2 dec/Bingolotto25år4.JPG',
                sv: {
                    title: 'Jubileum & Firanden',
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
                en: {
                    title: 'Anniversaries & Celebrations',
                    description: 'An anniversary is more than just a party – it’s a chance to honor the past, celebrate the present, and look to the future. We create celebrations that build pride, strengthen culture, and create memories for life.',
                    features: [
                        'Storytelling that highlights your journey and milestones',
                        'Creative concepts reflecting your identity and values',
                        'Staff events that build pride and togetherness',
                        'Customer events that strengthen relationships',
                        'Anniversary films and documentation',
                        'Entertainment and activities for all ages',
                        'Themed environments and scenography',
                        'Surprise moments no one forgets'
                    ]
                },
                gbg: {
                    title: 'Jubileum & Firanden (gôrpampigt)',
                    description: 'Jubileum är mer än en fest – det är stolthet, historia och framtid. Vi skapar goa firanden som bygger kultur och minnen för livet.',
                    features: [
                        'Storytelling som lyfter er resa och milstolpar',
                        'Koncept som känns som er – med göttig twist',
                        'Personalfester som skapar stolthet och värme',
                        'Kundevent som stärker banden',
                        'Jubileumsfilm och dokumentation',
                        'Underhållning och aktiviteter för alla',
                        'Temamiljöer och scenografi med känsla',
                        'Överraskningar ingen glömmer'
                    ]
                }
            },
            turneer: {
                image: 'public/Bryssel_media/Bilder tom 2 dec/Hamburg on tour48.jpg',
                sv: {
                    title: 'Turnéer & Roadshows',
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
                },
                en: {
                    title: 'Tours & Roadshows',
                    description: 'We take your brand on the road with tours and roadshows that engage audiences across the country – or the world. With solid logistics, consistent quality, and local tailoring, we deliver experiences that land.',
                    features: [
                        'National or international planning and logistics',
                        'Scalable concept that works across locations',
                        'Local tailoring with brand consistency',
                        'Mobile production units and scenography',
                        'Coordination with local partners and vendors',
                        'On-site staffing and training',
                        'Real-time reporting and results follow-up',
                        'Flexibility to adapt to local conditions'
                    ]
                },
                gbg: {
                    title: 'Turnéer & Roadshows (ut på vägarna)',
                    description: 'Vi tar ert varumärke på rull – med go logistik, jämn kvalitet och lokal känsla så det landar fint överallt.',
                    features: [
                        'Nationell/internationell planering och logistik',
                        'Skalbart koncept som funkar på flera ställen',
                        'Lokal anpassning men samma goa varumärkeskänsla',
                        'Mobila produktionsenheter och scenografi',
                        'Samarbete med lokala partners och leverantörer',
                        'Personal på plats och inskolning',
                        'Realtidsrapportering och uppföljning',
                        'Flexibelt för lokala förutsättningar'
                    ]
                }
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
        document.addEventListener('languageChanged', () => {
            if (this.isOpen) {
                // Re-render current service if open
                const currentImg = document.getElementById('service-modal-img');
                if (currentImg && currentImg.dataset.serviceKey) {
                    this.openModal(currentImg.dataset.serviceKey);
                }
            }
        });
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

        const lang = (typeof currentLanguage !== 'undefined' && currentLanguage === 'en') ? 'en' : (currentLanguage === 'gbg' ? 'gbg' : 'sv');
        const data = service[lang] || service.sv;

        // Populate modal content
        const titleEl = document.getElementById('service-modal-title');
        const descEl = document.getElementById('service-modal-description');
        const featuresEl = document.getElementById('service-modal-features');
        const imgEl = document.getElementById('service-modal-img');

        if (titleEl) titleEl.textContent = data.title;
        if (descEl) descEl.textContent = data.description;
        if (imgEl) {
            imgEl.src = service.image;
            imgEl.alt = data.title;
            imgEl.dataset.serviceKey = serviceKey;
        }

        if (featuresEl) {
            featuresEl.innerHTML = data.features
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



