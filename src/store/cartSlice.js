import { createSlice } from "@reduxjs/toolkit";

let cart = createSlice({
    name: 'cart',
    initialState: [
        { id: 0, name: 'White and Black', count: 2 },
        { id: 2, name: 'Grey Yordan', count: 1 }
    ],
    reducers: {
        increaseCount(state, action) {
            let clickedItem = state.find(function (item) { return item.id === action.payload })
            clickedItem.count += 1
        },
        addItem(state, action) {
            let 이미있는상품 = state.find(function (item) { return item.id === action.payload.id })
            if (이미있는상품) {
                이미있는상품.count += 1
            } else {
                state.push(action.payload)
            }
        }
    }
})

export let { increaseCount, addItem } = cart.actions

export default cart