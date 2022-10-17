
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
	$("body,.navbar-fixed-top").css({ "margin-top": "" });
	$('#smartbanner').remove();
	return AzisetCookie("smartbanner", "false");
}

$(function () {

	//=-------------- SMARTBANNER
	//closebanner di kirim.js
	if (navigator.userAgent.split(' ')[1] != "Google") {
		if (AzigetCookie('smartbanner') == "") {
			$("body,.navbar-fixed-top").css({ "margin-top": "66px" });
			$("body").append(`<div id="smartbanner" class="windows shown">
							<div class="sb-container">
								<a class="sb-close" onclick="closebanner()">×</a>
								<span class="sb-icon gloss" style="background-image: url('https://sintesys.co.id/App_Asset/images/icon.png');">
								</span>
								<div class="sb-info">
									<strong style='font-weight: bold;'>Sintesys App</strong><br>
									<span>Akses lebih mudah dan praktis &amp; dengan Aplikasi Sintesys</span>
									<span></span></div>
									<a href="https://play.google.com/store/apps/details?id=ujian.ruwindo.com" class="sb-button">
									<span>install</span>
								</a>
							</div>
						</div>`);
			
		}
	}

});