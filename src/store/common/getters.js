export function ME(state) { // alias to getUser
  const me = { ...state.user };
  return me;
}

export function TOKEN(state) { // alias to getToken
  const me = { ...state.user };
  return me.authorization || '';
}

export function SHARE(state) { // alias to getDataShare
  const share = { ...state.dataShare };
  return share;
}
