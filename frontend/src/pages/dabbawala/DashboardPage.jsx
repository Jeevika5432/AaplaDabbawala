import React from 'react';
import AvailabilityStatus from '../../Components/dabbawala/AvailabilityStatus';
import InventoryManagement from '../../Components/dashboard/InventoryManagement';
import MealScheduleCalendar from '../../Components/dashboard/MealScheduleCalendar';

const DashboardPage = () => {
  return (
    <div>
      <h1>Dabbawala Dashboard</h1>
      <AvailabilityStatus />
      <InventoryManagement />
      <MealScheduleCalendar />
      {/* Add other dashboard components as needed */}
    </div>
  );
};

export default DashboardPage;
