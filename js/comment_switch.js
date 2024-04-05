function switchComment() {
  const t =
      "切换为Twikoo" === $("#switch-comment").attr("title")
        ? "切换为Valine"
        : "切换为Twikoo",
    o = $("#switch-comment>i");
  "none" === $("#twikoo-container").css("display")
    ? $("#vcomment").slideUp("normal", () => {
        $("#twikoo-container").slideDown("normal", () => {
          $("#switch-comment").attr("title", t),
            o.hasClass("fa-toggle-off")
              ? o.removeClass("fa-toggle-off").addClass("fa-toggle-on")
              : o.removeClass("fa-toggle-on").addClass("fa-toggle-off");
        });
      })
    : $("#twikoo-container").slideUp("normal", () => {
        $("#vcomment").slideDown("normal", () => {
          $("#switch-comment").attr("title", t),
            o.hasClass("fa-toggle-off")
              ? o.removeClass("fa-toggle-off").addClass("fa-toggle-on")
              : o.removeClass("fa-toggle-on").addClass("fa-toggle-off");
        });
      });
}
var commentElement = document.getElementsByClassName("comment_headling")[0];
if (commentElement != undefined) {
  commentElement.innerHTML +=
    '<a id="switch-comment" href="javascript:void(0);" title="切换为Twikoo" target="_self"><i class="fa fas fa-toggle-off" aria-hidden="true"></i></a>';
  document.getElementById("twikoo-container").style.display = "none";
}
$("#switch-comment").click(function () {
  return switchComment(), !1;
});