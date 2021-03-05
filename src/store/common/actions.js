// eslint-disable-next-line import/prefer-default-export
export function setUser(context, user) {
  context.commit('SET_USER', user);
}
// eslint-disable-next-line import/prefer-default-export
export function setDataShare(context, dataShare) {
  context.commit('SET_DATASHARE', dataShare);
}
