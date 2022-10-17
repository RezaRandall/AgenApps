$(document).ready(function () {
    getProduk();
    getAllPaketName();
    getAllDataPaket();
    submitTransactionData();
    clearforminsert();
    getAllDataTransaction();
    getAllDataTransactionPaid();
    getAllDataTransactionExp();

    clickToggleUserCode();
    clickToggleCancel();

    getDataUserByUserCode();


    // CLEAR MODAL 
    $('#showModalTransaction').on('hidden.bs.modal', function (e) {
        $(this)
            .find("input,textarea,select")
            .val('')
            .end()
            .find("input[type=checkbox], input[type=radio]")
            .prop("checked", "")
            .end();
        $("#kode_pelanggan").prop("readonly", false);
    })
    $('#tipeProduk').on('change', function () {
        // get ID by item product
        var id = $(this).val();
        //console.log(id);

        $.get('/Paket/findPrice', { id_product: id },
            function (data, status) {
                if (status == "success") {
                    //var rp = "Rp. ";
                    //$('#harga').val(rp + data[0].harga);
                    $('#harga').val(data[0].harga);
                    $('#satuan').val(data[0].satuan);
                    $('#waktu_sewa').val(data[0].jenis_sewa);

                }
            });
    });
});




// GET ALL DATA TRANSACTION
function getAllDataTransaction() {
    $.post("/Agen/getAllDataTransaction", {},
        function (data, status) {
            document.getElementById('tbodyAllDtTransaksi').innerHTML = "";
            var added = "";
            $.each(data, function (i, item) {
                dataTransactions = data;

                added += `<tr>
                             <td>`+ (i + 1) +`</td>
                             <td>`+ data[i].nama_instansi +`</td>
                             <td>`+ data[i].nama_paket +`</td>
                             <td>`+ data[i].total_harga +`</td>
                             <td>`+ data[i].status_sewa +`</td>
                          </tr>`;
            });
            if (data != "") {
                document.getElementById('tbodyAllDtTransaksi').innerHTML += added;
            } else {
                document.getElementById('tbodyAllDtTransaksi').innerHTML += "<tr><td colspan='8' class='center'>Belum Ada Data Transaksi</td></tr>";
            }
            //$.LoadingOverlay("hide");
        });
}

// GET DATA TRANSACTION BY STATUS PAID
function getAllDataTransactionPaid() {
    $.post("/Agen/getAllDataTransactionPaid", {},
        function (data, status) {
            document.getElementById('tbodyAllDtTransaksiPaid').innerHTML = "";
            var added = "";
            $.each(data, function (i, item) {
                dataTransactions = data;

                added += `<tr>
                             <td>`+ (i + 1) + `</td>
                             <td>`+ data[i].nama_instansi + `</td>
                             <td>`+ data[i].nama_paket + `</td>
                             <td>`+ data[i].total_harga + `</td>
                             <td>`+ data[i].status_sewa + `</td>
                          </tr>`;
            });
            if (data != "") {
                document.getElementById('tbodyAllDtTransaksiPaid').innerHTML += added;
            } else {
                document.getElementById('tbodyAllDtTransaksiPaid').innerHTML += "<tr><td colspan='8' class='center'>Belum Ada Data Transaksi</td></tr>";
            }
            //$.LoadingOverlay("hide");
        });
}

// GET DATA TRANSACTION BY STATUS PAID
function getAllDataTransactionExp() {
    $.post("/Agen/getAllDataTransactionExp", {},
        function (data, status) {
            document.getElementById('tbodyAllDtTransaksiExp').innerHTML = "";
            var added = "";
            $.each(data, function (i, item) {
                dataTransactions = data;

                added += `<tr>
                             <td>`+ (i + 1) + `</td>
                             <td>`+ data[i].nama_instansi + `</td>
                             <td>`+ data[i].nama_paket + `</td>
                             <td>`+ data[i].total_harga + `</td>
                             <td>`+ data[i].status_sewa + `</td>
                          </tr>`;
            });
            if (data != "") {
                document.getElementById('tbodyAllDtTransaksiExp').innerHTML += added;
            } else {
                document.getElementById('tbodyAllDtTransaksiExp').innerHTML += "<tr><td colspan='8' class='center'>Belum Ada Data Transaksi</td></tr>";
            }
            //$.LoadingOverlay("hide");
        });
}


// GET PAKET DROPDOWN LIST 
function getAllPaketName() {
    $.post("/Agen/getPaketNames", {},
        function (data, status) {

            var datas = "<option value=''>- Pilih Paket -</option>";
            $.each(data, function (i, item) {
                datas += "<option value=" + data[i].id + ">" + data[i].nama_paket + "</option>";
            });
            $('#nama_paket').empty();
            $('#nama_paket').append(datas);
        });
}

// GET DATA PRICE BY SELECTED PRODUCT TYPE
function getAllDataPaket() {
    $('#nama_paket').on('change', function () {
        // get ID by item product
        var id = $(this).val();
        //console.log(id);

        $.get('/Agen/findAllDataPaket', { id: id },
            function (data, status) {
                if (status == "success") {
                    //var rp = "Rp. ";
                    //$('#harga').val(rp + data[0].harga);
                    $('#harga_paket').val(data[0].harga_paket);
                    $('#deskripsi').val(data[0].deskripsi);
                    $('#id').val(data[0].id);
                    $('#catatan_diskon').val(data[0].catatan_diskon);
                    $('#kode_paket').val(data[0].kode_paket);
                    $('#jangka_sewa').val(data[0].jangka_sewa);
                    $('#waktu_sewa').val(data[0].waktu_sewa);
                }
            });
    });
}

// GET ALL DATA USER BY USER CODE
function getDataUserByUserCode() {
    var kode_pelanggan = $("#kode_pelanggan").val();

    $.post("/Agen/getDataUserExists", { kode_pelanggan: kode_pelanggan },
        function (data, status) {
            $('#nama_pelanggan').val(data[0].nama_pelanggan);
            $('#nama_instansi').val(data[0].nama_instansi);
            $('#alamat').val(data[0].alamat);
            $('#telepon').val(data[0].telepon);
            $('#email').val(data[0].email);
        });
}


// SUBMIT PACKET FUNCTION 
function submitTransactionData() {
    $('#dataTransaksi').submit(function (e) {
        e.preventDefault();

        $.ajax({
            type: 'POST',
            enctype: 'multipart/form-data',
            url: '/Agen/saveTransactionData',
            data: $('#dataTransaksi').serialize(),
            //data: data,
            //processData: false,
            //contentType: dataType,
            //contentType: false,
            cache: false,
            //dataType: 'json',
            success: function (result) {
                console.log('Data received: ');
                console.log(result);
                if (result.hasil == true) {
                    swal("Pendaftaran Berhasil! Menunggu Pembayaran dari Customer", "Klik Tombol OK!", "success").then(function () {
                        $("#showModalTransaction").modal("hide");
                        clearforminsert();
                        location.reload();
                    });
                } else {
                    swal("Pendaftaran Customer Gagal! " + result.keterangan, "Klik Tombol OK!", "error").then(function () {
                    });
                }
            },
            error: function (error) {
                swal("Pendaftaran Customer Gagal! ", "Klik Tombol OK!", "error").then(function () {
                });
            }
        });
    });
}

function clickToggleUserCode() {
    $("#btnToggleUserCode").click(function () {
        $("#dataUser").toggle('slow');
        $("#kode_pelanggan").prop("readonly", true);
        $('#btnToggleUserCode').prop('disabled', true);

        getDataUserByUserCode();
        clearforminsert2();
    });
}

function clickToggleCancel() {
    $('#btnToggleCancel').on('click', function () {
        $('#dataUser').toggle('hide');
        $("#kode_pelanggan").prop("readonly", false);
        $('#btnToggleUserCode').prop('disabled', false);
    });
}


function clearforminsert() {
    var e = document.querySelectorAll("#dataTransaksi input");
    for (var i = 0; i < e.length; i++) { e[i].value = ""; }
    $("#command").val("insert");
}
function clearforminsert2() {
    var e = document.querySelectorAll("#dataUser input");
    for (var i = 0; i < e.length; i++) { e[i].value = ""; }
    $("#command").val("insert");
}
function getProduk() {
    $.post("/Paket/getProducts", {},
        function (data, status) {
            document.getElementById('tipeProduk').innerHTML = "";
            var isi = "<option value=''>- Pilih Produk -</option>";
            $.each(data, function (i, item) {
                isi += "<option value='" + data[i].id_product + "'>" + data[i].nama_product + "</option>";
            })
            $("#tipeProduk").empty();
            $("#tipeProduk").append(isi);
            //$('select').formSelect();
        });
}

function addproduk() {
    var idProduk = $('select[id=tipeProduk] option').filter(':selected').val();
    var namaProduk = $('select[id=tipeProduk] option').filter(':selected').html();
    var satuan = $('select[id=satuan] option').filter(':selected').val();
    var qty = $('#qty').val();
    var harga = $('#harga').val();
    var waktu_sewa = $('#waktu_sewa').val();
    var jangka_sewa = $('#jangka_sewa').val();
    $('#tbodyListPilihPaket').append(`
                                                <tr class="input-row" id-row` + ($('.input-row').length + 1) + `">
                                                    <td id="id_produk" class="id_produk">`+ namaProduk + `</td>
                                                    <td class='allSatuan'>`+ satuan + `</td>
                                                    <td class="allQty">`+ qty + `</td>
                                                    <td class="price">`+ harga + `</td>
                                                    <td class="">`+ jangka_sewa + `</td>
                                                    <td class="">`+ waktu_sewa + `</td>
                                                    <td>
                                                        <button type='button' id="btnDel removeItem-` + ($('.input-row').length + 1) + `" class='btnDel remove-row' >
                                                            <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-trash' viewBox='0 0 16 16'><path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z'></path><path fill-rule='evenodd' d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z'></path></svg>
                                                        </button>
                                                    </td>
                                                    <input type="hidden" field="id_product" name="produk[`+ ($('.input-row').length + 0) + `].id_product" value=` + idProduk + ` readonly />
                                                    <input type="hidden" field="satuan" name="produk[`+ ($('.input-row').length + 0) + `].satuan" value=` + satuan + ` readonly />
                                                    <input type="hidden" field="jumlah_satuan" name="produk[`+ ($('.input-row').length + 0) + `].jumlah_satuan" value=` + qty + ` readonly />
                                                    <input type="hidden" field="harga" name="produk[`+ ($('.input-row').length + 0) + `].harga" value=` + harga + ` readonly />
                                                    <input type="hidden" field="waktu_sewa" name="produk[`+ ($('.input-row').length + 0) + `].waktu_sewa" value=` + waktu_sewa + ` readonly />
                                                    <input type="hidden" field="jangka_sewa" name="produk[`+ ($('.input-row').length + 0) + `].jangka_sewa" value=` + jangka_sewa + ` readonly />
                                                </tr>`);
    //x += 1;
    $('#tipeProduk').val('');
    $('#satuan').val('');
    $('#qty').val('');
    $('#harga').val('');
    $('#waktu_sewa').val('');
    $('#jangka_sewa').val('');
    sumOfColumns();
}