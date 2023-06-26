import React, { Suspense } from 'react';
import Content from './content'
import Header from './header';
const Layouts = () => {
    const Loaders = () => {
        return(<>
          <div className='main-content'>
                    <div className='section'>
                        <div className='section-body'>
                            <div className='row'>
                              <div className='col-sm-12'>
                                <div className='absolute-class'>
                                </div>
                              </div>
                            </div>
                        </div>
                    </div>
                </div>
        </>)
      }
    return(<>
            <Header />
            <div className="container">
              <div className='row'>
                    
                    <Suspense fallback={Loaders()} >
                        <Content  />
                    </Suspense>
              </div>
        
            </div>
    </>
      )
}
export default Layouts;