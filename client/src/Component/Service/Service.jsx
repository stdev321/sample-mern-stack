import React, { useState } from 'react';
import { Button, Timeline } from 'antd';
const Service = () => {
  const [reverse, setReverse] = useState(false);
  return (
    <div className='service-container d-flex justify-content-center align-items-center'>
      <Timeline
        pending="Recording..."
        reverse={reverse}
        items={[
          {
            children: 'Create a services site 2015-09-01',
          },
          {
            children: 'Solve initial network problems 2015-09-01',
          },
          {
            children: 'Technical testing 2015-09-01',
          },
        ]}
      />
    </div>
  );
};
export default Service;