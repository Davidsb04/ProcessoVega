import ApiService from './services/ApiService.js';

class SupplierController {
    constructor() {
        this.suppliers = [];
        this.setupEventListeners();
        this.loadSuppliers();
    }

    setupEventListeners() {
        $('#filterBtn').on('click', () => this.applyFilters());
        $('#clearFilterBtn').on('click', () => this.clearFilters());

        $('#nameFilter').on('input', () => this.applyFilters());
        $('#dateFilter').on('change', () => this.applyFilters());
    }

    async loadSuppliers() {
        try {
            this.suppliers = await ApiService.getSuppliers();
            this.renderSuppliersTable(this.suppliers);
        } catch (error) {
            console.error('Erro ao carregar fornecedores:', error);
        }
    }

    applyFilters() {
        const nameFilter = $('#nameFilter').val().toLowerCase();
        const dateFilter = $('#dateFilter').val();

        let filteredSuppliers = this.suppliers;

        if (nameFilter) {
            filteredSuppliers = filteredSuppliers.filter(supplier =>
                supplier.name.toLowerCase().includes(nameFilter)
            );
        }

        if (dateFilter) {
            const filterDate = new Date(dateFilter);
            filterDate.setHours(0, 0, 0, 0);

            filteredSuppliers = filteredSuppliers.filter(supplier => {
                const createdAt = new Date(supplier.createdAt);
                createdAt.setHours(0, 0, 0, 0);
                return createdAt.getTime() === filterDate.getTime();
            });
        }

        this.renderSuppliersTable(filteredSuppliers);
    }

    clearFilters() {
        $('#nameFilter').val('');
        $('#dateFilter').val('');
        this.renderSuppliersTable(this.suppliers);
    }

    renderSuppliersTable(suppliers) {
        const tbody = $('tbody');
        tbody.empty();

        if (suppliers.length === 0) {
            tbody.append(`
                <tr>
                    <td colspan="7" class="text-center">Nenhum fornecedor encontrado</td>
                </tr>
            `);
            return;
        }

        suppliers.forEach(supplier => {
            tbody.append(`
                <tr data-id="${supplier.id}">
                    <td>${supplier.id}</td>
                    <td>${supplier.name}</td>
                    <td>${supplier.cnpj}</td>
                    <td>${new Date(supplier.createdAt).toLocaleDateString('pt-BR')}</td>
                    <td>${supplier.address}</td>
                    <td>${supplier.cep}</td>
                </tr>
            `);
        });
    }
}

$(document).ready(() => {
    new SupplierController();
});