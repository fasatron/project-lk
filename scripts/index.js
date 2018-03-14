$(document).ready(function() {
  $.cloudinary.config({
    cloud_name: 'dgvblm4cc',
  });
  $('.cloudinary-fileupload').cloudinary_fileupload();
  $('.cloudinary-fileupload').bind('cloudinarydone', function(e, data) {
    $('.preview').html(
      $.cloudinary.image(data.result.public_id, {
        format: data.result.format,
        version: data.result.version,
        crop: 'crop',
        gravity: 'face',
        raduis: 'max',
        width: 100,
        height: 100,
      })
    );
    $('.avatar-url').val(data.result.url);
    $('.progress_bar').hide();
    return true;
  });
  $('.cloudinary-fileupload').bind('cloudinaryprogress', function(e, data) {
    $('.progress_bar')
      .val(Math.round(data.loaded * 100 / data.total))
      .show();
  });
});
