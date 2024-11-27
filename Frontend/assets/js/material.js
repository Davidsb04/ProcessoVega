import ApiService from './services/ApiService.js';
import { formatDate, showError } from './services/utils.js';

class MaterialController {
    async loadMaterials() {
        try {
            const materials = await ApiService.getMaterials();
            this.renderMaterialsTable(materials);
        } catch (error) {
            showError('Erro ao carregar materiais');
            console.error(error);
        }
    }

    renderMaterialsTable(materials) {
        const tbody = $('tbody');
        const rows = materials.map(material => `
            <tr data-id="${material.id}">
                <td>${material.id}</td>
                <td>${material.supplierName}</td>
                <td>${material.code}</td>
                <td>${material.name}</td>
                <td>${material.description}</td>
                <td>${material.fiscalCode}</td>
                <td>${material.type}</td>
                <td>${formatDate(material.createdAt)}</td>
                <td>${material.createdBy}</td>
                <td>
                    <a href="pages/edit-material.html?id=${material.id}" class="btn btn-sm btn-primary">
                        <i class="bi bi-pencil"></i>
                    </a>
                </td>
            </tr>
        `).join('');

        tbody.html(rows);
    }
}

// Inicialização
$(document).ready(() => {
    const controller = new MaterialController();
    controller.loadMaterials();
}); 