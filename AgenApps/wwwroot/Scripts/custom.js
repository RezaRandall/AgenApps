var datakuota = [];
function getkuota() {
    $.ajax({
        type: "POST",
        url: "/ref/getkuota?type=absen",
        data: {},
        dataType: 'json',
        beforeSend: function (msg) {
        },
        success: function (msg) {
            datakuota = msg;
            $("#sisakuota").html(msg.sisa.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1."));
        },
        error: function (msg) { },
        fail: function (msg) {
            alert("fail");
        }
    });
}
function detailkuota() {
    var terpakai = ''; var no = 0;
    $.each(datakuota.data, function (idx, item) {
        no++;
        terpakai += `<tr><td align="center">` + no + `</td>
                        <td align="center">` + item.user_id + `</td></tr>`;
    });
    var modalcontent = `<div class="modal-body">
                                <div class="row">
                                    <div class="col-sm-6 col-md-6 caption">Kuota Absensi</div>
                                    <div class="col-sm-1 col-md-1 caption">:</div>
                                    <div class="col-sm-2 col-md-2 caption">` + datakuota.kuota + `</div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-6 col-md-6 caption">Sisa Kuota Absensi</div>
                                    <div class="col-sm-1 col-md-1 caption">:</div>
                                    <div class="col-sm-2 col-md-2 caption">` + datakuota.sisa + `</div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-6 col-md-6 caption">Terpakai</div>
                                    <div class="col-sm-1 col-md-1 caption">:</div>
                                    <div class="col-sm-2 col-md-2 caption">` + datakuota.terpakai + `</div>
                                </div>
                                <div class="row">
                                    <table class="table table-hover table-responsive">
                                        <thead>
                                            <tr>
                                                <th style="width: 30%;">No</th>
                                                <th style="width: 70%;">Tanggal</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            `+ terpakai + `
                                        </tbody>
                                    </table>
                                </div>
                            </div>`;
    modalsoal = createmodal('modalkuotasoal', 'Kuota Absensi Semester @Session("semester")', '', modalcontent, document.body);
    modalsoal.modal("show");
}
function hitkkm(nilaikkm) {
    if ($.isNumeric(nilaikkm) == false) {
        nilaikkm = 0;
    }
    if (nilaikkm > 100) {
        nilaikkm = 100;
    }
    var jarak = 0;
    jarak = (100 - nilaikkm) / 3;
    jarak = Math.round(jarak);

    var dt = 0;
    var ct = 0;
    var bt = 0;
    var at = 0;

    ct = nilaikkm;
    bt = parseInt(ct, 10) + parseInt(jarak, 10) + 1;
    at = parseInt(bt, 10) + jarak + 1;

    var hasil = [
        { mulai: at, sampai: 100, predikat: "A" },
        { mulai: bt, sampai: (at - 1), predikat: "B" },
        { mulai: ct, sampai: (bt - 1), predikat: "C" },
        { mulai: dt, sampai: (ct - 1), predikat: "D" }
    ];
    return hasil;

}
function startTimer(duration, display, callback) {
    var timer = duration, minutes, seconds;
    var tr = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        if (minutes === "00" && seconds === "00") {
            clearInterval(tr);
            if (callback !== undefined) {
                callback();
            }

        }
        display.html(minutes + ":" + seconds);

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}
function getdata(uri, getdata, success, error, downprogress, upprogress) {
    $.ajax({
        url: uri + getdata,
        method: "GET",
        dataType: "JSON",
        success: function (data, textStatus, jqXHR) {
            success(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            if (error != undefined) {
                error();
            }

        },
        xhr: function () {
            var xhr = $.ajaxSettings.xhr();
            xhr.onprogress = function (e) {
                // For downloads
                //console.log("download");
                if (e.lengthComputable) {
                    //console.log(e.loaded / e.total);
                    if (downprogress !== undefined) {
                        downprogress(100 * (e.loaded / e.total));
                    }

                }
            };
            xhr.upload.onprogress = function (e) {
                // For uploads
                if (e.lengthComputable) {
                    // console.log(e.loaded / e.total);
                    if (upprogress !== undefined) {
                        upprogress(100 * (e.loaded / e.total));
                    }
                }
            };
            return xhr;
        }
    }).done(function (e) {
        // Do something
    }).fail(function (e) {
        // Do something
    });

}
function getdatafile(uri, getdata, success, error, downprogress, upprogress) {
    $.ajax({
        url: uri + getdata,
        method: 'GET',
        xhrFields: {
            responseType: 'blob'
        },
        success: function (data) {
            //var a = document.createElement('a');
            // var url = window.URL.createObjectURL(data);
            success(data);
            // a.href = url;
            // a.download = 'myfile.pdf';
            // document.body.append(a);
            // a.click();
            // a.remove();
            //window.URL.revokeObjectURL(url);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            error();
        },
        xhr: function () {
            var xhr = $.ajaxSettings.xhr();
            xhr.onprogress = function (e) {
                // For downloads
                //console.log("download");
                if (e.lengthComputable) {
                    //console.log(e.loaded / e.total);
                    if (downprogress !== undefined) {
                        downprogress(100 * (e.loaded / e.total));
                    }

                }
            };
            xhr.upload.onprogress = function (e) {
                // For uploads
                if (e.lengthComputable) {
                    // console.log(e.loaded / e.total);
                    if (upprogress !== undefined) {
                        upprogress(100 * (e.loaded / e.total));
                    }
                }
            };
            return xhr;
        }
    }).done(function (e) {
        // Do something
    }).fail(function (e) {
        // Do something
    });

}
function postdata_loading(uri, postdata, success, error) {
    $("#preloader").removeClass('preloader-hide');
    $.ajax({
        url: uri,
        method: "POST",
        dataType: "JSON",
        data: postdata,
        success: function (data, textStatus, jqXHR) {
            $("#preloader").addClass('preloader-hide');
            success(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $("#preloader").addClass('preloader-hide');
            error(textStatus);
        }
        //,timeout: 30000
    });
}
function postdata(uri, postdata, success, error) {
    $.ajax({
        url: uri,
        method: "POST",
        dataType: "JSON",
        data: postdata,
        success: function (data, textStatus, jqXHR) {
            success(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            error();
        }
        //,timeout: 30000
    });
}
function postdatafrom(uri, postdata, success, error, downprogress, upprogress) {
    $.ajax({
        url: uri,
        method: "POST",
        data: postdata,
        dataType: 'json',
        contentType: false,
        cache: false,
        processData: false,
        success: function (data, textStatus, jqXHR) {
            success(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            error();
        },
        xhr: function () {
            var xhr = $.ajaxSettings.xhr();
            xhr.onprogress = function (e) {
                // For downloads
                //console.log("download");
                if (e.lengthComputable) {
                    //console.log(e.loaded / e.total);
                    if (downprogress !== undefined) {
                        downprogress(100 * (e.loaded / e.total));
                    }

                }
            };
            xhr.upload.onprogress = function (e) {
                // For uploads
                console.log(e);
                if (e.lengthComputable) {
                    // console.log(e.loaded / e.total);
                    if (upprogress !== undefined) {
                        upprogress(100 * (e.loaded / e.total));
                    }
                }
            };
            return xhr;
        }
    });
}
function postdataimage(uri, postdata, success, error, downprogress, upprogress) {
    $.ajax({
        url: uri,
        method: "POST",
        enctype: 'multipart/form-data',
        data: postdata,
        processData: false,
        contentType: false,
        success: function (data, textStatus, jqXHR) {
            success(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            error();
        },
        xhr: function () {
            var xhr = $.ajaxSettings.xhr();
            xhr.onprogress = function (e) {
                // For downloads
                //console.log("download");
                if (e.lengthComputable) {
                    //console.log(e.loaded / e.total);
                    if (downprogress !== undefined) {
                        downprogress(100 * (e.loaded / e.total));
                    }

                }
            };
            xhr.upload.onprogress = function (e) {
                // For uploads
                console.log(e);
                if (e.lengthComputable) {
                    // console.log(e.loaded / e.total);
                    if (upprogress !== undefined) {
                        upprogress(100 * (e.loaded / e.total));
                    }
                }
            };
            return xhr;
        }
    });
}
function postdatafile(uri, postdata, success, error, downprogress, upprogress) {
    $.ajax({
        url: uri,
        method: "POST",
        data: postdata,
        contentType: false,
        processData: false,
        headers: {
            'Content-Type': 'multipart/form-data',
            "Accept": "*/*",
            "Referer": "http://localhost:23733/materi/index"
        },
        success: function (data, textStatus, jqXHR) {
            success(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            error();
        },
        xhr: function () {
            var xhr = $.ajaxSettings.xhr();
            xhr.onprogress = function (e) {
                // For downloads
                //console.log("download");
                if (e.lengthComputable) {
                    //console.log(e.loaded / e.total);
                    if (downprogress !== undefined) {
                        downprogress(100 * (e.loaded / e.total));
                    }

                }
            };
            xhr.upload.onprogress = function (e) {
                // For uploads
                console.log(e);
                if (e.lengthComputable) {
                    // console.log(e.loaded / e.total);
                    if (upprogress !== undefined) {
                        upprogress(100 * (e.loaded / e.total));
                    }
                }
            };
            return xhr;
        }
    });
}
function createmodal(id, title, buttonsave, content, parent) {
    var ada = document.querySelectorAll("#" + id);
    var elem = "";
    if (ada.length > 0) {
        $("#" + id + " .modal-body").html(content);
        $("#" + id + " .modal-title").html(title);
        $("#" + id + " .modal-footer").html(buttonsave +
            '            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>');
        return $("#" + id);
    } else {
        elem = $('<div class="modal" id="' + id + '" tabindex="-1" data-backdrop="" role="dialog">' +
            '<div class="modal-dialog" role="document" >' +
            '    <div class="modal-content">' +
            '        <div class="modal-header">' +
            '            <div class="modal-title">' + title + '</div>' +
            '            <button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
            '                <span aria-hidden="true">&times;</span>' +
            '            </button>' +
            '        </div>' +
            '        <div class="modal-body">' +
            content +
            '        </div>' +
            '        <div class="modal-footer">' +
            buttonsave +
            '            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>' +
            '        </div>' +
            '    </div>' +
            ' </div>' +
            '</div>');
        //parent.append(elem);
        return elem;
    }


}
function openloading() {
    var elem = '<div class="boxloading"> ' +
        '<div class="lds-grid" > <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div></div>' +
        '</div>';
    var elemloading = $(elem);
    elemloading.appendTo(document.body);
    return elemloading;
}
function toast(content, tipe, customwaktu, callback,posisi) {
    var waktu = 2000;
    if (customwaktu != undefined) {
        waktu = customwaktu;
    }
    var pos = "center";
    if (posisi != undefined) {
        pos = posisi;
    }
    var elem = '<div class="toas ' + tipe +' ' +pos + '"> ' +
        '<div class="innertoas" >' +
        '    <div class="toas-content">' + content + '</div>' +
        '</div>' +
        '</div>';

    var elemloading = $(elem);
    elemloading.appendTo(document.body);
    setTimeout(function () {
        if (callback != undefined) {
            callback();
        }
        elemloading.remove();
    }, waktu);
}
function pasteHtmlAtCaret(html, selectPastedContent) {
    var sel, range;
    if (window.getSelection) {
        // IE9 and non-IE
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            range = sel.getRangeAt(0);
            range.deleteContents();

            // Range.createContextualFragment() would be useful here but is
            // only relatively recently standardized and is not supported in
            // some browsers (IE9, for one)
            var el = document.createElement("div");
            el.innerHTML = html;
            var frag = document.createDocumentFragment(), node, lastNode;
            while ((node = el.firstChild)) {
                lastNode = frag.appendChild(node);
            }
            var firstNode = frag.firstChild;
            range.insertNode(frag);

            // Preserve the selection
            if (lastNode) {
                range = range.cloneRange();
                range.setStartAfter(lastNode);
                if (selectPastedContent) {
                    range.setStartBefore(firstNode);
                } else {
                    range.collapse(true);
                }
                sel.removeAllRanges();
                sel.addRange(range);
            }
        }
    } else if ((sel = document.selection) && sel.type !== "Control") {
        // IE < 9
        var originalRange = sel.createRange();
        originalRange.collapse(true);
        sel.createRange().pasteHTML(html);
        if (selectPastedContent) {
            range = sel.createRange();
            range.setEndPoint("StartToStart", originalRange);
            range.select();
        }
    }
}
class openeditor {
    constructor() {
        this.arraymath = [];
        // this.id = "class";
        this.content;
    }
    walkingelement(element) {
        //console.log(element.childNodes.length);
        var maxid = 0;
        if (element !== undefined) {
            var doc = element.querySelectorAll("span,img,b,p,br");
            //console.log(doc);

            for (var i = 0; i < doc.length; i++) {
                //console.log(element.childNodes[i] + element.childNodes[i].tagName + " " + element.childNodes[i].childNodes.length);
                //if (element.childNodes[i].tagName !== undefined) {

                //}
                //if (element.childNodes[i].childNodes.length > 0) {
                //    walkingelement(element.childNodes[i]);
                //}
                if (doc[i].className !== "mathfieldbox") {
                    // console.log(doc[i].tagName);
                    if (doc[i].tagName === "IMG") {
                        doc[i].parentNode.id = "img" + i;
                        doc[i].parentNode.setAttribute("class", "imagefield");
                    } else {
                        doc[i].id = "input" + i;
                        doc[i].setAttribute("class", "inputtext");
                    }

                    maxid++;
                }

            }
        }

        this.content = element;
        this.elemid = maxid;
    }
    create(id, caption, html, MathLive, success, close, mfclick, imageclick) {
        this.id = id;
        this.ismath = false;
        this.isimage = false;
        this.elemid = 0;
        var isi = '<div></div>';
        var span = '<div contentEditable="true" class="math" id="' + id + '"></div>';
        var objectelem = $(span);
        var content = "";
        this.selectedinput = "";
        //console.log(html);
        content = $("<span>" + html + "</span>");
        //console.log(content);
        //console.log(content.get(0));
        if (content.get(0) !== undefined) {
            this.walkingelement(content.get(0));
            if (this.content !== undefined) {
                //console.log(this.content);
                objectelem.append(this.content);
            }
        } else {
            objectelem.html(html);
        }

        //this.elemid = this.elemid + 1;
        //objectelem.append($("<span class='inputtext' id='input" + this.elemid + "'>&nbsp</span>"));

        var objectisi = $(isi);
        objectisi.append(objectelem);
        var elem = '<div class="boxdialog" id="box' + id + '">' +
            '<div class="boxdialog-content" >' +
            '    <div class="boxdialog-header">' +
            '        <div class="boxdialog-caption">' + caption + '</div>' +
            '        <div class="boxdialog-close"> <a class="btn far fa-window-close btnclose" style="color:white"></a></div>' +
            '    </div>' +
            '    <div class="boxdialog-body">' +
            objectisi.html() +
            '    </div>' +
            '    <div class="boxdialog-footer">' +

            '        <a class="btn far fa-save success"></a>' +
            '        <a class="btn far fa-times-circle btnclose" style="color:red"></a>' +
            '        <a class="btn far fa-image btnimage" style="color:black;float:left"></a>' +
            '        <a class="btn 	fas fa-square-root-alt btnmath" style="color:black;float:left;"></a>' +
            '        <a class="btn fas fa-font btntext" style="color:black;float:left"></a>' +

            '     <div style="color:black;float:left;">' +
            '        Double Click Image to Change/Delete' +
            '    </div>' +
            '    </div>' +
            '</div>' +
            '</div>';

        this.elemloading = $(elem);
        this.elemloading.appendTo(document.body);
        objectelem.focus();
        var elemmath = document.querySelectorAll("#" + id + " .mathfieldbox");
        for (var i = 0; i < elemmath.length; i++) {
            var mathid = "formula" + i;
            elemmath[i].setAttribute("id", mathid);
            elemmath[i].setAttribute("contentEditable", "false");
            var mathvalue = elemmath[i].innerHTML;
            var mf = MathLive.makeMathField(elemmath[i], {
                smartMode: true,
                //virtualKeyboardMode: 'manual',
                fontsDirectory: window.location.origin + '/fonts',
                readOnly: true,
                onContentDidChange: (mf) => {
                    //document.getElementById('output').innerHTML = mf.$text('latex');
                    //console.log(mf.$text('latex'));
                    if (mf.$text('latex') === "") {
                        $("#" + mf.mathid).remove();
                    }
                },
                onFocus: (mf) => {
                    //console.log("click");

                    //mf.mathid = mathid;
                    //console.log(mf.mathid);
                    if (mfclick !== undefined) {
                        // mfclick(mf);
                        this.selectedinput = mf.mathid;
                        this.ismath = true;
                    }
                }
            });
            //mf.$latex()
            mf.mathid = mathid;
            //elemmath[i].ondblclick = function () {
            //    //console.log("click");
            //    mfclick(mf);
            //};
            var d = { tipe: "math", id: "formula" + i, value: mathvalue, mf: mf };
            this.arraymath.push(d);
            //var r = this.arraymath.find(function (s) { return s.id === mathid });
            //r.mf = mf;
            //console.log(r);
        }
        this.maxid = i;
        //this.content
        //this.arraymath = arraymath;
        this.succesclick = function () {
            // console.log(this.arraymath);
            var result = "";

            for (var i = 0; i < this.arraymath.length; i++) {
                if (this.arraymath[i].tipe === "text") {
                    var v = $("#" + this.arraymath[i].id).html();
                    // result = result + v;
                    this.arraymath[i].value = v;
                } else if (this.arraymath[i].tipe === "math") {
                    var mfcontent = this.arraymath[i].value;
                    this.arraymath[i].mf.$latex(mfcontent);
                    //mfcontent = mfcontent.replace(/\\/g, "\\\\");
                    // this.arraymath[i].value = mfcontent;
                    this.arraymath[i].value = mfcontent;

                    //result = result + "<span>" + mfcontent + "</span>";
                }
                var box = $("#box" + c.id).find("#" + this.arraymath[i].id);
                //console.log("box" + box);
                box.html(this.arraymath[i].value);
                box.attr("id", "");
                // box.attr("class", "");


            }
            var spn = document.querySelectorAll("#" + id + " .inputtext");
            for (var i = spn.length - 1; i >= 0; i--) {
                if (spn[i].innerText === "" && spn[i].innerHTML === "") {
                    $(spn[i]).remove();
                }
            }
            var img = document.querySelectorAll(".imagefield");
            for (var i = 0; i < img.length; i++) {
                $(img[i]).attr("id", "");
            }
            //console.log(this.arraymath);
            result = $("#box" + c.id + " .boxdialog-body " + " .math").html();
            if (success !== undefined) {
                //result = "";
                //console.log(result);
                success(result, this.arraymath);
            }
            this.elemloading.remove();
        };
        var c = this;
        var succesbtn = this.elemloading.find(".success");
        if (succesbtn !== undefined) {
            // c = this;

            succesbtn.click(function (context) {
                //console.log(c.id);
                c.succesclick();
            });
        }
        var closebtn = this.elemloading.find(".btnclose");
        if (closebtn !== undefined) {
            closebtn.click(function () {
                if (close !== undefined) {
                    close();
                }
                c.elemloading.remove();
                // console.log("close");
            });
        }
        var btntext = this.elemloading.find(".btntext");
        if (btntext !== undefined) {
            btntext.click(function () {
                c.selectedinput = c.id;
                var input = document.getElementById(c.selectedinput);
                //var inputContent = input.innerHTML.length;
                // console.log(input);
                input.focus();
                c.elemid = c.elemid + 1;
                pasteHtmlAtCaret("<span class='inputtext' id='input" + c.elemid + "'>&nbsp</span>", true);
            });
        }
        var btnmath = this.elemloading.find(".btnmath");
        if (btnmath !== undefined) {
            btnmath.click(function () {

                //this.elemloading.remove();
                //console.log(c.selectedinput);
                if (c.ismath === true) {
                    var ar = c.arraymath.find(function (s) { return s.id === c.selectedinput });
                    // console.log(ar);
                    mfclick(ar.mf);
                } else {
                    var input = document.getElementById(c.selectedinput);
                    var inputContent = input.innerHTML.length;
                    // You may want to focus the textbox in case it's not
                    //console.log(inputContent);
                    input.focus();
                    c.maxid = c.maxid + 1;
                    pasteHtmlAtCaret("<span class='mathfieldbox' id='formula" + c.maxid + "'> </span><span>&nbsp&nbsp</span>", false);
                    var mf = MathLive.makeMathField(document.getElementById('formula' + c.maxid), {
                        smartMode: true,
                        //virtualKeyboardMode: 'manual',
                        readOnly: true,
                        onContentDidChange: (mf) => {
                            //document.getElementById('output').innerHTML = mf.$text('latex');
                        },
                        onFocus: (mf) => {
                            //console.log("click");
                            c.selectedinput = "formula" + c.maxid;
                            c.ismath = true;
                            //mf.mathid = mathid;
                            //console.log(mf.mathid);
                            //if (mfclick !== undefined) {
                            //    mfclick(mf);
                            //}
                        }
                    });
                    //c.maxid = c.maxid + 1;
                    mathid = "formula" + c.maxid;
                    mf.mathid = mathid;

                    var dobj = { tipe: "math", id: mathid, value: "", mf: mf };
                    c.arraymath.push(dobj);
                    //console.log(mf);
                    var elemmath = document.getElementById("formula" + c.maxid);
                    //console.log(elemmath);
                    $(elemmath).click(function () {
                        // console.log("click");
                        //mfclick(mf);
                        c.selectedinput = "formula" + c.maxid;
                        c.ismath = true;
                    });
                    mfclick(mf);
                }

                //console.log(r);
            });
        }
        var inputtext = this.elemloading.find(".inputtext");
        if (inputtext !== undefined) {
            inputtext.click(function () {
                c.selectedinput = this.id;
                c.ismath = false;
                c.isimage = false;
                //this.elemloading.remove();
                //console.log(this.id);
            });
            inputtext.on("DOMNodeInserted", function (ev) {
                //c.selectedinput = this.id;
                //this.elemloading.remove();
                ev.target.ondblclick = function (e) {
                    if (this.tagName === "IMG") {
                        console.log(this.parentNode.id);
                        //c.selectedinput = this.parentNode.id;
                        c.isimage = true;
                        open_imageeditor(this, function (result) {

                        }, undefined);
                    }

                };
                //console.log(ev);
            });
        }
        var parentinput = document.getElementById(id);
        parentinput.onclick = function () {
            //console.log(this.id);
            c.selectedinput = this.id;
            c.ismath = false;
            c.isimage = false;
        };
        var imagefield = this.elemloading.find(".imagefield img");
        if (imagefield !== undefined) {
            imagefield.dblclick(function () {
                //c.selectedinput = this.parentNode.id;
                c.isimage = true;
                //this.elemloading.remove();
                //console.log(this.parentNode.id);
                open_imageeditor(this, function (result) {

                }, undefined);
            });
        }
        var btnimage = this.elemloading.find(".btnimage");
        if (btnimage !== undefined) {
            btnimage.click(function () {

                var input = document.getElementById(c.selectedinput);
                var inputContent = input.innerHTML.length;

                input.focus();
                c.elemid = c.elemid + 1;
                pasteHtmlAtCaret("<span class='imagefield' contentEditable='false' id='img" + c.elemid + "'></span>", false);
                imageclick("img" + c.elemid);
                //console.log(r);
            });
        }
        return this;
    }
}
function open_minieditor(content, MathLive, success, close) {
    var exist = document.getElementById("minimf");
    // console.log(exist);
    if (exist === null) {


        var isi = '<div></div>';
        var span = '<div class="mathfield minimath" contentEditable="true" id="minimf"></div>';
        var objectelem = $(span);
        //console.log(content);
        if (content !== undefined) {

            var objectisi = $(isi);
            objectisi.append(objectelem);

            var elem = '<div class="mini-boxdialog">' +
                '<div class="mini-boxdialog-content" >' +
                '    <div class="mini-boxdialog-body">' +
                objectisi.html() +
                '    </div>' +
                '    <div class="mini-boxdialog-footer">' +
                '        <a class="btn fas fa-check success"></a>' +
                '        <a class="btn far fa-times-circle btnclose" style="color:red"></a>' +
                '            </div> ' +
                '    </div> ' +
                '</div>';
            var elemloading = $(elem);
            elemloading.appendTo(document.body);
            var elemmath = document.querySelectorAll("#minimf");
            //console.log(elemmath);
            var mf;
            if (elemmath.length > 0) {
                mf = MathLive.makeMathField(elemmath[0], {
                    smartMode: true,
                    virtualKeyboardMode: 'manual',
                    //readOnly:true,
                    onContentDidChange: (mf) => {
                        //document.getElementById('output').innerHTML = mf.$text('latex');
                    },
                    onFocus: (mf) => {
                        // console.log("click");
                    }
                });
            }

            mf.$latex(content);
            mf.$focus();
            var succesbtn = elemloading.find(".success");
            if (succesbtn !== undefined) {
                succesbtn.click(function () {
                    $(".keyboard-layer").removeClass("is-visible");
                    var result = "";
                    if (mf !== undefined) {
                        result = mf.$latex();
                    }
                    if (success !== undefined) {
                        success(result);
                    }
                    elemloading.remove();
                    //console.log("success" + result);
                });
            }
            var closebtn = elemloading.find(".btnclose");
            if (closebtn !== undefined) {
                closebtn.click(function () {
                    $(".keyboard-layer").removeClass("is-visible");
                    if (close !== undefined) {
                        close();
                    }
                    elemloading.remove();
                    // console.log("close");
                });
            }
            return elemloading;
        }
    }


}
function open_imageeditor(content, success, close) {
    var exist = document.getElementById("miniimage");
    //console.log(exist);
    if (exist === null) {
        var span = "";
        if (content === "") {
            // content = '<img src="" id="miniimage-img"></img>';
            span = '<div class="miniimage" id="miniimage">' +
                '<img src="" id="miniimage-img"></img>' +
                '<input class="file" type="file" style="display:none"></input>' +
                '</div> ';
        } else {
            span = '<div class="miniimage" id="miniimage">' +
                '<input class="file" type="file" style="display:none"></input>' +
                '</div> ';
        }
        var isi = '<div></div>';
        //$(span).find("#miniimage").append(content);
        var objectelem = $(span);
        if (content !== "") {
            //content.addClass("miniimage");
            var clone = $(content).clone();
            clone.attr("id", "miniimage-img");
            objectelem.append(clone);
        }

        if (content !== undefined) {

            var objectisi = $(isi);
            objectisi.append(objectelem);

            var elem = '<div class="mini-boxdialog mini-image">' +
                '<div class="mini-boxdialog-content" >' +
                '    <div class="mini-boxdialog-body">' +
                objectisi.html() +
                '    </div>' +
                '    <div class="mini-boxdialog-footer">' +
                '    <div style="float: left;">' +
                '<div>Size :</div>' +
                '     <div>' +
                '        <input  type="range" id="miniimage-vol" name="vol" min="1" max="100" value="100">' +
                '    </div>' +
                '     <div>' +
                '        Click Delete to Remove Image' +
                '    </div>' +
                '    </div>' +
                '    <div style="float: right;">' +
                '        <a class="btn far fa-trash-alt btnremove" style="color:red"></a>' +
                '        <a class="btn fas fa-check success"></a>' +
                '        <a class="btn far fa-times-circle btnclose" style="color:red"></a>' +
                '        <a class="btn far fa-file-image openfile"></a>' +
                '    </div>' +
                '    </div> ' +
                '    </div> ' +
                '</div>';
            var elemloading = $(elem);
            elemloading.appendTo(document.body);

            //console.log(elemwidth);
            if (content === "") {
                $('#miniimage .file').trigger('click');
            }
            $('#miniimage .file').change(function () {
                if (this.files && this.files[0]) {
                    var reader = new FileReader();

                    reader.onload = function (e) {
                        var img = new Image;
                        img.onload = function () {
                            //alert(img.width); // image is loaded; sizes are available
                            //console.log("height "+img.height);
                            $('#miniimage img').width(img.width);
                            $('#miniimage img').height(img.height);
                            $('#miniimage img').attr('src', img.src);

                            //
                        };
                        img.src = e.target.result;


                    };

                    reader.readAsDataURL(this.files[0]); // convert to base64 string
                }
            });
            $('#miniimage-vol').change(function () {
                var img = document.getElementById('miniimage-img');
                var d = document.getElementsByClassName("mini-boxdialog-body");
                var elemwidth = 0;
                var elemheight = 0;

                if (d.length > 0) {
                    elemheight = d[0].clientHeight;
                    elemwidth = d[0].clientWidth;

                }
                //// console.log(this.value);
                var maxWidth = elemwidth;//(elemwidth * (this.value / 100)); // Max width for the image
                var maxHeight = elemheight; //(elemheight * (this.value / 100));    // Max height for the image
                var width = $(img).attr("width");    // Current image width
                var height = $(img).attr("height");  // Current image height
                var ratio = maxWidth / width;   // get ratio for scaling image
                width = width * (this.value / 100);
                //ratio = height / width;
                height = height * (this.value / 100);


                $(img).css("width", width); // Set new width
                $(img).css("height", height);  // Scale height based on ratio
                // resizeimage(this.value, $('#miniimage img'), elemwidth, elemheight);
            });
            var img = document.getElementById('miniimage-img');
            img.onload = function () {
                //console.log("The image has loaded!");
                var d = document.getElementsByClassName("mini-boxdialog-body");
                var elemwidth = 0;
                var elemheight = 0;

                if (d.length > 0) {
                    elemheight = d[0].clientHeight;
                    elemwidth = d[0].clientWidth;

                }
                resizeimage(100, $('#miniimage img'), elemwidth, elemheight);
            };

            var succesbtn = elemloading.find(".success");
            if (succesbtn !== undefined) {
                succesbtn.click(function () {
                    var result = { src: "", width: 0, height: 0 };
                    var img = document.getElementById('miniimage-img');
                    //console.log(img);
                    if (img !== undefined) {
                        result.src = img.src;
                        result.width = img.width;
                        result.height = img.height;
                        if (content !== "") {
                            content.src = img.src;
                            content.width = img.width;
                            content.height = img.height;
                        }
                    }
                    if (success !== undefined) {
                        success(result);
                    }
                    elemloading.remove();
                    //console.log("success" + result);
                });
            }
            var closebtn = elemloading.find(".btnclose");
            if (closebtn !== undefined) {
                closebtn.click(function () {
                    //$(content).remove();
                    if (close !== undefined) {
                        close();
                    }
                    elemloading.remove();
                    //console.log("close");
                });
            }
            var btnremove = elemloading.find(".btnremove");
            if (btnremove !== undefined) {
                btnremove.click(function () {
                    $(content).remove();
                    if (close !== undefined) {
                        close();
                    }
                    elemloading.remove();
                    //console.log("close");
                });
            }
            var openfile = elemloading.find(".openfile");
            if (openfile !== undefined) {
                openfile.click(function () {
                    $('#miniimage .file').trigger('click');
                    //elemloading.remove();
                    //console.log("close");
                });
            }
            return elemloading;
        }
    }


}
function resizeimage(persen, elem, elemwidth, elemheight) {
    //console.log(elem);
    // console.log(elem.width());
    if (elemwidth === undefined) {
        elemwidth = 100;
    }
    if (elemheight === undefined) {
        elemheight = 100;
    }

    var maxWidth = (elemwidth * (persen / 100)); // Max width for the image
    var maxHeight = (elemheight * (persen / 100));    // Max height for the image
    //console.log(maxWidth);
    var ratio = 0;  // Used for aspect ratio
    var width = elem.width();    // Current image width
    var height = elem.height();  // Current image height
    console.log("elemwidth" + elemwidth);
    console.log("elemheight" + elemheight);

    // Check if the current width is larger than the max
    if (width > maxWidth) {
        ratio = maxWidth / width;   // get ratio for scaling image
        elem.css("width", maxWidth); // Set new width
        elem.css("height", height * ratio);  // Scale height based on ratio
        elem.attr("width", maxWidth); // Set new width
        elem.attr("height", height * ratio);  // Scale height based on ratio
        height = height * ratio;    // Reset height to match scaled image
        width = width * ratio;    // Reset width to match scaled image
    }

    // Check if current height is larger than max
    if (height > maxHeight) {
        ratio = maxHeight / height; // get ratio for scaling image
        elem.css("height", maxHeight);   // Set new height
        elem.css("width", width * ratio);    // Scale width based on ratio
        elem.attr("height", maxHeight);   // Set new height
        elem.attr("width", width * ratio);    // Scale width based on ratio
        width = width * ratio;    // Reset width to match scaled image
        height = height * ratio;    // Reset height to match scaled image
    }
}
function generateid() {
    return '_' + Math.random().toString(36).substr(2, 9);
}
function no_editor(content, success, close) {
    var exist = document.getElementById("noeditor");
    //console.log(exist);
    if (exist === null) {
        var span = "";
        span = '<div class="noeditor" id="noeditor">' +
            '<div>NOMER :</div><div><input type="input" id="input-noeditor" value="' + content + '" ></input></div>' +
            '</div> ';
        var isi = '<div></div>';
        //$(span).find("#miniimage").append(content);
        var objectelem = $(span);

        var elem = '<div class="mini-boxdialog no-editor">' +
            '<div class="mini-nodialog-content" >' +
            '    <div class="mini-nodialog-body">' +
            objectelem.html() +
            '    </div>' +
            '    <div class="mini-boxdialog-footer">' +
            '    <div style="float: right;">' +
            '        <a class="btn fas fa-check success"></a>' +
            '        <a class="btn far fa-times-circle btnclose" style="color:red"></a>' +
            '    </div>' +
            '    </div> ' +
            '    </div> ' +
            '</div>';
        var elemloading = $(elem);
        elemloading.appendTo(document.body);
        $("#input-noeditor").focus();
        var succesbtn = elemloading.find(".success");
        if (succesbtn !== undefined) {
            succesbtn.click(function () {
                var result = "";
                result = $("#input-noeditor").val();
                if ($.isNumeric(result) === false) {
                    result = 0;
                }
                if (success !== undefined) {
                    success(result);
                }
                elemloading.remove();
                //console.log("success" + result);
            });
        }

        var closebtn = elemloading.find(".btnclose");
        if (closebtn !== undefined) {
            closebtn.click(function () {
                if (close !== undefined) {
                    close();
                }
                elemloading.remove();
                //console.log("close");
            });
        }
    }
}

function imgerror(t) {
    t.onerror = null;
    t.src = "/Content/image/add_image.png";
}
function elementsoal(soal_id, id, no, primaryimage, textsoal, jawabanA, jawabanB, jawabanC, jawabanD, jawabanE, jawabanF, jawabanbenar, width, height,
    tipe_soal, pembahasan, is_link, link_soal_detail_id, locked) {
    //"~/Content/image/add_image.png"
    //var imgonerror = ' onerror="this.onerror=null;this.src='https://placeimg.com/200/300/animals';"';
    //var id = generateid();
    var display = 'inline-block';
    if (locked === 1) {
        display = 'none';
    }
    var active = 'active';
    var activeA = '';
    var activeB = '';
    var activeC = '';
    var activeD = '';
    var activeE = '';
    var activeF = '';
    if (jawabanbenar === 'A') {
        activeA = 'active';
    }
    if (jawabanbenar === 'B') {
        activeB = 'active';
    }
    if (jawabanbenar === 'C') {
        activeC = 'active';
    }
    if (jawabanbenar === 'D') {
        activeD = 'active';
    }
    if (jawabanbenar === 'E') {
        activeE = 'active';
    }
    if (jawabanbenar === 'F') {
        activeF = 'active';
    }

    if (primaryimage === '') {
        active = '';
    }
    //'<a class="btn far fa-edit" soal_id="' + soal_id + '" soal_detail_id="' + id + '" elemid="no' + id + '" id="btneditno' + id + '" onclick="show_no_editor(this)"></a>' +
    var elemimg = '<div class="primaryimg ' + active + '" id="primaryimage' + id + '" ondblclick="imageclick(this)"> ' +
        '<img width="' + width + ' height="' + height + ' src="' + primaryimage + '"  elemid="primaryimage' + id + '" onerror="imgerror(this)"/>' +
        '<div>' +
        '<a bagian="primaryimage" soal_detail_id="' + id + '" elemid="primaryimage' + id + '" onclick="imageremove(this)">Remove</a>' +
        '</div>' +
        '</div>';
    var elemganda = '<div class="row">' +
        '<div class="col-sm-6 col-md-6 textsoal">' +
        '<div class="no"><div class="' + activeA + ' lingkaranpilihan lingkaranpilihan' + id + ' " soal_detail_id="' + id + '" elemid="pilihana' + id + '" id="pilihana' + id + '" onclick="setjawaban(this)">A</div>.</div>' +
        '<div class="jawaban" id="jawabana' + id + '" >' + jawabanA + '</div>' +
        '<div class="tombol"><a class="btn fa fa-edit" bagian="jawabana" soal_detail_id="' + id + '" elemid="jawabana' + id + '" id="buttona' + id + '" onclick="showeditor(this)" style="display:'+display+'"></a></div>' +
        '</div>' +
        '<div class="col-sm-6 col-md-6 textsoal">' +
        '<div class="no"><div class="' + activeB + ' lingkaranpilihan lingkaranpilihan' + id + '" soal_detail_id="' + id + '" elemid="pilihanb' + id + '" id="pilihanb' + id + '" onclick="setjawaban(this)">B</div>.</div>' +
        '<div class="jawaban" id="jawabanb' + id + '" >' + jawabanB + '</div>' +
        '<div class="tombol"><a class="btn fa fa-edit" bagian="jawabanb" soal_detail_id="' + id + '" elemid="jawabanb' + id + '" id="buttonb' + id + '" onclick="showeditor(this)" style="display:' + display +'"></a></div>' +
        '</div>' +
        '<div class="col-sm-6 col-md-6 textsoal">' +
        '<div class="no"><div class="' + activeC + ' lingkaranpilihan lingkaranpilihan' + id + '" soal_detail_id="' + id + '" elemid="pilihanc' + id + '" id="pilihanc' + id + '" onclick="setjawaban(this)">C</div>.</div>' +
        '<div class="jawaban" id="jawabanc' + id + '" >' + jawabanC + '</div>' +
        '<div class="tombol"><a class="btn fa fa-edit" bagian="jawabanc" soal_detail_id="' + id + '" elemid="jawabanc' + id + '" id="buttonc' + id + '" onclick="showeditor(this)" style="display:' + display +'"></a></div>' +
        '</div>' +
        '<div class="col-sm-6 col-md-6 textsoal">' +
        '<div class="no"><div class="' + activeD + ' lingkaranpilihan lingkaranpilihan' + id + '" soal_detail_id="' + id + '" elemid="pilihand' + id + '" id="pilihand' + id + '" onclick="setjawaban(this)">D</div>.</div>' +
        '<div class="jawaban" id="jawaband' + id + '" >' + jawabanD + '</div>' +
        '<div class="tombol"><a class="btn fa fa-edit" bagian="jawaband" soal_detail_id="' + id + '" elemid="jawaband' + id + '" id="buttond' + id + '" onclick="showeditor(this)" style="display:' + display +'"></a></div>' +
        '</div>' +
        '<div class="col-sm-6 col-md-6 textsoal">' +
        '<div class="no"><div class="' + activeE + ' lingkaranpilihan lingkaranpilihan' + id + '" soal_detail_id="' + id + '" elemid="pilihane' + id + '" id="pilihane' + id + '" onclick="setjawaban(this)">E</div>.</div>' +
        '<div class="jawaban" id="jawabane' + id + '" >' + jawabanE + '</div>' +
        '<div class="tombol"><a class="btn fa fa-edit" bagian="jawabane" soal_detail_id="' + id + '" elemid="jawabane' + id + '" id="buttone' + id + '" onclick="showeditor(this)" style="display:' + display +'"></a></div>' +
        '</div>' +
        '<div class="col-sm-6 col-md-6 textsoal">' +
        '<div class="no"><div class="' + activeF + ' lingkaranpilihan lingkaranpilihan' + id + '" soal_detail_id="' + id + '" elemid="pilihanf' + id + '" id="pilihanf' + id + '" onclick="setjawaban(this)">F</div>.</div>' +
        '<div class="jawaban" id="jawabanf' + id + '" >' + jawabanF + '</div>' +
        '<div class="tombol"><a class="btn fa fa-edit" bagian="jawabanf" soal_detail_id="' + id + '" elemid="jawabanf' + id + '" id="buttonf' + id + '" onclick="showeditor(this)" style="display:' + display +'"></a></div>' +
        '</div>' +
        '</div>';
    var elemjawabanbenar = '<div style="margin-bottom:5px;font-weight: 700;" id="jawabanbenar' + id + '">Jawaban Benar ' + jawabanbenar + '</div>';
    var elempembahasan = '<div style="margin-bottom: 5px;border: 1px solid #dcd8d8;padding: 4px;" ><div style="margin-bottom: 10px;" id="pembahasan' + id + '">' + pembahasan + '</div><div>' +
        '<a class="btn btn-primary" bagian="pembahasan" soal_detail_id="' + id + '" elemid="pembahasan' + id + '" id="btnedit_pembahasan' + id + '" onclick="showeditor(this)" style="height: 23px;padding: 0px 6px;display:' + display +'">Edit Pembahasan</a></div></div> ';
    var classnumber = "";
    if (tipe_soal === "isian") {
        elemganda = "";
        elemjawabanbenar = "";
        classnumber = "number-isian";
    }
    var elem = $('<table class="tablesoal" id="table' + id + '">' +
        '<tr id="row' + id + '">' +
        '<td class="col1 noborder" rowspan="2"><div class="no number ' + classnumber + '" ><div soal_id="' + soal_id + '" soal_detail_id="' + id + '" elemid="no' + id + '" onclick="show_no_editor(this)" id="no' + id + '">' + no + '</div>' +
        '</div>' +
        '</td>' +

        '<td class="col3 noborder" colspan="1">' +
        elemimg +
        '    <div style="min-height: 43px;padding: 12px 1px 1px 1px;"><span id="textsoal' + id + '" >' + textsoal + '</span>' +
        '<div style="text-align: right;">' +
        //'<a class="btn far fa-image" bagian="primaryimage" soal_detail_id="' + id + '" elemid="primaryimage' + id + '" id="btnimage' + id + '" onclick="imageclick(this)"></a>' +
        '<a class="btn far fa-edit" bagian="textsoal" soal_detail_id="' + id + '" elemid="textsoal' + id + '" id="btnedit' + id + '" onclick="showeditor(this)" style="display:' + display +'"></a>' +
        '<a class="btn far fa-trash-alt" id="btnhapus' + id + '" style="color:red;" soal_detail_id="' + id + '" onclick="hapussoal(this)" ></a>' +
        '</div>' +
        '   </div>' +
        elemjawabanbenar +
        elempembahasan +
        '</td>' +
        '</tr>' +
        ' <tr> ' +
        '    <td class="noborder"> ' +
        elemganda +
        '    </td> ' +
        ' </tr> ' +
        '        </table >');
    dataelement.push({ masterid: id, id: "textsoal" + id, html: textsoal });
    dataelement.push({ masterid: id, id: "jawabana" + id, html: jawabanA });
    dataelement.push({ masterid: id, id: "jawabanb" + id, html: jawabanB });
    dataelement.push({ masterid: id, id: "jawabanc" + id, html: jawabanC });
    dataelement.push({ masterid: id, id: "jawaband" + id, html: jawabanD });
    dataelement.push({ masterid: id, id: "jawabane" + id, html: jawabanE });
    dataelement.push({ masterid: id, id: "jawabanf" + id, html: jawabanF });
    dataelement.push({ masterid: id, id: "pembahasan" + id, html: pembahasan });
    dataelement.push({ masterid: id, id: "properti" + id, is_link: is_link, link_soal_detail_id: link_soal_detail_id });

    return elem;

}
function elementsoal2(element,soal_id, id, no, primaryimage, textsoal, jawabanA, jawabanB, jawabanC, jawabanD, jawabanE, jawabanF, jawabanbenar, width, height,
    tipe_soal, pembahasan, is_link, link_soal_detail_id, locked, jml_jwb) {
    //"~/Content/image/add_image.png"
    //var imgonerror = ' onerror="this.onerror=null;this.src='https://placeimg.com/200/300/animals';"';
    //var id = generateid();
    var display = 'inline-block';
    var editable = 'contenteditable="true"';
    if (locked === 1) {
        display = 'none';
        editable = "";
    }

    var active = 'active';
    var activeA = '';
    var activeB = '';
    var activeC = '';
    var activeD = '';
    var activeE = '';
    var activeF = '';
    if (jawabanbenar === 'A') {
        activeA = 'active';
    }
    if (jawabanbenar === 'B') {
        activeB = 'active';
    }
    if (jawabanbenar === 'C') {
        activeC = 'active';
    }
    if (jawabanbenar === 'D') {
        activeD = 'active';
    }
    if (jawabanbenar === 'E') {
        activeE = 'active';
    }
    if (jawabanbenar === 'F') {
        activeF = 'active';
    }

    if (primaryimage === '') {
        active = '';
    }
    textsoal = appendbagian(textsoal, "textsoal", id);
    jawabanA = appendbagian(jawabanA, "jawabana", id);
    jawabanB = appendbagian(jawabanB, "jawabanb", id);
    jawabanC = appendbagian(jawabanC, "jawabanc", id);
    jawabanD = appendbagian(jawabanD, "jawaband", id);
    jawabanE = appendbagian(jawabanE, "jawabane", id);
    jawabanF = appendbagian(jawabanF, "jawabanf", id);
    //console.log(textsoal);
    //'<a class="btn far fa-edit" soal_id="' + soal_id + '" soal_detail_id="' + id + '" elemid="no' + id + '" id="btneditno' + id + '" onclick="show_no_editor(this)"></a>' +
    var elemimg = '<div class="primaryimg ' + active + '" id="primaryimage' + id + '" ondblclick="imageclick(this)"> ' +
        '<img width="' + width + ' height="' + height + ' src="' + primaryimage + '"  elemid="primaryimage' + id + '" onerror="imgerror(this)"/>' +
        '<div>' +
        '<a bagian="primaryimage" soal_detail_id="' + id + '" elemid="primaryimage' + id + '" onclick="imageremove(this)">Remove</a>' +
        '</div>' +
        '</div>';
    dataganda = '';
    if (jml_jwb >= 2) {
        dataganda += '<div class="col-12 col-xs-12 col-sm-12 col-md-6 textsoal">' +
            '<div class="no"><div class="' + activeB + ' lingkaranpilihan lingkaranpilihan' + id + '" soal_detail_id="' + id + '" elemid="pilihanb' + id + '" id="pilihanb' + id + '" onclick="setjawaban(this)">B</div>.</div>' +
            '<div class="jawaban"  ' + editable + ' bagian="jawabanb" id="jawabanb' + id + '" >' + jawabanB + '</div>' +
            '<div class="tombol">' +
            '<a class="btn fas fa-square-root-alt" bagian="jawabanb" soal_detail_id="' + id + '" elemid="jawabanb' + id + '" id="buttona' + id + '" onclick="showeditor(this)" style="display:' + display + '"></a>' +
            '<a class="btn far fa-image" bagian="jawabanb" soal_detail_id="' + id + '" elemid="jawabanb' + id + '" id="buttona' + id + '" onclick="showimageditor(this)" style="display:' + display + '"></a>' +
            '</div>' +
            '</div>';
    }
    if (jml_jwb >= 3) {
        dataganda += '<div class="col-12 col-xs-12 col-sm-12 col-md-6 textsoal">' +
            '<div class="no"><div class="' + activeC + ' lingkaranpilihan lingkaranpilihan' + id + '" soal_detail_id="' + id + '" elemid="pilihanc' + id + '" id="pilihanc' + id + '" onclick="setjawaban(this)">C</div>.</div>' +
            '<div class="jawaban"  ' + editable + ' bagian="jawabanc" id="jawabanc' + id + '" >' + jawabanC + '</div>' +
            '<div class="tombol">' +
            '<a class="btn fas fa-square-root-alt" bagian="jawabanc" soal_detail_id="' + id + '" elemid="jawabanc' + id + '" id="buttona' + id + '" onclick="showeditor(this)" style="display:' + display + '"></a>' +
            '<a class="btn far fa-image" bagian="jawabanc" soal_detail_id="' + id + '" elemid="jawabanc' + id + '" id="buttona' + id + '" onclick="showimageditor(this)" style="display:' + display + '"></a>' +
            '</div>' +
            '</div>';
    }
    if (jml_jwb >= 4) {
        dataganda += '<div class="col-12 col-xs-12 col-sm-12 col-md-6 textsoal">' +
            '<div class="no"><div class="' + activeD + ' lingkaranpilihan lingkaranpilihan' + id + '" soal_detail_id="' + id + '" elemid="pilihand' + id + '" id="pilihand' + id + '" onclick="setjawaban(this)">D</div>.</div>' +
            '<div class="jawaban"  ' + editable + ' bagian="jawaband" id="jawaband' + id + '" >' + jawabanD + '</div>' +
            '<div class="tombol">' +
            '<a class="btn fas fa-square-root-alt" bagian="jawaband" soal_detail_id="' + id + '" elemid="jawaband' + id + '" id="buttona' + id + '" onclick="showeditor(this)" style="display:' + display + '"></a>' +
            '<a class="btn far fa-image" bagian="jawaband" soal_detail_id="' + id + '" elemid="jawaband' + id + '" id="buttona' + id + '" onclick="showimageditor(this)" style="display:' + display + '"></a>' +
            '</div>' +
            '</div>';
    }
    if (jml_jwb >= 5) {
        dataganda += '<div class="col-12 col-xs-12 col-sm-12 col-md-6 textsoal">' +
            '<div class="no"><div class="' + activeE + ' lingkaranpilihan lingkaranpilihan' + id + '" soal_detail_id="' + id + '" elemid="pilihane' + id + '" id="pilihane' + id + '" onclick="setjawaban(this)">E</div>.</div>' +
            '<div class="jawaban"  ' + editable + ' bagian="jawabane" id="jawabane' + id + '" >' + jawabanE + '</div>' +
            '<div class="tombol">' +
            '<a class="btn fas fa-square-root-alt" bagian="jawabane" soal_detail_id="' + id + '" elemid="jawabane' + id + '" id="buttona' + id + '" onclick="showeditor(this)" style="display:' + display + '"></a>' +
            '<a class="btn far fa-image" bagian="jawabane" soal_detail_id="' + id + '" elemid="jawabane' + id + '" id="buttona' + id + '" onclick="showimageditor(this)" style="display:' + display + '"></a>' +
            '</div>' +
            '</div>';
    }
    if (jml_jwb >= 6) {
        dataganda += '<div class="col-12 col-xs-12 col-sm-12 col-md-6 textsoal">' +
            '<div class="no"><div class="' + activeF + ' lingkaranpilihan lingkaranpilihan' + id + '" soal_detail_id="' + id + '" elemid="pilihanf' + id + '" id="pilihanf' + id + '" onclick="setjawaban(this)">F</div>.</div>' +
            '<div class="jawaban"  ' + editable + ' bagian="jawabanf" id="jawabanf' + id + '" >' + jawabanF + '</div>' +
            '<div class="tombol">' +
            '<a class="btn fas fa-square-root-alt" bagian="jawabanf" soal_detail_id="' + id + '" elemid="jawabanf' + id + '" id="buttona' + id + '" onclick="showeditor(this)" style="display:' + display + '"></a>' +
            '<a class="btn far fa-image" bagian="jawabanf" soal_detail_id="' + id + '" elemid="jawabanf' + id + '" id="buttona' + id + '" onclick="showimageditor(this)" style="display:' + display + '"></a>' +
            '</div>' +
            '</div>';
    }
    var elemganda = '<div class="row">' +
        '<div class="col-12 col-xs-12 col-sm-12 col-md-6 textsoal">' +
        '<div class="no"><div class="' + activeA + ' lingkaranpilihan lingkaranpilihan' + id + ' " soal_detail_id="' + id + '" elemid="pilihana' + id + '" id="pilihana' + id + '" onclick="setjawaban(this)">A</div>.</div>' +
        '<div class="jawaban" '+ editable+' bagian="jawabana" id="jawabana' + id + '" >' + jawabanA + '</div>' +
            '<div class="tombol">' +
            '<a class="btn fas fa-square-root-alt" bagian="jawabana" soal_detail_id="' + id + '" elemid="jawabana' + id + '" id="buttona' + id + '" onclick="showeditor(this)" style="display:' + display + '"></a>' +
            '<a class="btn far fa-image" bagian="jawabana" soal_detail_id="' + id + '" elemid="jawabana' + id + '" id="buttona' + id + '" onclick="showimageditor(this)" style="display:' + display + '"></a>' +
            '</div>' +
        '</div>' + dataganda;
    var elemjawabanbenar = '<div style="margin-bottom:5px;font-weight: 700;" id="jawabanbenar' + id + '">Jawaban Benar ' + jawabanbenar + '</div>';
    var elempembahasan = '<div style="margin-bottom: 5px;border: 1px solid #dcd8d8;padding: 4px;" ><div style="margin-bottom: 10px;" id="pembahasan' + id + '">' + pembahasan + '</div><div>' +
        '<a class="btn btn-primary" bagian="pembahasan" soal_detail_id="' + id + '" elemid="pembahasan' + id + '" id="btnedit_pembahasan' + id + '" onclick="showeditor2(this)" style="height: 23px;padding: 0px 6px;display:' + display + '">Edit Pembahasan</a></div></div> ';
    var classnumber = "";
    if (tipe_soal === "isian") {
        elemganda = "";
        elemjawabanbenar = "";
        classnumber = "number-isian";
    }
    var elem = $('<table class="tablesoal" id="table' + id + '">' +
        '<tr id="row' + id + '">' +
        '<td class="col1 noborder" rowspan="3"><div class="no number ' + classnumber + '" ><div soal_id="' + soal_id + '" soal_detail_id="' + id + '" elemid="no' + id + '" onclick="show_no_editor(this)" id="no' + id + '">' + no + '</div>' +
        '</div>' +
        '</td>' +

        '<td class="col3 noborder" colspan="1">' +
        elemimg +
        '    <div style="min-height: 43px;padding: 12px 1px 1px 1px;" ><div ' + editable + ' class="boxjawaban" bagian="textsoal" id="textsoal' + id + '"><span>' + textsoal + '</span></div>' +
        '<div style="text-align: right;">' +
        //'<a class="btn far fa-image" bagian="primaryimage" soal_detail_id="' + id + '" elemid="primaryimage' + id + '" id="btnimage' + id + '" onclick="imageclick(this)"></a>' +
        
        '<a class="btn far fa-image" bagian="textsoal" soal_detail_id="' + id + '" elemid="textsoal' + id + '" id="img' + id + '" onclick="showimageditor(this)"></a>' +
        '<a class="btn fas fa-square-root-alt " bagian="textsoal" soal_detail_id="' + id + '" elemid="textsoal' + id + '" id="btnedit' + id + '" onclick="showeditor(this)" style="display:' + display + '"></a>' +
        '</div>' +
        '   </div>' +
        elemjawabanbenar +
        elempembahasan +
        '</td>' +
        '</tr>' +
        ' <tr> ' +
        '    <td class="noborder"> ' +
        elemganda +
        '    </td> ' +
        ' </tr> ' +
        ' <tr> ' +
        '    <td class="noborder"> ' +
        '<div style="width: 100%;text-align: right;">' +
        '<div class="status status' + id + '"></div>' +
        '<a class="btn far fa-save btnsave" bagian="textsoal" soal_detail_id="' + id + '" elemid="textsoal' + id + '" id="btnsave' + id + '" onclick="simpan(this)" style="font-size:18px;display:' + display + '"></a>' +
        '<a class="btn far fa-trash-alt" id="btnhapus' + id + '" style="font-size:18px;color:red;" soal_detail_id="' + id + '" onclick="hapussoal(this)" ></a>' +
        '</div>' +
        '    </td> ' +
        ' </tr> ' +
        '        </table >');
    dataelement.push({ masterid: id, bagian: "textsoal",id: "textsoal" + id, html: textsoal,tipe:'soal' });
    dataelement.push({ masterid: id, bagian: "jawabana",id: "jawabana" + id, html: jawabanA, tipe: 'soal' });
    dataelement.push({ masterid: id, bagian: "jawabanb",id: "jawabanb" + id, html: jawabanB, tipe: 'soal' });
    dataelement.push({ masterid: id, bagian: "jawabanc",id: "jawabanc" + id, html: jawabanC, tipe: 'soal' });
    dataelement.push({ masterid: id, bagian: "jawaband",id: "jawaband" + id, html: jawabanD, tipe: 'soal' });
    dataelement.push({ masterid: id, bagian: "jawabane",id: "jawabane" + id, html: jawabanE, tipe: 'soal' });
    dataelement.push({ masterid: id, bagian: "jawabanf",id: "jawabanf" + id, html: jawabanF, tipe: 'soal' });
    dataelement.push({ masterid: id, bagian: "pembahasan", id: "pembahasan" + id, html: pembahasan });
    dataelement.push({ masterid: id, id: "properti" + id, is_link: is_link, link_soal_detail_id: link_soal_detail_id });
    element.append(elem);

    document.getElementById("textsoal" + id).addEventListener("input", function () {
        jawabanchange(this,id);
    }, false);
    var abj = ['a', 'b', 'c', 'd', 'e', 'f'];
    for (iz = 0; iz < 6; iz++) {
        var e = document.getElementById("jawaban" + abj[iz] + id);
        //console.log(e);
        if (e !== null) {
            e.addEventListener("input", function () {
                jawabanchange(this, id);
            }, false);
        }
    }
 
    //document.getElementById("textsoal" + id).addEventListener('paste', async (e) => {
    //    e.preventDefault();
    //    try {
    //        clipboardItems = await navigator.clipboard.read();
    //        for (const clipboardItem of clipboardItems) {
    //            for (const type of clipboardItem.types) {
    //                //const blob = await clipboardItem.getType(type);
    //                //console.log(URL.createObjectURL(blob));
    //                console.log(type);
    //                console.log(clipboardItem);
    //            }
    //        }
    //    } catch (err) {
    //        console.error(err.name, err.message);
    //    }
    //});

    return elem;

}
function elementsoal_komplek(element, soal_id, id, no, primaryimage, textsoal, jawabanA, jawabanB, jawabanC, jawabanD, jawabanE, jawabanF, jawabanbenar, width, height,
    tipe_soal, pembahasan, is_link, link_soal_detail_id, locked, jml_jwb) {
    //"~/Content/image/add_image.png"
    //var imgonerror = ' onerror="this.onerror=null;this.src='https://placeimg.com/200/300/animals';"';
    //var id = generateid();
    var display = 'inline-block';
    var editable = 'contenteditable="true"';
    if (locked === 1) {
        display = 'none';
        editable = "";
    }

    var active = 'active';
    var activeA = '';
    var activeB = '';
    var activeC = '';
    var activeD = '';
    var activeE = '';
    var activeF = '';
    if (jawabanbenar.indexOf("A") >= 0) {
        activeA = 'active';
    }
    if (jawabanbenar.indexOf("B") >= 0) {
        activeB = 'active';
    }
    if (jawabanbenar.indexOf("C") >= 0) {
        activeC = 'active';
    }
    if (jawabanbenar.indexOf("D") >= 0) {
        activeD = 'active';
    }
    if (jawabanbenar.indexOf("E") >= 0) {
        activeE = 'active';
    }
    if (jawabanbenar.indexOf("F") >= 0) {
        activeF = 'active';
    }

    if (primaryimage === '') {
        active = '';
    }
    textsoal = appendbagian(textsoal, "textsoal", id);
    jawabanA = appendbagian(jawabanA, "jawabana", id);
    jawabanB = appendbagian(jawabanB, "jawabanb", id);
    jawabanC = appendbagian(jawabanC, "jawabanc", id);
    jawabanD = appendbagian(jawabanD, "jawaband", id);
    jawabanE = appendbagian(jawabanE, "jawabane", id);
    jawabanF = appendbagian(jawabanF, "jawabanf", id);
    //console.log(textsoal);
    //'<a class="btn far fa-edit" soal_id="' + soal_id + '" soal_detail_id="' + id + '" elemid="no' + id + '" id="btneditno' + id + '" onclick="show_no_editor(this)"></a>' +
    var elemimg = '<div class="primaryimg ' + active + '" id="primaryimage' + id + '" ondblclick="imageclick(this)"> ' +
        '<img width="' + width + ' height="' + height + ' src="' + primaryimage + '"  elemid="primaryimage' + id + '" onerror="imgerror(this)"/>' +
        '<div>' +
        '<a bagian="primaryimage" soal_detail_id="' + id + '" elemid="primaryimage' + id + '" onclick="imageremove(this)">Remove</a>' +
        '</div>' +
        '</div>';
    dataganda = '';
    if (jml_jwb >= 2) {
        dataganda += '<div class="col-12 col-xs-12 col-sm-12 col-md-6 textsoal">' +
            '<div class="no"><div class="' + activeB + ' lingkaranpilihan lingkaranpilihan' + id + '" soal_detail_id="' + id + '" elemid="pilihanb' + id + '" id="pilihanb' + id + '" onclick="setjawaban_komplek(this)">B</div>.</div>' +
            '<div class="jawaban"  ' + editable + ' bagian="jawabanb" id="jawabanb' + id + '" >' + jawabanB + '</div>' +
            '<div class="tombol">' +
            '<a class="btn fas fa-square-root-alt" bagian="jawabanb" soal_detail_id="' + id + '" elemid="jawabanb' + id + '" id="buttona' + id + '" onclick="showeditor(this)" style="display:' + display + '"></a>' +
            '<a class="btn far fa-image" bagian="jawabanb" soal_detail_id="' + id + '" elemid="jawabanb' + id + '" id="buttona' + id + '" onclick="showimageditor(this)" style="display:' + display + '"></a>' +
            '</div>' +
            '</div>';
    }
    if (jml_jwb >= 3) {
        dataganda += '<div class="col-12 col-xs-12 col-sm-12 col-md-6 textsoal">' +
            '<div class="no"><div class="' + activeC + ' lingkaranpilihan lingkaranpilihan' + id + '" soal_detail_id="' + id + '" elemid="pilihanc' + id + '" id="pilihanc' + id + '" onclick="setjawaban_komplek(this)">C</div>.</div>' +
            '<div class="jawaban"  ' + editable + ' bagian="jawabanc" id="jawabanc' + id + '" >' + jawabanC + '</div>' +
            '<div class="tombol">' +
            '<a class="btn fas fa-square-root-alt" bagian="jawabanc" soal_detail_id="' + id + '" elemid="jawabanc' + id + '" id="buttona' + id + '" onclick="showeditor(this)" style="display:' + display + '"></a>' +
            '<a class="btn far fa-image" bagian="jawabanc" soal_detail_id="' + id + '" elemid="jawabanc' + id + '" id="buttona' + id + '" onclick="showimageditor(this)" style="display:' + display + '"></a>' +
            '</div>' +
            '</div>';
    }
    if (jml_jwb >= 4) {
        dataganda += '<div class="col-12 col-xs-12 col-sm-12 col-md-6 textsoal">' +
            '<div class="no"><div class="' + activeD + ' lingkaranpilihan lingkaranpilihan' + id + '" soal_detail_id="' + id + '" elemid="pilihand' + id + '" id="pilihand' + id + '" onclick="setjawaban_komplek(this)">D</div>.</div>' +
            '<div class="jawaban"  ' + editable + ' bagian="jawaband" id="jawaband' + id + '" >' + jawabanD + '</div>' +
            '<div class="tombol">' +
            '<a class="btn fas fa-square-root-alt" bagian="jawaband" soal_detail_id="' + id + '" elemid="jawaband' + id + '" id="buttona' + id + '" onclick="showeditor(this)" style="display:' + display + '"></a>' +
            '<a class="btn far fa-image" bagian="jawaband" soal_detail_id="' + id + '" elemid="jawaband' + id + '" id="buttona' + id + '" onclick="showimageditor(this)" style="display:' + display + '"></a>' +
            '</div>' +
            '</div>';
    }
    if (jml_jwb >= 5) {
        dataganda += '<div class="col-12 col-xs-12 col-sm-12 col-md-6 textsoal">' +
            '<div class="no"><div class="' + activeE + ' lingkaranpilihan lingkaranpilihan' + id + '" soal_detail_id="' + id + '" elemid="pilihane' + id + '" id="pilihane' + id + '" onclick="setjawaban_komplek(this)">E</div>.</div>' +
            '<div class="jawaban"  ' + editable + ' bagian="jawabane" id="jawabane' + id + '" >' + jawabanE + '</div>' +
            '<div class="tombol">' +
            '<a class="btn fas fa-square-root-alt" bagian="jawabane" soal_detail_id="' + id + '" elemid="jawabane' + id + '" id="buttona' + id + '" onclick="showeditor(this)" style="display:' + display + '"></a>' +
            '<a class="btn far fa-image" bagian="jawabane" soal_detail_id="' + id + '" elemid="jawabane' + id + '" id="buttona' + id + '" onclick="showimageditor(this)" style="display:' + display + '"></a>' +
            '</div>' +
            '</div>';
    }
    if (jml_jwb >= 6) {
        dataganda += '<div class="col-12 col-xs-12 col-sm-12 col-md-6 textsoal">' +
            '<div class="no"><div class="' + activeF + ' lingkaranpilihan lingkaranpilihan' + id + '" soal_detail_id="' + id + '" elemid="pilihanf' + id + '" id="pilihanf' + id + '" onclick="setjawaban_komplek(this)">F</div>.</div>' +
            '<div class="jawaban"  ' + editable + ' bagian="jawabanf" id="jawabanf' + id + '" >' + jawabanF + '</div>' +
            '<div class="tombol">' +
            '<a class="btn fas fa-square-root-alt" bagian="jawabanf" soal_detail_id="' + id + '" elemid="jawabanf' + id + '" id="buttona' + id + '" onclick="showeditor(this)" style="display:' + display + '"></a>' +
            '<a class="btn far fa-image" bagian="jawabanf" soal_detail_id="' + id + '" elemid="jawabanf' + id + '" id="buttona' + id + '" onclick="showimageditor(this)" style="display:' + display + '"></a>' +
            '</div>' +
            '</div>';
    }
    var elemganda = '<div class="row">' +
        '<div class="col-12 col-xs-12 col-sm-12 col-md-6 textsoal">' +
        '<div class="no"><div class="' + activeA + ' lingkaranpilihan lingkaranpilihan' + id + ' " soal_detail_id="' + id + '" elemid="pilihana' + id + '" id="pilihana' + id + '" onclick="setjawaban_komplek(this)">A</div>.</div>' +
        '<div class="jawaban" ' + editable + ' bagian="jawabana" id="jawabana' + id + '" >' + jawabanA + '</div>' +
        '<div class="tombol">' +
        '<a class="btn fas fa-square-root-alt" bagian="jawabana" soal_detail_id="' + id + '" elemid="jawabana' + id + '" id="buttona' + id + '" onclick="showeditor(this)" style="display:' + display + '"></a>' +
        '<a class="btn far fa-image" bagian="jawabana" soal_detail_id="' + id + '" elemid="jawabana' + id + '" id="buttona' + id + '" onclick="showimageditor(this)" style="display:' + display + '"></a>' +
        '</div>' +
        '</div>' + dataganda;
    var elemjawabanbenar = '<div style="margin-bottom:5px;font-weight: 700;" id="jawabanbenar' + id + '">Jawaban Benar ' + jawabanbenar + '</div>';
    var elempembahasan = '<div style="margin-bottom: 5px;border: 1px solid #dcd8d8;padding: 4px;" ><div style="margin-bottom: 10px;" id="pembahasan' + id + '">' + pembahasan + '</div><div>' +
        '<a class="btn btn-primary" bagian="pembahasan" soal_detail_id="' + id + '" elemid="pembahasan' + id + '" id="btnedit_pembahasan' + id + '" onclick="showeditor2(this)" style="height: 23px;padding: 0px 6px;display:' + display + '">Edit Pembahasan</a></div></div> ';
    var classnumber = "";
    if (tipe_soal === "isian") {
        elemganda = "";
        elemjawabanbenar = "";
        classnumber = "number-isian";
    }
    var elem = $('<table class="tablesoal" id="table' + id + '">' +
        '<tr id="row' + id + '">' +
        '<td class="col1 noborder" rowspan="3"><div class="no number ' + classnumber + '" ><div soal_id="' + soal_id + '" soal_detail_id="' + id + '" elemid="no' + id + '" onclick="show_no_editor(this)" id="no' + id + '">' + no + '</div>' +
        '</div>' +
        '</td>' +

        '<td class="col3 noborder" colspan="1">' +
        elemimg +
        '    <div style="min-height: 43px;padding: 12px 1px 1px 1px;" ><div ' + editable + ' class="boxjawaban" bagian="textsoal" id="textsoal' + id + '"><span>' + textsoal + '</span></div>' +
        '<div style="text-align: right;">' +
        //'<a class="btn far fa-image" bagian="primaryimage" soal_detail_id="' + id + '" elemid="primaryimage' + id + '" id="btnimage' + id + '" onclick="imageclick(this)"></a>' +

        '<a class="btn far fa-image" bagian="textsoal" soal_detail_id="' + id + '" elemid="textsoal' + id + '" id="img' + id + '" onclick="showimageditor(this)"></a>' +
        '<a class="btn fas fa-square-root-alt " bagian="textsoal" soal_detail_id="' + id + '" elemid="textsoal' + id + '" id="btnedit' + id + '" onclick="showeditor(this)" style="display:' + display + '"></a>' +
        '</div>' +
        '   </div>' +
        elemjawabanbenar +
        elempembahasan +
        '</td>' +
        '</tr>' +
        ' <tr> ' +
        '    <td class="noborder"> ' +
        elemganda +
        '    </td> ' +
        ' </tr> ' +
        ' <tr> ' +
        '    <td class="noborder"> ' +
        '<div style="width: 100%;text-align: right;">' +
        '<div class="status status' + id + '"></div>' +
        '<a class="btn far fa-save btnsave" bagian="textsoal" soal_detail_id="' + id + '" elemid="textsoal' + id + '" id="btnsave' + id + '" onclick="simpan(this)" style="font-size:18px;display:' + display + '"></a>' +
        '<a class="btn far fa-trash-alt" id="btnhapus' + id + '" style="font-size:18px;color:red;" soal_detail_id="' + id + '" onclick="hapussoal(this)" ></a>' +
        '</div>' +
        '    </td> ' +
        ' </tr> ' +
        '        </table >');
    dataelement.push({ masterid: id, bagian: "textsoal", id: "textsoal" + id, html: textsoal, tipe: 'soal' });
    dataelement.push({ masterid: id, bagian: "jawabana", id: "jawabana" + id, html: jawabanA, tipe: 'soal' });
    dataelement.push({ masterid: id, bagian: "jawabanb", id: "jawabanb" + id, html: jawabanB, tipe: 'soal' });
    dataelement.push({ masterid: id, bagian: "jawabanc", id: "jawabanc" + id, html: jawabanC, tipe: 'soal' });
    dataelement.push({ masterid: id, bagian: "jawaband", id: "jawaband" + id, html: jawabanD, tipe: 'soal' });
    dataelement.push({ masterid: id, bagian: "jawabane", id: "jawabane" + id, html: jawabanE, tipe: 'soal' });
    dataelement.push({ masterid: id, bagian: "jawabanf", id: "jawabanf" + id, html: jawabanF, tipe: 'soal' });
    dataelement.push({ masterid: id, bagian: "pembahasan", id: "pembahasan" + id, html: pembahasan });
    dataelement.push({ masterid: id, id: "properti" + id, is_link: is_link, link_soal_detail_id: link_soal_detail_id });
    element.append(elem);

    document.getElementById("textsoal" + id).addEventListener("input", function () {
        jawabanchange(this, id);
    }, false);
    var abj = ['a', 'b', 'c', 'd', 'e', 'f'];
    for (iz = 0; iz < 6; iz++) {
        var e = document.getElementById("jawaban" + abj[iz] + id);
        //console.log(e);
        if (e !== null) {
            e.addEventListener("input", function () {
                jawabanchange(this, id);
            }, false);
        }
    }

    //document.getElementById("textsoal" + id).addEventListener('paste', async (e) => {
    //    e.preventDefault();
    //    try {
    //        clipboardItems = await navigator.clipboard.read();
    //        for (const clipboardItem of clipboardItems) {
    //            for (const type of clipboardItem.types) {
    //                //const blob = await clipboardItem.getType(type);
    //                //console.log(URL.createObjectURL(blob));
    //                console.log(type);
    //                console.log(clipboardItem);
    //            }
    //        }
    //    } catch (err) {
    //        console.error(err.name, err.message);
    //    }
    //});

    return elem;

}
function elementsoal_pasangkan(element, soal_id, id, no, primaryimage, textsoal, jawabanA, jawabanB, jawabanC, jawabanD, jawabanE, jawabanF, pilihan1, pilihan2, pilihan3, pilihan4, pilihan5, pilihan6, jawabanbenar, width, height,
    tipe_soal, pembahasan, is_link, link_soal_detail_id, locked, jml_jwb) {
    //"~/Content/image/add_image.png"
    //var imgonerror = ' onerror="this.onerror=null;this.src='https://placeimg.com/200/300/animals';"';
    //var id = generateid();
    var display = 'inline-block';
    var editable = 'contenteditable="true"';
    if (locked === 1) {
        display = 'none';
        editable = "";
    }
    jml_jwb = 6;
    var active = 'active';
    var activeA = '';
    var activeB = '';
    var activeC = '';
    var activeD = '';
    var activeE = '';
    var activeF = '';
    

    if (primaryimage === '') {
        active = '';
    }
    textsoal = appendbagian(textsoal, "textsoal", id);
    jawabanA = appendbagian(jawabanA, "jawabana", id);
    jawabanB = appendbagian(jawabanB, "jawabanb", id);
    jawabanC = appendbagian(jawabanC, "jawabanc", id);
    jawabanD = appendbagian(jawabanD, "jawaband", id);
    jawabanE = appendbagian(jawabanE, "jawabane", id);
    jawabanF = appendbagian(jawabanF, "jawabanf", id);
    pilihan1 = appendbagian(pilihan1, "pilihan1", id);
    pilihan2 = appendbagian(pilihan2, "pilihan2", id);
    pilihan3 = appendbagian(pilihan3, "pilihan3", id);
    pilihan4 = appendbagian(pilihan4, "pilihan4", id);
    pilihan5 = appendbagian(pilihan5, "pilihan5", id);
    pilihan6 = appendbagian(pilihan6, "pilihan6", id);

    //console.log(textsoal);
    //'<a class="btn far fa-edit" soal_id="' + soal_id + '" soal_detail_id="' + id + '" elemid="no' + id + '" id="btneditno' + id + '" onclick="show_no_editor(this)"></a>' +
    var elemimg = '<div class="primaryimg ' + active + '" id="primaryimage' + id + '" ondblclick="imageclick(this)"> ' +
        '<img width="' + width + ' height="' + height + ' src="' + primaryimage + '"  elemid="primaryimage' + id + '" onerror="imgerror(this)"/>' +
        '<div>' +
        '<a bagian="primaryimage" soal_detail_id="' + id + '" elemid="primaryimage' + id + '" onclick="imageremove(this)">Remove</a>' +
        '</div>' +
        '</div>';
    dataganda = '';
    if (jml_jwb >= 2) {
        dataganda += '<div class="col-12 col-xs-12 col-sm-12 col-md-12 textsoal">' +
            '<div class="no"><div class="' + activeB + ' lingkaranpilihan pernyataan lingkaranjawaban' + id + '" soal_detail_id="' + id + '" elemid="pilihanb' + id + '" id="pilihanb' + id + '" onclick="setjawaban_pasangan(this)">B</div>.</div>' +
            '<div class="jawaban"  ' + editable + ' bagian="jawabanb" id="jawabanb' + id + '" >' + jawabanB + '</div>' +
            '<div class="tombol">' +
            '<a class="btn fas fa-square-root-alt" bagian="jawabanb" soal_detail_id="' + id + '" elemid="jawabanb' + id + '" id="buttona' + id + '" onclick="showeditor(this)" style="display:' + display + '"></a>' +
            '<a class="btn far fa-image" bagian="jawabanb" soal_detail_id="' + id + '" elemid="jawabanb' + id + '" id="buttona' + id + '" onclick="showimageditor(this)" style="display:' + display + '"></a>' +
            '</div>' +
            '</div>';
    }
    if (jml_jwb >= 3) {
        dataganda += '<div class="col-12 col-xs-12 col-sm-12 col-md-12 textsoal">' +
            '<div class="no"><div class="' + activeC + ' lingkaranpilihan pernyataan lingkaranjawaban' + id + '" soal_detail_id="' + id + '" elemid="pilihanc' + id + '" id="pilihanc' + id + '" onclick="setjawaban_pasangan(this)">C</div>.</div>' +
            '<div class="jawaban" ' + editable + ' bagian="jawabanc" id="jawabanc' + id + '" >' + jawabanC + '</div>' +
            '<div class="tombol">' +
            '<a class="btn fas fa-square-root-alt" bagian="jawabanc" soal_detail_id="' + id + '" elemid="jawabanc' + id + '" id="buttona' + id + '" onclick="showeditor(this)" style="display:' + display + '"></a>' +
            '<a class="btn far fa-image" bagian="jawabanc" soal_detail_id="' + id + '" elemid="jawabanc' + id + '" id="buttona' + id + '" onclick="showimageditor(this)" style="display:' + display + '"></a>' +
            '</div>' +
            '</div>';
    }
    if (jml_jwb >= 4) {
        dataganda += '<div class="col-12 col-xs-12 col-sm-12 col-md-12 textsoal">' +
            '<div class="no"><div class="' + activeD + ' lingkaranpilihan pernyataan lingkaranjawaban' + id + '" soal_detail_id="' + id + '" elemid="pilihand' + id + '" id="pilihand' + id + '" onclick="setjawaban_pasangan(this)">D</div>.</div>' +
            '<div class="jawaban"  ' + editable + ' bagian="jawaband" id="jawaband' + id + '" >' + jawabanD + '</div>' +
            '<div class="tombol">' +
            '<a class="btn fas fa-square-root-alt" bagian="jawaband" soal_detail_id="' + id + '" elemid="jawaband' + id + '" id="buttona' + id + '" onclick="showeditor(this)" style="display:' + display + '"></a>' +
            '<a class="btn far fa-image" bagian="jawaband" soal_detail_id="' + id + '" elemid="jawaband' + id + '" id="buttona' + id + '" onclick="showimageditor(this)" style="display:' + display + '"></a>' +
            '</div>' +
            '</div>';
    }
    if (jml_jwb >= 5) {
        dataganda += '<div class="col-12 col-xs-12 col-sm-12 col-md-12 textsoal">' +
            '<div class="no"><div class="' + activeE + ' lingkaranpilihan pernyataan lingkaranjawaban' + id + '" soal_detail_id="' + id + '" elemid="pilihane' + id + '" id="pilihane' + id + '" onclick="setjawaban_pasangan(this)">E</div>.</div>' +
            '<div class="jawaban"  ' + editable + ' bagian="jawabane" id="jawabane' + id + '" >' + jawabanE + '</div>' +
            '<div class="tombol">' +
            '<a class="btn fas fa-square-root-alt" bagian="jawabane" soal_detail_id="' + id + '" elemid="jawabane' + id + '" id="buttona' + id + '" onclick="showeditor(this)" style="display:' + display + '"></a>' +
            '<a class="btn far fa-image" bagian="jawabane" soal_detail_id="' + id + '" elemid="jawabane' + id + '" id="buttona' + id + '" onclick="showimageditor(this)" style="display:' + display + '"></a>' +
            '</div>' +
            '</div>';
    }
    if (jml_jwb >= 6) {
        dataganda += '<div class="col-12 col-xs-12 col-sm-12 col-md-12 textsoal">' +
            '<div class="no"><div class="' + activeF + ' lingkaranpilihan pernyataan lingkaranjawaban' + id + '" soal_detail_id="' + id + '" elemid="pilihanf' + id + '" id="pilihanf' + id + '" onclick="setjawaban_pasangan(this)">F</div>.</div>' +
            '<div class="jawaban"  ' + editable + ' bagian="jawabanf" id="jawabanf' + id + '" >' + jawabanF + '</div>' +
            '<div class="tombol">' +
            '<a class="btn fas fa-square-root-alt" bagian="jawabanf" soal_detail_id="' + id + '" elemid="jawabanf' + id + '" id="buttona' + id + '" onclick="showeditor(this)" style="display:' + display + '"></a>' +
            '<a class="btn far fa-image" bagian="jawabanf" soal_detail_id="' + id + '" elemid="jawabanf' + id + '" id="buttona' + id + '" onclick="showimageditor(this)" style="display:' + display + '"></a>' +
            '</div>' +
            '</div>';
    }
    var elemganda = '<div class="row">' +
        '<div class="col-12 col-xs-12 col-sm-12 col-md-12 textsoal">' +
        '<div class="no"><div class="' + activeA + ' lingkaranpilihan pernyataan lingkaranjawaban' + id + ' " soal_detail_id="' + id + '" elemid="pilihana' + id + '" id="pilihana' + id + '" onclick="setjawaban_pasangan(this)">A</div>.</div>' +
        '<div class="jawaban" ' + editable + ' bagian="jawabana" id="jawabana' + id + '" >' + jawabanA + '</div>' +
        '<div class="tombol">' +
        '<a class="btn fas fa-square-root-alt" bagian="jawabana" soal_detail_id="' + id + '" elemid="jawabana' + id + '" id="buttona' + id + '" onclick="showeditor(this)" style="display:' + display + '"></a>' +
        '<a class="btn far fa-image" bagian="jawabana" soal_detail_id="' + id + '" elemid="jawabana' + id + '" id="buttona' + id + '" onclick="showimageditor(this)" style="display:' + display + '"></a>' +
        '</div>' +
        '</div>' + dataganda;
    var datapilihan='';
    if (jml_jwb >= 2) {
        datapilihan += '<div class="col-12 col-xs-12 col-sm-12 col-md-12 textsoal">' +
            '<div class="no"><div class="' + activeB + ' lingkaranpilihan pasangan lingkaranpilihan' + id + '" soal_detail_id="' + id + '" elemid="pilihanb' + id + '" id="pilihan2' + id + '" onclick="setjawaban_pasangan(this)">2</div>.</div>' +
            '<div class="jawaban"  ' + editable + ' bagian="jawaban2" id="jawaban2' + id + '" >' + pilihan2 + '</div>' +
            '<div class="tombol">' +
            '<a class="btn fas fa-square-root-alt" bagian="jawaban2" soal_detail_id="' + id + '" elemid="jawaban2' + id + '" id="buttona' + id + '" onclick="showeditor(this)" style="display:' + display + '"></a>' +
            '<a class="btn far fa-image" bagian="jawaban2" soal_detail_id="' + id + '" elemid="jawaban2' + id + '" id="buttona' + id + '" onclick="showimageditor(this)" style="display:' + display + '"></a>' +
            '</div>' +
            '</div>';
    }
    if (jml_jwb >= 3) {
        datapilihan += '<div class="col-12 col-xs-12 col-sm-12 col-md-12 textsoal">' +
            '<div class="no"><div class="' + activeC + ' lingkaranpilihan pasangan lingkaranpilihan' + id + '" soal_detail_id="' + id + '" elemid="pilihanc' + id + '" id="pilihan3' + id + '" onclick="setjawaban_pasangan(this)">3</div>.</div>' +
            '<div class="jawaban"  ' + editable + ' bagian="jawaban3" id="jawaban3' + id + '" >' + pilihan3 + '</div>' +
            '<div class="tombol">' +
            '<a class="btn fas fa-square-root-alt" bagian="jawaban3" soal_detail_id="' + id + '" elemid="jawaban3' + id + '" id="buttona' + id + '" onclick="showeditor(this)" style="display:' + display + '"></a>' +
            '<a class="btn far fa-image" bagian="jawaban3" soal_detail_id="' + id + '" elemid="jawaban3' + id + '" id="buttona' + id + '" onclick="showimageditor(this)" style="display:' + display + '"></a>' +
            '</div>' +
            '</div>';
    }
    if (jml_jwb >= 4) {
        datapilihan += '<div class="col-12 col-xs-12 col-sm-12 col-md-12 textsoal">' +
            '<div class="no"><div class="' + activeD + ' lingkaranpilihan pasangan lingkaranpilihan' + id + '" soal_detail_id="' + id + '" elemid="pilihand' + id + '" id="pilihan4' + id + '" onclick="setjawaban_pasangan(this)">4</div>.</div>' +
            '<div class="jawaban"  ' + editable + ' bagian="jawaban4" id="jawaban4' + id + '" >' + pilihan4 + '</div>' +
            '<div class="tombol">' +
            '<a class="btn fas fa-square-root-alt" bagian="jawaban4" soal_detail_id="' + id + '" elemid="jawaban4' + id + '" id="buttona' + id + '" onclick="showeditor(this)" style="display:' + display + '"></a>' +
            '<a class="btn far fa-image" bagian="jawaban4" soal_detail_id="' + id + '" elemid="jawaban4' + id + '" id="buttona' + id + '" onclick="showimageditor(this)" style="display:' + display + '"></a>' +
            '</div>' +
            '</div>';
    }
    if (jml_jwb >= 5) {
        datapilihan += '<div class="col-12 col-xs-12 col-sm-12 col-md-12 textsoal">' +
            '<div class="no"><div class="' + activeE + ' lingkaranpilihan pasangan lingkaranpilihan' + id + '" soal_detail_id="' + id + '" elemid="pilihane' + id + '" id="pilihan5' + id + '" onclick="setjawaban_pasangan(this)">5</div>.</div>' +
            '<div class="jawaban"  ' + editable + ' bagian="jawaban5" id="jawaban5' + id + '" >' + pilihan5 + '</div>' +
            '<div class="tombol">' +
            '<a class="btn fas fa-square-root-alt" bagian="jawaban5" soal_detail_id="' + id + '" elemid="jawaban5' + id + '" id="buttona' + id + '" onclick="showeditor(this)" style="display:' + display + '"></a>' +
            '<a class="btn far fa-image" bagian="jawaban5" soal_detail_id="' + id + '" elemid="jawaban5' + id + '" id="buttona' + id + '" onclick="showimageditor(this)" style="display:' + display + '"></a>' +
            '</div>' +
            '</div>';
    }
    if (jml_jwb >= 6) {
        datapilihan += '<div class="col-12 col-xs-12 col-sm-12 col-md-12 textsoal">' +
            '<div class="no"><div class="' + activeF + ' lingkaranpilihan pasangan lingkaranpilihan' + id + '" soal_detail_id="' + id + '" elemid="pilihanf' + id + '" id="pilihan6' + id + '" onclick="setjawaban_pasangan(this)">6</div>.</div>' +
            '<div class="jawaban"  ' + editable + ' bagian="jawaban6" id="jawaban6' + id + '" >' + pilihan6 + '</div>' +
            '<div class="tombol">' +
            '<a class="btn fas fa-square-root-alt" bagian="jawaban6" soal_detail_id="' + id + '" elemid="jawaban6' + id + '" id="buttona' + id + '" onclick="showeditor(this)" style="display:' + display + '"></a>' +
            '<a class="btn far fa-image" bagian="jawaban6" soal_detail_id="' + id + '" elemid="jawaban6' + id + '" id="buttona' + id + '" onclick="showimageditor(this)" style="display:' + display + '"></a>' +
            '</div>' +
            '</div>';
    }
    var elemPilihan = '<div class="row">' +
        '<div class="col-12 col-xs-12 col-sm-12 col-md-12 textsoal">' +
        '<div class="no"><div class="' + activeA + ' lingkaranpilihan pasangan lingkaranpilihan' + id + ' " soal_detail_id="' + id + '" elemid="pilihana' + id + '" id="pilihan1' + id + '" onclick="setjawaban_pasangan(this)">1</div>.</div>' +
        '<div class="jawaban" ' + editable + ' bagian="jawaban1" id="jawaban1' + id + '" >' + pilihan1 + '</div>' +
        '<div class="tombol">' +
        '<a class="btn fas fa-square-root-alt" bagian="jawaban1" soal_detail_id="' + id + '" elemid="jawaban1' + id + '" id="buttona' + id + '" onclick="showeditor(this)" style="display:' + display + '"></a>' +
        '<a class="btn far fa-image" bagian="jawaban1" soal_detail_id="' + id + '" elemid="jawaban1' + id + '" id="buttona' + id + '" onclick="showimageditor(this)" style="display:' + display + '"></a>' +
        '</div>' +
        '</div>' + datapilihan;
    


    var elemjawabanbenar = '<div style="margin-bottom:5px;font-weight: 700;" id="jawabanbenar' + id + '">Jawaban Benar ' + jawabanbenar + '</div>';
    var elempembahasan = '<div style="margin-bottom: 5px;border: 1px solid #dcd8d8;padding: 4px;" ><div style="margin-bottom: 10px;" id="pembahasan' + id + '">' + pembahasan + '</div><div>' +
        '<a class="btn btn-primary" bagian="pembahasan" soal_detail_id="' + id + '" elemid="pembahasan' + id + '" id="btnedit_pembahasan' + id + '" onclick="showeditor2(this)" style="height: 23px;padding: 0px 6px;display:' + display + '">Edit Pembahasan</a></div></div> ';
    var classnumber = "";
    if (tipe_soal === "isian") {
        elemganda = "";
        elemjawabanbenar = "";
        classnumber = "number-isian";
    }
    var elem = $('<table class="tablesoal" id="table' + id + '">' +
        '<tr id="row' + id + '">' +
        '<td class="col1 noborder" rowspan="3"><div class="no number ' + classnumber + '" ><div soal_id="' + soal_id + '" soal_detail_id="' + id + '" elemid="no' + id + '" onclick="show_no_editor(this)" id="no' + id + '">' + no + '</div>' +
        '</div>' +
        '</td>' +

        '<td class="col3 noborder" colspan="1">' +
        elemimg +
        '    <div style="min-height: 43px;padding: 12px 1px 1px 1px;" ><div ' + editable + ' class="boxjawaban" bagian="textsoal" id="textsoal' + id + '"><span>' + textsoal + '</span></div>' +
        '<div style="text-align: right;">' +
        //'<a class="btn far fa-image" bagian="primaryimage" soal_detail_id="' + id + '" elemid="primaryimage' + id + '" id="btnimage' + id + '" onclick="imageclick(this)"></a>' +

        '<a class="btn far fa-image" bagian="textsoal" soal_detail_id="' + id + '" elemid="textsoal' + id + '" id="img' + id + '" onclick="showimageditor(this)"></a>' +
        '<a class="btn fas fa-square-root-alt " bagian="textsoal" soal_detail_id="' + id + '" elemid="textsoal' + id + '" id="btnedit' + id + '" onclick="showeditor(this)" style="display:' + display + '"></a>' +
        '</div>' +
        '   </div>' +
        elemjawabanbenar +
        elempembahasan +
        '</td>' +
        '</tr>' +
        ' <tr> ' +
        '    <td class="noborder"> <div class="row"><div class="col-12 col-xs-12 col-sm-12 col-md-6"><label>Pernyataan</label>' + elemganda + '</div></div><div class="col-12 col-xs-12 col-sm-12 col-md-6"><label>Pasangan</label>' + elemPilihan +'</div></div></td> ' +
        ' </tr> ' +
        ' <tr> ' +
        '    <td class="noborder"> ' +
        '<div style="width: 100%;text-align: right;">' +
        '<div class="status status' + id + '"></div>' +
        '<a class="btn far fa-save btnsave" bagian="textsoal" soal_detail_id="' + id + '" elemid="textsoal' + id + '" id="btnsave' + id + '" onclick="simpan(this)" style="font-size:18px;display:' + display + '"></a>' +
        '<a class="btn far fa-trash-alt" id="btnhapus' + id + '" style="font-size:18px;color:red;" soal_detail_id="' + id + '" onclick="hapussoal(this)" ></a>' +
        '</div>' +
        '    </td> ' +
        ' </tr> ' +
        '        </table >');
    dataelement.push({ masterid: id, bagian: "textsoal", id: "textsoal" + id, html: textsoal, tipe: 'soal' });
    dataelement.push({ masterid: id, bagian: "jawabana", id: "jawabana" + id, html: jawabanA, tipe: 'soal' });
    dataelement.push({ masterid: id, bagian: "jawabanb", id: "jawabanb" + id, html: jawabanB, tipe: 'soal' });
    dataelement.push({ masterid: id, bagian: "jawabanc", id: "jawabanc" + id, html: jawabanC, tipe: 'soal' });
    dataelement.push({ masterid: id, bagian: "jawaband", id: "jawaband" + id, html: jawabanD, tipe: 'soal' });
    dataelement.push({ masterid: id, bagian: "jawabane", id: "jawabane" + id, html: jawabanE, tipe: 'soal' });
    dataelement.push({ masterid: id, bagian: "jawabanf", id: "jawabanf" + id, html: jawabanF, tipe: 'soal' });
    dataelement.push({ masterid: id, bagian: "pembahasan", id: "pembahasan" + id, html: pembahasan });
    dataelement.push({ masterid: id, id: "properti" + id, is_link: is_link, link_soal_detail_id: link_soal_detail_id });
    element.append(elem);

    document.getElementById("textsoal" + id).addEventListener("input", function () {
        jawabanchange(this, id);
    }, false);
    var abj = ['a', 'b', 'c', 'd', 'e', 'f'];
    for (iz = 0; iz < 6; iz++) {
        var e = document.getElementById("jawaban" + abj[iz] + id);
        //console.log(e);
        if (e !== null) {
            e.addEventListener("input", function () {
                jawabanchange(this, id);
            }, false);
        }
    }

    const warna = ["#00c813", "#ffa800", "#03b7b2", "#0027ff", "#9500ff", "#ff0000"];
    if (jawabanbenar) {
        $(jawabanbenar.split(',')).each(function (idx, txt) {
            var jwbArr = txt.split('>');
            const random = Math.floor(Math.random() * warna.length);

            if (jwbArr.length == 2) {
                $("#pilihan" + jwbArr[0].toLowerCase() + id).css({ 'background-color': warna[(jwbArr[1] - 1)], 'color': 'white' });
                $("#pilihan" + jwbArr[1].toLowerCase() + id).css({ 'background-color': warna[(jwbArr[1] - 1)], 'color': 'white' });
                $("#pilihan" + jwbArr[0].toLowerCase() + id).attr("jawaban", txt);
            }
        });
    }
    return elem;

}
function appendbagian(textsoal, bagian,id) {
    var elem = document.createElement("div");
    elem.innerHTML = textsoal;
    var elemmath = elem.querySelectorAll(" .mathfieldbox");
    for (var i = 0; i < elemmath.length; i++) {
        //
        elemmath[i].setAttribute("bagian", bagian);
        elemmath[i].setAttribute("soal_detail_id", id);
        elemmath[i].setAttribute("id", bagian + id + i);
    }
    return elem.innerHTML;
}
function ommltext() {
    var t=`!--[if gte msEquation 12]><m:oMathPara><m:oMath><m:f><m:fPr><span
    style='font-family:"Cambria Math",serif;mso-ascii-font-family:"Cambria Math";
    mso-hansi-font-family:"Cambria Math";font-style:italic;mso-bidi-font-style:
    normal'><m:ctrlPr></m:ctrlPr></span></m:fPr><m:num><i style='mso-bidi-font-style:
    normal'><span style='font-size:11.0pt;line-height:107%;font-family:"Cambria Math",serif;
    mso-fareast-font-family:Calibri;mso-fareast-theme-font:minor-latin;
    mso-bidi-font-family:"Times New Roman";mso-bidi-theme-font:minor-bidi;
    mso-ansi-language:EN-US;mso-fareast-language:EN-US;mso-bidi-language:AR-SA'><m:r>2</m:r></span></i></m:num><m:den><i
    style='mso-bidi-font-style:normal'><span style='font-size:11.0pt;
    line-height:107%;font-family:"Cambria Math",serif;mso-fareast-font-family:
    Calibri;mso-fareast-theme-font:minor-latin;mso-bidi-font-family:"Times New Roman";
    mso-bidi-theme-font:minor-bidi;mso-ansi-language:EN-US;mso-fareast-language:
    EN-US;mso-bidi-language:AR-SA'><m:r>2</m:r></span></i></m:den></m:f><i
  style='mso-bidi-font-style:normal'><span style='font-size:11.0pt;line-height:
  107%;font-family:"Cambria Math",serif;mso-fareast-font-family:Calibri;
  mso-fareast-theme-font:minor-latin;mso-bidi-font-family:"Times New Roman";
  mso-bidi-theme-font:minor-bidi;mso-ansi-language:EN-US;mso-fareast-language:
  EN-US;mso-bidi-language:AR-SA'><m:r><span style='mso-spacerun:yes'>  </span></m:r></span></i><m:nary><m:naryPr><m:limLoc
     m:val="undOvr"/><m:subHide m:val="on"/><m:supHide m:val="on"/><span
    style='font-family:"Cambria Math",serif;mso-ascii-font-family:"Cambria Math";
    mso-hansi-font-family:"Cambria Math";font-style:italic;mso-bidi-font-style:
    normal'><m:ctrlPr></m:ctrlPr></span></m:naryPr><m:sub></m:sub><m:sup></m:sup><m:e><i
    style='mso-bidi-font-style:normal'><span style='font-size:11.0pt;
    line-height:107%;font-family:"Cambria Math",serif;mso-fareast-font-family:
    Calibri;mso-fareast-theme-font:minor-latin;mso-bidi-font-family:"Times New Roman";
    mso-bidi-theme-font:minor-bidi;mso-ansi-language:EN-US;mso-fareast-language:
    EN-US;mso-bidi-language:AR-SA'><m:r>2</m:r></span></i></m:e></m:nary></m:oMath></m:oMathPara><![endif]--><!--[if !msEquation]--><span style="font-size:11.0pt;line-height:107%;font-family:&quot;Calibri&quot;,sans-serif;
mso-ascii-theme-font:minor-latin;mso-fareast-font-family:Calibri;mso-fareast-theme-font:
minor-latin;mso-hansi-theme-font:minor-latin;mso-bidi-font-family:&quot;Times New Roman&quot;;
mso-bidi-theme-font:minor-bidi;mso-ansi-language:EN-US;mso-fareast-language:
EN-US;mso-bidi-language:AR-SA"><!--[if gte vml 1]><v:shapetype id="_x0000_t75"
 coordsize="21600,21600" o:spt="75" o:preferrelative="t" path="m@4@5l@4@11@9@11@9@5xe"
 filled="f" stroked="f">
 <v:stroke joinstyle="miter"/>
 <v:formulas>
  <v:f eqn="if lineDrawn pixelLineWidth 0"/>
  <v:f eqn="sum @0 1 0"/>
  <v:f eqn="sum 0 0 @1"/>
  <v:f eqn="prod @2 1 2"/>
  <v:f eqn="prod @3 21600 pixelWidth"/>
  <v:f eqn="prod @3 21600 pixelHeight"/>
  <v:f eqn="sum @0 0 1"/>
  <v:f eqn="prod @6 1 2"/>
  <v:f eqn="prod @7 21600 pixelWidth"/>
  <v:f eqn="sum @8 21600 0"/>
  <v:f eqn="prod @7 21600 pixelHeight"/>
  <v:f eqn="sum @10 21600 0"/>
 </v:formulas>
 <v:path o:extrusionok="f" gradientshapeok="t" o:connecttype="rect"/>
 <o:lock v:ext="edit" aspectratio="t"/>
</v:shapetype><v:shape id="_x0000_i1025" type="#_x0000_t75" style='width:29.4pt;
 height:27pt'>
 <v:imagedata src="file:///C:/Users/RUWIND~1/AppData/Local/Temp/msohtmlclip1/01/clip_image001.png"
  o:title="" chromakey="white"/>
</v:shape><![endif]--><!--[if !vml]--><img width="39" height="36" src="file:///C:/Users/RUWIND~1/AppData/Local/Temp/msohtmlclip1/01/clip_image002.png" v:shapes="_x0000_i1025"><!--[endif]--></span><!--[endif]--><!--EndFragment-->



`;
    return t;
}