'use strict';

$(document).ready(function ($) {
    // delegate calls to data-toggle="lightbox"
    $(document).delegate('*[data-toggle="lightbox"]:not([data-gallery="navigateTo"])', 'click', function(event) {
        event.preventDefault();
        return $(this).ekkoLightbox();
    });
});
