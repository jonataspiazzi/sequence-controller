import React, { ReactNode, Fragment } from 'react';

export interface VisibleProps {
  visible: boolean;
  children: ReactNode;
}

export default function Visible(props: VisibleProps) {
  if (!props.visible) {
    return (
      <Fragment></Fragment>
    );
  }

  return (
    <Fragment>
      {props.children}
    </Fragment>
  );
}