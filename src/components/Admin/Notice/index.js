import React, { useState } from 'react';
import Register from './Register';
import NoticeList from './NoticeList';

const NoticeArticle = () => {
  const [state, setState] = useState(0);
  return (
    <>
      <Register setState={setState} />
      <NoticeList state={state} setState={setState} />
    </>
  );
};

export default NoticeArticle;
