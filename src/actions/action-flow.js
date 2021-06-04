// @flow

// This is just a helper to enforce redux action format with Flow, it's not used anywhere else
export interface ActionFormat {
  type: string;
  status?: 'error';
  payload?: any;
  meta?: Object;
}
