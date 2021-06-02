import React from 'react';

export const RestrictRoute = ({
  component: Component,
  fallback: Fallback,
  isAllow,
}) => {
  return isAllow ? <Component exact /> : <Fallback />;
};
