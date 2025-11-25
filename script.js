// Main Application Script
class MVaultApp {
    constructor() {
        this.contentData = {
            series: [
                {
                    id: 1,
                    title: "Faith",
                    image: "https://drive.google.com/thumbnail?id=11YJaU6dr-k-vtAh6qefuIdG6cf1VcXDW&sz=w1000",
                    imdb: "8.2/10",
                    rotten: "89%",
                    year: "2022",
                    genre: "Historical Drama",
                    duration: "45m",
                    description: "මධ්‍යකාලීන රාජධානියක ගිලිහුණු රජවරුන්, අධිරහස් බලවතුන් සහ වීර යුද්ධ ශූරයන්ගේ කතාවක්. අධිරහස් බලවතුන්ගේ සටනක් සහ ප්‍රේම කතාවක් එකට බැඳී ඇත.",
                    driveUrl: "https://drive.google.com/drive/folders/1bNu1Bd01PcXtGO6DAbjh5y85yWCtrLcj",
                    type: "series",
                    seasons: [
                        {
                            season: 1,
                            episodes: [
                                { title: "Episode 1: The Beginning", duration: "45m", description: "ප්‍රථම කථාංගයේදී ප්‍රධාන චරිත හඳුන්වා දෙනු ලැබේ." },
                                { title: "Episode 2: The Challenge", duration: "44m", description: "ප්‍රධාන චරිත අභියෝගයකට මුහුණ දෙයි." },
                                { title: "Episode 3: The Revelation", duration: "46m", description: "ගැඹුරු රහස් හෙළි වීම් සිදු වේ." }
                            ]
                        }
                    ]
                },
                {
                    id: 2,
                    title: "Hwarang",
                    image: "https://drive.google.com/thumbnail?id=11YoXejxVsMbpp4M8J9uGzSpwPCay4WlC&sz=w1000",
                    imdb: "7.8/10",
                    rotten: "85%",
                    year: "2016",
                    genre: "Historical Action",
                    duration: "60m",
                    description: "සිල්ලා රාජධානියේ තරුණ ආරක්ෂක භට කණ්ඩායමක චරිත වටා ගෙතුණු ඓතිහාසික නාට්‍යයක්. යුවල රජුගේ ආරක්ෂකයන් ලෙස සේවය කළ තරුණයන්ගේ කතාව.",
                    driveUrl: "https://drive.google.com/drive/folders/1UNnkWWNCVPc8hN-NnrP2Sf7ZGfkeKZJZ",
                    type: "series",
                    seasons: [
                        {
                            season: 1,
                            episodes: [
                                { title: "Episode 1: The Warriors", duration: "60m", description: "හ්වාරැං භට කණ්ඩායම හඳුන්වා දෙනු ලැබේ." },
                                { title: "Episode 2: The Training", duration: "58m", description: "කච්චාවේ දුෂ්කරතා වලට මුහුණ දෙන භටයන්." }
                            ]
                        }
                    ]
                },
                {
                    id: 3,
                    title: "උරුමක්කාරයෝ",
                    image: "https://drive.google.com/thumbnail?id=11N1bNl86wRwniNzgHH_Lnbek92bh8cTV&sz=w1000",
                    imdb: "8.5/10",
                    rotten: "92%",
                    year: "2023",
                    genre: "Family Drama",
                    duration: "40m",
                    description: "උරුමය, බලය සහ පවුල් සම්බන්ධතා වටා ගෙතුණු සිංහල ටෙලි නාට්‍ය මාලාව. පවුලක උරුමය සඳහා සහෝදරයන් අතර ඇති වන ගැටුම්.",
                    driveUrl: "https://drive.google.com/drive/folders/1cj-8kXAh0cu35hFCCp8ARS2NlQbur_T0",
                    type: "series",
                    seasons: [
                        {
                            season: 1,
                            episodes: [
                                { title: "Episode 1: The Inheritance", duration: "40m", description: "පියාගේ උරුමය පිළිබඳව සහෝදරයන් අතර ගැටුම් ඇති වේ." }
                            ]
                        }
                    ]
                },
                {
                    id: 4,
                    title: "Legend of the Blue Sea",
                    image: "https://drive.google.com/thumbnail?id=11N6zHRIAO_NoP8KJnJqKzo-tWgQPaFP_&sz=w1000",
                    imdb: "8.4/10",
                    rotten: "88%",
                    year: "2016",
                    genre: "Fantasy Romance",
                    duration: "60m",
                    description: "මනුෂ්‍ය ලෝකයට පැමිණෙන මැජික් මිනිස් රූපයක් ගන්නා මීනි කුමරියකගේ ප්‍රේම කතාව. ඇය මනුෂ්‍ය ලෝකයේ අභියෝග සහ ප්‍රේමය අත්විඳියි.",
                    driveUrl: "https://drive.google.com/drive/folders/1NTqMOgmYs0JJHkItXdlSebtddDs0lPTC",
                    type: "series",
                    seasons: [
                        {
                            season: 1,
                            episodes: [
                                { title: "Episode 1: The Mermaid", duration: "60m", description: "මීනි කුමරිය මනුෂ්‍ය ලෝකයට පැමිණේ." }
                            ]
                        }
                    ]
                },
                {
                    id: 5,
                    title: "හිමාන්තරා",
                    image: "https://drive.google.com/thumbnail?id=11XAZlEa3RszGukOC14XUuORPynZC-EM7&sz=w1000",
                    imdb: "8.1/10",
                    rotten: "86%",
                    year: "2023",
                    genre: "Adventure Drama",
                    duration: "45m",
                    description: "හිමාලයන්ගේ අභිරහස් ලෝකයක සිදුවන අතිශයින් රහස්යමය සිදුවීම් වලට මුහුණ දෙන චරිත. පරිසරය සහ සංස්කෘතිය අතර ඇති සම්බන්ධතාවය.",
                    driveUrl: "https://drive.google.com/drive/folders/10FHPoTxGR_4EXSlkvIoUxoY-WmHI4Auw",
                    type: "series",
                    seasons: [
                        {
                            season: 1,
                            episodes: [
                                { title: "Episode 1: The Mountains", duration: "45m", description: "හිමාලයන්ගේ අභියෝග සහගත ගමනක් ආරම්භ වේ." }
                            ]
                        }
                    ]
                },
                {
                    id: 6,
                    title: "Mouse",
                    image: "https://drive.google.com/thumbnail?id=116M2KfHYYvEuPzCgkUaIs2VPtYBuR1RS&sz=w1000",
                    imdb: "8.9/10",
                    rotten: "94%",
                    year: "2021",
                    genre: "Psychological Thriller",
                    duration: "70m",
                    description: "මනෝ විද්‍යාත්මක ත්‍රාසජනක නාට්‍යයක්. හොඳ හා නරක අතර ඇති සීමාව කුමක්ද? ජාතික හමුදාවේ සේවය කරන තරුණ නිලධාරියෙකුගේ අභියෝග.",
                    driveUrl: "https://drive.google.com/drive/folders/1hN1PAa-535lo3Ozauzxq63Qs-496HvdB",
                    type: "series",
                    seasons: [
                        {
                            season: 1,
                            episodes: [
                                { title: "Episode 1: The Experiment", duration: "70m", description: "අභියෝගාත්මක පරීක්ෂණයක් ආරම්භ වේ." }
                            ]
                        }
                    ]
                },
                {
                    id: 7,
                    title: "Judge from Hell",
                    image: "https://drive.google.com/thumbnail?id=11F1RNeAY_AHs-VKj-i88iJTXmDdP1lZI&sz=w1000",
                    imdb: "8.3/10",
                    rotten: "87%",
                    year: "2023",
                    genre: "Legal Drama",
                    duration: "50m",
                    description: "අධිරහස් අධිකරණ ක්‍රමවේදයක් සහ එහි අධිකරණයේ සිටින විස්මය ජනක චරිත. යුක්තිය සහ අධිකරණ පද්ධතිය පිළිබඳ ගැඹුරු ප්‍රශ්න.",
                    driveUrl: "https://drive.google.com/drive/folders/14Vqq3ewpkOyphcJwrW2D4L5zasudojLY",
                    type: "series",
                    seasons: [
                        {
                            season: 1,
                            episodes: [
                                { title: "Episode 1: The Trial", duration: "50m", description: "අධිරහස් අධිකරණයේ පළමු විභාගය." }
                            ]
                        }
                    ]
                }
            ],
            movies: [
                {
                    id: 1,
                    title: "The Roundup: Punishment",
                    image: "https://drive.google.com/thumbnail?id=10XLmKcBY2kVFRB40FqnvibGkVwTmihrs&sz=w1000",
                    imdb: "7.9/10",
                    rotten: "84%",
                    year: "2024",
                    genre: "Action Crime",
                    duration: "1h 45m",
                    description: "අපරාධ ලෝකයේ ඇති වන බලපෑම් සහ එයට එරෙහිව සටන් කරන නිලධාරීන්ගේ කතාව. අපරාධ සංවිධාන සහ පොලිස් නිලධාරීන් අතර ඇති වන ගැටුම්.",
                    driveUrl: "https://drive.google.com/file/d/1QzJhhuRsWO_YxKlY5C0eBLAX9szLmREo/view?usp=drivesdk",
                    type: "movie"
                },
                {
                    id: 2,
                    title: "The Gangster, The Cop, The Devil",
                    image: "https://drive.google.com/thumbnail?id=10cPiVOW9hbcL5VJLnEPTksKHmYJL8_my&sz=w1000",
                    imdb: "7.6/10",
                    rotten: "82%",
                    year: "2019",
                    genre: "Action Thriller",
                    duration: "1h 49m",
                    description: "ගැන්ග්ස්ටර් කෙනෙකු සහ පොලිස් නිලධාරියෙකු එක්ව සටන් කරන අධිරහස් මිනිසාට එරෙහිව. ඔවුන් තම ජීවිත අන්තරායට ලක් කරමින් සටන් කරයි.",
                    driveUrl: "https://drive.google.com/file/d/1FqxhZMgUGeeyidUhXMZ382_gBrgcrE2A/view?usp=drivesdk",
                    type: "movie"
                },
                {
                    id: 3,
                    title: "The Battle of Lake Changjin",
                    image: "https://drive.google.com/thumbnail?id=10XLmKcBY2kVFRB40FqnvibGkVwTmihrs&sz=w1000",
                    imdb: "7.4/10",
                    rotten: "79%",
                    year: "2021",
                    genre: "War Drama",
                    duration: "2h 36m",
                    description: "කොරියානු යුද්ධයේ වැදගත් යුද්ධයක් වන චැන්ග්ජින් විලේ සටන පිළිබඳ ඓතිහාසික නාට්‍යය. යුද්ධයේ දුෂ්කරතා සහ වීරත්වය පිළිබඳව.",
                    driveUrl: "https://drive.google.com/file/d/1-6-byCxCoVCgnOzOn2eb_dl93xG2BW23/view?usp=drivesdk",
                    type: "movie"
                }
            ]
        };
        
        this.currentContent = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.handleScroll();
        this.checkImageUrls();
    }

    setupEventListeners() {
        // Navbar scroll effect
        window.addEventListener('scroll', () => this.handleScroll());
        
        // Search functionality
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
        }

        // Close modal on outside click
        document.addEventListener('click', (e) => {
            const contentModal = document.getElementById('contentModal');
            if (e.target === contentModal) {
                this.closeContentModal();
            }
        });
    }

    handleScroll() {
        const navbar = document.getElementById('navbar');
        if (navbar && window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else if (navbar) {
            navbar.classList.remove('scrolled');
        }
    }

    checkImageUrls() {
        // Verify Google Drive image URLs are accessible
        this.contentData.series.forEach(series => {
            this.verifyImageUrl(series.image);
        });
        this.contentData.movies.forEach(movie => {
            this.verifyImageUrl(movie.image);
        });
    }

    verifyImageUrl(url) {
        const img = new Image();
        img.onerror = () => {
            console.warn('Image failed to load:', url);
        };
        img.src = url;
    }

    loadContent() {
        this.loadSeriesContent();
        this.loadMoviesContent();
    }

    loadSeriesContent() {
        const seriesGrid = document.getElementById('seriesGrid');
        if (!seriesGrid) return;

        seriesGrid.innerHTML = this.contentData.series
            .map(series => this.createContentCard(series))
            .join('');
    }

    loadMoviesContent() {
        const moviesGrid = document.getElementById('moviesGrid');
        if (!moviesGrid) return;

        moviesGrid.innerHTML = this.contentData.movies
            .map(movie => this.createContentCard(movie))
            .join('');
    }

    createContentCard(content) {
        const badge = content.type === 'series' ? 
            '<div class="card-badge">TV Series</div>' : 
            '<div class="card-badge">Movie</div>';
        
        const fallbackImage = 'https://via.placeholder.com/300x450/333/fff?text=Image+Loading';
        
        return `
            <div class="content-card" onclick="mvaultApp.openContentModal('${content.type}', ${content.id})">
                ${badge}
                <div class="card-image">
                    <img src="${content.image}" alt="${content.title}" 
                         onerror="this.src='${fallbackImage}'"
                         loading="lazy">
                    <div class="card-overlay">
                        <button class="play-btn">
                            <span class="material-icons">play_arrow</span>
                        </button>
                    </div>
                </div>
                <div class="card-content">
                    <h3 class="card-title">${content.title}</h3>
                    <div class="card-meta">
                        <span class="card-year">${content.year}</span>
                        <span>${content.duration}</span>
                    </div>
                    <div class="ratings">
                        <div class="rating imdb">
                            <span class="material-icons">star</span>
                            <span>${content.imdb}</span>
                        </div>
                        <div class="rating rotten">
                            <span class="material-icons">local_florist</span>
                            <span>${content.rotten}</span>
                        </div>
                    </div>
                    <p class="card-desc">${content.description}</p>
                    <div class="card-actions">
                        <button class="action-btn" onclick="event.stopPropagation(); mvaultApp.addToFavorites(${content.id}, '${content.type}')">
                            <span class="material-icons">favorite_border</span>
                        </button>
                        <button class="action-btn" onclick="event.stopPropagation(); mvaultApp.watchContentDirect('${content.driveUrl}')">
                            <span class="material-icons">play_arrow</span>
                            Play
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    openContentModal(type, id) {
        const content = this.contentData[type + 's'].find(item => item.id === id);
        if (!content) {
            showNotification('Content not found');
            return;
        }

        this.currentContent = content;

        // Update modal content
        document.getElementById('modalTitle').textContent = content.title;
        document.getElementById('modalYear').textContent = content.year;
        document.getElementById('modalGenre').textContent = content.genre;
        document.getElementById('modalDuration').textContent = content.duration;
        document.getElementById('modalImdb').textContent = content.imdb;
        document.getElementById('modalRotten').textContent = content.rotten;
        document.getElementById('modalDesc').textContent = content.description;
        
        // Set backdrop image
        const modalBackdrop = document.getElementById('modalBackdrop');
        modalBackdrop.style.backgroundImage = `url(${content.image})`;

        // Handle seasons for series
        const seasonsSection = document.getElementById('seasonsSection');
        if (content.type === 'series' && content.seasons) {
            seasonsSection.style.display = 'block';
            this.loadSeasons(content.seasons);
        } else {
            seasonsSection.style.display = 'none';
        }

        // Show modal
        document.getElementById('contentModal').classList.add('active');
    }

    loadSeasons(seasons) {
        const seasonTabs = document.getElementById('seasonTabs');
        const episodesGrid = document.getElementById('episodesGrid');

        seasonTabs.innerHTML = '';
        episodesGrid.innerHTML = '';

        seasons.forEach((season, index) => {
            const seasonTab = document.createElement('button');
            seasonTab.className = `season-tab ${index === 0 ? 'active' : ''}`;
            seasonTab.textContent = `Season ${season.season}`;
            seasonTab.onclick = () => this.loadEpisodes(season.episodes);
            seasonTabs.appendChild(seasonTab);
        });

        // Load first season by default
        if (seasons.length > 0) {
            this.loadEpisodes(seasons[0].episodes);
        }
    }

    loadEpisodes(episodes) {
        const episodesGrid = document.getElementById('episodesGrid');
        episodesGrid.innerHTML = '';

        episodes.forEach(episode => {
            const episodeCard = document.createElement('div');
            episodeCard.className = 'episode-card';
            episodeCard.innerHTML = `
                <div class="episode-header">
                    <div class="episode-title">${episode.title}</div>
                    <div class="episode-duration">${episode.duration}</div>
                </div>
                <div class="episode-desc">${episode.description}</div>
            `;
            episodesGrid.appendChild(episodeCard);
        });
    }

    closeContentModal() {
        document.getElementById('contentModal').classList.remove('active');
        this.currentContent = null;
    }

    watchContent() {
        if (this.currentContent) {
            window.open(this.currentContent.driveUrl, '_blank');
        }
    }

    watchContentDirect(url) {
        window.open(url, '_blank');
    }

    addToFavorites(contentId, contentType) {
        if (!currentUser) {
            showNotification('කරුණාකර පළමුව ඇතුල් වන්න');
            return;
        }

        showNotification('Favorites එකට එකතු කරන ලදී');
        // Implement favorite functionality here
    }

    handleSearch(query) {
        if (!query.trim()) {
            this.loadContent();
            return;
        }

        const searchTerm = query.toLowerCase();
        
        // Filter series
        const filteredSeries = this.contentData.series.filter(series =>
            series.title.toLowerCase().includes(searchTerm) ||
            series.description.toLowerCase().includes(searchTerm) ||
            series.genre.toLowerCase().includes(searchTerm)
        );

        // Filter movies
        const filteredMovies = this.contentData.movies.filter(movie =>
            movie.title.toLowerCase().includes(searchTerm) ||
            movie.description.toLowerCase().includes(searchTerm) ||
            movie.genre.toLowerCase().includes(searchTerm)
        );

        // Update UI
        const seriesGrid = document.getElementById('seriesGrid');
        const moviesGrid = document.getElementById('moviesGrid');

        if (seriesGrid) {
            seriesGrid.innerHTML = filteredSeries.length > 0 ?
                filteredSeries.map(series => this.createContentCard(series)).join('') :
                '<div class="no-results">No series found</div>';
        }

        if (moviesGrid) {
            moviesGrid.innerHTML = filteredMovies.length > 0 ?
                filteredMovies.map(movie => this.createContentCard(movie)).join('') :
                '<div class="no-results">No movies found</div>';
        }
    }
}

// Global functions for HTML onclick handlers
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.remove('active');
    });

    document.getElementById(pageId).classList.add('active');
    event.target.classList.add('active');

    // Scroll to top
    window.scrollTo(0, 0);
}

function watchContent() {
    if (mvaultApp.currentContent) {
        mvaultApp.watchContent();
    }
}

function closeContentModal() {
    mvaultApp.closeContentModal();
}

function addToFavorites() {
    if (mvaultApp.currentContent) {
        mvaultApp.addToFavorites(mvaultApp.currentContent.id, mvaultApp.currentContent.type);
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize MVault app
    window.mvaultApp = new MVaultApp();
    
    // Load content when user is authenticated
    auth.onAuthStateChanged((user) => {
        if (user) {
            setTimeout(() => {
                mvaultApp.loadContent();
            }, 1000);
        }
    });
});

// Handle page loading
window.addEventListener('load', function() {
    setTimeout(() => {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }, 2000);
});
