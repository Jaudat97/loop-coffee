document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    // ----------------------------------------------------
    // 1. IMAGE SEQUENCE HERO ANIMATION
    // ----------------------------------------------------
    const heroCanvas = document.getElementById("hero-canvas");
    const heroContext = heroCanvas.getContext("2d");
    const frameCount = 289;
    
    // We fetch images from the parent folder (same logic as coffee-scroll)
    const currentFrame = index => (
      `frames/frame_0${index.toString().padStart(3, '0')}.webp`
    );

    const images = [];
    const sequenceObj = { frame: 0 }; 

    // Preload all images
    for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        images.push(img);
    }

    images[0].onload = renderHeroFrame;

    function renderHeroFrame() {
        if (!images[sequenceObj.frame]) return;
        
        if(images[sequenceObj.frame].width > 0) {
            heroCanvas.width = images[sequenceObj.frame].width;
            heroCanvas.height = images[sequenceObj.frame].height;
            heroContext.clearRect(0, 0, heroCanvas.width, heroCanvas.height);
            heroContext.drawImage(images[sequenceObj.frame], 0, 0);
        }
    }

    // ScrollTrigger to scrub the image sequence
    ScrollTrigger.create({
        trigger: "#hero",
        start: "top top",
        end: "bottom top", 
        scrub: 0.5,
        animation: gsap.to(sequenceObj, {
            frame: frameCount - 1,
            snap: "frame",
            ease: "none",
            onUpdate: renderHeroFrame
        })
    });

    // Fade out canvas slightly as it exits
    gsap.to("#hero-container", {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
            trigger: "#hero",
            start: "bottom 100%",
            end: "bottom top",
            scrub: true
        }
    });
    // Cinematic Video Zoom Animation: Emerge from the "O" of "LOOP"
    const zoomWrapper = document.getElementById("zoom-video-wrapper");
    if (zoomWrapper) {
        const cinematicTl = gsap.timeline({
            scrollTrigger: {
                trigger: "#cinematic-video",
                start: "top top",
                end: "bottom bottom",
                scrub: 0.6,
            }
        });

        // 1. Text headers and prompts disperse smoothly
        cinematicTl
            .to("#cinematic-header-wrap", {
                y: -70,
                opacity: 0,
                scale: 0.92,
                ease: "power1.inOut"
            }, 0)
            .to("#cinematic-footer-wrap", {
                y: 50,
                opacity: 0,
                ease: "power1.inOut"
            }, 0)
            // 2. Letters 'L' and 'OP' slide outward and fade away
            .to("#cin-letter-l", {
                x: "-35vw",
                opacity: 0,
                scale: 1.4,
                ease: "power1.inOut"
            }, 0)
            .to("#cin-letters-op", {
                x: "35vw",
                opacity: 0,
                scale: 1.4,
                ease: "power1.inOut"
            }, 0)
            .to("#zoom-video-glow", {
                opacity: 0,
                ease: "power1.inOut"
            }, 0)
            // 3. Video wrapper blooms from the 'O' capsule into fullscreen
            .to("#zoom-video-wrapper", {
                width: "100%",
                height: "100%",
                borderRadius: "0px",
                borderWidth: "0px",
                margin: "0px",
                x: 0,
                y: 0,
                ease: "power1.inOut"
            }, 0)
            // 4. Video scale normalizes to 1.0 (subtle parallax camera zoom)
            .to("#zoom-video-inner", {
                scale: 1.0,
                ease: "none"
            }, 0)
            // 5. Cinematic fullscreen caption overlay fades in as it reaches 100%
            .to("#cinematic-fullscreen-overlay", {
                opacity: 1,
                ease: "power2.out"
            }, 0.65);
    }

    // =========================================================================
    // 2. LOOP COFFEE DATABASE & MENU SYSTEM (PHASE 8, KARACHI)
    // =========================================================================

    const COFFEE_DATABASE = [
        {
            id: "espresso",
            name: "Espresso",
            category: "coffee",
            isSignature: false,
            hot: 150,
            iced: null,
            blended: null,
            img: "images/espresso_shot.png",
            desc: "Pure, intense double-shot extraction with thick golden crema",
            styleDefault: "hot"
        },
        {
            id: "americano",
            name: "Americano",
            category: "coffee",
            isSignature: false,
            hot: 200,
            iced: 250,
            blended: null,
            img: "images/6939a93a9153030338caec09_Pngtree_a_cup_of_coffee_next_12969733.webp",
            desc: "Rich double espresso lengthened with hot or iced mineral water",
            styleDefault: "iced"
        },
        {
            id: "latte",
            name: "Latte",
            category: "coffee",
            isSignature: false,
            hot: 300,
            iced: 350,
            blended: null,
            img: "images/694441294c257bda90e4b637_1_3.webp",
            desc: "Silky micro-foamed whole milk balanced with dark roasted espresso",
            styleDefault: "hot"
        },
        {
            id: "cappuccino",
            name: "Cappuccino",
            category: "coffee",
            isSignature: false,
            hot: 300,
            iced: 320,
            blended: 380,
            img: "images/6939a7c78f9823f316013df9_Pngtree_a_cup_of_steaming_latte_16241840.webp",
            desc: "Harmonious balance of espresso, steamed milk, and velvety dense foam",
            styleDefault: "hot"
        },
        {
            id: "loopy-latte",
            name: "Loopy Latte",
            category: "signature",
            isSignature: true,
            hot: 350,
            iced: 380,
            blended: 380,
            img: "images/iced_latte.png",
            desc: "Signature house specialty with toasted sweet caramel & cinnamon swirl",
            styleDefault: "iced"
        },
        {
            id: "very-vanilla",
            name: "Very Vanilla",
            category: "coffee",
            isSignature: false,
            hot: 350,
            iced: 380,
            blended: 400,
            img: "images/69444115b8cd61237881834d_1_2.webp",
            desc: "Madagascar Bourbon vanilla bean infused espresso & creamy textured milk",
            styleDefault: "iced"
        },
        {
            id: "caramel-macchiato",
            name: "Caramel Macchiato",
            category: "coffee",
            isSignature: false,
            hot: 350,
            iced: 380,
            blended: 380,
            img: "images/69452b9ff1abf88f8e4494f6_ccccc.webp",
            desc: "Steamed vanilla milk marked with dark espresso and golden caramel crosshatch",
            styleDefault: "iced"
        },
        {
            id: "hazelnut-heaven",
            name: "Hazelnut Heaven",
            category: "coffee",
            isSignature: false,
            hot: 350,
            iced: 380,
            blended: 300,
            img: "images/694441294c257bda90e4b637_1_3.webp",
            desc: "Roasted Italian hazelnut aroma layered over rich espresso froth",
            styleDefault: "hot"
        },
        {
            id: "coconut-creme",
            name: "Coconut Creme",
            category: "coffee",
            isSignature: false,
            hot: 350,
            iced: 360,
            blended: 500,
            img: "images/iced_latte.png",
            desc: "Tropical coconut velvet cream poured over chilled espresso extract",
            styleDefault: "iced"
        },
        {
            id: "caramel-popcorn",
            name: "Caramel Popcorn",
            category: "signature",
            isSignature: true,
            hot: 350,
            iced: 380,
            blended: 580,
            img: "images/694440de62f979e2eafcc284_1_1.webp",
            desc: "Buttery sweet caramel popcorn essence infused into artisanal cold brew",
            styleDefault: "blended"
        },
        {
            id: "mad-mocha",
            name: "Mad Mocha",
            category: "signature",
            isSignature: true,
            hot: 420,
            iced: 450,
            blended: 550,
            img: "images/69e10519356192fed713f633_76.webp",
            desc: "Decadent melted 70% Belgian chocolate combined with double espresso and sweet foam",
            styleDefault: "blended"
        },
        // MATCHAS
        {
            id: "matcha-plain",
            name: "Plain Matcha",
            category: "matcha",
            isSignature: false,
            hot: null,
            iced: 550,
            blended: null,
            img: "images/693a4b3cd2729cec7bfe18ea_image.webp",
            desc: "First harvest ceremonial grade Uji matcha whisked over chilled oat milk",
            styleDefault: "iced"
        },
        {
            id: "matcha-vanilla",
            name: "Vanilla Matcha",
            category: "matcha",
            isSignature: false,
            hot: null,
            iced: 550,
            blended: null,
            img: "images/693a4b3cd2729cec7bfe18ea_image.webp",
            desc: "Fragrant vanilla blossom essence infused with stone-ground Japanese matcha",
            styleDefault: "iced"
        },
        {
            id: "matcha-strawberry",
            name: "Strawberry Matcha",
            category: "matcha",
            isSignature: true,
            hot: null,
            iced: 550,
            blended: null,
            img: "images/693a4b3cd2729cec7bfe18ea_image.webp",
            desc: "House strawberry compote layered with sweet cream and vibrant iced matcha",
            styleDefault: "iced"
        },
        {
            id: "matcha-coconut",
            name: "Coconut Matcha",
            category: "matcha",
            isSignature: false,
            hot: null,
            iced: 580,
            blended: null,
            img: "images/693a4b3cd2729cec7bfe18ea_image.webp",
            desc: "Fresh coconut cream topped with iced ceremonial green tea froth",
            styleDefault: "iced"
        },
        {
            id: "matcha-loopy",
            name: "Loopy Matcha",
            category: "matcha",
            isSignature: true,
            hot: null,
            iced: 550,
            blended: null,
            img: "images/693a4b3cd2729cec7bfe18ea_image.webp",
            desc: "Our signature matcha cloud blend with sweet condensed cream",
            styleDefault: "iced"
        },
        // TEAS
        {
            id: "tea-peach",
            name: "Peach Iced Tea",
            category: "tea",
            isSignature: false,
            hot: null,
            iced: 300,
            blended: null,
            img: "images/69444115b8cd61237881834d_1_2.webp",
            desc: "Freshly brewed artisan black tea infused with crisp orchard peach nectar",
            styleDefault: "iced"
        },
        {
            id: "tea-passion",
            name: "Passion Fruit Iced Tea",
            category: "tea",
            isSignature: false,
            hot: null,
            iced: 300,
            blended: null,
            img: "images/69444115b8cd61237881834d_1_2.webp",
            desc: "Tangy tropical passion fruit elixir shaken with cold black tea",
            styleDefault: "iced"
        },
        {
            id: "tea-berries",
            name: "RedBerries Iced Tea",
            category: "tea",
            isSignature: false,
            hot: null,
            iced: 300,
            blended: null,
            img: "images/69444115b8cd61237881834d_1_2.webp",
            desc: "Wild raspberry, strawberry, and hibiscus tea over crushed ice",
            styleDefault: "iced"
        },
        // HOT CHOCOLATE
        {
            id: "choco-belgian",
            name: "Belgian Hot Chocolate",
            category: "chocolate",
            isSignature: false,
            hot: 500,
            iced: null,
            blended: null,
            img: "images/6939a7c78f9823f316013df9_Pngtree_a_cup_of_steaming_latte_16241840.webp",
            desc: "Melted premium Belgian cocoa ganache with velvety micro-textured whole milk",
            styleDefault: "hot"
        },
        {
            id: "choco-nutella",
            name: "Nutella Hot Chocolate",
            category: "chocolate",
            isSignature: true,
            hot: 500,
            iced: null,
            blended: null,
            img: "images/6939a7c78f9823f316013df9_Pngtree_a_cup_of_steaming_latte_16241840.webp",
            desc: "Rich Nutella hazelnut chocolate ganache with crushed roasted hazelnuts",
            styleDefault: "hot"
        }
    ];

    const EXTRAS_DATABASE = [
        {
            id: "extra-shot",
            name: "EXTRA ESPRESSO SHOT",
            price: 80,
            img: "images/espresso_shot.png"
        },
        {
            id: "oat-milk",
            name: "OAT MILK UPGRADE",
            price: 100,
            img: "images/6939a7c78f9823f316013df9_Pngtree_a_cup_of_steaming_latte_16241840.webp"
        },
        {
            id: "caramel-drizzle",
            name: "CARAMEL DRIZZLE",
            price: 60,
            img: "images/69452b9ff1abf88f8e4494f6_ccccc.webp"
        },
        {
            id: "whipped-cream",
            name: "WHIPPED CREAM",
            price: 50,
            img: "images/694441294c257bda90e4b637_1_3.webp"
        },
        {
            id: "fresh-croissant",
            name: "BUTTER CROISSANT",
            price: 250,
            img: "images/croissant.png"
        },
        {
            id: "hazelnut-syrup",
            name: "HAZELNUT SYRUP",
            price: 60,
            img: "images/694440de62f979e2eafcc284_1_1.webp"
        },
        {
            id: "belgian-cookie",
            name: "CHOCO COOKIE",
            price: 200,
            img: "images/693a67b2ce80efd5bd0d40f4_Group.webp"
        },
        {
            id: "extra-ice",
            name: "EXTRA ICE",
            price: 0,
            isFree: true,
            img: "images/69444115b8cd61237881834d_1_2.webp"
        }
    ];

    // =========================================================================
    // 3. CUSTOMIZER STATE & LOGIC
    // =========================================================================

    let currentCategory = "coffee";
    let currentDrinkId = "loopy-latte";
    let currentStyle = "iced";
    let selectedExtras = new Set();

    const CATEGORY_INFO = {
        coffee: {
            title: "Artisanal Coffees",
            badge: "11 Items Available",
            defaultDrink: "loopy-latte"
        },
        matcha: {
            title: "Ceremonial Iced Matcha",
            badge: "5 Items Available",
            defaultDrink: "matcha-strawberry"
        },
        tea: {
            title: "Refreshing Iced Teas",
            badge: "3 Items Available",
            defaultDrink: "tea-peach"
        },
        chocolate: {
            title: "Decadent Hot Chocolates",
            badge: "2 Items Available",
            defaultDrink: "choco-nutella"
        }
    };

    // DOM Elements
    const mainCategoryTabs = document.getElementById("main-category-tabs");
    const activeCategoryHeading = document.getElementById("active-category-heading");
    const activeCategoryBadge = document.getElementById("active-category-badge");
    const categoryDrinksList = document.getElementById("category-drinks-list");
    const extrasContainer = document.getElementById("extras-container");
    const showcaseHeroImage = document.getElementById("showcase-hero-image");
    const showcaseTag = document.getElementById("showcase-tag");
    const summaryDrinkTitle = document.getElementById("summary-drink-title");
    const summaryBasePrice = document.getElementById("summary-base-price");
    const summaryDrinkDesc = document.getElementById("summary-drink-desc");
    const summaryBreakdownList = document.getElementById("summary-breakdown-list");
    const totalPriceDisplay = document.getElementById("total-price-display");
    const styleHotBtn = document.getElementById("style-hot-btn");
    const styleIcedBtn = document.getElementById("style-iced-btn");
    const styleBlendedBtn = document.getElementById("style-blended-btn");
    const servingStyleWrapper = document.getElementById("serving-style-wrapper");

    // Modal elements
    const orderModalBackdrop = document.getElementById("order-modal-backdrop");
    const orderCoffeeBtn = document.getElementById("order-coffee-btn");
    const closeModalBtn = document.getElementById("close-modal-btn");
    const modalOrderItems = document.getElementById("modal-order-items");
    const modalTotalPrice = document.getElementById("modal-total-price");
    const sendWhatsappOrderBtn = document.getElementById("send-whatsapp-order-btn");
    const orderTypeBtns = document.querySelectorAll(".order-type-btn");
    let currentOrderType = "takeaway";

    function getDrink(id) {
        return COFFEE_DATABASE.find(d => d.id === id) || COFFEE_DATABASE[4]; // Default to Loopy Latte
    }

    function getDrinkPrice(drink, style) {
        if (style === "hot" && drink.hot !== null) return drink.hot;
        if (style === "iced" && drink.iced !== null) return drink.iced;
        if (style === "blended" && drink.blended !== null) return drink.blended;
        // Fallback to first available price
        return drink.hot || drink.iced || drink.blended || 380;
    }

    function renderCategoryDrinks() {
        if (!categoryDrinksList) return;
        categoryDrinksList.innerHTML = "";

        const drinks = COFFEE_DATABASE.filter(d => {
            if (currentCategory === "coffee") return d.category === "coffee" || d.category === "signature";
            return d.category === currentCategory;
        });

        drinks.forEach(drink => {
            const card = document.createElement("div");
            const isActive = drink.id === currentDrinkId;
            card.className = `menu-item-card ${isActive ? "active" : ""}`;
            card.dataset.id = drink.id;

            // Generate price badges
            let priceTagsHtml = "";
            if (drink.hot !== null && drink.iced !== null && drink.blended !== null) {
                priceTagsHtml = `
                    <div class="flex items-center gap-2 mt-1.5 flex-wrap">
                        <span class="text-[11px] font-semibold text-stone-400 bg-[#16120E] px-2 py-0.5 rounded border border-[#2D221A]">Hot <span class="text-white font-bold">Rs.${drink.hot}</span></span>
                        <span class="text-[11px] font-semibold text-[#D48B38] bg-[#16120E] px-2 py-0.5 rounded border border-[#3A2A1E]">Iced <span class="text-[#F8B715] font-bold">Rs.${drink.iced}</span></span>
                        <span class="text-[11px] font-semibold text-amber-300 bg-[#16120E] px-2 py-0.5 rounded border border-[#2D221A]">Blended <span class="text-white font-bold">Rs.${drink.blended}</span></span>
                    </div>
                `;
            } else if (drink.hot !== null && drink.iced !== null) {
                priceTagsHtml = `
                    <div class="flex items-center gap-2 mt-1.5 flex-wrap">
                        <span class="text-[11px] font-semibold text-stone-400 bg-[#16120E] px-2 py-0.5 rounded border border-[#2D221A]">Hot <span class="text-white font-bold">Rs.${drink.hot}</span></span>
                        <span class="text-[11px] font-semibold text-[#D48B38] bg-[#16120E] px-2 py-0.5 rounded border border-[#3A2A1E]">Iced <span class="text-[#F8B715] font-bold">Rs.${drink.iced}</span></span>
                    </div>
                `;
            } else {
                const singlePrice = drink.hot || drink.iced || drink.blended || 380;
                const tempLabel = drink.hot ? "Hot" : "Iced";
                priceTagsHtml = `
                    <div class="mt-1.5">
                        <span class="text-xs font-bold text-[#F8B715] bg-[#16120E] px-2.5 py-0.5 rounded border border-[#3A2A1E]">${tempLabel} · Rs. ${singlePrice}</span>
                    </div>
                `;
            }

            card.innerHTML = `
                <div class="menu-item-card-thumb">
                    <img src="${drink.img}" alt="${drink.name}" loading="lazy" />
                </div>
                <div class="flex-1 min-w-0 pr-6">
                    <div class="flex items-center gap-2">
                        <h4 class="text-sm md:text-base font-bold text-white uppercase tracking-tight truncate" style="font-family: 'Montserrat', sans-serif;">${drink.name}</h4>
                    </div>
                    <p class="text-[11px] text-[#9E9085] mt-0.5 line-clamp-1">${drink.desc}</p>
                    ${priceTagsHtml}
                </div>
                ${drink.isSignature ? '<span class="menu-item-card-badge">★ FAV</span>' : ''}
            `;

            card.addEventListener("click", () => {
                selectDrink(drink.id);
            });

            categoryDrinksList.appendChild(card);
        });
    }

    function renderExtrasCards() {
        if (!extrasContainer) return;
        extrasContainer.innerHTML = "";

        EXTRAS_DATABASE.forEach(extra => {
            const card = document.createElement("div");
            const isActive = selectedExtras.has(extra.id);
            card.className = `extra-card ${isActive ? "active" : ""}`;
            card.dataset.id = extra.id;

            card.innerHTML = `
                <div class="extra-card-thumb">
                    <img src="${extra.img}" alt="${extra.name}" loading="lazy" />
                    <div class="extra-card-check">✓</div>
                </div>
                <div class="flex-1 min-w-0">
                    <div class="text-xs font-bold text-white uppercase tracking-wide truncate">${extra.name}</div>
                    <div class="text-xs font-semibold ${extra.isFree ? 'text-emerald-400' : 'text-[#D48B38]'} mt-0.5">
                        ${extra.isFree ? 'FREE' : '+Rs. ' + extra.price}
                    </div>
                </div>
            `;

            card.addEventListener("click", () => {
                toggleExtra(extra.id);
            });

            extrasContainer.appendChild(card);
        });
    }

    function updateServingStyleButtons(drink) {
        const hasHot = drink.hot !== null;
        const hasIced = drink.iced !== null;
        const hasBlended = drink.blended !== null;

        // If only 1 style is available and drink is Matcha/Tea/Choco, show or simplify
        const availableStylesCount = [hasHot, hasIced, hasBlended].filter(Boolean).length;

        if (styleHotBtn) {
            styleHotBtn.style.display = hasHot ? "inline-flex" : "none";
            styleHotBtn.classList.toggle("active", currentStyle === "hot");
            if (hasHot) styleHotBtn.innerHTML = `<span>🔥</span> Hot <span class="text-[10px] opacity-80">(Rs.${drink.hot})</span>`;
        }
        if (styleIcedBtn) {
            styleIcedBtn.style.display = hasIced ? "inline-flex" : "none";
            styleIcedBtn.classList.toggle("active", currentStyle === "iced");
            if (hasIced) styleIcedBtn.innerHTML = `<span>🧊</span> Iced <span class="text-[10px] opacity-80">(Rs.${drink.iced})</span>`;
        }
        if (styleBlendedBtn) {
            styleBlendedBtn.style.display = hasBlended ? "inline-flex" : "none";
            styleBlendedBtn.classList.toggle("active", currentStyle === "blended");
            if (hasBlended) styleBlendedBtn.innerHTML = `<span>🥤</span> Blended <span class="text-[10px] opacity-80">(Rs.${drink.blended})</span>`;
        }

        // If current style is not supported, fallback to available one
        if (currentStyle === "hot" && !hasHot) {
            currentStyle = hasIced ? "iced" : (hasBlended ? "blended" : "hot");
        } else if (currentStyle === "iced" && !hasIced) {
            currentStyle = hasHot ? "hot" : (hasBlended ? "blended" : "iced");
        } else if (currentStyle === "blended" && !hasBlended) {
            currentStyle = hasIced ? "iced" : (hasHot ? "hot" : "blended");
        }
    }

    function updateCustomizerUI() {
        const drink = getDrink(currentDrinkId);
        const basePrice = getDrinkPrice(drink, currentStyle);

        // Update Serving Style Buttons
        updateServingStyleButtons(drink);

        // Update Showcase Image with smooth transition
        if (showcaseHeroImage) {
            if (showcaseHeroImage.src !== drink.img) {
                showcaseHeroImage.classList.add("fade-out");
                setTimeout(() => {
                    showcaseHeroImage.src = drink.img;
                    showcaseHeroImage.classList.remove("fade-out");
                }, 150);
            }
        }

        // Update Tag
        if (showcaseTag) {
            showcaseTag.textContent = `${drink.name} · ${currentStyle.toUpperCase()}`;
        }

        // Update Drink Details
        if (summaryDrinkTitle) summaryDrinkTitle.textContent = `${drink.name} · ${currentStyle.toUpperCase()}`;
        if (summaryBasePrice) summaryBasePrice.textContent = `Rs. ${basePrice}`;
        if (summaryDrinkDesc) summaryDrinkDesc.textContent = drink.desc;

        // Build itemized breakdown lines
        if (summaryBreakdownList) {
            summaryBreakdownList.innerHTML = "";

            // Primary line
            const primaryLine = document.createElement("div");
            primaryLine.className = "summary-line-item primary";
            primaryLine.innerHTML = `
                <span>${drink.name} (${currentStyle.toUpperCase()})</span>
                <span class="text-[#D48B38]">Rs. ${basePrice}</span>
            `;
            summaryBreakdownList.appendChild(primaryLine);

            // Extras lines
            selectedExtras.forEach(extraId => {
                const extra = EXTRAS_DATABASE.find(e => e.id === extraId);
                if (extra) {
                    const extraLine = document.createElement("div");
                    extraLine.className = "summary-line-item";
                    extraLine.innerHTML = `
                        <span>+ ${extra.name}</span>
                        <span class="${extra.isFree ? 'text-emerald-400' : 'text-[#D48B38]'}">${extra.isFree ? 'FREE' : '+Rs. ' + extra.price}</span>
                    `;
                    summaryBreakdownList.appendChild(extraLine);
                }
            });
        }

        // Calculate Total
        let extrasTotal = 0;
        selectedExtras.forEach(extraId => {
            const extra = EXTRAS_DATABASE.find(e => e.id === extraId);
            if (extra && !extra.isFree) extrasTotal += extra.price;
        });

        const grandTotal = basePrice + extrasTotal;
        if (totalPriceDisplay) {
            totalPriceDisplay.textContent = `Rs. ${grandTotal}`;
        }

        // Highlight active card in left list
        document.querySelectorAll(".menu-item-card").forEach(card => {
            card.classList.toggle("active", card.dataset.id === currentDrinkId);
        });

        // Highlight active extras
        document.querySelectorAll(".extra-card").forEach(card => {
            card.classList.toggle("active", selectedExtras.has(card.dataset.id));
        });
    }

    function selectCategory(category) {
        currentCategory = category;
        const info = CATEGORY_INFO[category] || CATEGORY_INFO.coffee;

        // Update Tab active states
        if (mainCategoryTabs) {
            mainCategoryTabs.querySelectorAll(".header-cat-tab").forEach(tab => {
                tab.classList.toggle("active", tab.dataset.category === category);
            });
        }

        // Update category headers
        if (activeCategoryHeading) activeCategoryHeading.textContent = info.title;
        if (activeCategoryBadge) activeCategoryBadge.textContent = info.badge;

        // Find default drink for this category
        const targetDrink = getDrink(info.defaultDrink);
        if (targetDrink) {
            currentDrinkId = targetDrink.id;
            currentStyle = targetDrink.styleDefault || "iced";
        }

        // Render drinks list & update UI
        renderCategoryDrinks();
        updateCustomizerUI();
    }

    function selectDrink(drinkId) {
        currentDrinkId = drinkId;
        const drink = getDrink(drinkId);
        if (drink && drink.styleDefault) {
            currentStyle = drink.styleDefault;
        }
        updateCustomizerUI();
    }

    function toggleExtra(extraId) {
        if (selectedExtras.has(extraId)) {
            selectedExtras.delete(extraId);
        } else {
            selectedExtras.add(extraId);
        }
        updateCustomizerUI();
    }

    // Event listeners for style buttons
    if (styleHotBtn) {
        styleHotBtn.addEventListener("click", () => {
            currentStyle = "hot";
            updateCustomizerUI();
        });
    }
    if (styleIcedBtn) {
        styleIcedBtn.addEventListener("click", () => {
            currentStyle = "iced";
            updateCustomizerUI();
        });
    }
    if (styleBlendedBtn) {
        styleBlendedBtn.addEventListener("click", () => {
            currentStyle = "blended";
            updateCustomizerUI();
        });
    }

    // Header 4 Category Tabs listener
    if (mainCategoryTabs) {
        mainCategoryTabs.querySelectorAll(".header-cat-tab").forEach(tab => {
            tab.addEventListener("click", () => {
                const cat = tab.dataset.category || "coffee";
                selectCategory(cat);
            });
        });
    }

    // =========================================================================
    // 4. FULL MENU BOARD RENDERING (ALL 4 CATEGORIES FROM PHOTO)
    // =========================================================================

    function renderFullMenuBoard() {
        // 1. Coffees list
        const menuCoffeesList = document.getElementById("menu-coffees-list");
        if (menuCoffeesList) {
            menuCoffeesList.innerHTML = "";
            const coffeeItems = COFFEE_DATABASE.filter(d => d.category === "coffee" || d.category === "signature");

            coffeeItems.forEach(item => {
                const row = document.createElement("div");
                row.className = "menu-table-row";
                row.innerHTML = `
                    <div>
                        <div class="font-bold text-white flex items-center gap-1.5">
                            <span>${item.name}</span>
                            ${item.isSignature ? '<span class="text-[9px] px-1.5 py-0.2 rounded bg-[#D48B38]/20 text-[#F8B715] border border-[#D48B38]/30">LOOP FAV</span>' : ''}
                        </div>
                    </div>
                    <div class="text-center font-semibold text-stone-300 text-xs">${item.hot ? 'Rs. ' + item.hot : '—'}</div>
                    <div class="text-center font-semibold text-[#D48B38] text-xs">${item.iced ? 'Rs. ' + item.iced : '—'}</div>
                    <div class="text-center font-semibold text-amber-300 text-xs">${item.blended ? 'Rs. ' + item.blended : '—'}</div>
                    <div class="text-right">
                        <button class="quick-add-btn" data-id="${item.id}">+ Craft</button>
                    </div>
                `;
                menuCoffeesList.appendChild(row);
            });
        }

        // 2. Iced Matcha list
        const menuMatchaList = document.getElementById("menu-matcha-list");
        if (menuMatchaList) {
            menuMatchaList.innerHTML = "";
            const matchaItems = COFFEE_DATABASE.filter(d => d.category === "matcha");

            matchaItems.forEach(item => {
                const row = document.createElement("div");
                row.className = "flex items-center justify-between p-2.5 rounded-lg bg-[#14100E] border border-[#241B15] hover:border-[#382B21] transition-all";
                row.innerHTML = `
                    <div class="flex items-center gap-3">
                        <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                        <div>
                            <div class="text-sm font-bold text-white">${item.name}</div>
                            <div class="text-[10px] text-[#9E9085]">Iced Ceremonial Matcha</div>
                        </div>
                    </div>
                    <div class="flex items-center gap-3">
                        <span class="text-sm font-bold text-emerald-400">Rs. ${item.iced}</span>
                        <button class="quick-add-btn" data-id="${item.id}">+ Craft</button>
                    </div>
                `;
                menuMatchaList.appendChild(row);
            });
        }

        // 3. Iced Tea list
        const menuTeaList = document.getElementById("menu-tea-list");
        if (menuTeaList) {
            menuTeaList.innerHTML = "";
            const teaItems = COFFEE_DATABASE.filter(d => d.category === "tea");

            teaItems.forEach(item => {
                const row = document.createElement("div");
                row.className = "flex items-center justify-between p-2.5 rounded-lg bg-[#14100E] border border-[#241B15] hover:border-[#382B21] transition-all";
                row.innerHTML = `
                    <div class="flex items-center gap-3">
                        <span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                        <div>
                            <div class="text-sm font-bold text-white">${item.name}</div>
                            <div class="text-[10px] text-[#9E9085]">Chilled Artisan Brew</div>
                        </div>
                    </div>
                    <div class="flex items-center gap-3">
                        <span class="text-sm font-bold text-amber-400">Rs. ${item.iced}</span>
                        <button class="quick-add-btn" data-id="${item.id}">+ Craft</button>
                    </div>
                `;
                menuTeaList.appendChild(row);
            });
        }

        // 4. Hot Chocolate list
        const menuChocoList = document.getElementById("menu-choco-list");
        if (menuChocoList) {
            menuChocoList.innerHTML = "";
            const chocoItems = COFFEE_DATABASE.filter(d => d.category === "chocolate");

            chocoItems.forEach(item => {
                const row = document.createElement("div");
                row.className = "flex items-center justify-between p-3 rounded-lg bg-[#14100E] border border-[#241B15] hover:border-[#382B21] transition-all";
                row.innerHTML = `
                    <div class="flex items-center gap-3">
                        <span class="w-1.5 h-1.5 rounded-full bg-[#D48B38]"></span>
                        <div>
                            <div class="text-sm font-bold text-white">${item.name}</div>
                            <div class="text-[10px] text-[#9E9085]">${item.desc}</div>
                        </div>
                    </div>
                    <div class="flex items-center gap-3">
                        <span class="text-sm font-bold text-[#F8B715]">Rs. ${item.hot}</span>
                        <button class="quick-add-btn" data-id="${item.id}">+ Craft</button>
                    </div>
                `;
                menuChocoList.appendChild(row);
            });
        }

        // Quick add buttons event delegation
        document.querySelectorAll(".quick-add-btn").forEach(btn => {
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                const drinkId = btn.dataset.id;
                const drink = getDrink(drinkId);
                if (drink) {
                    const cat = (drink.category === "signature" || drink.category === "coffee") ? "coffee" : drink.category;
                    selectCategory(cat);
                    selectDrink(drinkId);
                }
                const customizerSection = document.getElementById("loop-customizer");
                if (customizerSection) {
                    customizerSection.scrollIntoView({ behavior: "smooth" });
                }
            });
        });
    }

    // =========================================================================
    // 5. ORDER MODAL & WHATSAPP INTEGRATION
    // =========================================================================

    function openOrderModal() {
        const drink = getDrink(currentDrinkId);
        const basePrice = getDrinkPrice(drink, currentStyle);

        let extrasTotal = 0;
        let extrasListText = [];

        if (modalOrderItems) {
            modalOrderItems.innerHTML = "";

            const primary = document.createElement("div");
            primary.className = "flex justify-between text-white font-semibold";
            primary.innerHTML = `<span>1x ${drink.name} (${currentStyle.toUpperCase()})</span> <span>Rs. ${basePrice}</span>`;
            modalOrderItems.appendChild(primary);

            selectedExtras.forEach(extraId => {
                const extra = EXTRAS_DATABASE.find(e => e.id === extraId);
                if (extra) {
                    if (!extra.isFree) extrasTotal += extra.price;
                    extrasListText.push(extra.name);

                    const extRow = document.createElement("div");
                    extRow.className = "flex justify-between text-[#9E9085]";
                    extRow.innerHTML = `<span>+ ${extra.name}</span> <span>${extra.isFree ? 'FREE' : '+Rs. ' + extra.price}</span>`;
                    modalOrderItems.appendChild(extRow);
                }
            });
        }

        const grandTotal = basePrice + extrasTotal;
        if (modalTotalPrice) modalTotalPrice.textContent = `Rs. ${grandTotal}`;

        if (orderModalBackdrop) {
            orderModalBackdrop.classList.add("open");
        }
    }

    function closeOrderModal() {
        if (orderModalBackdrop) {
            orderModalBackdrop.classList.remove("open");
        }
    }

    if (orderCoffeeBtn) {
        orderCoffeeBtn.addEventListener("click", openOrderModal);
    }
    if (closeModalBtn) {
        closeModalBtn.addEventListener("click", closeOrderModal);
    }
    if (orderModalBackdrop) {
        orderModalBackdrop.addEventListener("click", (e) => {
            if (e.target === orderModalBackdrop) closeOrderModal();
        });
    }

    // Order type buttons (Takeaway vs Dine-In)
    orderTypeBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            orderTypeBtns.forEach(b => {
                b.classList.remove("active", "bg-[#241B15]", "border-[#D48B38]", "text-[#F8B715]");
                b.classList.add("bg-[#14100E]", "border-[#2E241D]", "text-[#9E9085]");
            });
            btn.classList.add("active", "bg-[#241B15]", "border-[#D48B38]", "text-[#F8B715]");
            btn.classList.remove("bg-[#14100E]", "border-[#2E241D]", "text-[#9E9085]");
            currentOrderType = btn.dataset.type || "takeaway";
        });
    });

    // Send WhatsApp Order
    if (sendWhatsappOrderBtn) {
        sendWhatsappOrderBtn.addEventListener("click", () => {
            const drink = getDrink(currentDrinkId);
            const basePrice = getDrinkPrice(drink, currentStyle);
            const custName = document.getElementById("order-cust-name")?.value.trim() || "Valued Customer";
            const custPhone = document.getElementById("order-cust-phone")?.value.trim() || "N/A";

            let extrasSummary = [];
            let extrasTotal = 0;
            selectedExtras.forEach(extraId => {
                const extra = EXTRAS_DATABASE.find(e => e.id === extraId);
                if (extra) {
                    if (!extra.isFree) extrasTotal += extra.price;
                    extrasSummary.push(`${extra.name} (${extra.isFree ? 'FREE' : 'Rs.' + extra.price})`);
                }
            });

            const grandTotal = basePrice + extrasTotal;

            const message = `*☕ NEW ORDER — LOOP COFFEE (PHASE 8, KARACHI)*\n\n` +
                `*Customer Name:* ${custName}\n` +
                `*Phone:* ${custPhone}\n` +
                `*Order Type:* ${currentOrderType === 'takeaway' ? 'Takeaway (Phase 8)' : 'Dine-In'}\n\n` +
                `*Item:* ${drink.name} (${currentStyle.toUpperCase()}) — Rs. ${basePrice}\n` +
                (extrasSummary.length > 0 ? `*Extras:* \n- ${extrasSummary.join('\n- ')}\n` : '') +
                `\n*TOTAL BILL:* Rs. ${grandTotal}/-\n\n` +
                `_Sent via Coffee Loop Karachi Web App_`;

            const phone = "923000000000"; // Official Phase 8 Loop Coffee contact
            const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
            window.open(waUrl, "_blank");
            closeOrderModal();
        });
    }

    // =========================================================================
    // 6. GSAP SCROLL ANIMATIONS FOR NEW SECTIONS
    // =========================================================================

    if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
        gsap.from("#loop-customizer .step-tag, #loop-customizer h2, #loop-customizer p", {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
                trigger: "#loop-customizer",
                start: "top 80%"
            }
        });

        gsap.from(".showcase-display", {
            x: 40,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
                trigger: "#loop-customizer",
                start: "top 70%"
            }
        });

        gsap.from("#loop-full-menu .menu-board-container", {
            y: 40,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: "#loop-full-menu",
                start: "top 80%"
            }
        });
    }

    // =========================================================================
    // 7. INITIALIZE EVERYTHING
    // =========================================================================
    renderCategoryDrinks();
    renderExtrasCards();
    renderFullMenuBoard();
    updateCustomizerUI();

});

