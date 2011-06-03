# Методология БЭМ

ЭТО ЧЕРНОВИК. ДОКУМЕНТ В РАЗРАБОТКЕ.

## Что такое БЭМ

Подход к web-разработке, который позволяет получить гибкий, легко изменяемый код.

BEM решает следующие задачи:

 * разделение кода на логические части
    * происходит разделение ответственности, части кода могут писать разные люди
    * использование без погружения в детали реализации — можно оперировать частями
    без погружения в то, как эти части сделаны
    * увеличивается вероятность повторного использования — чем больше частей у нашего решения,
    тем больше вероятность того, что какая-либо часть решения может быть повторно использована
 * единый подход к реализации, во множестве технологий (мультилингвальность)
    * в web-технологиях финальный продукт состоит из разных технологий, но при этом во всех
     технологиях единые термины и подходы к реализации
    * картинки и документация тоже технологии
 * оптимизировать выполнение production runtime
    * добавлять в него только действительно используемые части, не грузить лишний, не используемый код
    * генерировать для разных бразеров («виртаульных машин») разный код, оптимизированный для этого браузера
    * для улучшения скорости работы можно менять не код приложения, а улучшать «компилятор»,
    который генерирует код из БЭМ-сущностей

## Определения

### Блок
Некая самостоятельная сущность, кирпичик проекта.<br/>
Блок содержит информацию о самом себе и может знать о своих детях — элементах блока.<br/>
Они могут использоваться сами по себе или внутри других блоков.

**Пример**<br/>
![Блок](https://github.com/bem/bem-method/raw/master/images/search.ru.png)

### Элемент
Часть блока, которая отвечает за какую-то отдельную функцию.<br/>
Элементы блока имеют смысл только в рамках своего родителя. Могут быть обязательными и не обязательными.

**Пример**<br/>
![Элемент](https://github.com/bem/bem-method/raw/master/images/search-e.ru.png)

### Модификатор
Модификатор — это свойство блока или элемента, которое меняет внешний вид или поведение.<br/>
Модификатор имеет имя и значение. Одновременно может использоваться несколько разных модификаторов.

**Пример**<br/>
![Модификатор](https://github.com/bem/bem-method/raw/master/images/search-m.ru.png)

<a name="levels"></a>
### Уровень переопределения
Уровень переопределения — это набор реализаций блоков. Проект может
иметь несколько уровней, на каждом из которых добавляется или изменяется
реализация блоков. Конечная реализация блока собирается со всех уровней последовательно.

**Пример**<br/>
![Уровни переопределения](https://github.com/bem/bem-method/raw/master/images/levels.ru.png)

<a name="naming"></a>
## Соглашения по именованию

### Имя блока
Имя блока формируется как <tt style="background: #F7F7E7;">префикс-<span style="color: #C00;">имя-блока</span></tt>.

**Примеры**

    b-menu
    b-popup
    i-popup

### Префикс блока
Мы используем два вида префиксов, которые позволяют определить назначение блока.

**b- (от block)**<br/>
Префикс блока с визуальным представлением на странице.

**Пример**<br/>
Попап с тенью имеет конкретное визуальное представление. Может иметь или не
иметь хвостик или закрывающий крестик. Может быть разных цветов. Может отображаться в разных направлениях.

![Блок b-popup](https://github.com/bem/bem-method/raw/master/images/b-popup.png)

**i- (от include)**<br/>
Префикс абстрактного блока, который не существует сам по себе, но используется
для построения других блоков.<br/>
Или префикс блока не имеющего визуального представления и реализующего какую-то
функциональность.

**Пример**<br/>
Блок <tt style="background: #F7F7E7;">i-popup</tt> не имеет конкретного визуального
представления. Хранит в себе функциональность, на основе которой строится блок
<tt style="background: #F7F7E7;">b-popup</tt>. Без блока <tt style="background: #F7F7E7;">i-popup</tt>
блок <tt style="background: #F7F7E7;">b-popup</tt> не существует.

![Блок i-popup](https://github.com/bem/bem-method/raw/master/images/i-popup.png)

### Имя элемента

Полное имя элемента формируется так, чтобы из него можно было определить
принадлежность данного элемента к конкретному блоку.<br/>
Полное имя элемента создается по схеме:
<tt style="background: #F7F7E7;">b-<span style="color: #C00;">имя-блока</span>__<span style="color: #008000;">имя-элемента</span></tt>.

**Примеры**

    b-menu__item
    b-popup__content

### Имя модификатора блока

Полное имя модификатора блока формируется так, чтобы из него можно было
определить принадлежность данного модификатора к конкретному блоку.
Полное имя модификатора блока создается по схеме:
<tt style="background: #F7F7E7;">b-<span style="color: #C00;">имя-блока</span>\_<span style="color: #06C;">имя-модификатора</span>\_<span style="color: gray;">значение-модификатора</span></tt>.

**Примеры**

    b-menu_layout_horiz
    b-menu_layout_vert
    b-popup_direction_up

### Имя модификатора элемента

Полное имя модификатора элемента формируется так, чтобы из него
можно было определить принадлежность данного модификатора к конкретному
элементу конкретного блока.
Полное имя модификатора элемента создается по схеме:
<tt style="background: #F7F7E7;">b-<span style="color: #C00;">имя-блока</span>__<span style="color: #008000;">имя-элемента</span>\_<span style="color: #06C;">имя-модификатора</span>\_<span style="color: gray;">значение-модификатора</span></tt>.

**Примеры**

    b-menu__item_state_current
    b-popupa__content_visibile_yes
    b-popupa__content_visibile_no

## Варианты модификации блоков

 * Модификатором
 * Контекстом
 * Уровнем переопределения

### Модификатором

Блоку/элементу добавляется модификатор и изменение блока/элемента описывается в коде этого модификатора.

**Примеры**

По умолчанию фон у попапа осутствует.<br/>
![Блок b-popup без фона](https://github.com/bem/bem-method/raw/master/images/b-popup-tr.png)

Добавление модификатора theme блоку `b-popup` добавляет ему фон.<br/>
`theme=yellow` добавляет фон желтого цвета:<br/>
![Блок b-popup с желтым фоном](https://github.com/bem/bem-method/raw/master/images/b-popup-yellow.png)

`theme=black` добавляет фон черного цвета:<br/>
![Блок b-popup с чёрным фоном](https://github.com/bem/bem-method/raw/master/images/b-popup-bl.png)

У блока может быть одновременно несколько модификаторов.

**Примеры**

Модификатор `theme` — отвечает за фон попапа. Модификатор
`direction` — отвечает за направление отображения попапа.

`theme=yellow` и `direction=left` — попап желтого цвета открывается влево:<br/>
![Блок b-popup с хвостиком слева](https://github.com/bem/bem-method/raw/master/images/b-popup-left.png)

`theme=yellow` и `direction=right` — попап желтого цвета открывается вправо:<br/>
![Блок b-popup с хвостиком справа](https://github.com/bem/bem-method/raw/master/images/b-popup-right.png)

Модификатор блока может изменять структуру блока (например, добавлять/удалять элементы) или его реализацию.

**Пример**<br/>
Модификатор `has-close=yes` — добавляет элемент закрывающий крестик.
Добавляет отступы блоку, освобождая место крестика.
![Блок b-popup с закрывающим крестиком](https://github.com/bem/bem-method/raw/master/images/b-popup-close.png)

### Контекстом

Блок при размещении в другом блоке может менять свой внешний вид или поведение.

**Пример**<br/>
Цвет текста вложенного блока меняется с зелёного на красный, если
он помещён в блок с синим фоном с красными буквами.

**Примеры**

Переключатель языков (`b-lang-switcher`)<br/>
![Переключатель языков b-lang-switcher](https://github.com/bem/bem-method/raw/master/images/lang-switcher.png)

Переключатель языков (`b-lang-switcher`) в подвале страницы
(`b-foot`), уменьшается размер шрифта.<br/>
![Переключатель языков b-lang-switcher в подвале](https://github.com/bem/bem-method/raw/master/images/lang-switcher-foot.png)

### Уровнем переопределения

Изменения создаются на следующем уровне переопределения и добавляют или изменяют функциональность блока.

**Пример**<br/>
Блок может выглядеть на разных проектах по разному. При этом его общая часть лежит
в одном файле (например, в репозитории фреймворка), а частная для проекта в другом
(в репозитории проекта). Блок доопределяется дополнительными проектными файлами.

TODO: Сделать пример или ссылку на пример.

## Структура блока на файловой системе

Реализация блока состоит из набора технологий, к примеру:

 * HTML-разметка обеспечивает нужную разметку (`XML` + `XSL` = `HTML` или `bemjson` + `bemhtml` = `HTML`)
 * CSS-правила внешний вид блока
 * JS-правила поведения блока

Этот набор технологий может быть разным, в зависимости от блока, его назначения, и удобства использования.

В файловой системе реализации в разных технологиях записаны в соответствующие файлы.
Имена файлов соответствуют [соглашению об именовании](#naming).

###Каждый блок в директории, элементы и модификаторы в отдельных директорияx

    blocks/
        b-menu/
            _layout/
                b-menu_layout_horiz.css
                b-menu_layout_horiz.bemhtml
                b-menu_layout_vertical.css
                b-menu_layout_vertical.bemhtml
            elem/
                b-menu__elem.css
                b-menu__elem.bemhtml
            b-menu.css
            b-menu.js
            b-menu.bemhtml

### Каждый блок в директории, элементы и модификаторы в отдельных файлах без директорий

    blocks/
        b-menu/
            b-menu_layout_horiz.css
            b-menu_layout_horiz.bemhtml
            b-menu_layout_vertical.css
            b-menu_layout_vertical.bemhtml
            b-menu__elem.css
            b-menu__elem.bemhtml
            b-menu.css
            b-menu.js
            b-menu.bemhtml

### Каждый блок в директории, элементы и модификаторы в файлах блока

    blocks/
        b-menu/
            b-menu.css
            b-menu.js
            b-menu.bemhtml

### Директории не используются, элементы и модификаторы в отдельных файлах

    blocks/
        b-menu_layout_horiz.css
        b-menu_layout_horiz.bemhtml
        b-menu_layout_vertical.css
        b-menu_layout_vertical.bemhtml
        b-menu__elem.css
        b-menu__elem.bemhtml
        b-menu.css
        b-menu.js
        b-menu.bemhtml

### Директории не используются, элементы и модификаторы в файлах блока

    blocks/
        b-menu.css
        b-menu.js
        b-menu.bemhtml

## Технологии реализации

BEM-метод подразумевает реализацию блока в различных технологиях.

TODO: нарисовать картинку с уровнями переопределения и технологиями

### HTML

Реализация возможна в нескольких вариантах.

http://clubs.ya.ru/bem/replies.xml?item_no=712

#### Тэги HTML и классы

TODO

#### Кастомные тэги

TODO

### CSS

Каждая БЭМ-сущность должна иметь класс, чтобы при необходимости изменить или дописать или переопредлить для них CSS-свойства.

Опираясь на то, что любой блок, возможно придется использовать повторно, т.е.
блок не является уникальным, CSS-свойства для блоков и его елементов описываются только через классы.

**Важно**: CSS-свойства не описываются через `id`, а именно вот так *НЕ ПИШЕМ*:

    #header {}

CSS-классы для BEM-сущностей соответствуют полным именам этих сущностей.<br/>
См. [соглашение об именовании](#naming)

**Примеры CSS-классов**

    .b-popup {}                 // CSS-класс блока
    .b-popup__content {}        // CSS-класс элемента блока
    .b-popupa_theme_yellow {}   // CSS-класс модификатора блока

По возможности отказываемся от [Селекторов типа](http://h.yandex.net/?http%3A%2F%2Fwww.w3.org%2FTR%2F2001%2FCR-css3-selectors-20011113%2F%23type-selectors).<br/>
Селекторы типа — селекторы, которые применяются к `DOM`-узлам без `CSS`-класса (элементо-зависимые селекторы).

**Например**, вот так *НЕ ПИШЕМ*:

    p
    {
          color: #ccc;
    }

    table.news td
    {
       border-bottom: 1px solid #ccc;
    }

    .list li
    {
        float: left;
    }

Отказ от использования Селекторов типа и `CSS`-каскада уменьшает `Reflow Time` — чистое время
наложения стилей на сформированный `DOM`.<br/>
TODO: Приложить ссылку на исследования.

### JavaScript

В `JS` мы также работаем в терминах "Блок-Элемент-Модификатор".
`DOM`-представление блоков рассматривается как более низкий уровень реализации.<br/>
Допустимы блоки без `DOM`-представления. Обычно это блоки-хелперы.

**Пример блоков без `DOM`-представления:**

    i-request                // Конструктор запросов
    i-request_type_ajax      //Конструктор AJAX-запросов

TODO: Подготовить i-bem к релизу.

### Шаблоны

TODO: Подготовить bemhtml

## Представление в DOM
В простейшем случае блок соответствует `DOM`-узлу, один к одному.
Но важно понимать, что `DOM`-узел и блок это не всегда одно и тоже.

### Микс

Под миксом подразумевается смешивание на одном DOM-узле разных блоков и элементов.

На одном DOM-узле может быть:

 * несколько блоков

        b-menu b-head-menu
 * блок и элемент этого же блока

        b-menu b-menu__layout
 * блок и элемент другого блока

        b-link b-menu__link
 * элемент одного блока и элемент другого блока

        b-menu__item b-head-menu__item
 * блок с модификатором и другой блок

        b-menu b-menu_layout_horiz b-head-menu
 * блок с модификатором и другой блок с модификатором

        b-menu b-menu_layout_horiz b-head-toolbar b-head-toolbar_theme_black

**Пример**

Переключатель панелей имеет элементы табы (`b-tabbed-pane__tabs`) и панели
(`b-tabbed-pane__panels`). Эти два элемента находятся на одном `DOM`-узле
одновременно. Это позволяет легко менять расположение элементов на странице
с вертикального на горизонтальное.

Вертикальное расположение элементов

![Панели над табами](https://github.com/bem/bem-method/raw/master/images/tab-panel-v.png)

    <div class="b-tabbed-pane b-tabbed-pane__tabs">
        ...
    </div>
    <div class="b-tabbed-pane b-tabbed-pane__panels">
        ...
    </div>

Горизонтальное расположение элементов

![Панели рядом с табами](https://github.com/bem/bem-method/raw/master/images/tab-panel-h.png)

    <table class="l-page">
    <tr>
        <td class="l-page__left">
            <div class="b-tabbed-pane b-tabbed-pane__tabs">
                ...
            </div>
        </td>
        <td class="l-page__right">
            <div class="b-tabbed-pane b-tabbed-pane__panels">
                ...
            </div>
        </td>
    </tr>
    </table>

## Структура БЭМ-проекта на файловой системе

Проект, реализованный на БЭМ состоит из одного или нескольких уровней переопределения и кода страниц.

Приведённые ниже примеры структуры не жёсткие и могут быть изменены в зависимости от потребностей проекта.

### Страница

Совокупность файлов, которые определяют внешний вид и поведение конкретной страницы.

**Пример**

    pages/
        index/
            index.css
            index.js
            index.bemhtml
            index.bemdecl
            index.bemjson

Страница состоит из описания блоков, которые на ней используются
(`.bemdecl`) и конкретного их расположения (`.bemjson`). Это исходный код страницы.
Из него генерируются все необходимые для отображения файлы (`.css`, `.js`, etc)

#### Исходный код страницы

##### index.bemdecl

TODO: написать пример страницы с использованием b-page, b-menu и b-link

**Пример index.bemdecl**

    module.exports = [
        {
            name : 'b-page',
            elems : [
                { name : 'head' },
                { name : 'title' }
            ]
        },
        {
            name: 'b-link',
            mods: [
                {
                    name : 'isBEM',
                    vals : [
                        { name : 'yes'}
                    ]
                }
            ]
        }
    ]

##### index.bemjson 

TODO: написать пример страницы с использованием b-page, b-menu и b-link

**Пример index.bemjson**

    ({
        block: 'b-page',
        content: {
            block: 'b-link',
            url: 'http://yandex.ru',
                content: 'Самая посещаемая страница Рунета'
            }
    })

#### Генерируемые файлы

##### index.css

TODO: написать пример index.css с использованием b-page, b-menu и b-link

**Пример index.css**

    @import url(lego/b-page/b-page.css);
    @import url(lego/b-menu/b-menu.css);
    @import url(lego/b-menu/_layout/b-menu_layout_horiz.css);
    @import url(lego/b-menu/_layout/b-menu_layout_vert.css);
    @import url(lego/b-menu/_layout/b-menu_layout_vert.css);


##### index.js

TODO: написать пример index.js с использованием b-page, b-menu и b-link

    include(lego/b-menu/b-menu.js);
    include(lego/i-counter/i-counter.js);

### Уровни переопределения проекта

Проект состоит из [уровней переопределения](#levels). Количество уровней
переопределения зависит от проекта, всегда есть минимум 1 уровень.

TODO: картинка с уровнями и технологиями

Реализация блока может быть на нескольких уровнях. Для каждой страницы можно
настроить своё используемое множество уровней. Финальная реализация блока на
странице собирается со всех уровней для этой страницы.

#### Расположение уровней на проектах

##### Только блоки проекта

    project/
        blocks/
            b-head/
                b-head.css
                b-head.bemhtml
            b-foot/
                b-foot.css
                b-foot.bemhtml
            b-sidebar/
                b-sidebar.css
                b-sidebar.bemhtml

##### Блоки проекта и отдельных страниц проекта

    project/
        blocks/
            b-head/
                b-head.css
                b-head.bemhtml
            b-foot/
                b-foot.css
                b-foot.bemhtml
            b-page/
                b-page.bemhtml
            b-sidebar/
                b-sidebar.css
                b-sidebar.bemhtml
        pages/
            index/
                blocks/
                    b-head/
                        b-head.css             # переопределили вид шапки на заглавной странице
            about/
                blocks/
                    b-about-text/              # добавили новый блок
                        b-about-text.css
                        b-about-text.bemhtml

##### Блоки фреймворка и проекта

    project/
        framework/
            b-menu/
                b-menu.css
                b-menu.bemhtml
            b-page/
                b-page.css
                b-page.bemhtml
        blocks/
            b-head/
                b-head.css
                b-head.bemhtml
            b-foot/
                b-foot.css
                b-foot.bemhtml
            b-page/                           # переопределение шаблонов b-page из уровня framework'а
                b-page.bemhtml
            b-sidebar/
                b-sidebar.css
                b-sidebar.bemhtml

##### Блоки фреймворка, проекта и страниц

    project/
        framework/
            b-menu/
                b-menu.css
                b-menu.bemhtml
            b-page/
                b-page.css
                b-page.bemhtml
        blocks/
            b-head/
                b-head.css
                b-head.bemhtml
            b-foot/
                b-foot.css
                b-foot.bemhtml
            b-page/                           # переопределение шаблонов b-page из уровня framework'а
                b-page.bemhtml
            b-sidebar/
                b-sidebar.css
                b-sidebar.bemhtml
        pages/
            index/
                blocks/
                    b-head/
                        b-head.css             # переопределили вид шапки на заглавной странице
            about/
                blocks/
                    b-about-text/              # добавили новый блок
                        b-about-text.css
                        b-about-text.bemhtml

##### Блоки проекта, страниц и темы

    project/
        blocks/
            b-head/
                b-head.css
                b-head.bemhtml
            b-foot/
                b-foot.css
                b-foot.bemhtml
            b-page/                           # переопределение шаблонов b-page из уровня framework'а
                b-page.bemhtml
            b-sidebar/
                b-sidebar.css
                b-sidebar.bemhtml
        pages/
            index/
                blocks/
                    b-head/
                        b-head.css             # переопределили вид шапки на заглавной странице
            about/
                blocks/
                    b-about-text/              # добавили новый блок
                        b-about-text.css
                        b-about-text.bemhtml
        themes/
            black/                             # не раскладываем файлы по директориям, кладём их рядом
                b-head.css
                b-foot.css
                b-sidebar.css
            yellow/
                b-head.css
                b-foot.css
                b-sidebar.css

## Реализация блока

Реализация блока состоит из набора технологий, к примеру:

 * `HTML`-разметка обеспечивает нужную структуру блока (`XML` + `XSL` или `JSON` + `JS`)
 * `CSS`-правила внешний вид блока
 * `JS`-правила поведения блока

Этот набор технологий может быть разным, в засимости от блока, его назначения, и удобства использования.<br/>
Структура блока первична, а реализация блока вторична.

**Пример реализации блока b-domik**

<div style="float: right">
<b>Домик на странице</b><br/>
<img src="https://github.com/bem/bem-method/raw/master/images/domik-onpage.png"/><br/><br/>
<b>Домик в попапе</b><br/>
<img src="https://github.com/bem/bem-method/raw/master/images/domik-popup.png"/>
</div>

    b-domik/
        b-domik.css                                     # общие файлы реализации для всех типов домика
        b-domik.ie.css
        b-domik.js
        b-domik.xsl
        _type/                                          # папка с модификаторами для блока
            b-domik_type_onpage.css                     # домик прибитый на странице
            b-domik_type_onpage.ie.css
            b-domik_type_onpage.js
            b-domik_type_onpage.xsl
            b-domik_type_popup.css                      # домик как всплывающее окно
            b-domik_type_popup.ie.css
            b-domik_type_popup.js
            b-domik_type_popup.xsl
        lock/                                           # замочек — элемент блока
            b-domik__lock.css
            b-domik__lock.png
            b-domik__lock.xsl
            _visibility/                                # модификатор элемента lock, делает его видимым  
                b-domik__lock_visibility_visible.css
        shadow/                                         # тень — элемент блока
            b-domik__shadow.css
            b-domik__shadow.ie.css
            b-domik__shadow.png

