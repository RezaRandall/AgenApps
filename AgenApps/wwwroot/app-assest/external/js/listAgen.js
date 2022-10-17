$(document).ready(function () {
    var dataagen = [];
    getAllAgenList();
    getJenisUser();

    // SEARCH AGEN FUNCTION 
    $("#SearchAgenBtn").on('click', function (e) {
        e.preventDefault();

        var cari = $("#inputSearchAgen").val();

        $.post("/SuperAdmin/getAgen", { param: cari },
            function (data, status) {
                document.getElementById('tbodyListAgen').innerHTML = "";
                var isi = "";
                $.each(data, function (i, item) {
                    dataagen = data;
                    isi += `
                                <tr>
                                    <td>` + (i + 1) + `</td>
                                    <td>` + data[i].user_name + `</td>
                                    <td>` + data[i].alamat + `</td>
                                    <td>` + data[i].mobile_phone + `</td>
                                    <td>` + data[i].kabupaten + `</td>
                                    <td style='text-align:center'>
                                        <button type='button' class='btn' onclick='showeditagen("` + data[i].id + `")'>
                                            <i class="fa-solid fa-pen-to-square"></i>
                                        </button> 
                                        || 
                                        <button type='button' onclick='deleteAgen("` + data[i].id + `")' class='btn'>
                                             <i class="fa-solid fa-trash-can"></i>
                                        </button>
                                    </td>
                                </tr>
                                `;
                })
                if (data != "") {
                    document.getElementById('tbodyListAgen').innerHTML += isi;
                } else {
                    document.getElementById('tbodyListAgen').innerHTML += "<tr><td colspan='8' class='center'>Belum Ada Data Agen</td></tr>";
                }
                //$.LoadingOverlay("hide");
            });
    });


});


function insertAgen() {

    if (user_name == "" || password == "" || mobile_phone == "" || alamat == "" || kabupaten == "") {
        swal('Form Tidak Boleh Kosong !');
    }
    else {
        //var form = $("#dataInsert")[0];

        var dataType = 'application/x-www-form-urlencoded; charset=utf-8';
        var data = $('form').serialize();

        $.ajax({
            type: 'POST',
            url: '/SuperAdmin/simpanagen',
            dataType: 'json',
            contentType: dataType,
            data: data,
            success: function (result) {
                console.log('Data received: ');
                console.log(result);
                if (result.hasil == true) {
                    swal("Tambah User Berhasil!", "Klik Tombol OK!", "success").then(function () {
                        $("#tambahModal").modal("hide");
                        clearforminsert();
                        location.reload();
                    });
                } else {
                    swal("Tambah User Gagal! " + result.keterangan, "Klik Tombol OK!", "error").then(function () {
                    });
                }
            },
            error: function (error) {
                swal("Tambah User Gagal! ", "Klik Tombol OK!", "error").then(function () {
                });
            }
        });
    }
}

function getAllAgenList() {
    //$.LoadingOverlay("show");
    $.post("/SuperAdmin/getAgen", {},
        function (data, status) {
            document.getElementById('tbodyListAgen').innerHTML = "";
            var isi = "";
            $.each(data, function (i, item) {
                dataagen = data;
                isi += `<tr>
                                <td>` + (i + 1) + `</td>
                                <td>` + data[i].user_name + `</td>
                                <td>` + data[i].alamat + `</td>
                                <td>` + data[i].mobile_phone + `</td>
                                <td>` + data[i].kabupaten + `</td>
                                <td style='text-align:center'>
                                    <button type='button' class='btn' onclick='showeditagen("` + data[i].id + `")'>
                                        <i class="fa-solid fa-pen-to-square"></i>
                                    </button> 
                                        || 
                                    <button type='button' onclick='deleteAgen("` + data[i].id + `")' class='btn'>
                                        <i class="fa-solid fa-trash-can"></i>
                                    </button>
                                </td>
                            </tr>`;
            })
            if (data != "") {
                document.getElementById('tbodyListAgen').innerHTML += isi;
            } else {
                document.getElementById('tbodyListAgen').innerHTML += "<tr><td colspan='8' class='center'>Belum Ada Data Agen</td></tr>";
            }
            //$.LoadingOverlay("hide");
        });
}

function showeditagen(id) {
    var d = dataagen.find(function (s) { return s.id == id });
    if (d != undefined) {
        $("#id").val(d.id);
        $("#first_name").val(d.first_name);
        $("#last_name").val(d.last_name);
        $("#user_name").val(d.user_name);
        $("#password").val(d.password);
        $("#email").val(d.email);
        $("#mobile_phone").val(d.mobile_phone);
        $("#alamat").val(d.alamat);
        $("#kabupaten").val(d.kabupaten);
        $("#id_jenis_user").val(d.id_jenis_user);

        $("#command").val("update");
        $("#tambahModal").modal("show");
    }
}

function deleteAgen(id) {
    swal({
        title: "Anda Yakin Akan Menghapus User ini?",
        text: "Data yang telah dihapus tidak bisa dikembalikan!",
        icon: 'warning',
        dangerMode: true,
        buttons: {
            cancel: 'Tidak!',
            delete: 'Ya'
        }
    }).then(function (willDelete) {
        if (willDelete) {
            $.post('/SuperAdmin/deleteAgen', { id: id },
                function (data, status) {
                    if (status == 'success') {
                        swal("Delete User Berhasil!", "Klik Tombol OK!", {
                            icon: "success",
                        }).then(function () {
                            location.reload();
                        })
                    }
                })
        }
        else {
            swal("Delete User Gagal! " + result.keterangan, "Klik Tombol OK!", "error").then(function () {
            });
        }
    })
}

function getJenisUser() {
    $.post("/SuperAdmin/getJenisUser", {},
        function (data, status) {
            $("#id_jenis_user").html("");
            var isi = "<option value=''>Pilih Jenis User</option>";
            $.each(data, function (i, item) {
                isi += "<option value='" + data[i].id_jenis_user + "'>" + data[i].user_type + "</option>";
            })
            $("#id_jenis_user").empty();
            $("#id_jenis_user").append(isi);
            //$('select').formSelect();
        });
}

function clearforminsert() {
    var e = document.querySelectorAll("#dataInsert input");
    for (var i = 0; i < e.length; i++) { e[i].value = ""; }
    $("#command").val("insert");
}