



export const getUserNameStorage = () => sessionStorage.getItem("userName") || "";
export const setUserNameStorage = (userName: string) => sessionStorage.setItem("userName", userName)

export const setProductsIdUserAnexed = (productId: number) => sessionStorage.setItem("productIdAnexed",String(productId));
export const getProductsIdUserAnexed = () => sessionStorage.getItem("productIdAnexed") || "";