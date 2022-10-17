function formatRP(num) {
    return new Intl.NumberFormat(`id-ID`, {
        currency: `IDR`,
        style: 'currency',
    }).format(num);
}