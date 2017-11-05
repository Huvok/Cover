$(document).ready(function() {
    $(".tabs > li").on("click", function () {
        $(".selected").removeClass("selected");
        var currentClass = $(this).attr("class");
        $(this).addClass("selected");
        
        $(".selectedSection").hide();
        $(".selectedSection").removeClass("selectedSection").addClass("notSelectedSection");
        
        $("#" + currentClass + "Section").fadeIn(600);
        $("#" + currentClass + "Section").addClass("selectedSection").removeClass("notSelectedSection");
        
    });
});