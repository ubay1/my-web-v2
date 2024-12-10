!(function () {
  var e, t, n, a
  window.MyAliceWebChat ||
    (((t = document.createElement('div')).id = 'myAliceWebChat'),
    ((n = document.createElement('script')).type = 'text/javascript'),
    (n.async = !0),
    (n.src = 'https://widget.myalice.ai/index.js'),
    (a = (e = document.body.getElementsByTagName('script'))[e.length - 1]).parentNode.insertBefore(
      n,
      a,
    ),
    a.parentNode.insertBefore(t, a),
    n.addEventListener('load', function () {
      MyAliceWebChat.init({
        selector: 'myAliceWebChat',
        number: '089653674186',
        message: 'Hallo bay, berapa harga per proyeknya ?',
        color: '#25D366',
        channel: 'wa',
        boxShadow: 'none',
        text: '',
        theme: 'light',
        position: 'right',
        mb: '20px',
        mx: '20px',
        radius: '20px',
      })
    }))
})()
