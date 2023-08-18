import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cardList: [
    { id: 1,  header: "Заголовок", text: "text 1" },
    { id: 2, header: "Заголовок 2", text: "text 2" },
  ],
};

const cardSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    dragFunction: (state, action) => {
      const { sourceCardId, targetCardId } = action.payload;

      const sourceIndex = state.cardList.findIndex(c => c.id === sourceCardId);
      const targetIndex = state.cardList.findIndex(c => c.id.toString() === targetCardId);

      if (sourceIndex !== -1 && targetIndex !== -1) {
       
        const updatedCardList = [...state.cardList];
        [updatedCardList[sourceIndex], updatedCardList[targetIndex]] = [updatedCardList[targetIndex], updatedCardList[sourceIndex]];

        state.cardList = updatedCardList;
      }
    },
    removeCard: (state, action) => {
      const cardIdToRemove = action.payload;
      state.cardList = state.cardList.filter((card) => card.id !== cardIdToRemove);
    },
    addFunction: (state, action) => {
      const newCard = action.payload;
      state.cardList.push(newCard);
    },
    editCard: (state, action) => {
      const { id, newHeader, newText } = action.payload;
      const cardToEdit = state.cardList.find((card) => card.id === id);
      if (cardToEdit) {
        cardToEdit.header = newHeader;
        cardToEdit.text = newText;
      }
    },
  },
});

export const { dragFunction,removeCard,addFunction,editCard } = cardSlice.actions;

export default cardSlice.reducer;