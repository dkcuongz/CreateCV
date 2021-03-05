/* eslint-disable no-undef */
$(document).ready(() => {
  // eslint-disable-next-line consistent-return
  $('body').on('keydown', 'input, select', function (e) {
    if (e.key === 'Enter') {
      const self = $(this);
      const form = self.parents('body');
      const focusable = form.find('input,a,select,button').filter(':visible');
      const next = focusable.eq(focusable.index(this) + 1);
      if (next.length) {
        next.focus();
      } else {
        form.submit();
      }
      return false;
    }
  });
});
