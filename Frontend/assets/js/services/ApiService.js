const ApiService = {
    baseUrl: 'http://localhost:5292/api/',


    getMaterials: function () {
        return $.ajax({
            url: `${this.baseUrl}Material`,
            method: 'GET',
        })
    },

    getMaterialById: function (id) {
        return $.ajax({
            url: `${this.baseUrl}Material/GetMaterial?id=${id}`,
            method: 'GET',
            contentType: 'application/json'
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

    getSupplierById: function (id) {
        return $.ajax({
            url: `${this.baseUrl}Supplier/${id}`,
            method: 'GET',
            contentType: 'application/json',
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
