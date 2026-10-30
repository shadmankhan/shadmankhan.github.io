"use client";

import { useMemo, useState } from "react";
import { geoNaturalEarth1, geoPath } from "d3";
import { feature } from "topojson-client";
import world from "world-atlas/countries-110m.json";
import type { Feature, FeatureCollection, Geometry } from "geojson";
import { travelPlaces } from "@/content/public-profile";

export function TravelMap() {
  const [selected, setSelected] = useState("Lucknow");
  const selectedPlace = useMemo(() => travelPlaces.find((place) => place.name === selected) ?? travelPlaces[0], [selected]);
  const mapData = useMemo(() => {
    try {
      const topology = world as unknown as { objects: { countries: unknown } };
      const countries = feature(topology as never, topology.objects.countries as never) as unknown as FeatureCollection<Geometry, { name?: string }>;
      const projection = geoNaturalEarth1().fitExtent([[12, 14],[988,486]], countries);
      const path = geoPath(projection);
      const paths = countries.features.map((country: Feature<Geometry, { name?: string }>) => ({
        d: path(country) ?? "",
        visited: ["356", "826"].includes(String(country.id).padStart(3,"0")) || ["India", "United Kingdom"].includes(country.properties?.name ?? "")
      })).filter((country) => country.d);
      const points = travelPlaces.map((place) => { const projected = projection(place.coordinates); return { ...place, x: projected?.[0] ?? 0, y: projected?.[1] ?? 0 }; });
      return { paths, points };
    } catch (error) { console.warn("The map outline could not be drawn; the accessible place list is still available.", error); return null; }
  }, []);
  const paths = mapData?.paths ?? [];
  const points = mapData?.points ?? [];
  const mapError = mapData === null;

  return <div>
    {!mapError && paths.length > 0 && <div className="map-wrap"><svg className="travel-map" viewBox="0 0 1000 500" role="img" aria-label="MapTrifold showing places visited in the United Kingdom and India">
      <g>{paths.map((country, index) => <path key={index} className={country.visited ? "map-visited" : "map-land"} d={country.d} />)}</g>
      <g>{points.map((place) => <g key={place.name} role="button" tabIndex={0} aria-label={`${place.name}${place.home ? ", home base" : ""}`} onClick={() => setSelected(place.name)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setSelected(place.name); } }} style={{ cursor: "pointer" }}><circle className={`map-dot${selected === place.name ? " selected" : ""}`} cx={place.x} cy={place.y} r={place.home ? 6 : 4.5} /><title>{`${place.name}${place.home ? " · home base" : ""}`}</title></g>)}</g>
    </svg></div>}
    <div aria-live="polite" className="notice" style={{ marginTop: 13 }}><strong>{selectedPlace.name}</strong>{selectedPlace.home ? " · home base" : " · visited"} · {selectedPlace.region}. The dots identify city areas, not a precise address or trip date.</div>
    <div className="place-list" aria-label="Visited places">{travelPlaces.map((place) => <button key={place.name} type="button" className="place-button" aria-pressed={selected === place.name} onClick={() => setSelected(place.name)}>{place.name}{place.home ? " · home" : ""}</button>)}</div>
    {mapError && <p className="muted" style={{ fontSize: 12 }}>The illustrated map is unavailable in this browser. The place list still works.</p>}
    <p className="muted" style={{ fontSize: 11, marginTop: 15 }}>MapTrifold geometry: Natural Earth 1:110m dataset, via world-atlas. Visited places are self-reported.</p>
  </div>;
}
