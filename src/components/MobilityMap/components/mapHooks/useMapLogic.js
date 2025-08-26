import { useCallback, useEffect, useState } from "react";
import { layerConfig } from "../../../../config/map/mainLayerConfig";

// Helper function to  get all layers
const getAllLayers = (layers) => {
  let result = [];
  layers.forEach((layer) => {
    result.push(layer);
    if (layer.children) {
      result = result.concat(getAllLayers(layer.children));
    }
  });
  return result;
};

// Helper function to get all symbol layers with icons
const getSymbolLayersWithIcons = (layers) => {
  return getAllLayers(layers).filter(
    (layer) => layer.type === "symbol" && layer.icon
  );
};

// Custom hooks for map logic
const useMapLogic = (visibleLayers, mapRef) => {
  const [geoJsonData, setGeoJsonData] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  const [popupInfo, setPopupInfo] = useState(null);
  const [selectedRouteId, setSelectedRouteId] = useState(null); // or bus routes highlighting when selected
  const [error, setError] = useState(null);

  // Fetch GeoJSON data
  useEffect(() => {
    const fetchData = async () => {
      const layersToFetch = visibleLayers.filter(
        (layer) => !geoJsonData[layer.file]
      );
      if (layersToFetch.length === 0) return;

      setIsFetching(true);
      setError(null);

      try {
        const promises = layersToFetch.map((layer) =>
          fetch(layer.file)
            .then((res) => {
              if (!res.ok) throw new Error(`Failed to fetch ${layer.file}`);
              return res.json();
            })
            .then((data) => ({ file: layer.file, data }))
        );

        const results = await Promise.all(promises);
        const newData = results.reduce((acc, { file, data }) => {
          acc[file] = data;
          return acc;
        }, {});
        setGeoJsonData((prev) => ({ ...prev, ...newData }));
      } catch (err) {
        console.error("Error fetching GeoJSON:", err);
        setError("Could not load map data. Please try again later.");
      } finally {
        setIsFetching(false);
      }
    };

    fetchData();
  }, [visibleLayers, geoJsonData]);

  // Load icons for all symbol layers
  const loadMapIcons = useCallback((map) => {
    if (!map) return;

    const allLayers = layerConfig.flatMap((theme) => theme.layers);
    const symbolLayers = getSymbolLayersWithIcons(allLayers);

    const iconsToLoad = new Map();
    symbolLayers.forEach((layer) => {
      if (!iconsToLoad.has(layer.icon.id)) {
        iconsToLoad.set(layer.icon.id, layer.icon.url);
      }
    });

    const iconPromises = Array.from(iconsToLoad.entries()).map(
      ([id, url]) =>
        new Promise((resolve, reject) => {
          if (map.hasImage(id)) return resolve(id);
          map.loadImage(url, (err, img) => {
            if (err) return reject(err);
            if (!map.hasImage(id)) map.addImage(id, img);
            resolve(id);
          });
        })
    );

    Promise.all(iconPromises).catch((err) => {
      console.error("Error loading icons:", err);
      setError("Could not load map icons.");
    });
  }, []);

  // Handle map click for popup and bus route highlighting
  const handleMapClick = useCallback(
    (event) => {
      const map = mapRef.current?.getMap();
      if (!map || !event.features) return;

      const feature = event.features[0]; // Topmost item considered only

      // Deselect previous bus route
      if (selectedRouteId !== null && map.getSource("bus-routes")) {
        map.setFeatureState(
          { source: "bus-routes", id: selectedRouteId },
          { selected: false }
        );
        setSelectedRouteId(null);
      }
      // If no feature clicked, close popup
      if (!feature) {
        setPopupInfo(null);
        return;
      }
      // Highlight selected bus route
      if (feature.layer.id === "bus-routes") {
        const newId = feature.id;
        map.setFeatureState(
          { source: "bus-routes", id: newId },
          { selected: true }
        );
        setSelectedRouteId(newId);
      }

      // Show popup if tooltipProperties exist
      const allLayers = layerConfig.flatMap((theme) => theme.layers);
      const clickedLayer = getAllLayers(allLayers).find(
        (l) => l.id === feature.layer.id
      );

      if (clickedLayer?.tooltipProperties) {
        setPopupInfo({
          longitude: event.lngLat.lng,
          latitude: event.lngLat.lat,
          layer: clickedLayer,
          feature,
        });
      } else {
        setPopupInfo(null);
      }
    },
    [selectedRouteId, mapRef]
  );

  return {
    geoJsonData,
    isFetching,
    popupInfo,
    setPopupInfo,
    loadMapIcons,
    handleMapClick,
    error,
  };
};

export default useMapLogic;
