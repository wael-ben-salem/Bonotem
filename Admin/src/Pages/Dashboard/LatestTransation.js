import React from 'react';

import { Row, Col } from 'reactstrap';

import { LatestTransationData } from '../../CommonData/Data/index';
import CarteRestaurant from './CarteRestaurant';

const LatestTransation = () => {
    return (
        <React.Fragment>
            <Row >
                <Col xl={8}>
                    
                    <div className="card">
                        
                        <div className="card-body">
                        <h5 className="card-title mb-3">Menu</h5>
                        
                        <CarteRestaurant />

                        </div>
                    </div>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default LatestTransation;