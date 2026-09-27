"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { ArrowRight, MapPin, Navigation } from "lucide-react";
import { cn } from "@/lib/utils";
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
  rating?: number;
  lat: number;
  lng: number;
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

declare global {
  interface Window {
    __springValleyAmenityInit?: () => void;
  }
}

function curatedForCategory(category: AmenityCategoryId): CuratedPlace[] {
  return curatedSpringValleyPlaces.filter((p) => p.category === category);
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
        Explore the interactive map when your API key is configured, or browse all categories on{" "}
        <Link href="/amenities" className="font-semibold text-blue-600 hover:underline">
          nearby amenities
        </Link>
        .
      </p>
    );
  }

  return (
    <ul className="space-y-3" aria-label={`Curated ${categoryById(category).label} near Spring Valley`}>
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
  const scriptElRef = useRef<HTMLScriptElement | null>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);
  const activeCategoryRef = useRef<AmenityCategoryId>(defaultCategory);

  const [inView, setInView] = useState(false);
  const [activeCategory, setActiveCategory] = useState<AmenityCategoryId>(defaultCategory);
  const [mapFailed, setMapFailed] = useState(false);
  const [placesLoading, setPlacesLoading] = useState(false);
  const [livePlaces, setLivePlaces] = useState<MapPlaceResult[]>([]);
  const [mapReady, setMapReady] = useState(false);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?.trim();
  const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID?.trim();
  const useInteractiveMap = Boolean(apiKey) && !mapFailed;

  const tablistId = useId();
  const { lat, lng } = springValleyCommunity.center;
  const embedUrl = googleMapsEmbedUrl(lat, lng, springValleyCommunity.defaultZoom);

  activeCategoryRef.current = activeCategory;

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
    (
      map: google.maps.Map,
      title: string,
      address: string,
      rating?: number,
      position?: google.maps.LatLngLiteral,
    ) => {
      if (!infoWindowRef.current) {
        infoWindowRef.current = new google.maps.InfoWindow();
      }
      const ratingLine =
        rating !== undefined
          ? `<p style="margin:4px 0;font-size:13px;color:#475569;">Rating: ${rating.toFixed(1)}</p>`
          : "";
      const dest = encodeURIComponent(`${title}, ${address}`);
      infoWindowRef.current.setContent(`
        <div style="padding:8px;max-width:260px;font-family:system-ui,sans-serif;">
          <div style="font-size:15px;font-weight:700;color:#0f172a;margin-bottom:4px;">${title}</div>
          <p style="margin:0 0 6px;font-size:13px;color:#475569;">${address}</p>
          ${ratingLine}
          <a href="https://www.google.com/maps/dir/?api=1&destination=${dest}"
             target="_blank" rel="noopener"
             style="display:inline-block;margin-top:6px;font-size:13px;font-weight:600;color:#2563eb;">
            Directions →
          </a>
        </div>
      `);
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
          openInfo(map, place.name, place.address, place.rating, {
            lat: place.lat,
            lng: place.lng,
          });
        });
        markersRef.current.push(marker);
      });
    },
    [clearMarkers, openInfo],
  );

  const searchNearby = useCallback(
    async (map: google.maps.Map, categoryId: AmenityCategoryId) => {
      setPlacesLoading(true);
      setLivePlaces([]);
      clearMarkers();

      const category = categoryById(categoryId);
      const center = springValleyCommunity.center;

      try {
        const placesLib = (await google.maps.importLibrary("places")) as google.maps.PlacesLibrary;
        const PlaceCtor = placesLib.Place;

        if (PlaceCtor && "searchNearby" in PlaceCtor) {
          const searchNearbyFn = PlaceCtor.searchNearby as (request: {
            fields: string[];
            locationRestriction: { center: google.maps.LatLngLiteral; radius: number };
            includedPrimaryTypes: string[];
            maxResultCount: number;
          }) => Promise<{ places: google.maps.places.Place[] }>;

          const { places } = await searchNearbyFn({
            fields: ["displayName", "formattedAddress", "location", "rating", "id"],
            locationRestriction: {
              center,
              radius: springValleyCommunity.searchRadiusMeters,
            },
            includedPrimaryTypes: category.primaryTypes,
            maxResultCount: 15,
          });

          const mapped: MapPlaceResult[] = [];
          for (let index = 0; index < places.length; index += 1) {
            const p = places[index];
            const loc = p.location;
            if (!loc) continue;
            const displayName = p.displayName;
            const name =
              typeof displayName === "string"
                ? displayName
                : displayName && typeof displayName === "object" && "text" in displayName
                  ? String((displayName as { text?: string }).text ?? "Place")
                  : "Place";
            mapped.push({
              id: p.id ?? `place-${index}`,
              name,
              address: p.formattedAddress ?? "",
              rating: p.rating ?? undefined,
              lat: loc.lat(),
              lng: loc.lng(),
            });
          }

          setLivePlaces(mapped);
          renderPlacesOnMap(map, mapped);
          setPlacesLoading(false);
          return;
        }
      } catch {
        // legacy fallback
      }

      try {
        const service = new google.maps.places.PlacesService(map);
        const legacyType = category.legacyType ?? "establishment";
        service.nearbySearch(
          {
            location: center,
            radius: springValleyCommunity.searchRadiusMeters,
            type: legacyType,
          },
          (results, status) => {
            if (status !== google.maps.places.PlacesServiceStatus.OK || !results) {
              setPlacesLoading(false);
              return;
            }
            const mapped: MapPlaceResult[] = results.slice(0, 15).map((r, index) => {
              const loc = r.geometry?.location;
              return {
                id: r.place_id ?? `legacy-${index}`,
                name: r.name ?? "Place",
                address: r.vicinity ?? "",
                rating: r.rating,
                lat: loc?.lat() ?? center.lat,
                lng: loc?.lng() ?? center.lng,
              };
            });
            setLivePlaces(mapped);
            renderPlacesOnMap(map, mapped);
            setPlacesLoading(false);
          },
        );
      } catch {
        setMapFailed(true);
        setPlacesLoading(false);
      }
    },
    [clearMarkers, renderPlacesOnMap],
  );

  const initMap = useCallback(() => {
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
        undefined,
        springValleyCommunity.center,
      );
    });

    setMapReady(true);
    void searchNearby(map, activeCategoryRef.current);
  }, [mapId, openInfo, searchNearby]);

  useEffect(() => {
    if (!inView || !useInteractiveMap) return;
    if (scriptElRef.current) return;

    window.__springValleyAmenityInit = () => {
      try {
        initMap();
      } catch {
        setMapFailed(true);
      }
    };

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey!)}&libraries=places&loading=async&callback=__springValleyAmenityInit`;
    script.async = true;
    script.defer = true;
    script.onerror = () => setMapFailed(true);
    scriptElRef.current = script;
    document.head.appendChild(script);

    return () => {
      window.__springValleyAmenityInit = undefined;
      script.remove();
      scriptElRef.current = null;
      mapInstanceRef.current = null;
      setMapReady(false);
      clearMarkers();
    };
  }, [apiKey, clearMarkers, inView, initMap, useInteractiveMap]);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !mapReady || !useInteractiveMap) return;
    void searchNearby(map, activeCategory);
  }, [activeCategory, mapReady, searchNearby, useInteractiveMap]);

  const showFallback = !useInteractiveMap;

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
          {showFallback ? (
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

        {showFallback && showCuratedList ? (
          <div className="border-t border-slate-200 bg-slate-50 p-4 md:p-6">
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-500">
              Curated {categoryById(activeCategory).label} (no API key required)
            </h3>
            <CuratedAmenityList category={activeCategory} limit={4} />
          </div>
        ) : null}
      </div>

      {useInteractiveMap && livePlaces.length > 0 ? (
        <p className="text-center text-xs text-slate-500">
          Showing up to 15 {categoryById(activeCategory).label.toLowerCase()} from Google Places near
          Spring Valley. Confirm hours and availability before you visit.
        </p>
      ) : null}

      {!showFallback && showCuratedList ? (
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
