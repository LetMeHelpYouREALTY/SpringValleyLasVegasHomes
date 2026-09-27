"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { ArrowRight, MapPin, Navigation } from "lucide-react";
import { cn } from "@/lib/utils";
import { loadGoogleMaps, mapsAuthFailed } from "@/lib/load-google-maps";
import { searchCategory } from "@/lib/spring-valley-places-search";
import {
  amenityCategories,
  categoryById,
  curatedSpringValleyPlaces,
  googleMapsDirectionsUrl,
  googleMapsEmbedUrl,
  springValleyCommunity,
  type AmenityCategoryId,
  type CuratedPlace,
} from "@/lib/spring-valley-amenities";

type MapPlaceResult = {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  mapsUri?: string;
};

type CommunityAmenityMapProps = {
  showTitle?: boolean;
  headingId?: string;
  mapHeightClass?: string;
  amenitiesPageHref?: string;
  defaultCategory?: AmenityCategoryId;
  showCuratedList?: boolean;
  className?: string;
};

function curatedForCategory(category: AmenityCategoryId): CuratedPlace[] {
  return curatedSpringValleyPlaces.filter((p) => p.category === category);
}

function placeDisplayName(place: google.maps.places.Place): string {
  const displayName = place.displayName;
  if (typeof displayName === "string") return displayName;
  if (displayName && typeof displayName === "object" && "text" in displayName) {
    return String((displayName as { text?: string }).text ?? "Place");
  }
  return "Place";
}

function buildInfoWindowContent(title: string, address: string): HTMLElement {
  const wrap = document.createElement("div");
  wrap.style.cssText = "padding:8px;max-width:260px;font-family:system-ui,sans-serif;";

  const titleEl = document.createElement("div");
  titleEl.style.cssText = "font-size:15px;font-weight:700;color:#0f172a;margin-bottom:4px;";
  titleEl.textContent = title;
  wrap.appendChild(titleEl);

  const addrEl = document.createElement("p");
  addrEl.style.cssText = "margin:0 0 6px;font-size:13px;color:#475569;";
  addrEl.textContent = address;
  wrap.appendChild(addrEl);

  const link = document.createElement("a");
  link.href = googleMapsDirectionsUrl(`${title}, ${address}`);
  link.target = "_blank";
  link.rel = "noopener";
  link.style.cssText =
    "display:inline-block;margin-top:6px;font-size:13px;font-weight:600;color:#2563eb;";
  link.textContent = "Directions →";
  wrap.appendChild(link);

  return wrap;
}

function CuratedAmenityList({
  category,
  limit,
}: {
  category: AmenityCategoryId;
  limit?: number;
}) {
  const items = useMemo(() => {
    const list = curatedForCategory(category);
    return limit ? list.slice(0, limit) : list;
  }, [category, limit]);

  if (items.length === 0) {
    return (
      <p className="text-sm text-slate-600">
        Featured places for this category are listed on our{" "}
        <Link href="/amenities" className="font-semibold text-blue-600 hover:underline">
          nearby amenities guide
        </Link>
        . Use the map to explore the Spring Valley area.
      </p>
    );
  }

  return (
    <ul className="space-y-3" aria-label={`Featured ${categoryById(category).label} near Spring Valley`}>
      {items.map((place) => (
        <li
          key={`${place.name}-${place.address}`}
          className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
        >
          <p className="font-semibold text-slate-900">{place.name}</p>
          <p className="mt-1 text-sm text-slate-600">{place.address}</p>
          {place.note ? <p className="mt-1 text-xs text-slate-500">{place.note}</p> : null}
          <a
            href={googleMapsDirectionsUrl(place.address)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-800"
          >
            <Navigation className="h-3.5 w-3.5" aria-hidden />
            Directions
          </a>
        </li>
      ))}
    </ul>
  );
}

export default function CommunityAmenityMap({
  showTitle = true,
  headingId = "nearby-amenities-heading",
  mapHeightClass = "h-[380px] md:h-[480px]",
  amenitiesPageHref = "/amenities",
  defaultCategory = "grocery",
  showCuratedList = true,
  className,
}: CommunityAmenityMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapElRef = useRef<HTMLDivElement>(null);
  const observerStartedRef = useRef(false);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);
  const activeCategoryRef = useRef<AmenityCategoryId>(defaultCategory);
  const loadStartedRef = useRef(false);

  const [inView, setInView] = useState(false);
  const [activeCategory, setActiveCategory] = useState<AmenityCategoryId>(defaultCategory);
  const [useFallback, setUseFallback] = useState(() => {
    if (typeof window !== "undefined" && mapsAuthFailed) return true;
    return !process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?.trim();
  });
  const [placesLoading, setPlacesLoading] = useState(false);
  const [livePlaces, setLivePlaces] = useState<MapPlaceResult[]>([]);
  const [mapReady, setMapReady] = useState(false);
  const [showCuratedForCategory, setShowCuratedForCategory] = useState(false);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?.trim();
  const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID?.trim();
  const useInteractiveMap = Boolean(apiKey) && !useFallback;

  const tablistId = useId();
  const { lat, lng } = springValleyCommunity.center;
  const embedUrl = googleMapsEmbedUrl(lat, lng, springValleyCommunity.defaultZoom);

  activeCategoryRef.current = activeCategory;

  const enterFallback = useCallback(() => {
    setUseFallback(true);
    setMapReady(false);
    mapInstanceRef.current = null;
    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = [];
    setLivePlaces([]);
    setShowCuratedForCategory(true);
  }, []);

  useEffect(() => {
    if (mapsAuthFailed) enterFallback();
    const onAuthFail = () => enterFallback();
    window.addEventListener("gmaps:auth-failure", onAuthFail);
    return () => window.removeEventListener("gmaps:auth-failure", onAuthFail);
  }, [enterFallback]);

  useEffect(() => {
    const node = mapContainerRef.current;
    if (!node || observerStartedRef.current) return;
    observerStartedRef.current = true;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "120px", threshold: 0.1 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const clearMarkers = useCallback(() => {
    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = [];
  }, []);

  const openInfo = useCallback(
    (map: google.maps.Map, title: string, address: string, position?: google.maps.LatLngLiteral) => {
      if (!infoWindowRef.current) {
        infoWindowRef.current = new google.maps.InfoWindow();
      }
      infoWindowRef.current.setContent(buildInfoWindowContent(title, address));
      if (position) {
        infoWindowRef.current.setPosition(position);
      }
      infoWindowRef.current.open(map);
    },
    [],
  );

  const renderPlacesOnMap = useCallback(
    (map: google.maps.Map, places: MapPlaceResult[]) => {
      clearMarkers();
      places.forEach((place) => {
        const marker = new google.maps.Marker({
          map,
          position: { lat: place.lat, lng: place.lng },
          title: place.name,
        });
        marker.addListener("click", () => {
          openInfo(map, place.name, place.address, { lat: place.lat, lng: place.lng });
        });
        markersRef.current.push(marker);
      });
    },
    [clearMarkers, openInfo],
  );

  const runCategorySearch = useCallback(
    async (map: google.maps.Map, categoryId: AmenityCategoryId) => {
      if (mapsAuthFailed || useFallback) {
        setShowCuratedForCategory(true);
        return;
      }

      setPlacesLoading(true);
      setLivePlaces([]);
      clearMarkers();
      setShowCuratedForCategory(false);

      try {
        const places = await searchCategory(springValleyCommunity.center, categoryId);
        const mapped: MapPlaceResult[] = [];
        for (let index = 0; index < places.length; index += 1) {
          const p = places[index];
          const loc = p.location;
          if (!loc) continue;
          const json = loc.toJSON?.() ?? { lat: loc.lat(), lng: loc.lng() };
          mapped.push({
            id: p.id ?? `place-${index}`,
            name: placeDisplayName(p),
            address: p.formattedAddress ?? "",
            lat: json.lat,
            lng: json.lng,
            mapsUri: p.googleMapsURI ?? undefined,
          });
        }

        if (mapped.length === 0) {
          setShowCuratedForCategory(true);
        } else {
          setLivePlaces(mapped);
          renderPlacesOnMap(map, mapped);
        }
      } catch {
        setShowCuratedForCategory(true);
      } finally {
        setPlacesLoading(false);
      }
    },
    [clearMarkers, renderPlacesOnMap, useFallback],
  );

  const initMap = useCallback(() => {
    if (mapsAuthFailed) {
      enterFallback();
      return;
    }
    const el = mapElRef.current;
    if (!el || !window.google?.maps || mapInstanceRef.current) return;

    const map = new google.maps.Map(el, {
      center: springValleyCommunity.center,
      zoom: springValleyCommunity.defaultZoom,
      mapTypeControl: true,
      streetViewControl: false,
      fullscreenControl: true,
      ...(mapId ? { mapId } : {}),
    });
    mapInstanceRef.current = map;

    const communityMarker = new google.maps.Marker({
      map,
      position: springValleyCommunity.center,
      title: springValleyCommunity.displayName,
      label: {
        text: "SV",
        color: "#ffffff",
        fontSize: "11px",
        fontWeight: "700",
      },
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 12,
        fillColor: "#2563eb",
        fillOpacity: 1,
        strokeColor: "#1e3a8a",
        strokeWeight: 2,
      },
      zIndex: 999,
    });
    communityMarker.addListener("click", () => {
      openInfo(
        map,
        springValleyCommunity.displayName,
        "West Las Vegas Valley, Clark County, Nevada",
        springValleyCommunity.center,
      );
    });

    setMapReady(true);
    void runCategorySearch(map, activeCategoryRef.current);
  }, [enterFallback, mapId, openInfo, runCategorySearch]);

  useEffect(() => {
    if (!inView || !apiKey || useFallback || loadStartedRef.current) return;
    loadStartedRef.current = true;

    if (mapsAuthFailed) {
      enterFallback();
      return;
    }

    void loadGoogleMaps(apiKey)
      .then(() => initMap())
      .catch(() => enterFallback());
  }, [apiKey, enterFallback, inView, initMap, useFallback]);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !mapReady || !useInteractiveMap) return;
    void runCategorySearch(map, activeCategory);
  }, [activeCategory, mapReady, runCategorySearch, useInteractiveMap]);

  const showCuratedPanel =
    showCuratedList &&
    (useFallback || showCuratedForCategory || (!placesLoading && livePlaces.length === 0));

  return (
    <div className={cn("space-y-6", className)} ref={mapContainerRef}>
      {showTitle ? (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2
              id={headingId}
              className="text-2xl font-bold text-slate-900 md:text-3xl"
            >
              Life near {springValleyCommunity.name}
            </h2>
            <p className="mt-2 max-w-2xl text-slate-600">
              Filter restaurants, grocery, parks, healthcare, and more around Spring Valley—then open
              the full guide for FAQs and commute context.
            </p>
          </div>
          <Link
            href={amenitiesPageHref}
            className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-800"
          >
            Nearby amenities guide
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      ) : null}

      <div
        className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        role="region"
        aria-label="Spring Valley nearby amenities map"
      >
        <div
          className="flex flex-wrap gap-2 border-b border-slate-200 bg-slate-50 p-3 md:p-4"
          role="tablist"
          aria-label="Amenity categories"
          id={tablistId}
        >
          {amenityCategories.map((cat) => {
            const selected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`${tablistId}-panel`}
                id={`${tablistId}-${cat.id}`}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "min-h-[44px] rounded-full border px-3 py-2 text-xs font-semibold transition-colors md:text-sm",
                  selected
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:border-blue-400",
                )}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        <div
          id={`${tablistId}-panel`}
          role="tabpanel"
          aria-labelledby={`${tablistId}-${activeCategory}`}
          className={cn("relative w-full bg-slate-100", mapHeightClass)}
        >
          {useFallback ? (
            <>
              <iframe
                title="Spring Valley, Las Vegas map"
                src={embedUrl}
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute bottom-3 left-3 max-w-xs rounded-lg bg-white/95 px-3 py-2 text-xs text-slate-700 shadow-md">
                <MapPin className="mb-1 inline h-4 w-4 text-blue-600" aria-hidden /> Center: Spring
                Valley area ({lat.toFixed(4)}, {lng.toFixed(4)})
              </div>
            </>
          ) : (
            <div ref={mapElRef} className="absolute inset-0 h-full w-full" />
          )}
          {placesLoading && useInteractiveMap ? (
            <div className="absolute right-3 top-3 rounded-md bg-white/90 px-3 py-1 text-xs font-medium text-slate-700 shadow">
              Loading places…
            </div>
          ) : null}
        </div>

        {showCuratedPanel ? (
          <div className="border-t border-slate-200 bg-slate-50 p-4 md:p-6">
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-500">
              Featured {categoryById(activeCategory).label} near {springValleyCommunity.name}
            </h3>
            <CuratedAmenityList category={activeCategory} limit={useFallback ? 4 : undefined} />
          </div>
        ) : null}
      </div>

      {useInteractiveMap && livePlaces.length > 0 ? (
        <p className="text-center text-xs text-slate-500">
          Showing up to 10 {categoryById(activeCategory).label.toLowerCase()} from Google Places near
          Spring Valley. Confirm hours and availability before you visit.
        </p>
      ) : null}

      {useInteractiveMap && livePlaces.length > 0 && showCuratedList && curatedForCategory(activeCategory).length > 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-4 md:p-6">
          <h3 className="text-lg font-bold text-slate-900">
            Also nearby — {categoryById(activeCategory).label}
          </h3>
          <div className="mt-4">
            <CuratedAmenityList category={activeCategory} limit={3} />
          </div>
        </div>
      ) : null}
    </div>
  );
}
