import React from 'react';

export const RestrictRoute = ({ component: Component, Fallback, isAllow }) => {
  return isAllow ? <Component /> : <Fallback />;
};
