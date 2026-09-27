import {
  categoryById,
  springValleyCommunity,
  type AmenityCategoryId,
} from "@/lib/spring-valley-amenities";

const cache = new Map<string, Promise<google.maps.places.Place[]>>();

export function searchCategory(
  center: google.maps.LatLngLiteral,
  categoryId: AmenityCategoryId,
): Promise<google.maps.places.Place[]> {
  let p = cache.get(categoryId);
  if (!p) {
    p = (async () => {
      const { Place } = (await google.maps.importLibrary("places")) as google.maps.PlacesLibrary;
      const category = categoryById(categoryId);
      const { places } = await Place.searchNearby({
        fields: ["displayName", "location", "formattedAddress", "googleMapsURI", "id"],
        locationRestriction: {
          center,
          radius: springValleyCommunity.searchRadiusMeters,
        },
        includedPrimaryTypes: category.primaryTypes,
        maxResultCount: 10,
        rankPreference: "POPULARITY" as unknown as google.maps.places.SearchNearbyRankPreference,
      });
      return places;
    })();
    p.catch(() => cache.delete(categoryId));
    cache.set(categoryId, p);
  }
  return p;
}
