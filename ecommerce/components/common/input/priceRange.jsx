import React from 'react';
import { Range, getTrackBackground } from 'react-range';

const RangeSlider = ({ max = 100, min = 0, values = [0], setValues }) => {
  return (
    <div style={{ width: '100%', padding: '20px' }}>
      <Range
        step={1}
        min={min}
        max={max}
        values={values}
        onChange={newValues => setValues(newValues)}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '8px',
              width: '100%',
              backgroundColor:'gray',
              borderRadius: '4px',
              boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.2)' ,
              background: getTrackBackground({
                values,
                colors: ['black', '#ddd'], 
                min,
                max,
              }),
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '20px',
              width: '20px',
              borderRadius: '50%',
              backgroundColor: 'black', 
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.2)' // Add shadow for better visibility
            }}
          />
        )}
      />
      <div className='flex justify-between font-bold  items-center' style={{ marginTop: '10px' }}>
        <div>{min}</div>
        <div>{values[0]}</div>
        <div>{max}</div>
      </div>
    </div>
  );
};

export default RangeSlider;
