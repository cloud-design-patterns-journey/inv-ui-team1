import axios from "axios";

export class StockItemService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl || "/api";
  }

  // Old method kept for reference
  // async listStockItems() {
  //     return axios({
  //         url: '/api/graphql',
  //         method: "POST",
  //         data: {
  //             query: `...`
  //         }
  //     }).then(response => response.data.data.stockItems);
  // }

  // New method: POST to /stock-items/request, poll GET /stock-items/response/:correlationId
  async listStockItems() {
    // 1. POST to /stock-items/request, get correlationId
    const requestRes = await axios.post(`${this.baseUrl}/stock-items/request`);
    const correlationId = requestRes.data.correlationId;
    if (!correlationId) throw new Error("No correlationId returned");

    // 2. Poll GET /stock-items/response/:correlationId every 1s until response
    return new Promise((resolve, reject) => {
      const poll = async () => {
        try {
          const res = await axios.get(
            `${this.baseUrl}/stock-items/response/${correlationId}`
          );
          if (res.data && res.data.ready) {
            resolve(res.data.stockItems);
          } else {
            setTimeout(poll, 1000);
          }
        } catch (err) {
          // If 404 or not ready, keep polling, else reject
          if (err.response && err.response.status === 404) {
            setTimeout(poll, 1000);
          } else {
            reject(err);
          }
        }
      };
      poll();
    });
  }
}
