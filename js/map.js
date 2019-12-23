/*global define: false */
'use strict';

function initMap() {
    var nyaraloLatlng = new google.maps.LatLng(46.858725,20.497896);
    var myOptions = {
        zoom: 12,
        center: nyaraloLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById("map"), myOptions);

    var contentString1 = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<h3 id="firstHeading" class="firstHeading">Kiszely nyaraló</h3>'+
        '<div id="bodyContent">'+
        '<p></p>'+
        '</div>'+
        '</div>';

    var infowindow1 = new google.maps.InfoWindow({
        content: contentString1
    });

    var marker1 = new google.maps.Marker({
        position: nyaraloLatlng,
        map: map,
        title: 'Kiszely nyaraló',
    });
    marker1.addListener('click', function() {
        infowindow1.open(map, marker1);
    });
}
