// Accordian Menu (used in for advanced search options)
$(function(){
$('.advancedSearch').click(function() {
    if ($(this).attr('class')== 'advancedSearch on') {
        $(this).removeClass('on');
        $(this).next().slideUp('normal');
    }
    else {
        $(this).addClass('on');
        $(this).next().slideDown('normal');
    }
});
$('.advancedSearchContent').hide();
});