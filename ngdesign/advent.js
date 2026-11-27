/* Адвент-календарь дизайнера — основной код лендинга.
   Подключение в Тильде (блок T123):
   <div id="advent"></div><script src="https://a7778440006-web.github.io/vitadidesign/ngdesign/advent.js"></script>
   Окошки (диалоги) добавляются отдельными маленькими блоками T123 — см. README.md */
(function () {
  if (window.__adventLoaded) return; window.__adventLoaded = true;

  var SCRIPT = document.currentScript;
  var BASE = (SCRIPT && SCRIPT.src ? SCRIPT.src.replace(/[^\/]*$/, '') : 'https://a7778440006-web.github.io/vitadidesign/ngdesign/');
  var FONTS = BASE + 'fonts/';
  var IMG = BASE + 'img/';
  var CFG = Object.assign({
    vk: 'https://vk.ru/vitadi.design',
    tg: 'https://t.me/vitadidesign',
    privacy: 'https://vitadidesign.tilda.ws/shporadesign#/privacy',
    shpora: 'https://vitadidesign.tilda.ws/shporadesign',
    site: 'https://vk.ru/vitadi.design',
    countdown: false, // false — на календаре «осталось немного», true — счётчик дней до Нового года
    test: false       // true — учитывать test: 'open' / 'opened' в окошках (или ?advent_test=1 в адресе)
  }, window.ADVENT_CONFIG || {});
  var TEST = CFG.test || /[?&]advent_test=1/.test(location.search);

  var YEAR = 2026;
  var MONTHS = 'декабря';
  var STORE = 'advent2026:opened';

  /* ---------- дни: цвет и вариант оформления (как в макете) ---------- */
  var MAP = ['g1', 'w1', 'r3', 'g1', 'w2', 'r4', 'g2', 'w1', 'r1', 'g5', 'w3', 'r1',
    'g6', 'w1', 'r5', 'g4', 'w4', 'r1', 'g3', 'w5', 'r2', 'g1', 'w6', 'r6'];
  var COLOR = { g: 'green', w: 'white', r: 'red' };
  var TOY = {
    g3: ['ledenec', -12, -67, 136, 225], g4: ['shar', 4, 6, 122, 146], g5: ['olen', 4, 6, 122, 122], g6: ['snezhinka', 9, 9, 122, 122],
    w3: ['nosok', 9, 16, 122, 130], w4: ['elka', 7, 12, 122, 168], w5: ['pryanik', 8, 13, 122, 126], w6: ['girlyanda', 13, 10, 122, 102],
    r3: ['varezhki', -23, -5, 192, 192], r4: ['snegovik', 12, 18, 119, 119], r5: ['kakao', 9, 16, 122, 122], r6: ['kolokolchiki', 9, 11, 122, 122]
  };
  var GIFT = { green: 'gift-green', white: 'gift-white', red: 'gift-red' };

  /* ---------- шрифты ---------- */
  function face(fam, file, w) {
    return '@font-face{font-family:"' + fam + '";src:url(' + FONTS + file + ') format("woff2");font-weight:' + w + ';font-style:normal;font-display:swap}';
  }
  var FONTCSS = ['400', '500', '600', '700'].map(function (w) {
    return face('AdvOnest', 'onest-cyrillic-' + w + '-normal.woff2', w) + face('AdvOnest', 'onest-latin-' + w + '-normal.woff2', w);
  }).join('') +
    face('AdvFira', 'fira-sans-extra-condensed-cyrillic-900-normal.woff2', 900) + face('AdvFira', 'fira-sans-extra-condensed-latin-900-normal.woff2', 900) +
    face('AdvFira', 'fira-sans-extra-condensed-cyrillic-400-normal.woff2', 400) + face('AdvFira', 'fira-sans-extra-condensed-latin-400-normal.woff2', 400) +
    face('AdvCaveat', 'caveat-cyrillic-700-normal.woff2', 700) + face('AdvCaveat', 'caveat-latin-700-normal.woff2', 700);

  /* ---------- стили ---------- */
  var CSS = FONTCSS + `
.adv{container:adv/inline-size;position:relative;width:100%;background:#fbf6ed;color:#2d1710;overflow:hidden;
 -webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
.adv *,.adv *::before,.adv *::after{box-sizing:border-box}
.adv a{color:inherit;text-decoration:none}
.adv button{font:inherit;color:inherit;background:none;border:0;padding:0;margin:0;cursor:pointer;-webkit-tap-highlight-color:transparent}
.adv img{display:block;max-width:none;-webkit-user-drag:none;user-select:none}
.adv-in{position:relative;z-index:1;font-family:AdvOnest,Arial,sans-serif;
 --k:min(1px,calc((100cqw - 40px) / 1400));
 --gw:min(1400px,calc(100cqw - 40px));
 --u:calc((var(--gw) - 48px) / 5 / 270);
 padding:20px;display:flex;flex-direction:column;gap:52px;align-items:center}
.adv-bg{position:absolute;inset:0;z-index:0;pointer-events:none;
 background-image:radial-gradient(rgba(106,88,80,.07) 1px,transparent 1.4px);background-size:14px 14px}
.adv-dust{position:fixed;left:0;top:0;width:100vw;height:100vh;z-index:0;pointer-events:none}
.adv-blk{width:100%}
.adv-mid{width:var(--gw)}

/* верхняя строка */
.adv-by{display:flex;gap:12px;font-size:14px;line-height:20px;padding-bottom:12px}
.adv-by b{font-weight:600}
.adv-by a:hover{color:#d7261e}

/* баннеры */
.adv-ban{position:relative;width:100%;height:calc(640 * var(--k));
 background:radial-gradient(closest-side,#d7261e 58%,#b71a12 100%) center/150% 160% no-repeat,#c41f17;
 box-shadow:inset 4px 4px 52px rgba(0,0,0,.16),inset -4px -4px 52px rgba(0,0,0,.16)}
.adv-clip{position:absolute;inset:0;overflow:hidden}
.adv-hero .adv-clip{z-index:7;pointer-events:none}
.adv-stage{position:absolute;left:50%;top:0;width:calc(1276 * var(--k));height:100%;transform:translateX(-50%)}
.adv-ab{position:absolute}
.adv-fx{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:20}

/* hero */
.adv-goat{position:absolute;left:50%;bottom:0;width:calc(559 * var(--k));height:calc(559 * var(--k));margin-left:calc(-279.5 * var(--k));
 transform:translateY(104%);transition:transform .55s cubic-bezier(.55,0,1,.45);will-change:transform}
.adv-goat.up{transform:translateY(3%);transition:transform 1s cubic-bezier(.16,1,.3,1)}
.adv-goat>*{width:100%;height:100%;display:block;object-fit:contain}
.adv-goat.mir>*{transform:scaleX(-1)}
.adv-ban2 .gclip{display:none;z-index:7;pointer-events:none}
.adv-hero .tw{position:absolute;left:0;right:0;top:calc(113 * var(--k));display:flex;justify-content:center;align-items:center;gap:calc(10 * var(--k));
 color:#fbf6ed;font-weight:500;font-size:calc(20 * var(--k));line-height:1.1;text-transform:lowercase;z-index:5}
.adv-hero .tw svg,.adv-ban2 .tw svg{width:calc(16 * var(--k));height:calc(16 * var(--k))}
.adv-h1{font-family:AdvFira,Impact,sans-serif;font-weight:900;text-transform:uppercase;color:#fbf6ed;text-align:center;margin:0;letter-spacing:0}
.adv-hero .adv-h1{position:absolute;left:0;right:0;top:calc(189 * var(--k));font-size:calc(96 * var(--k));line-height:.95;z-index:5}
.adv-hand{font-family:AdvCaveat,cursive;font-weight:700;color:#fbf6ed;text-align:center;line-height:1.1}
.adv-hero .adv-hand{position:absolute;left:calc(363 * var(--k));width:calc(550 * var(--k));top:calc(425 * var(--k));font-size:calc(46 * var(--k));z-index:5}
.adv-hero .adv-hand svg{position:absolute;left:calc(463 * var(--k));top:calc(75 * var(--k));width:calc(49 * var(--k));height:calc(60 * var(--k))}
.adv-elka{left:calc(-11 * var(--k));top:calc(180 * var(--k));width:calc(294 * var(--k));height:calc(404 * var(--k));cursor:pointer;
 transform-origin:50% 96%;transition:transform .6s cubic-bezier(.22,1,.36,1)}
@media (hover:hover){.adv-elka:hover{animation:advTree 2.4s ease-in-out infinite}}
@keyframes advTree{0%,100%{transform:rotate(0)}25%{transform:rotate(2.6deg)}50%{transform:rotate(-1.8deg)}75%{transform:rotate(1.4deg)}}
.adv-gifts{position:absolute;inset:0;overflow:hidden;pointer-events:none;z-index:6}
.adv-gw{position:absolute;left:0;top:0;transform-origin:50% 100%;will-change:transform}
.adv-gw svg{width:100%;height:100%;display:block;overflow:visible}
.adv-gs{position:absolute;left:0;top:0;height:10px;border-radius:50%;background:radial-gradient(closest-side,rgba(60,8,4,.45),rgba(60,8,4,0))}
.adv-ded{left:calc(1075 * var(--k));top:calc(-8 * var(--k));width:calc(197 * var(--k));height:calc(219 * var(--k))}
.adv-tst{left:calc(-60 * var(--k));top:calc(230 * var(--k));width:calc(420 * var(--k));height:calc(262 * var(--k))}
.adv-cst{left:calc(940 * var(--k));top:calc(287 * var(--k));width:calc(343 * var(--k));height:calc(214 * var(--k))}
.adv-cnt{left:calc(984 * var(--k));top:calc(286 * var(--k));width:calc(265 * var(--k));height:calc(265 * var(--k))}
.adv-cnt{z-index:8;cursor:default;transition:transform .5s cubic-bezier(.22,1,.36,1);transform-origin:50% 90%}
.adv-cnt .cw{position:absolute;inset:0;transform-origin:50% 85%}
.adv-cnt img{width:100%;height:100%}
@media (hover:hover){.adv-cnt:hover{transform:rotate(-4deg) scale(1.03)}.adv-cnt:hover .cw{animation:advCal 1.6s ease-in-out infinite}}
.adv-cnt.tap{animation:advCalTap .9s cubic-bezier(.22,1,.36,1)}
@keyframes advCalTap{0%{transform:scale(1)}30%{transform:scale(1.12) rotate(-3deg)}55%{transform:scale(1.07) rotate(2deg)}75%{transform:scale(1.09) rotate(-1deg)}100%{transform:scale(1)}}
@keyframes advCal{0%,100%{transform:rotate(0)}25%{transform:rotate(2.2deg)}50%{transform:rotate(-1.4deg)}75%{transform:rotate(1.6deg)}}
.adv-cnt .n{position:absolute;left:17.5%;width:65%;top:41.6%;text-align:center;font-family:AdvFira,Impact,sans-serif;font-weight:900;
 font-size:calc(86 * var(--k));line-height:1;color:#2d1710}
.adv-cnt .w{position:absolute;left:17.5%;width:65%;top:74%;text-align:center;font-weight:700;font-size:calc(13.3 * var(--k));letter-spacing:.1em;color:#d7261e;text-transform:uppercase}
.adv-cnt.soon .n{top:46%;font-size:calc(34 * var(--k));line-height:.92;text-transform:uppercase}
.adv-tag{position:absolute;left:calc(973 * var(--k));top:calc(601 * var(--k));background:#6b7a3a;color:#f1eadf;
 font-family:AdvFira,Impact,sans-serif;font-weight:900;font-size:calc(44 * var(--k));line-height:.95;text-transform:uppercase;
 padding:calc(10 * var(--k)) calc(16 * var(--k));transform:rotate(-5deg);transform-origin:0 0;white-space:nowrap;z-index:6}

/* описание */
.adv-intro{text-align:center;font-size:20px;line-height:22px;display:flex;flex-direction:column;gap:12px}
.adv-intro b{font-weight:600}

/* сетка карточек */
.adv-grid{display:grid;grid-template-columns:repeat(20,1fr);gap:12px;width:var(--gw)}
.adv-days{display:none}

/* карточка */
.adv-card{position:relative;grid-column:span 4;height:calc(360 * var(--u));text-align:left;outline:none;
 --c:#fbf6ed;transition:transform .2s}
.adv .adv-card{color:var(--c)}
.adv-card.wide{grid-column:span 5}
.adv-card.white{--c:#2d1710}
.adv-card .bd{position:absolute;inset:0;overflow:hidden;background:var(--bg)}
.adv-card.green{--bg:#6b7a3a;--ci:#55622d;--fd:#3b451e;--ff:#9baf5a;--gdx:12.5;--gdy:-11;--gr:-10deg}
.adv-card.white{--bg:#e3d7c5;--ci:#ae9e85;--fd:#8b7657;--ff:#faf5ed;--gdx:-10;--gdy:12;--gr:9deg}
.adv-card.red{--bg:#d7261e;--ci:#ac1711;--fd:#97140e;--ff:#f35851;--gdx:0;--gdy:0;--gr:0deg}
.adv-card:focus-visible{box-shadow:0 0 0 3px #fbf6ed,0 0 0 5px #2d1710}
.adv-card .pat{position:absolute;inset:0}
.adv-card .pat.stripes{background:repeating-linear-gradient(119deg,transparent 0 calc(15 * var(--u)),rgba(0,0,0,.06) calc(15 * var(--u)) calc(55 * var(--u)))}
.adv-card .pat.dots{background-image:radial-gradient(rgba(45,23,16,.32) calc(1.5 * var(--u)),transparent calc(1.9 * var(--u)));background-size:calc(13 * var(--u)) calc(13 * var(--u));background-position:calc(4 * var(--u)) calc(4 * var(--u))}
.adv-card .pat.img{background-repeat:repeat-x;background-position:calc(-23 * var(--u)) calc(5 * var(--u));background-size:calc(270 * var(--u)) calc(360 * var(--u))}
.adv-card .toy{position:absolute;pointer-events:none}
.adv-card .top{position:absolute;left:calc(32 * var(--u));right:calc(32 * var(--u));top:calc(32 * var(--u));height:calc(189 * var(--u));
 display:flex;flex-direction:column;justify-content:center;gap:calc(16 * var(--u))}
.adv-card .lb{font-family:AdvCaveat,cursive;font-weight:700;font-size:calc(28 * var(--u));line-height:.8}
.adv-card .tt{font-family:AdvFira,Impact,sans-serif;font-weight:900;font-size:calc(40 * var(--u));line-height:.95;text-transform:uppercase;
 overflow-wrap:break-word;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
.adv-card.open .tt{line-height:1.1}
.adv-card .nm{position:absolute;left:calc(32 * var(--u));bottom:calc(32 * var(--u));font-family:AdvFira,Impact,sans-serif;font-weight:900;
 font-size:calc(96 * var(--u));line-height:.95}
.adv-card .ci,.adv-card .st,.adv-card .gf,.adv-card .ar,.adv-card .pr,.adv-card .fd,.adv-card .ff,.adv-card .kt{display:none}
/* доступное окошко */
.adv-card.open .ci,.adv-card.open .st,.adv-card.open .gf,.adv-card.open .ar,.adv-card.open .pr{display:block}
.adv-card.open .fd,.adv-card.open .ff,.adv-card.open .kt,.adv-card.opened .fd,.adv-card.opened .ff,.adv-card.opened .kt{display:block}
.adv-card .ci{position:absolute;width:calc(682 * var(--u));height:calc(682 * var(--u));border-radius:50%;background:var(--ci);
 left:calc(100% - 372 * var(--u));top:calc(100% - 381 * var(--u));transform:scale(.2346);transition:all .45s cubic-bezier(.22,1,.36,1)}
.adv-card .st{position:absolute;left:0;top:calc(2 * var(--u));width:100%;height:calc(357 * var(--u));object-fit:cover;object-position:left top;opacity:0;transition:opacity .45s ease-out}
.adv-card .gf{position:absolute;width:calc(145 * var(--u));height:calc(140 * var(--u));
 left:calc(100% - 158.5 * var(--u));top:calc(100% - 145 * var(--u));transform:scale(.841);transition:all .45s cubic-bezier(.22,1,.36,1)}
.adv-card .gf img{width:100%;height:100%;object-fit:contain;transform-origin:50% 80%}
.adv-card .ar{position:absolute;width:calc(46 * var(--u));height:calc(47 * var(--u));right:calc(33 * var(--u));bottom:calc(110 * var(--u));transition:opacity .3s}
.adv-card.green .ar{right:calc(16 * var(--u));bottom:calc(134 * var(--u))}
.adv-card .ar svg{width:100%;height:100%}
.adv-card .pr{position:absolute;left:calc(32 * var(--u));right:calc(32 * var(--u));bottom:calc(71 * var(--u));text-align:center;
 font-family:AdvCaveat,cursive;font-weight:700;font-size:calc(42 * var(--u));line-height:.8;opacity:0;transform:translateY(calc(8 * var(--u)));transition:all .4s ease-out}
/* хлястик */
.adv-card .fd,.adv-card .ff{position:absolute;right:calc(-12 * var(--u));top:calc(-10 * var(--u));width:calc(234 * var(--u));height:calc(212 * var(--u));
 transform-origin:calc(222 * var(--u)) calc(10 * var(--u));transform:scale(.4608);transition:transform .45s cubic-bezier(.22,1,.36,1),opacity .3s;pointer-events:none;overflow:visible}
.adv-card .ff{filter:drop-shadow(0 2px 6px rgba(0,0,0,.16))}
.adv-card .fd path{fill:var(--fd)}.adv-card .ff path{fill:var(--ff)}
.adv-card .kt{position:absolute;right:calc(-5 * var(--u));top:calc(-19 * var(--u));width:calc(130 * var(--u));height:calc(164 * var(--u));
 transform:translate(calc(8 * var(--u)),calc(-29 * var(--u))) scale(.246);transition:transform .45s cubic-bezier(.22,1,.36,1),opacity .3s;pointer-events:none}
.adv-card .kt img{width:100%;height:100%;object-fit:contain}
.adv-card .fdw{position:absolute;inset:0;overflow:hidden;pointer-events:none}
@media (hover:hover){
 .adv-card.open:hover .ci{left:calc(50% - 341 * var(--u));top:calc(50% - 341 * var(--u));transform:scale(1)}
 .adv-card.open:hover .st{opacity:1}
 .adv-card.open:hover .gf{left:calc(50% + (var(--gdx) - 72.5) * var(--u));top:calc(50% + (var(--gdy) - 70) * var(--u));transform:rotate(var(--gr))}
 .adv-card.open:hover .gf img{animation:advWig 1.1s ease-in-out .35s infinite}
 .adv-card.open:hover .ar{opacity:0}
 .adv-card.open:hover .pr{opacity:1;transform:none}
 .adv-card.open:hover .fd,.adv-card.open:hover .ff,.adv-card.open:hover .kt{opacity:0}
 .adv-card.opened:hover .fd,.adv-card.opened:hover .ff{transform:scale(1)}
 .adv-card.opened:hover .kt{transform:none}
}
.adv-card.closed{transition:transform .3s cubic-bezier(.22,1,.36,1)}
@media (hover:hover){.adv-card.closed:hover{transform:translateY(-6px)}.adv-card.closed:hover .toy{animation:advWig 1.4s ease-in-out infinite;transform-origin:50% 90%}}
.adv-card.shake{animation:advShake .5s cubic-bezier(.36,.07,.19,.97)}
@keyframes advShake{10%,90%{transform:translateX(-1px) rotate(-.3deg)}20%,80%{transform:translateX(3px) rotate(.6deg)}
 30%,50%,70%{transform:translateX(-5px) rotate(-.9deg)}40%,60%{transform:translateX(5px) rotate(.9deg)}}
@keyframes advWig{0%,100%{transform:rotate(0) translateY(0)}20%{transform:rotate(-5deg) translateY(-2%)}40%{transform:rotate(4deg) translateY(0)}
 60%{transform:rotate(-3deg) translateY(-1%)}80%{transform:rotate(2deg)}}

/* подписка */
.adv-sub{display:flex;flex-direction:column;gap:16px;width:100%}
.adv-subh{display:flex;justify-content:space-between;align-items:center;gap:16px;width:100%}
.adv-subh p{margin:0;font-size:20px;line-height:24px;max-width:430px}
.adv-btns{display:flex;gap:12px;flex-wrap:wrap}
.adv-btn{display:inline-flex;align-items:center;gap:8px;height:60px;padding:16px 24px;font-weight:600;font-size:16px;line-height:1.2;
 border:2px solid #2d1710;transition:background .2s,color .2s,transform .2s}
.adv-btn svg{width:24px;height:24px;transition:transform .25s}
.adv-btn.dk{background:#2d1710;color:#f1eadf}
.adv-btn.dk:hover{background:#4a2a1f;border-color:#4a2a1f}
.adv-btn.ol{color:#2d1710}
.adv-btn.ol:hover{background:#2d1710;color:#f1eadf}
.adv-btn:hover svg{transform:translateX(3px)}
.adv-btn:active{transform:translateY(1px)}
.adv-btn.rd{background:#d7261e;border-color:#d7261e;color:#f1eadf}
.adv-btn.rd:hover{background:#b10921;border-color:#b10921}
.adv-more{display:flex;flex-direction:column;align-items:center;gap:24px;width:100%;text-align:center}
.adv-more p{margin:0;font-size:20px;line-height:1.2;color:#2d1710}
.adv-more b{font-family:AdvFira,Impact,sans-serif;font-weight:900;font-size:24px;text-transform:uppercase;letter-spacing:0}
.adv .adv-more a.adv-btn{text-decoration:none}

/* нижний баннер */
.adv-ban2 .adv-elk2{left:calc(436 * var(--k));top:calc(42 * var(--k));width:calc(404 * var(--k));height:calc(556 * var(--k));filter:blur(calc(5 * var(--k)));opacity:.85}
.adv-ban2 .glow{left:calc(396 * var(--k));top:calc(121 * var(--k));width:calc(484 * var(--k));height:calc(484 * var(--k));border-radius:50%;
 background:radial-gradient(closest-side,rgba(115,10,6,.14),rgba(115,10,6,0))}
.adv-ban2 .s1{left:0;top:calc(148 * var(--k));width:calc(571 * var(--k));height:calc(357 * var(--k))}
.adv-ban2 .s2{left:calc(727 * var(--k));top:calc(148 * var(--k));width:calc(571 * var(--k));height:calc(357 * var(--k))}
.adv-ban2 .cat{left:calc(553 * var(--k));top:calc(-24 * var(--k));width:calc(171 * var(--k));height:calc(234 * var(--k));z-index:6}
.adv-ban2 .cat img{width:100%;height:100%;object-fit:contain;object-position:top center}
.adv-ban2 .adv-h1{position:absolute;left:0;right:0;top:calc(233 * var(--k));font-size:calc(96 * var(--k));line-height:.95;z-index:5}
.adv-ban2 .adv-hand{position:absolute;left:calc(363 * var(--k));width:calc(550 * var(--k));top:calc(364 * var(--k));font-size:calc(46 * var(--k));z-index:5}
.adv-ban2 .orn{left:calc(33 * var(--k));top:calc(264.5 * var(--k));width:calc(1140 * var(--k));height:calc(480.5 * var(--k));z-index:6}
.adv-ban2 .m{display:none}

/* футер */
.adv-foot{display:flex;justify-content:space-between;align-items:center;font-size:14px;line-height:20px;padding:0 0 28px;width:100%}
.adv-foot .l{display:flex;gap:12px}.adv-foot b{font-weight:600}
.adv-foot a:hover{color:#d7261e}

/* мобайл: < 700px */
.adv-hero .adv-hand .mb{display:none}
@container adv (max-width:699px){
 .adv-in{--m:calc((100cqw - 32px) / 398);--gw:calc(100cqw - 32px);--u:calc((var(--gw) - 12px) / 2 / 322);padding:16px}
 .adv-by{justify-content:space-between;font-size:14px}
 .adv-ban{height:calc(663 * var(--m))}
 .adv-stage{width:100%;left:0;transform:none}
 .adv-hero .adv-clip{display:none}
 .adv-hero .adv-fx{z-index:1}
 .adv-ban2 .gclip{display:block}
 .adv-goat{width:calc(430 * var(--m));height:calc(430 * var(--m));margin-left:calc(-215 * var(--m))}
 .adv-hero .tw{left:calc(53 * var(--m));right:auto;top:calc(78 * var(--m));gap:calc(10 * var(--m));font-size:calc(16 * var(--m))}
 .adv-hero .tw svg{width:calc(12 * var(--m));height:calc(12 * var(--m))}
 .adv-hero .tw svg:last-child{display:none}
 .adv-hero .adv-h1{left:calc(16 * var(--m));right:calc(16 * var(--m));top:calc(192 * var(--m));font-size:calc(64 * var(--m))}
 .adv-hero .adv-hand{left:calc(16 * var(--m));width:calc(366 * var(--m));top:calc(420 * var(--m));font-size:calc(32 * var(--m))}
 .adv-hero .adv-hand svg{left:calc(306 * var(--m));top:calc(52 * var(--m));width:calc(36 * var(--m));height:calc(63 * var(--m))}
 .adv-hero .adv-hand .d{display:none}.adv-hero .adv-hand .mb{display:block}
 .adv .adv-elka,.adv .adv-tst{display:none}
 .adv-ded{left:calc(202 * var(--m));top:calc(-5 * var(--m));width:calc(150 * var(--m));height:calc(166 * var(--m))}
 .adv-cst{left:calc(115 * var(--m));top:calc(503 * var(--m));width:calc(168 * var(--m));height:calc(105 * var(--m))}
 .adv-cnt{left:calc(136 * var(--m));top:calc(503 * var(--m));width:calc(130 * var(--m));height:calc(130 * var(--m))}
 .adv-cnt .n{font-size:calc(42 * var(--m))}
 .adv-cnt .w{font-size:calc(6.5 * var(--m))}
 .adv-cnt.soon .n{font-size:calc(17 * var(--m))}
 .adv-tag{left:calc(18 * var(--m));top:calc(642 * var(--m));font-size:calc(23 * var(--m));padding:calc(6 * var(--m)) calc(12 * var(--m));transform:rotate(3deg)}
 .adv-intro{font-size:20px;line-height:22px}
 .adv-days{display:flex;flex-direction:column;gap:16px;width:var(--gw);align-items:center}
 .adv-days h3{margin:0;font-size:20px;line-height:22px;font-weight:600}
 .adv-days .row{display:flex;flex-wrap:wrap;gap:8px;justify-content:center}
 .adv-days button{width:40px;height:40px;background:#e3d7c5;border-bottom:1px solid #2d1710;font-weight:700;font-size:16px;line-height:1.1;transition:background .2s,color .2s}
 .adv-days button.on{background:#d7261e;color:#fbf6ed;border-color:#d7261e}
 .adv-grid{grid-template-columns:1fr 1fr}
 .adv-card,.adv-card.wide{grid-column:span 1;height:calc(322 * var(--u))}
 .adv-card .top{left:calc(26.7 * var(--u));right:calc(26.7 * var(--u));top:calc(26.7 * var(--u));height:calc(185 * var(--u))}
 .adv-card .nm{left:calc(26.7 * var(--u));bottom:calc(26.7 * var(--u))}
 .adv-subh{flex-direction:column;align-items:center;gap:24px;text-align:center}
 .adv-subh p{max-width:none}
 .adv-subh p .b{display:block;margin-top:24px;font-weight:500}
 .adv-btns{justify-content:center}
 .adv-ban.adv-ban2{height:calc(759 * var(--m))}
 .adv-ban2 .d{display:none}.adv-ban2 .m{display:block}
 .adv-ban2 .s1{left:calc(-86 * var(--m));top:calc(34 * var(--m));width:calc(571 * var(--m));height:calc(357 * var(--m))}
 .adv-ban2 .s2,.adv-ban2 .orn{display:none}
 .adv-ban2 .adv-elk2{left:calc(29 * var(--m));top:calc(262 * var(--m));width:calc(341 * var(--m));height:calc(469 * var(--m));filter:blur(calc(4 * var(--m)));opacity:.85}
 .adv-ban2 .glow{left:calc(-34 * var(--m));top:calc(206 * var(--m));width:calc(484 * var(--m));height:calc(484 * var(--m))}
 .adv-ban2 .cat{left:calc(114 * var(--m));top:calc(-24 * var(--m));width:calc(171 * var(--m));height:calc(234 * var(--m))}
 .adv-ban2 .adv-h1{left:calc(24 * var(--m));right:calc(24 * var(--m));top:calc(214 * var(--m));font-size:calc(80 * var(--m))}
 .adv-ban2 .adv-h1 .a{display:block;font-size:calc(56 * var(--m));margin-bottom:calc(12 * var(--m))}
 .adv-ban2 .adv-hand{left:calc(24 * var(--m));width:calc(350 * var(--m));top:calc(471 * var(--m));font-size:calc(34 * var(--m))}
 .adv-foot{flex-direction:column;align-items:center;gap:12px;padding:0 0 32px;text-align:center}
 .adv-foot .l{justify-content:center;flex-wrap:wrap}
 .adv .adv-foot>a{text-decoration:underline;text-underline-offset:2px}
}

/* диалог */
.adv-dlg{position:fixed;inset:0;z-index:99999;display:flex;align-items:flex-start;justify-content:center;overflow-y:auto;
 padding:40px 16px;opacity:0;visibility:hidden;transition:opacity .3s ease-out,visibility 0s .3s;-webkit-overflow-scrolling:touch;
 font-family:AdvOnest,Arial,sans-serif;color:#2d1710}
.adv-dlg *,.adv-dlg *::before,.adv-dlg *::after{box-sizing:border-box}
.adv-dlg button{font:inherit;color:inherit;background:none;border:0;padding:0;margin:0;cursor:pointer;box-shadow:none;-webkit-appearance:none;appearance:none}
.adv-dlg a{text-decoration:none}
.adv-dlg.on{opacity:1;visibility:visible;transition:opacity .3s ease-out}
.adv-dlg .ov{position:fixed;inset:0;background:rgba(45,23,16,.8)}
.adv-dlg canvas{position:fixed;inset:0;width:100vw;height:100vh;pointer-events:none}
.adv-dlg .box{position:relative;margin:auto;width:850px;max-width:100%;padding:8px;background:rgba(243,239,230,.08);
 transform:translateY(16px) scale(.97);transition:transform .45s cubic-bezier(.22,1,.36,1)}
.adv-dlg.on .box{transform:none}
.adv-dlg .in{background:#e3d7c5;padding:16px;display:flex;flex-direction:column;gap:12px}
.adv-dlg .x{align-self:flex-end;width:40px;height:40px;display:flex;align-items:center;justify-content:center;transition:transform .25s}
.adv-dlg .x:hover{transform:rotate(90deg)}
.adv-dlg .x:focus{outline:none}.adv-dlg .x:focus-visible{outline:2px solid #2d1710;outline-offset:2px}
.adv-card:focus{outline:none}
.adv-dlg .x svg{width:31px;height:31px}
.adv-dlg .hd{display:flex;gap:12px;font-family:AdvFira,Impact,sans-serif;font-size:24px;line-height:.95;text-transform:uppercase}
.adv-dlg .hd b{font-weight:900}.adv-dlg .hd span{font-weight:400}
.adv-dlg .ct{background:#fffcf6;border:2px dashed #d7261e;padding:34px;display:flex;flex-direction:column;gap:52px}
.adv-dlg .lb{font-family:AdvCaveat,cursive;font-weight:700;font-size:28px;line-height:.8}
.adv-dlg h2{margin:16px 0 0;font-family:AdvFira,Impact,sans-serif;font-weight:900;font-size:60px;line-height:.95;text-transform:uppercase;color:#d7261e;letter-spacing:0}
.adv-dlg .tx{border-left:2px solid #d7261e;padding-left:12px;font-size:18px;line-height:1.16;min-height:120px}
.adv-dlg .tx.ph{min-height:388px}
.adv-dlg .tx p{margin:0 0 12px}
.adv-dlg .tx img,.adv-dlg .tx video{display:block;width:100%;height:auto;margin-top:16px}
.adv-dlg .tx img.ex{width:min(360px,100%);margin:4px 0 16px;border-radius:8px}
.adv-dlg .tx a{color:#d7261e}
.adv-dlg .pv{margin:-28px 0 0}
.adv-dlg .pv img,.adv-dlg .pv video{display:block;width:100%;height:auto;border-radius:12px}
.adv-dlg .pv.site{position:relative;aspect-ratio:16/9;border-radius:12px;overflow:hidden;background:#0b1630}
.adv-dlg .pv.site iframe{position:absolute;inset:0;width:100%;height:100%;border:0}
.adv-dlg .pv.site .poster{display:none;position:absolute;inset:0;width:100%;height:100%;object-fit:cover;border-radius:0}
.adv-dlg .pv.site .open{position:absolute;right:12px;bottom:12px;height:44px;padding:10px 16px}
@container adv (max-width:699px){}
@media (max-width:699px){.adv-dlg .pv.site .open{right:8px;bottom:8px;height:36px;padding:6px 12px;font-size:14px}.adv-dlg .pv{margin:-8px 0 0}}
@media (hover:none),(max-width:699px){.adv-dlg .pv.site iframe{display:none}.adv-dlg .pv.site .poster{display:block}}
.adv-dlg .gt{display:flex;flex-direction:column;gap:16px;font-size:18px;line-height:1.16}
.adv-dlg .bt{display:flex;align-items:center;gap:12px;flex-wrap:wrap}
.adv-dlg .bt .adv-btn{text-decoration:none}
.adv-dlg .meta{color:#6a5850;font-size:16px;line-height:1.16}
.adv-dlg .adv-btn{display:inline-flex;align-items:center;gap:8px;height:60px;padding:16px 24px;font-weight:600;font-size:16px;line-height:1.2;
 border:2px solid #2d1710;transition:background .2s,color .2s,transform .2s;color:#2d1710}
.adv-dlg .adv-btn svg{width:24px;height:24px;transition:transform .25s}
.adv-dlg .adv-btn.dk{background:#2d1710;color:#f1eadf}
.adv-dlg .adv-btn.dk:hover{background:#4a2a1f;border-color:#4a2a1f}
.adv-dlg .adv-btn.ol:hover{background:#2d1710;color:#f1eadf}
.adv-dlg .adv-btn:hover svg{transform:translateX(3px)}
@media (max-width:699px){
 .adv-dlg{padding:16px}
 .adv-dlg .box{width:398px}
 .adv-dlg .hd{font-size:18px}
 .adv-dlg .ct{padding:16px}
 .adv-dlg .lb{font-size:22px}
 .adv-dlg h2{font-size:42px}
 .adv-dlg .tx{font-size:16px}
 .adv-dlg .bt{flex-direction:column;align-items:flex-start}
}
@media (prefers-reduced-motion:reduce){
 .adv-card.shake,.adv-card .gf img{animation:none!important}
}
`;

  /* ---------- svg ---------- */
  var SV = {
    star: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 0C9.1 6.9 9.1 6.9 16 8C9.1 9.1 9.1 9.1 8 16C6.9 9.1 6.9 9.1 0 8C6.9 6.9 6.9 6.9 8 0Z" fill="#FFCF3A"/></svg>',
    hand: '<svg class="d" viewBox="0 0 50 60" aria-hidden="true"><path d="M45.38 1.98C45.17 1.12 45.69.26 46.55.05c.86-.21 1.73.31 1.94 1.17L46.93 1.6zM23.73 28.04l-.5 1.52zM46.93 1.6l1.55-.38c1.9 7.74.06 16.18-4.47 22.03-4.59 5.92-11.97 9.2-20.79 6.31l.5-1.52.5-1.52c7.39 2.42 13.4-.25 17.26-5.23 3.92-5.06 5.57-12.5 3.9-19.31zM23.73 28.04l-.5 1.52c-5.29-1.73-8.47-4.29-9.87-7.17-1.42-2.92-.86-5.9.78-7.98 1.62-2.05 4.33-3.25 7.19-2.61 2.87.65 5.47 3.06 7.18 7.37l-1.49.59-1.49.59c-1.47-3.7-3.4-5.08-4.9-5.42-1.53-.34-3.04.28-3.98 1.47-.92 1.16-1.26 2.84-.41 4.6.88 1.8 3.15 3.94 7.99 5.52zm3.29-8.28l1.49-.59c2.61 6.58 2.64 13.16.17 19.07-2.47 5.89-7.36 10.97-14.35 14.7l-.75-1.41-.75-1.41c6.48-3.46 10.78-8.03 12.9-13.11 2.12-5.06 2.14-10.77-.19-16.65zM0 56.35l11.97-14.07 6.2 17.4z" fill="#FBF6ED"/></svg>',
    handM: '<svg class="mb" viewBox="0 0 36 63" aria-hidden="true"><path d="M6.29 2.72C5.56 2.46 5.18 1.66 5.43.93 5.69.21 6.49-.18 7.22.08l-.47 1.32zM15.08 31.46l.87 1.09zM6.75 1.4l.47-1.32c6.66 2.35 12.01 7.81 14.15 14.01 2.16 6.28 1.01 13.33-5.41 18.46l-.87-1.09-.87-1.09c5.39-4.31 6.33-10.07 4.51-15.36C16.87 9.63 12.15 4.79 6.29 2.72zm8.33 30.06l.87 1.09c-3.86 3.08-7.29 4.19-10.09 3.83-2.85-.36-4.78-2.22-5.52-4.44-.73-2.19-.31-4.78 1.55-6.58 1.87-1.81 4.91-2.56 8.93-1.74l-.28 1.37-.28 1.37c-3.46-.71-5.43.05-6.42 1.01-1 .97-1.27 2.4-.84 3.68.42 1.25 1.5 2.33 3.22 2.55 1.77.23 4.46-.42 7.99-3.24zm-4.54-6.47l.28-1.37c6.17 1.27 11.07 4.46 14.25 9.19 3.17 4.72 4.53 10.85 3.87 17.89l-1.39-.13-1.39-.13c.62-6.53-.67-11.99-3.4-16.06-2.73-4.06-6.97-6.87-12.49-8.01zm14.01 37.81l-4.53-15.52 15.7 3.84z" fill="#FBF6ED"/></svg>',
    arG: '<svg viewBox="0 0 47 47" aria-hidden="true"><path d="M1.86 43.23C.92 43.14.09 43.82.01 44.76c-.09.93.6 1.76 1.53 1.85l.16-1.69zm18.58-20.45l1.52-.76zm-6.35 3.69l-.39 1.66zM1.7 44.92l-.16 1.69c6.65.62 13.43-1.95 17.73-6.44 4.37-4.56 6.2-11.15 2.69-18.15l-1.52.76-1.52.76c2.79 5.57 1.39 10.63-2.11 14.27-3.57 3.72-9.32 5.93-14.96 5.41zm18.74-22.14l1.52-.76c-2.08-4.16-4.62-6.53-7.27-7.37-2.7-.85-5.21.01-6.8 1.7-1.56 1.67-2.26 4.18-1.33 6.58.94 2.42 3.35 4.3 7.15 5.19l.39-1.66.39-1.66c-3.12-.73-4.35-2.08-4.75-3.11-.41-1.05-.13-2.2.64-3.02.74-.79 1.91-1.23 3.31-.79 1.44.45 3.39 1.95 5.25 5.65zm-6.35 3.69l-.39 1.66c5.22 1.22 10.2.7 14.52-1.48 4.31-2.18 7.86-5.95 10.32-11.04l-1.53-.74-1.53-.74c-2.2 4.53-5.25 7.7-8.8 9.49-3.54 1.79-7.69 2.26-12.21 1.21zM40.64 0L27.07 14.18l19.07 4.66z" fill="#FBF6ED"/></svg>',
    arW: '<svg viewBox="0 0 47 47" aria-hidden="true"><path d="M1.86 3.48C.92 3.56.09 2.88.01 1.94-.08 1.01.61.18 1.54.09l.16 1.69zm18.58 20.44l1.52.76zm-6.35-3.69l-.39-1.66zM1.7 1.78L1.54.09C8.19-.53 14.97 2.04 19.27 6.53c4.37 4.56 6.2 11.15 2.69 18.15l-1.52-.76-1.52-.76c2.79-5.57 1.39-10.63-2.11-14.27C13.25 5.16 7.5 2.95 1.86 3.48zm18.74 22.14l1.52.76c-2.08 4.16-4.62 6.53-7.27 7.37-2.7.85-5.21-.01-6.8-1.7-1.56-1.67-2.26-4.18-1.33-6.58.94-2.42 3.35-4.3 7.15-5.19l.39 1.66.39 1.66c-3.12.73-4.35 2.08-4.75 3.11-.41 1.05-.13 2.2.64 3.02.74.79 1.91 1.23 3.31.79 1.44-.45 3.39-1.95 5.25-5.65zm-6.35-3.69l-.39-1.66c5.22-1.22 10.2-.7 14.52 1.48 4.31 2.18 7.86 5.95 10.32 11.04l-1.53.74-1.53.74c-2.2-4.53-5.25-7.7-8.8-9.49-3.54-1.79-7.69-2.26-12.21-1.21zm26.56 26.47L27.07 32.52l19.07-4.66z" fill="currentColor"/></svg>',
    fold: '<svg viewBox="48 -10 234 212" aria-hidden="true"><path d="M92 0V115.6L270 178V0Z"/></svg>',
    flap: '<svg viewBox="48 -10 234 212" aria-hidden="true"><path d="M92.44 0L60 116.45L270.44 178Z"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2"/></svg>',
    close: '<svg viewBox="0 0 31 31" aria-hidden="true"><path d="M3.5 0L31 27.5 27.5 31 0 3.5zM27.5 0L31 3.5 3.5 31 0 27.5z" fill="#2D1710"/></svg>'
  };

  /* ---------- данные окошек ---------- */
  var DAYS = {};
  function addDay(o) { if (o && o.day) { DAYS[+o.day] = Object.assign(DAYS[+o.day] || {}, o); if (ready) refresh(); } }
  var q = window.ADVENT_DAYS = window.ADVENT_DAYS || [];
  q.forEach(addDay);
  q.push = function () { for (var i = 0; i < arguments.length; i++) addDay(arguments[i]); return Array.prototype.push.apply(this, arguments); };
  var DAYDIR = BASE + 'days/';
  function addContent(c) { if (!c) return; for (var k in c) { DAYS[+k] = Object.assign({}, DAYS[+k] || {}, c[k], { day: +k }); } if (ready) refresh(); }
  if (window.ADVENT_CONTENT) addContent(window.ADVENT_CONTENT);
  else { var ds = document.createElement('script'); ds.src = BASE + 'days.js?v=' + Date.now().toString(36).slice(0, -3); ds.onload = function () { addContent(window.ADVENT_CONTENT); }; document.head.appendChild(ds); }

  /* ---------- время (Москва) ---------- */
  function now() {
    var m = location.search.match(/advent_date=(\d{4}-\d{2}-\d{2})/);
    if (m) return new Date(m[1] + 'T12:00:00+03:00');
    return new Date();
  }
  function dayStart(d) { return new Date(Date.UTC(YEAR, 11, d, -3)); } // 00:00 МСК
  function opened() { try { return JSON.parse(localStorage.getItem(STORE) || '[]'); } catch (e) { return []; } }
  function markOpened(d) { try { var a = opened(); if (a.indexOf(d) < 0) { a.push(d); localStorage.setItem(STORE, JSON.stringify(a)); } } catch (e) {} }
  function stateOf(d) {
    var data = DAYS[d] || {}, t = TEST ? data.test : '';
    if (t === 'opened') return 'opened';
    return opened().indexOf(d) >= 0 ? 'opened' : 'closed'; // все окошки доступны сразу: «тема» → после открытия «уже открыли»
  }
  function plural(n, a, b, c) { n = Math.abs(n) % 100; var n1 = n % 10; if (n > 10 && n < 20) return c; if (n1 > 1 && n1 < 5) return b; if (n1 === 1) return a; return c; }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function nb(s) { return esc(s).replace(/(\d+-[а-яёa-z]+)/gi, '<span style="white-space:nowrap">$1</span>').replace(/(^|[\s(«])([а-яёА-ЯЁa-zA-Z]{1,2}) /g, '$1$2 ').replace(/ —/g, ' —'); }

  /* ---------- разметка ---------- */
  function cardHTML(d) {
    var code = MAP[d - 1], col = COLOR[code[0]], st = stateOf(d), data = DAYS[d] || {};
    var pat = '', toy = '';
    if (code === 'g2') pat = '<span class="pat stripes"></span>';
    if (code === 'w2') pat = '<span class="pat dots"></span>';
    if (code === 'r2') pat = '<span class="pat img" style="background-image:url(' + IMG + 'zigzag.webp);background-position:0 0"></span>';
    var t = TOY[code];
    if (t) toy = '<img class="toy" alt="" loading="lazy" src="' + IMG + t[0] + '.webp" style="right:calc(' + t[1] + ' * var(--u));bottom:calc(' + t[2] + ' * var(--u));width:calc(' + t[3] + ' * var(--u));height:calc(' + t[4] + ' * var(--u))">';
    var lb, tt;
    lb = 'тема'; tt = data.topic || 'Подарок ' + d;
    var label = 'Окошко ' + d + ': ' + (data.topic || 'подарок');
    return '<button type="button" class="adv-card ' + col + ' ' + st + (d > 20 ? ' wide' : '') + '" data-day="' + d + '" id="adv-day-' + d + '" data-topic="' + esc(data.topic || '') + '" aria-label="' + esc(label) + '">' +
      '<span class="bd">' + pat + toy +
      '<span class="top"><span class="lb">' + lb + '</span><span class="tt">' + esc(tt) + '</span></span>' +
      '<span class="nm">' + d + '</span>' +
      '<span class="ci"></span>' +
      '<img class="st" alt="" loading="lazy" src="' + IMG + 'stars.webp">' +
      '<span class="gf"><img alt="" loading="lazy" src="' + IMG + GIFT[col] + '.webp"></span>' +
      '<span class="ar"' + (col === 'white' ? ' style="color:#2d1710"' : ' style="color:#fbf6ed"') + '>' + (col === 'green' ? SV.arG : SV.arW) + '</span>' +
      '<span class="pr">жми!</span>' +
      '</span>' +
      '<span class="fd">' + SV.fold + '</span>' +
      '<span class="kt"><img alt="" loading="lazy" src="' + IMG + 'kotik.webp"></span>' +
      '<span class="ff">' + SV.flap + '</span>' +
      '</button>';
  }

  function daysLeft() {
    var ny = Date.UTC(YEAR + 1, 0, 1, -3);
    return Math.max(0, Math.ceil((ny - now().getTime()) / 864e5));
  }

  function pageHTML() {
    var n = daysLeft();
    var cards = ''; for (var d = 1; d <= 24; d++) cards += cardHTML(d);
    var chips = ''; for (d = 1; d <= 24; d++) chips += '<button type="button" data-go="' + d + '">' + d + '</button>';
    return '<div class="adv-bg"></div><canvas class="adv-dust" aria-hidden="true"></canvas>' +
      '<div class="adv-in">' +
      '<div class="adv-blk">' +
      '<div class="adv-by"><span>Вита, UX/UI-дизайнер</span><a href="' + esc(CFG.site) + '" target="_blank" rel="noopener"><b>vitadi.design</b></a></div>' +
      '<section class="adv-ban adv-hero" aria-label="Адвент-календарь дизайнера">' +
      '<div class="adv-clip"><div class="adv-goat" aria-hidden="true"></div></div>' +
      '<div class="adv-stage">' +
      '<img class="adv-ab adv-tst" alt="" src="' + IMG + 'stars.webp">' +
      '<img class="adv-ab adv-elka" alt="" src="' + IMG + 'elka.webp">' +
      '<img class="adv-ab adv-cst" alt="" src="' + IMG + 'stars.webp">' +
      (CFG.countdown
        ? '<div class="adv-ab adv-cnt" aria-label="До Нового года ' + n + ' ' + plural(n, 'день', 'дня', 'дней') + '"><span class="cw"><img alt="" src="' + IMG + 'counter.webp"><span class="n">' + n + '</span><span class="w">' + plural(n, 'день', 'дня', 'дней') + '</span></span></div>'
        : '<div class="adv-ab adv-cnt soon" aria-label="До Нового года осталось немного"><span class="cw"><img alt="" src="' + IMG + 'counter.webp"><span class="n">осталось<br>немного</span></span></div>') +
      '<img class="adv-ab adv-ded" alt="" src="' + IMG + 'ded.webp">' +
      '<div class="tw">' + SV.star + '<span>твори волшебство</span>' + SV.star + '</div>' +
      '<h1 class="adv-h1">Адвент-календарь<br>дизайнера</h1>' +
      '<div class="adv-hand">Нажми на любое окошко, чтобы развернуть.' + SV.hand + SV.handM + '</div>' +
      '<div class="adv-tag">Декабрь ' + YEAR + '</div>' +
      '</div><div class="adv-gifts" aria-hidden="true"></div><canvas class="adv-fx" aria-hidden="true"></canvas></section></div>' +
      '<div class="adv-intro"><b>24 подарка для дизайнеров: шаблоны, промпты и дизайн-система.</b><span>Все окошки уже открыты — выбирай любое.</span></div>' +
      '<div class="adv-days"><h3>Выбери день</h3><div class="row">' + chips + '</div></div>' +
      '<div class="adv-grid">' + cards + '</div>' +
      '<div class="adv-sub">' +
      '<div class="adv-subh"><p>Анонс каждого окошка выходит роликом.<span class="b"> Подпишись, чтобы не пропустить.</span></p><div class="adv-btns">' +
      '<a class="adv-btn dk" href="' + esc(CFG.vk) + '" target="_blank" rel="noopener">ВКонтакте' + SV.arrow + '</a>' +
      '<a class="adv-btn ol" href="' + esc(CFG.tg) + '" target="_blank" rel="noopener">Telegram' + SV.arrow + '</a></div></div>' +
      '<section class="adv-ban adv-ban2" aria-label="Счастливого Нового года">' +
      '<div class="adv-clip"><div class="adv-stage">' +
      '<img class="adv-ab s1" alt="" loading="lazy" src="' + IMG + 'stars.webp"><img class="adv-ab s2" alt="" loading="lazy" src="' + IMG + 'stars.webp">' +
      '<img class="adv-ab adv-elk2" alt="" loading="lazy" src="' + IMG + 'elka.webp"><div class="adv-ab glow"></div></div></div>' +
      '<div class="adv-stage">' +
      '<div class="adv-ab cat"><img alt="" loading="lazy" src="' + IMG + 'cat.webp"></div>' +
      '<h2 class="adv-h1"><span class="d">Счастливого нового года!</span><span class="m"><span class="a">счастливого</span>нового года!</span></h2>' +
      '<div class="adv-hand">Пусть все твои мечты сбываются каждый день</div>' +
      '<img class="adv-ab orn" alt="" loading="lazy" src="' + IMG + 'ornaments.webp?v=3">' +
      '</div><div class="adv-clip gclip"><div class="adv-goat g2" aria-hidden="true"></div></div><canvas class="adv-fx" aria-hidden="true"></canvas></section>' +
      '<div class="adv-more"><p>Больше полезного ищи<br>в <b>справочнике дизайнера</b></p><a class="adv-btn rd" href="' + esc(CFG.shpora) + '">Открыть</a></div></div>' +
      '<footer class="adv-foot"><div class="l"><span>Вита, UX/UI-дизайнер</span><a href="' + esc(CFG.site) + '" target="_blank" rel="noopener"><b>vitadi.design</b></a></div>' +
      '<a href="' + esc(CFG.privacy) + '">Политика конфиденциальности</a></footer>' +
      '</div>';
  }

  /* ---------- монтирование ---------- */
  var root, ready = false;
  function mount() {
    var host = document.getElementById('advent');
    if (!host) { host = document.createElement('div'); host.id = 'advent'; (SCRIPT && SCRIPT.parentNode ? SCRIPT.parentNode.insertBefore(host, SCRIPT) : document.body.appendChild(host)); }
    if (!document.getElementById('adv-css')) { var st = document.createElement('style'); st.id = 'adv-css'; st.textContent = CSS; document.head.appendChild(st); }
    root = document.createElement('div'); root.className = 'adv';
    root.innerHTML = pageHTML();
    host.innerHTML = ''; host.appendChild(root);
    ready = true;
    bindCards(); bindCal(); initGoat(); initDust(); initDays(); initGifts();
  }

  function refresh() {
    if (!root) return;
    for (var d = 1; d <= 24; d++) {
      var el = root.querySelector('#adv-day-' + d), want = stateOf(d);
      var data = DAYS[d] || {};
      if (!el) continue;
      if (!el.classList.contains(want) || el.getAttribute('data-topic') !== (data.topic || '')) {
        var tmp = document.createElement('div'); tmp.innerHTML = cardHTML(d);
        var nu = tmp.firstChild; nu.setAttribute('data-topic', data.topic || '');
        el.parentNode.replaceChild(nu, el);
      }
    }
    var cn = root.querySelector('.adv-cnt');
    if (cn && CFG.countdown) { var n = daysLeft(), w = plural(n, 'день', 'дня', 'дней'); cn.querySelector('.n').textContent = n; cn.querySelector('.w').textContent = w; cn.setAttribute('aria-label', 'До Нового года ' + n + ' ' + w); }
    var chips = root.querySelectorAll('.adv-days button');
    for (var i = 0; i < chips.length; i++) chips[i].classList.add('on');
  }

  /* ---------- карточки ---------- */
  function shake(el) { el.classList.remove('shake'); void el.offsetWidth; el.classList.add('shake'); }
  function bindCal() {
    var cal = root.querySelector('.adv-cnt'); if (!cal) return;
    cal.addEventListener('click', function () { cal.classList.remove('tap'); void cal.offsetWidth; cal.classList.add('tap'); });
    cal.addEventListener('animationend', function (e) { if (e.animationName === 'advCalTap') cal.classList.remove('tap'); });
  }
  function bindCards() {
    var grid = root.querySelector('.adv-grid');
    grid.addEventListener('animationend', function (e) { if (e.animationName === 'advShake') e.target.classList.remove('shake'); });
    grid.addEventListener('click', function (e) {
      var c = e.target.closest && e.target.closest('.adv-card'); if (!c) return;
      activate(+c.getAttribute('data-day'), c);
    });
  }
  function activate(d, c) {
    c = c || root.querySelector('#adv-day-' + d);
    var st = stateOf(d);
    openDialog(d, c);
  }

  function initDays() {
    var row = root.querySelector('.adv-days .row'); if (!row) return;
    refresh();
    setInterval(refresh, 60000);
    document.addEventListener('visibilitychange', function () { if (!document.hidden) refresh(); });
    row.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      var d = +b.getAttribute('data-go'), c = root.querySelector('#adv-day-' + d);
      openDialog(d, c);
    });
  }

  /* ---------- диалог ---------- */
  var dlg, dlgCanvas, lastFocus, flakes;
  function mdHTML(src) {
    var TG = '<p><b>Подписывайся: рассказываю больше полезного в Telegram:</b><br><a href="' + esc(CFG.tg) + '" target="_blank" rel="noopener"><b><u>t.me/vitadidesign</u></b></a></p>';
    return String(src || '').split(/\n\s*\n/).map(function (blk) {
      var lines = blk.split('\n'), out = [], buf = [];
      function flush() { if (buf.length) { out.push('<p>' + buf.join('<br>') + '</p>'); buf = []; } }
      lines.forEach(function (ln) {
        var t = ln.trim(); if (!t) return;
        if (t === '{tg}') { flush(); out.push(TG); return; }
        var im = t.match(/^\{img:([\w-]+)\}$/);
        if (im) { flush(); out.push('<img class="ex" loading="lazy" alt="" src="' + DAYDIR + im[1] + '.webp">'); return; }
        if (t.indexOf('## ') === 0) buf.push('<b>' + nb(t.slice(3)) + '</b>'); else buf.push(nb(t));
      });
      flush(); return out.join('');
    }).join('');
  }
  function dlgHTML(d) {
    var data = DAYS[d] || {};
    var title = data.title || ('Окошко ' + d);
    var img = data.media ? (/^https?:/.test(data.media) ? data.media : DAYDIR + data.media + '.webp') : '';
    var media = '';
    if (data.site) {
      media = '<div class="pv site"><iframe src="' + esc(data.site) + '" title="Превью сайта" loading="lazy"></iframe>' +
        (img ? '<img class="poster" src="' + esc(img) + '" alt="">' : '') +
        '<a class="adv-btn rd open" href="' + esc(data.site) + '" target="_blank" rel="noopener">Открыть сайт' + SV.arrow + '</a></div>';
    } else if (img) media = /\.(mp4|webm|mov)(\?|$)/i.test(img)
      ? '<div class="pv"><video src="' + esc(img) + '" autoplay muted loop playsinline></video></div>'
      : '<div class="pv"><img src="' + esc(img) + '" alt=""></div>';
    var text = data.body ? mdHTML(data.body) : (data.text ? (/<[a-z]/i.test(data.text) ? data.text : '<p>' + nb(data.text) + '</p>') : '');
    var btns = '';
    if (data.figma) btns += '<a class="adv-btn dk" href="' + esc(data.figma) + '" target="_blank" rel="noopener">' + esc(data.figmaLabel || 'Ссылка в figma') + SV.arrow + '</a>';
    if (data.download) btns += '<a class="adv-btn ol" href="' + esc(data.download) + '" target="_blank" rel="noopener" download>' + esc(data.downloadLabel || 'Скачать') + '</a>';
    return '<div class="ov"></div><canvas aria-hidden="true"></canvas>' +
      '<div class="box" role="dialog" aria-modal="true" aria-labelledby="adv-dlg-t"><div class="in">' +
      '<button type="button" class="x" aria-label="Закрыть">' + SV.close + '</button>' +
      '<div class="hd"><b>Карточка ' + d + '</b><span>' + d + ' ' + MONTHS + '</span></div>' +
      '<div class="ct">' +
      '<div><div class="lb">' + esc(data.label || 'тема') + '</div><h2 id="adv-dlg-t">' + nb(title) + '</h2></div>' +
      media +
      (text ? '<div class="tx">' + text + '</div>' : '') +
      (btns ? '<div class="gt"><div>' + esc(data.getLabel || 'Получить файлы') + '</div><div class="bt">' + btns +
        (data.files ? '<span class="meta">' + esc(data.files) + '</span>' : '') + '</div></div>' : '') +
      '</div></div></div>';
  }
  function openDialog(d, card) {
    if (!dlg) {
      dlg = document.createElement('div'); dlg.className = 'adv-dlg';
      document.body.appendChild(dlg);
      dlg.addEventListener('click', function (e) { if (e.target.classList.contains('ov') || e.target.closest('.x')) closeDialog(); });
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && dlg.classList.contains('on')) closeDialog(); });
    }
    lastFocus = card || document.activeElement;
    dlg.innerHTML = dlgHTML(d); dlg.setAttribute('data-day', d);
    dlgCanvas = dlg.querySelector('canvas');
    document.documentElement.style.overflow = 'hidden';
    requestAnimationFrame(function () { dlg.classList.add('on'); var x = dlg.querySelector('.x'); x && x.focus({ preventScroll: true }); });
    startSnow();
    var data = DAYS[d] || {};
    if (!(TEST && data.test === 'opened')) markOpened(d);
  }
  function closeDialog() {
    if (!dlg) return;
    dlg.classList.remove('on');
    document.documentElement.style.overflow = '';
    stopSnow();
    setTimeout(function () { refresh(); var d = +dlg.getAttribute('data-day'); var c = root.querySelector('#adv-day-' + d); if (c) c.focus({ preventScroll: true }); }, 320);
  }

  /* снежинки и звёздная пыль на фоне диалога */
  var snowRAF = 0;
  function startSnow() {
    var cv = dlgCanvas, ctx = cv.getContext('2d'), dpr = Math.min(2, window.devicePixelRatio || 1);
    function size() { cv.width = innerWidth * dpr; cv.height = innerHeight * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); }
    size(); window.addEventListener('resize', size);
    var W = function () { return innerWidth; }, H = function () { return innerHeight; };
    flakes = [];
    var nF = Math.round(Math.min(28, W() / 45)), nS = Math.round(Math.min(46, W() / 28));
    for (var i = 0; i < nF; i++) flakes.push({ t: 'f', x: Math.random() * W(), y: Math.random() * H(), r: 5 + Math.random() * 7, vy: .15 + Math.random() * .35, ph: Math.random() * 6.28, rot: Math.random() * 6.28, vr: (Math.random() - .5) * .006, a: .25 + Math.random() * .35 });
    for (i = 0; i < nS; i++) flakes.push({ t: Math.random() < .55 ? 's' : 'd', x: Math.random() * W(), y: Math.random() * H(), r: 1.5 + Math.random() * 4, vy: .05 + Math.random() * .15, ph: Math.random() * 6.28, sp: .015 + Math.random() * .03, c: GOLD[(Math.random() * GOLD.length) | 0] });
    var t0 = performance.now();
    function frame(t) {
      var dt = Math.min(48, t - t0) / 16.7; t0 = t;
      ctx.clearRect(0, 0, W(), H());
      for (var i = 0; i < flakes.length; i++) {
        var p = flakes[i];
        p.y += p.vy * dt; p.ph += (p.sp || .01) * dt;
        if (p.t === 'f') { p.x += Math.sin(p.ph) * .25 * dt; p.rot += p.vr * dt; }
        if (p.y > H() + 20) { p.y = -20; p.x = Math.random() * W(); }
        if (p.t === 'f') drawFlake(ctx, p.x, p.y, p.r, p.rot, p.a);
        else { var tw = .35 + .65 * Math.abs(Math.sin(p.ph)); if (p.t === 's') drawStar(ctx, p.x, p.y, p.r * 1.6 * (.6 + .4 * tw), 0, p.c, .8 * tw); else drawDot(ctx, p.x, p.y, p.r * .45, p.c, .7 * tw); }
      }
      snowRAF = requestAnimationFrame(frame);
    }
    snowRAF = requestAnimationFrame(frame);
  }
  function stopSnow() { cancelAnimationFrame(snowRAF); }

  /* ---------- звёздная пыль ---------- */
  var GOLD = ['#ffcf3a', '#ffe08a', '#ffd84a', '#fff3c9', '#f9b916'];
  var REDGOLD = ['#d7261e', '#f0402c', '#ff5a46', '#ffcf3a', '#ffd84a', '#e9a400'];
  function drawStar(ctx, x, y, r, rot, c, a) {
    ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.globalAlpha = a; ctx.fillStyle = c;
    var k = .14 * r;
    ctx.beginPath(); ctx.moveTo(0, -r); ctx.quadraticCurveTo(k, -k, r, 0); ctx.quadraticCurveTo(k, k, 0, r); ctx.quadraticCurveTo(-k, k, -r, 0); ctx.quadraticCurveTo(-k, -k, 0, -r); ctx.fill();
    ctx.restore();
  }
  function drawDot(ctx, x, y, r, c, a) { ctx.globalAlpha = a; ctx.fillStyle = c; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.2832); ctx.fill(); ctx.globalAlpha = 1; }
  function drawGlow(ctx, x, y, r, c, a) {
    var g = ctx.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, c); g.addColorStop(1, 'rgba(255,207,58,0)');
    ctx.globalAlpha = a; ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.2832); ctx.fill(); ctx.globalAlpha = 1;
  }
  function drawFlake(ctx, x, y, r, rot, a) {
    ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.globalAlpha = a; ctx.strokeStyle = '#fbf6ed'; ctx.lineWidth = Math.max(1, r / 6); ctx.lineCap = 'round';
    ctx.beginPath();
    for (var i = 0; i < 6; i++) {
      ctx.rotate(Math.PI / 3);
      ctx.moveTo(0, 0); ctx.lineTo(0, -r);
      ctx.moveTo(0, -r * .55); ctx.lineTo(r * .25, -r * .78); ctx.moveTo(0, -r * .55); ctx.lineTo(-r * .25, -r * .78);
    }
    ctx.stroke(); ctx.restore();
  }

  function Dust(canvas, opts) {
    this.cv = canvas; this.ctx = canvas.getContext('2d'); this.p = []; this.raf = 0; this.o = opts; this.last = null;
    this.lite = (navigator.hardwareConcurrency || 8) <= 4 || (navigator.deviceMemory || 8) <= 4;
    this.dpr = Math.min(this.lite ? 1.5 : 2, window.devicePixelRatio || 1);
    var self = this; this.loop = function (t) { self.frame(t); };
    this.resize();
  }
  Dust.prototype.resize = function () {
    var r = this.o.fixed ? { width: innerWidth, height: innerHeight } : this.cv.getBoundingClientRect();
    this.w = r.width; this.h = r.height;
    this.cv.width = Math.round(r.width * this.dpr); this.cv.height = Math.round(r.height * this.dpr);
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
  };
  Dust.prototype.emit = function (x, y, em) {
    em = em || this;
    var l = em.last, now = performance.now();
    if (!l || now - l.t > 120) { em.last = { x: x, y: y, t: now }; return; }
    var dx = x - l.x, dy = y - l.y, dist = Math.sqrt(dx * dx + dy * dy);
    var n = Math.min(em.max || this.o.max || 5, Math.floor(dist / (em.step || this.o.step || 7)));
    if (this.lite) n = Math.ceil(n / 2);
    if (n < 1) return;
    for (var i = 0; i < n; i++) {
      var f = (i + Math.random()) / n, px = l.x + dx * f, py = l.y + dy * f;
      var kind = Math.random(), star = kind < (em.starP || .5), big = Math.random() < (em.glow || .12);
      this.p.push({
        x: px + (Math.random() - .5) * 10, y: py + (Math.random() - .5) * 10,
        vx: (Math.random() - .5) * .5 + dx * .012, vy: (Math.random() - .3) * .5 + dy * .012,
        r: (star ? (big ? 7 + Math.random() * 6 : 2.5 + Math.random() * 4.5) : .8 + Math.random() * 1.6) * (em.scale || 1),
        s: star, life: (this.o.life || 1600) * (.65 + Math.random() * .7) * (em.life || 1), age: 0,
        rot: Math.random() * .8 - .4, vr: (Math.random() - .5) * .02,
        c: this.o.colors[(Math.random() * this.o.colors.length) | 0], tw: Math.random() * 6.28, glow: big
      });
    }
    if (this.p.length > 520) this.p.splice(0, this.p.length - 520);
    em.last = { x: x, y: y, t: now };
    if (!this.raf) { this.t0 = performance.now(); this.raf = requestAnimationFrame(this.loop); }
  };
  Dust.prototype.frame = function (t) {
    var dt = Math.min(48, t - this.t0); this.t0 = t;
    var ctx = this.ctx, sy = this.o.fixed ? window.pageYOffset : 0;
    ctx.clearRect(0, 0, this.w, this.h);
    for (var i = this.p.length - 1; i >= 0; i--) {
      var p = this.p[i]; p.age += dt;
      if (p.age >= p.life) { this.p.splice(i, 1); continue; }
      var k = dt / 16.7;
      p.vx *= Math.pow(.97, k); p.vy = p.vy * Math.pow(.97, k) + .012 * k;
      p.x += p.vx * k; p.y += p.vy * k; p.rot += p.vr * k; p.tw += .12 * k;
      var life = p.age / p.life, fade = life < .08 ? life / .08 : Math.pow(1 - (life - .08) / .92, 1.6);
      var tw = .7 + .3 * Math.sin(p.tw), y = p.y - sy;
      if (p.s) {
        if (p.glow) drawGlow(ctx, p.x, y, p.r * 2.2, 'rgba(255,214,90,.55)', fade * .6);
        drawStar(ctx, p.x, y, p.r * (.75 + .25 * tw), p.rot, p.c, fade * tw);
      } else drawDot(ctx, p.x, y, p.r, p.c, fade * .9);
    }
    ctx.globalAlpha = 1;
    if (this.p.length) this.raf = requestAnimationFrame(this.loop); else { this.raf = 0; ctx.clearRect(0, 0, this.w, this.h); }
  };

  /* фоновые «кометы» в баннерах: летят по плавной дуге или делают петлю и тают */
  Dust.prototype.comet = function () {
    var w = this.w, h = this.h; if (!w || !h) return;
    var self = this, em = { last: null, scale: .85 }, dur = 2200 + Math.random() * 1800, t0 = performance.now();
    var loop = Math.random() < .45, pt;
    if (loop) {
      var x0 = w * (.08 + Math.random() * .5), y0 = h * (.15 + Math.random() * .6), dir = Math.random() < .5 ? 1 : -1;
      var vx = (w * (.25 + Math.random() * .2)) * dir, vy = h * (Math.random() - .5) * .3, R = Math.min(w, h) * (.06 + Math.random() * .06), turns = 1 + (Math.random() < .3 ? 1 : 0);
      if (dir < 0) x0 = w - x0;
      pt = function (u) { var a = u * turns * 6.2832; return [x0 + vx * u + dir * R * Math.sin(a), y0 + vy * u - R * (1 - Math.cos(a))]; };
    } else {
      var side = Math.random() < .5, ax = side ? -.05 * w : 1.05 * w, ay = h * (.2 + Math.random() * .6), bx = side ? 1.05 * w : -.05 * w, by = h * (.1 + Math.random() * .7);
      var c1x = w * (.2 + Math.random() * .3), c1y = h * (Math.random() * 1.2 - .1), c2x = w * (.5 + Math.random() * .3), c2y = h * (Math.random() * 1.2 - .1);
      if (!side) { var tx = c1x; c1x = w - c2x; c2x = w - tx; }
      var ux0 = side ? 0 : .15 + Math.random() * .2, ux1 = side ? .55 + Math.random() * .3 : 1;
      pt = function (u) { u = ux0 + (ux1 - ux0) * u; var m = 1 - u; return [m * m * m * ax + 3 * m * m * u * c1x + 3 * m * u * u * c2x + u * u * u * bx, m * m * m * ay + 3 * m * m * u * c1y + 3 * m * u * u * c2y + u * u * u * by]; };
    }
    function step(t) {
      var u = (t - t0) / dur; if (u > 1) return;
      var e = u < .5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2, q = pt(e);
      self.emit(q[0], q[1], em); requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  };

  /* вихрь звёздной пыли вокруг козы, когда она выезжает */
  var heroDust = null;
  Dust.prototype.swirl = function (gsPx) {
    /* спираль-воронка: снизу широкая, кверху сужается, пыль поднимается вокруг козы */
    var w = this.w, h = this.h; if (!w || !h) return;
    var self = this, gs = gsPx || h * .87, cx = w / 2;
    var yb = h + gs * .02, yt = h - gs * 1.02, rb = Math.min(gs * .62, w * .44), rt = Math.min(gs * .16, w * .12);
    for (var k = 0; k < 2; k++) (function (k) {
      var em = { last: null, scale: 1, glow: .16, starP: .6, life: 1.05, step: 5, max: 5 }, a0 = k * 3.1416 + Math.random() * .3, dur = 2300 + Math.random() * 400, turns = 2.6;
      setTimeout(function () {
        var t0 = performance.now();
        (function step(t) {
          var u = (t - t0) / dur; if (u > 1) return;
          var e = u * (2 - u) * .35 + u * .65;
          var r = rb + (rt - rb) * e, a = a0 + e * turns * 6.2832;
          self.emit(cx + Math.cos(a) * r, yb + (yt - yb) * e + Math.sin(a) * r * .22, em);
          requestAnimationFrame(step);
        })(t0);
      }, k * 120);
    })(k);
  };

  function mobNow() { return root && root.getBoundingClientRect().width < 700; }
  function initDust() {
    if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var fine = !window.matchMedia || matchMedia('(pointer: fine)').matches;
    var bans = [].slice.call(root.querySelectorAll('.adv-ban'));
    var page = new Dust(root.querySelector('.adv-dust'), { fixed: true, colors: REDGOLD, life: 1700, step: 8, max: 4 });
    var bd = bans.map(function (b) { return new Dust(b.querySelector('.adv-fx'), { colors: GOLD, life: 2000, step: 6, max: 6 }); });
    var vis = bans.map(function () { return true; });
    heroDust = bd[0];
    bans.forEach(function (b, i) { b.__dust = bd[i]; });
    /* телефон: в главном баннере пыль плавно ездит туда-сюда по фону */
    bd[0] && (function () {
      var em = { last: null, scale: 1, glow: .2, step: 2.5, max: 3, life: 1.2 }, d = bd[0], t0 = performance.now(), on = false;
      function step(t) {
        if (!mobNow() || !vis[0] || document.hidden || (dlg && dlg.classList.contains('on'))) { on = false; em.last = null; return; }
        var u = (t - t0) / 1000;
        d.emit(d.w * (.5 + .44 * Math.sin(u * .7)), d.h * (.48 + .24 * Math.sin(u * 1.1 + 1) + .07 * Math.sin(u * 3.1)), em);
        requestAnimationFrame(step);
      }
      setInterval(function () { if (!on && mobNow() && vis[0] && !document.hidden) { on = true; d.resize(); requestAnimationFrame(step); } }, 700);
    })();
    window.addEventListener('resize', function () { page.resize(); bd.forEach(function (x) { x.resize(); }); });

    if ('IntersectionObserver' in window) bans.forEach(function (b, i) { new IntersectionObserver(function (en) { vis[i] = en[0].isIntersecting; }).observe(b); });
    bd.forEach(function (d, i) {
      (function next() {
        setTimeout(function () { if (vis[i] && !document.hidden && !(dlg && dlg.classList.contains('on'))) { d.resize(); d.comet(); } next(); }, 1400 + Math.random() * 2600);
      })();
    });
    function move(e) {
      if (dlg && dlg.classList.contains('on')) return;
      if (e.pointerType === 'touch' && !e.isPrimary) return;
      for (var i = 0; i < bans.length; i++) {
        var r = bans[i].getBoundingClientRect();
        if (e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom) {
          bd[i].emit(e.clientX - r.left, e.clientY - r.top); page.last = null; return;
        }
      }
      var rr = root.getBoundingClientRect();
      if (e.clientY < rr.top || e.clientY > rr.bottom) return;
      page.emit(e.clientX, e.clientY + window.pageYOffset);
    }
    if (fine) window.addEventListener('pointermove', move, { passive: true });
    else root.addEventListener('pointermove', move, { passive: true });
  }

  /* ---------- подарки из-под ёлки ---------- */
  function giftSVG(v){
    // v: {box:[light,mid,dark], rb:[light,dark], pat:'dots'|'flakes'|'stars'|'none', pc, tall}
    var H=v.tall?44:30, top=v.tall?22:34, P=function(a){return a.map(function(p){return p[0].toFixed(1)+','+p[1].toFixed(1)}).join(' ')};
    // body top rhombus
    var by=top+16, L=[14,by+12], F=[55,by+24], R=[96,by+12], T=[55,by];
    var L2=[L[0],L[1]+H], F2=[F[0],F[1]+H], R2=[R[0],R[1]+H];
    // lid (wider, raised)
    var ly=top, LL=[9,ly+14], LF=[55,ly+28], LR=[101,ly+14], LT=[55,ly], th=9;
    var LL2=[LL[0],LL[1]+th], LF2=[LF[0],LF[1]+th], LR2=[LR[0],LR[1]+th];
    function lerp(a,b,t){return [a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t]}
    function band(a,b,c,d,t0,t1){return P([lerp(a,b,t0),lerp(a,b,t1),lerp(d,c,t1),lerp(d,c,t0)])}
    var s='';
    // sticker silhouette (cream outline)
    var sil=[LT,LR,LR2,R,R2,F2,L2,L,LL2,LL];
    s+='<polygon points="'+P(sil)+'" fill="#f1eadf" stroke="#f1eadf" stroke-width="11" stroke-linejoin="round"/>';
    // body faces
    s+='<polygon points="'+P([L,F,F2,L2])+'" fill="'+v.box[1]+'" stroke="'+v.box[1]+'" stroke-width="5" stroke-linejoin="round"/>';
    s+='<polygon points="'+P([F,R,R2,F2])+'" fill="'+v.box[2]+'" stroke="'+v.box[2]+'" stroke-width="5" stroke-linejoin="round"/>';
    // patterns on body faces
    function facePts(a,b,c,d,us,vs){var o=[];us.forEach(function(u){vs.forEach(function(w){var p=lerp(lerp(a,b,u),lerp(d,c,u),w);o.push(p)})});return o}
    var pl=facePts(L,F,F2,L2,[.2,.8],[.3,.75]).concat(facePts(F,R,R2,F2,[.2,.8],[.3,.75]));
    pl.forEach(function(p,i){
      if(v.pat==='dots') s+='<circle cx="'+p[0].toFixed(1)+'" cy="'+p[1].toFixed(1)+'" r="2.6" fill="'+v.pc+'"/>';
      else if(v.pat==='flakes') s+='<g stroke="'+v.pc+'" stroke-width="1.8" stroke-linecap="round" transform="translate('+p[0].toFixed(1)+' '+p[1].toFixed(1)+')"><path d="M0-4V4M-3.5-2L3.5 2M-3.5 2L3.5-2"/></g>';
      else if(v.pat==='stars') s+='<path transform="translate('+p[0].toFixed(1)+' '+p[1].toFixed(1)+') scale(.55)" d="M0-7C.8-1.6.8-1.6 7 0C.8 1.6.8 1.6 0 7C-.8 1.6-.8 1.6-7 0C-.8-1.6-.8-1.6 0-7Z" fill="'+v.pc+'"/>';
    });
    // ribbons on body
    s+='<polygon points="'+band(L,F,F2,L2,.42,.58)+'" fill="'+v.rb[0]+'"/>';
    s+='<polygon points="'+band(F,R,R2,F2,.42,.58)+'" fill="'+v.rb[1]+'"/>';
    // soft shading at bottom of body
    s+='<polygon points="'+P([lerp(L2,L,.25),lerp(F2,F,.25),F2,L2])+'" fill="#000" opacity=".08"/>';
    // lid faces
    s+='<polygon points="'+P([LL,LF,LF2,LL2])+'" fill="'+v.box[1]+'" stroke="'+v.box[1]+'" stroke-width="5" stroke-linejoin="round"/>';
    s+='<polygon points="'+P([LF,LR,LR2,LF2])+'" fill="'+v.box[2]+'" stroke="'+v.box[2]+'" stroke-width="5" stroke-linejoin="round"/>';
    s+='<polygon points="'+band(LL,LF,LF2,LL2,.42,.58)+'" fill="'+v.rb[0]+'"/>';
    s+='<polygon points="'+band(LF,LR,LR2,LF2,.42,.58)+'" fill="'+v.rb[1]+'"/>';
    s+='<polygon points="'+P([LT,LR,LF,LL])+'" fill="'+v.box[0]+'" stroke="'+v.box[0]+'" stroke-width="5" stroke-linejoin="round"/>';
    // lid seam shadow
    s+='<polyline points="'+P([LL2,LF2,LR2])+'" fill="none" stroke="#000" stroke-opacity=".18" stroke-width="2" stroke-linejoin="round"/>';
    // ribbon cross on lid top
    s+='<polygon points="'+band(LL,LT,LR,LF,.42,.58)+'" fill="'+v.rb[0]+'"/>';
    s+='<polygon points="'+band(LT,LR,LF,LL,.42,.58)+'" fill="'+v.rb[0]+'"/>';
    // highlight on lid
    s+='<path d="M'+P([lerp(LL,LT,.2),lerp(LL,LT,.55)])+'" stroke="#fff" stroke-opacity=".55" stroke-width="2.4" stroke-linecap="round"/>';
    // bow
    var cx=55, cy=ly+13, B=function(d){return d.map(function(n,i){return (i%2? cy+n : cx+n).toFixed(1)}).join(' ')};
    function loop(sg,col,inner){
      var o='<path d="M'+B([0,0])+' C'+B([sg*4,-26])+' '+B([sg*34,-24])+' '+B([sg*28,-6])+' C'+B([sg*24,4])+' '+B([sg*8,4])+' '+B([0,0])+'Z" fill="'+col+'"/>';
      o+='<path d="M'+B([sg*6,-3])+' C'+B([sg*9,-15])+' '+B([sg*22,-15])+' '+B([sg*20,-7])+' C'+B([sg*17,-3])+' '+B([sg*10,-2])+' '+B([sg*6,-3])+'Z" fill="'+inner+'" stroke="none"/>';
      return o;}
    s+='<g stroke="#f1eadf" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round">'+
       '<path d="M'+B([-3,2])+' L'+B([-13,19])+' L'+B([-6,16])+' L'+B([-2,22])+' Z" fill="'+v.rb[1]+'"/>'+
       '<path d="M'+B([3,2])+' L'+B([14,17])+' L'+B([7,16])+' L'+B([4,22])+' Z" fill="'+v.rb[1]+'"/>'+
       loop(-1,v.rb[0],v.rb[1])+loop(1,v.rb[0],v.rb[1])+
       '<ellipse cx="'+cx+'" cy="'+(cy+1)+'" rx="6.5" ry="5.5" fill="'+v.rb[0]+'"/></g>'+
       '<path d="M'+B([-22,-12])+' q5 -6 11 -3" stroke="#fff" stroke-opacity=".65" stroke-width="2" fill="none" stroke-linecap="round"/>'+
       '<path d="M'+B([13,-14])+' q5 -3 9 1" stroke="#fff" stroke-opacity=".5" stroke-width="2" fill="none" stroke-linecap="round"/>';
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 110 110" width="110" height="110">'+s+'</svg>';
  }
  
  var GIFTV=[
   {box:['#f05a4e','#d7261e','#a8160f'],rb:['#8fa253','#6b7a3a'],pat:'dots',pc:'#fbf6ed'},
   {box:['#8a9a4e','#6b7a3a','#4d5826'],rb:['#f05a4e','#c41f17'],pat:'flakes',pc:'#fbf6ed'},
   {box:['#c4e3f6','#8ec5e8','#5f9fc8'],rb:['#f05a4e','#c41f17'],pat:'stars',pc:'#fbf6ed',tall:true},
   {box:['#fbf6ed','#eadfcf','#cdbca6'],rb:['#f05a4e','#c41f17'],pat:'dots',pc:'#d7261e'},
   {box:['#f05a4e','#d7261e','#a8160f'],rb:['#ffe08a','#f2b415'],pat:'stars',pc:'#ffcf3a',tall:true},
   {box:['#8a9a4e','#6b7a3a','#4d5826'],rb:['#ffe08a','#f2b415'],pat:'dots',pc:'#ffcf3a'}
  ];
  
  function initGifts() {
    var tree = root.querySelector('.adv-elka'), layer = root.querySelector('.adv-gifts'), ban = root.querySelector('.adv-hero');
    if (!tree || !layer) return;
    var live = [], busy = false, raf = 0, last = 0, svgs = GIFTV.map(giftSVG);
    function make(sz) {
      var w = document.createElement('div'), sh = document.createElement('div');
      w.className = 'adv-gw'; sh.className = 'adv-gs';
      w.style.width = w.style.height = sz + 'px';
      w.innerHTML = svgs[(Math.random() * svgs.length) | 0];
      layer.appendChild(sh); layer.appendChild(w);
      return { el: w, sh: sh };
    }
    function launch() {
      var k = ban.clientHeight / 640, lr = layer.getBoundingClientRect(), tr = tree.getBoundingClientRect();
      var sz = Math.round((52 + Math.random() * 58) * k);
      var g = make(sz);
      g.s = sz; g.k = k;
      g.x = tr.left - lr.left + tr.width * (.42 + Math.random() * .16) - sz / 2;
      g.y = tr.bottom - lr.top - tr.height * .08 - sz;
      g.vx = (260 + Math.random() * 520) * k; g.vy = -(950 + Math.random() * 450) * k;
      g.rz = 0; g.wz = (Math.random() < .25 ? -1 : 1) * (220 + Math.random() * 420);
      g.ph = 0; g.wp = (Math.random() < .5 ? -1 : 1) * (5 + Math.random() * 7); g.fx = 1;
      g.sq = 0; g.t = 0; g.state = 'fly'; g.op = 1;
      live.push(g);
      if (!raf) { last = performance.now(); raf = requestAnimationFrame(tickG); }
    }
    function near90(a) { return Math.round(a / 90) * 90; }
    function tickG(t) {
      var dt = Math.min(.04, (t - last) / 1000); last = t;
      var W = layer.clientWidth, H = layer.clientHeight;
      for (var i = live.length - 1; i >= 0; i--) {
        var g = live[i], floor = H - g.s * .97;
        g.t += dt;
        if (g.state === 'fly') {
          g.vy += 2600 * g.k * dt; g.x += g.vx * dt; g.y += g.vy * dt;
          g.rz += g.wz * dt; g.ph += g.wp * dt; g.fx = Math.cos(g.ph); if (Math.abs(g.fx) < .35) g.fx = g.fx < 0 ? -.35 : .35;
          if (g.x < 0) { g.x = 0; g.vx = Math.abs(g.vx) * .6; }
          if (g.x > W - g.s) { g.x = W - g.s; g.vx = -Math.abs(g.vx) * .6; }
          if (g.y >= floor) {
            g.y = floor;
            if (Math.abs(g.vy) > 260 * g.k) {
              g.vy = -Math.abs(g.vy) * .6; g.vx *= .72; g.wz *= .55; g.wp *= .5; g.sq = 1;
            } else {
              g.state = 'settle'; g.st = 0; g.from = [g.fx, g.rz]; g.to = [g.fx < 0 ? -1 : 1, near90(g.rz)]; g.vx *= .5; g.sq = .8;
            }
          }
        } else if (g.state === 'settle') {
          g.st += dt; var u = Math.min(1, g.st / .35), e = 1 - Math.pow(1 - u, 3);
          g.fx = g.from[0] + (g.to[0] - g.from[0]) * e; g.rz = g.from[1] + (g.to[1] - g.from[1]) * e;
          g.x += g.vx * dt; g.vx *= Math.pow(.02, dt);
          if (u >= 1) { g.state = 'rest'; g.rt = 0; }
        } else if (g.state === 'rest') {
          g.rt += dt;
          if (g.rt > 4.5) g.op = Math.max(0, 1 - (g.rt - 4.5) / .8);
          if (g.op <= 0) { g.el.remove(); g.sh.remove(); live.splice(i, 1); continue; }
        }
        g.sq = Math.max(0, g.sq - dt * 6);
        var sx = 1 + .16 * g.sq, sy = 1 - .2 * g.sq;
        g.el.style.transform = 'translate3d(' + g.x.toFixed(1) + 'px,' + g.y.toFixed(1) + 'px,0) scale(' + sx.toFixed(3) + ',' + sy.toFixed(3) + ')';
        g.el.style.opacity = g.op;
        g.el.firstChild.style.transform = 'rotate(' + g.rz.toFixed(1) + 'deg) scaleX(' + g.fx.toFixed(3) + ')';
        var hgt = Math.max(0, floor - g.y), sw = g.s * (1.1 - Math.min(.6, hgt / (400 * g.k)));
        g.sh.style.width = sw.toFixed(1) + 'px'; g.sh.style.height = (sw * .22).toFixed(1) + 'px';
        g.sh.style.transform = 'translate(' + (g.x + g.s / 2 - sw / 2).toFixed(1) + 'px,' + (H - sw * .16).toFixed(1) + 'px)';
        g.sh.style.opacity = (g.op * (1 - Math.min(.8, hgt / (300 * g.k)))).toFixed(2);
      }
      raf = live.length ? requestAnimationFrame(tickG) : 0;
    }
    function batch() {
      if (busy || live.length > 14) return; busy = true;
      var n = 5 + ((Math.random() * 3) | 0);
      for (var j = 0; j < n; j++) setTimeout(launch, j * 190);
      setTimeout(function () { busy = false; }, n * 190 + 900);
    }
    tree.addEventListener('mouseenter', batch);
    tree.addEventListener('click', batch);
  }

  /* ---------- коза ----------
     десктоп: в главном баннере, пауза 15 с; телефон: в нижнем баннере, пауза 6 с */
  function initGoat() {
    var boxes = root.querySelectorAll('.adv-goat'); if (!boxes.length) return;
    var ua = navigator.userAgent;
    var webkit = /iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && 'ontouchend' in document) ||
      (/AppleWebKit/.test(ua) && !/Chrome|Chromium|CriOS|Edg|OPR|Android|Firefox|FxiOS/.test(ua));
    var DUR = 5.042, SINK = .78, cycle = 0, box = boxes[0], media;
    function mob() { return root.getBoundingClientRect().width < 700; }
    function pause() { return mob() ? 6000 : 15000; }
    function place() {
      var nb = mob() ? (boxes[1] || boxes[0]) : boxes[0];
      if (nb !== box) { box.classList.remove('up', 'mir'); box = nb; }
      if (media && media.parentNode !== box) box.appendChild(media);
      box.classList.toggle('mir', cycle % 2 === 1); cycle++;
    }
    function burst() {
      var d = box.closest('.adv-ban') && box.closest('.adv-ban').__dust;
      if (!d) return;
      d.resize(); d.swirl(box.offsetHeight);
    }
    function later(fn, ms) { setTimeout(function () { if (document.hidden) { document.addEventListener('visibilitychange', function h() { if (!document.hidden) { document.removeEventListener('visibilitychange', h); later(fn, 1200); } }); } else fn(); }, ms); }
    function whenNear(el, fn) {
      if (!('IntersectionObserver' in window)) return fn();
      var io = new IntersectionObserver(function (es) { for (var i = 0; i < es.length; i++) if (es[i].isIntersecting) { io.disconnect(); fn(); return; } }, { rootMargin: '400px' });
      io.observe(el);
    }
    function bootGoat() {
    if (!webkit) {
      var v = media = document.createElement('video');
      v.muted = true; v.defaultMuted = true; v.playsInline = true; v.setAttribute('playsinline', ''); v.setAttribute('muted', ''); v.preload = 'auto';
      v.src = BASE + 'goat.webm';
      var sank = false;
      function tick() {
        if (!sank && v.duration && v.currentTime >= v.duration - SINK) { sank = true; box.classList.remove('up'); }
        if (!v.paused && !v.ended) requestAnimationFrame(tick);
      }
      v.addEventListener('ended', function () { box.classList.remove('up'); later(run, pause()); });
      function run() {
        place();
        sank = false; try { v.currentTime = 0; } catch (e) {}
        var pr = v.play();
        var go = function () { requestAnimationFrame(function () { box.classList.add('up'); burst(); tick(); }); };
        if (pr && pr.then) pr.then(go, function () { later(run, pause()); }); else go();
      }
      box.appendChild(v);
      v.addEventListener('canplaythrough', function once() { v.removeEventListener('canplaythrough', once); later(run, 900); });
      v.load();
    } else {
      var img = media = document.createElement('img'); img.alt = ''; box.appendChild(img);
      fetch(BASE + 'goat.webp').then(function (r) { return r.blob(); }).then(function (blob) {
        var url = null;
        function run() {
          place();
          if (url) URL.revokeObjectURL(url);
          url = URL.createObjectURL(blob);
          img.onload = function () {
            requestAnimationFrame(function () { box.classList.add('up'); burst(); });
            setTimeout(function () { box.classList.remove('up'); }, (DUR - SINK) * 1000);
            later(run, DUR * 1000 + pause());
          };
          img.src = url;
        }
        later(run, 900);
      }).catch(function () {});
    }
    }
    var first = mob() ? (boxes[1] || boxes[0]) : boxes[0];
    var go = function () { whenNear(first.parentNode || first, bootGoat); };
    if (document.readyState === 'complete') go(); else window.addEventListener('load', go);
  }

  /* ---------- старт ---------- */
  function start() { mount(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
  window.ADVENT = { open: function (d) { activate(d); }, refresh: refresh, reset: function () { try { localStorage.removeItem(STORE); } catch (e) {} refresh(); } };
})();
