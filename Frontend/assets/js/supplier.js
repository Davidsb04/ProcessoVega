import ApiService from './services/ApiService.js';
import { formatDate, formatCNPJ, showError } from './services/utils.js';

class SupplierController {
    async loadSuppliers() {
        try {
            const suppliers = await ApiService.getSuppliers();
            this.renderSuppliersTable(suppliers);
        } catch (error) {
            showError('Erro ao carregar fornecedores');
            console.error(error);
        }
    }

    renderSuppliersTable(suppliers) {
        const tbody = $('tbody');
        const rows = suppliers.map(supplier => `
            <tr data-id="${supplier.id}">
                <td>${supplier.id}</td>
                <td>${supplier.name}</td>
                <td>${formatCNPJ(supplier.cnpj)}</td>
                <td>${formatDate(supplier.createdAt)}</td>
                <td>${supplier.address}</td>
                <td>${supplier.cep}</td>
            </tr>
        `).join('');

        tbody.html(rows);
    }
}

// Inicialização
$(document).ready(() => {
    const controller = new SupplierController();
    controller.loadSuppliers();
}); 