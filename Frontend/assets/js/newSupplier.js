import ApiService from './services/ApiService.js';

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

        $('#cep').on('blur', () => {
            const cep = $('#cep').val().replace(/\D/g, '');
            if (cep.length !== 8) {
                $('#cep').addClass('is-invalid').removeClass('is-valid');
                $('#cep').after('<div class="invalid-feedback">CEP deve ter 8 dígitos</div>');
            } else {
                $('#cep').addClass('is-valid').removeClass('is-invalid');
                $('.invalid-feedback').remove();
            }
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
            const response = await ApiService.createSupplier(formData);
            console.log('Sucesso: ', response);
            window.location.href = 'supplier.html';
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
    new NewSupplierController();
}); 