// components/RangeSlider.js
import React, { useState } from 'react';
import { Range, getTrackBackground } from 'react-range';

const RangeSlider = ({max=100,min=0,values=[50],setValues}) => {
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
              height: '6px',
              width: '100%',
              borderRadius: '4px',
              background: getTrackBackground({
                values,
                colors: ['black', '#ddd'],
                min: min,
                max: max
              })
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
            }}
          />
        )}
      />
     <div className='flex justify-between items-center'>
     <div style={{ marginTop: '10px' }}>{min}</div>
     <div style={{ marginTop: '10px' }}>{values[0]}</div>
     </div>
    </div>
  );
};

export default RangeSlider;
