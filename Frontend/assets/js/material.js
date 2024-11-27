import ApiService from './services/ApiService.js';
import { formatDate, showError } from './services/utils.js';

class MaterialController {
    constructor() {
        this.materials = [];
        this.setupEventListeners();
        this.loadMaterials();
    }

    setupEventListeners() {
        $('#filterBtn').on('click', () => this.applyFilters());
        $('#clearFilterBtn').on('click', () => this.clearFilters());

        $('#nameFilter').on('input', () => this.applyFilters());
        $('#dateFilter').on('change', () => this.applyFilters());
    }

    async loadMaterials() {
        try {
            this.materials = await ApiService.getMaterials();
            this.renderMaterialsTable(this.materials);
        } catch (error) {
            console.error('Erro ao carregar os materiais:', error);
        }
    }

    applyFilters() {
        const nameFilter = $('#nameFilter').val().toLowerCase();
        const dateFilter = $('#dateFilter').val();

        let filteredMaterials = this.materials;

        if (nameFilter) {
            filteredMaterials = filteredMaterials.filter(material =>
                material.name.toLowerCase().includes(nameFilter)
            );
        }

        if (dateFilter) {
            const filterDate = new Date(dateFilter);
            filterDate.setHours(0, 0, 0, 0);

            filteredMaterials = filteredMaterials.filter(material => {
                const createdAt = new Date(material.createdAt);
                createdAt.setHours(0, 0, 0, 0);
                return createdAt.getTime() === filterDate.getTime();
            });
        }

        this.renderMaterialsTable(filteredMaterials);
    }

    clearFilters() {
        $('#nameFilter').val('');
        $('#dateFilter').val('');
        this.renderSuppliersTable(this.materials);
    }

    renderMaterialsTable(materials) {
        const tbody = $('tbody');
        tbody.empty();

        if (materials.length === 0) {
            tbody.append(`
                <tr>
                    <td colspan="7" class="text-center">Nenhum fornecedor encontrado</td>
                </tr>
            `);
            return;
        }

        materials.forEach(material => {
            tbody.append(`
                <tr data-id="${material.id}">
                    <td>${material.id}</td>
                    <td>${material.supplier.name}</td>
                    <td>${material.code}</td>
                    <td>${material.name}</td>
                    <td>${material.description}</td>
                    <td>${material.fiscalCode}</td>
                    <td>${material.specie}</td>
                    <td>${formatDate(material.createdAt)}</td>
                    <td>${material.createdBy}</td>
                    <td>
                        <a href="edit-material.html?id=${material.id}" class="btn btn-sm btn-primary">
                            <i class="bi bi-pencil"></i>
                        </a>
                    </td>
            </tr>
        `);
        });
    }
}

$(document).ready(() => {
    new MaterialController();
});