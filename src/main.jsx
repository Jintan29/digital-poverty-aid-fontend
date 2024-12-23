import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import { BrowserRouter } from 'react-router-dom';

import App from './App.jsx'
import './index.css'
import Swal from 'sweetalert2';

// กำหนด global configuration ก่อนที่แอพจะ render
// const MySwal = Swal.mixin({
//   customClass: {
//     confirmButton: 'swal2-confirm swal2-styled',  
//   },
//   buttonsStyling: true,  // เปิดใช้งาน default styling
//   confirmButtonColor: '#3085d6 !important',
//   confirmButtonText: 'ตกลง',
//   cancelButtonText: 'ยกเลิก',
// });

// window.Swal = MySwal;

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </Provider>,
)
