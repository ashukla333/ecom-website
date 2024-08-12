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

