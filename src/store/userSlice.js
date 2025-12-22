import { createSlice } from "@reduxjs/toolkit"

let user = createSlice({
    name: 'user',
    initialState: { name: 'kim', age: 20 },
    reducers: {
        changeName(state) {
            state.name = 'park'
        },
        increaseAge(state, action) {
            state.age += action.payload
        }
    }
    // state 변경 함수
})

export let { changeName, increaseAge } = user.actions
// 만든 함수 export

export default user