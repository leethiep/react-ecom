
export const setFreeShipping = (isChecked) => ({
    type: 'SET_FREE_SHIPPING',
    payload: isChecked,
  });

  export const enableFreeShipping = () => setFreeShipping(true);

  export const disableFreeShipping = () => setFreeShipping(false);