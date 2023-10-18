import React, { Component } from 'react';
import styles from './Services.module.css';
import Card from './Card';

import card1 from './sea.jpg';
import card2 from './vegetable.jpg';


class Services extends Component {
    render() {
        return (
                <div className={styles.cardsContainers}>
                <h1 className={styles.menu}>MODEL TYPE</h1>
                <div className={styles.cards}>
                    <Card address={card1} food='PREMIUM SERVICE '></Card>
                    <Card address={card2} food='REGULAR SERVICE '></Card>
                   
                </div>
                </div>
        );
    }
}

export default Services;