# Попробуй БЭМ на вкус!

Эта статья рассказывает о том, как быстро создать свой проект с использованием БЭМ-технологий.  
Для изучения материала, представленного в статье, необходимо знание JavaScript'а.

Мы шаг за шагом создадим [страничку каталога товаров](http://varya.me/online-shop-dummy/desktop.bundles/index/index.html), пользуясь принципами БЭМ в CSS, возможностью писать декларативный JavaScript с использованием фреймворка [i-bem.js](http://ru.bem.info/articles/bem-js-main-terms/) и шаблонизатора [BEMHTML](http://ru.bem.info/libs/bem-core/2.0.0/bemhtml/reference/). Делать это будем с помощью инструментов для работы с файлами по БЭМ-методолгии – [bem-tools](http://ru.bem.info/tools/bem/bem-tools/). 

![каталог товаров](http://img-fotki.yandex.ru/get/9800/248553438.0/0_d4a6b_a4ba957a_L.png)  

Инструменты, которые мы собираемся использовать, кроссплатформенны.  

Обратите внимание на актуальность версий инструментов и библиотек:  
* [bem-tools v.0.7.x](https://github.com/bem/bem-tools)  
* [bem-core v.2.1.0](https://github.com/bem/bem-core)  

Для начала работы с любым БЭМ-проектом вам необходимо установить [Node.js](http://nodejs.org/).

# Что такое БЭМ?

Небольшое лирическое отступление для тех, кто не в курсе, что значит эта аббревиатура.  

БЭМ расшифровывается как «Блок, Элемент, Модификатор». Это [методология](http://ru.bem.info/method/) разработки web-проектов или способ удобно делить интерфейс на отдельные независимые части, применимый для любой технологии. Кроме того, БЭМ — это набор инструментов для автоматизации выполнения типичных задач web-разработчика. И наконец, БЭМ — это возможность создания библиотек web-компонентов для быстрой и эффективной разработки.

# Создание собственного репозитория проекта

Самый оптимальный путь создания собственного проекта – использование шаблонного репозитория [project-stub](https://github.com/bem/project-stub). Он содержит необходимый минимум конфигурационных файлов и папок и позволяет быстро развернуть проект. 

Нам нужна локальная копия `project-stub`. Ее можно сделать любым удобным для вас способом. Мы собираемся использовать Git.

    $ git clone git://github.com/bem/project-stub.git start-pretty-project   
	
Переходим в папку нашего проекта:

    $ cd start-pretty-project/
Удаляем всю историю версионирования исходного репозитория:

    $ rm -rf .git
    
Инициализируем собственный репозиторий в папке проекта:
    
    $ git init
    
Выполняем установку всех зависимостей и устанавливаем bem-tools:

    $ npm install  
	
Теперь вызов всех команд bem-tools возможен из папки `node_modules/bem/bin/bem`. 

На наш взгляд, путь длинноват, что не всегда удобно. Упростим запуск, установив npm-пакет `bem-cli`, который позволит нам использовать bem-tools локально, то есть из любой точки проекта.  

    $ sudo npm install bem-cli -g
	 
Проект нужно собрать:

    $ bem make

Первая сборка займет некоторое время, потому что именно в этот момент в директорию проекта устанавливаются все необходимые npm-пакеты. 

Конфигурация процесса сборки указана в файле `.bem/make.js`. На ее основе bem-tools подключает все технологии, которые составляют реализацию блоков: шаблоны, зависимости, CSS-правила и JavaScript-функциональность. 

При сборке проекта подключаются все библиотеки блоков, указанные в конфигурационном файле `desktop.bundles/.bem/level.js`, и все блоки, участвующие в описании страниц. 

Для разработки запускаем команду:

    $ bem server  

В результате вы увидите следующее сообщение:

info: Server is listening on port 8080. Point your browser to http://localhost:8080/

На вашем компьютере запустился [bem server](https://github.com/bem/project-stub#usage) — инструмент для разработки, который при обновлении страницы в браузере будет автоматически пересобирать только ту часть проекта, которую затронули ваши изменения.

**Проблема?**  

Если порт 8080 уже используется другой программой, его можно переназначить с помощью опции `-p`:

    $ bem server -p portNum

# Кратко о структуре проекта

HTML-разметка web-страницы и применяемые к ней CSS-правила генерируются из ее описания в BEMJSON-файле `pageName.bemjson.js`. В терминах БЭМ-методологии будем называть BEMJSON-описание страницы **декларацией**.  

BEMJSON-декларация - это структура страницы, описанная в терминах блоков, элементов и модификаторов. Для создания HTML-представления web-страницы в работу включается **шаблонизатор BEMHTML**, который преобразует входные данные из BEMJSON-файла в HTML.

Блоки – строительный материал для страниц. Их можно заимствовать из библиотек или создавать самостоятельно.   

Блок может быть представлен с помощью таких технологий как `css`, `js`, `bemhtml`, `deps.js`, `bemjson.js`, которые в БЭМ-методологии называются **файлами технологий реализации блока**. Наборы реализаций блоков хранятся в одной директории. В БЭМ-терминах она называется **уровнем переопределения**. 

[Структура проекта](http://ru.bem.info/method/filesystem/) предполагает, что все созданные и переопределенные блоки размещаются в директории `desktop.blocks`. А директория `desktop.bundles` содержит блоки страниц проекта и все блоки, указанные в их BEMJSON-декларациях.

# Шаг за шагом

В этом разделе кратко описывается последовательность действий, которые мы будем совершать, чтобы создать страницу каталога товаров.

Для удобства определим, что страница будет состоять из шапки и тела - основной части.
 
1. Разместим на странице шапку. В терминах БЭМ-методолгии она будет представлена блоком **head**. Для этого задекларируем его в BEMJSON-файле и создадим первые CSS-правила, обеспечивающие раскладку.  

2. Добавим в шапку форму поиска и логотип. Представим логотип блоком **logo** и сделаем картинку ссылкой на сайт [bem.info](http://ru.bem.info/). Используя [команды bem-tools](http://ru.bem.info/tools/bem/bem-tools/commands/) создадим блоки самостоятельно и переопределим существующие блоки библиотек с помощью технологий CSS и BEMHTML.  

3. В теле страницы разместим список товаров. Представим его блоком **goods** в BEMJSON-декларации. В BEMHTML-шаблоне зададим разметку элементам блока и откорректируем внешний вид CSS-правилами.  

4. Укажем зависимости в файле `deps.js`, чтобы шаблоны, JavaScript-реализация и CSS-правила применились при сборке к нужным нам блокам.

5. Подключим сторонние библиотеки в проект и расширим их функциональность с помощью микса блоков и доопределения JavaScript-функциональности.  

6. Рассмотрим варианты микса блоков и элементов.

7. И, напоследок, создадим новую страницу и запустим полную сборку проекта.  

# Внесение изменений в страницы

Сейчас в проекте есть одна страница index.html, которую можно открыть в браузере: `http://localhost:8080/desktop.bundles/index/index.html`.

**Важно:** Убедитесь, что путь к странице указан полностью. В противном случае, могут возникнуть проблемы с относительными путями до статики, и некоторые CSS-правила будут игнорироваться в процессе сборки.

## Описание блока в BEMJSON

Для начала разместим на странице шапку, добавив декларацию блока **head** в BEMJSON-файл страницы.

    { block: 'head' }

Здесь и далее полный код страницы на разных стадиях доступен на [Gist](https://gist.github.com/innabelaya/8885713).  

Перезагрузив страницу, вы увидите, что в ее HTML-представлении появился соответствующий `<div>` с классом `"head"`.
   
    <!DOCTYPE html>
    <html class="ua_js_no">
        <head>...</head>
        <body class="page">
            <div class="head"></div>
            <script src="_index.js"></script>
        </body>
    </html>
    
В шапку мы поместим форму поиска, логотип и раскладку, располагающую содержимое как нужно.

Сначала в BEMJSON-описании страницы внутрь блока **head** поместим блок **layout** с двумя элементами: **left** и **right**.

    content: [
        {
            block: 'head',
            content: {
                block: 'layout',
                content: [
                    {
                        elem: 'left',
                        content: 'left here'
                    },
                    {
                        elem: 'right',
                        content: 'right here'
                    }
                ]
            }
        }
    ]
[Пример кода](https://gist.github.com/innabelaya/8885938) index.bemjson.js. 

В HTML-представлении страницы появится необходимая разметка (вы сможете увидеть ее, обновив страницу).  

    <!DOCTYPE html>
    <html class="ua_js_yes">
        <head>...</head>
        <body class="page">
            <div class="head">
                <div class="layout">
                    <div class="layout__left">left here</div>
                    <div class="layout__right">right here</div>
                </div>
            </div>
            <script src="_index.js"></script>
        </body>
    </html>
    
Теперь для блока **layout** необходимо прописать CSS-правила. В БЭМ-терминах будем называть это реализацией блока в технологии CSS.

## Создание блока

Для создания директории блока и в нем CSS-файла технологии воспользуемся [командой bem-tools](http://ru.bem.info/tools/bem/bem-tools/commands/) `bem create`.

    $ bem create -l desktop.blocks -b layout -T css
где:  
`-l directoryName` – указывает на уровень переопределения;  
`-b blockName` – определяет имя директории блока, для которого создается файл технологии. Если директории с таким именем еще не существует, создает ее;  
`-T technogyName` – создает указанный файл технологии реализации блока.   

Таким образом, команда создаст директорию для блока **layout** на уровне переопределения `desktop.blocks` и файл `desktop.blocks/layout/layout.css` для него, в котором уже есть селектор, совпадающий с именем блока. 

Правило нужно дополнить соответственно внешнему виду блока.
Сейчас можно просто скопировать [пример](https://gist.github.com/innabelaya/8906070).

Блоки можно создавать и вручную: создадим папку `desktop.blocks/layout/` и в ней разместим необходимые нам файлы технологий реализации блока. 

Мы хотим, чтобы блок **logo** состоял из картинки и слогана. Для этого задекларируем его в блоке **head** файла `desktop.bundles/index/index.bemjson.js`.

Картинку для логотипа можно взять [отсюда](http://varya.me/online-shop-dummy/desktop.blocks/b-logo/b-logo.png) или указать свою.


    {
        elem: 'right',
        content: {
            block: 'logo',
            content: [
                {
                    block: 'icon',
                    tag: 'img',
                    attrs: { src: 'http://varya.me/online-shop-dummy/desktop.blocks/b-logo/b-logo.png' }
                },
                {
                    elem: 'slogan',
                    content: 'A new way of thinking'
                }
            ]
        }
    }
[Пример кода](https://gist.github.com/innabelaya/9345355) index.bemjson.js. 

![Блок logo](http://img-fotki.yandex.ru/get/9800/248553438.0/0_d4a63_7fdb19bb_M.png)

## Использование блоков из библиотеки

Блоки поисковой формы **input** и **button** создавать самостоятельно не нужно. Они уже реализованы в библиотеке [bem-components](https://github.com/bem/bem-components), которая подключается в project-stub по умолчанию. Достаточно просто задекларировать блоки на странице `desktop.bundles/index/index.bemjson.js`.  


    {
        elem: 'left',
        content: [
            {
                block: 'input',
                name: 'text',
                val: 'Find'
            },
            {
                block: 'button',
                type: 'submit',
                content: 'Search'
            }
        ]
    }

[Пример кода](https://gist.github.com/innabelaya/8912696) index.bemjson.js.

Добавим обработку пользовательского запроса Яндекс.Браузером:

```
{
    elem: 'left',
    content: {
        tag: 'form',
        attrs: { action: 'http://yandex.ru/yandsearch' },
        content: [
            {
                block: 'input',
                name: 'text',
                val: 'Find'
            },
            {
                block: 'button',
                type: 'submit',
                content: 'Search'
            }
        ]
    }
}
``` 
[Пример кода](https://gist.github.com/innabelaya/9391751) index.bemjson.js.

![Форма поиска](http://img-fotki.yandex.ru/get/9796/248553438.0/0_d4a68_25bceae6_L.png)

Используя блок **link** из той же библиотеки, мы сделаем весь блок **icon** ссылкой на сайт [bem.info](http://ru.bem.info/):


```
{
    elem: 'right',
    content: {                                   
        block: 'logo',
        content: [
            {
                block: 'link',
                url: 'http://ru.bem.info',
                content: [
                    {
                        block: 'icon',
                        tag: 'img',
                        attrs: { src: 'http://varya.me/online-shop-dummy/desktop.blocks/b-logo/b-logo.png' }
                    },
                    {
                        elem: 'slogan',
                        content: 'A new way of thinking'
                    }
                ]
            }
        ] 
    }    
}
```
[Пример кода](https://gist.github.com/innabelaya/9345693) index.bemjson.js.

## Модификация блоков библиотек

### Модификация в CSS

Блоки **input** и **button** можно модифицировать, написав необходимые CSS-правила для каждого из них.

CSS мы поместим в блок **input** на уровне переопределения `desktop.blocks`:

    $ bem create -l desktop.blocks -b input -T css 
[Пример кода](https://gist.github.com/innabelaya/8906605) input.css.

То же самое для блока **button**:

    $ bem create -l desktop.blocks -b button -T css 
[Пример кода](https://gist.github.com/innabelaya/8906646) button.css.

Добавим необходимые CSS-правила для блока **link**.


    $ bem create -l desktop.blocks -b link -T css 
[Пример кода](https://gist.github.com/innabelaya/8906451) link.css.

![Форма поиска](http://img-fotki.yandex.ru/get/9800/248553438.0/0_d4a64_d24f6e0_L.png)

### Модификация BEMHTML

Чтобы отцентрировать весь материал на странице, нужно создать дополнительный HTML-элемент — контейнер. Для этого необязательно создавать специальный блок. Проще и правильнее модифицировать шаблон для блока **page** на уровне переопределения `desktop.blocks`, который генерирует выходной HTML для всей страницы. 

В качестве шаблонизатора используем [BEMHTML](http://ru.bem.info/libs/bem-core/2.0.0/bemhtml/reference/).

    $ bem create -l desktop.blocks -b page -T bemhtml

BEMHTML-шаблоны могут не просто определять теги, которыми представлен блок, и их атрибуты, но и генерировать разметку страницы.

В созданном файле `desktop.blocks/page/page.bemhtml` необходимо написать код, оборачивающий контент блока в дополнительный контейнер.  

    block('page').elem('body').match(!this._done)(
        content()(function() {
            this._done = true;
            return {
                elem: 'inner',
                content: applyNext()
            };
        })
    )

[Пример кода](https://gist.github.com/innabelaya/8906664)  page.bemhtml.

    <!DOCTYPE html>
    <html class="ua_js_yes">
        <head>...</head>
        <body class="page">
            <div class="page__inner">
                <div class="head">
                    <div class="layout">...</div>
                </div>
                <script src="_index.js"></script>
            </div>
        </body>
    </html>

Для новой разметки блока **page** создадим свои CSS-правила:

    $ bem create -l desktop.blocks -b page -T css 
Контент для файла `desktop.blocks/page/page.css` можно скопировать [отсюда](https://gist.github.com/innabelaya/8906698).

Чтобы шапка была заметна на странице, поместим ее в рамку. Для этого создадим CSS-правила для блока **head**.

    $ bem create -l desktop.blocks -b head -T css 
Контент для файла `desktop.blocks/head/head.css` можно скопировать [отсюда](https://gist.github.com/innabelaya/8906724).

![Блок head с рамкой](http://img-fotki.yandex.ru/get/9930/248553438.0/0_d4a65_c4dc0f3d_L.png)

# BEMHTML-шаблоны

Разместим на странице список товаров. Он представлен в BEMJSON-декларации страницы блоком **goods**. Декларация содержит данные о товарах: название, картинку, цену и адрес.

    {
        block: 'goods',
        goods: [
            {
                title: 'Apple iPhone 4S 32Gb',
                image: 'http://mdata.yandex.net/i?path=b1004232748_img_id8368283111385023010.jpg',
                price: '259',
                url: '/'
            },
            {
                title: 'Samsung Galaxy Ace S5830',
                image: 'http://mdata.yandex.net/i?path=b0206005907_img_id5777488190397681906.jpg',
                price: '73',
                url: '/'
            },
            //...
    }
[Пример кода](https://gist.github.com/innabelaya/8913801) index.bemjson.js.

Чтобы эти данные превратились в нужную разметку, блок должен быть реализован в технологии BEMHTML. Для корректировки внешнего вида применим CSS-правила. Воспользуемся командой `bem create`, чтобы создать блок сразу во всех технологиях, предусмотренных по умолчанию.

    $ bem create -l desktop.blocks -b goods
В BEMHTML-шаблоне блока `desktop.blocks/goods/goods.bemhtml` нужно написать код, который превратит данные, задекларированные в BEMJSON, в элементы блока. А также, пользуясь модой `tag`, указать, как будет представлен блок и его элементы в HTML-структуре страницы.

    block('goods')(
		tag()('ul'),
		
		//...

	    	elem('item')(
				tag()('li')
    		),

			elem('title')(
        	tag()('h3')
    		),

    		elem('image')(
        	tag()('img'),

        	attrs()({ src: this.ctx.url })   
    		),

			elem('price')(
        	tag()('span')
        	)
[Код пример](https://gist.github.com/innabelaya/8913843) goods.bemhtml.

    <!DOCTYPE html>
    <html class="ua_js_yes">
        <head>...</head>
        <body class="page">
            <div class="page__inner">
                <div class="head">...</div>
                <ul class="goods">
                    <li class="goods__item">
                        <h3 class="goods__title">Apple iPhone 4S 32Gb</h3>
                        <img class="goods__image" src="http://mdata.yandex.net/i?path=b1004232748_img_id8368283111385023010.jpg"/>
                        <span class="goods__price">259</span>
                    </li>
                    <li class="goods__item">...</li>
                    <li class="goods__item">...</li>
                </ul>
                <script src="_index.js"></script>
            </div>
        </body>
    </html>
Шаблон может создавать не только HTML-элементы блока, но и другие блоки. Например, цену товара можно сделать ссылкой, используя для этого блок **link** из библиотеки `bem-components`.  
Чтобы избежать каскада при оформлении этой ссылки стилями, пометим ее как элемент блока **goods**.

    {
        elem: 'price',
        content: {
            block: 'link',
            mix: [ {block: 'goods', elem: 'link'} ],
            url: item.url,
            content: item.price
        }
    }

[Пример кода](https://gist.github.com/innabelaya/8913983) goods.bemhtml.


    <!DOCTYPE html>
    <ul class="goods">
        <li class="goods__item">
            <h3 class="goods__title">
                Apple iPhone 4S 32Gb
            </h3>
            <img class="goods__image" src="http://mdata.yandex.net/i?path=b1004232748_img_id8368283111385023010.jpg"/>
            <a class="link goods__link" href="/">259</a>
        </li>
        //...
        <li class="goods__item">...</li> 
        <li class="goods__item">...</li>
    </ul> 

Нужно визуально выделить на странице новые товары. Для этого добавим проверку модификатора `new` в шаблон: [пример](https://gist.github.com/innabelaya/8914048). 

CSS-правила для блока можно скопировать [отсюда](https://gist.github.com/innabelaya/8915049).  
Создавать блок отдельно в технологии CSS не нужно, потому что CSS входит в список технологий, создаваемых по умолчанию командой `bem create`.

![Список товаров](http://img-fotki.yandex.ru/get/9800/248553438.0/0_d4a66_9f679754_L.png) 

Так как мы планируем поддерживать Internet Explorer, необходимо создать специальный `ie.css`-файл. Он не входит в список технологий по умолчанию.

    $ bem create -l desktop.blocks -T ie.css -b goods

Код файла `desktop.blocks/goods/goods.ie.css` доступен на [Gist](https://gist.github.com/innabelaya/8915092).

# Зависимости блоков

Помимо декларации нужно гарантировать подключение к блокам страницы шаблонов, CSS и JavaScript. Для этого необходимо указать зависимости. Делается это с помощью представления блока в технологии `deps.js`.

    $ bem create -l desktop.blocks -b goods -T deps.js 

Воспользуемся нестрогой зависимостью `shouldDeps`, указав блок **link**.

    ({
        shouldDeps: [
            { block: 'link' }
        ]
    })
[Пример кода](https://gist.github.com/innabelaya/8915140) goods.deps.js.

# Подключение библиотек

Представим шапку и каждый товар модными прямоугольниками с тенью. Блок для этого мы позаимствуем из сторонней библиотеки `j`.
Там есть всего один блок, который называется **box** – он делает то, что нам нужно.

Чтобы получить код библиотеки, нужно указать ее имя, версию и адрес в файле `bower.json`, который лежит в корне проекта.

```
    "dependencies": {
     "bem-core": "v2.1.0",
     "bem-components": "git://github.com/bem/bem-components.git#0658def60efe2043f907131db9899b3dda70693f",
     "j": "https://github.com/innabelaya/j#695d479fbdd7c97e61bd89953ef095e2e567e70e"
```    
[Пример кода](https://gist.github.com/innabelaya/8915341) bower.json.

Установим зависимую библиотеку. Сделаем это с помщью следующей команды:
    
    ./node_modules/.bin/bower-npm-install

Необходимо указать, что данная библиотека должна использоваться при сборке страниц. Это делается в файле `desktop.bundles/.bem/level.js`.

    exports.getConfig = function() {

    return BEM.util.extend(this.__base() || {}, {
        bundleBuildLevels: this.resolvePaths([
                'bem-core/common.blocks',
                'bem-core/desktop.blocks',
                'bem-components/common.blocks',
                'bem-components/desktop.blocks',
                'j/blocks'
            ]
[Пример кода](https://gist.github.com/innabelaya/8915431) desktop.bundles/.bem/level.js.

К сожалению, пока при изменении конфигурации проекта приходится перезапускать bem server. Текущий процесс придется прервать (`Ctrl+C`) и снова набрать команду `bem server`.

# Миксы блоков и элементов

Теперь блок **box** можно использовать. Мы применим его к шапке страницы, чтобы добавить белый фон с тенью. Для этого смиксуем блок **head** с блоком **box**, используя метод **mix** в BEMJSON-декларации страницы.

Один из способов смешения — описать метод **mix** во входных данных (BEMJSON).

В данном случае нужно смешать блок **head** с блоком **box**:

    {
        block: 'head',
        mix: [ { block: 'box' } ],
        content: ...
    }
[Пример кода](https://gist.github.com/innabelaya/8931642) index.bemjson.js.

    <!DOCTYPE html>
    <html class="ua_js_yes">
        <head>...</head>
        <body class="page">
            <div class="page__inner">
                <div class="head box">
                    <div class="layout">...</div>
                </div>
                <ul class="goods">...</ul>
                <script src="_index.js"></script>
            </div>
        </body>
    </html>

Запишем блок **box** в зависимости блока **head**.

    $ bem create -l desktop.blocks -b head -T deps.js 

```
({
    shouldDeps: [
        { block: 'box' }
    ]
})
```
[Пример кода](https://gist.github.com/innabelaya/8930709) head.deps.js.

![Микс блоков](http://img-fotki.yandex.ru/get/9796/248553438.0/0_d4a67_d0bb01c8_L.png)

Миксовать можно не только блоки, но и элементы с блоками. И не только в BEMJSON-декларации страницы, но также в шаблонах реализации конкретного блока.  

Сделаем, чтобы каждый товар из списка имел такое же оформление, как и шапка страницы. Для этого в шаблоне блока **goods** смиксуем каждый элемент **item** с блоком **box** из только что подключенной библиотеки.

```
    elem: 'item',
        mods: { new: item.new ? 'yes' : undefined },
        mix: [{ block: 'box' }],
        content: ...
```
        
[Пример кода](https://gist.github.com/innabelaya/8930835) goods.bemhtml.

    <!DOCTYPE html>
    <html class="i-ua_js_yes">
        <head>...</head>
        <body class="page">
            <div class="page__inner">
                <div class="head box">...</div>
                <ul class="goods">
                    <li class="goods__item box">...</li>
                    <li class="goods__item box">...</li>
                    <li class="goods__item box">...</li>
                    <li class="goods__item goods__item_new_yes box">...</li>
                    <li class="goods__item box">...</li>
                    
                    //...
                    
                </ul>
                <script src="_index.js"></script>
            </div>
        </body>
    </html>

![Список товаров в блоке box](http://img-fotki.yandex.ru/get/9930/248553438.0/0_d4a69_34525ebc_L.png)

# Декларативный JavaScript

## Блоки с JavaScript-функциональностью

Блок **box**, который появился на странице проекта благодаря подключенной сторонней библиотеке, предоставляет также и динамическую JavaScript-функциональность — он умеет сворачиваться.

Для использования этой функциональности в шапке необходимо изменить описание блока **head**, указав, что блок **box** имеет JavaScript-реализацию. 

    mix: [{ block: 'box', js: true }]
[Пример кода](https://gist.github.com/innabelaya/8930981) index.bemjson.js.

Также разместим внутри блока элемент `switcher`:

    block: 'head',
    mix: [ { block: 'box', js: true } ],
    content: [
        {
            block: 'layout',
            
        //...
        
        },
        {
            block: 'box',
            elem: 'switcher'
        }
    ]
[Пример кода](https://gist.github.com/innabelaya/8931082) index.bemjson.js.

Теперь в блоке **head** есть стрелочка, умеющая сворачивать и разворачивать его.

![Стрелочка](http://img-fotki.yandex.ru/get/9800/248553438.0/0_d4a6a_5354e5b0_M.png)

## Модификация JavaScript

Расширим предлагаемую библиотекой JavaScript-функциональность блока **box**. Сделаем так, чтобы он сворачивался не только по вертикали, но и по горизонтали. При этом вносить изменения в чужую библиотеку мы не можем. Но благодаря тому, что JavaScript блока написан с использованием декларативного фреймворка [i-bem.js](https://github.com/bem/bem-core/blob/v1/common.docs/i-bem-js/i-bem-js.ru.md), есть возможность изменить поведение блока.

    $ bem create -l desktop.blocks -b box -T js 
В файле `desktop.blocks/box/box.js` нужно описать реакцию блока на установку модификатора с помощью специального свойства `onSetMod`.

В данном случае нужно реагировать на установку и снятие модификатора **closed**:

    onSetMod : {

        'closed': {
            'yes': function() {
                // some functionality here
            },
            '': function() {
                // some functionality here
            }
        }
        
    }
[Пример кода](https://gist.github.com/innabelaya/9503213) box.js.

# Создание новых страниц

Страницы — это тоже блоки, но на уровне переопределения `desktop.bundles`. Поэтому для их создания тоже можно 
воспользоваться командой `bem create`.  
Создадим страницу `contact`:

    $ bem create -l desktop.bundles -b contact
Флаг `-T` можно не указывать, потому что `bem create` благодаря настройкам уровня `desktop.bundles` знает, что создаваемые на этом уровне блоки должны быть представлены в технологии BEMJSON. Таким образом, bem-tools создает файл `desktop.bundles/contact/contact.bemjson.js` с минимальным содержимым для страницы.

Новую страницу можно посмотреть по адресу http://localhost:8080/desktop.bundles/contact/contact.html.  
`bem server` соберет ее HTML-представление, JS- и CSS-файлы в момент первого открытия в браузере.

# Полная сборка проекта

Все время, пока мы разрабатывали проект, работал `bem server` и пересобирал только измененные части проекта, которые необходимы при обновлении страницы в браузере.

Для сборки всего проекта целиком можно воспользоваться одной командой:

    $ bem make

# Подведем итоги
Первый практический опыт использования БЭМ-методологии показал нам только вершину айсберга всех возможностей работы с БЭМ-проектом. 

Итак, в ходе изучения статьи мы узнали, как быстро и легко начать работу с собственным проектом, развернутым на базе шаблонного репозитория project-stub. 

Основываясь на БЭМ-принципах разработки мы научились создавать новые и использовать существующие блоки библиотек, изменять их функциональность, стили и шаблоны.  

Начали знакомство с БЭМ-инструментами, в частности, с `bem-tools`. Затронули шаблонизатор BEMHTML и лишь упомянули о возможности использования декларативного фреймворка i-bem.js. 

Полная информация о БЭМ-методологии в виде ознакомительных статей, учебных материалов и видео уроков доступна на сайте [ru.bem.info](http://ru.bem.info/).

# Релизы
Статья подготовлена на базе публикации [Попробуй БЭМ на вкус](http://ru.bem.info/articles/start-with-project-stub/) Варвары Степановой.  

Текущий релиз включает в себя:
* использование библиотеки bem-core v2.1.0;
* использование bem-tools v0.7.x;
* обновление библиотеки bem-components;
* переход на новый js-синтаксис шаблонизатора BEMHTML.
