import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import withRedux from "next-redux-wrapper";
import withReduxSaga from "next-redux-saga";
import { createStore, compose, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reducer from "../reducers";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas";
import AppLayout from "../components/AppLayout";
import { LOAD_USER_REQUEST } from "../reducers/user";
import { LOAD_GROUP_INTRO_REQUEST } from "../reducers/group";
import Helmet from "react-helmet";
import { Container } from "next/app";

const App = ({ Component, store, pageProps }) => {
  return (
    <Container>
      <Provider store={store}>
        <Helmet
          title="Together"
          htmlAttributes={{ lang: "ko" }}
          meta={[
            {
              charset: "UTF-8"
            },
            {
              name: "viewport",
              content:
                "width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=yes,viewport-fit=cover"
            },
            {
              "http-equiv": "X-UA-Compatible",
              content: "IE=edge"
            },
            {
              name: "description",
              content:
                "같은 관심사를 함께하는 즐거움! 공통 관심사를 갖고 있는 사람들을 쉽고 빠르게 찾아보세요."
            },
            {
              name: "og:title",
              content: "Together"
            },
            {
              name: "og:description",
              content:
                "같은 관심사를 함께하는 즐거움! 공통 관심사를 갖고 있는 사람들을 쉽고 빠르게 찾아보세요."
            },
            {
              property: "og:type",
              content: "website"
            }
          ]}
          link={[
            {
              rel: "shortcut icon",
              href: "/favicon.ico"
            }
          ]}
        />
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </Provider>
    </Container>
  );
};

// App.propTypes = {
//   Component: PropTypes.elementType.isRequired,
//   store: PropTypes.object.isRequired,
//   pageProps: PropTypes.object.isRequired
// };

App.getInitialProps = async context => {
  // console.log(context);
  const { ctx, Component } = context;
  let pageProps = {};
  const state = ctx.store.getState();
  // console.log("app state: ", state);
  const cookie = ctx.isServer ? ctx.req.headers.cookie : "";
  if (ctx.isServer && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  // 로그인 사용자 정보가 없을 경우, 사용자 정보를 불러온다.
  if (!state.user.userInfo) {
    ctx.store.dispatch({
      type: LOAD_USER_REQUEST
    });
  }
  if (!state.group.groupDetail) {
    ctx.store.dispatch({
      type: LOAD_GROUP_INTRO_REQUEST,
      data: ctx.query.id
    });
  } else if (
    ctx.query.id != state.group.groupDetail.id &&
    (ctx.pathname.indexOf("/group/intro") !== -1 ||
      ctx.pathname.indexOf("/group/schedule") !== -1)
  ) {
    ctx.store.dispatch({
      type: LOAD_GROUP_INTRO_REQUEST,
      data: ctx.query.id
    });
  }
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  return { pageProps };
};

const configureStore = (initialState, options) => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
  //compose : middlewares 여러개들을 합성하는 함수
  const enhancer =
    process.env.NODE_ENV === "production"
      ? compose(applyMiddleware(...middlewares))
      : compose(
          applyMiddleware(...middlewares),
          !options.isServer &&
            typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== "undefined"
            ? window.__REDUX_DEVTOOLS_EXTENSION__()
            : f => f
        );
  const store = createStore(reducer, initialState, enhancer);
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

export default withRedux(configureStore)(withReduxSaga(App));
