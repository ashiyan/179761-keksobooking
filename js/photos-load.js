/* Loads avatar and lodge photos */

'use strict';

(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  /* Change color of the drop zone at the file dragging moment */
  var upperLayers = document.querySelectorAll('.upload');
  [].forEach.call(upperLayers, function (layer) {
    layer.addEventListener('mousemove', dropzoneSetColorHandler);
    layer.addEventListener('mouseout', dropzoneResetColorHandler);
    layer.addEventListener('dragover', dropzoneSetColorHandler);
    layer.addEventListener('dragleave', dropzoneResetColorHandler);
    layer.addEventListener('drop', dropzoneResetColorHandler);
  });

  /* Component that selects an avatar */
  var avatarChooser = document.querySelector('.avatar-loader');
  avatarChooser.addEventListener('change', fileLoadHandler);

  /* Component that selects a lodge photo */
  var photosChooser = document.querySelector('.photos-loader');
  photosChooser.addEventListener('change', fileLoadHandler);

  /* Process the event of fileChooser state changing */
  function fileLoadHandler(event) {
    var fileChooser = event.target;

    /* Get downloaded file */
    var file = fileChooser.files[0];

    /* Get name of the file */
    var fileName = file.name.toLowerCase();

    /* Verify file extension with extensions of images */
    var isImage = FILE_TYPES.some(function (type) {
      return fileName.endsWith(type);
    });

    /* If file is a picture*/
    if (isImage) {
      /* FileReader allows to read the contents of files asynchronously */
      var reader = new FileReader();

      /* Event of successful complete of read operation */
      reader.addEventListener('load', function () {
        /* attribute 'result' - URL file encoded in base64 string */
        var loadedPhoto = reader.result;

        /* determine loader */
        switch (fileChooser) {

          /* If the avatar loader has tripped */
          case avatarChooser:
            var avatarContainer = document.querySelector('.notice__preview img');
            avatarContainer.src = loadedPhoto;
            avatarContainer.style.maxWidth = '70px';
            avatarContainer.style.maxHeight = '70px';
            break;

          /* If the photos loader has tripped */
          case photosChooser:
            var photoContainer = document.querySelector('.form__photo:empty');
            if (photoContainer !== null) {
              var imgElement = document.createElement('img');
              imgElement.src = loadedPhoto;
              imgElement.style.maxWidth = '70px';
              imgElement.style.maxHeight = '70px';
              photoContainer.appendChild(imgElement);
            }
            break;

        }
      });

      /* readAsDataURL used to read the contents of a file */
      reader.readAsDataURL(file);
    }
  }

  /* ---------------------------------------------------------------------------
   * Handler of the mouse pointer over the drop zone
   * @param {Object} - event object
   */
  function dropzoneSetColorHandler(event) {
    var elementStyle = event.currentTarget.style;
    elementStyle.borderColor = window.constants.colors.ORANGE_LOADER;
    elementStyle.color = window.constants.colors.ORANGE_LOADER;
  }

    /* -------------------------------------------------------------------------
   * Handler of the drop moment and when mouse pointer output from dropzone
   * @param {Object} - event object
   */
  function dropzoneResetColorHandler(event) {
    var elementStyle = event.currentTarget.style;
    elementStyle.borderColor = window.constants.colors.GRAY_LOADER;
    elementStyle.color = window.constants.colors.GRAY_LOADER;
  }

})();
