<script>
document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    const yearFilter = document.getElementById("yearFilter");
    const genreFilter = document.getElementById("genreFilter");
    const movies = Array.from(document.querySelectorAll(".movie"));

    const paginationContainer = document.createElement("div");
    paginationContainer.id = "pagination";
    paginationContainer.style.textAlign = "center";
    paginationContainer.style.margin = "20px";
    document.body.appendChild(paginationContainer);

    const moviesPerPage = 16;
    let currentPage = 1;

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

        const filtered = movies.filter(movie => {
            const title = movie.dataset.title.toLowerCase();
            const year = movie.dataset.year;
            const genres = movie.dataset.genre.split(",");

            const matchesSearch = title.includes(searchText);
            const matchesYear = selectedYear === "all" || year === selectedYear;
            const matchesGenre = selectedGenre === "all" || genres.includes(selectedGenre);

            return matchesSearch && matchesYear && matchesGenre;
        });

        renderPage(filtered, currentPage);
        renderPagination(filtered);
    }

    function renderPage(filteredMovies, page) {
        movies.forEach(movie => movie.style.display = "none");

        const start = (page - 1) * moviesPerPage;
        const end = start + moviesPerPage;

        const currentMovies = filteredMovies.slice(start, end);
        currentMovies.forEach(movie => {
            movie.style.display = "block";
        });

        // Tambahkan ulang event listener ke movie yang sedang ditampilkan
        currentMovies.forEach(movie => {
            movie.onclick = () => {
                const id1 = movie.dataset.id1;
                window.location.href = `player.html?id1=${id1}`;
            };
        });
    }

    function renderPagination(filteredMovies) {
        const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);
        paginationContainer.innerHTML = "";

        for (let i = 1; i <= totalPages; i++) {
            const btn = document.createElement("button");
            btn.textContent = i;
            if (i === currentPage) btn.classList.add("active-page");
            btn.addEventListener("click", () => {
                currentPage = i;
                renderPage(filteredMovies, currentPage);
            });
            paginationContainer.appendChild(btn);
        }
    }

    searchInput.addEventListener("input", () => {
        currentPage = 1;
        filterMovies();
    });
    yearFilter.addEventListener("change", () => {
        currentPage = 1;
        filterMovies();
    });
    genreFilter.addEventListener("change", () => {
        currentPage = 1;
        filterMovies();
    });

    // Mode gelap/terang
    const toggleMode = document.getElementById("toggleMode");
    toggleMode.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        toggleMode.textContent = document.body.classList.contains("dark-mode") ? "☀ Mode Terang" : "🌙 Mode Gelap";
    });

    // Inisialisasi awal
    filterMovies();
});
</script>
