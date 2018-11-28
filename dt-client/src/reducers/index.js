import { combineReducers } from 'redux';
import RestarauntDataReducer from './RestarauntDataReducer';
import RestarauntDuplDataReducer from './RestarauntDuplDataReducer';

const todoApp = combineReducers({
    restarauntsData: RestarauntDataReducer,
    duplicateRestData: RestarauntDuplDataReducer
})

export default todoApp