var loading_elemen = '<div class="loading-overlay"><div class="ring"><div class="loading-title"></div>'+
    '<span></span>' +
    '</div></div>';

function showloading(title) {
    var l = $(".loading-overlay");
    if (l.length <= 0) {
        $("body").append(loading_elemen);
        $(".loading-title").append(title);
    }

}
function closeloading() {
    $(".loading-overlay").remove();
}