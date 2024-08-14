export const createUrlParamsFunction = (urlObject = {}, restrictedValue = []) => {
    return new URLSearchParams(
      Object.fromEntries(
        Object.entries(urlObject).filter(
          ([_, v]) =>
            [...[null, undefined, "ALL", ""], ...restrictedValue].includes(v) !=
            true
        )
      )
    ).toString();
  };

export const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };
