
var $pictureFrame = document.querySelector('.picture-frame');

function changePic(event) {
  var $photoUrl = document.querySelector('.pic-input').value;
  var $newPic = $photoUrl;
  $pictureFrame.src = $newPic;

}

document.addEventListener('input', changePic);
