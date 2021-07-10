import thunk from "redux-thunk";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";
import image from "./modules/image";
import like from "./modules/like";
import post from "./modules/post";
import user from "./modules/user";
export const history = createBrowserHistory();

const rootReducer = combineReducers({
    image: image,
    // like: like,
    post: post,
    user: user,
    router: connectRouter(history)
})

const middlewares = [thunk.withExtraArgument({history: history})];

const env = process.env.NODE_ENV;
if (env === "development") {
    const { logger } = require("redux-logger");
    middlewares.push(logger);
}

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      })
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middlewares));

let store = (initialStore) => createStore(rootReducer, enhancer);

export default store();