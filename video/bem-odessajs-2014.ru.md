# Разработка проекта на полном стеке БЭМ — мастер-класс на OdessaJS 2014

БЭМ упрощает разработку сайтов, которые нужно быстро создать и долго поддерживать. Эту технологию используют во фронтенде почти всех сервисов Яндекса, и она уже успела обрасти множеством библиотек и инструментов, которыми мы хотим с вами поделиться. С обширным арсеналом БЭМ, со всей его модульностью и мощью, вам останется «всего-то» придумать идею и реализовать её.

Этой реализацией 5-6 июля в Одессе на «Тусовке для front-end разработчиков» OdessaJS 2014 и занимались разработчики Яндекса [Евгений Константинов](https://tech.yandex.ru/people/397958/) и [Дмитрий Белицкий](https://tech.yandex.ru/people/397959/) в рамках полного мастер-класса по БЭМ.

Что в него вошло? Рассказ о том, в чём преимущество вёрстки независимыми блоками, что такое уровни переопределения, готовые библиотеки блоков и инструменты для автоматизации сборки. Демонстрация разных инструментов — например, autoprefixer, css-препроцессора Roole или модульной системы YModules. Живой пример пользы декларативного подхода, когда одни и те же идеи можно использовать как для CSS, так и для JavaScript. Отдельная часть мастер-класса была посвящена декларативным шаблонам BEMHTML и BEMTREE, которые позволяют преобразовывать сырые данные во view-ориентированный BEMJSON. Вместе с разработчиками на мастер-классе можно было написать серверную часть приложения в БЭМ-методологии и использовать данные от разных социальных и поисковых сервисов (RSS с Яндекс.Фоток, API Twitter и Instagram). В результате получился работающий сайт и практическая демонстрация полного стека БЭМ-технологий.

##Видео с мастер-класса

<iframe width="640" height="360" src="//www.youtube.com/embed/lGkuzR4Ujvs?list=UUcMRMeq7LWxpuBOrGiCeacg" frameborder="0" allowfullscreen></iframe>

##Слайды
<iframe src="www.slideshare.net/slideshow/embed_code/39374023" width="476" height="400" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe>

# Тестирование CSS-регрессий с Gemini на OdessaJS 2014
Каждый разработчик интерфейсов долгоживущих сервисов сталкивается с регрессиями в вёрстке. Мы научились пользоваться инструментами для unit-тестирования js-кода, но до сих пор плохо понимаем, как тестировать на регрессии вёрстку. И ещё хуже понимаем, как делать это автоматически (continuous integration) и при этом писать небольшие и не очень хрупкие тесты.

В 2014 году мы создали Gemini — инструмент для модульного тестирования вёрстки для нашей [библиотеки компонентов](http://ru.bem.info/libs/bem-components/v2/). Мы используем его для тестирования внутренней библиотеки компонентов Яндекса, которая лежит в основе большинства наших сервисов (например, [Поиска](https://yandex.com/yandsearch?text=lxjs%202014&redircnt=1411391689.1) и [Картинок](http://yandex.com/images/search?text=lisboa%20portugal)).

5-6 июля в Одессе на «Тусовке для front-end разработчиков» OdessaJS 2014 разработчик Яндекса [Сергей Татаринцев](https://tech.yandex.ru/people/158302/) рассказал, как использовать этот инструмент — как разрабатывать тесты и запускать их на локальной машине или в уже существующей экосистеме (Travis CI, Sauce Labs).

#Видео доклада
<iframe width="640" height="360" src="//www.youtube.com/embed/k0RDoEBqeU8?list=UUcMRMeq7LWxpuBOrGiCeacg" frameborder="0" allowfullscreen></iframe>

##Слайды

<iframe src="www.slideshare.net/slideshow/embed_code/36697276" width="425" height="355" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid     #cccccc; border-width:1px; margin-bottom:5px; max-width: 100%;" allowfullscreen> </iframe> <div style="margin-bottom:5px"> <strong> <a href="www.slideshare.net/SevInf/css-gemini-odessajs" title="Тестирование CSS-регрессий с gemini – OdessaJS" target="_blank">Тестирование CSS-регрессий с gemini – OdessaJS</a> </strong> from <strong><a href="www.slideshare.net/SevInf" target="_blank">SevInf</a></strong> </div>
