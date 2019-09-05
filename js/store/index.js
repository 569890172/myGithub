import {applyMiddleware, createStore} from 'redux'
import thunk from 'redux-thunk'
import reducers from '../reducer'
import {middleware} from '../navigator/AppNavigator'


const logger = store => next => action => {
    if( typeof action === 'function'){
        console.log('dispatching is function');
    }else{
        console.log('dispatching ',action);
    }
    const result = next(action);
    console.log('nextState ',store.getState());
}




const middlewares = [
    middleware,
    logger,
    thunk,
];
/** * 创建store */
export default createStore(reducers, applyMiddleware(...middlewares));