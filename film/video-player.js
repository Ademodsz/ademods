document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const title = urlParams.get('title');
    const fileId = urlParams.get('video');
    
    if (title && fileId) {
        document.getElementById("movie-title").innerText = title;
        
        // Link embed Google Drive
        const embedUrl = `https://drive.google.com/file/d/${fileId}/preview`;
        document.getElementById("videoFrame").src = embedUrl;

        // Link download
        const downloadUrl = `https://bit.ly/${fileId}`;
        document.getElementById("download-btn").href = downloadUrl;
    }
});
