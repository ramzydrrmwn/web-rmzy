/* ======================================================
   SCRIPT.JS — Ramzy Darmawan Portfolio
   Semua interaksi: preloader, sticky nav, reveal animation,
   hero typing effect, search fungsional, modal viewer
   (CV & Sertifikat), dan progress/skill meter animasi.
   ====================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ---------- 1. STICKY NAVIGATION ---------- */
    const nav = document.querySelector('nav');
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.classList.add('nav-active');
            } else if (!nav.classList.contains('force-active')) {
                nav.classList.remove('nav-active');
            }
        });
    }

    /* ---------- 2. SCROLL REVEAL ANIMATION ---------- */
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.about, .skill-card, .social-icon, .portofolio-card, .cert-card, .stat-item, .project-sidebar');
    hiddenElements.forEach((el) => {
        el.classList.add('hidden');
        observer.observe(el);
    });

    /* ---------- 3. PRELOADER ---------- */
    window.addEventListener('load', () => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            setTimeout(() => {
                preloader.classList.add('preloader-hidden');
            }, 500);
        }
    });

    /* ---------- 4. HERO TYPING EFFECT ---------- */
    const roleEl = document.getElementById('hero-role-text');
    if (roleEl) {
        const roles = [
            "Mahasiswa Teknik Listrik Industri",
            "Energy & Automation Enthusiast",
            "Universitas Diponegoro"
        ];
        let roleIndex = 0;
        let charIndex = 0;
        let deleting = false;

        function typeLoop() {
            const current = roles[roleIndex];
            if (!deleting) {
                charIndex++;
                roleEl.textContent = current.substring(0, charIndex);
                if (charIndex === current.length) {
                    deleting = true;
                    setTimeout(typeLoop, 1800);
                    return;
                }
            } else {
                charIndex--;
                roleEl.textContent = current.substring(0, charIndex);
                if (charIndex === 0) {
                    deleting = false;
                    roleIndex = (roleIndex + 1) % roles.length;
                }
            }
            setTimeout(typeLoop, deleting ? 35 : 55);
        }
        typeLoop();
    }

    /* ---------- 5. ABOUT PROGRESS BAR & SKILL METER ANIMATION ---------- */
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        const progObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const fill = entry.target.querySelector('.about-progress-fill');
                    if (fill) fill.classList.add('fill-active');
                }
            });
        }, { threshold: 0.3 });
        progObserver.observe(aboutSection);
    }

    /* ---------- 6. MODAL VIEWER (CV & Sertifikat) ---------- */
    const viewerModal = document.getElementById('viewer-modal');
    if (viewerModal) {
        const modalTitle = viewerModal.querySelector('.viewer-modal-title');
        const modalBody = viewerModal.querySelector('.viewer-modal-body');
        const closeBtn = viewerModal.querySelector('.viewer-modal-close');
        const downloadBtn = viewerModal.querySelector('.viewer-modal-download');

        function openViewer({ type, src, title, downloadName }) {
            modalTitle.textContent = title || 'Pratinjau';
            modalBody.innerHTML = '';

            if (type === 'pdf') {
                const iframe = document.createElement('iframe');
                iframe.src = src;
                modalBody.appendChild(iframe);
            } else {
                const img = document.createElement('img');
                img.src = src;
                img.alt = title || 'Pratinjau gambar';
                modalBody.appendChild(img);
            }

            if (downloadBtn) {
                if (downloadName) {
                    downloadBtn.href = src;
                    downloadBtn.setAttribute('download', downloadName);
                    downloadBtn.style.display = 'inline-flex';
                } else {
                    downloadBtn.style.display = 'none';
                }
            }

            viewerModal.classList.add('open');
            document.body.style.overflow = 'hidden';
        }

        function closeViewer() {
            viewerModal.classList.remove('open');
            document.body.style.overflow = '';
            setTimeout(() => { modalBody.innerHTML = ''; }, 200);
        }

        document.querySelectorAll('[data-view]').forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                openViewer({
                    type: trigger.dataset.viewType || 'image',
                    src: trigger.dataset.viewSrc,
                    title: trigger.dataset.viewTitle,
                    downloadName: trigger.dataset.viewDownload || null
                });
            });
        });

        closeBtn.addEventListener('click', closeViewer);
        viewerModal.addEventListener('click', (e) => {
            if (e.target === viewerModal) closeViewer();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && viewerModal.classList.contains('open')) closeViewer();
        });
    }

    /* ---------- 7. SEARCH FUNGSIONAL ---------- */
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const searchContainer = document.querySelector('.search-container');
    let resultsBox = document.getElementById('search-results-box');

    if (searchInput && searchContainer && !resultsBox) {
        resultsBox = document.createElement('div');
        resultsBox.id = 'search-results-box';
        resultsBox.className = 'search-results';
        searchContainer.appendChild(resultsBox);
    }

    function normalize(str) {
        return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
    }

    function searchIndex(query) {
        const q = normalize(query);
        if (!q) return [];
        if (typeof SITE_SEARCH_INDEX === 'undefined') return [];

        return SITE_SEARCH_INDEX
            .map(item => {
                const haystack = normalize(
                    item.title + ' ' + item.desc + ' ' + item.category + ' ' + (item.keywords || []).join(' ')
                );
                let score = 0;
                if (normalize(item.title).includes(q)) score += 3;
                if (haystack.includes(q)) score += 1;
                (item.keywords || []).forEach(k => {
                    if (normalize(k).includes(q) || q.includes(normalize(k))) score += 2;
                });
                return { item, score };
            })
            .filter(r => r.score > 0)
            .sort((a, b) => b.score - a.score)
            .map(r => r.item);
    }

    const categoryIcons = {
        "Halaman": "fa-house",
        "Proyek": "fa-diagram-project",
        "CV": "fa-file-invoice",
        "Sertifikat": "fa-award"
    };

    function renderResults(results, query) {
        if (!resultsBox) return;

        if (!query) {
            resultsBox.classList.remove('open');
            resultsBox.innerHTML = '';
            return;
        }

        if (results.length === 0) {
            resultsBox.innerHTML = `<div class="sr-empty">Tidak ada hasil untuk "<strong>${escapeHtml(query)}</strong>"</div>`;
            resultsBox.classList.add('open');
            return;
        }

        resultsBox.innerHTML = results.slice(0, 8).map(item => `
            <a href="${item.url}" class="sr-item">
                <span class="sr-icon"><i class="fas ${categoryIcons[item.category] || 'fa-circle'}"></i></span>
                <span class="sr-text">
                    <strong>${escapeHtml(item.title)}</strong>
                    <span>${escapeHtml(item.desc)}</span>
                </span>
                <span class="sr-tag">${escapeHtml(item.category)}</span>
            </a>
        `).join('');
        resultsBox.classList.add('open');
    }

    function escapeHtml(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const query = searchInput.value.trim();
            if (query) {
                searchContainer.classList.add('search-active');
            } else {
                searchContainer.classList.remove('search-active');
            }
            const results = searchIndex(query);
            renderResults(results, query);
        });

        searchInput.addEventListener('focus', () => {
            if (searchInput.value.trim()) {
                searchContainer.classList.add('search-active');
                renderResults(searchIndex(searchInput.value.trim()), searchInput.value.trim());
            }
        });

        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const results = searchIndex(searchInput.value.trim());
                if (results.length > 0) {
                    window.location.href = results[0].url;
                }
            }
        });

        document.addEventListener('click', (e) => {
            if (searchContainer && !searchContainer.contains(e.target)) {
                resultsBox && resultsBox.classList.remove('open');
                if (!searchInput.value.trim()) {
                    searchContainer.classList.remove('search-active');
                }
            }
        });
    }

    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            const query = searchInput.value.trim();
            const results = searchIndex(query);
            if (results.length > 0) {
                window.location.href = results[0].url;
            } else {
                renderResults(results, query);
            }
        });
    }
});
