import { ADD_ARTICLE, SET_LEVEL, ADD_POINTS } from "../constants/action-types";

export function addArticle(payload) {
    return { type: ADD_ARTICLE, payload }
};

export function setLevel(level){
    return {type: SET_LEVEL, level}
}

export function addPoints(amount){
    return {type: ADD_POINTS, amount}
}