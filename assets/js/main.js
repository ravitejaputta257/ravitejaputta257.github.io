/* ==========================================================================
   Ravi Teja Putta — portfolio
   Small vanilla-JS layer. Everything here is an enhancement: with JS off the
   page is still complete, readable and every link still works.

   1. theme toggle  2. scroll spy  3. reveal on scroll  4. copy email
   5. footer year
   ========================================================================== */

(function () {
  "use strict";

  var root = document.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ── 1. theme toggle ───────────────────────────────────────────────────── */
  var THEME_KEY = "theme";
  var toggle = document.getElementById("theme-toggle");
  var themeMeta = document.querySelector('meta[name="theme-color"]');
  var THEME_COLORS = { dark: "#0b0b0c", light: "#fbfaf7" };

  function applyTheme(theme, persist) {
    root.dataset.theme = theme;
    if (themeMeta) themeMeta.setAttribute("content", THEME_COLORS[theme] || THEME_COLORS.dark);
    if (persist) {
      try {
        localStorage.setItem(THEME_KEY, theme);
      } catch (e) {}
    }
    if (toggle) {
      var isDark = theme === "dark";
      toggle.setAttribute("aria-pressed", String(isDark));
      toggle.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
    }
  }

  // Sync button state with the theme the inline <head> script already applied.
  applyTheme(root.dataset.theme === "light" ? "light" : "dark", false);

  if (toggle) {
    toggle.addEventListener("click", function () {
      applyTheme(root.dataset.theme === "dark" ? "light" : "dark", true);
    });
  }

  // Follow the OS setting only while the visitor has not chosen a theme.
  var scheme = window.matchMedia("(prefers-color-scheme: light)");
  var onSchemeChange = function (event) {
    var saved = null;
    try {
      saved = localStorage.getItem(THEME_KEY);
    } catch (e) {}
    if (!saved) applyTheme(event.matches ? "light" : "dark", false);
  };
  if (scheme.addEventListener) scheme.addEventListener("change", onSchemeChange);
  else if (scheme.addListener) scheme.addListener(onSchemeChange);

  /* ── 2. scroll spy ─────────────────────────────────────────────────────── */
  var navLinks = Array.prototype.slice.call(
    document.querySelectorAll('.site-nav a[href^="#"]')
  );
  var sections = navLinks
    .map(function (link) {
      return document.getElementById(link.getAttribute("href").slice(1));
    })
    .filter(Boolean);

  function setCurrent(id) {
    navLinks.forEach(function (link) {
      var match = link.getAttribute("href") === "#" + id;
      if (match) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
  }

  if (sections.length && "IntersectionObserver" in window) {
    var visible = new Map();

    var spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.intersectionRatio);
          else visible.delete(entry.target.id);
        });

        if (!visible.size) return;

        // Highlight whichever section owns the most of the viewport.
        var best = null;
        var bestRatio = -1;
        visible.forEach(function (ratio, id) {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            best = id;
          }
        });
        if (best) setCurrent(best);
      },
      { rootMargin: "-88px 0px -45% 0px", threshold: [0, 0.15, 0.35, 0.6, 1] }
    );

    sections.forEach(function (section) {
      spy.observe(section);
    });

    // Clear the highlight when the visitor scrolls back to the very top.
    window.addEventListener(
      "scroll",
      function () {
        if (window.scrollY < 120) setCurrent("");
      },
      { passive: true }
    );
  }

  /* ── 3. reveal on scroll ───────────────────────────────────────────────── */
  var revealables = Array.prototype.slice.call(document.querySelectorAll(".reveal"));

  if (!reduceMotion && "IntersectionObserver" in window) {
    var revealer = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    revealables.forEach(function (el, i) {
      // Slight stagger so grouped cards do not all pop at once.
      el.style.transitionDelay = Math.min(i % 4, 3) * 70 + "ms";
      revealer.observe(el);
    });

    // Anything already above the fold on load should not stay hidden.
    window.addEventListener(
      "load",
      function () {
        revealables.forEach(function (el) {
          if (el.getBoundingClientRect().top < window.innerHeight) {
            el.classList.add("is-visible");
          }
        });
      },
      { once: true }
    );
  } else {
    revealables.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* ── 4. copy email ─────────────────────────────────────────────────────── */
  var copyBtn = document.getElementById("copy-email");
  var copyLabel = document.getElementById("copy-label");
  var toast = document.getElementById("toast");
  var toastTimer = null;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("is-open");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toast.classList.remove("is-open");
    }, 2600);
  }

  function legacyCopy(text) {
    var field = document.createElement("textarea");
    field.value = text;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.opacity = "0";
    document.body.appendChild(field);
    field.select();
    var ok = false;
    try {
      ok = document.execCommand("copy");
    } catch (e) {}
    document.body.removeChild(field);
    return ok;
  }

  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      var email = copyBtn.dataset.email || "";

      function done(ok) {
        if (!ok) {
          showToast("Copy failed — the address is " + email);
          return;
        }
        copyBtn.classList.add("copied");
        if (copyLabel) copyLabel.textContent = "Copied";
        showToast("Email copied to clipboard");
        window.setTimeout(function () {
          copyBtn.classList.remove("copied");
          if (copyLabel) copyLabel.textContent = "Copy email";
        }, 2200);
      }

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(email).then(
          function () {
            done(true);
          },
          function () {
            done(legacyCopy(email));
          }
        );
      } else {
        done(legacyCopy(email));
      }
    });
  }

  /* ── 5. footer year ────────────────────────────────────────────────────── */
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
