import api from "../api/axios";

/**
 * Confirm order after payment success
 */
export const confirmOrder = async (orderData) => {
  const res = await api.post("/orders/confirm", orderData);
  return res.data;
};
