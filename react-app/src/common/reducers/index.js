import { ADD_ARTICLE, SET_LEVEL, ADD_POINTS } from "../constants/action-types";

const initialState = {
    articles: [],
    level: 1,
    points: 0
};
function rootReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_ARTICLE:
            return Object.assign({}, state, {
                articles: state.articles.concat(action.payload)
            });
        case SET_LEVEL:
            return Object.assign({}, state, {
                level: action.level
            });
        case ADD_POINTS:
            const totalPoints = state.points + action.amount;
            return Object.assign({}, state, {
                points: totalPoints > 0 ? totalPoints : 0
            });
        default:
            break;
    }
    if (action.type === ADD_ARTICLE) {
        
    }
    return state;
};
export default rootReducer;