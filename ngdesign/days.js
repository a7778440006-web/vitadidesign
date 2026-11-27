/* Содержимое 24 окошек адвента. Правится здесь — Тильду трогать не нужно.
   Разметка текста:
   • пустая строка — новый абзац;
   • строка с «## » в начале — жирная (подзаголовок);
   • строка {img:имя} — картинка из папки days/ (имя без .webp);
   • строка {tg} — финальная подписка на Telegram. */
window.ADVENT_CONTENT = {
  1: {
    topic: 'Ужасный лендинг', label: 'редизайн', title: 'Ужасный лендинг: исправляю за 60 секунд',
    media: 'd01',
    body: `Задача — лендинг, на котором сразу понятно, что продают и куда нажать. Слева «до», справа «после».

## Что поменяла
1. Шрифты: было 6, стало 2 — для заголовков и для текста
2. Цвет: вместо кислотного красно-зелёного — тёплая палитра из трёх цветов
3. Сетка: всё по колонкам, отступы кратны 8
4. Кнопка: одна главная, контрастная, на первом экране
5. Картинки: вместо клипарта и стока со вспышкой — одна сильная фотография
Бонус: карточки наборов откликаются на наведение — видно, что на них можно нажать

## Проверь свой лендинг по этим 5 пунктам.
{tg}`
  },
  2: {
    topic: 'Стикерпак', label: 'стикеры', title: 'Новогодний стикерпак',
    media: 'd02',
    body: `20 стикеров для сторис, открыток и макетов. В Figma это компоненты: перекрашивай подарки и меняй размер без потери качества.

## Как использовать
• Сторис: скопируй стикер из Figma-файла
• Открытка: собери из 3–4 стикеров
• Не больше 2–3 стикеров на кадр, чтобы не было пестроты

{tg}`,
    figma: 'https://www.figma.com/design/CUAbvfAdYVG30t0we0FP0Q/?node-id=1-6181', files: '20 стикеров · Figma'
  },
  3: {
    topic: 'Ты в стиле GTA', label: 'нейрофото', title: 'Промпт: ты в стиле GTA',
    media: 'd03',
    body: `Задача — аватар, по которому тебя узнают в ленте. Сделай свой портрет в стиле обложки игры 2000-х за 2 минуты.

## Что загрузить
• Селфи при дневном свете, лицо целиком, без фильтров
• Фото по пояс — если хочешь сохранить позу и одежду

## Промпт
Use my photo as a face reference: keep my facial features, eye shape and color, and hair color. Draw me in the style of an early-2000s video game poster: hand-drawn digital illustration, bold dark outlines, cel-shading, rich shadows. Pose: [pose]. Outfit: [outfit]. Background: a night city by the ocean, palm trees, neon lights, pink-orange sunset. Vertical 4:5, no text, no logos.

Промпт на английском — так нейросеть точнее понимает детали. Вместо [скобок] впиши своё, тоже по-английски.

## Если лицо не похоже
• Добавь второе фото с другим ракурсом
• Допиши в промпт: «Keep the shape of my nose and lips exactly as in the photo»
• Перегенерируй 2–3 раза и выбери лучший вариант — это нормально

## Важно
Без логотипа и шрифта игры — только стиль. Так картинку не заблокируют.

Условия сервисов могут меняться — проверь бесплатный тариф перед генерацией.

{tg}`
  },
  4: {
    topic: '5 палитр', label: 'цвет', title: '5 палитр, которые выглядят дорого',
    media: 'd04',
    body: `Вместо красного + зелёного в лоб — 5 сочетаний для праздничных макетов. У каждой палитры коды цветов, роли и проверка контраста.

## Как использовать
• Одна палитра на весь макет — не смешивай
• Акцент — только на главное: кнопка, цена, дата
• Текст на фоне — от 4,5:1, иначе его не прочитают с телефона

{tg}`,
    figma: 'https://www.figma.com/design/CQp2eojr6EzOyZIYgRO51v/?node-id=1-6181', files: '5 палитр · Figma'
  },
  5: {
    topic: 'Сайт для Деда Мороза', label: 'заказчик просит', title: 'Сайт для Деда Мороза до 31-го',
    site: 'https://a7778440006-web.github.io/vitadidesign/ded-moroz/', media: 'd05',
    body: `Задача — за вечер собрать первый экран, на который хочется нажать. Наведи курсор на превью: сани с оленями летят за мышкой, а карточки подарков откликаются на наведение.

## Как собрать
1. Макет первого экрана в Figma: фон, заголовок, кнопка и 3 карточки
2. Сани отдельно на зелёном фоне → видео поворота на 360° → кадры для анимации
3. Claude верстает экран по макету и подключает анимацию

## Промпт-ТЗ для Claude
Build a one-screen landing page exactly like my Figma mockup [link]. Full-screen night background, headline, red CTA button and three gift cards. The center card shows the hover state: on hover a card scales up without moving the others. Add a sleigh with reindeer that smoothly follows the cursor with a star-dust trail; when the cursor is idle, the sleigh flies across the screen on its own. Use the attached sprite sheet for the sleigh rotation. Plain HTML, CSS and JS in one file, no frameworks.

{tg}`
  },
  6: {
    topic: 'Шаблоны сторис', label: 'сторис', title: 'Шаблоны сторис со стикерами',
    media: 'd06',
    body: `4 сторис 1080×1920: анонс, акция, поздравление и вопрос. Фото, тексты и стикеры меняются за минуту.

## Как использовать
• Важное держи в центре — сверху и снизу его перекрывает интерфейс
• Одна сторис — одна мысль
• В «Вопросе» поставь стикер «Вопрос» на пунктирное место

{tg}`,
    figma: 'https://www.figma.com/design/CrngVa3QmkxysyU0gLQTrv/?node-id=1-6181', files: '4 шаблона · Figma'
  },
  7: {
    topic: 'Горячие клавиши', label: 'figma', title: '30 горячих клавиш Figma',
    media: 'd07',
    body: `Шпаргалка для Windows и Mac: слои, автолейаут, компоненты, текст, вид и экспорт.

## Как использовать
• Сохрани на телефон или держи открытой на втором экране
• Учи по 5 клавиш в неделю — начни с Shift + A и Ctrl + D

{tg}`
  },
  8: {
    topic: 'GIF-открытка', label: 'анимация', title: 'Анимированные открытки',
    media: 'd08',
    body: `3 открытки с анимацией: мигают огоньки ёлки и гирлянды, падает снег.

## Как использовать
• Отправь открытку друзьям и коллегам в мессенджер
• Поставь в сторис

{tg}`,
    download: '', downloadLabel: 'Скачать GIF', files: 'Папка: 3 открытки в GIF'
  },
  9: {
    topic: 'Чек-лист блога', label: 'визуал блога', title: 'Чек-лист: блог, который приводит заказы',
    body: `Задача — чтобы блог приводил заявки, а не просто был красивым. Пройдись по пунктам: каждое «нет» — место, где теряются люди.

## 1. Профиль за 3 секунды
☐  Из имени и описания понятно, кто ты и чем полезен
☐  Есть одно главное действие: написать или отправить кодовое слово
☐  Аватар узнаётся даже в маленьком кружке

## 2. Единый стиль
☐  2–3 фирменных цвета и 1–2 шрифта во всех публикациях
☐  Заголовки на обложках стоят в одном месте и одного размера
☐  Лента читается как одно целое, а не как набор случайных картинок

## 3. Обложки и заголовки
☐  Заголовок читается на телефоне в вытянутой руке
☐  В заголовке польза или боль зрителя, а не просто название темы
☐  На обложке не больше 5–7 слов

## 4. Контент ведёт к действию
☐  В каждом ролике понятно, что сделать дальше
☐  Есть кейсы: задача → решение → результат в цифрах
☐  Есть отзывы и цифры, которые можно проверить

## 5. Навигация
☐  Закреп отвечает на три вопроса: кто ты, что делаешь, где тебя найти
☐  Закреплённые разделы: обо мне, кейсы, полезное, контакты
☐  Контакты находятся за два касания

## Посчитай «да». Меньше 10 из 15 — начни с профиля и обложек: их видят первыми.
{tg}`
  },
  10: {
    topic: 'Пиксель-стикеры', label: 'стикеры', title: 'Пиксельные стикеры',
    media: 'd10',
    body: `Сердце, огонёк, звезда и пришелец в пиксельном стиле — для сторис, обложек и макетов.

## Как использовать
• В Figma это компоненты: масштабируй без потери качества
• В сторис — скопируй стикер из Figma-файла
• 1–2 стикера на кадр, с наклоном 6–10°

{tg}`,
    figma: 'https://www.figma.com/design/Aw5TqkA4Xp3wkKLd4VFkpd/?node-id=1-6181', files: '4 стикера · Figma'
  },
  11: {
    topic: 'Ответы заказчику', label: 'работа с заказчиком', title: '12 ответов заказчику',
    body: `Задача — не больше 2 кругов правок, чтобы проект укладывался в срок и бюджет. Копируй и подставляй своё вместо [скобок].

## 1. «А можно бесплатно?»
Спасибо, что подумали обо мне! Бесплатно не беру, но могу предложить мини-формат: [что] за [цена]. Так вы проверите, как нам работается вместе.

## 2. «Нужно вчера»
Понимаю срочность. Срочный формат — [срок] с наценкой [N]%. В обычном темпе — [срок]. Как удобнее?

## 3. «Сделайте как у конкурента»
Давайте разберём, что именно нравится: цвет, подача, структура? Возьмём принцип, а не копию — так вас не перепутают.

## 4. «Ещё одна маленькая правка»
Конечно, внесу. Это [N]-й круг правок из [M] по договору, дальше — [цена] за круг. Собираем все правки одним списком?

## 5. «Не нравится, но не знаю что»
Давайте сузим: ближе «слишком ярко», «слишком скучно» или «не про нас»? Покажу 2 направления — выберем одно.

## 6. «Покажите ещё варианты»
Варианты делаю под задачу. Напомню цель: [цель]. Какой пункт текущий макет решает не так?

## 7. «Созвонимся на 5 минут?»
С радостью. Пришлите вопросы заранее — подготовлю ответы, и созвон будет коротким.

## 8. Задержка оплаты
Напомню про оплату этапа [N] — срок был [дата]. Следующий этап начну после оплаты. Если нужно сдвинуть дату — давайте обсудим.

## 9. Заказчик пропал
Добрый день! Проект на паузе с [дата]. Если планы изменились — напишите, закрою этап и пришлю файлы по оплаченной части.

## 10. «Давайте поменяем всё»
Понимаю. Это новая задача — пришлю оценку отдельно. Текущий этап закрываем по договору.

## 11. «Пришлите исходники»
Исходники передаю после финальной оплаты — так в договоре. Пришлю сразу после закрытия.

## 12. Поздравление с праздником
[Имя], спасибо за работу в этом году! Было приятно делать [проект] вместе. С праздником — и до новых задач.

## Тон
Мягкий — когда важнее отношения. Твёрдый — когда правок уже больше, чем в договоре: убери «понимаю», оставь цифры и сроки.

{tg}`
  },
  12: {
    topic: 'Ролик в стиле GTA', label: 'нейровидео', title: 'Ролик: ты в стиле GTA',
    media: 'd12',
    body: `Задача — ролик, который узнают в ленте и досматривают до конца. Сделай себя героем игры 2000-х за вечер.

## Шаг 1. Кадр в стиле GTA
Загрузи своё фото в полный рост и напиши:
Use my photo as a reference for my face and body: keep my facial features, eye color and hair color. Draw me in the style of an early-2000s video game poster: hand-drawn digital illustration, bold dark outlines, cel-shading. I am standing full-length in the middle of a night-city street by the ocean, palm trees, neon signs, wet asphalt. Vertical 9:16, no text, no logos.

## Шаг 2. Оживить кадр
Загрузи картинку в нейросеть для видео как первый кадр и напиши:
The person walks confidently down the street straight toward the camera, a light breeze in the hair, neon reflections in the puddles, the camera slowly dollies back, keep the illustration style, 5 seconds, no text.

Промпты на английском — так нейросеть точнее понимает детали.

## Как собрать ролик
• 2–3 таких кадра по 5 секунд: идёшь, оборачиваешься, смотришь в камеру
• Сверху — плашки и титры в стиле игры
• Музыка — бит в духе западного побережья

## Что проверить
• Лицо похоже в первом и последнем кадре
• Руки и ноги без искажений
• Без логотипа и шрифта игры — только стиль

{tg}`
  },
  13: {
    topic: 'Обои на телефон', label: 'обои', title: '3 обоя на телефон',
    media: 'd13',
    body: `Ёлка с шампанским, консоль в вайбе 90-х и «Ты сможешь всё». Верх свободен под часы и уведомления.

## Как поставить
• Сохрани картинку в галерею
• Настройки → Обои → выбери фото и не увеличивай его

{tg}`,
    download: '', downloadLabel: 'Скачать PNG', files: 'Папка: 3 обоя 1170×2532 в PNG'
  },
  14: {
    topic: 'Кейс, который читают', label: 'портфолио', title: 'Кейс, который дочитывают до конца',
    body: `Задача — кейс, который заказчик дочитывает до конца и пишет тебе.

## 1. Заголовок-результат
Не «Редизайн приложения», а «Записей через приложение стало в 2 раза больше».

## 2. Задача
Что болело у заказчика и почему это важно. 2–3 предложения.

## 3. Моя роль
Что делали вы, а что — команда. Сроки.

## 4. Процесс
3–4 шага с картинками: исследование, структура, прототип, дизайн. Только то, что повлияло на решение.

## 5. Решения
2–3 ключевых экрана: проблема → что сделали → почему так.

## 6. Результат
Цифры, если есть. Если нет — что изменилось для пользователя и заказчика.

## 7. Если проект под NDA
Покажи процесс и решения на изменённых данных, без логотипа. Подпиши: «Проект под NDA, данные изменены».

## Пример
Задача: салон теряет клиентов на записи. Решение: запись в 3 шага вместо 7. Результат: запись занимает меньше минуты.

{tg}`
  },
  15: {
    topic: 'Шрифты на кириллице', label: 'типографика', title: '10 бесплатных шрифтов с кириллицей',
    body: `Задача — шрифт, который выглядит дорого и бесплатен для коммерческих проектов. Все шрифты — из Google Fonts, лицензия OFL.

## Для текста
• Inter — нейтральный, для интерфейсов
• Onest — мягкий, хорошо читается в мелком размере
• Golos Text — сделан для интерфейсов, аккуратная кириллица
• Manrope — современный и геометричный
• Rubik — дружелюбный, со скруглениями
• Lora — мягкая антиква для длинных текстов

## Для заголовков
• Unbounded — широкий и яркий, для акцентов
• Montserrat — классика заголовков, много начертаний
• Fira Sans Extra Condensed — узкий и плотный, как на моих обложках
• Playfair Display — контрастная антиква, выглядит дорого

## Как сочетать
Один шрифт для заголовков + один для текста. Антиква + гротеск — безопасная пара.

Условия и лицензии могут меняться — перед использованием проверь их на сайте шрифта.

{tg}`
  },
  16: {
    topic: 'Сайт салона', label: 'как сделать такой сайт без кода', title: 'Премиум-салон: анимация первого экрана',
    body: `Задача — первый экран, который передаёт атмосферу салона ещё до записи. Наводишь на услугу — кадр оживает: укладка в движении, мерцает свет.

## Промпт 1 · фото для каждой услуги
Realistic photo for a premium beauty salon: [service, e.g. a stylist's hands finishing glossy waves on a client's hair]. White marble counter, warm golden backlight, soft beige tones, shallow depth of field, same camera angle as the attached layout, no text, no logos.

## Промпт 2 · видео между первым и последним кадром
Smooth 5-second shot from the first frame to the last frame: the hair moves softly as it is styled, warm light shimmers across the marble, slow camera push-in. Keep the composition, no new objects, no text.

## Промпт 3 · анимация экрана по макету
Build the first screen exactly like my Figma mockup [link]. Marble background, headline, booking button and service cards. On hover over a service, play its video in place of the photo with a soft crossfade and a subtle golden shimmer; on mouse leave, return to the photo. Plain HTML, CSS and JS in one file.

## Важно
Людей на ИИ-кадрах не выдаём за реальных клиентов салона.

{tg}`
  },
  17: {
    topic: 'Как утвердить макет', label: 'работа с заказчиком', title: 'Как показать макет, чтобы его утвердили',
    body: `Задача — утверждение с первого показа, без «а давайте ещё вариант».

## Структура показа
1. Цель — напомни задачу заказчика одной фразой
2. Как решили — главная идея решения
3. Экран за экраном — по пути пользователя, а не по порядку в Figma
4. Что дальше — сроки, следующий этап, что нужно от заказчика

## Не делай так
• Не отправляй ссылку на Figma без комментариев
• Не показывай 5 вариантов — покажи 1–2 и объясни выбор
• Не начинай с цветов и шрифтов — начни с задачи

## Фразы для защиты решения
• «Кнопка здесь, потому что пользователь смотрит сюда первым»
• «Шрифт можно поменять, но тогда заголовок не прочитается с телефона»
• «Давайте проверим на 5 пользователях, а не на вкус»
• «Это решение уже работает у [пример] — вот почему»
• «Какой пункт цели этот вариант решает не так?»

{tg}`
  },
  18: {
    topic: 'Сайты-референсы', label: 'насмотренность', title: '8 сайтов с референсами',
    body: `Задача — быстро найти решение, которое уже работает у других, и не изобретать заново.

## Сайты и лендинги
• Awwwards — лучшие сайты с анимацией
• Land-book — лендинги по категориям
• Godly — смелые и необычные сайты
• Lapa Ninja — лендинги и отдельные секции

## Приложения и сценарии
• Mobbin — экраны реальных приложений по сценариям
• Page Flows — записи сценариев: регистрация, оплата, онбординг

## Визуал и подача
• Behance — кейсы целиком, от задачи до результата
• Dribbble — идеи для экранов и иллюстраций

## Как пользоваться
Ищи не «красиво», а решение задачи: «онбординг фитнес-приложения», «форма записи». Сохраняй 3–5 рефов на экран, а не 50.

Условия и тарифы сервисов могут меняться — проверь их на сайте перед использованием.

{tg}`
  },
  19: {
    topic: 'Ты в атмосфере люкса', label: 'нейрофото', title: '10 промптов: ты в атмосфере люкса',
    media: 'd19',
    body: `Задача — фото для аватара и обложек без студии и выездной съёмки. Загрузи свои фото и выбери атмосферу.

## Что загрузить
• 1–2 фото при дневном свете: лицо целиком, без фильтров и очков
• Для кадров в полный рост — фото в полный рост

## Начало каждого промпта
Use my photo as a face reference: keep my facial features, skin tone, eye color and hairstyle exactly. Photorealistic photo, natural skin texture, no retouching, no text, no logos.
Дальше допиши одну из атмосфер. Вместо [скобок] — своё, по-английски.

## 1. Лобби отеля
Me in a tailored [color] outfit standing in a grand hotel lobby with marble floors, a crystal chandelier and warm golden light. Shot on a 50mm lens, f/2, vertical 4:5.

## 2. Яхта на закате
Me on the deck of a white yacht at sunset, linen shirt, wind in my hair, calm sea and coastline behind. Warm golden-hour light, 35mm lens, vertical 4:5.

## 3. Пентхаус с видом на город
Me sitting in a modern penthouse with floor-to-ceiling windows and a night city skyline, a glass of champagne in my hand, soft lamp light. 35mm lens, f/1.8.

## 4. Кафе в Париже
Me at a small table of a Parisian café with a croissant and an espresso, classic Haussmann buildings behind, soft morning light, film photo look.

## 5. Частный самолёт
Me in a cream leather seat of a private jet, a laptop on the table, clouds in the window, soft daylight, editorial travel photo.

## 6. Шале в горах
Me in a cozy knit sweater by a stone fireplace in a mountain chalet, snowy peaks in the window, warm firelight, 50mm lens.

## 7. Кабриолет на побережье
Me driving a vintage convertible with no brand logos along a coastal road in the south of France, sunglasses, silk scarf, sunny day, cinematic shot.

## 8. Вечер в опере
Me in an elegant evening outfit on a red velvet balcony of an opera house, gold details, soft stage light. 85mm lens, f/2.

## 9. Новогодний приём
Me at a luxury New Year party in a ballroom with gold decor and champagne, bokeh lights behind, holding a glass, festive editorial photo.

## 10. Премиальный кабинет
Me working at a wooden desk in a premium office with bookshelves, a laptop and a cup of coffee, soft window light, portrait.

## Если лицо не похоже
• Добавь второе фото с другим ракурсом
• Допиши: «Do not change my age or face shape»
• Перегенерируй 2–3 раза — это нормально

## Важно
Без логотипов брендов на одежде, машинах и бутылках. Не выдавай ИИ-фото за реальную поездку.

{tg}`
  },
  20: {
    topic: 'Правила обложки Reels', label: 'обложки', title: '7 правил обложки для Reels',
    body: `Задача — обложка, по которой с первого взгляда понятно, о чём ролик, и хочется нажать.

## 1. Заголовок — 3–5 слов
Крупно, одной мыслью. Если не читается с телефона в вытянутой руке — сокращай.

## 2. Текст — в центре
В сетке профиля обложка обрезается по краям. Держи заголовок и лицо в центральной зоне.

## 3. Лицо или результат
Крупное лицо с эмоцией или готовый результат: «до / после», экран, макет.

## 4. Контраст
Светлый текст на тёмном или наоборот. Под текстом — плашка или затемнение, если фон пёстрый.

## 5. Один стиль для всех
1–2 шрифта, 2–3 цвета, заголовок всегда на одном месте. Лента читается как одно целое.

## 6. Польза в заголовке
Не название темы, а то, что получит зритель.

## 7. Проверка
Уменьши обложку до размера ногтя. Понятно, о чём ролик? Готово.

## Формулы заголовков
• Как сделать [результат] за [время]
• [N] ошибок в [теме]
• До / после: [что]
• Не делай так в [теме]
• [Тема] без [боли]

{tg}`
  },
  21: {
    topic: 'Анимация с Claude', label: 'анимация', title: 'Анимация экрана с Claude: видео при наведении',
    body: `Задача — первый экран кофейни, который оживает при наведении на кофе или круассан. Без кода, с Claude.

## Промпт 1 · фото по схеме
Realistic photo of a latte in a ceramic cup and a croissant on a wooden table, soft morning window light, warm beige tones, shallow depth of field, same camera angle as the attached layout, no text.

## Промпт 2 · видео между первым и последним кадром
Smooth 5-second shot from the first frame to the last frame: steam rises from the cup, the croissant flakes slightly, the light shifts gently. Static camera, no new objects, no people.

## Промпт 3 · анимация экрана по макету
Build the first screen exactly like my Figma mockup [link]. Two hover zones: coffee and croissant. On hover, play the matching video in place of the photo with a soft crossfade; on mouse leave, return to the photo. Plain HTML, CSS and JS in one file.

## Перед публикацией
• Видео до 3 МБ, иначе экран грузится долго
• На телефоне наведения нет — включи автоплей без звука

{tg}`
  },
  22: {
    topic: 'Открытки клиентам', label: 'работа с клиентами', title: 'Открытки клиентам',
    media: 'd22',
    body: `3 открытки 1080×1350: «С Новым годом», «Спасибо за проект» и «С днём рождения». Подставь имя, название и подарок.

## Как использовать
• Отправь лично в мессенджер — так открытку точно увидят
• В «Спасибо за проект» оставь скидку на следующий заказ — это повод вернуться

{tg}`,
    figma: 'https://www.figma.com/design/9GeVSFrT6wi1MzQSOrql0J/?node-id=1-6181', files: '3 открытки · Figma'
  },
  23: {
    topic: 'Промпты «Заказчик просит»', label: 'заказчик просит', title: '5 промптов «Заказчик просит»',
    body: `Задача — фото без съёмки, которые не отличить от настоящих. В каждом блоке: что просили → цель → промпт → пример.

## Секрет реализма
Описывай мелкие детали: поры, тонкие волоски, морщинки, ворс ткани, капли, крошки. Добавь объектив и свет — как у фотографа. И напиши, чего быть не должно:
No plastic skin, no over-smoothing, no CGI look, no extra fingers, no text, no logos.

Промпты на английском — так нейросеть точнее понимает детали. Вместо [скобок] впиши своё, тоже по-английски.

## 1. Косметология: портрет «после процедуры»
Цель: реклама ухода, которой верят.
Ultra-realistic close-up beauty portrait of a woman in her 30s after a facial treatment. Natural skin texture: visible pores, fine vellus hair on the cheeks, subtle smile lines and a few freckles, healthy dewy glow on the cheekbones, no-makeup look. Soft window light from the left, neutral beige background. Shot on an 85mm lens, f/2.8, sharp focus on the eyes with visible catchlights and individual eyelashes. Vertical 4:5. No plastic skin, no airbrushing, no text.
Это ИИ-модель: не выдавай её за реальную клиентку и не обещай такой результат процедуры.
{img:d23a}

## 2. Кондитерская: фото торта
Цель: карточка товара без фотографа. Загрузи фото своего торта:
Keep the cake exactly as in the reference photo: shape, decor and colors. Place it on a light marble table by a window. Realistic food photography: visible cream texture with tiny air bubbles, a few crumbs on the plate, glossy berries with small water droplets, a slightly imperfect handmade edge, soft natural shadows. 100mm macro lens, f/4, shallow depth of field. Vertical 4:5, no text.
{img:d23b}

## 3. Кофейня: руки бариста
Цель: продать сезонное меню.
Realistic photo of a barista's hands pouring latte art into a ceramic cup of [drink]. Hand details: real skin texture, small knuckle wrinkles, fine hairs on the back of the hand, short natural nails. Milk foam with microbubbles, thin steam rising, a few coffee grounds on the wooden counter. Warm morning light from the window, 50mm lens, f/2, vertical 4:5, no logos.
{img:d23c}

## 4. Цветы: букет в руках флориста
Цель: предзаказы букетов.
Realistic close-up of a florist's hands tying a bouquet of [flowers] with twine. Details: delicate petal veins, tiny water droplets, a few slightly imperfect petals, natural scratches on the stems, kraft paper fibers, real skin texture on the hands. Soft diffused daylight, beige background, 85mm lens, f/2.8, vertical 4:5.
{img:d23d}

## 5. Недвижимость: интерьер для рекламы
Цель: заявки на просмотр до сдачи дома.
Photorealistic interior of a cozy living room, [area, style]. Real materials: linen sofa with visible weave and soft creases, oak floor with natural grain, wool rug fibers, a folded blanket, an open book and a glass of water on the coffee table. Floor-to-ceiling windows with a city view at golden hour, soft natural shadows. Architectural photography, 24mm lens, straight vertical lines, vertical 4:5, no people.
На баннере подпись «Визуализация».
{img:d23e}

## Правило
Товар на фото должен совпадать с реальным — не «улучшай» его до неузнаваемости.

{tg}`
  },
  24: {
    topic: 'Дизайн-система', label: 'дизайн-система', title: 'Дизайн-система Doc Clinic · Lite',
    media: 'd24',
    body: `Задача — простое приложение, чтобы пациенты записывались к врачу сами. Это Lite-версия дизайн-системы: основа, которую можно забрать и подстроить под своё мини-приложение.

## Что внутри
• Токены и стили: цвета, текст, тени, отступы и скругления
• 23 иконки и 14 компонентов со всеми вариантами
• 4 экрана: сплэш, главная, список врачей и запись на приём

## Как забрать
1. Открой файл по кнопке и нажми Duplicate to your drafts
2. В копии опубликуй библиотеку: Assets → иконка книжки → Publish
3. Подключи её в своём проекте и собирай экраны из компонентов

{tg}`,
    figma: 'https://www.figma.com/design/I7jIYlZ8DcVxoGai5Q3qU7/', files: 'Lite-версия · Figma'
  }
};
