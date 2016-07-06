$(document).on('ready', function () {
  $('#fileUpload').on('change', readFile);
});

function readFile() {
  var self = $(this);
  var pathImg = self[0].value;
  console.log(pathImg, pathImg.lastIndexOf('.'));
  var extFile = pathImg.substring(pathImg.lastIndexOf('.') + 1).toLowerCase();
  var imgPreview = $('#imgPreview');
  var txtImage = $('#txtFile');
  console.log(extFile);

  if(extFile === 'gif' || extFile === 'png' || extFile === 'jpg' || extFile === 'jpeg'){
    if(typeof FileReader !== 'udefined'){
      var reader = new FileReader();
      reader.onload = function (e) {
        imgPreview.attr('src',e.target.result);
      }
      reader.readAsDataURL(self[0].files[0]);
    }
  }
  else{
    imgPreview.attr('src','/images/imagepreview.png');
    self.val('');
    txtImage.val('');
    Materialize.toast('¡Selecciona solo imágenes!', 4000);
  }
}
