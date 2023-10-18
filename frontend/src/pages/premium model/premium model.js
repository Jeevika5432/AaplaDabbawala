import React, { Component } from 'react';
import styles from "./card.module.css";
class Card extends Component {
    render() {
        const { food, address } = this.props;
        return (
            <div className={styles.card}>
                <img src={address} alt='dinner' className={styles.img} />
                <p className={styles.foodName}>{food}</p>
                <p className={styles.foodDesc}>enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                <button className={styles.btn}>PRICING TO BE MENTIONED</button>

            </div>
        );
    }
}

export default Card;
