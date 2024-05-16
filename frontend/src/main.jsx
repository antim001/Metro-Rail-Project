import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { RouterProvider } from "react-router-dom";
import router from './Routes/Routes';
import AuthProvider from './Provider/AuthProvider';
import { Helmet, HelmetProvider } from "react-helmet-async";
import { ContextProver } from './Provider/ContextProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <Helmet>
        <title>Metro service</title>
      </Helmet>

      <div className='max-w-screen-2xl mx-auto'>
        <ContextProver>
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </ContextProver>
      </div>
    </HelmetProvider>
  </React.StrictMode>
);
