import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const LoadingContext = createContext(null);

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};

const styles = `
.chrome-loading-bar-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  z-index: 99999;
  pointer-events: none;
}

.chrome-loading-bar {
  height: 100%;
  background: linear-gradient(to right, #2563eb, #3b82f6, #60a5fa, #93c5fd);
  border-radius: 0 100px 100px 0;
  box-shadow: 0 0 10px rgba(59, 130, 246, 0.8), 0 0 5px rgba(96, 165, 250, 0.5);
  transition: width 0.4s cubic-bezier(0.1, 0.8, 0.2, 1), opacity 0.3s ease-in-out;
  position: relative;
  overflow: hidden;
}

.chrome-loading-bar::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.4),
    transparent
  );
  transform: translateX(-100%);
  animation: chrome-shimmer 1.5s infinite;
}

@keyframes chrome-shimmer {
  100% {
    transform: translateX(100%);
  }
}

.chrome-loading-overlay {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 40;
  overflow: hidden;
  background-color: #F5F5F5;
  pointer-events: auto;
}

.chrome-spinner-overlay {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  padding: 16px;
  border-radius: 50%;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.6);
  transition: opacity 0.3s ease-in-out;
}

.chrome-spinner {
  width: 40px;
  height: 40px;
  animation: chrome-rotate 2s linear infinite;
}

.chrome-spinner-circle {
  stroke: #2563eb;
  stroke-linecap: round;
  animation: chrome-dash 1.5s ease-in-out infinite;
}

@keyframes chrome-rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes chrome-dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}
`;

export const LoadingProvider = ({ children }) => {
  const location = useLocation();
  const [navigationCount, setNavigationCount] = useState(0);
  const [activeApiRequests, setActiveApiRequests] = useState(0);
  const [manualTasks, setManualTasks] = useState(0);

  const [isGloballyLoading, setIsGloballyLoading] = useState(false);
  const [showLoadingBar, setShowLoadingBar] = useState(false);
  const [progress, setProgress] = useState(0);
  const [barOpacity, setBarOpacity] = useState(1);

  const [overlayData, setOverlayData] = useState(null);
  const [overlayOpacity, setOverlayOpacity] = useState(0);

  const activeTasks = navigationCount + activeApiRequests + manualTasks;

  // 1. Debounce the global loading state to bridge micro-gaps (e.g. between navigation mount and fetch starting)
  useEffect(() => {
    let timer = null;
    if (activeTasks > 0) {
      setIsGloballyLoading(true);
    } else {
      timer = setTimeout(() => {
        setIsGloballyLoading(false);
      }, 120); // 120ms buffer to catch subsequent API requests
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [activeTasks]);

  // 2. Manage the Chrome-style loading bar/circle and overlay animations
  useEffect(() => {
    let delayTimer = null;
    let trickleInterval = null;

    if (isGloballyLoading) {
      setBarOpacity(1);

      // Only show the loading bar and circle if it takes longer than 150ms
      delayTimer = setTimeout(() => {
        setShowLoadingBar(true);
        setProgress(15);

        // Trickle progress from 15% towards 90%
        trickleInterval = setInterval(() => {
          setProgress(prev => {
            if (prev >= 90) return prev;
            return prev + (90 - prev) * 0.12;
          });
        }, 250);
      }, 150);
    } else {
      if (delayTimer) clearTimeout(delayTimer);
      if (trickleInterval) clearInterval(trickleInterval);

      if (showLoadingBar) {
        setProgress(100);

        // Fade out loading bar and circle after reaching 100%
        const fadeTimer = setTimeout(() => {
          setBarOpacity(0);
          const resetTimer = setTimeout(() => {
            setShowLoadingBar(false);
            setProgress(0);
          }, 300);
        }, 250);
      }

      // Fade out and remove the page-freeze overlay
      if (overlayData) {
        setOverlayOpacity(0);
        const removeOverlayTimer = setTimeout(() => {
          setOverlayData(null);
        }, 300);
      }
    }

    return () => {
      if (delayTimer) clearTimeout(delayTimer);
      if (trickleInterval) clearInterval(trickleInterval);
    };
  }, [isGloballyLoading, showLoadingBar, overlayData]);

  // 3. Prevent page scrolling while the freeze overlay is active
  useEffect(() => {
    if (overlayData) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [overlayData]);

  // 4. Intercept API requests (native fetch)
  useEffect(() => {
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      setActiveApiRequests(prev => prev + 1);
      try {
        return await originalFetch(...args);
      } finally {
        setActiveApiRequests(prev => Math.max(0, prev - 1));
      }
    };

    return () => {
      window.fetch = originalFetch;
    };
  }, []);

  // 5. Intercept navigation and capture previous page state
  useEffect(() => {
    const handleNavigationStart = (url) => {
      const currentPath = window.location.pathname + window.location.search;
      let newPath = url;
      try {
        const parsed = new URL(url, window.location.origin);
        newPath = parsed.pathname + parsed.search;
      } catch (e) {
        // Relative URL
      }

      // Ignore hash-only changes or identical paths
      if (currentPath === newPath || newPath.startsWith("#") || newPath.includes("#")) {
        return;
      }

      // Capture the current page DOM before the route change renders
      const mainEl = document.querySelector("main");
      if (mainEl && !document.querySelector(".chrome-loading-overlay")) {
        const html = mainEl.innerHTML;
        const className = mainEl.className;
        const scrollTop = window.scrollY;
        const headerHeight = document.querySelector("header")?.offsetHeight || 110;

        setOverlayData({ html, className, scrollTop, headerHeight });
        setOverlayOpacity(1);
      }

      setNavigationCount(prev => prev + 1);
    };

    // Override history.pushState
    const originalPushState = window.history.pushState;
    window.history.pushState = function (...args) {
      const url = args[2];
      if (url) {
        handleNavigationStart(url.toString());
      }
      return originalPushState.apply(this, args);
    };

    // Override history.replaceState
    const originalReplaceState = window.history.replaceState;
    window.history.replaceState = function (...args) {
      const url = args[2];
      if (url) {
        handleNavigationStart(url.toString());
      }
      return originalReplaceState.apply(this, args);
    };

    // Listen to browser Back/Forward (popstate)
    const handlePopState = () => {
      handleNavigationStart(window.location.href);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  // 6. Complete the navigation task when the route location actually changes
  useEffect(() => {
    setNavigationCount(prev => Math.max(0, prev - 1));
  }, [location]);

  const startLoading = () => setManualTasks(prev => prev + 1);
  const stopLoading = () => setManualTasks(prev => Math.max(0, prev - 1));

  return (
    <LoadingContext.Provider value={{ startLoading, stopLoading, isLoading: isGloballyLoading }}>
      <style>{styles}</style>

      {/* Chrome-style top loading bar */}
      {showLoadingBar && (
        <div className="chrome-loading-bar-container">
          <div
            className="chrome-loading-bar"
            style={{
              width: `${progress}%`,
              opacity: barOpacity,
            }}
          />
        </div>
      )}

      {/* Chrome-style circular loading spinner in the center */}
      {showLoadingBar && (
        <div 
          className="chrome-spinner-overlay"
          style={{
            opacity: barOpacity,
          }}
        >
          <svg className="chrome-spinner" viewBox="0 0 50 50">
            <circle
              className="chrome-spinner-circle"
              cx="25"
              cy="25"
              r="20"
              fill="none"
              strokeWidth="4.5"
            />
          </svg>
        </div>
      )}

      {/* Page freeze overlay to keep previous page visible until new page is ready */}
      {overlayData && (
        <div
          className="chrome-loading-overlay"
          style={{
            top: `${overlayData.headerHeight}px`,
            opacity: overlayOpacity,
            transition: "opacity 0.3s ease-in-out",
          }}
        >
          <div
            className={overlayData.className}
            dangerouslySetInnerHTML={{ __html: overlayData.html }}
            style={{
              transform: `translateY(-${overlayData.scrollTop}px)`,
            }}
          />
        </div>
      )}

      {children}
    </LoadingContext.Provider>
  );
};
