import {applyMiddleware, compose, createStore} from 'redux'
import thunk from 'redux-thunk'
import {createLogger} from 'redux-logger'
import rootReducer from "../redux/reducers/rootReducer";

const configureStore = preloadedState => {
    return createStore(
        rootReducer,
        preloadedState,
        compose(
            applyMiddleware(thunk, createLogger()),
            window.devToolsExtension ? window.devToolsExtension() : f => f
        )
    )
};

export default configureStore
