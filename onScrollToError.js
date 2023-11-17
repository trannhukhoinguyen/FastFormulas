// Author/Source: https://github.com/HuuNghia2807
export const onScrollToError = (errorInfo) => {
  if (errorInfo.errorFields?.length > 0) {
    const elementError =
      typeof errorInfo.errorFields[0].name === 'string'
        ? [errorInfo.errorFields[0].name]
        : errorInfo.errorFields[0].name;
    let idFirstErrorElement = 'form_';
    elementError.forEach((err, i, arr) => {
      if (arr.length > 1 && i !== arr.length - 1) {
        idFirstErrorElement += ${err}_;
      } else {
        idFirstErrorElement += err;
      }
    });
    const element = document.getElementById(idFirstErrorElement);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
};
