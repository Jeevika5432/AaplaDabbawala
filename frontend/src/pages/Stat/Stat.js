import React from 'react';
import './Stat.css';
import DabbaIcon from "../../images/dabbawala_icon.png"

const Stat = () => {
    return (
        <div>
            <div className="stats">
                <div className="stat">
                    <i className="fas fa-globe stat-icon fa-2x"></i>
                    <div className='text-stat'>
                        <h3>76+</h3>
                        <p>Localities</p>
                    </div>
                </div>
                <div className="stat">
                    <img
                        src={DabbaIcon}
                        alt="Dabbawalas"
                        width="50"
                        height="50"
                        className="stat-icon"
                    />
                    <div className="text-stat">
                        <h3>1300+</h3>
                        <p>DABBAWALAS</p>
                    </div>
                </div>
                <div className="stat">
                    <i className="fas fa-heart stat-icon fa-2x"></i>
                    <div className='text-stat'>
                        <h3>26K+</h3>
                        <p>Customers</p>
                    </div>
                </div>
                <div className="stat">
                    <i className="fas fa-smile stat-icon fa-2x"></i>
                    <div className='text-stat'>
                        <h3>2L+</h3>
                        <p>Dabbas Delivered</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Stat;


