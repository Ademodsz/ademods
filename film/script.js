document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    const yearFilter = document.getElementById("yearFilter");
    const genreFilter = document.getElementById("genreFilter");
    const movies = Array.from(document.querySelectorAll(".movie"));
    const paginationContainer = document.getElementById("pagination");
    const itemsPerPage = 16;
    let currentPage = 1;
    let filteredMovies = [];

    // Generate daftar tahun secara otomatis
    let years = new Set();
    movies.forEach(movie => years.add(movie.dataset.year));
    years = Array.from(years).sort().reverse(); // Urutkan dari terbaru
    years.forEach(year => {
        const option = document.createElement("option");
        option.value = year;
        option.textContent = year;
        yearFilter.appendChild(option);
    });

    function filterMovies() {
        const searchText = searchInput.value.toLowerCase();
        const selectedYear = yearFilter.value;
        const selectedGenre = genreFilter.value;

        filteredMovies = movies.filter(movie => {
            const title = movie.dataset.title.toLowerCase();
            const year = movie.dataset.year;
            const genres = movie.dataset.genre.split(",");

            const matchesSearch = title.includes(searchText);
            const matchesYear = selectedYear === "all" || year === selectedYear;
            const matchesGenre = selectedGenre === "all" || genres.includes(selectedGenre);

            return matchesSearch && matchesYear && matchesGenre;
        });

        currentPage = 1;
        showPage();
        renderPagination();
    }

    function showPage() {
        movies.forEach(movie => movie.style.display = "none");

        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        filteredMovies.slice(start, end).forEach(movie => {
            movie.style.display = "block";
        });
    }

    function renderPagination() {
        paginationContainer.innerHTML = "";
        const pageCount = Math.ceil(filteredMovies.length / itemsPerPage);
        if (pageCount <= 1) return;

        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(pageCount, startPage + 4);
        if (endPage - startPage < 4) {
            startPage = Math.max(1, endPage - 4);
        }

        if (startPage > 1) {
            const prev = document.createElement("button");
            prev.textContent = "«";
            prev.addEventListener("click", () => {
                currentPage = startPage - 1;
                showPage();
                renderPagination();
            });
            paginationContainer.appendChild(prev);
        }

        for (let i = startPage; i <= endPage; i++) {
            const button = document.createElement("button");
            button.textContent = i;
            button.className = i === currentPage ? "active" : "";
            button.addEventListener("click", () => {
                currentPage = i;
                showPage();
                renderPagination();
            });
            paginationContainer.appendChild(button);
        }

        if (endPage < pageCount) {
            const next = document.createElement("button");
            next.textContent = "»";
            next.addEventListener("click", () => {
                currentPage = endPage + 1;
                showPage();
                renderPagination();
            });
            paginationContainer.appendChild(next);
        }
    }

    searchInput.addEventListener("input", filterMovies);
    yearFilter.addEventListener("change", filterMovies);
    genreFilter.addEventListener("change", filterMovies);

    movies.forEach(movie => {
        movie.addEventListener("click", () => {
            const id1 = movie.dataset.id1;
            window.location.href = `player.html?id1=${id1}`;
        });
    });

    const toggleMode = document.getElementById("toggleMode");
    toggleMode.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        toggleMode.textContent = document.body.classList.contains("dark-mode") ? "☀ Mode Terang" : "🌙 Mode Gelap";
    });

    filterMovies();
});
