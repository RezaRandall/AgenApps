

$(document).ready(function () {
    getListAllTransaksiSuperUser();
    getListPaidTransaksiSuperUser();
    getListExpTransaksiSuperUser();




    // SEARCH PELANGGAN FUNCTION FOR ALL PELANGGAN TABLE
    $("#searchAllPelangganBtn").on('click', function (e) {
        e.preventDefault();
        var cari = $("#txtSearchListPelangganAll").val();
        getListAllTransaksiSuperUser({ param: cari });
    });

    // SEARCH PELANGGAN FUNCTION FOR PAID PELANGGAN TABLE
    $("#searchPaidPelangganBtn").on('click', function (e) {
        e.preventDefault();
        var cari = $("#txtSearchListPelangganPaid").val();
        getListPaidTransaksiSuperUser({ param: cari });
    });

    // SEARCH PELANGGAN FUNCTION FOR EXPIRED PELANGGAN TABLE
    $("#searchExpiredPelangganBtn").on('click', function (e) {
        e.preventDefault();
        var cari = $("#txtSearchListPelangganExpired").val();
        getListExpTransaksiSuperUser({ param: cari });
    });
});

// GET LIST ALL TRANSAKSI FOR SUPERUSER
function getListAllTransaksiSuperUser(param) {
    $.post("/SuperAdmin/getListAllTransaksiSuperUser", param,
        function (data, status) {
            document.getElementById('tbodyAllDtPelanggan').innerHTML = "";
            var isi = "";
            $.each(data, function (i, item) {
                dataTransactions = data;
                var paidData = 'paid';
                var pendingData = 'pending';
                var expiredData = 'expired';
                var harga = formatRP(data[i].total_bayar);

                isi += `<tr>
                             <td>`+ (i + 1) + `</td>
                             <td>`+ data[i].nama_pelanggan + `</td>
                             <td>`+ data[i].alamat + `</td>
                             <td>`+ data[i].telepon + `</td>
                             <td width="5%">`+ data[i].email + `</td>
                             <td>`+ data[i].nama_instansi + `</td>
                             <td>`+ data[i].nama_paket + `</td>
                             <td>`+ data[i].tanggal_transaksi + `</td>
                             <td>`+ data[i].status_sewa + `</td>
                             <td>`+ data[i].kode_lisensi + `</td>
                             <td>`+ harga + `</td>
                             <td>`+ data[i].user_name + `</td>
                             <td>
                                <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                                    <button type="button" class='btn btn-primary btn-sm' onclick='updateStatusSewa("` + paidData + `", "` + data[i].kode_transaksi + `", "` + data[i].tanggal_transaksi + `", "` + data[i].id_paket +`" )'>
                                        Paid
                                    </button>
                                        
                                    <button type="button" class='btn btn-warning btn-sm' onclick='updateStatusSewa("` + pendingData + `", "` + data[i].kode_transaksi + `", "` + data[i].tanggal_transaksi +`")'>
                                        Pending
                                    </button>
                                        
                                    <button type="button" class='btn btn-danger btn-sm' onclick='updateStatusSewa("` + expiredData + `", "` + data[i].kode_transaksi + `", "` + data[i].tanggal_transaksi +`")'>
                                        Expired
                                    </button>
                                </div>
                            </td>
                          </tr>`;
            });
            if (data != "") {
                document.getElementById('tbodyAllDtPelanggan').innerHTML += isi;
            } else {
                document.getElementById('tbodyAllDtPelanggan').innerHTML += "<tr><td colspan='8' class='center'>Belum Ada Data Transaksi Pelanggan</td></tr>";
            }
            //$.LoadingOverlay("hide");
        });
}

// GET LIST ALL PELANGGAN PAID
function getListPaidTransaksiSuperUser(param) {

    $.post("/SuperAdmin/getListPaidTransaksiSuperUser", param,
        function (data, status) {
            document.getElementById('tbodyAllDtPelangganPaid').innerHTML = "";
            var isi = "";
            $.each(data, function (i, item) {
                dataTransactions = data;
                var paidData = 'paid';
                var pendingData = 'pending';
                var expiredData = 'expired';
                var harga = formatRP(data[i].hargaTotal);

                isi += `<tr>
                             <td>`+ (i + 1) + `</td>
                             <td>`+ data[i].nama_pelanggan + `</td>
                             <td>`+ data[i].alamat + `</td>
                             <td>`+ data[i].telepon + `</td>
                             <td>`+ data[i].email + `</td>
                             <td>`+ data[i].nama_instansi + `</td>
                             <td>`+ data[i].nama_paket + `</td>
                             <td>`+ data[i].tanggal_transaksi + `</td>
                             <td>`+ data[i].status_sewa + `</td>
                             <td>`+ data[i].kode_lisensi + `</td>
                             <td>`+ harga + `</td>
                             <td>`+ data[i].user_name + `</td>
                             <td>
                                <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                                    <button type="button" class='btn btn-primary btn-sm' onclick='updateStatusSewa("` + paidData + `", "` + data[i].kode_transaksi + `", "` + data[i].tanggal_transaksi + `", "` + data[i].id_paket +`")'>
                                        Paid
                                    </button>
                                        
                                    <button type="button" class='btn btn-warning btn-sm' onclick='updateStatusSewa("` + pendingData + `", "` + data[i].kode_transaksi + `", "` + data[i].tanggal_transaksi +`")'>
                                        Pending
                                    </button>
                                        
                                    <button type="button" class='btn btn-danger btn-sm' onclick='updateStatusSewa("` + expiredData + `", "` + data[i].kode_transaksi + `", "` + data[i].tanggal_transaksi +`")'>
                                        Expired
                                    </button>
                                </div>
                            </td>
                          </tr>`;
            });
            if (data != "") {
                document.getElementById('tbodyAllDtPelangganPaid').innerHTML += isi;
            } else {
                document.getElementById('tbodyAllDtPelangganPaid').innerHTML += "<tr><td colspan='8' class='center'>Belum Ada Data Transaksi Pelanggan Terbayar</td></tr>";
            }
            //$.LoadingOverlay("hide");
        });
}

// GET LIST ALL PELANGGAN EXPIRED
function getListExpTransaksiSuperUser(param) {

    $.post("/SuperAdmin/getListExpTransaksiSuperUser", param,
        function (data, status) {
            document.getElementById('tbodyAllDtPelangganExp').innerHTML = "";
            var isi = "";
            $.each(data, function (i, item) {
                dataTransactions = data;
                var paidData = 'paid';
                var pendingData = 'pending';
                var expiredData = 'expired';
                var harga = formatRP(data[i].hargaTotal);

                isi += `<tr>
                             <td>`+ (i + 1) + `</td>
                             <td>`+ data[i].nama_pelanggan + `</td>
                             <td>`+ data[i].alamat + `</td>
                             <td>`+ data[i].telepon + `</td>
                             <td>`+ data[i].email + `</td>
                             <td>`+ data[i].nama_instansi + `</td>
                             <td>`+ data[i].nama_paket + `</td>
                             <td>`+ data[i].tanggal_transaksi + `</td>
                             <td>`+ data[i].status_sewa + `</td>
                             <td>`+ data[i].kode_lisensi + `</td>
                             <td>`+ harga + `</td>
                             <td>`+ data[i].user_name + `</td>
                             <td>
                                <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                                    <button type="button" class='btn btn-primary btn-sm' onclick='updateStatusSewa("` + paidData + `", "` + data[i].kode_transaksi + `", "` + data[i].id + `", "` + data[i].id_paket +`")'>
                                        Paid
                                    </button>
                                        
                                    <button type="button" class='btn btn-warning btn-sm' onclick='updateStatusSewa("` + pendingData + `", "` + data[i].kode_transaksi + `", "` + data[i].tanggal_transaksi +`")'>
                                        Pending
                                    </button>
                                        
                                    <button type="button" class='btn btn-danger btn-sm' onclick='updateStatusSewa("` + expiredData + `", "` + data[i].kode_transaksi + `", "` + data[i].tanggal_transaksi +`")'>
                                        Expired
                                    </button>
                                </div>
                            </td>
                          </tr>`;
            });
            if (data != "") {
                document.getElementById('tbodyAllDtPelangganExp').innerHTML += isi;
            } else {
                document.getElementById('tbodyAllDtPelangganExp').innerHTML += "<tr><td colspan='8' class='center'>Belum Ada Data Transaksi Pelanggan Kadaluarsa</td></tr>";
            }
            //$.LoadingOverlay("hide");
        });
}

function updateStatusSewa(statusSewa, kodeTransaksi, idPaket) {

    if (statusSewa == "paid") {
        Swal.fire({
            type: "info",
            title: 'Please Insert Payment Date',
            html: '<input id="datepicker" readonly class="swal2-input" style="width:61%;">',
            onOpen: function () {
                var config = {
                    dateFormat: "Y-m-d"
                }
                $('#datepicker').flatpickr(config);
            },
            showCancelButton: true,
            confirmButtonText: 'Yes, Save!',
            cancelButtonText: 'No, cancel!',
            width: 600,
            padding: '3em',
            color: '#716add',
            background: '#fff',
            backdrop: `
                        rgba(0,0,123,0.4)
                        url("../../Content/ImgProduct/transaksiLol/nyanCat.gif")
                        left top
                        no-repeat
                      `,
        }).then(function (result) {
            if (result.value == true) {
                var date = $('#datepicker').val();
                //Swal.fire(date);
                $.post("/SuperAdmin/updateStatusSewa", { status_sewa: statusSewa, kode_transaksi: kodeTransaksi, tanggal_bayar: date, id_paket: idPaket},
                    function (data, status) {
                        Swal.fire('Saved! Thanks!', '', 'success')
                        window.location.reload();
                    });
                
            }
            else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire('Changes are not saved', '', 'error')
            }
        });

    }
    else if (statusSewa == "pending") {
        Swal.fire({
            type: "warning",
            text: "Are you sure?",
            title: 'Do you wanna change this status to Pending? ',
            showCancelButton: true,
            confirmButtonText: 'Yes, Save!',
            cancelButtonText: 'No, cancel!',
            width: 600,
            padding: '3em',
            color: '#716add',
            background: '#fff',
            backdrop: `
                        rgba(0,0,123,0.4)
                        url("../../Content/ImgProduct/transaksiLol/nyanCat.gif")
                        left top
                        no-repeat
                      `,
        }).then(function (result) {
            if (result.value == true) {
                var date = $('#datepicker').val();
                //Swal.fire(date);
                $.post("/SuperAdmin/updateStatusSewa", { status_sewa: statusSewa, kode_transaksi: kodeTransaksi, waktu_sewa: waktuSewa, satuan_paket: satuanPaket, tanggal_bayar: date },
                    function (data, status) {
                        window.location.reload();
                    });
                Swal.fire('Saved! Thanks!', '', 'success')
            }
            else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire('Changes pending are not saved', '', 'error')
            }
        });

    }
    else if (statusSewa == "expired") {
        Swal.fire({
            type: "warning",
            text: "Do you wanna change this status to expired? ",
            title: 'Are you sure?',
            showCancelButton: true,
            confirmButtonText: 'Yes, Save!',
            cancelButtonText: 'No, cancel!',
            width: 600,
            padding: '3em',
            color: '#716add',
            background: '#fff',
            backdrop: `
                        rgba(0,0,123,0.4)
                        url("../../Content/ImgProduct/transaksiLol/nyanCat.gif")
                        left top
                        no-repeat
                      `,
        }).then(function (result) {
            if (result.value == true) {
                var date = $('#datepicker').val();
                //Swal.fire(date);
                $.post("/SuperAdmin/updateStatusSewa", { status_sewa: statusSewa, kode_transaksi: kodeTransaksi, waktu_sewa: waktuSewa, satuan_paket: satuanPaket, tanggal_bayar: date },
                    function (data, status) {
                        window.location.reload();
                    });
                Swal.fire('Saved! Thanks!', '', 'success')
            }
            else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire('Changes expired are not saved', '', 'error')
            }
        });
    }


}
