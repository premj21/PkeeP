import React from 'react';
import ReactDOM from 'react-dom/client';
import Show from './UserInfo/Show';
import  {BrowserRouter as Router} from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <>  
  <Router>
  <Show/>
  </Router>
</>
);

