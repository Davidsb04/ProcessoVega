import ApiService from './services/ApiService.js';
import { showError } from './services/utils.js';

class NewSupplierController {
    constructor() {
        this.form = $('#supplierForm');
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.form.on('submit', async (e) => {
            e.preventDefault();
            await this.handleSubmit();
        });

        $('#cnpj').on('input', function () {
            let value = $(this).val().replace(/\D/g, '');
            value = value.replace(/^(\d{2})(\d)/, '$1.$2');
            value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
            value = value.replace(/\.(\d{3})(\d)/, '.$1/$2');
            value = value.replace(/(\d{4})(\d)/, '$1-$2');
            $(this).val(value);
        });

        $('#cnpj').on('blur', () => {
            const cnpj = $('#cnpj').val().replace(/\D/g, '');
            if (cnpj.length !== 14) {
                $('#cnpj').addClass('is-invalid').removeClass('is-valid');
                $('#cnpj').after('<div class="invalid-feedback">CNPJ deve ter 14 dígitos</div>');
            } else {
                $('#cnpj').addClass('is-valid').removeClass('is-invalid');
                $('.invalid-feedback').remove();
            }
        });

        $('#cep').on('input', function () {
            let value = $(this).val().replace(/\D/g, '');
            value = value.replace(/^(\d{5})(\d)/, '$1-$2');
            $(this).val(value);
        });
    }

    async handleSubmit() {
        const formData = {
            name: $('#supplierName').val(),
            cnpj: $('#cnpj').val().replace(/\D/g, ''),
            address: $('#address').val(),
            cep: parseInt($('#cep').val().replace(/\D/g, '')),
            createdAt: new Date(),
            qrCode: ""
        };

        try {
            await ApiService.createSupplier(formData);
            window.location.href = 'supplier.html';
        } catch (error) {
            showError('Erro ao salvar fornecedor');
            console.error(error);
        }
    }
}

$(document).ready(() => {
    new NewSupplierController();
}); 