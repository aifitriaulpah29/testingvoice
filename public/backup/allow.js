document.onkeydown = function(e) {
  if (e.ctrlKey && e.which == 85) {
    window.location.replace("https://www.google.com/");
    return false;
  }
};

document.oncontextmenu = function(e) {
  if (e.which == 3) {
    window.location.replace("https://www.google.com/");
    return false;
  }
  return false;
};

function periksaDomain() {
  // BYPASS: Izinkan akses langsung jika sedang membuka /tools
  if (window.location.pathname.includes('/tools')) {
    return;
  }

  const allowedDomains = [
    'https://starballbeta.blogspot.com/', 
    'https://starlive.pages.dev/', 
    'https://lordtv3.blogspot.com/',
    'https://starballtv007.blogspot.com/',
    'https://starballtv08.blogspot.com/',
    'https://starballtv09.blogspot.com/'
  ];
  
  const referrer = document.referrer;
  const currentOrigin = window.location.origin;
  let isAllowed = false;

  // Jika referrer kosong tapi origin sama (reload), izinkan
  if (!referrer && currentOrigin) {
    isAllowed = true;
  }

  allowedDomains.forEach(domain => {
    if (referrer.startsWith(domain)) {
      isAllowed = true;
    }
  });

  if (!isAllowed) {
    window.location.replace("https://google.com/");
  }
}

periksaDomain();
