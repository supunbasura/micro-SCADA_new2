import React from 'react';
// import AlarmIcon from '@material-ui/icons/Alarm';
// import WarningIcon from '@mui/icons-material/Warning';
const data = [
  { id: 1, message: "VT MCB TRIP" },
  { id: 2, message: "INDICATION CKT MCB TRIP/OFF" },
  { id: 3, message: "MASTER TRIP RELAY K861 OPTD OPERATED" },
  { id: 4, message: "MASTER TRIP RELAY K862 OPTD OPERATED" },
  { id: 5, message: "BUSBAR TRIP RELAY K96 OPTD OPERATED" },
  { id: 6, message: "TRIP CIRCUIT-1 CKT-1 UNHEALTHY" },
  { id: 7, message: "TRIP CIRCUIT-2 CKT-2 UNHEALTHY" },
  { id: 8, message: "CB 10152 SF6 LOW ALARM LOSS OF SF6" },
  { id: 9, message: "CB 10152 SF6 GENERAL LOCKOUT SF6" },
  { id: 10, message: "CB 10152 MOTOR CONTROL FAULT" },
  { id: 11, message: "CB 10152 MOTOR RUNNING TIME SUPERVISION FAIL MCB TRIP" },
  { id: 12, message: "CB 10152 SPRING NOT CHARGED" },
  { id: 13, message: "CB 10152 HEATING FAULT" },
  { id: 14, message: "CB 10152 LOCAL MODE SELECTED" },
  { id: 15, message: "CB 30152 SPRING DISCHARGED OPERATING MECHANISM CHARGED" },
  { id: 16, message: "CB 30152 OPERATING MECHANISM BLOCKED" },
  { id: 17, message: "LEVER INSERTED" },
  { id: 18, message: "SF6 LOW ALARM MONITORING SF6 UNDERPRESSURE / OVERPRESSURE" },
  { id: 19, message: "DC MCB NOT TRIPPED" },
  { id: 20, message: "86 LOCKOUT OPERATED" },
  { id: 21, message: "TRIP CIRCUIT-1 TC-1 FAIL" },
  { id: 22, message: "TRIP CIRCUIT-2 TC-2 FAIL" }
];

const DataList = () => {
  return (
    <div style={styles.dataListContainer}>
      {data.map((item, index) => (
        <div key={item.id} style={{ ...styles.item, backgroundColor: index % 2 === 0 ? '#f0f0f0' : '#fff' }}>
          {/* <AlarmIcon style={{ marginRight: '10px' }} /> */}
          <span style={styles.text}>{item.message}</span>
        </div>
      ))}
    </div>
  );
};

const styles = {
  dataListContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  item: {
    width: '50%', // This will create two columns
    padding: '10px',
    boxSizing: 'border-box',
    borderBottom: '1px solid #ccc', // Optional: adds a line between items
  },
  text: {
    fontSize: '10px', // Sets the font size to 10px
  }
};

export default DataList;
