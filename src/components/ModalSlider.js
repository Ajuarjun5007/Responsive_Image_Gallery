
import { useEffect, useState, useRef } from "react";

export default function ModalSlider({ photos, index, onClose }) {
  const [current, setCurrent] = useState(index ?? 0);
  const [imgLoading, setImgLoading] = useState(true);
  const [imgError, setImgError] = useState(false);
  const overlayRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    setCurrent(index ?? 0);
  }, [index]);

  useEffect(() => {
    setImgLoading(true);
    setImgError(false);
    // Preload current image
    const img = new Image();
    img.src = photos?.[current]?.download_url;
    img.onload = () => setImgLoading(false);
    img.onerror = () => {
      setImgLoading(false);
      setImgError(true);
    };

    // Preload neighbours for smoother navigation
    const nextIdx = (current + 1) % photos.length;
    const prevIdx = (current - 1 + photos.length) % photos.length;
    const p1 = new Image();
    const p2 = new Image();
    p1.src = photos?.[nextIdx]?.download_url;
    p2.src = photos?.[prevIdx]?.download_url;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [current, photos]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const next = () => setCurrent((prev) => (prev + 1) % photos.length);
  const prev = () =>
    setCurrent((prev) => (prev - 1 + photos.length) % photos.length);

  // Touch handlers for swipe gestures
  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    handleSwipe();
  };

  const handleSwipe = () => {
    const diff = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (Math.abs(diff) > minSwipeDistance) {
      if (diff > 0) {
        // Swiped left, show next image
        next();
      } else {
        // Swiped right, show previous image
        prev();
      }
    }
  };

  if (!photos || photos.length === 0) return null;

  const currentPhoto = photos[current];
  const totalPhotos = photos.length;

  return (
    <div
      ref={overlayRef}
      style={styles.overlay}
      onClick={(e) => {
        // close when clicking outside the image
        if (e.target === overlayRef.current) onClose();
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-modal="true"
      role="dialog"
    >
      <button style={styles.closeBtn} onClick={onClose} aria-label="Close modal">
        ✕
      </button>

      <button
        style={styles.leftBtn}
        onClick={(e) => {
          e.stopPropagation();
          prev();
        }}
        aria-label="Previous image"
      >
        ❮
      </button>

      <div style={styles.imageWrap}>
        {imgLoading && <div style={styles.spinner}>Loading image…</div>}
        {imgError && (
          <div style={styles.errorBox}>
            <p>Failed to load image.</p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setImgLoading(true);
                setImgError(false);
                // trigger reload by switching state briefly
                setTimeout(() => setCurrent((c) => c), 50);
              }}
              style={styles.retryBtn}
            >
              Retry
            </button>
          </div>
        )}

        {!imgError && (
          <img
            src={currentPhoto.download_url}
            alt={currentPhoto.author || "Photo"}
            style={{ ...styles.fullImage, display: imgLoading ? "none" : "block" }}
            onClick={(e) => e.stopPropagation()}
            onLoad={() => setImgLoading(false)}
            onError={() => {
              setImgLoading(false);
              setImgError(true);
            }}
          />
        )}
        <div style={styles.caption}>
          <span style={styles.author}>{currentPhoto.author}</span>
          <span style={styles.counter}>
            {current + 1} / {totalPhotos}
          </span>
        </div>
      </div>

      <button
        style={styles.rightBtn}
        onClick={(e) => {
          e.stopPropagation();
          next();
        }}
        aria-label="Next image"
      >
        ❯
      </button>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0,0,0,0.9)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    touchAction: "none",
  },
  fullImage: {
    maxWidth: "90vw",
    maxHeight: "75vh",
    borderRadius: "10px",
    objectFit: "contain",
    animation: "fadeIn 0.3s ease-in",
  },
  closeBtn: {
    position: "absolute",
    top: "20px",
    right: "20px",
    fontSize: "28px",
    fontWeight: "300",
    background: "rgba(255,255,255,0.2)",
    color: "white",
    border: "1px solid rgba(255,255,255,0.3)",
    borderRadius: "50%",
    width: "50px",
    height: "50px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s ease",
    zIndex: 1001,
  },
  leftBtn: {
    position: "absolute",
    left: "clamp(10px, 5%, 50px)",
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: "clamp(32px, 5vw, 50px)",
    color: "white",
    background: "rgba(255,255,255,0.15)",
    border: "none",
    cursor: "pointer",
    padding: "clamp(10px, 2vw, 20px)",
    borderRadius: "6px",
    transition: "all 0.3s ease",
    fontWeight: "300",
    display: "block",
    zIndex: 1001,
  },
  rightBtn: {
    position: "absolute",
    right: "clamp(10px, 5%, 50px)",
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: "clamp(32px, 5vw, 50px)",
    color: "white",
    background: "rgba(255,255,255,0.15)",
    border: "none",
    cursor: "pointer",
    padding: "clamp(10px, 2vw, 20px)",
    borderRadius: "6px",
    transition: "all 0.3s ease",
    fontWeight: "300",
    display: "block",
    zIndex: 1001,
  },
  imageWrap: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "95vw",
    maxHeight: "80vh",
    position: "relative",
  },
  spinner: {
    color: "#fff",
    fontSize: "18px",
    padding: "20px",
    textAlign: "center",
  },
  errorBox: {
    color: "#fff",
    textAlign: "center",
    background: "rgba(255,0,0,0.2)",
    padding: "20px",
    borderRadius: "8px",
    border: "1px solid rgba(255,0,0,0.4)",
  },
  retryBtn: {
    marginTop: "12px",
    padding: "8px 16px",
    backgroundColor: "rgba(255,255,255,0.2)",
    color: "white",
    border: "1px solid rgba(255,255,255,0.3)",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "background-color 0.3s ease",
  },
  caption: {
    marginTop: "12px",
    color: "#ddd",
    fontSize: "14px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    width: "100%",
    textAlign: "center",
    flexWrap: "wrap",
  },
  author: {
    flex: 1,
    fontWeight: "500",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
  counter: {
    fontSize: "12px",
    backgroundColor: "rgba(255,255,255,0.1)",
    padding: "4px 12px",
    borderRadius: "4px",
    whiteSpace: "nowrap",
  },
  thumbnailStrip: {
    position: "absolute",
    bottom: "20px",
    display: "flex",
    gap: "8px",
    justifyContent: "center",
    overflowX: "auto",
    maxWidth: "90vw",
    padding: "0 10px",
    paddingBottom: "10px",
  },
  thumbnail: {
    width: "60px",
    height: "60px",
    border: "1px solid rgba(255,255,255,0.5)",
    borderRadius: "4px",
    cursor: "pointer",
    background: "transparent",
    padding: "0",
    transition: "all 0.3s ease",
    flexShrink: 0,
  },
  thumbnailImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "3px",
  },
};
