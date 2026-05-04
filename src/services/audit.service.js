import axios from "axios";

export class AuditService {
    constructor(baseUrl) {
        this.baseUrl = baseUrl || '/api';
    }

    async getAuditEvents() {
        return axios({
            url: `${this.baseUrl}/audit`,
            method: "GET"
        }).then(response => response.data);
    }
}
