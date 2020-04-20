import React from "react";
import Loadable from "react-loadable";

const loadingComponent = ({ error, pastDelay }) => {
  if (error) {
    return <div>Error!</div>;
  } else if (pastDelay) {
    // return <div>Loading...</div>;
    return <div />;
  } else {
    return null;
  }
};

let config = [
  // {
  //   name: "/",
  //   path: "/",
  //   exact: true,
  //   component: Loadable({
  //     loader: () => import("../FakeApp"),
  //     loading: loadingComponent,
  //     delay: 300
  //   })
  // }
];

export default config;
