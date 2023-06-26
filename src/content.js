import React from 'react'
import { Route, Routes } from 'react-router-dom'

import routes from './router'

const Appcontent = (props) => {
    return(
            <Routes getusers={props.getusers} stores={props.stores}>
          {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  stores={props.stores}
                  getusers={props.getusers}
                  element={<route.element getusers={props.getusers} stores={props.stores}/>}
                />
              )
            )
          })}
        </Routes>
    )
}

export default Appcontent;