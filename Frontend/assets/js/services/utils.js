export const formatDate = (date) => {
    return new Date(date).toLocaleDateString('pt-BR');
};

export const formatCNPJ = (cnpj) => {
    return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
};

export const showError = (message) => {
    alert(message);
}; 