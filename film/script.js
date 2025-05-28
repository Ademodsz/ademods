<script>
document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    const yearFilter = document.getElementById("yearFilter");
    const genreFilter = document.getElementById("genreFilter");
    const allMovies = Array.from(document.querySelectorAll(".movie"));
    const toggleMode = document.getElementById("toggleMode");
    const paginationContainer = document.createElement("div");

    paginationContainer.id = "pagination";
    paginationContainer.style.textAlign = "center";
    paginationContainer.style.margin = "20px";
    document.body.insertBefore(paginationContainer, document.querySelector("footer"));

    let currentPage = 1;
    const moviesPerPage = 16;

    // Generate daftar tahun otomatis
    let years = new Set();
    allMovies.forEach(movie => years.add(movie.dataset.year));
    years = Array.from(years).sort().reverse();
    years.forEach(year => {
        const option = document.createElement("option");
        option.value = year;
        option.textContent = year;
        yearFilter.appendChild(option);
    });

    function getFilteredMovies() {
        const searchText = searchInput.value.toLowerCase();
        const selectedYear = yearFilter.value;
        const selectedGenre = genreFilter.value;

        return allMovies.filter(movie => {
            const title = movie.dataset.title.toLowerCase();
            const year = movie.dataset.year;
            const genres = movie.dataset.genre.split(",");

            const matchesSearch = title.includes(searchText);
            const matchesYear = selectedYear === "all" || year === selectedYear;
            const matchesGenre = selectedGenre === "all" || genres.includes(selectedGenre);

            return matchesSearch && matchesYear && matchesGenre;
        });
    }

    function showPage(page, filteredMovies) {
        const start = (page - 1) * moviesPerPage;
        const end = start + moviesPerPage;

        allMovies.forEach(movie => movie.style.display = "none");
        filteredMovies.slice(start, end).forEach(movie => movie.style.display = "block");

        renderPagination(filteredMovies);
    }

    function renderPagination(filteredMovies) {
        const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);
        paginationContainer.innerHTML = "";

        for (let i = 1; i <= totalPages; i++) {
            const btn = document.createElement("button");
            btn.textContent = i;
            btn.className = (i === currentPage) ? "active-page" : "";
            btn.addEventListener("click", () => {
                currentPage = i;
                showPage(currentPage, filteredMovies);
            });
            paginationContainer.appendChild(btn);
        }
    }

    function filterAndPaginate() {
        const filteredMovies = getFilteredMovies();
        currentPage = 1;
        showPage(currentPage, filteredMovies);
    }

    // Event listeners
    searchInput.addEventListener("input", filterAndPaginate);
    yearFilter.addEventListener("change", filterAndPaginate);
    genreFilter.addEventListener("change", filterAndPaginate);

    // Klik film
    allMovies.forEach(movie => {
        movie.addEventListener("click", () => {
            const id1 = movie.dataset.id1;
            window.location.href = `player.html?id1=${id1}`;
        });
    });

    // Mode gelap/terang
    toggleMode.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        toggleMode.textContent = document.body.classList.contains("dark-mode") ? "☀ Mode Terang" : "🌙 Mode Gelap";
    });

    // Inisialisasi awal
    filterAndPaginate();
});
</script>
