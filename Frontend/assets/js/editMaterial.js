import ApiService from './services/ApiService.js';

class EditMaterialController {
    constructor() {
        this.form = $('#materialForm');
        this.materialId = parseInt(new URLSearchParams(window.location.search).get('id'));
        console.log('Material ID (constructor):', this.materialId);
        this.setupEventListeners();
        this.loadMaterial();
        this.loadSuppliers();
    }

    setupEventListeners() {
        this.form.on('submit', async (e) => {
            e.preventDefault();
            await this.handleSubmit();
        });
    }

    async loadMaterial() {
        try {
            const material = await ApiService.getMaterialById(this.materialId);
            this.fillFormData(material);
        } catch (error) {
            console.error('Erro ao carregar material:', error);
            alert('Erro ao carregar dados do material');
        }
    }

    async loadSuppliers() {
        try {
            const suppliers = await ApiService.getSuppliers();
            const select = $('#supplierSelect');
            select.empty();

            suppliers.forEach(supplier => {
                select.append(`<option value="${supplier.id}">${supplier.name}</option>`);
            });
        } catch (error) {
            console.error('Erro ao carregar fornecedores:', error);
        }
    }

    fillFormData(material) {
        $('#materialName').val(material.name);
        $('#materialCode').val(material.code);
        $('#supplierSelect').val(material.supplierId);
        $('#description').val(material.description);
        $('#fiscalCode').val(material.fiscalCode);
        $('#materialSpecie').val(material.specie);
        $('#createdBy').val(material.createdBy);
    }

    async handleSubmit() {
        const formData = {
            id: parseInt(this.materialId),
            supplierId: parseInt($('#supplierSelect').val()),
            code: $('#materialCode').val(),
            name: $('#materialName').val(),
            description: $('#description').val(),
            fiscalCode: $('#fiscalCode').val(),
            specie: $('#materialSpecie').val(),
            createdBy: $('#createdBy').val(),
            updatedAt: new Date(),
            updatedBy: "Usuario"
        };

        try {
            await ApiService.updateMaterial(formData);
            console.log('Material atualizado com sucesso!');
            window.location.href = 'index.html';
        } catch (error) {
            console.error('Erro completo:', error);
            $('.alert-container').html(`
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    Erro ao atualizar material: ${error.responseText || 'Erro desconhecido'}
                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                </div>
            `);
        }
    }
}

// Inicialização
$(document).ready(() => {
    new EditMaterialController();
});