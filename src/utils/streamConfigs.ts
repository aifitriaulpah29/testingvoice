// @ts-nocheck
// ============ STREAM CONFIGS ============
export const videoConfigs = [
{
  id: 'foxonewc',
  type: 'dash',
  url: 'https://otte.cache.aiv-cdn.net/bom-nitro/live/clients/dash/enc/fsu3wl2rwb/out/v1/be61206c04e643349d53fb22301f3b50/cenc.mpd',
  clearKeys:     {      '5466ebd70704bdeb657f0abf3c5ca4ef':'bdd79b72d8e48ed483aa623cc38a8a16'    },
  proxy: true, // Memaksa stream ini melewati proxy /api/manifest
  origin: 'https://play.foxsports.com',
  referer: 'https://play.foxsports.com',
  userAgent: 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
  headers: {}
},
{
  id: 'epl2',
  type: 'dash',
  url: 'https://director.streaming.telia.com/tvm-packager-prod/group1/6089c60547a23d7c365cf432/manifest.mpd',
  clearKeys:     {      '53ec12fa153a5af7a6071fb50f570e3e':'019b961e776d6df03509c2766ca088f1'    },
  origin: 'https://www.teliaplay.se/',
  referer: 'https://www.teliaplay.se/',
  userAgent: 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
  headers: {}
},
{
  id: 'epl3',
  type: 'dash',
  url: 'https://c9851ec-rbm-hilv-fsly.cdn.redbee.live/L26/6b640fa2/a765d074.isml/dash/.mpd',
  clearKeys:     {      'adca25b8779e4168a0cd710f59f61ccf':'be5383ed3cd8079f4ffe78ad067f476a'    },
  proxy: true,
  origin: '',
  referer: '',
  userAgent: '',
  headers: {}
},
{
  id: 'epl4',
  type: 'dash',
  url: 'https://netskrt.live.pv-cdn.net/OTTB/lhr-nitro/live/clients/dash/enc/pnu10tp36z/out/v1/912e9db56d75403b8a9ac0a719110f36/cenc.mpd',
  clearKeys:     {      '192b1115da041585c77200128549efa1': '634e10efe4abbb14be400a3ccbac0258'    },
  origin: '',
  referer: '',
  userAgent: '',
  headers: {}
},
{
  id: 'epl5',
  type: 'dash',
  url: 'https://d1yi40sjj0ca0v.cloudfront.net/TVD2084/index.mpd',
  clearKeys:     {      '73bf684d98ff371a8f859833f31eb125':'df739c61f17cb9c6aec74b0075be8df4'    },
  origin: '',
  referer: '',
  userAgent: '',
  headers: {}
},
  {
    id: 'epl6',
    type: 'dash',
    url: 'https://a166aivottlinear-a.akamaihd.net/OTTB/lhr-nitro/live/clients/dash/enc/w78ek04aj7/out/v1/2eb42c5327d54f8f994c9c0987e44f96/cenc.mpd',
    clearKeys: {
      '8fb5bc3065d06d9cc3482dd5ca1c5197':'ebd1c7b5e61a653a5935876741d645dc'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}       
  },

  {
    id: 'epl7',
    type: 'dash',
    url: 'https://pecock.septemberrain.workers.dev/co01/Content/CMAF_S2-CTR-4s-v2/Live/channel(5016091-717602-48fe65d6fe2)/master.mpd',
    clearKeys: {
      '0022cefcc748d2738e4b33bebed5dd11':'3bf32afc03fd435fdd59fe7d31486506'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}       
  },

  {
    id: 'mbc1',
    type: 'dash',
    url: 'https://shahid-sports-1-enc.edgenextcdn.net/out/v1/0169cfa282614ebe97ef0201da87bb04/index.mpd',
    clearKeys: {
      'ab081a704aad41829b1123b09b6ecafd':'dd51609092fff15e68b91debf5d591f9'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}       
  },
  {
    id: 'mbc2',
    type: 'dash',
    url: 'https://shahid-sports-2-enc.edgenextcdn.net/out/v1/589aa6b16ce942388695b5b214f4ae93/index.mpd',
    clearKeys: {
      '50a7f3afc00a40b38face4db639d0e4c':'ad7000691326064706281a700b7d6714'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}       
  },
  {
    id: 'mbc3',
    type: 'dash',
    url: 'https://shahid-sports-3-enc.edgenextcdn.net/out/v1/2658c96bbfa54f339e357fe36361587e/index.mpd',
    clearKeys: {
      '2b6f6b340aa8467785e4e82f9320fb5a':'8889701d704078c4d910ed1409413d9b'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}       
  },
  {
    id: 'mbc4',
    type: 'dash',
    url: 'https://shahid-sports-4-enc.edgenextcdn.net/out/v1/f813ab47644d4c41a99285513f6c7409/index.mpd',
    clearKeys: {
      '6477160076644679af1028534f03f67e':'1267f99705113a62c7782c4d5281a7eb'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}       
  },
  {
    id: 'mbc5',
    type: 'dash',
    url: 'https://shahid-sports-5-enc.edgenextcdn.net/out/v1/ae00715d1c2c4432852b44a254c04a3d/index.mpd',
    clearKeys: {
      'e2df3c205b674360bc6f364ba1090e70':'93da2c77bc812bc05a6e20ad8d35ea78'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}       
  },
  
  {
    id: 'epl8',
    type: 'dash',
    url: 'https://pecock.septemberrain.workers.dev/co01/Content/CMAF_S2-CTR-4s-v2/Live/channel(5016090-717601-48fe64e2da1)/master.mpd',
    clearKeys: {
      '0022624e3b0107431f9da13b35d21dd0':'ad9cf6b388c59f99b9b0ca9306f54f34'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}       
  },

            {
    id: 'sportstar',
    type: 'dash',
    url: 'https://rp-rplusku1.pages.dev/https://fta2-cdn-flr.visionplus.id/out/v1/89a6e4261cd7470f83e5869e90440cff/index.mpd',
    clearKeys: {
      '39c4dc6704cf4ceea2fd4863b88d8a7d':'4e9d7954c2ff46759289da4fc9f018ea'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}       
  },
   {
    id: 'soccerc',
    type: 'dash',
    url: 'https://geogersr.itilstrem.workers.dev/https://d2xz2v5wuvgur6.cloudfront.net/out/v1/63c0da12bb4d48afbaf053f51dff2353/index.mpd',
    clearKeys: {
      '4035323a7fe64767ab8f3345ed9b93be':'67377b8d429603f8bf30c161bda269e5'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}       
  },

    {
    id: 'f1tv',
    type: 'dash',
    url: 'https://otte.cache.aiv-cdn.net/bom-nitro/live/clients/dash/enc/duqbirmk0d/out/v1/40f53c7cbc95498db3afd081c377d776/cenc.mpd',
    clearKeys: {
      '609d795905904705028ef54653019af7':'2c791eb611e57a7d7f203022bc1b9ba3'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}       
  },
   {
    id: 'gptv',
    type: 'dash',
    url: 'https://otte.cache.aiv-cdn.net/bom-nitro/live/clients/dash/enc/wjeweupwyc/out/v1/8197c8e055c94a868623653ac55c10bf/cenc.mpd',
    clearKeys: {
      'e03f302ec4dabcccca82cc9f76731ec9':'53ea1027d2bf2893a552cf15bc0366de'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}       
  },

      {
    id: 'onefight',
    type: 'dash',
    url: 'https://live-pv-ta.amazon.fastly-edge.com/syd-nitro/live/clients/dash/enc/kkfdbi2d1c/out/v1/a5b9b32dafd5499688240287ef8c9b90/cenc.mpd',
    clearKeys: {
      '308006101c8fd0262c0f529319b9c127':'37683aadc75b1450efa82d62c647984d'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}       
  },

    {
    id: 'bein1b',
    type: 'dash',
    url: 'https://a201aivottlinear-a.akamaihd.net/OTTB/syd-nitro/live/clients/dash/enc/ghwcl6hv68/out/v1/83536910d8034e9b9895a20fbe1c1687/cenc.mpd',
    clearKeys: {
     '335dad778109954503dcbb21dc92015f':'24bfd75d436cbf73168a2a2dccd40281'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}       
  },
  {
    id: 'bein2b',
    type: 'dash',
    url: 'https://a201aivottlinear-a.akamaihd.net/OTTB/syd-nitro/live/clients/dash/enc/8m8cd46i1t/out/v1/83985c68e4174e90a58a1f2c024be4c9/cenc.mpd',
    clearKeys: {
     '0b42be2664d7e811d04f3e504e0924c5':'ae24090123b8c72ac5404dc152847cb8'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}       
  },
  {
    id: 'bein3b',
    type: 'dash',
    url: 'https://a201aivottlinear-a.akamaihd.net/OTTB/syd-nitro/live/clients/dash/enc/q4u5nwaogz/out/v1/18de6d3e65934f3a8de4358e69eab86c/cenc.mpd',
    clearKeys: {
     '7995c724a13748ed970840a8ab5bb9b3':'67bdaf1e2175b9ff682fcdf0e2354b1e'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}       
  },

     {
    id: 'beinlaliga',
    type: 'dash',
    url: 'https://apac-live.akamaized.net/ehyrzisobs/laligatv_bein_sports/index.mpd?hdntl=exp%3D1773821026%7Eacl%3D%2F*%7Eid%3D38069120%7Edata%3Dhdntl%7Ehmac%3D8e077792b1b57bee8e3eed582c9a5cec431a8e302ea17dac3585f74a39d54cd9',
    clearKeys: {
     'ca0d09088bd747741938e6a56cbe27c5':'beffca466b94433b26b18e40a65e4193'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}    
  },
  {
    id: 'bein1',
    type: 'dash',
    url: 'https://apac-live.akamaized.net/ehyrzisobs/my_bein_sports_01/index.mpd?hdntl=exp%3D1773821026%7Eacl%3D%2F*%7Eid%3D38069120%7Edata%3Dhdntl%7Ehmac%3D8e077792b1b57bee8e3eed582c9a5cec431a8e302ea17dac3585f74a39d54cd9',
    clearKeys: {
     '6c8f7b516b7bb9f69832a10873f6840f':'633945a03d752513ca87d5264bd7cda5'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}    
  },
  {
    id: 'bein2',
    type: 'dash',
    url: 'https://apac-live.akamaized.net/ehyrzisobs/sea_bein_sports_02/index.mpd?hdntl=exp%3D1773821026%7Eacl%3D%2F*%7Eid%3D38069120%7Edata%3Dhdntl%7Ehmac%3D8e077792b1b57bee8e3eed582c9a5cec431a8e302ea17dac3585f74a39d54cd9',
    clearKeys: {
     '40dbb569b90b5c7798f63ed6d7577ccb':'4ea09395289d3c2e633f24f07c180169'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}    
  },
  {
    id: 'bein3',
    type: 'dash',
    url: 'https://apac-live.akamaized.net/ehyrzisobs/indo_bein_sports_03/index.mpd?hdntl=exp%3D1773821026%7Eacl%3D%2F*%7Eid%3D38069120%7Edata%3Dhdntl%7Ehmac%3D8e077792b1b57bee8e3eed582c9a5cec431a8e302ea17dac3585f74a39d54cd9',
    clearKeys: {
     'd887254c10f866f65427c4f651b71c7c':'231a9d9b02041e9ed576afaffb6b8356'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}  
  },
  {
    id: 'beinxtra1',
    type: 'dash',
    url: 'https://apac-live.akamaized.net/ehyrzisobs/bein_sports_vflow01/index.mpd?hdntl=exp%3D1773821026%7Eacl%3D%2F*%7Eid%3D38069120%7Edata%3Dhdntl%7Ehmac%3D8e077792b1b57bee8e3eed582c9a5cec431a8e302ea17dac3585f74a39d54cd9',
    clearKeys: {
     'bcf11c369f95ebb81da7a311ef619021':'b17546666fe86fc2647f3a7d50445d12'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}       
  },
  {
    id: 'beinxtra2',
    type: 'dash',
    url: 'https://apac-live.akamaized.net/ehyrzisobs/bein_sports_vflow02/index.mpd?hdntl=exp%3D1773821026%7Eacl%3D%2F*%7Eid%3D38069120%7Edata%3Dhdntl%7Ehmac%3D8e077792b1b57bee8e3eed582c9a5cec431a8e302ea17dac3585f74a39d54cd9',
    clearKeys: {
     '53ac8e7c798f32280f42c25f04e1bf53':'3115f4ccf41206451337fd3a030aabf1'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}      
  },
  {
    id: 'beinxtra3',
    type: 'dash',
    url: 'https://apac-live.akamaized.net/ehyrzisobs/bein_sports_vflow03/index.mpd?hdntl=exp%3D1773821026%7Eacl%3D%2F*%7Eid%3D38069120%7Edata%3Dhdntl%7Ehmac%3D8e077792b1b57bee8e3eed582c9a5cec431a8e302ea17dac3585f74a39d54cd9',
    clearKeys: {
     '887390fb579f29b0037a34d195f171e7':'188cd5a4826b184865c8bbd7c7a68f05'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}       
  },
  {
    id: 'beinxtra4',
    type: 'dash',
    url: 'https://apac-live.akamaized.net/ehyrzisobs/bein_sports_vflow04/index.mpd?hdntl=exp%3D1773821026%7Eacl%3D%2F*%7Eid%3D38069120%7Edata%3Dhdntl%7Ehmac%3D8e077792b1b57bee8e3eed582c9a5cec431a8e302ea17dac3585f74a39d54cd9',
    clearKeys: {
     'd123d02f7637dd180f7a9f3632e3ef7c':'f8f5a467c252e6af2568bc3354d4c8e1'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}       
  },
  {
    id: 'beinxtra5',
    type: 'dash',
    url: 'https://apac-live.akamaized.net/ehyrzisobs/bein_sports_vflow05/index.mpd?hdntl=exp%3D1773821026%7Eacl%3D%2F*%7Eid%3D38069120%7Edata%3Dhdntl%7Ehmac%3D8e077792b1b57bee8e3eed582c9a5cec431a8e302ea17dac3585f74a39d54cd9',
    clearKeys: {
     '7c214cad238a160353453b01da8be646':'6f64bc2379b1f703ccfb6410be1dfde1'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}      
  },
  {
    id: 'beinxtra6',
    type: 'dash',
    url: 'https://apac-live.akamaized.net/ehyrzisobs/bein_sports_vflow06/index.mpd?hdntl=exp%3D1773821026%7Eacl%3D%2F*%7Eid%3D38069120%7Edata%3Dhdntl%7Ehmac%3D8e077792b1b57bee8e3eed582c9a5cec431a8e302ea17dac3585f74a39d54cd9',
    clearKeys: {
     '672a1f46b66c6bdd26b1680d39baa922':'16169547eb9b0a14146cdbd21490279e'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },
  {
    id: 'beinxtra7',
    type: 'dash',
    url: 'https://apac-live.akamaized.net/ehyrzisobs/bein_sports_vflow07/index.mpd?hdntl=exp%3D1773821026%7Eacl%3D%2F*%7Eid%3D38069120%7Edata%3Dhdntl%7Ehmac%3D8e077792b1b57bee8e3eed582c9a5cec431a8e302ea17dac3585f74a39d54cd9',
    clearKeys: {
     '597b1d0fdddb383fd37febd057d3fd1c':'a728d9c017f83e3e6e77b7d7c0231b22'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}    
  },
  {
    id: 'beinxtra8',
    type: 'dash',
    url: 'https://apac-live.akamaized.net/ehyrzisobs/bein_sports_vflow08/index.mpd?hdntl=exp%3D1773821026%7Eacl%3D%2F*%7Eid%3D38069120%7Edata%3Dhdntl%7Ehmac%3D8e077792b1b57bee8e3eed582c9a5cec431a8e302ea17dac3585f74a39d54cd9',
    clearKeys: {
     '9e3ceafefd61fd316a0d142f7046c424':'1efde03590efcfb0c4324f02f3fa1c43'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}   
  },
  {
    id: 'beinxtra9',
    type: 'dash',
    url: 'https://apac-live.akamaized.net/ehyrzisobs/bein_sports_vflow09/index.mpd?hdntl=exp%3D1773821026%7Eacl%3D%2F*%7Eid%3D38069120%7Edata%3Dhdntl%7Ehmac%3D8e077792b1b57bee8e3eed582c9a5cec431a8e302ea17dac3585f74a39d54cd9',
    clearKeys: {
     '9388b41a62cc99323a94e5aea39500b7':'e2fe2c22fa77f90ee7027bb8fc15eae0'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}       
  },
  {
    id: 'beinxtra10',
    type: 'dash',
    url: 'https://apac-live.akamaized.net/ehyrzisobs/bein_sports_vflow10/index.mpd?hdntl=exp%3D1773821026%7Eacl%3D%2F*%7Eid%3D38069120%7Edata%3Dhdntl%7Ehmac%3D8e077792b1b57bee8e3eed582c9a5cec431a8e302ea17dac3585f74a39d54cd9',
    clearKeys: {
     'ba6ca576b814da5440689919cf982b93':'7d7c899513b0ca4bfc3a8028b9b60e19'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}   
  },
  {
    id: 'beinxtra11',
    type: 'dash',
    url: 'https://apac-live.akamaized.net/ehyrzisobs/bein_sports_vflow11/index.mpd?hdntl=exp%3D1773821026%7Eacl%3D%2F*%7Eid%3D38069120%7Edata%3Dhdntl%7Ehmac%3D8e077792b1b57bee8e3eed582c9a5cec431a8e302ea17dac3585f74a39d54cd9',
    clearKeys: {
     '88a514d82b5950d436067699ec71c40f':'16d8fcd13aa221d0439329015b7bc3ab'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}   
  },
   {
    id: 'beinxtra12',
     type: 'dash',
    url: 'https://apac-live.akamaized.net/ehyrzisobs/bein_sports_vflow12/index.mpd?hdntl=exp%3D1773821026%7Eacl%3D%2F*%7Eid%3D38069120%7Edata%3Dhdntl%7Ehmac%3D8e077792b1b57bee8e3eed582c9a5cec431a8e302ea17dac3585f74a39d54cd9',
    clearKeys: {
     'b2884416343f9e95655d239c1c85d238':'4af020970bf6df51d130d469b542aaff'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}   
   },
  {
    id: 'beinxtra13',
    type: 'dash',
    url: 'https://apac-live.akamaized.net/ehyrzisobs/bein_sports_vflow13/index.mpd?hdntl=exp%3D1773821026%7Eacl%3D%2F*%7Eid%3D38069120%7Edata%3Dhdntl%7Ehmac%3D8e077792b1b57bee8e3eed582c9a5cec431a8e302ea17dac3585f74a39d54cd9',
    clearKeys: {
     '476578306ea46d7acbf6c19a2e3f4641':'24a983ddaf04f27cda4f0e9aeb13860b'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}    
  },
  {
    id: 'beinxtra14',
    type: 'dash',
    url: 'https://apac-live.akamaized.net/ehyrzisobs/bein_sports_vflow14/index.mpd?hdntl=exp%3D1773821026%7Eacl%3D%2F*%7Eid%3D38069120%7Edata%3Dhdntl%7Ehmac%3D8e077792b1b57bee8e3eed582c9a5cec431a8e302ea17dac3585f74a39d54cd9',
    clearKeys: {
     '243b260ec94a35bb130f17e86825aa8b':'626c8597e8c419b9bb77a44e8cc7b5db'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}   
  },
  {
    id: 'beinxtra15',
    type: 'dash',
    url: 'https://apac-live.akamaized.net/ehyrzisobs/bein_sports_vflow15/index.mpd?hdntl=exp%3D1773821026%7Eacl%3D%2F*%7Eid%3D38069120%7Edata%3Dhdntl%7Ehmac%3D8e077792b1b57bee8e3eed582c9a5cec431a8e302ea17dac3585f74a39d54cd9',
    clearKeys: {
     'e0d9cb8ea4f649dae8572747f6ca491c':'1f92090eccefd128187d80566c62eb15'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}  
  },
   {
    id: 'beinxtra16',
     type: 'dash',
    url: 'https://apac-live.akamaized.net/ehyrzisobs/bein_sports_vflow16/index.mpd?hdntl=exp%3D1773821026%7Eacl%3D%2F*%7Eid%3D38069120%7Edata%3Dhdntl%7Ehmac%3D8e077792b1b57bee8e3eed582c9a5cec431a8e302ea17dac3585f74a39d54cd9',
    clearKeys: {
     'b57b8a3caa2ae92add922a45c449c64e':'6ed3930d2e821eee33f75bd30f74a5c2'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}    
   },
  {
    id: 'beinxtra17',
    type: 'dash',
    url: 'https://apac-live.akamaized.net/ehyrzisobs/bein_sports_vflow17/index.mpd?hdntl=exp%3D1773821026%7Eacl%3D%2F*%7Eid%3D38069120%7Edata%3Dhdntl%7Ehmac%3D8e077792b1b57bee8e3eed582c9a5cec431a8e302ea17dac3585f74a39d54cd9',
    clearKeys: {
     'f96ca2c12f366330bbdf5ebc72797257':'eb168ed9c2a857e7b86d533e0a39db48'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },
  {
    id: 'beinxtra18',
    type: 'dash',
    url: 'https://apac-live.akamaized.net/ehyrzisobs/bein_sports_vflow18/index.mpd?hdntl=exp%3D1773821026%7Eacl%3D%2F*%7Eid%3D38069120%7Edata%3Dhdntl%7Ehmac%3D8e077792b1b57bee8e3eed582c9a5cec431a8e302ea17dac3585f74a39d54cd9',
    clearKeys: {
     '9c5c8869dbcb46ecf6ae628abe826192':'118e49f56ed3655050e1118a48c825a2'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}    
  },
  {
    id: 'beinxtra19',
    type: 'dash',
    url: 'https://apac-live.akamaized.net/ehyrzisobs/bein_sports_vflow19/index.mpd?hdntl=exp%3D1773821026%7Eacl%3D%2F*%7Eid%3D38069120%7Edata%3Dhdntl%7Ehmac%3D8e077792b1b57bee8e3eed582c9a5cec431a8e302ea17dac3585f74a39d54cd9',
    clearKeys: {
     'e37096e38cbce6a32bfdbaefcbd12773':'f85e25ffd5f2d13f94f99feb4c892091'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}   
  },
  {
    id: 'beinxtra20',
    type: 'dash',
    url: 'https://apac-live.akamaized.net/ehyrzisobs/bein_sports_vflow20/index.mpd?hdntl=exp%3D1773821026%7Eacl%3D%2F*%7Eid%3D38069120%7Edata%3Dhdntl%7Ehmac%3D8e077792b1b57bee8e3eed582c9a5cec431a8e302ea17dac3585f74a39d54cd9',
    clearKeys: {
     '42d6b9c054d8b68053e053e24ec2b476':'03ad7bfc7baddd70ca69107410b707a8'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },
  {
    id: 'beinxtra21',
    type: 'dash',
    url: 'https://apac-live.akamaized.net/ehyrzisobs/bein_sports_vflow21/index.mpd?hdntl=exp%3D1773821026%7Eacl%3D%2F*%7Eid%3D38069120%7Edata%3Dhdntl%7Ehmac%3D8e077792b1b57bee8e3eed582c9a5cec431a8e302ea17dac3585f74a39d54cd9',
    clearKeys: {
     '15df28208ec1f11a3838aa15553b757d':'e01cdc4e2654ff6459692113f4e5c5d9'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}  
  },
  {
    id: 'beinxtra22',
    type: 'dash',
    url: 'https://apac-live.akamaized.net/ehyrzisobs/bein_sports_vflow22/index.mpd?hdntl=exp%3D1773821026%7Eacl%3D%2F*%7Eid%3D38069120%7Edata%3Dhdntl%7Ehmac%3D8e077792b1b57bee8e3eed582c9a5cec431a8e302ea17dac3585f74a39d54cd9',
    clearKeys: {
     'baede983d7181126a2aee2fb9e6f15d3':'7063bb9ae2519283d02bf09ea75764b4'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}   
  },
  {
    id: 'beinxtra23',
    type: 'dash',
    url: 'https://apac-live.akamaized.net/ehyrzisobs/bein_sports_vflow23/index.mpd?hdntl=exp%3D1773821026%7Eacl%3D%2F*%7Eid%3D38069120%7Edata%3Dhdntl%7Ehmac%3D8e077792b1b57bee8e3eed582c9a5cec431a8e302ea17dac3585f74a39d54cd9',
    clearKeys: {
     'd3e91849e5af2bf3299aa884319da48a':'6b2adb8e88f8664b580de3c8d53b5c2d'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}      
  },
  {
    id: 'beinxtra24',
    type: 'dash',
    url: 'https://apac-live.akamaized.net/ehyrzisobs/bein_sports_vflow24/index.mpd?hdntl=exp%3D1773821026%7Eacl%3D%2F*%7Eid%3D38069120%7Edata%3Dhdntl%7Ehmac%3D8e077792b1b57bee8e3eed582c9a5cec431a8e302ea17dac3585f74a39d54cd9',
    clearKeys: {
     'aad4b29853edd451f02c866919ff42e7':'4fec3cf11494de8032f3ca43f8f6af2c'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}    
  },

      {
    id: 'mutv',
    type: 'dash',
    url: 'https://apac-live.akamaized.net/ehyrzisobs/mutv_bein_sports/index.mpd?hdntl=exp=1754811363~acl=%2f*~id=VID_DRA8AfBWpadcpp5x4klbL6qzVcIE~data=hdntl~hmac=ef1bae520d2d6878d2114f49ea64dbbd22b688b7a8bba867884fb112196db5da',
    clearKeys: {
     'e34d3f56de8ed573841bad6612e24e9c':'5f48f3237792d40daba95d52d17db03a'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}       
  },
  {
    id: 'lfctv',
    type: 'dash',
    url: 'https://apac-ovt-dflow.akamaized.net/lfctv_bein_sports/index.mpd?hdntl=exp=1753565892~acl=%2f*~id=VID_TVSps5WMQYCaL7cdxCugwBn8zusE~data=hdntl~hmac=7844aa2e7b7c58352f5fae98dd21ec674a02db5a4f30098a9dd8f07351cd9947',
    clearKeys: {
     '5c5379a5205b524206113d0ef2bf34a7':'448cb360d4ed8c10e650f41a73134b9c'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}       
  },

  {
    id: 'milantv',
    type: 'dash',
    url: 'https://a201aivottlinear-a.akamaihd.net/OTTB/lhr-nitro/live/clients/dash/enc/jsqfhask6w/out/v1/e70dcd0f1e684592a3db4bbe7feee0fa/cenc.mpd',
    clearKeys: {
     '602f114e6caa09eb9ec0dc18d0b01cb0':'0c433e2a2157f7c1e240ad7eac62d604'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}       
  },
  {
    id: 'intertv',
    type: 'dash',
    url: 'https://a201aivottlinear-a.akamaihd.net/OTTB/lhr-nitro/live/clients/dash/enc/ekeomalvg7/out/v1/f63288f993e6470580623d7b9b45efb0/cenc.mpd',
    clearKeys: {
     '7313f38125a3fefd00cf7d6567ff333b':'87b49a0329febb10eef514fd0f044ee2'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}       
  },

      {
    id: '4seven',
    type: 'dash',
    url: 'https://olsp.live.dash.c4assets.com/dash_iso_sp_tl/live/channel(4s)/manifest.mpd',
    clearKeys: {
      '0000000000000000000000000034730a':'19bfb83e0e0f40f6eef4eccedbfa7bb8'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}       
  },
  {
    id: 'e4',
    type: 'dash',
    url: 'https://olsp.live.dash.c4assets.com/dash_iso_sp_tl/live/channel(e4)/manifest.mpd',
    clearKeys: {
      '0000000000000000000000000065340a':'88a5d26b2dc54896693dea815df7c592'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}       
  },
  {
    id: 'channel4',
    type: 'dash',
    url: 'https://olsp.live.dash.c4assets.com/dash_iso_sp_tl/live/channel(c4)/manifest.mpd',
    clearKeys: {
      '0000000000000000000000000063340a':'5ce85f1aa5771900b952f0ba58857d7a'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}       
  },

  

      {
    id: 'skyplde',
    type: 'dash',
    url: 'https://a151aivottlinear-a.akamaihd.net/OTTB/lhr-nitro/live/clients/dash/enc/9o6jmlyjpm/out/v1/ad80a9bfecc6438f82f2af41c58d7fb8/cenc.mpd',
    clearKeys: {
      'ca4316630f56d6f33e9ff73b7ad211d1':'72c54e5646055f444e99bc1123919e89'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}       
  },
  {
    id: 'skymixde',
    type: 'dash',
    url: 'https://a205aivottlinear-a.akamaihd.net/IAD/lhr-nitro/live/clients/dash/enc/tjz3qplazr/out/v1/546e7eee67cd472fb34f53112df73144/cenc.mpd',
    clearKeys: {
      '3c393a1661a7a0c306ed4b2d3f8c7b7e':'74583ae652f0ed1bed5fc713f577fe1e'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}       
  },
  {
    id: 'sky1de',
    type: 'dash',
    url: 'https://a151aivottlinear-a.akamaihd.net/OTTB/lhr-nitro/live/clients/dash/enc/szmus1u1h0/out/v1/6d3245aa41e0455489ec87d3a144abea/cenc.mpd',
    clearKeys: {
      '67905848180231a8a51a6539670d6e8d':'50cec07ba1ff5395e451ed2950d39fb2'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}       
  },
  {
    id: 'topeventde',
    type: 'dash',
    url: 'https://a166aivottlinear-a.akamaihd.net/OTTB/lhr-nitro/live/clients/dash/enc/jglxtfgzxa/out/v1/28a70425aec84b55bb9d29ccd5d53f45/cenc.mpd',
    clearKeys: {
      '04e1aff27c2a13ad9aa9556501684743':'2097e55038d3cee7d69e88f4069840d1'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}       
  },
  
  {
    id: 'ligue1',
    type: 'dash',
    url: 'https://bbb.exoadash.com/TVD2083/index.mpd',
    clearKeys: {
      '696f9bf50f6acb998f01b167f116489a':'665def116bb1fab7a150652c1b8ae38b'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}       
  },
  
{
    id: 'sport2baltic',
    type: 'dash',
    url: 'https://v4-kun-v13-cdn-02.live.cdn.cgates.lt/live/dash/561209/index.mpd',
    clearKeys: {
      '5fd3f407ea7c465b854db7cd8235b39b':'0c2ad3408bb09f698e86e1ca2e26a888'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}       
},

  {
    id: 'sky1bun',
    type: 'dash',
    url: 'https://svc40.main.sl.t-online.de/LCID3221228661.originalserver.prod.sngtv.t-online.de/PLTV/88888888/224/3221228661/3221228661.mpd',
    clearKeys: {
      'c0c0220200ffebf3e256f155ae53013b':'6fab0a2dbec6f507195284a2e5c096ce'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}       
},
  {
    id: 'sky2bun',
    type: 'dash',
    url: 'https://svc40.main.sl.t-online.de/LCID3221228655.originalserver.prod.sngtv.t-online.de/PLTV/88888888/224/3221228655/3221228655.mpd',
    clearKeys: {
      '4cbc6f9ca9fe7220129d7c7f5df28855':'1d84759f8f7ddd5fb0e073bd16678c9a'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}       
},
  {
    id: 'sky3bun',
    type: 'dash',
    url: 'https://svc40.main.sl.t-online.de/LCID3221228662.originalserver.prod.sngtv.t-online.de/PLTV/88888888/224/3221228662/3221228662.mpd',
    clearKeys: {
      '34ee4effc3f8ab0f0ff07a1312c6e68e':'f2a8d0a67a34e7276c623e8e1189bbe5'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}       
},
  {
    id: 'sky4bun',
    type: 'dash',
    url: 'https://svc40.main.sl.t-online.de/LCID3221228652.originalserver.prod.sngtv.t-online.de/PLTV/88888888/224/3221228652/3221228652.mpd',
    clearKeys: {
      '8872fba0c49120db063ac1efcf634d09':'2c69687b84a950ead9f92e53092042ea'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}       
},
  {
    id: 'sky5bun',
    type: 'dash',
    url: 'https://svc40.main.sl.t-online.de/LCID3221228656.originalserver.prod.sngtv.t-online.de/PLTV/88888888/224/3221228656/3221228656.mpd',
    clearKeys: {
      '97be70d816106d7fd3510f2c89ea1979':'17ec0205682e43d6224d8aedc9c47071'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}       
},
  {
    id: 'sky6bun',
    type: 'dash',
    url: 'https://svc40.main.sl.t-online.de/LCID3221228657.originalserver.prod.sngtv.t-online.de/PLTV/88888888/224/3221228657/3221228657.mpd',
    clearKeys: {
      'ca51652d8c0f72c4f0fd476c02780652':'32f31e4161e76d2f4d85198d0f3b115a'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}       
},
  
     {
    id: 'sportv1br',
    type: 'dash',
    url: 'https://a151aivottlinear-a.akamaihd.net/OTTB/lhr-nitro/live/dash/enc/m7duvnk2bu/out/v1/d1ad69118b5647309b1eb7213affdb3d/cenc.mpd',
    clearKeys: {
      '4bbcff3289d457b4dd5dbdd21221de9a':'c4906b9a9f8dda3c0725bddb8c497733'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}       
     },

     {
    id: 'sportv2br',
    type: 'dash',
    url: 'https://otte.live.fly.ww.aiv-cdn.net/gru-nitro/live/clients/dash-sd/enc/4yiko4it8k/out/v1/b77dd424c745443aba2f3f88d418f797/cenc-sd.mpd',
    clearKeys: {
      '9009b7189e3e68cc09d17811f2beb55a':'dd3f96a94c909da48ff40c92aabf8cf3'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}       
     },
  {
    id: 'sportv2brhd',
    type: 'dash',
    url: 'https://otte.live.fly.ww.aiv-cdn.net/gru-nitro/live/clients/dash/enc/dsa3hwuhd1/out/v1/631b48c8d9ea437e8309d1a4b55acef5/cenc.mpd',
    clearKeys: {
      '3de028eafb3b2caffec03be1c1c818b3':'8fbdd8a9ae6748696bb13e547bb093fc'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}       
  },
   
   {
    id: 'sportv3br',
    type: 'dash',
    url: 'https://a151aivottlinear-a.akamaihd.net/OTTB/gru-nitro/live/clients/dash/enc/6otiglnptp/out/v1/add7499679b0422cb6791f7701f95ecc/cenc.mpd',
    clearKeys: {
      '902e5ec0e3d05e665daa32fc23f4f59e':'7b2322a273843921a43e2c61dac7cae3'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}       
   },

  {
    id: 'cazetv',
    type: 'hls',
    url: 'https://dfr80qz435crc.cloudfront.net/MNOP/Amagi/Caze/Caze_TV_BR/Caze_TV.m3u8',
    clearKeys: {
      '902e5ec0e3d05e665daa32fc23f4f59e':'7b2322a273843921a43e2c61dac7cae3'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}       
   },
  {
    id: 'cazetvb',
    type: 'dash',
    url: 'https://a56aivottepl-a.akamaihd.net/gru-nitro/live/clients/dash/enc/3ynrpdanq2/out/v1/81fd4c26584044d2b1a1cc5b32fa9af0/cenc.mpd',
    clearKeys: {
      '34475edab991ad5e92548aebd710410a':'501b209cccd323ac00bf5ac15b406cb4'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}       
   },
  {
    id: 'cazetv2',
    type: 'dash',
    url: 'https://a56aivottepl-a.akamaihd.net/gru-nitro/live/clients/dash/enc/ui54qo0g6h/out/v1/620e1448188d4bbe9a28d0dd52f45bb7/cenc.mpd',
    clearKeys: {
      'ba6aca5a550163c38d06646bb50f04e7':'516c3b471fce48a5b7a2e5ee7dd505f2'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}       
   },
  {
    id: 'cazetv3',
    type: 'dash',
    url: 'https://a56aivottepl-a.akamaihd.net/gru-nitro/live/clients/dash/enc/epg9sw6owc/out/v1/e50aecefcb294fae85d6b343e0a6f1cc/cenc.mpd',
    clearKeys: {
      '9752ef72590ef441ffa3731e0486fbc0':'db63ec7b9f11348b7cc6808a54c99457'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}       
   },
  
  {
    id: 'ufc',
    type: 'dash',
    url: 'https://a122aivottlinear-a.akamaihd.net/OTTB/syd-nitro/live/clients/dash/enc/8mxwjnh2te/out/v1/356704796c0c4bed81f67cd3518d0c8a/cenc.mpd',
    clearKeys: {
      'a49085f8da5e65af1efff0edac830b1f':'4659bc58a85c062e3fe0c039a446fe47'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}       
  },

  {
    id: 'rthk32',
    type: 'dash',
    url: 'https://rthktv32-vos-live.akamaized.net/Content/DASH/Live/channel(rthk_ch32)/master.mpd',
    clearKeys: {
      '451d2f5521f03118ab0b08fff91b7bce':'c1997f65812cdf0c0651991c6c5a8c5b'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}       
  },

   {
    id: 'psn1',
    type: 'dash',
    url: 'https://cdn3.skygo.mn/live/disk1/SPSPrime/STRM-CH2-1/SPSPrime.mpd',
    clearKeys: {
      '3501bd323a6a35c28eb7654bf298b9aa':'2db4c8089d627e1b2c480c57baa86a7b'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}       
   },
     {
    id: 'psn2',
    type: 'dash',
    url: 'https://cdn3.skygo.mn/live/disk1/SPSPlay/STRM-CH2-1/SPSPlay.mpd',
    clearKeys: {
      '3501bd323a6a35c28eb7654bf298b9aa':'2db4c8089d627e1b2c480c57baa86a7b'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}       
     },
    {
    id: 'psn3',
    type: 'dash',
    url: 'https://cdn3.skygo.mn/live/disk1/PSN3/STRM-CH2-1/PSN3.mpd',
    clearKeys: {
      '3501bd323a6a35c28eb7654bf298b9aa':'2db4c8089d627e1b2c480c57baa86a7b'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}       
    },
    {
    id: 'psn4',
    type: 'dash',
    url: 'https://cdn3.skygo.mn/live/disk1/SPSFight/DASH-FTA/SPSFight.mpd',
    clearKeys: {
      '3501bd323a6a35c28eb7654bf298b9aa':'2db4c8089d627e1b2c480c57baa86a7b'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}       
    },
    {
    id: 'psn5',
    type: 'dash',
    url: 'https://cdn3.skygo.mn/live/disk1/SPSPlus/DASH-FTA/SPSPlus.mpd',
    clearKeys: {
      '3501bd323a6a35c28eb7654bf298b9aa':'2db4c8089d627e1b2c480c57baa86a7b'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}       
    },

       {
    id: 'fubo1',
    type: 'dash',
    url: 'https://otte.live.fly.ww.aiv-cdn.net/sin-nitro/live/dash/enc/3b7qwiqzk3/out/v1/9f14895badca43e6a716db021dcd0c31/cenc.mpd',
    clearKeys: {
      'dc69b6159a0f9f0a4e03b3ff91cbacd5':'d0dcbcd7723bc40df0bf34c9c092d51f'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}       
   },
  {
    id: 'fubo1b',
    type: 'dash',
    url: 'https://otte.live.fly.ww.aiv-cdn.net/lhr-nitro/live/clients/dash/enc/y3mtc7phj2/out/v1/a48ab8dfd51c4d1f9a08774b3cd4c49e/cenc.mpd',
    clearKeys: {
      'fa5e8db5359fc7d1f15207d5de2a3ac4':'78a6c0a41972dfdba2145ae0ad4bd681'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}       
  },
  
   {
    id: 'fubo2',
    type: 'dash',
    url: 'https://otte.live.fly.ww.aiv-cdn.net/sin-nitro/live/dash/enc/uiffe4jhf0/out/v1/3534efafca8c4815adbb4d2e9a1fe003/cenc.mpd',
    clearKeys: {
      '3dcfbec0e7146928baa55210bf2cb62f':'bc85f74f815d9be5ae1dd6defaa05135'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}       
   },

 
  {
    id: 'premire1',
    type: 'dash',
    url: 'https://otte.live.fly.ww.aiv-cdn.net/gru-nitro/live/dash/enc/4zkafrcxji/out/v1/810ebca1aff0443da717da4acdeda158/cenc.mpd',
    clearKeys: {
      'd98239180d8380b3a1bb28d875b1ddf2':'cf836ced579257d1c76ae8809818e6c4'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}       
  },
  {
    id: 'premire2',
    type: 'dash',
    url: 'https://otte.live.fly.ww.aiv-cdn.net/gru-nitro/live/dash/enc/pgub1bh7o9/out/v1/7a59226197644bfaa2b00f488bd95288/cenc.mpd',
    clearKeys: {
      'fd2e8019f37211ca8b78a8b656f1b83a':'273189c214e85b43ac36298d1c422330'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}       
  },
  {
    id: 'premire3',
    type: 'dash',
    url: 'https://otte.live.fly.ww.aiv-cdn.net/gru-nitro/live/dash/enc/8ci7l7dt0d/out/v1/98fe69f2cdc041388004305e63353268/cenc.mpd',
    clearKeys: {
      '9547f9aead1237c8a3b1bf0a91ed9995':'534fab4541fef31921dd970c65d51848'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}      
  },
  {
    id: 'premire4',
    type: 'dash',
    url: 'https://otte.live.fly.ww.aiv-cdn.net/gru-nitro/live/dash/enc/zytzybatcd/out/v1/4e59aa00f6784bb98170741d40b33e3e/cenc.mpd',
    clearKeys: {
      'ce5d18ffd68650affce1985201983ab7':'397c64e42507d95e5460830918c22a98'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },
  {
    id: 'premire5',
    type: 'dash',
    url: 'https://otte.live.fly.ww.aiv-cdn.net/gru-nitro/live/dash/enc/j4y12ucrx0/out/v1/9135597c4400465e9e752dc32de587fd/cenc.mpd',
    clearKeys: {
      'd5a3ac0b892bfccdf352b6def9cb2764':'ac0936acc0036fad2273efaa42b1fafd'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },
  {
    id: 'premire6',
    type: 'dash',
    url: 'https://otte.live.fly.ww.aiv-cdn.net/gru-nitro/live/dash/enc/phxwb8s3u9/out/v1/45162b5b3c62402aa2e763b38517be9d/cenc.mpd',
    clearKeys: {
      '05cedc366ce4ec735ee4b33fcefbf01f':'475d6dd40eaba6896e02b26a6cf34d95'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}       
  },
  {
    id: 'premire7',
    type: 'dash',
    url: 'https://otte.live.fly.ww.aiv-cdn.net/gru-nitro/live/dash/enc/wczqphrl5k/out/v1/7a20b4be236a4a9484fdf5cdfcbe79d5/cenc.mpd',
    clearKeys: {
      '7ce96e01eee54fb77e5cc4e7b753d6b0':'184f94303d3357b9a7381ccdeee9b611'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}      
  },
  {
    id: 'premire8',
    type: 'dash',
    url: 'https://otte.live.fly.ww.aiv-cdn.net/gru-nitro/live/dash/enc/dabubydklo/out/v1/c272f10312ac4e81bcf2183509703dd1/cenc.mpd',
    clearKeys: {
      '7ba384f9d983c731ab1e3702c16e2faf':'f28adca4375e8a041fd22aef26440009'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}      
  },

  {
    id: 'daznfast',
    type: 'dash',
    url: 'https://ac-003.live.p7s1video.net/63f8995e/t_003/dazn-fast-hd/cenc-default.mpd',
    clearKeys: {
      '8bcec6b31cc9edcb6768ab26548e22c3':'e3c5b07328894c33734a4de6ae55a87f'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}      
  },
  {
    id: 'dazn1de',
    type: 'dash',
    url: 'https://otte.live.fly.ww.aiv-cdn.net/lhr-nitro/live/dash/enc/k2dcwnlpgr/out/v1/0502dc73a24b43a79c042bf2d14f6b84/cenc.mpd',
    clearKeys: {
      '0c900a7eae0097e0977141b68c9bffc4':'fa534e6d48eccf905a449051a5e280c8'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}      
  },
  {
    id: 'dazn2de',
    type: 'dash',
    url: 'https://otte.live.fly.ww.aiv-cdn.net/pdx-nitro/live/clients/dash/enc/wdxmrxkd70/out/v1/3b94f689049a43d082648d093a77f5f8/cenc.mpd',
    clearKeys: {
      'fe4e1cd2eea9e7ac5b365c261e41c57c':'38dd1a0751aa0f04f2035636cf0608eb'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}      
  },

  {
    id: 'dazn1it',
    type: 'dash',
    url: 'https://otte.live.fly.ww.aiv-cdn.net/dub-nitro/live/clients/dash/enc/lgk8kppclc/out/v1/f51173b6b0624a4386358ab8dfee257f/cenc.mpd',
    clearKeys: {
      '8272bf6ba46f23f9da5270057b6e028a':'74ae70dd10b4bb38ed6ffe843f3e2ccd'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },

  {
    id: 'cbsgolazo',
    type: 'dash',
    url: 'https://a151aivottlinear-a.akamaihd.net/OTTB/PDX/live/clients/dash/enc/5qz8wmdome/out/v1/b9323e853dce427eac214b77bd48a204/cenc.mpd',
    clearKeys: {
      'd9623774ac5c8c351aafe97c5fe70267':'5164e6d05164a2d65fa8fcc962aa4861'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },
  
  {
  id: 'fancode1',
  type: 'dash',
  url: 'https://otte.cache.aiv-cdn.net/iad-nitro/live/clients/dash/enc/fdb3pubmek/out/v1/aefca6420f944a9482e117f315de535f/cenc.mpd',
  clearKeys:     {      '7e9239c1982d984a002df3ed049d0756': '1b8a17598129a3618535c8fb05f103fe'    },
  origin: '',
  referer: '',
  userAgent: '',
  headers: {}
},
  {
    id: 'fancode2',
    type: 'dash',
    url: 'https://a201aivottlinear-a.akamaihd.net/OTTB/syd-nitro/live/clients/dash/enc/inpyms8ezu/out/v1/1084d5c9a97a4c5b9f9554c88f486646/cenc.mpd',
    clearKeys: {
      '065051b99bf5cf8d9a3bde5cbde6aaf9':'214bd176832872339ce184338320f9a2'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },

  {
    id: 'sky1atde',
    type: 'dash',
    url: 'https://simplitv-live.mdn.ors.at/live/eds/sky_sport_1_hd/dash/sky_sport_1_hd.mpd',
    clearKeys: {
      'd8f0663ec8283ca0aef8f12a7868afbc':'ec674895f8a0021dc0ba02da95c7fab1'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },
  {
    id: 'sky2atde',
    type: 'dash',
    url: 'https://simplitv-live.mdn.ors.at/live/eds/sky_sport_2_hd/dash/sky_sport_2_hd.mpd',
    clearKeys: {
      '8ade9637c7c73ce2a9ff418fea41d8d6':'e9e9d8af5a476a08749541071326a954'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },
  {
    id: 'sky3atde',
    type: 'dash',
    url: 'https://simplitv-live.mdn.ors.at/live/eds/sky_sport_3_hd/dash/sky_sport_3_hd.mpd',
    clearKeys: {
      '1184321e329737189b8beb6fcd88a0ce':'aa1d895be57f390e9e9a134c13b68c2a'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },
  {
    id: 'sky4atde',
    type: 'dash',
    url: 'https://simplitv-live.mdn.ors.at/live/eds/sky_sport_4_hd/dash/sky_sport_4_hd.mpd',
    clearKeys: {
      'cf96ff7fd56d39beb072d01dfe5cfdec':'10e5a0f3d923d55128021d1e706d1a21'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },
  {
    id: 'sky5atde',
    type: 'dash',
    url: 'https://simplitv-live.mdn.ors.at/live/eds/sky_sport_5_hd/dash/sky_sport_5_hd.mpd',
    clearKeys: {
      '5e47723998213e518808bbefce8ef673':'38f0b12208f2c07f249f1deb2e89e6bb'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },
  {
    id: 'sky6atde',
    type: 'dash',
    url: 'https://simplitv-live.mdn.ors.at/live/eds/sky_sport_6_hd/dash/sky_sport_6_hd.mpd',
    clearKeys: {
      'dd30fb88f1ca3d77a368e5cd302e4d2e':'3f11ab2591ce4be5fdf0b532bf1b6fcc'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },
  {
    id: 'sky7atde',
    type: 'dash',
    url: 'https://simplitv-live.mdn.ors.at/live/eds/sky_sport_7_hd/dash/sky_sport_7_hd.mpd',
    clearKeys: {
      'c7f17f8a65b63d72ac7ce48568501b74':'fe28c2683e9bb181e88f8471c2931046'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },
  {
    id: 'sky8atde',
    type: 'dash',
    url: 'https://simplitv-live.mdn.ors.at/live/eds/sky_sport_8_hd/dash/sky_sport_8_hd.mpd',
    clearKeys: {
      '8b1e79740887330c824553bc9eacca8a':'ef2c04e9d59195de14720f065ac08265'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },
  {
    id: 'sky9atde',
    type: 'dash',
    url: 'https://simplitv-live.mdn.ors.at/live/eds/sky_sport_9_hd/dash/sky_sport_9_hd.mpd',
    clearKeys: {
      'e5587464cf893abf8453921facd85c68':'61cfc0cbdc3982982b1aee03ead21493'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },
  {
    id: 'sky10atde',
    type: 'dash',
    url: 'https://simplitv-live.mdn.ors.at/live/eds/sky_sport_10_hd/dash/sky_sport_10_hd.mpd',
    clearKeys: {
      'ea78dd6d8dbd3b1eb2461d229fc9e16e':'830bce4403341f48f902eea35fdb360c'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },
  {
    id: 'sky1ats',
    type: 'dash',
    url: 'https://simplitv-live.mdn.ors.at/live/eds/sky_sport_austria_1_hd/dash/sky_sport_austria_1_hd.mpd',
    clearKeys: {
      'a34f9ab7a5563fec950689caf656670d':'c76e93190eae7b1d2a12343085895303'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },
  {
    id: 'sky2ats',
    type: 'dash',
    url: 'https://simplitv-live.mdn.ors.at/live/eds/sky_sport_austria_2_hd/dash/sky_sport_austria_2_hd.mpd',
    clearKeys: {
      '3966152269b73412a242d20266ff4dde':'fef1f9bfe73a15601d9ccd40e89db3e7'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },
  {
    id: 'sky3ats',
    type: 'dash',
    url: 'https://simplitv-live.mdn.ors.at/live/eds/sky_sport_austria_3_hd/dash/sky_sport_austria_3_hd.mpd',
    clearKeys: {
      '27eadbdda48b3e2a80ca4da0a9950634':'87f044870a3bfda02047b2170f05d47e'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },
  {
    id: 'sky4ats',
    type: 'dash',
    url: 'https://simplitv-live.mdn.ors.at/live/eds/sky_sport_austria_4_hd/dash/sky_sport_austria_4_hd.mpd',
    clearKeys: {
      'ea3f2578d9793c0d9573467485bcd26b':'e2621a0d8baf292f0f8b93203533e0f4'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },
  {
    id: 'sky5ats',
    type: 'dash',
    url: 'https://simplitv-live.mdn.ors.at/live/eds/sky_sport_austria_5_hd/dash/sky_sport_austria_5_hd.mpd',
    clearKeys: {
      'a970b0d47df7340b98eba3e1b4b77469':'b5dccb068234f0e32933fd1c039345a1'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },
  {
    id: 'sky6ats',
    type: 'dash',
    url: 'https://simplitv-live.mdn.ors.at/live/eds/sky_sport_austria_6_hd/dash/sky_sport_austria_6_hd.mpd',
    clearKeys: {
      '0a06819116d93abd86de4c49b19261dd':'ea22888183d9d9fe82884b464a3d85c1'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },
   {
    id: 'sky7ats',
    type: 'dash',
    url: 'https://simplitv-live.mdn.ors.at/live/eds/sky_sport_austria_7_hd/dash/sky_sport_austria_7_hd.mpd',
    clearKeys: {
      '01bd650456873075a7dccf2fec27fa09':'5b33ea6e3b8bb5938eaa7835190d0b6f'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },
  {
    id: 'sky8ats',
    type: 'dash',
    url: 'https://simplitv-live.mdn.ors.at/live/eds/sky_sport_austria_8_hd/dash/sky_sport_austria_8_hd.mpd',
    clearKeys: {
      'a5b64c851975392ea5638921191ec52f':'e98048ed027c6f1c555222e212f9b0fb'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },
  {
    id: 'skyf1at',
    type: 'dash',
    url: 'https://simplitv-live.mdn.ors.at/live/eds/sky_sport_f1_hd/dash/sky_sport_f1_hd.mpd',
    clearKeys: {
      '6695688f79dc36f7a41f7db13bff5aca':'22ef689af2162aefbf745cba2adb4fe9'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },
  {
    id: 'skyplat',
    type: 'dash',
    url: 'https://simplitv-live.mdn.ors.at/live/eds/sky_sport_premier_league_hd/dash/sky_sport_premier_league_hd.mpd',
    clearKeys: {
      '446af6dd9ec0395eaf5ab6adac2b8234':'a70a5944e51312f5a045b1e81651d033'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },
  {
    id: 'skymixat',
    type: 'dash',
    url: 'https://simplitv-live.mdn.ors.at/live/eds/sky_sport_mix_hd/dash/sky_sport_mix_hd.mpd',
    clearKeys: {
      'df41cd757f7033d3add1d5d7cc34b95a':'9cf69ec5ff03809f65c5d7ef73aa538c'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },
  
      {
    id: 'sky1at',
    type: 'dash',
    url: 'https://at-live-6.tentcdn.eu/bpk-tv/Sky_Sport_Austria_HD/default/index.mpd',
    clearKeys: {
      '32b74c0f2f6553f884ddaac24d8d5fa6':'cf18c1ff1fdd422263c6d459374567a4',
      '725d9e0d8544596a92de41d42f2dc2f9':'de4e7e6d9bac3c2d72c58a3dbf732068'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },
  {
    id: 'sky2at',
    type: 'dash',
    url: 'https://at-live-4.tentcdn.eu/bpk-tv/Sky_Sport_Austria_2_HD/default/index.mpd',
    clearKeys: {
      'bcbcce41861453ec95b5438b4f3b2b86':'7fe05aa2497665702da04e5e99a6480d',
      '28ce2d89fcd457e5af7eecb6ea3c45b9':'569b2b69ba8af793bbb50ad21d1492a9'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}    
  },
  {
    id: 'sky3at',
    type: 'dash',
    url: 'https://at-live-5.tentcdn.eu/bpk-tv/Sky_Sport_Austria_3_HD/default/index.mpd',
    clearKeys: {
      '8544453b8df557478659859ace15f033':'4effe5ab4521bcc3c246c8d70544f302',
      '85298520a2e25bfa9aff2f5eed4b0c74':'7642b10f3346ec8490737b155a9ba199'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}    
  },
  {
    id: 'sky4at',
    type: 'dash',
    url: 'https://at-live-6.tentcdn.eu/bpk-tv/Sky_Sport_Austria_4_HD/default/index.mpd',
    clearKeys: {
      '8544453b8df557478659859ace15f033':'4effe5ab4521bcc3c246c8d70544f302',
      '85298520a2e25bfa9aff2f5eed4b0c74':'7642b10f3346ec8490737b155a9ba199'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },
  {
    id: 'sky5at',
    type: 'dash',
    url: 'https://at-live-4.tentcdn.eu/bpk-tv/Sky_Sport_Austria_5_HD/default/index.mpd',
    clearKeys: {
      '8544453b8df557478659859ace15f033':'4effe5ab4521bcc3c246c8d70544f302',
      '85298520a2e25bfa9aff2f5eed4b0c74':'7642b10f3346ec8490737b155a9ba199'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },
  {
    id: 'sky6at',
    type: 'dash',
    url: 'https://at-live-5.tentcdn.eu/bpk-tv/Sky_Sport_Austria_6_HD/default/index.mpd',
    clearKeys: {
      'd50ac21fce985e1295f26e865c0056a8':'1a594c9e8764fd644fc7bc4fe3916307',
      '78aba2c39058536880f87c55069528c2':'da0e831a62c4ea5786b9104a42f4e760'
    },         origin: '',         referer: '',         userAgent: '',         headers: {} 
  },
  {
    id: 'sky7at',
    type: 'dash',
    url: 'https://at-live-6.tentcdn.eu/bpk-tv/Sky_Sport_Austria_7_HD/default/index.mpd',
    clearKeys: {
      'd50ac21fce985e1295f26e865c0056a8':'1a594c9e8764fd644fc7bc4fe3916307',
      '78aba2c39058536880f87c55069528c2':'da0e831a62c4ea5786b9104a42f4e760'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}    
  },
  {
    id: 'sky8at',
    type: 'dash',
    url: 'https://at-live-1.tentcdn.eu/bpk-tv/Sky_Sport_Austria_8_HD/default/index.mpd',
    clearKeys: {
      'd50ac21fce985e1295f26e865c0056a8':'1a594c9e8764fd644fc7bc4fe3916307',
      '78aba2c39058536880f87c55069528c2':'da0e831a62c4ea5786b9104a42f4e760'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}    
  },
  {
    id: 'sky9at',
    type: 'dash',
    url: 'https://at-live-6.tentcdn.eu/bpk-tv/Sky_Sport_Austria_7_HD/default/index.mpd',
    clearKeys: {
      'd50ac21fce985e1295f26e865c0056a8':'1a594c9e8764fd644fc7bc4fe3916307',
      '78aba2c39058536880f87c55069528c2':'da0e831a62c4ea5786b9104a42f4e760'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}  
  },

      {
    id: 'itv1',
    type: 'dash',
    url: 'https://otte.cache.aiv-cdn.net/bom-nitro/live/clients/dash/enc/slc1dkcymj/out/v1/dd17af8835fe4bd087d1a4e359b635d7/cenc.mpd',
    clearKeys: {
      'b6c1c527303bc577b85eb849cbab75d2':'ec533d484c550a892ff162e4a5f4dbc3'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },
  {
    id: 'itv2',
    type: 'dash',
    url: 'https://otte.cache.aiv-cdn.net/bom-nitro/live/clients/dash/enc/lveyed1ij6/out/v1/22c10ac409704decaf242d66fec34059/cenc.mpd',
    clearKeys: {
      '72ef33db7bdd6dc41ff608b371e2b257':'2a8743a5e6fab4f8adf6340ba31cdab7'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },
  {
    id: 'itv3',
    type: 'dash',
    url: 'https://otte.cache.aiv-cdn.net/bom-nitro/live/clients/dash/enc/yy7rv3xffk/out/v1/eaa04ffbf43745ee9658d1ba49db4eb2/cenc.mpd',
    clearKeys: {
      'eeed0693c4958a810e5eeb1106b6a5a8':'c3e3aba6411f9f03de7dafad12ededd8'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },
  {
    id: 'itv4',
    type: 'dash',
    url: 'https://otte.cache.aiv-cdn.net/bom-nitro/live/clients/dash/enc/ffwqzsa0zr/out/v1/752ac25588ff4607b45f3876a8e89223/cenc.mpd',
    clearKeys: {
      'ea178e28af00ed57e7101255f977c222':'f29602a280f41950d1935f0c6816dc12'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },
  {
    id: 'itvquiz',
    type: 'dash',
    url: 'https://otte.cache.aiv-cdn.net/bom-nitro/live/clients/dash/enc/qtilvakokh/out/v1/2cb8ae16abad43918e7373de26ffa860/cenc.mpd',
    clearKeys: {
      '04debf2846db9aa5ddc613906c59bd1b':'a2ca63d93ac52b53c0af0bd4face4623'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },
  {
    id: 'itv2b',
    type: 'hls',
    url: 'https://netplus.zappr.stream/itv2.m3u8',
    clearKeys: {
      '00f9f3c0783536b832a8f0326fbdc02e':'ade0533ba667bb7e9847d8f215f03076'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}   
  },
   {
    id: 'itv3b',
    type: 'hls',
    url: 'https://netplus.zappr.stream/itv3.m3u8',
    clearKeys: {
      '00f9f3c0783536b832a8f0326fbdc02e':'ade0533ba667bb7e9847d8f215f03076'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}   
  },
   {
    id: 'itv4b',
    type: 'hls',
    url: 'https://netplus.zappr.stream/itv4.m3u8',
    clearKeys: {
      '00f9f3c0783536b832a8f0326fbdc02e':'ade0533ba667bb7e9847d8f215f03076'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}   
  },

  {
    id: 'ert1',
    type: 'dash',
    url: 'https://ert-ucdn.broadpeak-aas.com/bpk-tv/ERT1/default/index.mpd',
    clearKeys: {
      '00f9f3c0783536b832a8f0326fbdc02e':'ade0533ba667bb7e9847d8f215f03076'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}   
  },
  {
    id: 'ert2',
    type: 'dash',
    url: 'https://ert-ucdn.broadpeak-aas.com/bpk-tv/ERT2/default/index.mpd',
    clearKeys: {
      '00f9f3c0783536b832a8f0326fbdc02e':'ade0533ba667bb7e9847d8f215f03076'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}   
  },
  {
    id: 'ert3',
    type: 'dash',
    url: 'https://ert-ucdn.broadpeak-aas.com/bpk-tv/ERT3/default/index.mpd',
    clearKeys: {
      '00f9f3c0783536b832a8f0326fbdc02e':'ade0533ba667bb7e9847d8f215f03076'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}   
  },
  {
    id: 'ertworld',
    type: 'dash',
    url: 'https://ert-ucdn.broadpeak-aas.com/bpk-tv/ERTWorld/default/index.mpd',
    clearKeys: {
      '00f9f3c0783536b832a8f0326fbdc02e':'ade0533ba667bb7e9847d8f215f03076'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}   
  },
  {
    id: 'erts1',
    type: 'dash',
    url: 'https://ert-ucdn.broadpeak-aas.com/bpk-tv/ERTSports1/default/index.mpd',
    clearKeys: {
      '00f9f3c0783536b832a8f0326fbdc02e':'ade0533ba667bb7e9847d8f215f03076'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}   
  },
  {
    id: 'erts2',
    type: 'dash',
    url: 'https://ert-ucdn.broadpeak-aas.com/bpk-tv/ERTSports2/default/index.mpd',
    clearKeys: {
      '00f9f3c0783536b832a8f0326fbdc02e':'ade0533ba667bb7e9847d8f215f03076'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}   
  },
  {
    id: 'erts3',
    type: 'dash',
    url: 'https://ert-ucdn.broadpeak-aas.com/bpk-tv/ERTSports3/default/index.mpd',
    clearKeys: {
      '00f9f3c0783536b832a8f0326fbdc02e':'ade0533ba667bb7e9847d8f215f03076'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}   
  },
  {
    id: 'erts4',
    type: 'dash',
    url: 'https://ert-ucdn.broadpeak-aas.com/bpk-tv/ERTSports4/default/index.mpd',
    clearKeys: {
      '00f9f3c0783536b832a8f0326fbdc02e':'ade0533ba667bb7e9847d8f215f03076'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}   
  },
  {
    id: 'erts5',
    type: 'dash',
    url: 'https://ert-ucdn.broadpeak-aas.com/bpk-tv/ERTSports5/default/index.mpd',
    clearKeys: {
      '00f9f3c0783536b832a8f0326fbdc02e':'ade0533ba667bb7e9847d8f215f03076'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}   
  },
  {
    id: 'erts6',
    type: 'dash',
    url: 'https://ert-ucdn.broadpeak-aas.com/bpk-tv/ERTSports6/default/index.mpd',
    clearKeys: {
      '00f9f3c0783536b832a8f0326fbdc02e':'ade0533ba667bb7e9847d8f215f03076'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}   
  },

    {
    id: 'infi1',
    type: 'dash',
    url: 'https://live03p-seg.msf.cdn.mediaset.net/live/ch-u1/u1-dash-widevine.isml/manifest.mpd',
    clearKeys: {
      '00f9f3c0783536b832a8f0326fbdc02e':'ade0533ba667bb7e9847d8f215f03076'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}   
  },
  {
    id: 'infi2',
    type: 'dash',
    url: 'https://live03p-seg.msf.cdn.mediaset.net/live/ch-u2/u2-dash-widevine.isml/manifest.mpd',
    clearKeys: {
      '00f9f3c0783536b834b0f0c2bfee80ac':'76b3afbf163f9c3feb6204b8fcf0ff53'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}    
  },
  {
    id: 'infi3',
    type: 'dash',
    url: 'https://live03p-seg.msf.cdn.mediaset.net/live/ch-u3/u3-dash-widevine.isml/manifest.mpd',
    clearKeys: {
      '00f9f3c0783536b8342d78d46c8c202a':'8d2e953821d36c942161be09930d2bd4'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}    
  },
  {
    id: 'infi4',
    type: 'dash',
    url: 'https://live03p-seg.msf.cdn.mediaset.net/live/ch-u4/u4-dash-widevine.isml/manifest.mpd',
    clearKeys: {
      '00f9f3c0783536b834357864bc2ae0a8':'ae7bec66e4ac23f3d243fa6e4d767a00'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}   
  },
  {
    id: 'infi5',
    type: 'dash',
    url: 'https://live03p-seg.msf.cdn.mediaset.net/live/ch-u5/u5-dash-widevine.isml/manifest.mpd',
    clearKeys: {
      '00f9f3c0783536b834b278760c5ba026':'a9ab51a9e021da177f982de9b42eb0de'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}   
  },
  {
    id: 'infi6',
    type: 'dash',
    url: 'https://live03p-seg.msf.cdn.mediaset.net/live/ch-u6/u6-dash-widevine.isml/manifest.mpd',
    clearKeys: {
      '00f9f3c0783536b834ba7888b9f960a4':'852ebe5446caa8fad99c440b86ad128c'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}   
  },
   {
    id: 'canal5it',
     type: 'dash',
    url: 'https://live03p-seg.msf.cdn.mediaset.net/live/ch-c5/c5-dash-widevine.isml/manifest.mpd',
    clearKeys: {
      '00f9f3c0783536b8ce4a30a01a52e082':'e926f7d45af4f7d154c990eae6a2d937'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}   
   },
   {
    id: 'it1',
     type: 'dash',
    url: 'https://live03p-seg.msf.cdn.mediaset.net/live/ch-i1/i1-dash-widevine.isml/manifest.mpd',
    clearKeys: {
      '00f9f3c0783536b8ee91704e23b78016':'bfd04d6f544c9cc4d35cb13ab6778587'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}    
   },

    {
    id: 'live2sg',
     type: 'dash',
    url: 'https://tglmp02.akamaized.net/out/v1/3170252e3fb0453085f2f4b0f8401a6b/manifest.mpd',
    clearKeys: {
       '60dc08aae52f4c0b806a8e43f24a12c8':'30d5b579966d822b215ec51a91d8a271'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}    
   },
   {
    id: 'aepep1',
     type: 'dash',
    url: 'https://tglmp04.akamaized.net/out/v1/400fc0702dee453bb33ebcc29466e58a/manifest.mpd',
    clearKeys: {
       '91b9592c819246c68b3b08a1fe08ba22':'fa0d80dfd865b34077bae44cd4a0c5e6'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}    
   },
  {
    id: 'aepep2',
    type: 'dash',
    url: 'https://tglmp02.akamaized.net/out/v1/cc0fc82e76cb4e0093e81695284af443/manifest.mpd',
    clearKeys: {
       'd418f733ed224f9bb9c2b1589db22a20':'6ed6fe26daa4b926810869ff60254ebb'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}    
  },
  {
    id: 'mewatch7',
    type: 'dash',
    url: 'https://tglmp04.akamaized.net/out/v1/5793335474d74566a8a0adfa260f22a9/manifest.mpd',
    clearKeys: {
       '5332345367554fd39588283a2b949d02':'8abcd0b3126923b068c26508e24c9f69'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}      
  },

   {
    id: 'sport5is',
     type: 'dash',
    url: 'https://d1zqtf09wb8nt5.cloudfront.net/livedash/oil/freetv/live/sport_5_live/live.livx',
    clearKeys: {
       'cc667cda2ff49c4500fdf1ad847d4fc0':'13a48dc2c1257fd9a119b448de5225f6'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
   },
   {
    id: 'world-sport2',
    type: 'dash',
    url: 'https://c9851ec-rbm-hilv-fsly.cdn.redbee.live/L26/6b640fa2/a765d074.isml/.mpd',
    clearKeys: {
       'adca25b8779e4168a0cd710f59f61ccf':'be5383ed3cd8079f4ffe78ad067f476a'
    },
    proxy: true, // Memaksa stream ini melewati proxy /api/manifest
    origin: '',
    referer: '',
    userAgent: '',
    headers: {}
   },
   {
    id: 'sport54k',
     type: 'dash',
    url: 'https://d1zqtf09wb8nt5.cloudfront.net/livedash/oil/freetv/live/sport_5_4k_avc/live.livx?indexMode&dvr=7200000',
    clearKeys: {
       'f1a0982764ea1efaade94a84d13bb32a':'884164e9518f12a13b7473798eebac4d'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
   },
   {
    id: 'sport5gold',
     type: 'dash',
    url: 'https://d1zqtf09wb8nt5.cloudfront.net/livedash/oil/freetv/live/sport_5_gold/live.livx?indexMode&dvr=7200000',
    clearKeys: {
       'f39088bc37945261b7570ac185a95536':'dbbd601df4236ea0f55e60d99dd70564'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
   },
   {
    id: 'sport5live',
     type: 'dash',
    url: 'https://d1zqtf09wb8nt5.cloudfront.net/livedash/oil/freetv/live/sport_5_live/live.livx?indexMode&dvr=7200000',
    clearKeys: {
       'da7c66ccf42f459c00fdf1ad847d4fc0':'13a48dc2c1257fd9a119b448de5225f6'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}   
   },
   {
    id: 'sport5plus',
     type: 'dash',
    url: 'https://d1zqtf09wb8nt5.cloudfront.net/livedash/oil/freetv/live/sport_5_plus/live.livx?indexMode&dvr=7200000',
    clearKeys: {
       '628b14b29136ae26e4ea1a6bdaea7ede':'ddafd3d32662550e624a81b8bfc4ed09'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}    
   },
   {
    id: 'sport5star',
     type: 'dash',
    url: 'https://d1zqtf09wb8nt5.cloudfront.net/livedash/oil/freetv/live/sport_5_starz/live.livx?indexMode&dvr=7200000',
    clearKeys: {
       '07e188f7cdfe89f1b157766bc4db084e':'7f531e4eed5d07f5ae187c8807b40480'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}    
   },
  {
    id: 'oneis',
     type: 'dash',
    url: 'https://d1zqtf09wb8nt5.cloudfront.net/livedash/oil/freetv/live/one_1/live.livx?indexMode&amp;dvr=7200000',
    clearKeys: {
       '3f9bd29c066a700e8b282c4a9dccf8eb':'6e3314a39d06af5553a16b8550f0691e'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}    
   },
  {
    id: 'one2is',
     type: 'dash',
    url: 'https://d1zqtf09wb8nt5.cloudfront.net/livedash/oil/freetv/live/one_2/live.livx?indexMode&amp;dvr=7200000',
    clearKeys: {
       '6f09c99d572d9c6d4d616521ee785460':'12893b12e80c3c5dbaf6b4994c8432c0'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}    
   },

  {
    id: 'sport1baltic',
    type: 'dash',
    url: 'https://v4-kun-v13-cdn-02.live.cdn.cgates.lt/live/dash/561204/index.mpd',
    clearKeys: {
       '032ba9e7db644873861490a3afc863d8':'fd29ed4731ecafba696ac68cbe870008'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },

  {
    id: 'f1mx',
  type: 'dash',
    url: 'https://aca-live-ott.izzigo.tv/8/out/u/dash/F1-HD-H265/default.mpd',
    clearKeys: {
       'ae7f16191e2adfaacd9b536ed58a298a':'3319b3ca5cd6f0af2f3d4bd9a7630a8b'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}    
},
  
    {
    id: 'skymx',
  type: 'dash',
    url: 'https://aca-live-ott.izzigo.tv/13/out/u/dash/SKY-SPORTS-HD/default.mpd',
    clearKeys: {
       '335511dfdf0d03bc06f1fdead5870b5a':'1a022fb33ad3de4d4579b04966551488'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}    
},
  {
    id: 'sky1mx',
    type: 'dash',
    url: 'https://aca-live-ott.izzigo.tv/11/out/u/dash/SKY-LIVE-EVENT-1-HD/default.mpd',
    clearKeys: {
       'a3636a51227fa338cdddf5892d8a621c':'1444ee3c4d08bf39454b914f797968eb'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}   
  },
  {
    id: 'sky2mx',
    type: 'dash',
    url: 'https://aca-live-ott.izzigo.tv/15/out/u/dash/SKY-LIVE-EVENT-2-HD/default.mpd',
    clearKeys: {
       '7239a58fb7388b222a834d549bf18d8f':'8b04a883e88dbdebc43673d998ea1cb2'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}    
  },
  {
    id: 'sky3mx',
    type: 'dash',
    url: 'https://aca-live-ott.izzigo.tv/11/out/u/dash/SKY-LIVE-EVENT-3-HD/default.mpd',
    clearKeys: {
       '561a21ad50f806b77d328dedbe59f93e':'edf3e70cc9de81a73e2a00fe9c0611a8'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },
  {
    id: 'sky4mx',
    type: 'dash',
    url: 'https://aca-live-ott.izzigo.tv/11/out/u/dash/SKY-LIVE-EVENT-4-HD/default.mpd',
    clearKeys: {
       'a931b2e953695ffb0cfd38573e97ba33':'4ddd99cc4fb168d7f0e20be8a3287100'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}   
  },
  {
    id: 'sky5mx',
    type: 'dash',
    url: 'https://aca-live-ott.izzigo.tv/12/out/u/dash/SKY-LIVE-EVENT-5-HD/default.mpd',
    clearKeys: {
       '6c89e84c52eae0428b7d2c8e887a48ec':'758a1484f920a0f1aa73e95d5f2be225'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}    
  },
  {
    id: 'sky6mx',
    type: 'dash',
    url: 'https://aca-live-ott.izzigo.tv/11/out/u/dash/SKY-LIVE-EVENT-6-HD/default.mpd',
    clearKeys: {
       'ec7229067cde06e0bedaa0d71ec0c974':'da03b65d333e74aaae446211a83c7595'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },
  {
    id: 'sky7mx',
    type: 'dash',
    url: 'https://aca-live-ott.izzigo.tv/15/out/u/dash/SKY-LIVE-EVENT-7-HD/default.mpd',
    clearKeys: {
       'd9e3024854648dd01714f781c1492c4c':'9404541975d298f6787c591d2cc871b1'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },
  {
    id: 'sky16mx',
    type: 'dash',
    url: 'https://aca-live-ott.izzigo.tv/7/out/u/dash/SKY-SPORTS-16-HD-H265/default.mpd',
    clearKeys: {
       '95b52d16d344af539ce9c2c9ff95571a':'5f035d9c4a178221f89d2439426b2e9a'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}    
  },
  {
    id: 'sky16mxb',
    type: 'dash',
    url: 'https://aca-live-ott.izzigo.tv/12/out/u/dash/SKY-SPORTS-16-HD/default.mpd',
    clearKeys: {
       'cb80e1e7d7598eaf98b1dbbe6dc14ee9':'103ae55c7948ca1d159d6743619d26c4'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}    
  },
  {
    id: 'sky21mx',
    type: 'dash',
    url: 'https://aca-live-ott.izzigo.tv/13/out/u/dash/SKY-SPORTS-21-HD/default.mpd',
    clearKeys: {
       'd8d5823d92a9ef9306a4cc4bd634b4b4':'df9fbdaa0ef9e905b75f4692f213af19'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },
  {
    id: 'sky24mx',
    type: 'dash',
    url: 'https://aca-live-ott.izzigo.tv/15/out/u/dash/SKY-SPORTS-24-HD/default.mpd',
    clearKeys: {
       'd8d5823d92a9ef9306a4cc4bd634b4b4':'df9fbdaa0ef9e905b75f4692f213af19'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },
  {
    id: 'tntmx',
    type: 'dash',
    url: 'https://nog-live1-ott.izzigo.tv/6/out/u/dash/TNT-HD-H265/default.mpd',
    clearKeys: {
       '37971d47c9e64d7584058efcfdc424b3':'9944ecda48ef3d6325ccf89ab32bef83'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },

      {
    id: 'daznf1',
      type: 'dash',
    url: 'https://otte.live.fly.ww.aiv-cdn.net/lhr-nitro/live/dash/enc/cqbcvgkb83/out/v1/4dbe05ecfb1540448d82d68eeebfbb1c/cenc.mpd',
    clearKeys: {
      '1061be12d303247426ec25e8369b2647': 'bd622b0e610295de3b0bccb850ccaaaa'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}  
    },
    {
    id: 'daznlaliga',
    type: 'dash',
    url: 'https://a151aivottlinear-a.akamaihd.net/OTTB/sin-nitro/live/dash/enc/k0duzgfejg/out/v1/70a50b1bda944628b8e7e66ab4069419/cenc.mpd',
    clearKeys: {
      '620e51b82596475517a27aa425c52280':'2b9ba811e9c5aeafc8ae1b71cdca4d6a'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}    
  },
  {
    id: 'daznhyper1',
    type: 'dash',
    url: 'https://otte.live.fly.ww.aiv-cdn.net/lhr-nitro/live/dash/enc/tu06vubgf9/out/v1/7668f47d28e345979c072e361f3d3ce3/cenc.mpd',
    clearKeys: {
      '6d08b265a6639e32da7c880d5491e3d2': '0c92556ca14b95f367993710e7cfbc94'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },
  {
    id: 'daznhyper2',
    type: 'dash',
    url: 'https://otte.live.fly.ww.aiv-cdn.net/lhr-nitro/live/dash/enc/woujvkfnmn/out/v1/141b52f08a1e4e97850219729ee48dc8/cenc.mpd',
    clearKeys: {
      '0b1fdeaee3ffc51e9a66cf1938d57aaf': '28e3cb88ab7b476b81ab8aa0624c4d71'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },
  {
    id: 'daznhyper3',
    type: 'dash',
    url: 'https://otte.live.fly.ww.aiv-cdn.net/lhr-nitro/live/dash/enc/ry1hll2vi2/out/v1/7597903045b6429d8c9ef041b2ad9d98/cenc.mpd',
    clearKeys: {
      'd8235cccf08d0ff149a20dfcd11ff68b': 'e8ea3a1ae6892eb76a73dc1b14d216d6'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },
  {
    id: 'dazn1es',
    type: 'dash',
    url: 'https://otte.live.fly.ww.aiv-cdn.net/lhr-nitro/live/dash/enc/bmnelo5c7a/out/v1/3ce2cdc4589f46189322bd3717c77957/cenc.mpd',
    clearKeys: {
      '44dd9cd370b08a868ead115fe84ecfde': 'bff19ab0a51cf14e848389b152913fd0'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}    
  },
  {
    id: 'dazn2es',
    type: 'dash',
    url: 'https://otte.live.fly.ww.aiv-cdn.net/lhr-nitro/live/dash/enc/xnk4m9bnxt/out/v1/4ced7b7329a54652b9bb0521ed38bd4d/cenc.mpd',
    clearKeys: {
      '0eab5a3f3e3b4ba5d42d40ca30d17571': 'f3f061ded9b70e8160590d5802ecda6d'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}   
  },
  {
    id: 'dazn3es',
    type: 'dash',
    url: 'https://otte.live.fly.ww.aiv-cdn.net/lhr-nitro/live/dash/enc/zy1ee5sshp/out/v1/bdcffa69fa3b4f3bb3569c9c73ee1c01/cenc.mpd',
    clearKeys: {
      'bad8efff688c0dbb3711e4a7114c22a3': '6ba800673b20776c0c850130d45e1920'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}  
  },
  {
    id: 'dazn4es',
    type: 'dash',
    url: 'https://otte.live.fly.ww.aiv-cdn.net/lhr-nitro/live/dash/enc/up7qpwch9b/out/v1/a6d5d1a1287b4893b859c2d6ccf2c65d/cenc.mpd',
    clearKeys: {
      'd27104d427e4f87e75b19395a9f8796b': '723593c70e2d4c4862754398e80168f8'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },
  {
    id: 'la1es',
    type: 'dash',
    url: 'https://bia-cf.live.pv-cdn.net/iad-nitro/live/clients/dash/enc/62qdkefv9f/out/v1/f7d5b356e048494a8325563e8916d50b/cenc.mpd',
    clearKeys: {
      'fd86dde0ae3e14ff51c8fc8f248a50db': 'd106ae78b0893da2e4393ece99420baa'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },

  {
    id: 'dubais1',
    type: 'dash',
    url: 'https://link.theplatform.eu/s/dmimain/media/dmi-prod-live-media-dubaisports1',
    clearKeys: {
      'a43ef7e1c845375f878a24b495fbc67f':'d5e70ab17dc3a56a3169af24fd09778e'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },
  {
    id: 'dubais2',
    type: 'dash',
    url: 'https://link.theplatform.eu/s/dmimain/media/dmi-prod-live-media-dubaisports2',
    clearKeys: {
      '056f6500722f39b88df4602a1aa1b23b':'2abbc2e8b8085fd3ffdbdc4c171781b8'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },

  {
    id: 'npo1',
    type: 'hls',
    url: 'https://mfdht02.cdn.tele2portal.com/live/NPO1/NPO1.isml/.m3u8',
    clearKeys: {
      'fd86dde0ae3e14ff51c8fc8f248a50db': 'd106ae78b0893da2e4393ece99420baa'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },
  {
    id: 'npo2',
    type: 'hls',
    url: 'https://mfdht02.cdn.tele2portal.com/live/NPO2/NPO2.isml/.m3u8',
    clearKeys: {
      'fd86dde0ae3e14ff51c8fc8f248a50db': 'd106ae78b0893da2e4393ece99420baa'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },
  {
    id: 'npo3',
    type: 'hls',
    url: 'https://mfdht02.cdn.tele2portal.com/live/NPO3/NPO3.isml/.m3u8',
    clearKeys: {
      'fd86dde0ae3e14ff51c8fc8f248a50db': 'd106ae78b0893da2e4393ece99420baa'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },


     {
    id: 'ziggo1b',
     type: 'dash',
    url: 'https://mag03.tvx.prd.tv.odido.nl/wh7f454c46tw75168188_-627298088/PLTV/86/224/3221241590/3221241590.mpd?zoneoffset=0&devkbps=1-7000&servicetype=1&icpid=86&accounttype=1&limitflux=-1&limitdur=-1&tenantId=3103&accountinfo=%7E%7EV2.0%7EqbcsJh_jU5C9BcZc959e_wae44b4867b3417aa76b5db2da20fe46c%7EKZzTWjB8qD1zdgbJjRPVLJX-tV0qiN9RBHC_iseGrsmTSRjj06oGDtGlpSCRGOwF3626cf085c08d024c7e4aafc18c32440%7EExtInfo5Ro3VppWiUusj2ippqUPkQ%3D%3D4a2d2c8ce133f43026d0e31b822b8474%3A20240601012829%3AUTC%2C10001003329222%2C87.212.140.171%2C20240601012829%2C3103_SP1S%2C10001003329222%2C-1%2C0%2C1%2C%2C%2C2%2C3103_Sport1%2C%2C%2C2%2C10000044444303%2C0%2C10000025050255%2CNDEzODg2NTY3MzEwMzI2NzMwNjMwNTY%3D%2C%2C%2C5%2C1%2CEND&GuardEncType=2&RTS=1717205309&from=11&hms_devid=1008&online=1717205309&mag_hms=1008,311,305&_=1717205322621',
    clearKeys: {
       'ef34ae91b4f2415e8439b2ad105e7488':'243248d8de1ff8c7c587ee2057317523'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
   },
    {
    id: 'ziggo2b',
      type: 'dash',
    url: 'https://mag03.tvx.prd.tv.odido.nl/wh7f454c46tw266117884_-1972819316/PLTV/86/224/3221241560/3221241560.mpd?accountinfo=~~V2.0~OhA1DF4svOZppKxb-t-Ngw144cce44121c63284a33d5453493e5c8~1_Fmlu5PevHMYnEi9Z_HX2goKAd0VHSuxZMoIcAXcawYvG1meqGp2eQ2Ibhjvh7e59e7f6df3d57f23a32024ad67f0f19dc:UTC,',
    clearKeys: {
       '3cfa8625f650406ebf6a4d1ea737f572':'0534e747c70b364aa7210e1bf3191df0'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}
    },
   {
    id: 'ziggo3b',
     type: 'dash',
    url: 'https://mag02.tvx.prd.tv.odido.nl/wh7f454c46tw407556707_-381738111/PLTV/86/224/3221241511/3221241511.mpd?accountinfo=~~V2.0~yVi0dMX4icO5Ka9e92EQfg8812e1c1044f7d357066472e3ee99ef4~2dRB9E-vDtoAbYl169LbcJpxUgWVJtbeU_PlhGfNUflphvljOb5VaEhxruETYG9qcccaf5c5b655bf7504ed7ec5a1dd798f:UTC,',
    clearKeys: {
       '4dbea4b5713a4aa1ae3a2544cd522fc7':'a8323ea99b2d6200a48e1bc27322d548'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}
   },
  {
    id: 'ziggo4b',
     type: 'dash',
    url: 'https://mag01.tvx.prd.tv.odido.nl/wh7f454c46tw523693457_1808344289/PLTV/86/224/3221241652/3221241652.mpd?zoneoffset=0&devkbps=1-7000&servicetype=1&icpid=86&accounttype=1&limitflux=-1&limitdur=-1&tenantId=3103&accountinfo=%7E%7EV2.0%7Eu0jaHTa0MTNW18tBSpXw1Ad47f31195be578ee163e34a9e557d481%7E-tEuN4yI47Z49lA_lxVw3r26rEF-eIM-4N-YRBTnBjXeDlL3yoAcCSTfh367bmnJfe93264045ad9787422349ffe59c4e2f%7EExtInfo5Ro3VppWiUusj2ippqUPkQ%3D%3D4a2d2c8ce133f43026d0e31b822b8474%3A20240601013557%3AUTC%2C10001003329222%2C87.212.140.171%2C20240601013557%2C3103_SP1T%2C10001003329222%2C-1%2C0%2C1%2C%2C%2C2%2C3103_Sport1%2C%2C%2C2%2C10000044444303%2C0%2C10000025050255%2CNDEzODg2NTY3MzEwMzI2NzMwNjMwNTY%3D%2C%2C%2C5%2C1%2CEND&GuardEncType=2&_=1717205757900&RTS=1717205758&from=11&hms_devid=538&online=1717205758&mag_hms=538',
    clearKeys: {
       'b5c04cfb6da84104ba5bbe51cd065b12':'d96561be4819d3ed4e5f4f54015baaca'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}
   },
   {
    id: 'ziggo5b',
     type: 'dash',
    url: 'https://mag04.tvx.prd.tv.odido.nl/wh7f454c46tw865586829_-819821292/PLTV/86/224/3221241610/3221241610.mpd?accountinfo=~~V2.0~LNS2PBO5tyhp5z1Pe6ObBA6cd7a4ec35c4492167b9376e6dff2932~BZw2dESHw-I1PQCFh9gGxCMvrIIzgMdYAe900qj8l6aoXUX9ahyR6I9EUIu7nDR4f4887615c83ea7a8cee6dd33137c4ebe:UTC,',
    clearKeys: {
       '3fb40d85724942f994d86943f48021db':'a6da8742502c8a2153067f5f2a70fb02'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
   },
   {
    id: 'ziggo6b',
     type: 'dash',
    url: 'https://mag03.tvx.prd.tv.odido.nl/wh7f454c46tw1024019879_757686866/PLTV/86/224/3221241521/3221241521.mpd?accountinfo=~~V2.0~URnD_afuosWHfY5OEqRXOwfa01c8ac56cf4511de39c2c4a3cab278~iVxKjbtf2gx_dYFqI-vt5C4Cu3COYDjZaw6C_kO2T2wm30fwo1ctD1gr_e2PrgTh48867c3177f3c34842031623cb2e06c9:UTC,',
    clearKeys: {
       '1a0ffa532aa2498490826e2f6a37f7c9':'a8cec27bc7d47909c5b0d8f473b43e8d'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}    
   },

  {
    id: 'espn1bo',
       type: 'dash',
    url: 'https://vcdn.mn10.entel.bo/Content/DASH/Live/Channel(8757cb0a-3584-40cd-901e-8937c7deba83)/master.mpd',
    clearKeys: {
       'cb004fb100bd92f23793562891e3236b':'b3e4e74ae2080b137e68bbd0ef8a7e05'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
     },
    {
    id: 'espn2bo',
       type: 'dash',
    url: 'https://vcdn.mn10.entel.bo/Content/DASH/Live/Channel(62567d5c-295c-4ffd-ac7e-c9749e874884)/master.mpd',
    clearKeys: {
       'a81ee4a694fecd6aa8a682e5024b313c':'6d15568e1dab59e7202ae12e71505185'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
     },
  {
    id: 'espn3bo',
       type: 'dash',
    url: 'https://vcdn.mn10.entel.bo/Content/DASH/Live/Channel(a38d1401-ee01-4802-812a-7cb460c9832c)/master.mpd',
    clearKeys: {
       '8a60d7889ff126ee1895335e92254f8e':'de1b0ce19fa804a1c473eb8ef2d5cf6d'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
     },
  {
    id: 'espn4bo',
       type: 'dash',
    url: 'https://vcdn.mn10.entel.bo/Content/DASH/Live/Channel(9500bf02-0001-4199-a150-58dc5d692cca)/master.mpd',
    clearKeys: {
       '54a2c11085c315ed6ff85c340a86095d':'5f0d10cf4a5c7e22e286b7e8cb4e79f4'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
     },
  {
    id: 'espn5bo',
       type: 'dash',
    url: 'https://vcdn.mn10.entel.bo/Content/DASH/Live/Channel(80c74968-a2ef-4005-8661-045fe97408a8)/master.mpd',
    clearKeys: {
       '4e126297fc7af35c736bdffe98eecaaa':'fdb0091cf67d9c596dbfb07cf6f4c8f5'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
     },
  {
    id: 'espn6bo',
       type: 'dash',
    url: 'https://vcdn.mn10.entel.bo/Content/DASH/Live/Channel(b30aa51e-97fa-4354-bb38-871fb360e984)/master.mpd',
    clearKeys: {
       'f5836382452cdca1e1c8bf8b9a713534':'7d261930c3309ed2b06d2abb34a64410'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
     },
  {
    id: 'espn7bo',
       type: 'dash',
    url: 'https://vcdn.mn10.entel.bo/Content/DASH/Live/Channel(5ab5db84-2235-4c10-9066-be9bc2ee087a)/master.mpd',
    clearKeys: {
       '98ea1e32227adcd3618baac2bbf36814':'72a03a09d33e412f14a9bfa4ef24b542'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
     },


     {
    id: 'espn1nl',
       type: 'dash',
    url: 'https://mag02.tvx.prd.tv.odido.nl/wh7f454c46tw263607846_-506634908/PLTV/42/224/3221237151/3221237151.mpd?zoneoffset=0&devkbps=1-7000&servicetype=1&icpid=42&accounttype=1&limitflux=-1&limitdur=-1&tenantId=3103&accountinfo=%7E%7EV2.0%7EDe_V7dONdiLmDTIXZJVjFQ4e9198ddf5c717dc8220f5260f5babf5%7EYWLKBE5mOzXaHhFihQw3yKABqIwJl8s_smDxn2cQbqJp09IZCiGMid2G4mq4oiin1bf05b2bf40c6872c86b8ec1ff3d1863%7EExtInfoaVv0w75bG4yPFxLChlA61w%3D%3Df323d84652d62ad20444009f681eb9ab%3A20240531144721%3AUTC%2C10001003332628%2C145.128.205.77%2C20240531144721%2C3103_FS1%2C10001003332628%2C-1%2C0%2C1%2C%2C%2C2%2C3103_BasispakketTV%2C%2C%2C2%2C10000044444303%2C0%2C10000025050255%2CMzk0OTAzNjMyMzMxMDMyNjczMDYzMDU2%2C%2C%2C5%2C1%2CEND&GuardEncType=2&RTS=1717166843&from=16&hms_devid=1014&online=1717166843&mag_hms=1014,296,298&_=1717166857141',
    clearKeys: {
       '7e4242db04e642a3bfeee4322f6c3309':'f888913716258cab8bda7217ed116958'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
     },
     {
    id: 'espn2nl',
       type: 'dash',
    url: 'https://mag02.tvx.prd.tv.odido.nl/wh7f454c46tw3480132229_1148556782/PLTV/42/224/3221236705/3221236705.mpd?zoneoffset=0&devkbps=1-7000&servicetype=1&icpid=42&accounttype=1&limitflux=-1&limitdur=-1&tenantId=3103&accountinfo=%7E%7EV2.0%7ES_G5x_0rj0SxLLnkih2Gswcf5b95e61987253d0dcefc8dddf58abf%7ET8F9HZIZoFqKaUS-1u6soSS9Q-AB4_8iVhn_tBpWq2zo6uSpvV18emE3i5OFed7Kf5478a52478d7d9caf191d034489a482%7EExtInfo5Ro3VppWiUusj2ippqUPkQ%3D%3D4a2d2c8ce133f43026d0e31b822b8474%3A20240601011339%3AUTC%2C10001003329222%2C87.212.140.171%2C20240601011339%2C3103_FS2%2C10001003329222%2C-1%2C0%2C1%2C%2C%2C2%2C3103_FOXSportsCompleet%2C%2C%2C2%2C10000044444303%2C0%2C10000025050255%2CNDEzODg2NTY3MzEwMzI2NzMwNjMwNTY%3D%2C%2C%2C5%2C1%2CEND&GuardEncType=2&RTS=1717204419&from=11&hms_devid=299&online=1717204419&mag_hms=299&_=1717204444514',
    clearKeys: {
       '877c908de48c4587a26bcf15e69209e9':'3fa8773739511fd77a34df324baca236'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
     },
     {
    id: 'espn3nl',
       type: 'dash',
    url: 'https://mag02.tvx.prd.tv.odido.nl/wh7f454c46tw3793419033_-522250660/PLTV/42/224/3221240625/3221240625.mpd?zoneoffset=0&devkbps=1-7000&servicetype=1&icpid=42&accounttype=1&limitflux=-1&limitdur=-1&tenantId=3103&accountinfo=%7E%7EV2.0%7E1u4Nx72r4CScDnP9TleJ7Qe133597d301c5ac6606d70bcf6c80fb8%7EoYDAN7_me0l9gzBpq2jqroyCj90JVYN0pnjnV-z5mnx7FsBl0m2bU2rcLYgJPLV9d65a90b8fed763e73042f21ec56dd4a2%7EExtInfo5Ro3VppWiUusj2ippqUPkQ%3D%3D4a2d2c8ce133f43026d0e31b822b8474%3A20240601011852%3AUTC%2C10001003329222%2C87.212.140.171%2C20240601011852%2C3103_FS3%2C10001003329222%2C-1%2C0%2C1%2C%2C%2C2%2C3103_FOXSportsCompleet%2C%2C%2C2%2C10000044444303%2C0%2C10000025050255%2CNDEzODg2NTY3MzEwMzI2NzMwNjMwNTY%3D%2C%2C%2C5%2C1%2CEND&GuardEncType=2&_=1717204732627&RTS=1717204732&from=16&hms_devid=296&online=1717204732&mag_hms=296',
    clearKeys: {
       '81ef5e3512df4254bc6f84cad8afd28b':'be79c7f7e552369bb3dd6ed50dfc564f'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
     },
     {
    id: 'espn4nl',
       type: 'dash',
    url: 'https://mag03.tvx.prd.tv.odido.nl/wh7f454c46tw3938405433_768685155/PLTV/42/224/3221240640/3221240640.mpd?zoneoffset=0&devkbps=1-7000&servicetype=1&icpid=42&accounttype=1&limitflux=-1&limitdur=-1&tenantId=3103&accountinfo=%7E%7EV2.0%7E_J2lSgjaV4brjHkpDbKgYAb925ce73ca161fcae24d173988874292%7EJ7k3cOwkqNuKBfK4KFrq-3IvfHM25Whz1GWtgGDrLwOR4I5z7hcrNY5Jh37NbThta2e5491a5d1cd1c427ea79d052b77441%7EExtInfo5Ro3VppWiUusj2ippqUPkQ%3D%3D4a2d2c8ce133f43026d0e31b822b8474%3A20240601012117%3AUTC%2C10001003329222%2C87.212.140.171%2C20240601012117%2C3103_FS4%2C10001003329222%2C-1%2C0%2C1%2C%2C%2C2%2C3103_FOXSportsCompleet%2C%2C%2C2%2C10000044444303%2C0%2C10000025050255%2CNDEzODg2NTY3MzEwMzI2NzMwNjMwNTY%3D%2C%2C%2C5%2C1%2CEND&GuardEncType=2&RTS=1717204877&from=14&hms_devid=307&online=1717204877&mag_hms=307&_=1717204890918',
    clearKeys: {
       '881667cba813441295cf85501dbb6e98':'d91f5dc38fd720ca7e67a05ad512c0ef'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
     },


     {
    id: 'dsport1',
       type: 'dash',
    url: 'https://otte.live.fly.ww.aiv-cdn.net/gru-nitro/live/clients/dash/enc/ubehitlwzo/out/v1/8e09c381a51f4366a19e979418112e8f/cenc.mpd',
    clearKeys: {
       'a7d11d37a1f7611ee88d4db880171f32':'68f96d618b0b956b008c445896a25a79'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
     },
     {
    id: 'dsport2',
       type: 'dash',
    url: 'https://otte.live.fly.ww.aiv-cdn.net/gru-nitro/live/clients/dash/enc/rgilyeubta/out/v1/09a67027b18f4fd78aaa3794a2aacfe8/cenc.mpd',
    clearKeys: {
       '03f12d6a3dbfd3a6fa7dd7f6417e0c11':'ea07b87acdf2e45be824cde4a1cf3504'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
     },
     {
    id: 'dsportplus',
       type: 'dash',
    url: 'https://otte.live.fly.ww.aiv-cdn.net/gru-nitro/live/clients/dash/enc/ud6bnhthpj/out/v1/2639a2f4480f4269953de466d5f46463/cenc.mpd',
    clearKeys: {
       '83f81c4cc1443991543de4e22eea7586':'ddfd7ca653d6f35543d8edb3c688e20f'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
     },
   {
    id: 'dsport1sd',
       type: 'dash',
    url: 'https://otte.live.fly.ww.aiv-cdn.net/gru-nitro/live/clients/dash-sd/enc/hubonmgf5k/out/v1/10560d92577e4917973aa4624124ecd6/cenc-sd.mpd',
    clearKeys: {
       '45bbd582f220f438f896450d8306a3f2':'582c6ba7f64bbc0f2d91c6b0c265760c'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
     },
     {
    id: 'dsport2sd',
       type: 'dash',
    url: 'https://otte.live.fly.ww.aiv-cdn.net/gru-nitro/live/clients/dash-sd/enc/hufm7lgnhx/out/v1/5045630288d44123ba85427b2c36f29f/cenc-sd.mpd',
    clearKeys: {
       '18044a84b7e6c1bbf852591797e53a2c':'38b3b6f8810917d89636927bddb79294'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
     },
  {
    id: 'dsportplussd',
       type: 'dash',
    url: 'https://otte.live.fly.ww.aiv-cdn.net/gru-nitro/live/clients/dash-sd/enc/kp7qfx2tly/out/v1/bbfb730b45b74d4ea875d75786ea3f13/cenc-sd.mpd',
    clearKeys: {
       '8afa490e1640be969729fb459182e4ec':'6f129820cdd5b6978a98c604c72cf05b'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
     },

      {
    id: 'espn1mx',
      type: 'dash',
    url: 'https://aca-live-ott.izzigo.tv/6/out/u/dash/ESPN-HD-H265/default.mpd',
    clearKeys: {
       '3fb8167957692836eca1464b7f952b45':'f31042e8167eb4b49ce8117c9e5f1e85'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}   
    },
      {
    id: 'espn2mx',
        type: 'dash',
    url: 'https://aca-live1-ott.izzigo.tv/7/out/u/dash/ESPN-2-HD-H265/default.mpd',
    clearKeys: {
       'faa2d2197cc44dc154650bbacb0dc238':'9859d70c856660e20bbe6896f9cd3048'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}   
      },
     {
    id: 'espn3mx',
       type: 'dash',
    url: 'https://aca-live1-ott.izzigo.tv/6/out/u/dash/ESPN-3-HD-H265/default.mpd',
    clearKeys: {
       '10580600369dbd7ac029f7e737247917':'24ef48adb31daa130675c2a502da6982'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}   
     },
     {
    id: 'espn4mx',
       type: 'dash',
    url: 'https://aca-live1-ott.izzigo.tv/6/out/u/dash/ESPN-4-HD-H265/default.mpd',
    clearKeys: {
       '1d2d7f1116eeec62d19943a892d721f7':'033b809769a3c248af7383aa817fce72'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
     },

  {
    id: 'hisportmx',
       type: 'dash',
    url: 'https://aca-live-ott.izzigo.tv/12/out/u/dash/HI-SPORTS-SD/default.mpd',
    clearKeys: {
       'f2966ad533e52a19c3ded1c7b9e40370':'2e0bb20e3edb3ce7fc0d616b3ff28748'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
     },
     {
    id: 'tudnmx',
      type: 'dash',
    url: 'https://aca-live-ott.izzigo.tv/1/out/u/dash/TUDN-HD/default.mpd',
    clearKeys: {
       '2722647f77b44824c432a3c4555830a2':'1734befb82f4b438bd84195f6c212e7b'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}   
    },
      {
    id: 'tudnmxb',
      type: 'dash',
    url: 'https://otte.cache.aiv-cdn.net/bom-nitro/live/clients/dash-sd/enc/1a5vdd4i8j/out/v1/db14823b937045ac8b2b0effbcdded45/cenc-sd.mpd',
    clearKeys: {
       '5f096c1f9e243b31ddc3bf4f5d88fc5f':'27334536d6077737b321c64663ebf59d'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}   
    },
  {
    id: 'canal5mx',
      type: 'dash',
    url: 'https://otte.cache.aiv-cdn.net/bom-nitro/live/clients/dash/enc/ntkdl68eob/out/v1/bd5dfb7676994383881bc6e71877d29d/cenc.mpd',
    clearKeys: {
       'd695093ea3e66d75a4d213a3e2cbf360':'01be3f645e89a067d2786c295f68dde4'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}   
    },
  {
    id: 'azteca7mx',
    type: 'dash',
    url: 'https://zap-live1-ott.izzigo.tv/14/out/u/dash/AZTECA-7-HD/default.mpd',
    clearKeys: {
       'c15a10921bed75a3ec5385e0ecdb6499':'4e44df62547a1544a4623418918658d0'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}   
  },
  {
    id: 'madridtvmx',
    type: 'dash',
    url: 'https://aca-live-ott.izzigo.tv/14/out/u/dash/REAL-MADRID-HD/default.mpd',
    clearKeys: {
       '77e93f69c2d4c23e2cf8dc9E892f4ac7':'71a786d7774d6df4487494145db485a4'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}   
  },
  {
    id: 'globo',
    type: 'dash',
    url: 'https://nog-live1-ott.izzigo/3/out/u/dash/TV-GLOBO-SD/default.mpd',
    clearKeys: {
       '29852829d373dfb35df80c5fa1d9bff0':'ceb31ec6a6d90090f490b54f524a27b4 '
    },         origin: '',         referer: '',         userAgent: '',         headers: {}    
  },

     {
    id: 'nbaizzi',
    type: 'dash',
    url: 'https://aca-live-ott.izzigo.tv/7/out/u/dash/NBA-HD-H265/default.mpd',
    clearKeys: {
       '08f8fb6d69482c151f73dd8461dca352':'8aea016cd974cb95e8bf030b196f4818'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}   
  },
      {
    id: 'foxpremx',
        type: 'dash',
    url: 'https://nog-live1-ott.izzigo/1/out/u/dash/FOX-SPORTS-PREMIUM-HD/default.mpd',
    clearKeys: {
       '0fefd5d94a8cb5b40c057ab182f7dc27':'5548c4823ff7f1ea61bafb7cbc19e005'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
      },
 {
    id: 'fox1mx',
   type: 'dash',
    url: 'https://nog-live1-ott.izzigo/1/out/u/dash/FOX-SPORTS-HD/default.mpd',
    clearKeys: {
       '9e276bd34034a2c4dcf61d74e1242fbf':'4b466a4affb61d2672a4194b14e10ef2'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}    
 },
  {
    id: 'fox2mx',
    type: 'dash',
    url: 'https://nog-live1-ott.izzigo/4/out/u/dash/FOX-SPORTS-2-HD/default.mpd',
    clearKeys: {
       '23986dae03fa883ed8e489cbf70f9ec3':'6a42c42732a9dd1da1205971b2c5c535'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}    
  },
  {
    id: 'fox3mx',
    type: 'dash',
    url: 'https://nog-live1-ott.izzigo/1/out/u/dash/FOX-SPORTS-3-HD/default.mpd',
    clearKeys: {
       'ed8dd7562fd9f9064bed8d52fa42cc11':'d65a22cfe5bfbd33d8d25b183649e44f'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}    
  },

  {
    id: 'foxonemx',
     type: 'dash',
    url: 'https://otte.live.fly.ww.aiv-cdn.net/iad-nitro/live/clients/dash/enc/worucjnctz/out/v1/20ac5ecdc9b848dc92e7f1188bdf6ff6/cenc.mpd',
    clearKeys: {
       '8ec2e6248abe2e10e16e439c9b85ffd8':'f121b015c2a5197828355fb6a874c297'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}    
   },
   {
    id: 'foxpremxa',
     type: 'dash',
    url: 'https://otte.live.fly.ww.aiv-cdn.net/iad-nitro/live/clients/dash/enc/fdx74zqzhu/out/v1/7d7a8c6981a842b98a683e9fbfe51d17/cenc.mpd',
    clearKeys: {
       '9f327d24c66fbd84e15ab5c9ead7c7a4':'83837185529c0c4048f81386c2d36426'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}    
   },
  {
    id: 'fox1mxa',
    type: 'dash',
    url: 'https://otte.live.fly.ww.aiv-cdn.net/iad-nitro/live/clients/dash/enc/oboxe53wyo/out/v1/f7892a9d706d419a846d738fa22ea33e/cenc.mpd',
    clearKeys: {
       '2fbdaa3bea0d0323ae011b318d1db716':'8726ef7eaf5b9dce15fb6aa9f80bd53f'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },
  {
    id: 'fox2mxa',
    type: 'dash',
    url: 'https://otte.live.fly.ww.aiv-cdn.net/iad-nitro/live/clients/dash/enc/tepjqej1ys/out/v1/c9c9159baee749a19612b1598495859a/cenc.mpd',
    clearKeys: {
       '8836fb04d62dc64c9f8a39ef8640d5eb':'d4f05ce56c5231b7cdf53455bea58621'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}    
  },
  {
    id: 'fox3mxa',
    type: 'dash',
    url: 'https://otte.live.fly.ww.aiv-cdn.net/iad-nitro/live/clients/dash/enc/wybgz0orr8/out/v1/2f6d1612abd44f5883917f8a585b955f/cenc.mpd',
    clearKeys: {
       '11c8c1c2ef0385cf1e64d44bb9c3a395':'5769730ffbdc4b2fd8945929d9ace063'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}   
  },
  {
    id: 'foxdepor',
    type: 'dash',
    url: 'https://a151aivottlinear-a.akamaihd.net/OTTB/pdx-nitro/live/clients/dash/enc/hm5nmxzgr4/out/v1/21aca259874c427c9ef9dc808b46f50f/cenc.mpd',
    clearKeys: {
       'd1a163914db8ffad2c3e94f979896a0d':'9728800a3959aafdd5b0bcfbf3768811'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },
  {
    id: 'nflmx',
    type: 'dash',
    url: 'https://nog-live1-ott.izzigo/1/out/u/dash/NFL-HD/default.mpd',
    clearKeys: {
       '9b40cafa23cb7de8418bae6c66159f3a':'b1bde4692ea730163539adc9a84cc488'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}   
  },

   {
    id: 'skysport1nz4k',
         type: 'dash',
    url: 'https://sky.senbonzakurakageyoshi.workers.dev/snz/channel/294921/index.mpd',
    clearKeys: {
      '4d346b1d1ae64d4a800409cffa14983e':'208c972bd2da4359ac94e6944fe378b6'
    },         origin: 'https://play2.gomoon.live.datakameha.xyz',         referer: 'https://play2.gomoon.live.datakameha.xyz/',         userAgent: '',         headers: {}     
       },
     {
    id: 'skysport1nz',
         type: 'dash',
    url: 'https://sky.senbonzakurakageyoshi.workers.dev/snz/channel/219026/index.mpd',
    clearKeys: {
      'aefc2c8d1c8840f1b6981f856c9269ba':'cf8ea114c45b4d6596b2748258ab74d6'
    },         origin: 'https://play2.gomoon.live.datakameha.xyz',         referer: 'https://play2.gomoon.live.datakameha.xyz/',         userAgent: '',         headers: {}     
       },
  {
    id: 'skysport2nz',
    type: 'dash',
    url: 'https://sky.senbonzakurakageyoshi.workers.dev/snz/channel/219027/index.mpd',
    clearKeys: {
      '708a98b352bd4418a73a028edd84da8f':'b1fa5c2bca4c4b57b924b748564532cb'
    },         origin: 'https://play2.gomoon.live.datakameha.xyz',         referer: 'https://play2.gomoon.live.datakameha.xyz/',         userAgent: '',         headers: {}     
  },
  {
    id: 'skysport3nz',
    type: 'dash',
    url: 'https://dice-live-oc.akamaized.net/hdntl=exp=1778407474~acl=%2f*~id=a3f8fcaa-a5d7-4f58-926e-cd87fb75254b~data=hdntl,aXA9MjA4Ljg3LjI0Mi4yMyZleHA9MTc3ODMyMTEwNCZlaWQ9OTM1NTQ2Jm9pZD0xNTQmdHlwZT1WT0QmdWlkPXhSUnFvOXxiY2FlYTdjZi1jMzM3LTQwMzktODE1OC0zYzFjZTQ5ZTcyOTMmY2lkPWRjZS5maXNmZWQmcHQ9bnVsbA~hmac=5e008a65781df5e76ffd7a194204775401fd367354a6c0a48699a1c7eaed36ba/dash/live/2093717/219028-321030/manifest-d.mpd',
    clearKeys: {
      '2e2636daa74141b68cc14882ea3ff82b':'0961f48287324adbb4b7ff3c9d82b3c9'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}    
  },
  {
    id: 'skysport4nz',
    type: 'dash',
    url: 'https://sky-nz.b-cdn.net/skysport4/master.mpd',
    clearKeys: {
      '278b8746b7c7410e901af0aa3774f037':'15e1142d647b474ebbd49e41efa2a9d7'
    },         origin: 'https://play2.gomoon.live.datakameha.xyz',         referer: 'https://play2.gomoon.live.datakameha.xyz/',         userAgent: '',         headers: {}     
  },
  {
    id: 'skysport5nz',
    type: 'dash',
    url: 'https://sky.senbonzakurakageyoshi.workers.dev/snz/channel/219032/index.mpd',
    clearKeys: {
      'fdd24dd2c6c14126ad7c1ad1066b03dd':'08289c6d57d54e8d8dca55e1862afb82'
    },         origin: 'https://play2.gomoon.live.datakameha.xyz',         referer: 'https://play2.gomoon.live.datakameha.xyz/',         userAgent: '',         headers: {}      
  },
  {
    id: 'skysport6nz',
    type: 'dash',
    url: 'https://dice-live-oc.akamaized.net/hdntl=exp=1779070453~acl=%2f*~id=ac995ce9-4460-4baf-aa98-8964bf914c77~data=hdntl,aXA9NTIuMTYxLjU2LjcwJmV4cD0xNzc4OTg0MDgzJmVpZD05MzU1NDYmb2lkPTE1NCZ0eXBlPVZPRCZ1aWQ9YWRjV1lXfGI2MGFmMjk5LTAzOTEtNGQxZi1hNmQwLWQ4MjQ0ZGZhZjFjOSZjaWQ9ZGNlLmZpc2ZlZCZwdD1udWxs~hmac=f6b8f98b065a74d282a69083cc879a3b075e09696d12209ba9f1048055d753b7/dash/live/2093709/219033-321024/manifest-d.mpd',
    clearKeys: {
      'e87521b3dfa44ed9ba004012dcb89172':'bba9734a9d724531bbab7ef5d64ca1f8'
    },         origin: 'https://play2.gomoon.live.datakameha.xyz',         referer: 'https://play2.gomoon.live.datakameha.xyz/',         userAgent: '',         headers: {}    
  },
  {
    id: 'skysport7nz',
    type: 'dash',
    url: 'https://dice-live-oc.akamaized.net/hdntl=exp=1779070453~acl=%2f*~id=ac995ce9-4460-4baf-aa98-8964bf914c77~data=hdntl,aXA9NTIuMTYxLjU2LjcwJmV4cD0xNzc4OTg0MDgzJmVpZD05MzU1NDYmb2lkPTE1NCZ0eXBlPVZPRCZ1aWQ9YWRjV1lXfGI2MGFmMjk5LTAzOTEtNGQxZi1hNmQwLWQ4MjQ0ZGZhZjFjOSZjaWQ9ZGNlLmZpc2ZlZCZwdD1udWxs~hmac=f6b8f98b065a74d282a69083cc879a3b075e09696d12209ba9f1048055d753b7/dash/live/2093711/219034-321026/manifest-d.mpd',
    clearKeys: {
      'af95024eda94455e922b90a39a3af93e':'852e715ef4064b05b8e1cdee285648b5'
    },         origin: 'https://play2.gomoon.live.datakameha.xyz',         referer: 'https://play2.gomoon.live.datakameha.xyz/',         userAgent: '',         headers: {}     
  },
  {
    id: 'skysport8nz',
    type: 'dash',
    url: 'https://dice-live-oc.akamaized.net/hdntl=exp=1779070453~acl=%2f*~id=ac995ce9-4460-4baf-aa98-8964bf914c77~data=hdntl,aXA9NTIuMTYxLjU2LjcwJmV4cD0xNzc4OTg0MDgzJmVpZD05MzU1NDYmb2lkPTE1NCZ0eXBlPVZPRCZ1aWQ9YWRjV1lXfGI2MGFmMjk5LTAzOTEtNGQxZi1hNmQwLWQ4MjQ0ZGZhZjFjOSZjaWQ9ZGNlLmZpc2ZlZCZwdD1udWxs~hmac=f6b8f98b065a74d282a69083cc879a3b075e09696d12209ba9f1048055d753b7/dash/live/2093712/219035-321027/manifest-d.mpd',
    clearKeys: {
      '7a2758575dc04d63acc3573ab594d441':'47071dd80de746a38cdc6a4dcde21abc'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}    
  },
  {
    id: 'skysport9nz',
    type: 'dash',
    url: 'https://dice-live-oc.akamaized.net/hdntl=exp=1779070452~acl=%2f*~id=6b7ee9f0-7edd-4c57-bc78-800cff2e09b4~data=hdntl,aXA9NTIuMTYxLjU2LjcwJmV4cD0xNzc4OTg0MDgyJmVpZD05MzkxOTcmb2lkPTE1NCZ0eXBlPVZPRCZ1aWQ9YWRjV1lXfGI2MGFmMjk5LTAzOTEtNGQxZi1hNmQwLWQ4MjQ0ZGZhZjFjOSZjaWQ9ZGNlLmZpc2ZlZCZwdD1udWxs~hmac=7ca2a63f4cd71f4cf3a24c71c8ee747d377a706a625387cf6f8b1d4feb311f1e/dash/live/2093716/219036-321029/manifest-d.mpd',
    clearKeys: {
      '72002c630e2343849984b5d3ec418162':'ae6f8e3ff42a4963ae25686cca56c8e8'
    },         origin: 'https://play2.gomoon.live.datakameha.xyz',         referer: 'https://play2.gomoon.live.datakameha.xyz/',         userAgent: '',         headers: {}      
  },
  {
    id: 'skysportselectnz',
    type: 'dash',
    url: 'https://dice-live-oc.akamaized.net/hdntl=exp=1778479842~acl=%2f*~id=c6fa5fc2-2934-4cf3-929e-b530777ae73d~data=hdntl,aXA9MTA4LjE4MS4wLjEwOSZleHA9MTc3ODM5MzQ3MiZlaWQ9OTM5OTc0Jm9pZD0xNTQmdHlwZT1WT0QmdWlkPXhSUnFvOXxiY2FlYTdjZi1jMzM3LTQwMzktODE1OC0zYzFjZTQ5ZTcyOTMmY2lkPWRjZS5maXNmZWQmcHQ9bnVsbA~hmac=8000f79e7cfc58b64527b43651b5d9d15a3a954820cff97aab6f8a219d2f7a6b/dash/live/2093719/219037-321031/manifest-d.mpd',
    clearKeys: {
      '01d02c97d1c949f9877acd230dcaa56d':'708410b8bf1f4e998931183e8fab5d1e'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}      
  },


  {
    id: 'sportdigital',
    type: 'dash',
    url: 'https://a151aivottlinear-a.akamaihd.net/OTTB/fra-nitro/live/clients/dash/enc/ssdefyhkkr/out/v1/cf01290cb7f64525bdf861580a016ca8/cenc.mpd',
    clearKeys: {
       '0ad4080cdff8c60b1233b22087f0b340':'285f129c5eca01dd08a5d5a14ad801c8'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },

      {
    id: 'sn1',
    type: 'dash',
    url: 'https://live-d-02-rogers-uw-prd.akamaized.net/out/v1/r-prd/ch-05-prd-r-v2/dash-ch-05-prd-r-hd/index.mpd',
    clearKeys: {
       'ba16fb93934531bf931ae186d73fb2b7':'f88ffdfbdd9ab75e8af374c588df6b0b'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}      
  },
  {
    id: 'snp',
    type: 'dash',
    url: 'https://live-d-02-rogers-uw-prd.akamaized.net/out/v1/r-prd/ch-04-prd-r-v2/dash-ch-04-prd-r-hd/index.mpd',
    clearKeys: {
       'e2a52d3064c138ce9f5f65a9b40376ef':'8331044e3361ad7e09d3a9474edb88d2'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}      
  },
  {
    id: 'snwo',
    type: 'dash',
    url: 'https://live-d-02-rogers-uw-prd.akamaized.net/out/v1/r-prd/ch-07-prd-r-v2/dash-ch-07-prd-r-hd/index.mpd',
    clearKeys: {
       'a5dd62014be436a7bc25e7a1d1f3ae88':'7c90ca01dc68c7ef54fc9a5326f91987'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}
  },
  {
    id: 'sno',
    type: 'dash',
    url: 'https://live-d-02-rogers-uw-prd.akamaized.net/out/v1/r-prd/ch-02-prd-r-v2/dash-ch-02-prd-r-hd/index.mpd',
    clearKeys: {
       '620814bb9cc23732994f4cdd85716b6f':'b9e3a3412749e7f9fbb87b1a6b4bbcdd'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}    
  },
  {
    id: 'sn360',
    type: 'dash',
    url: 'https://live-d-02-rogers-uw-prd.akamaized.net/out/v1/r-prd/ch-06-prd-r-v2/dash-ch-06-prd-r-hd/index.mpd',
    clearKeys: {
       'd770eb2ba9b734d1981671030e1abacd':'a472809951c88a96b16d1ff1d449257b'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}      
  },
   {
    id: 'sneast',
     type: 'dash',
    url: 'https://live-d-02-rogers-uw-prd.akamaized.net/out/v1/r-prd/ch-01-prd-r-v2/dash-ch-01-prd-r-hd/index.mpd',
    clearKeys: {
       '8e3977c581333101a527776030e5d379':'f726e9c49a640e932ec6a92685153772'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
   },
  {
    id: 'snwest',
    type: 'dash',
    url: 'https://live-d-02-rogers-uw-prd.akamaized.net/out/v1/r-prd/ch-03-prd-r-v2/dash-ch-03-prd-r-hd/index.mpd',
    clearKeys: {
       '0b0e105850f83460857d2b93a0311054':'035ad3a787a568f6f0993f8683156704'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },
    {
    id: 'snwwe',
      type: 'dash',
    url: 'https://live-streaming-rsm.akamaized.net/wwehd/wwehd_cenc.isml/.mpd',
    clearKeys: {
       '40d4210e476340e091d5433d45fdd8f1':'090459185a95c99e6bae332d689e6fbe'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}   
    },

  {
    id: 'tv4futbol',
    type: 'dash',
    url: 'https://live.streaming.a2d.tv/asset/20465725.isml/dash.mpd',
    clearKeys: {
       'a518c629bd683a4eba5f2a793bcb48d6':'49642d2151ac6c3f8453bbfc4b3fdfc0'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}   
  },
  {
    id: 'tv4kanalen',
    type: 'dash',
    url: 'https://live.streaming.a2d.tv/asset/20465728.isml/dash.mpd',
    clearKeys: {
       '20f9a036eabc3930b2b1d124778090e6':'b557b2e61b73935ef74bfa22d8ea2c34'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },
  {
    id: 'tv4motor',
    type: 'dash',
    url: 'https://live.streaming.a2d.tv/asset/20465726.isml/dash.mpd',
    clearKeys: {
       'f5b4f9bd84c434fe97e27488b06f3f1a':'79c073d1dc0ee83b204d930309e80ed7'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}    
  },
  {
    id: 'tv4tennis',
    type: 'dash',
    url: 'https://live.streaming.a2d.tv/asset/20465727.isml/dash.mpd',
    clearKeys: {
       'bd32ad608e8c35368dbb0acbfa94d8e0':'957b32508fecaf1a7f842e9d89bc7537'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}    
  },
   {
    id: 'tv4hockey',
     type: 'dash',
    url: 'https://live.streaming.a2d.tv/asset/20465723.isml/dash.mpd',
    clearKeys: {
       '4acd16b6b6933abca01a66f865eef7c1':'b2a4e27e05d34e98dd7c09fadd96ab09'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}    
   },
  {
    id: 'tv4live1',
    type: 'dash',
    url: 'https://live.streaming.a2d.tv/asset/20465729.isml/dash.mpd',
    clearKeys: {
       '6c2908a6d85d35fd9a33db46d6b157b2':'2327be90af966a52a164cc46e18b35f5'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },
  {
    id: 'tv4live2',
    type: 'dash',
    url: 'https://live.streaming.a2d.tv/asset/20465730.isml/dash.mpd',
    clearKeys: {
       '729e43e22f86327ea9cbfd859b6e50e9':'bbd3b6b123a10cb4cdfd79751f56b0af'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}    
  },
  {
    id: 'tv4live3',
    type: 'dash',
    url: 'https://live.streaming.a2d.tv/asset/20465731.isml/dash.mpd',
    clearKeys: {
       '4e30426a0a5c36359b1606dd7bc90937':'508fb8a6038bf24a216c27e3efe3d9cf'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}    
  },
   {
    id: 'tv4live4',
     type: 'dash',
    url: 'https://live.streaming.a2d.tv/asset/20465732.isml/dash.mpd',
    clearKeys: {
       '08c544c527b93252a34932c4890903a1':'86a3d7e41bd51161039cfc80d880c746'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}   
   },

      {
    id: 'rtlde',
    url: 'https://pnowlive-a.akamaized.net/live/rtlhd/dash/rtlhd.mpd',
    clearKeys: {
       '57e48b99f3f6d4f13f5c5afdcca084ca':'29379a5e2d3405fad2f5d9cbe92586c3'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}      
  },

  {
    id: 'sport1plusde',
    url: 'https://ac-009.live.p7s1video.net/c5c609cf/t_009/sport1plus-de-hd/cenc-default.mpd',
    clearKeys: {
       'c1c11c3844b0dffdb9d9831900f1a1da':'a2c31e15346f339ca2b47bdd8591553f'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },

       {
    id: 'c5sg',
     type: 'dash',
    url: 'https://rest-as.ott.kaltura.com/api_v3/service/assetFile/action/playManifest/partnerId/147/assetId/316288/assetType/media/assetFileId/5754116/contextType/PLAYBACK/isAltUrl/False/a.mpd',
    clearKeys: {
       'cc3767ece98a4bdeb39b9ad6b7b8d2fe':'769e78dc02d8f73811c97e0f9d5f12fe'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
   },
  {
    id: 'c5sga',
    type: 'dash',
    url: 'https://tglmp02.akamaized.net/out/v1/a32e566460eb41ce9295b9c45fe25825/manifest.mpd',
    clearKeys: {
       'cc3767ece98a4bdeb39b9ad6b7b8d2fe':'769e78dc02d8f73811c97e0f9d5f12fe'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },


     {
    id: 'onesportfp',
    type: 'dash',
    url: 'https://qp-pldt-live-grp-07-prod.akamaized.net/out/u/cg_onesports_hd.mpd',
    clearKeys: {
       '0f855ed4412b11edb8780242ac120002':'b3a22e869d401b9cf556298c3d5d16c6'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },
  {
    id: 'onesportplusfp',
    type: 'dash',
    url: 'https://qp-pldt-live-grp-03-prod.akamaized.net/out/u/cg_onesportsplus_hd1.mpd',
    clearKeys: {
       '0f85589e412b11edb8780242ac120002':'69e8f7927207afe25929d149507386c8'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },

     {
    id: 'nova1',
    type: 'dash',
    url: 'https://dash2.antik.sk/stream/nvidia_nova_sport1/playlist_cenc.mpd',
    clearKeys: {
       '11223344556677889900112233445566':'11223344556677889900112233445566'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },
  {
    id: 'nova2',
    type: 'dash',
    url: 'https://dash2.antik.sk/stream/nvidia_nova_sport2/playlist_cenc.mpd',
    clearKeys: {
       '11223344556677889900112233445566':'11223344556677889900112233445566'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },
  {
    id: 'rtvs',
    type: 'dash',
    url: 'https://dash2.antik.sk/stream/nvidia_rtvs_sport/playlist_cenc.mpd',
    clearKeys: {
       '11223344556677889900112233445566':'11223344556677889900112233445566'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}      
  },

  {
    id: 'nova1cz',
    type: 'dash',
    url: 'https://estreams.tv.nej.cz/dash/CH_NOVA_SPORT1_Portable.ism/playlist.mpd',
    clearKeys: {
       '11223344556677889900112233445566':'11223344556677889900112233445566'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },
  {
    id: 'nova2cz',
    type: 'dash',
    url: 'https://estreams.tv.nej.cz/dash/CH_NOVA_SPORT2_Portable.ism/playlist.mpd',
    clearKeys: {
       '11223344556677889900112233445566':'11223344556677889900112233445566'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },


{
    id: 'spotvph',
  type: 'dash',
    url: 'https://qp-pldt-live-grp-11-prod.akamaized.net/out/u/dr_spotvhd.mpd',
    clearKeys: {
       'ec7ee27d83764e4b845c48cca31c8eef':'9c0e4191203fccb0fde34ee29999129e',
    },         origin: '',         referer: '',         userAgent: '',         headers: {}    
},
   {
    id: 'spotv2ph',
     type: 'dash',
    url: 'https://qp-pldt-live-grp-13-prod.akamaized.net/out/u/dr_spotv2hd.mpd',
    clearKeys: {
       '7eea72d6075245a99ee3255603d58853':'6848ef60575579bf4d415db1032153ed',
    },         origin: '',         referer: '',         userAgent: '',         headers: {}      
   },
   {
    id: 'nbatvph',
     type: 'dash',
    url: 'https://qp-pldt-live-grp-02-prod.akamaized.net/out/u/pl_nba.mpd',
    clearKeys: {
       'f36eed9e95f140fabbc88a08abbeafff':'0125600d0eb13359c28bdab4a2ebe75a',
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
   },
  {
    id: 'tv5monde',
     type: 'dash',
    url: 'https://qp-pldt-live-bpk-01-prod.akamaized.net/bpk-tv/dr_tv5_monde/default/index.mpd',
    clearKeys: {
       'fba5a720b4a541b286552899ba86e38b':'f63fa50423148bfcbaa58c91dfcffd0e',
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
   },
      {
    id: 'onesportph',
     type: 'dash',
    url: 'https://qp-pldt-live-bpk-02-prod.akamaized.net/bpk-tv/cg_onesports_hd/default/index.mpd',
    clearKeys: {
       '53c3bf2eba574f639aa21f2d4409ff11':'3de28411cf08a64ea935b9578f6d0edd',
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
   },
      {
    id: 'onesportplusph',
     type: 'dash',
    url: 'https://qp-pldt-live-bpk-02-prod.akamaized.net/bpk-tv/cg_onesportsplus_hd1/default/index.mpd',
    clearKeys: {
       '322d06e9326f4753a7ec0908030c13d8':'1e3e0ca32d421fbfec86feced0efefda',
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
   },

       {
    id: 'm6',
     type: 'dash',
    url: 'https://origin-18cd60dea8190528.live.6cloud.fr/out/v1/6bb64f06f28a4bfb8779bc1a386f7f0b/dash_short_cenc10_m6_hd_index.mpd',
    clearKeys: {
       '6e1087ef30f73661beb5fa8bd7a48852':'3b4d9f5335c155564a258ac37da69171',
    },         origin: '',         referer: '',         userAgent: '',         headers: {}      
   },

   {
    id: 'eleven1pl',
     type: 'dash',
    url: 'https://tvo-28-4.e.blueonline.tv/l/tvsmart/live/eds/Eleven_Sport_1/D11/Manifest.mpd',
    clearKeys: {
       '2e94219c1fc838eeaa36ece916d78211':'fc85a15c05cf2429338896a8d6df9da8',
    },         origin: '',         referer: '',         userAgent: '',         headers: {}      
   },
  {
    id: 'eleven2pl',
     type: 'dash',
    url: 'https://tvo-28-1.e.blueonline.tv/l/tvsmart/live/eds/Eleven_Sports_2/D11/Manifest.mpd',
    clearKeys: {
       '586dddf468ae3dcd8b4df34cbd17ab37':'b50bfd59dc72a57930a38776bd9c3cc4',
    },         origin: '',         referer: '',         userAgent: '',         headers: {}      
   },
  {
    id: 'eleven3pl',
     type: 'dash',
    url: 'https://r.e.blueonline.tv/l/tvsmart/live/eds/Eleven_Sports_3/D11/Manifest.mpd',
    clearKeys: {
       '222e6835692435b0a2ac692a17343c2d':'18f03461c9a9282d7baf09b6b75aa6ef',
    },         origin: '',         referer: '',         userAgent: '',         headers: {}      
   },
  {
    id: 'eleven4pl',
     type: 'dash',
    url: 'https://r.e.blueonline.tv/l/tvsmart/live/eds/Eleven_Sports_4/D11/Manifest.mpd',
    clearKeys: {
       'bc09a6ad420c3d24bee5f097045f92a1':'4e531d53600fa473b0bd2e8f97432280',
    },         origin: '',         referer: '',         userAgent: '',         headers: {}      
   },

      {
    id: 'tvs',
    type: 'dash',
    url: 'https://unifi-live.secureswiftcontent.com/Content/DASH/Live/channel(TVS)/master.mpd',
    clearKeys: {
       'fe6c43961ea8401e8e8bc211b1197961':'b9ce7dc616a3987e2b8900ce44735b07'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },
          {
    id: 'unifi',
    type: 'dash',
    url: 'https://unifi-live.secureswiftcontent.com/Content/DASH/Live/channel(unifi1)/master.mpd',
    clearKeys: {
       '90c7eb5d66b442a9a591775cc1154bc9':'4af842b9ad5315a01d7655b8b502196f',
    },         origin: '',         referer: '',         userAgent: '',         headers: {}    
  },
        {
    id: 'spotvmy',
    type: 'dash',
    url: 'https://unifi-live.secureswiftcontent.com/Content/DASH/Live/channel(spoTV)/master.mpd',
    clearKeys: {
       '5b593bd530f1403a8f3eb9b2cd9236c8':'d07c6a7f0b37a4090341e6380ff85060'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },
        {
    id: 'spotv2my',
    type: 'dash',
    url: 'https://unifi-live.secureswiftcontent.com/Content/DASH/Live/channel(spoTV2)/master.mpd',
    clearKeys: {
       '1af079fb8e1d43d890c1d804431ad84c':'3dc40bc5aaf09af8b1572646a45b1242'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },
        {
    id: 'bein1my',
    type: 'dash',
    url: 'https://unifi-live.secureswiftcontent.com/Content/DASH/Live/channel(Bein1)/master.mpd',
    clearKeys: {
       'd48b6088253c443eb94d27cb7828f707':'e9776141f9e949273a072b0e035070ab'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },
        {
    id: 'bein2my',
    type: 'dash',
    url: 'https://unifi-live.secureswiftcontent.com/Content/DASH/Live/channel(Bein2)/master.mpd',
    clearKeys: {
       'efa6ff1acefa43048e8b7adc21d98871':'5d0f448b52a92035e3763c4a60275933'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },
        {
    id: 'bein3my',
    type: 'dash',
    url: 'https://unifi-live.secureswiftcontent.com/Content/DASH/Live/channel(Bein3)/master.mpd',
    clearKeys: {
       '816ee2f7c19f49ed84276f34541b465b':'ca764a9973b6123a1112cffd3b32010d'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },
         {
    id: 'bein4my',
    type: 'dash',
    url: 'https://unifi-live.secureswiftcontent.com/Content/DASH/Live/channel(Bein4)/master.mpd',
    clearKeys: {
       'd561ff976397473e9b456b44cdffcdd2':'2b6cff42f7fae7e8bc32f3d5c62dc3c2'
    },         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },

      {
    id: 'msnbc',
type: 'dash',         
    url: 'https://live-oneapp-prd-news.akamaized.net/Content/CMAF_OL2-CTR-4s/Live/channel(msnbc)/master.mpd',
    clearKeys: {
      'd84c325f36814f39bbe59080272b10c3':'550727de4c96ef1ecff874905493580f'
},         origin: '',         referer: '',         userAgent: '',         headers: {}      
  },
  {
    id: 'telemundo',
type: 'dash',         
    url: 'https://live-oneapp-prd-news.akamaized.net/Content/CMAF_OL2-CTR-4s-v2/Live/channel(kvea)/master.mpd',
    clearKeys: {
      'ce7ab3022e753307997f58afe001bac4':'72d631a66e635c60829a0fe7705516c1'
},         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },
            {
    id: 'telemundodepor',
type: 'dash',         
    url: 'https://live-oneapp-prd-news.akamaized.net/Content/CMAF_OL2-CTR-4s/Live/channel(TelemundoDeportes)/master.mpd',
    clearKeys: {
      '300b58dfdaf35e8537ce25c39e99aec7':'6fc107a6f62f39da27b36ff079d7f937'
},    
  },
             {
    id: 'usanetwork',
type: 'dash', 
    // url:'https://cdn-vl-gcp-spinco-e-01.vos360.video/Content/DASH_DASH_ENC/Live/channel(4e41f6af-4b86-2aac-c351-c1250b14b344)/manifest.mpd',
    url: 'https://usanetwork.mt.linear.viewlift.com/v1/dash/dfe581e0a446a1e548014078b2d81b62b917979d/usanetwork-linear-external-dash-primary-msnow-v2/Content/DASH_DASH_ENC/Live/channel(85913052-3b78-5707-1a3f-c3d57b254c94)/manifest.mpd',
    clearKeys: {
      '6fe4b567ec9b467a888a089600c93f55':'b8612265451c8c462fb6b55ad3a6b6d8'
},         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },
            
  {
    id: 'usanetworkb',
type: 'dash',         
    url: 'https://aca-live-ott.izzigo.tv/15/out/u/dash/USA-HD/default.mpd',
    clearKeys: {
      'c760bcb13f83a8d66f4c676f04c23d81':'e024f5099f059ce93607812e5b406360'
},         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },
  {
    id: 'usanwest',
type: 'dash',         
    url: 'https://live-oneapp-prd-news.akamaized.net/Content/CMAF_OL2-CTR-4s/Live/channel(usa-west)/master.mpd',
    clearKeys: {
      '7f1648ec1c8836baa028e319d92e0841':'93ba967ec39964d9a6359044ec5c3500'
},         origin: '',         referer: '',         userAgent: '',         headers: {}      
  },
  {
    id: 'universowest',
type: 'dash',         
    url: 'https://live-oneapp-prd-news.akamaized.net/Content/CMAF_OL2-CTR-4s/Live/channel(universo-west)/master.mpd',
    clearKeys: {
      '1b0d41ddf54a37a6b6caa0484bb3df40':'0892217616382e2faf84f6de3847cc7d'
},         origin: '',         referer: '',         userAgent: '',         headers: {}      
  },
  {
    id: 'universoeast',
type: 'dash',        
    url: 'https://live-oneapp-prd-news.akamaized.net/Content/CMAF_OL2-CTR-4s/Live/channel(universo-east)/master.mpd',
    clearKeys: {
      '96b67fa09140329a89b7a1ead134eda3':'c618d32c56cdc6cad8330eb98507ca3f'
},         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },
  {
    id: 'universo',
type: 'hls',        
    url: 'https://andi-cors-proxy-service-k8s.andisearch.com/https://dfwlive-v1-c1p3-sponsored.s.llnwi.net/Content/HLS.cps/Live/channel(UVSOHD-1320.dfw.1080)/index.m3u8',
    clearKeys: {
      '701628fa90c54472dbe45d744cda3db3':'a914dcbc3eeb4d775cd2da7be3ce8f03'
},         origin: '',         referer: '',         userAgent: '',         headers: {}    
  },
  {
    id: 'cbsn',
type: 'hls',       
    url: 'https://andi-cors-proxy-service-k8s.andisearch.com/https://dfwlive-v1-c2p3-sponsored.s.llnwi.net/Content/HLS.cps/Live/channel(CBSSNHD-5613.dfw.1080)/index.m3u8',
    clearKeys: {
      '70496b9f632529d3253b5bc408de7ef6':'c9e3eb897a6427292641ca000b2e214e'
},         origin: '',         referer: '',         userAgent: '',         headers: {}    
  },
  {
    id: 'fox1',
type: 'dash',        
    url: 'https://a151aivottlinear-a.akamaihd.net/OTTB/iad-nitro/live/clients/dash/enc/tmpzbbdj9y/out/v1/962736723a534ba294e7592fef49827b/cenc.mpd',
    clearKeys: {
      '5466ebd70704bdeb657f0abf3c5ca4ef':'bdd79b72d8e48ed483aa623cc38a8a16'
},    proxy: true,     origin: '',         referer: '',         userAgent: '',         headers: {}    
  },
  {
    id: 'fox2',
type: 'dash',        
    url: 'https://a151aivottlinear-a.akamaihd.net/OTTB/iad-nitro/live/clients/dash/enc/awxnrqkbo5/out/v1/716529a4091947b0877e6cb80dbd6ccb/cenc.mpd',
    clearKeys: {
      '09453ce820d65fbc675de3185f9e454c':'98cff9600995fa381c76fdacf3c7edae'
},         origin: '',         referer: '',         userAgent: '',         headers: {}    
  },
  {
    id: 'espnd',
type: 'hls',        
    url: 'https://andi-cors-proxy-service-k8s.andisearch.com/https://dfwlive-v1-c2p3-sponsored.s.llnwi.net/Content/HLS.cps/Live/channel(ESPDHD-8083.dfw.720)/index.m3u8',
    clearKeys: {
      '240eccb249b756d7858e08e199bd5300':'8ec203596d4355fb1a89f003b5c12dc8'
},         origin: '',         referer: '',         userAgent: '',         headers: {}       
  },
  {
    id: 'nbc',
type: 'dash',       
    url: 'https://live-oneapp-prd-news.akamaized.net/Content/CMAF_OL2-CTR-4s/Live/channel(knbc)/master.mpd',
    clearKeys: {
      '0045a118e231f1326bcdb45350b1ceaa':'8c13afbfa54ea37a368b8b859021f6e3'
},         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },
  {
    id: 'nbcsport',
type: 'dash',        
    url: 'https://live-oneapp-prd-news.akamaized.net/Content/CMAF_OL2-CTR-4s/Live/channel(nbcsportspeacock)/master.mpd',
    clearKeys: {
      '00459011b26524a673b0ced54cef0a8b':'b31ded0e8a4cad5a36b6be06dae76f28'
},         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },
  {
    id: 'nbcbay',
type: 'dash',        
    url: 'https://live-oneapp-prd-news.akamaized.net/Content/CMAF_OL2-CTR-4s/Live/channel(csnbay)/master.mpd',
    clearKeys: {
      '20b593e9bee43324a8b1d830eaa82d78':'a87dba51bd2dd7f7879730ac2bd4005b'
},         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },
  {
    id: 'nbcbos',
type: 'dash',       
    url: 'https://live-oneapp-prd-news.akamaized.net/Content/CMAF_OL2-CTR-4s/Live/channel(csnnew)/master.mpd',
    clearKeys: {
      '0f73521c174532e59711ccb4462ac770':'f06c7f95319c0386b4fc5fa3d58ab504'
},         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },
  {
    id: 'nbcchi',
type: 'dash',        
    url: 'https://live-oneapp-prd-news.akamaized.net/Content/CMAF_OL2-CTR-4s/Live/channel(csnchi)/master.mpd',
    clearKeys: {
      'a9bc7f7a4d8a392c80a91026a77dfb39':'6ab38a95a553739183c568e3ad7c283e'
},         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },
  {
    id: 'nbccal',
type: 'dash',        
    url: 'https://live-oneapp-prd-news.akamaized.net/Content/CMAF_OL2-CTR-4s/Live/channel(csncal)/master.mpd',
    clearKeys: {
      'bccd9296f8b1329895b22ca15e26f748':'127a8c6653a0631fea0e61160cd76938'
},         origin: '',         referer: '',         userAgent: '',         headers: {}   
  },
  {
    id: 'nbcphi',
type: 'dash',        
    url: 'https://live-oneapp-prd-news.akamaized.net/Content/CMAF_OL2-CTR-4s/Live/channel(csnphilly)/master.mpd',
    clearKeys: {
      'e07a6dfad8333a388f2a931a743621b9':'638ff7ec62eeee611927f1d6d5baa146'
},         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },


  {
    id: 'premierleague',
type: 'dash',       
    url: 'https://live-oneapp-prd-news.akamaized.net/Content/CMAF_CTR-4s/Live/channel(vc1021n07j)/master.mpd',
    clearKeys: {
      '002046c9a49b9ab1cdb6616bec5d26c3':'d2f92f6b7edc9a1a05d393ba0c20ef9e'
},         origin: '',         referer: '',         userAgent: '',         headers: {}
  },
  {
    id: 'golf',
type: 'dash',       
    url: 'https://live-oneapp-prd-news.akamaized.net/Content/CMAF_OL2-CTR-4s/Live/channel(golf)/master.mpd',
    clearKeys: {
      'd5c9203447ab38c5bf5b407cdd9de5e8':'501464dfa2ac437098c35e1c4f16bb6b'
},         origin: '',         referer: '',         userAgent: '',         headers: {}    
  },
  {
    id: 'golfpass',
type: 'dash',        
    url: 'https://live-oneapp-prd-news.akamaized.net/Content/CMAF_CTR-4s/Live/channel(vc124phhny)/master.mpd',
    clearKeys: {
      '0020212a47511b226f7cc9d030aa171b':'323c16315e1cb8d7c821facc3c1778a4'
},         origin: '',         referer: '',         userAgent: '',         headers: {}    
  },

  {
    id: 'nfl',
type: 'dash',        
    url: 'https://cfrt.stream.peacocktv.com/Content/CMAF_CTR-4s/Live/channel(lc107a1ddy)/master.mpd',
    clearKeys: {
      '002007110c69a23803173b50eab05f23':'590d6e8f4ca81319f9bb29104f571990'
},         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },

        {
    id: 'onsportfootball',
type: 'dash',        
    url: 'https://livebytsctbu.vtvprime.vn/mean/BONGDA_HD/manifest.mpd',
    clearKeys: {
      'f69bf028397e4ecfafce84abb7c5fe2b':'25028aad0e2003b2785cf5196a4e2fa1'
},         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },
       {
    id: 'onsport',
type: 'dash',        
    url: 'https://livebytsctbu.vtvprime.vn/mean/THETHAO_HD/manifest.mpd',
    clearKeys: {
      'dcda1c0511c347f8b89c1821600426ac':'dbc1d4d9244f8e7d01d999d4d9f53855'
},         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },
             {
    id: 'ongolf',
type: 'dash',        
    url: 'https://livebytsctbu.vtvprime.vn/mean/THETHAO_GOLF_HD/manifest.mpd',
    clearKeys: {
      '5a323b53e0864492b0e04c70d591c564':'843584bafaf2736c4fd1b76e1eee74d8'
},         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },
        {
    id: 'onsportnews',
type: 'dash',        
    url: 'https://livebytsctbu.vtvprime.vn/mean/THETHAO_TINTUC_HD/manifest.mpd',
    clearKeys: {
      'cafb6e60c1504dfc858fd3dddc6fd20c':'92061ffeb13f47c4d8879316dbc9521d'
},         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },
       {
    id: 'onsportplus',
type: 'dash',        
    url: 'https://livebytsctbu.vtvprime.vn/mean/HAY_TV/manifest.mpd',
    clearKeys: {
      '4e619c5b54494762b131f65fc34a885b':'676d9f5a28d409d7d601514baa147c9d'
},         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },

  {
    id: 'nbatvus',
type: 'dash',         
    url: 'https://otte.cache.aiv-cdn.net/bom-nitro/live/clients/dash/enc/vgkshf22lc/out/v1/9dbd7e519cf34fe2a53a85ee85bc407f/cenc.mpd',
    clearKeys: {
      '4ee9b41e5053ef434c13dbb783df9e32':'a275236600bfaedf230286f7b71b0a99'
},         origin: '',         referer: '',         userAgent: '',         headers: {}      
  },
  {
    id: 'mlbtvus',
type: 'dash',         
    url: 'https://otte.cache.aiv-cdn.net/bom-nitro/live/clients/dash/enc/djeuespy2a/out/v1/26429339ac0c436985f84926afe2fcf4/cenc.mpd',
    clearKeys: {
      '09738c977ad0335cccc46b1e401c5fb0':'753798bf3898e85bc46df59e7c94f869'
},         origin: '',         referer: '',         userAgent: '',         headers: {}      
  },
  {
    id: 'nfltvus',
type: 'dash',         
    url: 'https://otte.cache.aiv-cdn.net/bom-nitro/live/clients/dash/enc/v3kqgwb8iy/out/v1/3f25a97e7f4143c08b25ce350dc53053/cenc.mpd',
    clearKeys: {
      '59f9500365e5258070ead151217c9257':'73acae852d0128ffc3b55846ebb56a9c'
},         origin: '',         referer: '',         userAgent: '',         headers: {}      
  },
  {
    id: 'fifaus',
type: 'dash',         
    url: 'https://otte.cache.aiv-cdn.net/bom-nitro/live/clients/dash/enc/pjpsn1xdop/out/v1/c9699d08ed434e53bd49b709f8b3136d/cenc.mpd',
    clearKeys: {
      '61b535258a2c45b1a3f899b39e03a75b':'665713a1678fe41efe5510d32bfbe26d'
},         origin: '',         referer: '',         userAgent: '',         headers: {}      
  },
  {
    id: 'tsn1b',
type: 'dash',         
    url: 'https://otte.cache.aiv-cdn.net/bom-nitro/live/dash/enc/7janu55dwc/out/v1/69a2a7041395406b970598f61680e7cf/cenc.mpd',
    clearKeys: {
      'e51aa21f2a0fef9aabc120dfb655b52f':'a12a987fe725a40b6be95cd84b15f689'
},         origin: '',         referer: '',         userAgent: '',         headers: {}      
  },
  {
    id: 'tsn2b',
type: 'dash',       
    url: 'https://otte.cache.aiv-cdn.net/bom-nitro/live/clients/dash/enc/3n6slkgh54/out/v1/8977baf175da4b94873194613dd3fe55/cenc.mpd',
    clearKeys: {
      'daa8ea92553fd16cd6bfae2b8c582715':'4042e041b5639b79b69ae07a872eef9'
},         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },
  {
    id: 'tsn3b',
type: 'dash',       
    url: 'https://otte.cache.aiv-cdn.net/bom-nitro/live/clients/dash/enc/lzhmuzmjsl/out/v1/c171eeb214c749f2b351c79df317b21e/cenc.mpd',
    clearKeys: {
      'f5c2b30eac11be1e8cdfc9585f5fe6af':'a8198d17bf9b0da77450fbb919a38b2d'
},         origin: '',         referer: '',         userAgent: '',         headers: {}      
  },
  {
    id: 'tsn4b',
type: 'dash',        
    url: 'https://otte.cache.aiv-cdn.net/bom-nitro/live/clients/dash/enc/h9urpo3cwb/out/v1/fde190f369484bc6b6117cc16cd82a9f/cenc.mpd',
    clearKeys: {
      'c4088f5f265f9de50cffd80bf89308b7':'2c4d2239d96d532b4ec2050653611003'
},         origin: '',         referer: '',         userAgent: '',         headers: {}    
  },
  {
    id: 'tsn5b',
type: 'dash',        
    url: 'https://live-pv-ta.amazon.fastly-edge.com/bom-nitro/live/clients/dash/enc/jkcljgqbx8/out/v1/63bfa701559340f3a2a2cb1fccd24807/cenc.mpd',
    clearKeys: {
      'e853333da2c9196ea11374634231bc45':'de2e2dbe818d78dfad07d6cd9a4c63d4'
},         origin: '',         referer: '',         userAgent: '',         headers: {}    
  },

       {
    id: 'tnt1b',
type: 'dash',        
    url: 'https://otte.cache.aiv-cdn.net/bom-nitro/live/clients/dash/enc/cllekigzzn/out/v1/bd3b0c314fff4bb1ab4693358f3cd2d3/cenc.mpd',
    clearKeys: {
      '294b5761cefc22d0c6312939e13d8278':'52148f1042d238849f0a7813f1da8a7b'
},         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },
  {
    id: 'tnt2b',
type: 'dash',         
    url: 'https://otte.cache.aiv-cdn.net/bom-nitro/live/clients/dash/enc/fb6jy4pxts/out/v1/f8fa17f087564f51aa4d5c700be43ec4/cenc.mpd',
    clearKeys: {
      'f288380ca4cef9ad3f27a92a08e9bb8b':'9f18d26291d9230833501f7f822f6875'
},         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },
  {
    id: 'tnt3b',
type: 'dash',         
    url: 'https://otte.cache.aiv-cdn.net/bom-nitro/live/dash/enc/5sxuux529k/out/v1/bb548a3626cd4708afbb94a58d71dce9/cenc.mpd',
    clearKeys: {
      '1d96ab366bbe6451edf7407b58e2fa16':'0116201f4a63ac5bf5787d2c610c41a7'
},         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },
   {
    id: 'tnt4b',
type: 'dash',        
     url: 'https://otte.cache.aiv-cdn.net/bom-nitro/live/dash/enc/pnu10tp36z/out/v1/912e9db56d75403b8a9ac0a719110f36/cenc.mpd',
    clearKeys: {
      '192b1115da041585c77200128549efa1':'634e10efe4abbb14be400a3ccbac0258'
},         origin: '',         referer: '',         userAgent: '',         headers: {}     
   },

  {
    id: 'tnt5b',
type: 'dash',        
    url: 'https://a151aivottlinear-a.akamaihd.net/OTTB/sin-nitro/live/dash/enc/gesdwrdncn/out/v1/79e752f1eccd4e18b6a8904a0bc01f2d/cenc.mpd',
    clearKeys: {
      '60c0d9b41475e01db4ffb91ed557fbcc':'36ee40e58948ca15e3caba8d47b8f34b'
},         origin: '',         referer: '',         userAgent: '',         headers: {}
  },

  {
    id: 'prem1b',
type: 'dash',       
    url: 'https://otte.live.fly.ww.aiv-cdn.net/lhr-nitro/live/clients/dash/enc/vwq77hfgzw/out/v1/b858e0b845c64cec953887bd4269e4ea/cenc.mpd',
    clearKeys: {
      '1444f4235529f183f0a5a486befe9cdb':'e5e3fec67a1bb3472a2089c8a0a2557f'
},         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },
  {
    id: 'prem2b',
type: 'dash',        
    url: 'https://otte.live.fly.ww.aiv-cdn.net/lhr-nitro/live/clients/dash/enc/w34nznx0bz/out/v1/1c6639b9af994c75847def2249302066/cenc.mpd',
    clearKeys: {
      '1a5df53609ebc9857898c490f4724918':'77f62980d582ec541280796acf8b2d19'
},         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },

      {
    id: 'nows1hk',
type: 'hls',        
    url:  'https://eventcdn02-nowe.akamaized.net/hls/CH631/index.m3u8',
    clearKeys: {
       'ca20a93cf8e3421dafbd5bdb1990081b':'86ae86a7391c481ea93eecdb740f0a14'
},         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },
  {
    id: 'nows2hk',
type: 'hls',      
    url:  'https://eventcdn02-nowe.akamaized.net/hls/CH632/index.m3u8',
    clearKeys: {
       'ca20a93cf8e3421dafbd5bdb1990081b':'86ae86a7391c481ea93eecdb740f0a14'
},         origin: '',         referer: '',         userAgent: '',         headers: {}   
  },
  {
    id: 'nows3hk',
type: 'hls',      
    url:  'https://eventcdn02-nowe.akamaized.net/hls/CH633/index.m3u8',
    clearKeys: {
       'ca20a93cf8e3421dafbd5bdb1990081b':'86ae86a7391c481ea93eecdb740f0a14'
},         origin: '',         referer: '',         userAgent: '',         headers: {}    
  },
  {
    id: 'nows4hk',
type: 'hls',       
    url:  'https://eventcdn02-nowe.akamaized.net/hls/CH634/index.m3u8',
    clearKeys: {
       'ca20a93cf8e3421dafbd5bdb1990081b':'86ae86a7391c481ea93eecdb740f0a14'
},         origin: '',         referer: '',         userAgent: '',         headers: {}
  },
  {
    id: 'nows5hk',
type: 'hls',      
    url:  'https://eventcdn02-nowe.akamaized.net/hls/CH635/index.m3u8',
    clearKeys: {
       'ca20a93cf8e3421dafbd5bdb1990081b':'86ae86a7391c481ea93eecdb740f0a14'
},         origin: '',         referer: '',         userAgent: '',         headers: {}   
  },
  {
    id: 'nows6hk',
type: 'hls',     
    url:  'https://eventcdn02-nowe.akamaized.net/hls/CH636/index.m3u8',
    clearKeys: {
       'ca20a93cf8e3421dafbd5bdb1990081b':'86ae86a7391c481ea93eecdb740f0a14'
},         origin: '',         referer: '',         userAgent: '',         headers: {}     
  },
  {
    id: 'nows7hk',
type: 'hls',     
    url:  'https://eventcdn02-nowe.akamaized.net/hls/CH637/index.m3u8',
    clearKeys: {
       'ca20a93cf8e3421dafbd5bdb1990081b':'86ae86a7391c481ea93eecdb740f0a14'
},         origin: '',         referer: '',         userAgent: '',         headers: {}    
  },
  {
    id: 'nowspl1hk',
type: 'hls',   
    url:  'https://eventcdn02-nowe.akamaized.net/hls/CH621/index.m3u8',
    clearKeys: {
       'ca20a93cf8e3421dafbd5bdb1990081b':'86ae86a7391c481ea93eecdb740f0a14'
},         origin: '',         referer: '',         userAgent: '',         headers: {}
  },
  {
    id: 'nowspl2hk',
type: 'hls',   
    url:  'https://eventcdn02-nowe.akamaized.net/hls/CH622/index.m3u8',
    clearKeys: {
       'ca20a93cf8e3421dafbd5bdb1990081b':'86ae86a7391c481ea93eecdb740f0a14'
},         origin: '',         referer: '',         userAgent: '',         headers: {}    
  },
  {
    id: 'nowspl3hk',
type: 'hls',  
    url:  'https://eventcdn02-nowe.akamaized.net/hls/CH623/index.m3u8',
    clearKeys: {
       'ca20a93cf8e3421dafbd5bdb1990081b':'86ae86a7391c481ea93eecdb740f0a14'
},         origin: '',         referer: '',         userAgent: '',         headers: {}
  },
  {
    id: 'nowspl4hk',
type: 'hls',
    url:  'https://eventcdn02-nowe.akamaized.net/hls/CH624/index.m3u8',
    clearKeys: {
       'ca20a93cf8e3421dafbd5bdb1990081b':'86ae86a7391c481ea93eecdb740f0a14'
},         origin: '',         referer: '',         userAgent: '',         headers: {}
  },
  {
    id: 'nowspl5hk',
type: 'hls',    
    url:  'https://eventcdn02-nowe.akamaized.net/hls/CH625/index.m3u8',
    clearKeys: {
       'ca20a93cf8e3421dafbd5bdb1990081b':'86ae86a7391c481ea93eecdb740f0a14'
},         origin: '',         referer: '',         userAgent: '',         headers: {}
  },
  {
    id: 'nowspl6hk',
type: 'hls',   
    url:  'https://eventcdn02-nowe.akamaized.net/hls/CH626/index.m3u8',
    clearKeys: {
       'ca20a93cf8e3421dafbd5bdb1990081b':'86ae86a7391c481ea93eecdb740f0a14'
},         origin: '',         referer: '',         userAgent: '',         headers: {}    
  },
  {
    id: 'bein1hk',
type: 'hls',      
    url:  'https://eventcdn02-nowe.akamaized.net/hls/CH638/index.m3u8',
    clearKeys: {
       'ca20a93cf8e3421dafbd5bdb1990081b':'86ae86a7391c481ea93eecdb740f0a14'
},         origin: '',         referer: '',         userAgent: '',         headers: {}    
  },
  {
    id: 'bein2hk',
type: 'hls',       
    url:  'https://eventcdn02-nowe.akamaized.net/hls/CH639/index.m3u8',
    clearKeys: {
       'ca20a93cf8e3421dafbd5bdb1990081b':'86ae86a7391c481ea93eecdb740f0a14'
},         origin: '',         referer: '',         userAgent: '',         headers: {}    
  },
  {
    id: 'bein3hk',
type: 'hls',       
    url:  'https://eventcdn02-nowe.akamaized.net/hls/CH640/index.m3u8',
    clearKeys: {
       'ca20a93cf8e3421dafbd5bdb1990081b':'86ae86a7391c481ea93eecdb740f0a14'
},         origin: '',         referer: '',         userAgent: '',         headers: {}   
  },
    
    {
        id: 'hls-vod',
        type: 'hls',
        url: 'https://bitmovin-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8',
        origin: '',
        referer: '',
        userAgent: '',
        headers: {}
    }
  // ... config lainnya
];

export const findVideoConfig = (videoId) => {
  return videoConfigs.find(config => config.id === videoId);
};

// FIX Bug #8: Kumpulkan semua hostname CDN yang diizinkan untuk di-proxy.
// Digunakan oleh /api/token untuk memvalidasi URL yang di-pass via parameter `url`.
export const getAllowedHostnames = (): string[] => {
  const seen = new Set<string>();
  for (const c of videoConfigs) {
    if (!c.url) continue;
    try {
      const hostname = new URL(c.url).hostname;
      if (hostname) seen.add(hostname);
    } catch {}
  }
  return Array.from(seen);
};

// ============ SHAKA HELPERS ============
export const detectStreamType = (url) => {
  if (url.includes('.mpd')) return 'dash';
  if (url.includes('.m3u8')) return 'hls';
  return 'dash';
};
export const createRequestFilter = (config: any, token?: string) => {
  return (requestType: any, request: any) => {
    const shaka = (window as any).shaka;
    
    if (!shaka || !shaka.net) {
      console.warn('Shaka belum tersedia, request filter ditunda');
      return;
    }
    
    const shakaRequestType = shaka.net.NetworkingEngine.RequestType;
    
    // FIX Bug #1: Kondisi shouldProxy diselaraskan dengan useShakaPlayer agar konsisten.
    // Stream dengan origin/referer (CORS bypass headers) juga wajib melalui proxy.
    const shouldProxy = config.proxy === true ||
                        !!(config.origin && typeof config.origin === 'string' && config.origin.trim()) ||
                        !!(config.referer && typeof config.referer === 'string' && config.referer.trim());

    if (shouldProxy) {
      // Hanya proxy request MANIFEST dan SEGMENT
      if (requestType === shakaRequestType.MANIFEST || requestType === shakaRequestType.SEGMENT) {
        for (let i = 0; i < request.uris.length; i++) {
          let targetUri = request.uris[i];
          
          // Jika URI yang di-resolve oleh player mengarah ke localhost/api/ (karena base URL-nya adalah proxy)
          const localApiPrefix = `${window.location.origin}/api/`;
          if (targetUri.startsWith(localApiPrefix)) {
            const relativePath = targetUri.substring(localApiPrefix.length);
            const baseCdnUrl = config.url.substring(0, config.url.lastIndexOf('/') + 1);
            targetUri = baseCdnUrl + relativePath;
          }

          if (!targetUri.includes('/api/manifest')) {
            let proxyUrl = `${window.location.origin}/api/manifest?file=${encodeURIComponent(targetUri)}`;
            if (token) {
              proxyUrl += `&token=${token}`;
            }
            if (config.id) {
              proxyUrl += `&id=${config.id}`;
            }
            request.uris[i] = proxyUrl;
          }
        }
        // Jangan kirim header kustom dari browser ke proxy lokal
        return;
      }
    }
    
    // Jika tidak di-proxy (atau untuk request LICENSE), gunakan cara standar dengan menyuntikkan header langsung
    const types = [
      shakaRequestType.MANIFEST,
      shakaRequestType.SEGMENT,
      shakaRequestType.LICENSE
    ];
    
    if (types.includes(requestType)) {
      if (config.origin?.trim()) {
        request.headers['Origin'] = config.origin;
      }
      
      if (config.referer?.trim()) {
        request.headers['Referer'] = config.referer;
      }
      
      if (config.headers && typeof config.headers === 'object') {
        Object.keys(config.headers).forEach(key => {
          if (config.headers[key]?.trim()) {
            request.headers[key] = config.headers[key];
          }
        });
      }
      
      request.headers['Accept'] = '*/*';
      request.headers['Accept-Language'] = 'en-US,en;q=0.9';
      request.headers['Sec-Fetch-Mode'] = 'cors';
      request.headers['Sec-Fetch-Site'] = 'cross-site';
    }
  };
};
