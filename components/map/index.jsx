import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { Map } from "mapbox-gl";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
//FUNCTIONS
import useBreakpoints from "../../hooks/useBreakpoints";

const MapboxMap = (props) => {
    const mapContainer = useRef(null);
    const container = useRef(null);
    const [mapHeight, setMapHeight] = useState(null);

    const { isMobile, isTablet, isDesktop } = useBreakpoints();

    useEffect(() => {
        console.log(isMobile, isTablet, isDesktop);
    }, [isMobile, isTablet, isDesktop]);

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API;

    useEffect(() => {
        // Initialize map
        if (mapContainer.current.clientWidth > 0) {
            const map = new Map({
                container: mapContainer.current,
                style: "mapbox://styles/mapbox/light-v11",
                center: [8.70288, 50.03262],
                pitch: 45,
                zoom: 15.5,
                bearing: -17.6,
                antialias: true,
                scrollZoom: false, // set scrollZoom option based on device
                dragPan: !isMobile,
            });

            const marker = new mapboxgl.Marker({
                color: "#df3288",
            })
                .setLngLat([8.70288, 50.03262])
                .addTo(map);

            map.addControl(
                new mapboxgl.NavigationControl({
                    visualizePitch: true,
                    showZoom: true,
                })
            );
            // Get height of container and set mapHeight state
            console.log(mapContainer.current.clientWidth);

            setMapHeight(mapContainer.current.clientWidth);
        }
    }, [mapContainer.current]);

    useEffect(() => {
        // Get height of container and set mapHeight state
        if (mapContainer.current) {
            setMapHeight(mapContainer.current.clientWidth);
            console.log(mapContainer.current.clientWidth);
        }
    }, []);

    return (
        <div className="map-container" ref={container} style={{ height: "100%" }}>
            <div className="map h-full" style={props.style} ref={mapContainer}></div>
        </div>
    );
};

export default MapboxMap;
