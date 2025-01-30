import React, { useState } from 'react';
import axios from 'axios';
import Map from './Map';
import './CityDistanceCalculator.css';

const OPENCAGE_API_KEY = '796915aee49648e7a8352b60cf96ad6f';

interface Coordinates {
    lat: number;
    lng: number;
}

const CityDistanceCalculator: React.FC = () => {
    const [city1, setCity1] = useState('');
    const [city2, setCity2] = useState('');
    const [distance, setDistance] = useState<number | null>(null);
    const [coord1, setCoord1] = useState<Coordinates | null>(null);
    const [coord2, setCoord2] = useState<Coordinates | null>(null);

    const getCoordinates = async (city: string): Promise<Coordinates | null> => {
        try {
            const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json`, {
                params: {
                    q: city,
                    key: OPENCAGE_API_KEY,
                    language: 'en',
                    pretty: 1,
                },
            });
            const { lat, lng } = response.data.results[0].geometry;
            return { lat, lng };
        } catch (error) {
            console.error('Error fetching coordinates:', error);
            return null;
        }
    };

    const calculateDistance = (coord1: Coordinates, coord2: Coordinates): number => {
        const R = 6371; // радиус земли в км
        const dLat = (coord2.lat - coord1.lat) * (Math.PI / 180);
        const dLng = (coord2.lng - coord1.lng) * (Math.PI / 180);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(coord1.lat * (Math.PI / 180)) * Math.cos(coord2.lat * (Math.PI / 180)) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return Math.round(R * c);
    };

    const handleCalculateDistance = async () => {
        if (city1 && city2) {
            const coord1 = await getCoordinates(city1);
            const coord2 = await getCoordinates(city2);
            if (coord1 && coord2) {
                const dist = calculateDistance(coord1, coord2);
                setDistance(dist);
                setCoord1(coord1);
                setCoord2(coord2);
            } else {
                alert('The coordinates for one of the cities could not be found. Check the entered data.');
                setDistance(null);
                setCoord1(null);
                setCoord2(null);
            }
        } else {
            alert('Enter the names of both cities.');
        }
    };

    return (
        <div className="CityDistanceCalculator">
            
            <div className="input-container">
                <input
                    type="text"
                    value={city1}
                    onChange={(e) => setCity1(e.target.value)}
                    placeholder="City 1"
                />
                <input
                    type="text"
                    value={city2}
                    onChange={(e) => setCity2(e.target.value)}
                    placeholder="City 2"
                />
                <button onClick={handleCalculateDistance}>Calculate Distance</button>
            </div>

            {distance !== null && <p>Distance: {distance} km</p>}
            {coord1 && coord2 && <Map coord1={coord1} coord2={coord2} />}
        </div>
    );
};

export default CityDistanceCalculator;