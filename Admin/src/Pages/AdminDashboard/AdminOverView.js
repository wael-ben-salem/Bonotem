import React, { useState } from 'react';
import LineColumnArea from './AdminLineColumnArea';
import {
    Card,
    CardBody,
    Col,
    Row
} from "reactstrap";
import { OverViewData } from '../../CommonData/Data/index';
import MixBarChart from '../AllCharts/rechart/MixBarChart';
import LineColumnAreaData from './AdminLineColumnArea';

const OverView = () => {
    const [activeFilter, setActiveFilter] = useState('1Y'); // Initial active filter state

    

    return (
        <div className="d-flex justify-content-center ">
            <Col xl={10}>
                <Card>
                    <CardBody>
                        <div className="d-flex align-items-center">
                            <div className="flex-grow-1">
                            </div>
                        </div>
                        <div>
                            <LineColumnAreaData filter={activeFilter} />
                        </div>
                    </CardBody>
                </Card>
            </Col>
        </div>
    );
    
};

export default OverView;
