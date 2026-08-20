"use client";

import { useEffect, useRef, useState } from "react";

type Artwork = {
  id: number;
  title: string;
  artist: string;
  year: string;
  medium: string;
  location: string;
  description: string;
  image: string;
  fullImage: string;
};

const artworks: Artwork[] = [
  {
    id: 1,
    title: "The Last Supper",
    artist: "Leonardo da Vinci",
    year: "1495–1498",
    medium: "Tempera and oil on gesso",
    location: "Santa Maria delle Grazie, Milan",
    description:
      "Leonardo da Vinci's monumental interpretation of the Last Supper, created for the refectory of Santa Maria delle Grazie in Milan.",
    image: "/artworks/last-supper.jpg",
    fullImage: "/artworks/last-supper-full.jpg",
  },

  {
    id: 2,
    title: "Mona Lisa",
    artist: "Leonardo da Vinci",
    year: "1503–1519",
    medium: "Oil on poplar",
    location: "Louvre Museum, Paris",
    description:
      "One of the world's most recognized portraits, celebrated for its subtle expression and atmospheric landscape.",
    image: "/artworks/mona-lisa.jpg",
    fullImage: "/artworks/mona-lisa-full.jpg",
  },

  {
    id: 3,
    title: "The School of Athens",
    artist: "Raphael",
    year: "1509–1511",
    medium: "Fresco",
    location: "Apostolic Palace, Vatican City",
    description:
      "Raphael's celebrated fresco bringing together philosophers, mathematicians and thinkers within an idealized Renaissance architectural space.",
    image: "/artworks/school-of-athens.jpg",
    fullImage: "/artworks/school-of-athens-full.jpg",
  },

  {
    id: 4,
    title: "The Arnolfini Portrait",
    artist: "Jan van Eyck",
    year: "1434",
    medium: "Oil on oak",
    location: "National Gallery, London",
    description:
      "A highly detailed portrait celebrated for its symbolism, remarkable surface detail and pioneering use of oil painting.",
    image: "/artworks/arnolfini-portrait.jpg",
    fullImage: "/artworks/arnolfini-portrait-full.jpg",
  },

  {
    id: 5,
    title: "Lady with an Ermine",
    artist: "Leonardo da Vinci",
    year: "1489–1491",
    medium: "Oil on walnut",
    location: "National Museum, Kraków",
    description:
      "A sophisticated Renaissance portrait combining psychological expression, elegant composition and Leonardo's attention to natural detail.",
    image: "/artworks/lady-with-an-ermine.jpg",
    fullImage: "/artworks/lady-with-an-ermine-full.jpg",
  },

  {
  id: 6,
  title: "Napoleon Crossing the Alps",
  artist: "Jacques-Louis David",
  year: "1801",
  medium: "Oil on canvas",
  location: "Château de Malmaison, France",
  description:
    "Jacques-Louis David's heroic portrait of Napoleon crossing the Alps, transforming a military passage into an iconic image of power and ambition.",
  image: "/artworks/napoleon-crossing-the-alps.jpg",
  fullImage: "/artworks/napoleon-crossing-the-alps-full.jpg",
},

{
  id: 7,
  title: "The Death of Socrates",
  artist: "Jacques-Louis David",
  year: "1787",
  medium: "Oil on canvas",
  location: "Metropolitan Museum of Art, New York",
  description:
    "David depicts the final moments of Socrates, surrounded by his followers as he prepares to accept his sentence and drink the hemlock.",
  image: "/artworks/death-of-socrates.jpg",
  fullImage: "/artworks/death-of-socrates-full.jpg",
},

{
  id: 8,
  title: "The Oath of the Horatii",
  artist: "Jacques-Louis David",
  year: "1784",
  medium: "Oil on canvas",
  location: "Louvre Museum, Paris",
  description:
    "A powerful neoclassical scene depicting three brothers swearing an oath to defend Rome, emphasizing sacrifice, duty and patriotism.",
  image: "/artworks/oath-of-the-horatii.jpg",
  fullImage: "/artworks/oath-of-the-horatii-full.jpg",
},

{
  id: 9,
  title: "The Death of Marat",
  artist: "Jacques-Louis David",
  year: "1793",
  medium: "Oil on canvas",
  location: "Royal Museums of Fine Arts of Belgium, Brussels",
  description:
    "David's stark depiction of the revolutionary Jean-Paul Marat after his assassination, turning a contemporary political event into an enduring historical image.",
  image: "/artworks/death-of-marat.jpg",
  fullImage: "/artworks/death-of-marat-full.jpg",
},

{
  id: 10,
  title: "Washington Crossing the Delaware",
  artist: "Emanuel Leutze",
  year: "1851",
  medium: "Oil on canvas",
  location: "Metropolitan Museum of Art, New York",
  description:
    "An ambitious historical painting depicting George Washington and his soldiers crossing the Delaware River during the American Revolutionary War.",
  image: "/artworks/washington-crossing-the-delaware.jpg",
  fullImage: "/artworks/washington-crossing-the-delaware-full.jpg",
},

{
  id: 11,
  title: "The Starry Night",
  artist: "Vincent van Gogh",
  year: "1889",
  medium: "Oil on canvas",
  location: "Museum of Modern Art, New York",
  description:
    "Van Gogh's swirling nocturnal vision of the view from his asylum window, painted from memory and imagination rather than direct observation.",
  image: "/artworks/starry-night.jpg",
  fullImage: "/artworks/starry-night-detail.jpg",
},

{
  id: 12,
  title: "Girl with a Pearl Earring",
  artist: "Johannes Vermeer",
  year: "c. 1665",
  medium: "Oil on canvas",
  location: "Mauritshuis, The Hague",
  description:
    "Often called the 'Mona Lisa of the North,' this luminous tronie captures a fleeting glance and the glint of a single pearl earring.",
  image: "/artworks/girl-with-a-pearl-earring.jpg",
  fullImage: "/artworks/girl-with-a-pearl-earring-detail.jpg",
},

{
  id: 13,
  title: "The Night Watch",
  artist: "Rembrandt van Rijn",
  year: "1642",
  medium: "Oil on canvas",
  location: "Rijksmuseum, Amsterdam",
  description:
    "Rembrandt's dramatic group portrait of a civic militia company, celebrated for its bold use of light, shadow and movement.",
  image: "/artworks/the-night-watch.jpg",
  fullImage: "/artworks/the-night-watch-detail.jpg",
},

{
  id: 14,
  title: "American Gothic",
  artist: "Grant Wood",
  year: "1930",
  medium: "Oil on beaverboard",
  location: "Art Institute of Chicago",
  description:
    "Grant Wood's stark portrait of a farmer and his daughter became an enduring, endlessly referenced symbol of the American Midwest.",
  image: "/artworks/american-gothic.jpg",
  fullImage: "/artworks/american-gothic-detail.jpg",
},

{
  id: 15,
  title: "The Great Wave off Kanagawa",
  artist: "Katsushika Hokusai",
  year: "c. 1831",
  medium: "Woodblock print",
  location: "Metropolitan Museum of Art, New York",
  description:
    "Hokusai's iconic woodblock print depicts fishing boats dwarfed by a towering wave, with Mount Fuji visible in the distance.",
  image: "/artworks/great-wave-off-kanagawa.jpg",
  fullImage: "/artworks/great-wave-off-kanagawa-detail.jpg",
},

{
  id: 16,
  title: "The Kiss",
  artist: "Gustav Klimt",
  year: "1907–1908",
  medium: "Oil and gold leaf on canvas",
  location: "Belvedere, Vienna",
  description:
    "Klimt's gold-leaf masterpiece of an embracing couple wrapped in ornate pattern, a defining image of the Vienna Secession.",
  image: "/artworks/the-kiss.jpg",
  fullImage: "/artworks/the-kiss-detail.jpg",
},

{
  id: 17,
  title: "Wanderer above the Sea of Fog",
  artist: "Caspar David Friedrich",
  year: "1818",
  medium: "Oil on canvas",
  location: "Kunsthalle Hamburg",
  description:
    "A solitary figure surveys a mist-shrouded landscape in Friedrich's quintessential expression of Romantic sublime.",
  image: "/artworks/wanderer-above-the-sea-of-fog.jpg",
  fullImage: "/artworks/wanderer-above-the-sea-of-fog-detail.jpg",
},

{
  id: 18,
  title: "Las Meninas",
  artist: "Diego Velázquez",
  year: "1656",
  medium: "Oil on canvas",
  location: "Museo del Prado, Madrid",
  description:
    "Velázquez's masterful, puzzle-like portrait of the Spanish royal court, in which the artist paints himself painting the scene.",
  image: "/artworks/las-meninas.jpg",
  fullImage: "/artworks/las-meninas-detail.jpg",
},

{
  id: 19,
  title: "Whistler's Mother",
  artist: "James McNeill Whistler",
  year: "1871",
  medium: "Oil on canvas",
  location: "Musée d'Orsay, Paris",
  description:
    "Formally titled 'Arrangement in Grey and Black No. 1,' this austere portrait of the artist's mother became an unlikely American icon.",
  image: "/artworks/whistlers-mother.jpg",
  fullImage: "/artworks/whistlers-mother-detail.jpg",
},

{
  id: 20,
  title: "The Scream",
  artist: "Edvard Munch",
  year: "1893",
  medium: "Tempera and pastel on cardboard",
  location: "National Museum, Oslo",
  description:
    "Munch's anguished figure against a blood-red sky has become one of the most recognized images of existential dread in Western art.",
  image: "/artworks/the-scream.jpg",
  fullImage: "/artworks/the-scream-detail.jpg",
},

{
  id: 21,
  title: "Impression, Sunrise",
  artist: "Claude Monet",
  year: "1872",
  medium: "Oil on canvas",
  location: "Musée Marmottan Monet, Paris",
  description:
    "Monet's hazy harbor scene at dawn lent its name to the entire Impressionist movement.",
  image: "/artworks/impression-sunrise.jpg",
  fullImage: "/artworks/impression-sunrise-detail.jpg",
},

{
  id: 22,
  title: "A Sunday Afternoon on the Island of La Grande Jatte",
  artist: "Georges Seurat",
  year: "1884–1886",
  medium: "Oil on canvas",
  location: "Art Institute of Chicago",
  description:
    "Seurat's monumental pointillist scene of Parisians at leisure, built entirely from thousands of small dots of color.",
  image: "/artworks/sunday-afternoon-la-grande-jatte.jpg",
  fullImage: "/artworks/sunday-afternoon-la-grande-jatte-detail.jpg",
},

{
  id: 23,
  title: "The Hay Wain",
  artist: "John Constable",
  year: "1821",
  medium: "Oil on canvas",
  location: "National Gallery, London",
  description:
    "Constable's beloved depiction of the English countryside, showing a horse-drawn wagon crossing a tranquil river.",
  image: "/artworks/the-hay-wain.jpg",
  fullImage: "/artworks/the-hay-wain-detail.jpg",
},

{
  id: 24,
  title: "The Tower of Babel",
  artist: "Pieter Bruegel the Elder",
  year: "1563",
  medium: "Oil on panel",
  location: "Kunsthistorisches Museum, Vienna",
  description:
    "Bruegel's sprawling vision of the biblical tower under endless construction, a meditation on human ambition and hubris.",
  image: "/artworks/tower-of-babel.jpg",
  fullImage: "/artworks/tower-of-babel-detail.jpg",
},
];

type MotionItem = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  width: number;
  height: number;
};

export default function Home() {
  const paintingRefs =
    useRef<(HTMLButtonElement | null)[]>([]);

  const motionRef =
    useRef<MotionItem[]>([]);

  const animationRef =
    useRef<number | null>(null);

  const lastTimeRef =
    useRef<number | null>(null);

  const mouseRef =
    useRef({
      x: 0.5,
      y: 0.5,
    });

  const hoveredRef =
    useRef<number | null>(null);

  const [activeArtwork, setActiveArtwork] =
    useState<Artwork | null>(null);

  const [detailLoaded, setDetailLoaded] =
    useState(false);

  const [artworkStatus, setArtworkStatus] =
    useState<Record<number, string>>({});

  const [showReserveForm, setShowReserveForm] =
    useState(false);

  const [reserveName, setReserveName] =
    useState("");

  const [reserveEmail, setReserveEmail] =
    useState("");

  const [reserving, setReserving] =
    useState(false);

  const [reserveError, setReserveError] =
    useState<string | null>(null);

  const [reserveSuccess, setReserveSuccess] =
    useState(false);

  const [preloaderVisible, setPreloaderVisible] =
    useState(true);

  const [preloaderExiting, setPreloaderExiting] =
    useState(false);

  useEffect(() => {
    const exitTimer = setTimeout(() => {
      setPreloaderExiting(true);
    }, 2700);

    const removeTimer = setTimeout(() => {
      setPreloaderVisible(false);
    }, 3650);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/artworks")
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Failed to fetch artwork status"
          );
        }

        return response.json();
      })
      .then(
        (
          data: {
            id: number;
            status: string;
          }[]
        ) => {
          if (cancelled) return;

          const statusMap: Record<
            number,
            string
          > = {};

          data.forEach((item) => {
            statusMap[item.id] = item.status;
          });

          setArtworkStatus(statusMap);
        }
      )
      .catch(() => {
        // Database not reachable — the site
        // simply won't show status badges,
        // nothing else is affected.
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    motionRef.current = [
      {
        x: width * 0.16,
        y: height * 0.22,
        vx: 55,
        vy: 32,
        rotation: -4,
        rotationSpeed: 2.5,
        width: 235,
        height: 165,
      },

      {
        x: width * 0.45,
        y: height * 0.18,
        vx: -42,
        vy: 45,
        rotation: 3,
        rotationSpeed: -2,
        width: 170,
        height: 235,
      },

      {
        x: width * 0.75,
        y: height * 0.23,
        vx: -52,
        vy: 35,
        rotation: -2,
        rotationSpeed: 2.5,
        width: 250,
        height: 185,
      },

      {
        x: width * 0.86,
        y: height * 0.55,
        vx: -48,
        vy: -38,
        rotation: 4,
        rotationSpeed: -2,
        width: 185,
        height: 250,
      },

      {
        x: width * 0.16,
        y: height * 0.68,
        vx: 48,
        vy: -42,
        rotation: -3,
        rotationSpeed: 2,
        width: 180,
        height: 240,
      },

      {
        x: width * 0.37,
        y: height * 0.45,
        vx: 58,
        vy: -30,
        rotation: 2,
        rotationSpeed: -2.5,
        width: 220,
        height: 310,
      },

      {
        x: width * 0.62,
        y: height * 0.62,
        vx: -62,
        vy: -28,
        rotation: -3,
        rotationSpeed: 2.2,
        width: 220,
        height: 300,
      },

      {
        x: width * 0.30,
        y: height * 0.82,
        vx: 45,
        vy: 35,
        rotation: 3,
        rotationSpeed: -2,
        width: 220,
        height: 290,
      },

      {
        x: width * 0.68,
        y: height * 0.40,
        vx: 50,
        vy: 42,
        rotation: -4,
        rotationSpeed: 2,
        width: 220,
        height: 290,
      },

      {
        x: width * 0.82,
        y: height * 0.80,
        vx: -58,
        vy: -35,
        rotation: 2,
        rotationSpeed: -2.5,
        width: 250,
        height: 180,
      },

      {
        x: width * 0.10,
        y: height * 0.35,
        vx: 44,
        vy: -38,
        rotation: 3,
        rotationSpeed: -2,
        width: 240,
        height: 192,
      },

      {
        x: width * 0.52,
        y: height * 0.15,
        vx: -46,
        vy: 40,
        rotation: -3,
        rotationSpeed: 2.3,
        width: 175,
        height: 200,
      },

      {
        x: width * 0.90,
        y: height * 0.30,
        vx: -50,
        vy: -34,
        rotation: 4,
        rotationSpeed: -2.6,
        width: 250,
        height: 210,
      },

      {
        x: width * 0.06,
        y: height * 0.60,
        vx: 52,
        vy: 36,
        rotation: -2,
        rotationSpeed: 2.1,
        width: 170,
        height: 205,
      },

      {
        x: width * 0.34,
        y: height * 0.72,
        vx: -44,
        vy: -46,
        rotation: 3,
        rotationSpeed: -2.4,
        width: 235,
        height: 160,
      },

      {
        x: width * 0.58,
        y: height * 0.55,
        vx: 48,
        vy: -32,
        rotation: -4,
        rotationSpeed: 2.2,
        width: 210,
        height: 210,
      },

      {
        x: width * 0.78,
        y: height * 0.68,
        vx: -42,
        vy: 44,
        rotation: 2,
        rotationSpeed: -2,
        width: 165,
        height: 210,
      },

      {
        x: width * 0.14,
        y: height * 0.85,
        vx: 46,
        vy: -40,
        rotation: -3,
        rotationSpeed: 2.4,
        width: 190,
        height: 220,
      },

      {
        x: width * 0.44,
        y: height * 0.90,
        vx: -54,
        vy: 30,
        rotation: 4,
        rotationSpeed: -2.3,
        width: 225,
        height: 200,
      },

      {
        x: width * 0.68,
        y: height * 0.20,
        vx: 40,
        vy: 38,
        rotation: -2,
        rotationSpeed: 2,
        width: 175,
        height: 217,
      },

      {
        x: width * 0.24,
        y: height * 0.48,
        vx: -48,
        vy: -36,
        rotation: 3,
        rotationSpeed: -2.2,
        width: 210,
        height: 160,
      },

      {
        x: width * 0.96,
        y: height * 0.55,
        vx: -40,
        vy: 42,
        rotation: -4,
        rotationSpeed: 2.5,
        width: 260,
        height: 175,
      },

      {
        x: width * 0.85,
        y: height * 0.85,
        vx: 44,
        vy: -44,
        rotation: 2,
        rotationSpeed: -2.1,
        width: 245,
        height: 172,
      },

      {
        x: width * 0.50,
        y: height * 0.35,
        vx: -46,
        vy: 32,
        rotation: -3,
        rotationSpeed: 2.3,
        width: 230,
        height: 170,
      },
    ];

    const handlePointerMove =
      (event: PointerEvent) => {
        mouseRef.current.x =
          event.clientX / window.innerWidth;

        mouseRef.current.y =
          event.clientY / window.innerHeight;
      };

    window.addEventListener(
      "pointermove",
      handlePointerMove,
      { passive: true }
    );

    const animate =
      (timestamp: number) => {
        if (lastTimeRef.current === null) {
          lastTimeRef.current = timestamp;
        }

        const delta = Math.min(
          (timestamp - lastTimeRef.current) / 1000,
          0.04
        );

        lastTimeRef.current = timestamp;

        const viewportWidth =
          window.innerWidth;

        const viewportHeight =
          window.innerHeight;

        motionRef.current.forEach(
          (item, index) => {
            if (
              hoveredRef.current === index
            ) {
              return;
            }

            item.x += item.vx * delta;
            item.y += item.vy * delta;

            item.rotation +=
              item.rotationSpeed * delta;

            if (item.rotation > 8) {
              item.rotation = 8;
              item.rotationSpeed =
                -Math.abs(item.rotationSpeed);
            }

            if (item.rotation < -8) {
              item.rotation = -8;
              item.rotationSpeed =
                Math.abs(item.rotationSpeed);
            }

            const halfWidth =
              item.width / 2;

            const halfHeight =
              item.height / 2;

            if (
              item.x - halfWidth <= 0
            ) {
              item.x = halfWidth;
              item.vx =
                Math.abs(item.vx);
            }

            if (
              item.x + halfWidth >=
              viewportWidth
            ) {
              item.x =
                viewportWidth -
                halfWidth;

              item.vx =
                -Math.abs(item.vx);
            }

            if (
              item.y - halfHeight <= 90
            ) {
              item.y =
                90 + halfHeight;

              item.vy =
                Math.abs(item.vy);
            }

            if (
              item.y + halfHeight >=
              viewportHeight - 60
            ) {
              item.y =
                viewportHeight -
                60 -
                halfHeight;

              item.vy =
                -Math.abs(item.vy);
            }

            const mouseX =
              mouseRef.current.x - 0.5;

            const mouseY =
              mouseRef.current.y - 0.5;

            const parallaxX =
              mouseX * 16;

            const parallaxY =
              mouseY * 12;

            const element =
              paintingRefs.current[index];

            if (!element) {
              return;
            }

            element.style.transform = `
              translate3d(
                ${item.x + parallaxX}px,
                ${item.y + parallaxY}px,
                0
              )
              translate(-50%, -50%)
              rotate(${item.rotation}deg)
            `;
          }
        );

        animationRef.current =
          requestAnimationFrame(
            animate
          );
      };

    animationRef.current =
      requestAnimationFrame(
        animate
      );

    return () => {
      window.removeEventListener(
        "pointermove",
        handlePointerMove
      );

      if (
        animationRef.current !== null
      ) {
        cancelAnimationFrame(
          animationRef.current
        );
      }
    };
  }, []);

  const openArtwork =
    (artwork: Artwork) => {
      setDetailLoaded(false);
      setActiveArtwork(artwork);
      setShowReserveForm(false);
      setReserveName("");
      setReserveEmail("");
      setReserveError(null);
      setReserveSuccess(false);

      document.body.classList.add(
        "modal-open"
      );
    };

  const closeArtwork = () => {
    setActiveArtwork(null);
    setDetailLoaded(false);
    setShowReserveForm(false);
    setReserveError(null);
    setReserveSuccess(false);
    hoveredRef.current = null;

    document.body.classList.remove(
      "modal-open"
    );
  };

  const submitReservation =
    async (
      event: React.FormEvent
    ) => {
      event.preventDefault();

      if (!activeArtwork) return;

      setReserving(true);
      setReserveError(null);

      try {
        const response = await fetch(
          `/api/artworks/${activeArtwork.id}/reserve`,
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              name: reserveName,
              email: reserveEmail,
            }),
          }
        );

        const data =
          await response.json();

        if (!response.ok) {
          setReserveError(
            data.error ??
              "Something went wrong. Please try again."
          );

          return;
        }

        setArtworkStatus((prev) => ({
          ...prev,
          [activeArtwork.id]: "reserved",
        }));

        setReserveSuccess(true);
        setShowReserveForm(false);
      } catch {
        setReserveError(
          "Couldn't reach the server. Please try again."
        );
      } finally {
        setReserving(false);
      }
    };

  useEffect(() => {
    const handleEscape =
      (event: KeyboardEvent) => {
        if (
          event.key === "Escape"
        ) {
          closeArtwork();
        }
      };

    window.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  return (
    <>

      {preloaderVisible && (
        <>

          <div
            className={`preloader-panel preloader-panel-left ${
              preloaderExiting
                ? "preloader-panel-exit-left"
                : ""
            }`}
          />

          <div
            className={`preloader-panel preloader-panel-right ${
              preloaderExiting
                ? "preloader-panel-exit-right"
                : ""
            }`}
          />

          <div
            className={`preloader-content ${
              preloaderExiting
                ? "preloader-content-exit"
                : ""
            }`}
          >

            <div className="preloader-frame">
              <span className="preloader-frame-edge preloader-frame-top" />
              <span className="preloader-frame-edge preloader-frame-bottom" />
              <span className="preloader-frame-edge preloader-frame-left" />
              <span className="preloader-frame-edge preloader-frame-right" />
            </div>

            <div className="preloader-logo">
              MUSEO
            </div>

            <div className="preloader-rule">
              <span className="preloader-rule-diamond" />
            </div>

            <div className="preloader-caption">
              ENTERING THE GALLERY
            </div>

          </div>

        </>
      )}

      <main className="gallery">

      <header className="top-bar">
        <div className="logo">
          MUSEO
        </div>

        <button
          type="button"
          className="menu-button"
        >
          INDEX
        </button>
      </header>

      <section className="paintings">

        {artworks.map(
          (artwork, index) => (
            <button
              key={artwork.id}
              ref={(element) => {
                paintingRefs.current[index] =
                  element;
              }}
              type="button"
              className={`painting painting-${
                index + 1
              }`}
              onMouseEnter={() => {
                hoveredRef.current =
                  index;

                document.body.classList.add(
                  "painting-hover"
                );
              }}
              onMouseLeave={() => {
                hoveredRef.current =
                  null;

                document.body.classList.remove(
                  "painting-hover"
                );
              }}
              onClick={() =>
                openArtwork(artwork)
              }
              aria-label={`Open ${artwork.title}`}
            >

              <div className="painting-frame">

                <img
                  src={artwork.image}
                  alt={artwork.title}
                  draggable={false}
                  loading={
                    index < 5
                      ? "eager"
                      : "lazy"
                  }
                  decoding="async"
                />

                <div className="painting-overlay">
                  <span>
                    VIEW
                  </span>
                </div>

              </div>

              <div className="painting-number">
                {String(
                  artwork.id
                ).padStart(2, "0")}
              </div>

            </button>
          )
        )}

      </section>

      <footer className="bottom-bar">

        <span>
          MOVE TO EXPLORE
        </span>

        <span>
          24 WORKS
        </span>

        <span>
          DIGITAL ARCHIVE
        </span>

      </footer>

      {activeArtwork && (

        <div
          className="artwork-overlay"
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              closeArtwork();
            }
          }}
        >

          <button
            type="button"
            className="close-button"
            onClick={closeArtwork}
          >
            CLOSE
            <span>×</span>
          </button>

          <div className="detail-number">
            {String(
              activeArtwork.id
            ).padStart(2, "0")}
            {" / 24"}
          </div>

          <div className="detail-image">

            {!detailLoaded && (
              <div className="image-loader">
                <span />
                LOADING ARTWORK
              </div>
            )}

            <img
              src={
                activeArtwork.fullImage
              }
              alt={
                activeArtwork.title
              }
              decoding="async"
              onLoad={() =>
                setDetailLoaded(true)
              }
              className={
                detailLoaded
                  ? "loaded"
                  : ""
              }
            />

          </div>

          <div className="detail-info">

            <div className="detail-label">
              ARTWORK
            </div>

            <h2>
              {activeArtwork.title}
            </h2>

            <h3>
              {activeArtwork.artist}
            </h3>

            <div className="detail-meta">

              <div>
                <span>YEAR</span>
                <p>
                  {activeArtwork.year}
                </p>
              </div>

              <div>
                <span>MEDIUM</span>
                <p>
                  {activeArtwork.medium}
                </p>
              </div>

              <div>
                <span>LOCATION</span>
                <p>
                  {activeArtwork.location}
                </p>
              </div>

            </div>

            <p className="description">
              {activeArtwork.description}
            </p>

            {(() => {
              const status =
                artworkStatus[
                  activeArtwork.id
                ] ?? "available";

              if (status === "sold") {
                return (
                  <div className="reserve-section">
                    <span className="status-badge status-sold">
                      SOLD
                    </span>
                  </div>
                );
              }

              if (reserveSuccess) {
                return (
                  <div className="reserve-section">
                    <span className="status-badge status-reserved">
                      RESERVED
                    </span>
                    <p className="reserve-message">
                      This piece is on hold for
                      you for 48 hours. We'll
                      be in touch to confirm.
                    </p>
                  </div>
                );
              }

              if (status === "reserved") {
                return (
                  <div className="reserve-section">
                    <span className="status-badge status-reserved">
                      RESERVED
                    </span>
                  </div>
                );
              }

              if (showReserveForm) {
                return (
                  <form
                    className="reserve-form"
                    onSubmit={
                      submitReservation
                    }
                  >
                    <input
                      type="text"
                      placeholder="Your name"
                      value={reserveName}
                      onChange={(e) =>
                        setReserveName(
                          e.target.value
                        )
                      }
                      required
                    />

                    <input
                      type="email"
                      placeholder="Your email"
                      value={reserveEmail}
                      onChange={(e) =>
                        setReserveEmail(
                          e.target.value
                        )
                      }
                      required
                    />

                    {reserveError && (
                      <p className="reserve-error">
                        {reserveError}
                      </p>
                    )}

                    <div className="reserve-form-actions">
                      <button
                        type="submit"
                        className="reserve-submit"
                        disabled={
                          reserving
                        }
                      >
                        {reserving
                          ? "Reserving…"
                          : "Confirm Reservation"}
                      </button>

                      <button
                        type="button"
                        className="reserve-cancel"
                        onClick={() => {
                          setShowReserveForm(
                            false
                          );
                          setReserveError(
                            null
                          );
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                );
              }

              return (
                <button
                  type="button"
                  className="reserve-button"
                  onClick={() =>
                    setShowReserveForm(
                      true
                    )
                  }
                >
                  Reserve This Piece
                </button>
              );
            })()}

          </div>

        </div>
      )}

      </main>

    </>
  );
}