document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    const yearFilter = document.getElementById("yearFilter");
    const genreFilter = document.getElementById("genreFilter");
    const movies = document.querySelectorAll(".movie");

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

        movies.forEach(movie => {
            const title = movie.dataset.title.toLowerCase();
            const year = movie.dataset.year;
            const genres = movie.dataset.genre.split(",");

            const matchesSearch = title.includes(searchText);
            const matchesYear = selectedYear === "all" || year === selectedYear;
            const matchesGenre = selectedGenre === "all" || genres.includes(selectedGenre);

            movie.style.display = matchesSearch && matchesYear && matchesGenre ? "block" : "none";
        });
    }

    searchInput.addEventListener("input", filterMovies);
    yearFilter.addEventListener("change", filterMovies);
    genreFilter.addEventListener("change", filterMovies);

    // Tambahkan event listener untuk klik film
    movies.forEach(movie => {
        movie.addEventListener("click", () => {
            const id1 = movie.dataset.id1;
            const id2 = movie.dataset.id2;
            window.location.href = `player.html?id1=${id1}&id2=${id2}`;
        });
    });

    // Mode gelap/terang
    const toggleMode = document.getElementById("toggleMode");
    toggleMode.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        toggleMode.textContent = document.body.classList.contains("dark-mode") ? "☀ Mode Terang" : "🌙 Mode Gelap";
    });
});
