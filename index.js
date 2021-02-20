const ADD_TODO = 'ADD_TODO'
const REMOVE_TODO = 'REMOVE_TODO'
const TOGGLE_TODO = 'TOGGLE_TODO'
const ADD_GOAL = 'ADD_GOAL'
const REMOVE_GOAL = 'REMOVE_GOAL'
const TOGGLE_GOAL = 'TOGGLE_GOAL'

addToDoAction = todo => {
    return {
        type: ADD_TODO,
        todo: todo
    }
}
removeToDoAction = id => {
    return {
        type: REMOVE_TODO,
        id: id
    }
}
toggleToDoAction = id => {
    return {
        type: TOGGLE_TODO,
        id: id
    }
}
addGoalAction = goal => {
    return {
        type: ADD_GOAL,
        goal: goal
    }
}
removeGoalAction = id => {
    return {
        type: REMOVE_GOAL,
        id: id
    }
}
toggleGoalAction = id => {
    return {
        type: TOGGLE_GOAL,
        id: id
    }
}

// Application Code
function todos(state = [], action){

    switch(action.type){
        case ADD_TODO:
            return state.concat([action.todo])
        case REMOVE_TODO:
            return state.filter((todo => todo.id !== action.id))
        case TOGGLE_TODO:
            return state.map((todo) => todo.id !== action.id ? todo :
                Object.assign({}, todo, {complete: !todo.complete}))
        default:
            return state
    }
}

function goals(state = [], action){

    switch(action.type){
        case ADD_GOAL:
            return state.concat([action.goal])
        case REMOVE_GOAL:
            return state.filter((goal => goal.id !== action.id))
        case TOGGLE_GOAL:
            return state.map((goal) => goal.id !== action.id ? goal :
                Object.assign({}, goal, {complete: !goal.complete}))
        default:
            return state
    }
}

const checkingMiddleware = (store) => (next) => (action) => {
    if(action.type === ADD_GOAL && action.goal.name.includes('bitcoin')){
        return alert('Bonk. No Investing in Bitcoin')
    }
    else{
        return next(action)
    }
}

const loggingMiddleware = (store) => (next) => (action) => {
    console.group(action.type)
    const result = next(action)
    console.log(action)
    console.log('New state is ', store.getState())
    console.groupEnd()

    return result
}

const store = Redux.createStore(
    Redux.combineReducers({todos, goals}),
    Redux.applyMiddleware(checkingMiddleware, loggingMiddleware)
)