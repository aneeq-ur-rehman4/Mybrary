FilePond.registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginImageResize,
  FilePondPluginFileEncode
);

FilePond.setOptions({
  stylePanelAspectRatio: 150 / 100,
  imageREsizeTargetWidth: 100,
  imageREsizeTargetHeightF: 150,
});

FilePond.parse(document.body);
