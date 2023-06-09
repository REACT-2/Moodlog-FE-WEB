function dataURLtoFile(ImgDataUrl: string) {
  const arr = ImgDataUrl.split(',')
  const filename = new Date().getTime() + '.png'
  const mime = 'image/png'
  const bstr = window.atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, {
    type: mime,
  })
}

export default dataURLtoFile
