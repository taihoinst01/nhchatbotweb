$(function () {
    $('#wrapper').css({ 'height': ($(document).height()) + 'px'});
    $(window).resize(function () {
        //$('#wrapper').css({ 'height': ($(document).height()) + 'px' });
    });

    //동영상 팝업창 생성
    $("#bot > div").add(
        "<div class='mov-wrapper popupArea'>" +
            "<div class='popHeader'>" +
                "<span id='movTitle' class='popupTitle'></span>" +
                "<button class='btnTopClose'></button>" +
            "</div>" +
            "<div class='popBody'>" +
                "<iframe id='video' src='' frameborder='0' allowfullscreen='true' style='overflow-x:hidden;overflow:auto;width:100%;height:322px;'></iframe>" +
            "</div>" +
        "</div>").appendTo("#bot");
    //이미지 팝업창 생성
    $("#bot > div").add(
        "<div class='img-wrapper popupArea'>" +
            "<div class='popHeader'>" +
                "<span id='imgTitle' class='popupTitle'></span>" +
                "<button class='btnTopClose'></button>" +
            "</div>" +
            "<div id='imgCarousel' class='popBody' align='center'>" +
                "<img id='imgTag' src='' width='568' height='318'>"+
            "</div> " +
        "</div>").appendTo("#bot");
    //지도 팝업창 생성
    $("#bot > div").add(
        "<div class='map-wrapper popupArea'>" +
            "<div class='popHeader'>" +
                "<span id='mapTitle' class='popupTitle'></span>" +
                "<button class='btnTopClose'></button>" +
            "</div>" +
            "<div id='mapArea' class='popBody'>"+
				//"<div id='map' style='border:1px solid #000;'></div>"+  //V3
            "</div>"+
        "</div>").appendTo("#bot");


    //챗봇창 상단 생성
    $(".wc-header > span").add(
        "<span class='chatTitle'></span>" +
        "<span class='chatTitleText'><strong>NH</strong> ChatBot</span>" +
        "<span class='topIcon btnClose'><button class='topIcon03'></button></span>" +
        "<span class='topIcon btnLayer btnLayerFull'><button class='topIcon02'></button></span>" +
        "<span class='topIcon btnMin'><button class='topIcon01'></button></span>").appendTo(".wc-header");

    //챗봇 메뉴창 생성
    $(".wc-chatview-panel > div").add(
        "<div class='menuBox off'>" +
        "<p class='menuReStartBtn'><span> Menu </span></p>" +
        "<ul>" +
        //"<li class='menuSelectBtn'><span><a href='#' onclick='viewMenu('Accident analysis')'> Accident analysis </span></a></li>" +
        //"<li class='menuSelectBtn'><span><a href='#' onclick='viewMenu('Accident trends')'> Accident trends </span></a></li>" +
        "<li class='menuSelectBtn'><span><a href='#' onclick='viewMenu()'> return home </span></a></li>" +
        "</ul>" +
        "</div > ").appendTo(".wc-chatview-panel");

    //챗봇창 버튼 동작
    $('.btnClose').click(function () {
        $('.wc-chatview-panel').css('bottom', 0).hide();
        $('.bot-wrap').hide().removeClass("chatOn").addClass("chatOff");
    });
    $('.btnMin').click(function () {
        $('.btnTopClose').click();
        $('.wc-chatview-panel').css({ "overflow": "hidden" });
        $('.wc-chatview-panel').animate({ "height": "32px" }, "fast");
        $('.wc-console, wc-message-pane').hide();
        $('.btnMin').css({ 'display': 'none' });
        $('.btnLayer').removeClass('btnLayerFull').addClass('btnLayerMid');
        $('.btnLayer > button').removeClass('topIcon02').addClass('topIcon02-1');
    });
    $(document).on('click', '.wc-header [class*=btnLayer]', function () {
        if ($(this).hasClass('btnLayerMid')) {
            //$('.wc-chatview-panel').css({ "overflow": "visible" });
            $('.wc-chatview-panel').animate({ "height": "530px" }, "fast");
            $('.popupArea').animate({ 'bottom': '176px' }, "fast");
            $('.wc-console, wc-message-pane').show();
            $('.btnLayer').removeClass('btnLayerMid').addClass('btnLayerFull');
            $('.btnLayer > button').css({ 'display': 'inline-block' }).removeClass('topIcon02-1').addClass('topIcon02');
            $('.btnMin').css({ 'right': '58px', 'display': 'inline-block' });
        } else {
            $('.wc-chatview-panel').animate({ "height": ($(document).height()) + 'px' }, "fast");
            $('.popupArea').animate({ 'bottom': ($(window).height() - 352) + 'px' }, "fast");
            $('.btnLayer').removeClass('btnLayerFull').addClass('btnLayerMid');
            $('.btnLayer > button').css({ 'display': 'inline-block' }).removeClass('topIcon02').addClass('topIcon02-1');
        }
    });

    //챗봇 메뉴 버튼 동작
    //$('.menuIcon').click(function (){
    //    if ($('.menuBox').hasClass("off")) {
    //        $('.menuBox').removeClass('off').addClass('on');
    //        $('.menuBox').css({ 'display': 'block' });
    //    } else {
    //        $('.menuBox').removeClass('on').addClass('off');
    //        $('.menuBox').css({ 'display': 'none' });
    //    }
    //});

    //팝업 닫기
    $('.btnTopClose').click(function () {
        $("#video").attr('src', '');
        $('.mov-wrapper, .img-wrapper, .map-wrapper').hide().animate({ "right": "-380px", "opacity": "0", "display": "none" }, "slow").fadeOut("slow");
    });

    //동영상 영역 호출
    $(document).on('click', '.wc-card-play > div > .playImg', function () {
        console.log('mov');
        //$('.wc-card-play, .wc-card-img, .wc-card-map').parent().removeClass('on');
        $('.img-wrapper, .map-wrapper').fadeOut();
        $("#video").attr('src', '');
        var movPopTitle = $(this).parent().children().eq(1).attr('alt');
        $('#movTitle').text(movPopTitle);
        var movPopUrl = $(this).parent().children().eq(2).attr('alt');
        $('#video').attr('src', movPopUrl);
        $('.mov-wrapper').show().animate({ "right": "380px", "opacity": "1" }, "fast");
        //$(this).parent().addClass('on');
    });
    //이미지 영역 호출
    $(document).on('click', '.wc-card-img > div > .imgImg', function () {
        //$('.wc-card-play, .wc-card-img, .wc-card-map').parent().removeClass('on');
        $('.mov-wrapper, .map-wrapper').fadeOut();
        $("#video").attr('src', '');
        $('#imgDiv > div').remove();
        var manyImg = false;
        var imgPopTitle = $(this).parent().children().eq(1).attr('alt');
        var imgUrl = $(this).parent().children().eq(2).attr('alt');
        var imgCnt = $(this).parent().children().eq(3).attr('alt');
        $('#imgTag').attr('src', imgUrl);
        $('#imgTitle').text(imgPopTitle);
        $('.img-wrapper').show().animate({ "right": "380px", "opacity": "1" }, "fast");
        //$(this).parent().addClass('on');
    });
    //지도 영역 호출
    $(document).on('click', '.wc-card-map > div > .mapImg', function () {
        console.log('map');
        //('.wc-card-play, .wc-card-img, .wc-card-map').parent().removeClass('on');
        $('.mov-wrapper, .img-wrapper').fadeOut();
        $("#video").attr('src', '');

        $('#mapArea > div').remove();
        $('#mapArea').add("<div id='map' style='border:1px solid #000;'></div>").appendTo('#mapArea');
        var mapTitle = $(this).parent().children().eq(1).attr('alt');
        $('#mapTitle').text(mapTitle);
        var coordinate = $(this).parent().children().eq(2).attr('alt');
        var _temp = coordinate.split(',');
        var longitude = _temp[0];
        var latitude = _temp[1];

        /* V3로 변경*/
        var position = new naver.maps.LatLng(longitude, latitude);
        var map = new naver.maps.Map('map', {
            center: position,
            zoom: 12,
            size: new naver.maps.Size(568, 318)
        });

        var marker = new naver.maps.Marker({
            position: new naver.maps.LatLng(longitude, latitude),
            map: map
        });
        $('.map-wrapper').show().animate({ "right": "380px", "opacity": "1" }, "fast");
        //$(this).parent().addClass('on');
    });

});

//챗봇 메뉴 처음으로 돌아가기
//function viewMenu() {
//    var returnText = "return home";     // 처음으로 돌아가는 텍스트
//    $('div.wc-console').addClass('has-text');
//    $('input[type="text"].wc-shellinput').attr('value', returnText);
//    $('input[type="text"].wc-shellinput').val(returnText);
//    $('label.wc-send').trigger('click');
//    $('input[type="text"].wc-shellinput').attr('value', '');
//    $('input[type="text"].wc-shellinput').val('');
//    $('.wc-console').removeClass('has-text');
//    $('.menuBox').removeClass('on').addClass('off');
//    $('.menuBox').css({ 'display': 'none' });
//}