import {configureStore} from '@reduxjs/toolkit';

import user from '../slices/userSlice';
import jamboard from '../slices/jamboardSlice';

export default configureStore({
    reducer:{
        user: user,
        jamboard: jamboard
    }
});