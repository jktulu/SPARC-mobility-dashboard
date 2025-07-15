

import { Divider } from '@mui/material';
import { useState } from 'react';

import Header from '../components/common/Header';
import NavigationButtons from '../components/common/NavigationButtons';
import Title from '../components/common/Title';
import DataCatalogue from '../components/DataCatalogue/DataCatalogue';
import MobilityKPIs from '../components/MobilityKPIs/MobilityKPIs';

function Home() {
    const [activeLayer, setActiveLayer] = useState('goals');
    const mapNavigationButtons = [
        { id: 'goals', text: 'Mobility Goals' },
        { id: 'catalogue', text: 'Data Catalogue' },
        // { id: 'highlights', text: 'Highlights' },
        // { id: 'explore', text: 'Explore Map' },
    ];
    const handleLayerChange = (layerId) => {
        console.log('Button clicked, changing active layer to:', layerId);
        setActiveLayer(layerId);
    };


    return (
        <div style={{ padding: '4rem', alignItems: 'center' }}>

            <Title />
            <NavigationButtons
                buttons={mapNavigationButtons}
                onButtonClick={handleLayerChange}
                activeButtonId={activeLayer}
            />

            <Divider style={{ margin: '1rem' }} />

            <div style={{ marginTop: '2rem' }}>
                {activeLayer === 'goals' && <MobilityKPIs />}
                {activeLayer === 'catalogue' && <DataCatalogue />}
            </div>

            <Divider style={{ margin: '1rem' }} />

        </div>

    );
}

export default Home;