import React from 'react';
import ReactDOM from 'react-dom/client';
import Options from './Options.tsx';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import './style.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <MantineProvider>
            <Options />
        </MantineProvider>
    </React.StrictMode>,
);
