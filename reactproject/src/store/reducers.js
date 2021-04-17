import * as Actions from './Actions.js'
const initialState = { students: [] };
const reducer = ((state = initialState, action) => {
    switch (action.type) {
        case Actions.ADD:
            {
                console.log("ADD Action dispatched");
                console.log("Action", action);
                console.log("State", state);
                return {
                    ...state,
                    students: state.students.concat(action.payload.student)
                }

            }
    }
    return state
})

export default reducer