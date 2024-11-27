const ApiService = {
    baseUrl: 'http://localhost:5292/api/',


    getMaterials: async () => {
        return await $.ajax({
            url: `${this.baseUrl}Material`,
            method: 'GET',
        })
    },

    createMaterial: function (material) {
        return $.ajax({
            url: `${this.baseUrl}Material`,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(material),
        })
    },

    updateMaterial: function (material) {
        return $.ajax({
            url: `${this.baseUrl}Material`,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(material),
        })
    },

    getSuppliers: function () {
        return $.ajax({
            url: `${this.baseUrl}Supplier`,
            method: 'GET',
        })
    },

    createSupplier: function (supplier) {
        return $.ajax({
            url: `${this.baseUrl}Supplier`,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(supplier),
        })
    }
}

export default ApiService;
