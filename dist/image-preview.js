(() => {
  const dialog = document.querySelector(".image-preview");
  const previewLink = dialog?.querySelector(".image-preview-full");
  const previewImage = previewLink?.querySelector("img");
  const closeButton = dialog?.querySelector(".image-preview-close");
  if (!dialog || !previewLink || !previewImage || !closeButton) return;

  let returnFocusTo = null;

  document.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return;
    const image = event.target.closest("a[href] img");
    if (!image || !(image instanceof HTMLImageElement) || dialog.contains(image)) return;

    const sourceLink = image.closest("a[href]");
    if (!sourceLink || sourceLink.target === "_blank" || sourceLink.hasAttribute("download")) return;
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    event.preventDefault();
    returnFocusTo = sourceLink;
    previewLink.href = sourceLink.href;
    previewImage.src = image.currentSrc || image.src;
    previewImage.alt = image.alt;
    dialog.showModal();
    closeButton.focus();
  });

  closeButton.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener("close", () => {
    previewImage.removeAttribute("src");
    if (returnFocusTo?.isConnected) returnFocusTo.focus();
    returnFocusTo = null;
  });
})();
