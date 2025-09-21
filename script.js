/**
 * LIV LEV - JAVASCRIPT COMPLETO
 * Sistema com Atendentes Virtuais e Efeitos de Bolhas
 * ================================================
 */

// Global Variables
let heroSwiper = null;
let currentAssistant = null;
let messageIndex = 0;

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    initializeBubbles();
    initializeSwipers();
    initializeAOS();
    setupScrollEffects();
    setupSmoothScroll();
    initializeChatbots();
    animateTestimonials();
    animateBuyCards();
    optimizePerformance();
    
    console.log('🐾 Liv Lev - Site Carregado com Sucesso!');
    console.log('💚 Cuidando com amor, ciência e natureza');
});

/**
 * Initialize Bubble Effect
 */
function initializeBubbles() {
    const bubbleContainer = document.querySelector('.bubble-container');
    if (!bubbleContainer) return;
    
    const numberOfBubbles = 15;
    
    for (let i = 0; i < numberOfBubbles; i++) {
        createBubble(bubbleContainer);
    }
    
    // Create new bubbles periodically
    setInterval(() => {
        if (document.querySelectorAll('.bubble').length < numberOfBubbles) {
            createBubble(bubbleContainer);
        }
    }, 3000);
}

function createBubble(container) {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    
    // Random size
    const size = Math.random() * 60 + 20;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    
    // Random position
    bubble.style.left = `${Math.random() * 100}%`;
    
    // Random animation duration
    bubble.style.animationDuration = `${Math.random() * 10 + 15}s`;
    bubble.style.animationDelay = `${Math.random() * 5}s`;
    
    // Random opacity
    bubble.style.opacity = Math.random() * 0.3 + 0.1;
    
    container.appendChild(bubble);
    
    // Remove bubble after animation
    setTimeout(() => {
        bubble.remove();
    }, 25000);
}

/**
 * Initialize Swipers
 */
function initializeSwipers() {
    if (document.querySelector('.heroSwiper')) {
        heroSwiper = new Swiper('.heroSwiper', {
            loop: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            speed: 1500,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                dynamicBullets: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }
        });
    }
}

/**
 * Initialize AOS Animations
 */
function initializeAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100,
            easing: 'ease-out',
            disable: window.innerWidth < 768 ? true : false
        });
    }
}

/**
 * Setup Scroll Effects
 */
function setupScrollEffects() {
    const navbar = document.getElementById('mainNav');
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        
        // Navbar effect
        if (navbar) {
            if (scrollPosition > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
        
        // Parallax effect for bubbles
        const bubbles = document.querySelectorAll('.bubble');
        bubbles.forEach((bubble, index) => {
            const speed = (index + 1) * 0.5;
            bubble.style.transform = `translateY(${scrollPosition * speed * 0.1}px)`;
        });
        
        // Update active nav link based on scroll position
        updateActiveSection();
    });
}

/**
 * Update Active Section in Navigation
 */
function updateActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

/**
 * Setup Smooth Scroll
 */
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            
            if (target) {
                const offset = 80;
                const targetPosition = target.offsetTop - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Virtual Assistants Functions
 */
window.toggleAssistants = function() {
    const container = document.getElementById('assistantsContainer');
    container.classList.toggle('active');
}

window.openChat = function(type) {
    currentAssistant = type;
    messageIndex = 0;
    
    const modal = document.getElementById('chatModal');
    const avatar = document.getElementById('chatAvatar');
    const name = document.getElementById('chatName');
    const messages = document.getElementById('chatMessages');
    
    // Hide assistants container
    document.getElementById('assistantsContainer').classList.remove('active');
    
    // Setup chat based on assistant type
    if (type === 'cat') {
        avatar.src = 'chat-cat.png';
        name.textContent = 'Blue';
    } else {
        avatar.src = 'chat-dog.png';
        name.textContent = 'Verde';
    }
    
    // Show modal
    modal.classList.add('active');
    
    // Clear previous messages
    messages.innerHTML = '';
    
    // Send initial message
    setTimeout(() => {
        addBotMessage(getInitialMessage(type));
        showSuggestions(type);
    }, 500);
}

window.closeChat = function() {
    const modal = document.getElementById('chatModal');
    modal.classList.remove('active');
    currentAssistant = null;
    messageIndex = 0;
}

/**
 * Chat Functions
 */
function getInitialMessage(type) {
    if (type === 'cat') {
        return 'Miau! 😺 Sou Liv, uso Liv Lev há meses e meu pelo nunca esteve tão macio! Como posso ajudar você hoje?';
    } else {
        return 'Au au! 🐕 Oi, sou o Lev! Adoro o xampu Liv Lev, me deixa cheiroso e sem coceira! Quer saber mais?';
    }
}

function showSuggestions(type) {
    const suggestions = document.getElementById('chatSuggestions');
    suggestions.innerHTML = '';
    
    const catSuggestions = [
        'Por que Liv Lev é especial?',
        'Ajuda com coceira?',
        'Qual o preço?',
        'Como comprar?'
    ];
    
    const dogSuggestions = [
        'Funciona para pelos longos?',
        'É natural mesmo?',
        'Tem cheiro bom?',
        'Onde compro?'
    ];
    
    const currentSuggestions = type === 'cat' ? catSuggestions : dogSuggestions;
    
    currentSuggestions.forEach(suggestion => {
        const btn = document.createElement('button');
        btn.className = 'suggestion-btn';
        btn.textContent = suggestion;
        btn.onclick = () => sendSuggestion(suggestion);
        suggestions.appendChild(btn);
    });
}

function sendSuggestion(text) {
    const input = document.getElementById('chatInput');
    input.value = text;
    sendMessage();
}

window.sendMessage = function() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Add user message
    addUserMessage(message);
    
    // Clear input
    input.value = '';
    
    // Show typing indicator
    showTyping();
    
    // Generate bot response
    setTimeout(() => {
        hideTyping();
        const response = generateResponse(message);
        addBotMessage(response);
        
        // Update suggestions after response
        updateSuggestions();
    }, 1000 + Math.random() * 1000);
}

function addUserMessage(message) {
    const messages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message message-user';
    messageDiv.innerHTML = `<div class="message-content">${message}</div>`;
    messages.appendChild(messageDiv);
    messages.scrollTop = messages.scrollHeight;
}

function addBotMessage(message) {
    const messages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message message-bot';
    messageDiv.innerHTML = `<div class="message-content">${message}</div>`;
    messages.appendChild(messageDiv);
    messages.scrollTop = messages.scrollHeight;
}

function showTyping() {
    const messages = document.getElementById('chatMessages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message message-bot typing-message';
    typingDiv.innerHTML = `
        <div class="message-content typing-indicator">
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
        </div>
    `;
    messages.appendChild(typingDiv);
    messages.scrollTop = messages.scrollHeight;
}

function hideTyping() {
    const typing = document.querySelector('.typing-message');
    if (typing) typing.remove();
}

function generateResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // Cat responses
    const catResponses = {
        'preço': 'Miau! O xampu Liv Lev está com preço especial! Você pode comprar pelo Mercado Pago com parcelamento ou pelo WhatsApp com desconto especial! 😺',
        'coceira': '*se coça e para* Antes do Liv Lev eu vivia me coçando! Agora minha pele está saudável e sem irritações. É incrível! 😸',
        'natural': 'Miau, sim! É 100% natural com mastruz, própolis e óleo de babaçu. Nada de química agressiva que irrita nossa pele sensível! 🌿',
        'comprar': 'Você pode comprar pelo Mercado Pago (parcela em até 5x) ou WhatsApp para um atendimento especial! Eu recomendo! 😻',
        'especial': 'Liv Lev é especial porque é feito com amor e ciência! As fundadoras são incríveis e pensaram em tudo para nós, pets! 💙',
        'cheiro': '*fareja* Tem um cheirinho suave e natural que dura dias! Nada daqueles perfumes fortes que me fazem espirrar! 😹',
        'pelos': 'Meus pelos nunca estiveram tão macios e brilhantes! O mastruz estimula o crescimento saudável. Olha como estou lindo! ✨',
        'dermatite': 'Miau! Liv Lev é perfeito para dermatite! Meu amigo Félix tinha dermatite severa e melhorou muito! Os ingredientes naturais acalmam a pele. 🐱',
        'garantia': 'Ronron... A equipe Liv Lev é super confiável! Se tiver qualquer problema, eles resolvem rapidinho pelo WhatsApp! 💙'
    };
    
    // Dog responses
    const dogResponses = {
        'preço': 'AU AU! O preço está ótimo! Tem desconto especial pelo WhatsApp e pode parcelar pelo Mercado Pago! 🐕',
        'pelos longos': 'AU AU! Funciona super bem! Tenho amigos Golden e Pastor Alemão que usam e os pelos ficaram incríveis! 🐕',
        'natural': 'Au au! É 100% natural! Sem químicas que irritam. Minha tutora adora porque é seguro! 🌱',
        'comprar': 'AU AU! Você pode comprar pelo Mercado Pago ou WhatsApp! Eu ganhei o meu pelo WhatsApp e chegou rapidinho! 📦',
        'cheiro': 'AU AU! O cheiro é maravilhoso! Natural e suave, não é enjoativo. Fico cheiroso por dias! 🌸',
        'funciona': 'Funciona MUITO! Eu tinha dermatite e melhorou tudo! Agora só uso Liv Lev! ⭐',
        'coceira': 'Antes eu vivia me coçando, agora acabou! O mastruz é incrível para a pele! 🐾',
        'desconto': 'AU AU! Pelo WhatsApp tem desconto especial! Vale muito a pena! A equipe é super atenciosa! 💚',
        'banho': '*abana o rabo* Adoro o dia do banho agora! O xampu faz muita espuma gostosa e deixa meu pelo macio! 🛁',
        'alergia': 'AU AU! Perfeito para quem tem alergia! Não tem química agressiva, só ingredientes naturais! 🌿'
    };
    
    // Check which assistant and find matching response
    const responses = currentAssistant === 'cat' ? catResponses : dogResponses;
    
    // Find matching keyword in message
    for (let key in responses) {
        if (lowerMessage.includes(key)) {
            return responses[key];
        }
    }
    
    // Default responses
    if (currentAssistant === 'cat') {
        const defaultCat = [
            'Miau! Interessante... Quer saber mais sobre os benefícios do Liv Lev? 😺',
            'Miau miau! Posso te contar sobre minha experiência com o xampu! 😸',
            'Ronron... Liv Lev mudou minha vida! Quer saber como? 💙',
            '*se espreguiça* Que tal conhecer os ingredientes naturais? 🌿'
        ];
        return defaultCat[Math.floor(Math.random() * defaultCat.length)];
    } else {
        const defaultDog = [
            'AU AU! Quer que eu conte mais sobre o Liv Lev? 🐕',
            'Rabo abanando! Posso ajudar com mais informações! 🐾',
            'Au au! Liv Lev é incrível! O que mais quer saber? ⭐',
            '*late feliz* Vamos falar sobre os benefícios? 💚'
        ];
        return defaultDog[Math.floor(Math.random() * defaultDog.length)];
    }
}

function updateSuggestions() {
    messageIndex++;
    const suggestions = document.getElementById('chatSuggestions');
    
    // Progressive suggestions based on conversation stage
    if (messageIndex > 2) {
        const finalSuggestions = [
            'Quero comprar agora!',
            'Me mande o link',
            'Tem garantia?',
            'Falar com humano'
        ];
        
        suggestions.innerHTML = '';
        finalSuggestions.forEach(suggestion => {
            const btn = document.createElement('button');
            btn.className = 'suggestion-btn';
            btn.textContent = suggestion;
            btn.onclick = () => {
                if (suggestion === 'Quero comprar agora!' || suggestion === 'Me mande o link') {
                    sendSuggestion(suggestion);
                    setTimeout(() => {
                        if (currentAssistant === 'cat') {
                            addBotMessage('Miau! Ótima escolha! 😺<br><br>🛒 Mercado Pago (parcelado): <a href="https://produto.mercadolivre.com.br/MLB-4160297527-shampoo-natural-mastruz-propolis-para-ces-e-gatos-_JM?utm_source=bio_libre&utm_medium=Referral&utm_campaign=general_link" target="_blank">Clique aqui</a><br><br>💚 WhatsApp (com desconto): <a href="https://api.whatsapp.com/send/?phone=559882007986" target="_blank">Clique aqui</a>');
                        } else {
                            addBotMessage('AU AU! Que legal! 🐕<br><br>🛒 Mercado Pago (parcelado): <a href="https://biolivre.com.br/livlev" target="_blank">Clique aqui</a><br><br>💚 WhatsApp (com desconto): <a href="https://api.whatsapp.com/send/?phone=559882007986" target="_blank">Clique aqui</a>');
                        }
                    }, 1000);
                } else if (suggestion === 'Falar com humano') {
                    sendSuggestion(suggestion);
                    setTimeout(() => {
                        if (currentAssistant === 'cat') {
                            addBotMessage('Miau! Claro! A equipe Liv Lev vai adorar falar com você! 😺 Vou abrir o WhatsApp para você...');
                        } else {
                            addBotMessage('AU AU! Ótimo! Meus humanos vão te atender super bem! 🐕 Abrindo o WhatsApp...');
                        }
                        setTimeout(() => {
                            window.open('https://api.whatsapp.com/send/?phone=559882007986', '_blank');
                        }, 1500);
                    }, 1000);
                } else {
                    sendSuggestion(suggestion);
                }
            };
            suggestions.appendChild(btn);
        });
    }
}

/**
 * Initialize Chatbots
 */
function initializeChatbots() {
    // Add event listener for Enter key in chat input
    const chatInput = document.getElementById('chatInput');
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    // Auto show assistant toggle after 10 seconds
    setTimeout(() => {
        const toggle = document.querySelector('.assistant-toggle');
        if (toggle) {
            toggle.style.animation = 'pulse 1s 3';
        }
    }, 10000);
}

/**
 * Gallery Hover Effects
 */
document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotate(2deg)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0)';
        });
    });
});

/**
 * Testimonial Animation
 */
function animateTestimonials() {
    const testimonials = document.querySelectorAll('.testimonial-card');
    
    testimonials.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.style.animation = 'fadeInUp 0.8s ease-out forwards';
    });
}

/**
 * Before/After Image Comparison
 */
document.addEventListener('DOMContentLoaded', function() {
    const resultCards = document.querySelectorAll('.result-card');
    
    resultCards.forEach(card => {
        const beforeImage = card.querySelector('.before img');
        const afterImage = card.querySelector('.after img');
        
        if (beforeImage && afterImage) {
            card.addEventListener('mouseenter', function() {
                beforeImage.style.opacity = '0.7';
                afterImage.style.transform = 'scale(1.05)';
            });
            
            card.addEventListener('mouseleave', function() {
                beforeImage.style.opacity = '1';
                afterImage.style.transform = 'scale(1)';
            });
        }
    });
});

/**
 * Buy Section Animations
 */
function animateBuyCards() {
    const buyCards = document.querySelectorAll('.buy-card');
    
    buyCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('featured')) {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('featured')) {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });
}

/**
 * Mobile Menu Toggle
 */
document.addEventListener('DOMContentLoaded', function() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function() {
            setTimeout(() => {
                if (navbarCollapse.classList.contains('show')) {
                    createMenuBubbles();
                }
            }, 300);
        });
    }
});

/**
 * Create Menu Bubbles
 */
function createMenuBubbles() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach((item, index) => {
        setTimeout(() => {
            const bubble = item.querySelector('.nav-bubble');
            if (bubble) {
                bubble.style.transform = 'scale(1)';
                bubble.style.opacity = '0.2';
                
                // Reset depois de um tempo para poder reaparecer
                setTimeout(() => {
                    bubble.style.transform = 'scale(0)';
                    bubble.style.opacity = '0';
                }, 1500);
            }
        }, index * 150); // atraso progressivo
    });
}

/**
 * Performance Optimizations
 */
function optimizePerformance() {
    // Lazy load imagens
    const lazyImages = document.querySelectorAll('img');
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
                obs.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => observer.observe(img));

    // Pausar Swiper quando não está visível
    if (heroSwiper) {
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                heroSwiper.autoplay.stop();
            } else {
                heroSwiper.autoplay.start();
            }
        });
    }
}
