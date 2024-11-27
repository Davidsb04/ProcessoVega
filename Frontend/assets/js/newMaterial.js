import ApiService from './services/ApiService.js';

class NewMaterialController {
    constructor() {
        this.form = $('#materialForm');
        this.supplierSelect = $('#supplierSelect');
        this.setupEventListerners();
        this.loadSuppliers();
    }

    setupEventListerners() {
        this.form.on('submit', async (e) => {
            e.preventDefault();
            await this.handleSubmit();
        });
    }

    async loadSuppliers() {
        try {
            const suppliers = await ApiService.getSuppliers();
            this.populateSuppliersDropdown(suppliers);
        } catch (error) {
            console.error('Erro ao carregar fornecedores: ', error);
        }
    }

    populateSuppliersDropdown(suppliers) {
        this.supplierSelect.empty();
        this.supplierSelect.append('<option value="">Selecione um fornecedor</option>');
        suppliers.forEach(supplier => {
            this.supplierSelect.append(`<option value="${supplier.id}">${supplier.name}</option>`);
        });
    }

    async handleSubmit() {
        const formData = {
            supplierId: parseInt(this.supplierSelect.val()),
            supplier: {
                id: parseInt(this.supplierSelect.val()),
                name: "",
                cnpj: "",
                createdAt: new Date(),
                address: "",
                cep: 0,
                qrCode: ""
            },
            code: $('#materialCode').val(),
            name: $('#materialName').val(),
            description: $('#description').val(),
            fiscalCode: $('#fiscalCode').val(),
            specie: $('#specie').val(),
            createdAt: new Date(),
            createdBy: $('#createdBy').val(),
            updatedAt: null,
            updatedBy: ""
        };



        try {
            const response = await ApiService.createMaterial(formData);
            console.log('Sucesso: ', response);
            window.location.href = 'index.html';
        } catch (error) {
            const errorMessage = error.responseText;

            $('.alert-container').html(`
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    ${errorMessage}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            `);

            setTimeout(() => {
                $('.alert').fadeOut('slow');
            }, 3000);
        }
    }
}

$(document).ready(() => {
    new NewMaterialController();
});