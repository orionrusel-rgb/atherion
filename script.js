(function () {
            const scrollProxy = document.getElementById('scroll-proxy');
            const continuousWorld = document.getElementById('continuous-world');
            const cameraViewport = document.getElementById('camera-viewport');
            const ambientStage = document.querySelector('.ambient-stage');
            const topNavbar = document.getElementById('top-navbar');
            const heroTitle = document.getElementById('parallax-hero-title');
            const farMountains = document.getElementById('parallax-far-mountains');
            const midMountain = document.getElementById('parallax-mid-mountain');
            const beamLine1 = document.getElementById('beam-line-1');
            const beamLine2 = document.getElementById('beam-line-2');
            const beamGlowRect = document.getElementById('beam-glow-rect');

            // Scene 5 Multi-Layer Mountain & Sunset Parallax Elements
            const s5ParallaxSun = document.getElementById('s5-parallax-sun');
            const s5ParallaxClouds = document.getElementById('s5-parallax-clouds');
            const s5ParallaxMidMtn = document.getElementById('s5-parallax-mid-mountain');
            const s5ParallaxRightMtn = document.getElementById('s5-parallax-right-mountain');
            const s5ParallaxLeftRocks = document.getElementById('s5-parallax-left-rocks');

            // Differential Foreground Parallax Groups
            const fgScene2Scientist = document.getElementById('fg-scene2-scientist');
            const fgScene3Operators = document.getElementById('fg-scene3-operators');
            const fgScene4Orbs = document.getElementById('fg-scene4-orbs');
            const fgScene4Scientist = document.getElementById('fg-scene4-scientist');

            // Text Containers
            const textScene2 = document.getElementById('text-scene-2');
            const textScene3 = document.getElementById('text-scene-3');
            const textScene4 = document.getElementById('text-scene-4');
            const textScene5 = document.getElementById('text-scene-5');

            // Navigation Pills
            const navPillBtns = document.querySelectorAll('.nav-pill-btn[data-nav-scene]');

            // Interactive Feature States (Triggered by Scene Buttons!)
            let isMolecularTracerActive = false;
            let isTurbineOverdrive = false;
            let plasmaSurgeIntensity = 0;
            let horizonAuroraBoost = 0;
            let mountainRelayBoost = 0;

            // =====================================================================
            // UNIVERSAL TACTILE BUTTON RIPPLE & INTERACTIVE 3D CARD SPOTLIGHT
            // =====================================================================
            document.addEventListener('click', function (e) {
                const btn = e.target.closest('button');
                if (!btn) return;

                const rect = btn.getBoundingClientRect();
                const ripple = document.createElement('span');
                const size = Math.max(rect.width, rect.height);
                ripple.className = 'btn-click-ripple';
                ripple.style.width = ripple.style.height = `${size}px`;
                ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
                ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

                // Ensure relative/overflow container for ripple
                const computedPos = window.getComputedStyle(btn).position;
                if (computedPos === 'static') btn.style.position = 'relative';
                btn.style.overflow = 'hidden';

                btn.appendChild(ripple);
                setTimeout(() => ripple.remove(), 650);
            });

            // Interactive Spotlight & Subtle 3D Tilt on All Cyber-Glass Cards
            const glassCards = document.querySelectorAll('.cyber-glass-card');
            glassCards.forEach((card) => {
                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    card.style.setProperty('--spot-x', `${x}px`);
                    card.style.setProperty('--spot-y', `${y}px`);
                });
            });

            // Toast helper
            let toastTimer = null;
            window.triggerToast = function (msg) {
                const toast = document.getElementById('live-action-toast');
                const msgEl = document.getElementById('toast-message');
                if (!toast || !msgEl) return;
                msgEl.textContent = msg;
                toast.classList.remove('opacity-0', 'translate-y-3');
                toast.classList.add('opacity-100', 'translate-y-0');
                clearTimeout(toastTimer);
                toastTimer = setTimeout(() => {
                    toast.classList.remove('opacity-100', 'translate-y-0');
                    toast.classList.add('opacity-0', 'translate-y-3');
                }, 2900);
            };

            // Animated Number Counter Helper for Telemetry Readouts
            function animateMetricValue(el, startVal, endVal, suffix, decimals = 0) {
                if (!el) return;
                const duration = 650;
                const startTime = performance.now();
                function step(now) {
                    const p = Math.min(1, (now - startTime) / duration);
                    const eased = 1 - Math.pow(1 - p, 3);
                    const val = startVal + (endVal - startVal) * eased;
                    el.textContent = decimals > 0
                        ? val.toFixed(decimals) + suffix
                        : Math.round(val).toLocaleString() + suffix;
                    if (p < 1) requestAnimationFrame(step);
                }
                requestAnimationFrame(step);
            }

            // Scene 1 Button Action: Pulse Solar-Mountain Relay
            window.pulseMountainRelay = function () {
                mountainRelayBoost = 1.0;
                if (beamGlowRect) {
                    beamGlowRect.setAttribute('opacity', '0.98');
                    setTimeout(() => beamGlowRect.setAttribute('opacity', '0.28'), 1300);
                }
                spawnWorldBurst(955, 340, '255, 238, 155', 28);
                triggerToast('⚡ Solar-Mountain Relay Pulsed: +140 MW Surged to Upper Cascade');
            };

            // Scene 2 Button Action: Toggle Molecular Tracer in Waterfall
            window.toggleMolecularTracer = function () {
                isMolecularTracerActive = !isMolecularTracerActive;
                const badge = document.getElementById('lab-tracer-badge');
                const flowEl = document.getElementById('metric-flow-rate');
                const purityEl = document.getElementById('metric-purity');
                const btn = document.getElementById('btn-tracer');

                spawnWorldBurst(720, 1380, isMolecularTracerActive ? '255, 224, 115' : '125, 232, 255', 36);

                if (isMolecularTracerActive) {
                    badge.textContent = 'TRACER: ACTIVE ION STREAM';
                    badge.className = 'text-[9px] sm:text-[10px] font-mono text-amber-200 bg-amber-500/25 px-2.5 py-1 rounded-full border border-amber-300/50 animate-pulse';
                    animateMetricValue(flowEl, 42800, 48950, ' L/s', 0);
                    animateMetricValue(purityEl, 99.94, 99.99, '%', 2);
                    btn.textContent = '✨ Tracer Active (Reset)';
                    triggerToast('🧪 Golden Molecular Tracer Injected into Waterfall Stream!');
                } else {
                    badge.textContent = 'TRACER: STANDBY';
                    badge.className = 'text-[9px] sm:text-[10px] font-mono text-purple-200/80 bg-white/5 px-2.5 py-1 rounded-full border border-white/10';
                    animateMetricValue(flowEl, 48950, 42800, ' L/s', 0);
                    animateMetricValue(purityEl, 99.99, 99.94, '%', 2);
                    btn.textContent = '🧪 Inject Molecular Tracer';
                    triggerToast('Hydro-Molecular Tracer Returned to Standby.');
                }
            };

            // Scene 3 Button Action: Toggle Hydro-Turbine Overdrive (2.5x Spin Speed)
            window.toggleTurbineOverdrive = function () {
                isTurbineOverdrive = !isTurbineOverdrive;
                const wheel = document.querySelector('.hydro-wheel-spin');
                const badge = document.getElementById('turbine-mode-badge');
                const mwEl = document.getElementById('metric-megawatts');
                const btn = document.getElementById('btn-turbine-overdrive');

                spawnWorldBurst(368, 2285, '232, 121, 249', 42);

                if (isTurbineOverdrive) {
                    if (wheel) wheel.classList.add('overdrive-spin');
                    badge.textContent = 'OVERDRIVE: 60 RPM';
                    badge.className = 'text-[9px] sm:text-[10px] font-mono text-fuchsia-200 bg-fuchsia-500/30 px-2.5 py-1 rounded-full border border-fuchsia-300/60 animate-pulse';
                    animateMetricValue(mwEl, 840, 1420, ' MW', 0);
                    btn.textContent = '⚡ Overdrive Engaged (Normal)';
                    triggerToast('🌀 Kinetic Hydro-Turbine Overdrive Engaged: Output Boosted to 1,420 MW!');
                } else {
                    if (wheel) wheel.classList.remove('overdrive-spin');
                    badge.textContent = 'NOMINAL 24 RPM';
                    badge.className = 'text-[9px] sm:text-[10px] font-mono text-emerald-300 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-400/30';
                    animateMetricValue(mwEl, 1420, 840, ' MW', 0);
                    btn.textContent = '🌀 Boost Turbine Overdrive (2.5x)';
                    triggerToast('Kinetic Turbine Restored to Nominal 24 RPM.');
                }
            };

            // Scene 4 Button Action: Ignite Geothermal Plasma Core Surge
            window.triggerPlasmaSurge = function () {
                plasmaSurgeIntensity = 1.0;
                const badge = document.getElementById('plasma-temp-badge');
                badge.textContent = 'SURGE: 6,850 K';
                badge.className = 'text-[9px] sm:text-[10px] font-mono text-white bg-rose-500/40 px-2.5 py-1 rounded-full border border-amber-200 animate-pulse';
                spawnWorldBurst(1009, 3410, '255, 165, 65', 48);
                triggerToast('🔥 Triple-Column Geothermal Plasma Surge Ignited (6,850 K)!');
                setTimeout(() => {
                    badge.textContent = 'CORE: 4,200 K';
                    badge.className = 'text-[9px] sm:text-[10px] font-mono text-amber-300 bg-amber-500/15 px-2.5 py-1 rounded-full border border-amber-400/30';
                }, 3200);
            };

            // Scene 5 Button Action: Trigger Horizon Aurora, Solar Shimmer & Bird Flock
            const DynamicBirds = [];
            window.triggerHorizonAurora = function () {
                horizonAuroraBoost = 1.0;
                const statusEl = document.getElementById('biosphere-status-text');
                if (statusEl) {
                    statusEl.textContent = '✨ Solar Biosphere Synchronized • 2.48 GW Clean Baseload • 0.00% Thermal Pollution';
                }
                // Spawn animated bird flock flying across the sunset cavern bay
                for (let i = 0; i < 7; i++) {
                    DynamicBirds.push({
                        x: 180 + Math.random() * 140,
                        y: 3960 + Math.random() * 150,
                        vx: 1.4 + Math.random() * 1.1,
                        vy: -0.25 - Math.random() * 0.35,
                        wingPhase: Math.random() * Math.PI * 2,
                        size: 6 + Math.random() * 4,
                        life: 1.0
                    });
                }
                spawnWorldBurst(468, 4238, '255, 242, 165', 38);
                triggerToast('🌅 Biosphere Solar Horizon Pulsed — Coastal Flock & Aurora Activated!');
            };

            // Specs Modal Controls
            window.openSpecsModal = function (tab) {
                const modal = document.getElementById('specs-modal');
                if (tab) switchSpecsTab(tab);
                modal.classList.remove('hidden');
                modal.classList.add('flex');
            };

            window.closeSpecsModal = function () {
                const modal = document.getElementById('specs-modal');
                modal.classList.add('hidden');
                modal.classList.remove('flex');
            };

            window.switchSpecsTab = function (tab) {
                const stratum = document.getElementById('spec-stratum');
                const output = document.getElementById('spec-output');
                const bar = document.getElementById('spec-bar-1');
                if (tab === 'lab') {
                    stratum.textContent = 'Level 02 — Hydro-Molecular Lab (-320m)';
                    output.textContent = isMolecularTracerActive ? '48,950 L/s (Ion Tracer)' : '42,800 L/s Ionized Cascade';
                    bar.style.width = '92%';
                } else if (tab === 'turbine') {
                    stratum.textContent = 'Level 03 — Kinetic Turbine Core (-780m)';
                    output.textContent = isTurbineOverdrive ? '1,420 MW (Overdrive)' : '840 MW Nominal';
                    bar.style.width = isTurbineOverdrive ? '100%' : '86%';
                } else if (tab === 'plasma') {
                    stratum.textContent = 'Level 04 — Geothermal Plasma Core (-1,450m)';
                    output.textContent = '3.60 GW Thermal Synthesis';
                    bar.style.width = '98%';
                }
            };

            // =====================================================================
            // INTERACTIVE MOUSE & TOUCH TRACKING (BOTH VIEWPORT & WORLD SPACE)
            // =====================================================================
            let pointerX = 0;
            let pointerY = 0;
            let smoothPointerX = 0;
            let smoothPointerY = 0;
            let worldCursorX = -9999;
            let worldCursorY = -9999;
            let isCursorInsideViewport = false;

            function updateCursorCoordinates(clientX, clientY) {
                pointerX = (clientX / window.innerWidth - 0.5) * 2;
                pointerY = (clientY / window.innerHeight - 0.5) * 2;

                if (ambientStage) {
                    ambientStage.style.setProperty('--mouse-x', pointerX.toFixed(3));
                    ambientStage.style.setProperty('--mouse-y', pointerY.toFixed(3));
                }

                if (cameraViewport) {
                    const rect = cameraViewport.getBoundingClientRect();
                    if (
                        clientX >= rect.left &&
                        clientX <= rect.right &&
                        clientY >= rect.top &&
                        clientY <= rect.bottom
                    ) {
                        isCursorInsideViewport = true;
                        const relX = (clientX - rect.left) / rect.width;
                        const relY = (clientY - rect.top) / rect.height;
                        worldCursorX = relX * 1440;
                        worldCursorY = (currentProgress * 900) + relY * 900;
                    } else {
                        isCursorInsideViewport = false;
                    }
                }
            }

            window.addEventListener('mousemove', function (e) {
                updateCursorCoordinates(e.clientX, e.clientY);
            }, { passive: true });

            window.addEventListener('touchmove', function (e) {
                if (e.touches && e.touches.length > 0) {
                    updateCursorCoordinates(e.touches[0].clientX, e.touches[0].clientY);
                }
            }, { passive: true });

            // =====================================================================
            // INTERACTIVE AMBIENT BACKGROUND CANVAS (Aurora Orbs & Floating Motes)
            // =====================================================================
            const bgCanvas = document.getElementById('ambient-bg-canvas');
            const bgCtx = bgCanvas ? bgCanvas.getContext('2d') : null;
            const bgParticles = [];

            function resizeBgCanvas() {
                if (!bgCanvas) return;
                bgCanvas.width = window.innerWidth;
                bgCanvas.height = window.innerHeight;
            }
            resizeBgCanvas();
            window.addEventListener('resize', resizeBgCanvas);

            for (let i = 0; i < 42; i++) {
                bgParticles.push({
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                    r: 1.2 + Math.random() * 3.5,
                    vx: (Math.random() - 0.5) * 0.45,
                    vy: -0.2 - Math.random() * 0.5,
                    alpha: 0.2 + Math.random() * 0.55,
                    hue: Math.random() > 0.5 ? '165, 243, 252' : '245, 208, 254'
                });
            }

            function renderInteractiveBgCanvas() {
                if (!bgCtx || !bgCanvas) return;
                const w = bgCanvas.width;
                const h = bgCanvas.height;
                bgCtx.clearRect(0, 0, w, h);

                const cursorPxX = (smoothPointerX * 0.5 + 0.5) * w;
                const cursorPxY = (smoothPointerY * 0.5 + 0.5) * h;

                // Soft interactive cursor halo on the background stage
                const halo = bgCtx.createRadialGradient(cursorPxX, cursorPxY, 10, cursorPxX, cursorPxY, 260);
                halo.addColorStop(0, 'rgba(165, 243, 252, 0.22)');
                halo.addColorStop(0.5, 'rgba(192, 132, 252, 0.08)');
                halo.addColorStop(1, 'rgba(0, 0, 0, 0)');
                bgCtx.fillStyle = halo;
                bgCtx.fillRect(0, 0, w, h);

                for (let i = 0; i < bgParticles.length; i++) {
                    const pt = bgParticles[i];
                    pt.x += pt.vx + smoothPointerX * 0.35;
                    pt.y += pt.vy + smoothPointerY * 0.2;

                    if (pt.y < -10) pt.y = h + 10;
                    if (pt.x < -10) pt.x = w + 10;
                    if (pt.x > w + 10) pt.x = -10;

                    bgCtx.fillStyle = `rgba(${pt.hue}, ${pt.alpha})`;
                    bgCtx.beginPath();
                    bgCtx.arc(pt.x, pt.y, pt.r, 0, Math.PI * 2);
                    bgCtx.fill();
                }
            }

            // Normalized scroll state: p in [0.0 .. 4.0]
            let targetProgress = 0;
            let currentProgress = 0;

            scrollProxy.addEventListener('scroll', function () {
                const maxScroll = scrollProxy.scrollHeight - scrollProxy.clientHeight;
                if (maxScroll > 0) {
                    targetProgress = (scrollProxy.scrollTop / maxScroll) * 4.0;
                }
            }, { passive: true });

            window.addEventListener('keydown', function (e) {
                if (e.key === 'ArrowDown' || e.key === 'PageDown') {
                    e.preventDefault();
                    jumpToScene(Math.min(4, Math.round(targetProgress) + 1));
                } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
                    e.preventDefault();
                    jumpToScene(Math.max(0, Math.round(targetProgress) - 1));
                }
            });

            window.jumpToScene = function (sceneIndex) {
                const clamped = Math.max(0, Math.min(4, sceneIndex));
                targetProgress = clamped;
                const maxScroll = scrollProxy.scrollHeight - scrollProxy.clientHeight;
                scrollProxy.scrollTo({
                    top: (clamped / 4.0) * maxScroll,
                    behavior: 'smooth'
                });
            };

            window.toggleMobileNav = function () {
                const drawer = document.getElementById('mobile-nav-drawer');
                drawer.classList.toggle('hidden');
            };

            window.openModal = function (titleText) {
                const modal = document.getElementById('segesta-modal');
                const titleEl = document.getElementById('modal-title');
                const successEl = document.getElementById('modal-success');
                if (titleText) titleEl.textContent = titleText;
                successEl.classList.add('hidden');
                modal.classList.remove('hidden');
                modal.classList.add('flex');
            };

            window.closeModal = function () {
                const modal = document.getElementById('segesta-modal');
                modal.classList.add('hidden');
                modal.classList.remove('flex');
            };

            window.submitModalForm = function (e) {
                e.preventDefault();
                const successEl = document.getElementById('modal-success');
                successEl.classList.remove('hidden');
                e.target.reset();
                triggerToast('✅ Grid Synchronization Request Transmitted!');
                setTimeout(window.closeModal, 2200);
            };

            // =====================================================================
            // ULTRA-DETAILED HTML5 CANVAS WATERFALL,UNDULATING RIBBONS, POOL RIPPLES & CURSOR SPLASH ENGINE
            // =====================================================================
            const fxCanvas = document.getElementById('world-fx-canvas');
            const ctx = fxCanvas.getContext('2d');
            const WORLD_W = 1440;
            const WORLD_H = 4500;

            function resizeCanvas() {
                fxCanvas.width = WORLD_W;
                fxCanvas.height = WORLD_H;
            }
            resizeCanvas();
            window.addEventListener('resize', resizeCanvas);

            // Interactive Burst Particles when User Clicks Any Action Button
            const interactiveBursts = [];
            function spawnWorldBurst(wx, wy, rgbStr, count) {
                for (let i = 0; i < count; i++) {
                    const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4;
                    const speed = 2.5 + Math.random() * 8.5;
                    interactiveBursts.push({
                        x: wx,
                        y: wy,
                        vx: Math.cos(angle) * speed,
                        vy: Math.sin(angle) * speed,
                        r: 2 + Math.random() * 3.8,
                        rgb: rgbStr,
                        life: 1.0,
                        decay: 0.016 + Math.random() * 0.018
                    });
                }
            }

            // Undulating Translucent Fluid Ribbons for Each Waterfall Shaft
            const waterfallRibbons = [
                // Scene 2 Main Central Waterfall Ribbons (x = 568..872, y = 795..1750)
                { xBase: 585, yTop: 795, yBot: 1750, width: 26, amp: 5.5, freq: 0.008, speed: 0.0045, phase: 0.2, sceneId: 2 },
                { xBase: 628, yTop: 795, yBot: 1750, width: 38, amp: 7.0, freq: 0.006, speed: 0.0052, phase: 1.4, sceneId: 2 },
                { xBase: 688, yTop: 795, yBot: 1750, width: 46, amp: 6.5, freq: 0.007, speed: 0.0060, phase: 2.8, sceneId: 2 },
                { xBase: 748, yTop: 795, yBot: 1750, width: 42, amp: 8.0, freq: 0.0065, speed: 0.0055, phase: 4.1, sceneId: 2 },
                { xBase: 808, yTop: 795, yBot: 1750, width: 34, amp: 6.0, freq: 0.0075, speed: 0.0048, phase: 5.2, sceneId: 2 },
                { xBase: 852, yTop: 795, yBot: 1750, width: 22, amp: 4.5, freq: 0.009, speed: 0.0042, phase: 0.9, sceneId: 2 },
                // Scene 3 Left Turbine Waterfall Ribbons (x = 275..485, y = 1842..2635)
                { xBase: 295, yTop: 1842, yBot: 2635, width: 30, amp: 6.0, freq: 0.008, speed: 0.0055, phase: 0.5, sceneId: 3 },
                { xBase: 348, yTop: 1842, yBot: 2635, width: 42, amp: 7.5, freq: 0.007, speed: 0.0065, phase: 2.1, sceneId: 3 },
                { xBase: 408, yTop: 1842, yBot: 2635, width: 38, amp: 6.5, freq: 0.0075, speed: 0.0060, phase: 3.7, sceneId: 3 },
                { xBase: 458, yTop: 1842, yBot: 2635, width: 26, amp: 5.0, freq: 0.009, speed: 0.0050, phase: 5.0, sceneId: 3 },
                // Scene 4 Right Plasma Chamber Waterfall Ribbons (x = 985..1195, y = 2740..3535)
                { xBase: 1005, yTop: 2740, yBot: 3535, width: 32, amp: 5.5, freq: 0.008, speed: 0.0050, phase: 1.1, sceneId: 4 },
                { xBase: 1062, yTop: 2740, yBot: 3535, width: 44, amp: 7.0, freq: 0.007, speed: 0.0058, phase: 2.9, sceneId: 4 },
                { xBase: 1125, yTop: 2740, yBot: 3535, width: 36, amp: 6.0, freq: 0.0075, speed: 0.0052, phase: 4.4, sceneId: 4 },
                { xBase: 1172, yTop: 2740, yBot: 3535, width: 24, amp: 4.8, freq: 0.0085, speed: 0.0046, phase: 5.8, sceneId: 4 }
            ];

            // High-Density Multi-Tier Water Streaks
            const waterStreaks = [];
            function createStreakGroup(xMin, xMax, yMin, yMax, count, speedMin, speedMax, widthMin, widthMax, sceneId) {
                for (let i = 0; i < count; i++) {
                    const tier = Math.random();
                    waterStreaks.push({
                        sceneId: sceneId,
                        baseX: xMin + Math.random() * (xMax - xMin),
                        x: xMin + Math.random() * (xMax - xMin),
                        y: yMin + Math.random() * (yMax - yMin),
                        vx: 0,
                        yMin: yMin,
                        yMax: yMax,
                        len: tier > 0.78 ? (170 + Math.random() * 240) : (60 + Math.random() * 150),
                        w: tier > 0.85 ? (widthMax * 1.65) : (widthMin + Math.random() * (widthMax - widthMin)),
                        speed: speedMin + Math.random() * (speedMax - speedMin),
                        alpha: tier > 0.85 ? (0.16 + Math.random() * 0.22) : (0.32 + Math.random() * 0.64),
                        isBright: Math.random() > 0.35,
                        hasBead: Math.random() > 0.42
                    });
                }
            }

            createStreakGroup(590, 618, 370, 555, 24, 3.8, 7.0, 1.5, 3.4, 1);
            createStreakGroup(562, 876, 795, 1750, 235, 8.5, 18.0, 1.6, 7.2, 2);
            createStreakGroup(268, 490, 1842, 2635, 155, 8.0, 16.5, 1.6, 6.2, 3);
            createStreakGroup(976, 1204, 2740, 3535, 155, 8.0, 16.5, 1.6, 6.2, 4);

            // Dynamic Splash Droplets with Obstacle & Cursor Deflection
            const splashDroplets = [];
            function createSplashZone(xMin, xMax, yImpact, count, vyMax) {
                for (let i = 0; i < count; i++) {
                    splashDroplets.push({
                        xMin: xMin,
                        xMax: xMax,
                        yImpact: yImpact,
                        x: xMin + Math.random() * (xMax - xMin),
                        y: yImpact,
                        vx: (Math.random() - 0.5) * 4.8,
                        vy: -(1.8 + Math.random() * vyMax),
                        vyMax: vyMax,
                        r: 1.2 + Math.random() * 2.8,
                        life: Math.random(),
                        decay: 0.016 + Math.random() * 0.024
                    });
                }
            }
            // Lip boulders & crest splash (Scene 1 -> 2)
            createSplashZone(555, 885, 800, 48, 3.8);
            // Balcony rail deflection splash (Scene 2 right)
            createSplashZone(690, 865, 1665, 36, 4.8);
            // Scene 2 floor pool impact splash
            createSplashZone(555, 885, 1745, 72, 6.2);
            // Scene 3 spinning turbine wheel impact splash
            createSplashZone(255, 505, 2245, 64, 6.8);
            // Scene 3 lower pool splash
            createSplashZone(260, 495, 2535, 42, 4.6);
            // Scene 4 plasma chamber floor splash
            createSplashZone(970, 1210, 3532, 64, 5.6);

            // Expanding Horizontal Water Pool Ripples at Impact Zones
            const poolRipples = [];
            function createPoolRippleGroup(xMin, xMax, yCenter, count, maxRx) {
                for (let i = 0; i < count; i++) {
                    poolRipples.push({
                        xMin, xMax, yCenter, maxRx,
                        x: xMin + Math.random() * (xMax - xMin),
                        y: yCenter + (Math.random() - 0.5) * 10,
                        progress: Math.random(),
                        speed: 0.008 + Math.random() * 0.012
                    });
                }
            }
            createPoolRippleGroup(555, 885, 1750, 14, 95);
            createPoolRippleGroup(250, 510, 2542, 10, 75);
            createPoolRippleGroup(965, 1215, 3540, 12, 85);

            // Volumetric Splash Mist Plumes
            const mistPlumes = [];
            function createMistGroup(xMin, xMax, yBase, count, radiusMin, radiusMax) {
                for (let i = 0; i < count; i++) {
                    mistPlumes.push({
                        x: xMin + Math.random() * (xMax - xMin),
                        baseY: yBase + (Math.random() - 0.5) * 34,
                        r: radiusMin + Math.random() * (radiusMax - radiusMin),
                        phase: Math.random() * Math.PI * 2,
                        speed: 0.018 + Math.random() * 0.028,
                        color: Math.random() > 0.35 ? '168, 234, 255' : '198, 165, 252'
                    });
                }
            }
            createMistGroup(550, 890, 812, 16, 28, 62);
            createMistGroup(525, 915, 1728, 34, 54, 130);
            createMistGroup(685, 865, 1658, 14, 32, 70);
            createMistGroup(215, 545, 2495, 28, 48, 115);
            createMistGroup(930, 1245, 3518, 28, 48, 115);

            const plasmaSparks = [];
            const columnCenters = [904, 1009, 1114];
            for (let i = 0; i < 64; i++) {
                const colX = columnCenters[i % 3];
                plasmaSparks.push({
                    x: colX + (Math.random() - 0.5) * 48,
                    y: 3315 + Math.random() * 215,
                    r: 1.5 + Math.random() * 3.4,
                    speedY: 1.2 + Math.random() * 2.6,
                    alpha: 0.45 + Math.random() * 0.55
                });
            }

            function renderWorldFX(timeMs) {
                ctx.clearRect(0, 0, WORLD_W, WORLD_H);

                // Decay temporary boost effects smoothly
                if (plasmaSurgeIntensity > 0) plasmaSurgeIntensity = Math.max(0, plasmaSurgeIntensity - 0.008);
                if (horizonAuroraBoost > 0) horizonAuroraBoost = Math.max(0, horizonAuroraBoost - 0.008);
                if (mountainRelayBoost > 0) mountainRelayBoost = Math.max(0, mountainRelayBoost - 0.014);

                // A. Upper Terraced River Flowing Ripples & Lip Foam Rollers
                for (let i = 0; i < 22; i++) {
                    const prog = ((timeMs * 0.00052 + i / 22) % 1);
                    const ry = 620 + prog * 174;
                    const spread = 26 + prog * 162;
                    const rx = 720 + Math.sin(i * 2.3 + timeMs * 0.0012) * spread * 0.48;
                    const rw = 24 + prog * 62;
                    ctx.fillStyle = `rgba(255, 255, 255, ${(0.38 + prog * 0.48).toFixed(2)})`;
                    ctx.fillRect(rx - rw / 2, ry, rw, 3.0);
                }

                // Animated Rolling Crest Foam at Waterfall Lips (y=796, y=1840, y=2740)
                const crestLips = [
                    { xMin: 556, xMax: 884, y: 796, count: 14 },
                    { xMin: 268, xMax: 490, y: 1842, count: 9 },
                    { xMin: 976, xMax: 1204, y: 2742, count: 9 }
                ];
                for (let c = 0; c < crestLips.length; c++) {
                    const lip = crestLips[c];
                    const span = lip.xMax - lip.xMin;
                    for (let i = 0; i < lip.count; i++) {
                        const cx = lip.xMin + (i + 0.5) * (span / lip.count) + Math.sin(timeMs * 0.004 + i) * 6;
                        const cy = lip.y + Math.cos(timeMs * 0.005 + i * 1.3) * 3;
                        const r = 10 + Math.sin(timeMs * 0.006 + i * 2) * 4;
                        ctx.fillStyle = 'rgba(245, 253, 255, 0.72)';
                        ctx.beginPath();
                        ctx.arc(cx, cy, r, 0, Math.PI * 2);
                        ctx.fill();
                    }
                }

                // Optional Mountain Relay Pulse Ring in Scene 1
                if (mountainRelayBoost > 0) {
                    const pulseR = (1 - mountainRelayBoost) * 240 + 20;
                    ctx.strokeStyle = `rgba(255, 240, 160, ${mountainRelayBoost * 0.9})`;
                    ctx.lineWidth = 4.5;
                    ctx.beginPath();
                    ctx.arc(955, 340, pulseR, 0, Math.PI * 2);
                    ctx.stroke();
                }

                // B1. Undulating Translucent Fluid Ribbons (Adds Organic Wave Motion to Every Waterfall)
                for (let r = 0; r < waterfallRibbons.length; r++) {
                    const rib = waterfallRibbons[r];
                    const isTracer = (rib.sceneId === 2 && isMolecularTracerActive && r % 2 === 0);
                    const speedMult = (rib.sceneId === 3 && isTurbineOverdrive) ? 1.8 : 1.0;
                    const waveOffset = timeMs * rib.speed * speedMult + rib.phase;

                    const grad = ctx.createLinearGradient(0, rib.yTop, 0, rib.yBot);
                    const rgb = isTracer ? '255, 228, 125' : '155, 232, 255';
                    grad.addColorStop(0, `rgba(255, 255, 255, 0.32)`);
                    grad.addColorStop(0.25, `rgba(${rgb}, 0.18)`);
                    grad.addColorStop(0.75, `rgba(${rgb}, 0.14)`);
                    grad.addColorStop(1, `rgba(230, 250, 255, 0.28)`);

                    ctx.fillStyle = grad;
                    ctx.beginPath();
                    const stepY = 48;
                    for (let y = rib.yTop; y <= rib.yBot; y += stepY) {
                        const wx = rib.xBase + Math.sin(y * rib.freq - waveOffset) * rib.amp;
                        if (y === rib.yTop) ctx.moveTo(wx - rib.width * 0.5, y);
                        else ctx.lineTo(wx - rib.width * 0.5, y);
                    }
                    for (let y = rib.yBot; y >= rib.yTop; y -= stepY) {
                        const wx = rib.xBase + Math.sin(y * rib.freq - waveOffset + 0.5) * rib.amp;
                        ctx.lineTo(wx + rib.width * 0.5, y);
                    }
                    ctx.closePath();
                    ctx.fill();
                }

                // B2. Stylized Multi-Layer Vertical Waterfall Streaks + Interactive Cursor Splash Deflection!
                for (let i = 0; i < waterStreaks.length; i++) {
                    const s = waterStreaks[i];
                    const speedMult = (s.sceneId === 3 && isTurbineOverdrive) ? 1.85 : 1.0;
                    s.y += s.speed * speedMult;

                    // Interactive Cursor Collision with Waterfall Streams
                    if (isCursorInsideViewport) {
                        const dx = s.x - worldCursorX;
                        const dy = (s.y - s.len * 0.3) - worldCursorY;
                        const distSq = dx * dx + dy * dy;
                        if (distSq < 6400) { // Within 80px of cursor
                            const push = (1 - Math.sqrt(distSq) / 80) * 3.2;
                            s.vx += (dx >= 0 ? 1 : -1) * push;
                        }
                    }

                    // Spring return to base X column
                    s.x += s.vx;
                    s.vx *= 0.86;
                    s.x += (s.baseX - s.x) * 0.08;

                    if (s.y - s.len > s.yMax) {
                        s.y = s.yMin - Math.random() * 45;
                        s.x = s.baseX;
                        s.vx = 0;
                    }

                    const drawTop = Math.max(s.yMin, s.y - s.len);
                    const drawBottom = Math.min(s.yMax, s.y);
                    const drawLen = drawBottom - drawTop;

                    if (drawLen > 2) {
                        const grad = ctx.createLinearGradient(0, drawTop, 0, drawBottom);
                        let rgb = s.isBright ? '242, 253, 255' : '120, 208, 255';
                        if (s.sceneId === 2 && isMolecularTracerActive && i % 3 === 0) {
                            rgb = '255, 224, 115';
                        }
                        grad.addColorStop(0, `rgba(${rgb}, 0)`);
                        grad.addColorStop(0.3, `rgba(${rgb}, ${s.alpha * 0.68})`);
                        grad.addColorStop(0.85, `rgba(255, 255, 255, ${s.alpha})`);
                        grad.addColorStop(1, `rgba(${rgb}, 0)`);

                        ctx.fillStyle = grad;
                        ctx.fillRect(s.x, drawTop, s.w, drawLen);

                        // Crisp Leading Foam Bead at Tip of High-Velocity Water Streak
                        if (s.hasBead && drawBottom < s.yMax - 4) {
                            ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(0.95, s.alpha + 0.2)})`;
                            ctx.beginPath();
                            ctx.arc(s.x + s.w * 0.5, drawBottom, s.w * 0.65, 0, Math.PI * 2);
                            ctx.fill();
                        }
                    }
                }

                // C. Expanding Pool Surface Ripples at Waterfall Base Zones
                for (let i = 0; i < poolRipples.length; i++) {
                    const pr = poolRipples[i];
                    pr.progress += pr.speed * (isTurbineOverdrive ? 1.4 : 1.0);
                    if (pr.progress >= 1) {
                        pr.progress = 0;
                        pr.x = pr.xMin + Math.random() * (pr.xMax - pr.xMin);
                    }
                    const rx = pr.progress * pr.maxRx;
                    const ry = rx * 0.16;
                    const alpha = (1 - pr.progress) * 0.55;
                    ctx.strokeStyle = isMolecularTracerActive && i % 2 === 0
                        ? `rgba(255, 232, 140, ${alpha})`
                        : `rgba(195, 246, 255, ${alpha})`;
                    ctx.lineWidth = 1.6;
                    ctx.beginPath();
                    ctx.ellipse(pr.x, pr.y, rx, ry, 0, 0, Math.PI * 2);
                    ctx.stroke();
                }

                // D. Dynamic Splash Droplets
                for (let i = 0; i < splashDroplets.length; i++) {
                    const d = splashDroplets[i];
                    d.x += d.vx;
                    d.y += d.vy;
                    d.vy += 0.18;
                    d.life -= d.decay;

                    if (d.life <= 0 || d.y > d.yImpact + 18) {
                        d.x = d.xMin + Math.random() * (d.xMax - d.xMin);
                        d.y = d.yImpact;
                        d.vx = (Math.random() - 0.5) * (isTurbineOverdrive ? 6.8 : 4.8);
                        d.vy = -(1.7 + Math.random() * d.vyMax * (isTurbineOverdrive ? 1.38 : 1.0));
                        d.life = 0.78 + Math.random() * 0.22;
                    }

                    ctx.fillStyle = (isMolecularTracerActive && i % 4 === 0)
                        ? `rgba(255, 236, 155, ${Math.max(0, d.life)})`
                        : `rgba(240, 252, 255, ${Math.max(0, d.life * 0.88)})`;
                    ctx.beginPath();
                    ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
                    ctx.fill();
                }

                // E. Volumetric Splash Mist Plumes
                for (let i = 0; i < mistPlumes.length; i++) {
                    const m = mistPlumes[i];
                    m.phase += m.speed;
                    const ox = m.x + Math.sin(m.phase) * 18;
                    const oy = m.baseY + Math.cos(m.phase * 0.85) * 9;
                    const rad = ctx.createRadialGradient(ox, oy, 4, ox, oy, m.r);
                    rad.addColorStop(0, `rgba(${m.color}, 0.38)`);
                    rad.addColorStop(0.55, `rgba(${m.color}, 0.16)`);
                    rad.addColorStop(1, `rgba(${m.color}, 0)`);
                    ctx.fillStyle = rad;
                    ctx.beginPath();
                    ctx.arc(ox, oy, m.r, 0, Math.PI * 2);
                    ctx.fill();
                }

                // F. Scene 4 Rising Orange-Gold Plasma Sparks (Boosted when Plasma Surge is clicked!)
                const sparkSpeedBoost = 1 + plasmaSurgeIntensity * 2.6;
                const sparkSizeBoost = 1 + plasmaSurgeIntensity * 1.45;
                for (let i = 0; i < plasmaSparks.length; i++) {
                    const p = plasmaSparks[i];
                    p.y -= p.speedY * sparkSpeedBoost;
                    if (p.y < 3285) p.y = 3525;
                    ctx.fillStyle = plasmaSurgeIntensity > 0.2
                        ? `rgba(255, 250, 210, ${Math.min(1, p.alpha + 0.32)})`
                        : `rgba(255, 234, 150, ${p.alpha})`;
                    ctx.beginPath();
                    ctx.arc(p.x + Math.sin(timeMs * 0.004 + i) * 3.8, p.y, p.r * sparkSizeBoost, 0, Math.PI * 2);
                    ctx.fill();
                }

                // G. Scene 5 Animated Golden Sunset Ocean Shimmer & Spawned Bird Flock
                const shimmerBoost = 1 + horizonAuroraBoost * 0.85;
                for (let i = 0; i < 10; i++) {
                    const shimmerW = (44 + Math.sin(timeMs * 0.0025 + i * 1.4) * 20) * (1 - i * 0.055) * shimmerBoost;
                    const sx = 468 - shimmerW * 0.5 + Math.cos(timeMs * 0.0018 + i) * 9;
                    const sy = 4244 + i * 11;
                    ctx.fillStyle = `rgba(255, 248, 198, ${Math.min(1, (0.8 - i * 0.065) * shimmerBoost)})`;
                    ctx.fillRect(sx, sy, shimmerW, 3.8);
                }

                // Render Dynamic Bird Flock in Scene 5 when "Pulse Solar Horizon" is clicked
                for (let i = DynamicBirds.length - 1; i >= 0; i--) {
                    const b = DynamicBirds[i];
                    b.x += b.vx;
                    b.y += b.vy;
                    b.wingPhase += 0.18;
                    b.life -= 0.0025;
                    if (b.life <= 0 || b.x > 1320) {
                        DynamicBirds.splice(i, 1);
                        continue;
                    }
                    const wingY = Math.sin(b.wingPhase) * 4.5;
                    ctx.strokeStyle = `rgba(84, 46, 97, ${Math.min(1, b.life * 1.5)})`;
                    ctx.lineWidth = 2.4;
                    ctx.beginPath();
                    ctx.moveTo(b.x - b.size, b.y + wingY);
                    ctx.quadraticCurveTo(b.x - b.size * 0.5, b.y - 4, b.x, b.y);
                    ctx.quadraticCurveTo(b.x + b.size * 0.5, b.y - 4, b.x + b.size, b.y + wingY);
                    ctx.stroke();
                }

                // H. Render Interactive Button Burst Particles
                for (let i = interactiveBursts.length - 1; i >= 0; i--) {
                    const bp = interactiveBursts[i];
                    bp.x += bp.vx;
                    bp.y += bp.vy;
                    bp.vx *= 0.96;
                    bp.vy *= 0.96;
                    bp.life -= bp.decay;
                    if (bp.life <= 0) {
                        interactiveBursts.splice(i, 1);
                        continue;
                    }
                    ctx.fillStyle = `rgba(${bp.rgb}, ${bp.life})`;
                    ctx.beginPath();
                    ctx.arc(bp.x, bp.y, bp.r * bp.life, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            // =====================================================================
            // MAIN 60FPS CAMERA, PARALLAX & MORPHING OVAL NAVBAR LOOP
            // =====================================================================
            function animateLoop(now) {
                smoothPointerX += (pointerX - smoothPointerX) * 0.08;
                smoothPointerY += (pointerY - smoothPointerY) * 0.08;

                currentProgress += (targetProgress - currentProgress) * 0.11;
                if (Math.abs(targetProgress - currentProgress) < 0.0005) {
                    currentProgress = targetProgress;
                }

                // 1. Translate the 500%-tall Continuous World Container
                const worldTranslatePct = -(currentProgress * 20);
                continuousWorld.style.transform = `translate3d(0, ${worldTranslatePct}%, 0)`;

                // 2. Scene 1 Differential Parallax (Title AND Mountains follow scroll smoothly!)
                const heroSinkY = currentProgress * 320 + smoothPointerY * -8;
                const heroTiltX = smoothPointerX * -12;
                heroTitle.style.transform = `translate3d(${heroTiltX}px, ${heroSinkY}px, 0)`;

                const farMtnY = currentProgress * 225 + smoothPointerY * -6;
                const farMtnX = smoothPointerX * -8;
                farMountains.style.transform = `translate3d(${farMtnX}px, ${farMtnY}px, 0)`;

                if (midMountain) {
                    const midMtnY = currentProgress * 135 + smoothPointerY * -4;
                    const midMtnX = smoothPointerX * -5;
                    midMountain.style.transform = `translate3d(${midMtnX}px, ${midMtnY}px, 0)`;
                }

                const beamDrawProgress = Math.max(0, Math.min(1, 1 - currentProgress * 2.2));
                const dash1 = 260 * (1 - beamDrawProgress);
                const dash2 = 200 * (1 - beamDrawProgress);
                beamLine1.setAttribute('stroke-dashoffset', dash1.toFixed(1));
                beamLine2.setAttribute('stroke-dashoffset', dash2.toFixed(1));

                // 3. Scene 2 Differential Parallax
                const d2 = 1.0 - currentProgress;
                const fg2OffsetY = Math.max(-45, Math.min(165, d2 * 155)) + smoothPointerY * 6;
                fgScene2Scientist.style.transform = `translate3d(${smoothPointerX * 10}px, ${fg2OffsetY}px, 0)`;
                textScene2.style.transform = `translate3d(0, ${d2 * 45}px, 0)`;

                // 4. Scene 3 Differential Parallax
                const d3 = 2.0 - currentProgress;
                const fg3OffsetY = Math.max(-50, Math.min(170, d3 * 160)) + smoothPointerY * 6;
                fgScene3Operators.style.transform = `translate3d(${smoothPointerX * 10}px, ${fg3OffsetY}px, 0)`;
                textScene3.style.transform = `translate3d(0, ${d3 * 45}px, 0)`;

                // 5. Scene 4 Differential Multi-Layer Parallax
                const d4 = 3.0 - currentProgress;
                const orbsOffsetY = Math.max(-60, Math.min(180, d4 * 145)) + smoothPointerY * 5;
                const scientist4OffsetY = Math.max(-85, Math.min(240, d4 * 235)) + smoothPointerY * 9;
                fgScene4Orbs.style.transform = `translate3d(${smoothPointerX * 7}px, ${orbsOffsetY}px, 0)`;
                fgScene4Scientist.style.transform = `translate3d(${smoothPointerX * 14}px, ${scientist4OffsetY}px, 0)`;
                textScene4.style.transform = `translate3d(0, ${d4 * 40}px, 0)`;

                // 6. Scene 5 Multi-Layer Mountain & Horizon Scroll-Follow (Matches "AETHERIA" scroll-following physics!)
                const d5 = 4.0 - currentProgress;
                // rel5 is negative above Scene 5 and approaches 0 as you scroll down into Scene 5,
                // so multiplying by a positive factor makes the mountains & sun glide DOWN following your scroll!
                const rel5 = Math.max(-1.35, Math.min(0.25, currentProgress - 4.0));

                if (s5ParallaxSun) {
                    const sunY = rel5 * 340 + smoothPointerY * -8;
                    const sunX = smoothPointerX * -10;
                    s5ParallaxSun.style.transform = `translate3d(${sunX}px, ${sunY}px, 0)`;
                }
                if (s5ParallaxClouds) {
                    const cloudsY = rel5 * 285 + smoothPointerY * -6;
                    const cloudsX = rel5 * -28 + smoothPointerX * -14;
                    s5ParallaxClouds.style.transform = `translate3d(${cloudsX}px, ${cloudsY}px, 0)`;
                }
                if (s5ParallaxMidMtn) {
                    // Midground purple mountain follows scroll strongly
                    const midIslandY = (rel5 + 0.12) * 260 + smoothPointerY * -5;
                    const midIslandX = smoothPointerX * -8;
                    s5ParallaxMidMtn.style.transform = `translate3d(${midIslandX}px, ${midIslandY}px, 0)`;
                }
                if (s5ParallaxRightMtn) {
                    // Giant right pink-purple mountain follows scroll with distinct 3D parallax separation
                    const rightMtnY = (rel5 + 0.15) * 185 + smoothPointerY * 4;
                    const rightMtnX = smoothPointerX * 9;
                    s5ParallaxRightMtn.style.transform = `translate3d(${rightMtnX}px, ${rightMtnY}px, 0)`;
                }
                if (s5ParallaxLeftRocks) {
                    // Foreground coastal rocks glide across the bay
                    const leftRocksY = (rel5 + 0.1) * 105 + smoothPointerY * 7;
                    const leftRocksX = smoothPointerX * 14;
                    s5ParallaxLeftRocks.style.transform = `translate3d(${leftRocksX}px, ${leftRocksY}px, 0)`;
                }

                if (textScene5) {
                    textScene5.style.transform = `translate3d(0, ${Math.max(-20, Math.min(90, d5 * 55))}px, 0)`;
                }

                // 7. Update Active Oval Navbar Pill Highlight
                const activeSceneIdx = Math.min(4, Math.max(0, Math.round(currentProgress)));
                navPillBtns.forEach((btn) => {
                    const btnScene = parseInt(btn.getAttribute('data-nav-scene'), 10);
                    if (btnScene === activeSceneIdx) {
                        btn.classList.add('active-nav-pill');
                    } else {
                        btn.classList.remove('active-nav-pill');
                    }
                });

                // 8. MORPHING OVAL TRANSPARENT NAVBAR ON SCROLL
                if (currentProgress > 0.12) {
                    topNavbar.classList.add('navbar-scrolled');
                } else {
                    topNavbar.classList.remove('navbar-scrolled');
                }

                // 9. Render Interactive Background & Real-Time Waterfall Physics
                renderInteractiveBgCanvas();
                renderWorldFX(now);

                requestAnimationFrame(animateLoop);
            }

            window.onload = function () {
                resizeBgCanvas();
                resizeCanvas();
                requestAnimationFrame(animateLoop);
            };
        })();
