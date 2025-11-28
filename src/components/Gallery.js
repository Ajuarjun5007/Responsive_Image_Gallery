
import { useEffect, useState, useCallback } from "react";
import ModalSlider from "./ModalSlider";

export default function Gallery() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [displayCount, setDisplayCount] = useState(15);

  const fetchPhotos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch from Picsum Photos API with limit
      const res = await fetch("https://picsum.photos/v2/list?page=1&limit=30");
      if (!res.ok) throw new Error("Network response was not ok");
      const data = await res.json();
      setPhotos(data);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to fetch images. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  const loadMore = () => {
    setDisplayCount((prev) => Math.min(prev + 10, photos.length));
  };

  const displayedPhotos = photos.slice(0, displayCount);

  if (loading)
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p style={styles.loadingText}>Loading images…</p>
      </div>
    );

  if (error)
    return (
      <div style={styles.errorContainer}>
        <h2>Oops! Something went wrong</h2>
        <p>{error}</p>
        <button style={styles.retryButton} onClick={fetchPhotos}>
          Retry
        </button>
      </div>
    );

  return (
    <div style={styles.pageContainer}>
      <header style={styles.header}>
        <h1 style={styles.title}>📸 Responsive Image Gallery</h1>
        <p style={styles.subtitle}>
          {photos.length} images available • Click any image to view fullscreen
        </p>
      </header>

      <div style={styles.galleryWrapper}>
        <div style={styles.gallery}>
          {displayedPhotos.map((photo, index) => (
            <div
              key={photo.id}
              style={styles.imageContainer}
              onClick={() => setSelectedIndex(index)}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setSelectedIndex(index);
                }
              }}
              aria-label={`Open ${photo.author || "image"} in fullscreen`}
            >
              <img
                src={photo.download_url}
                alt={photo.author || `Image ${index + 1}`}
                loading="lazy"
                style={styles.image}
              />
              <div style={styles.imageOverlay}>
                <p style={styles.authorName}>{photo.author}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {displayCount < photos.length && (
        <div style={styles.loadMoreContainer}>
          <button style={styles.loadMoreButton} onClick={loadMore}>
            Load More Images ({displayCount}/{photos.length})
          </button>
        </div>
      )}

      {selectedIndex !== null && (
        <ModalSlider
          photos={photos}
          index={selectedIndex}
          onClose={() => setSelectedIndex(null)}
        />
      )}

    </div>
  );
}

const styles = {
  pageContainer: {
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
    paddingBottom: "40px",
  },
  header: {
    backgroundColor: "#ffffff",
    borderBottom: "1px solid #e0e0e0",
    padding: "40px 20px",
    textAlign: "center",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
  },
  title: {
    margin: "0 0 10px 0",
    fontSize: "clamp(24px, 5vw, 40px)",
    color: "#333",
    fontWeight: "700",
    letterSpacing: "-0.5px",
  },
  subtitle: {
    margin: "0",
    fontSize: "clamp(14px, 2vw, 16px)",
    color: "#666",
    fontWeight: "400",
  },
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
  },
  spinner: {
    border: "4px solid #f3f3f3",
    borderTop: "4px solid #0070f3",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    animation: "spin 1s linear infinite",
    marginBottom: "20px",
  },
  loadingText: {
    fontSize: "16px",
    color: "#666",
    margin: "0",
  },
  errorContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
    textAlign: "center",
    padding: "20px",
  },
  retryButton: {
    marginTop: "20px",
    padding: "12px 30px",
    fontSize: "16px",
    backgroundColor: "#0070f3",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
    transition: "background-color 0.3s ease",
  },
  galleryWrapper: {
    padding: "20px",
  },
  gallery: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(clamp(150px, 20vw, 200px), 1fr))",
    gap: "16px",
    maxWidth: "1400px",
    margin: "0 auto",
  },
  imageContainer: {
    position: "relative",
    overflow: "hidden",
    borderRadius: "10px",
    aspectRatio: "1",
    cursor: "pointer",
    backgroundColor: "#e9ecef",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.3s ease",
  },
  imageOverlay: {
    position: "absolute",
    bottom: "0",
    left: "0",
    right: "0",
    backgroundColor: "rgba(0,0,0,0.6)",
    color: "white",
    padding: "12px",
    textAlign: "center",
    fontSize: "clamp(12px, 2vw, 14px)",
    opacity: "0",
    transition: "opacity 0.3s ease",
    transform: "translateY(100%)",
  },
  authorName: {
    margin: "0",
    fontWeight: "600",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
  loadMoreContainer: {
    display: "flex",
    justifyContent: "center",
    padding: "20px",
  },
  loadMoreButton: {
    padding: "12px 30px",
    fontSize: "16px",
    backgroundColor: "#0070f3",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
    transition: "background-color 0.3s ease, transform 0.2s ease",
  },
};
