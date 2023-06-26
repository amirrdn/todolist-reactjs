import React from 'react'
import Dashboard from './home';
import DetailPage from './detail';

const routes = [
    {path: '/', name: 'Home', element: Dashboard},
    {path: '/task/detail/:id', name: 'Detail', element: DetailPage},
]
export default routes