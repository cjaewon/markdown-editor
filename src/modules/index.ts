import { combineReducers } from 'redux';
import core, { CoreState } from './core';
import write, { WriteState } from './write';
import post, { PostState } from './post';
import error, { ErrorState } from './error';
import scroll, { ScrollState } from './scroll';

export type RootState = {
  core: CoreState;
  write: WriteState;
  post: PostState;
  error: ErrorState;
  scroll: ScrollState;
};

const rootReducer = combineReducers({
  core,
  write,
  post: post.reducer,
  error: error.reducer,
  scroll: scroll.reducer,
});

export default rootReducer;
