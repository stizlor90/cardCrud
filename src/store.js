import { configureStore } from '@reduxjs/toolkit';
import cardSlice from './CardList/cardSlice';


const store = configureStore({

reducer: {
 cardList: cardSlice
 },
});

export default store;