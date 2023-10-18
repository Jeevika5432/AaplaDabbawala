import React from "react";
import styles from './ServicePage.module.css';
import Services from "../../Components/services/Services";



function ServicePage() {
  return (
    <main className={styles.container}>
      <Services/>
    </main>
  );
}

export default ServicePage;