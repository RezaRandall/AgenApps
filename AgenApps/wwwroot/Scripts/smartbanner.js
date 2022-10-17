
function AzigetCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
          c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
      }
  }
  return "";
}
function AzisetCookie(cname, cvalue) {
    var d = new Date();
    d.setTime(d.getTime() + (1 * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function closebanner() {
    $("body,.header-area,.container-popupweb,.mtcart,#content_notifikasi .mt60,.badgex,.contentsubkat").css({ "margin-top": "" });
    $('#smartbanner').remove();
    return AzisetCookie("smartbanner", "false");
}
function showbanner(email) {
	if (AzigetCookie('smartbanner') == "") {
		$("body,.header-area,.headerwrapper,.content").css({ "margin-top": "35px" });
		$(".headerwrapper,.content").css({ "margin-top": "35px" });
		$(".leftpanel").css({ "list-style": "none", "top": " -37px" });
		var text_ket = "Email belum Terverifikasi, Verifikasi akun anda melalui email";
		if ($(document).width() <= 672) {
			text_ket = "Verifikasi akun anda melalui email"; 
		}
		$("body").append(`<div id="smartbanner" class="windows shown">
							<div class="sb-container">
								</span>
								<div class="sb-info">
									<span>`+ text_ket +` <strong>`+ email +`</strong></span>
									<span></span></div>
								<a href="#" onclick="kirim_verifikasi()" class="sb-button">
									<span>Kirim Ulang</span>
								</a>
							</div>
						</div>`);
		if ($(document).width() <= 672) {
			$("#smartbanner").css({ "font-size": "10px", "padding-top": "10px" });
			$("#smartbanner .sb-button").css({ "font-size": "9px", "padding": "10px 7px" });
		}
	}
}
