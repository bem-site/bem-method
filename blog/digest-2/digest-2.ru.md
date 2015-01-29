# Дайджест новостей БЭМ. Выпуск второй.

Привет,

продолжаем собирать самые важные и интересные новости про БЭМ и публиковать их в виде дайджеста.

**Вы** тоже **можете поучаствовать в формировании дайджеста**, прислав свои новости или найденные ссылки на [info@bem.info](mailto:info@bem.info). Мы обязательно включим их в обзор и таким образом все вместе сделаем дайджест полноценнее и интереснее!

## Новости технологий

### ENB
* Выпустили стабильный релиз [enb-bem-techs](https://github.com/enb-bem/enb-bem-techs/releases/tag/v1.0.0). В пакет вошли базовые технологии, уже извесные всем из пакета ENB. В релизе значительно проработано API технологий, бо́льшая часть кода покрыта тестами, а также исправлен ряд ошибок. 
* Актуализировали документацию для каждой из технологий и [несколько документов](https://github.com/enb-bem/enb-bem-techs/tree/master/docs), которые помогут сконфигурировать проект для наиболее популярных задач. Все нюансы описаны в [руководстве по миграции](https://github.com/enb-bem/enb-bem-techs/blob/master/MIGRATION.md). Подробнее про все изменения читайте в [истории изменений](https://github.com/enb-bem/enb-bem-techs/blob/master/CHANGELOG.md).
* Пакеты из организации `enb-bem` для работы с Windows исправлены.
* Устаревшие ENB-пакеты в npm объявлены deprecated:
  * Вместо `enb-bemhtml` следует использовать [enb-xjst](https://github.com/enb-bem/enb-xjst).
  * Вместо `enb-bem` следует использовать [enb-bem-techs](https://github.com/enb-bem/enb-bem-techs).
  * Вместо `enb-pseudo-levels` следует использовать [enb-bem-pseudo-levels](https://github.com/enb-bem/enb-bem-pseudo-levels).
  * Вместо `enb-bem-sets` следует использовать [enb-magic-factory](https://github.com/enb-bem/enb-magic-factory) и [enb-magic-platform](https://github.com/enb-bem/enb-magic-platform).
* Добавили технологию [js-borschik-include](https://github.com/enb-make/enb-borschik#js-borschik-include) в пакет `enb-borschik` версии 1.5.0.

### Другие изменения
* Ускорили BH в версии [v3.2.3](https://github.com/bem/bh/releases/tag/v3.2.3) за счет оптимизации эскейпинга. По синтетическим тестам прирост составил до 30%.
* Выпустили `bem-naming` версии [v0.5.1](https://github.com/bem/bem-naming/releases/tag/v0.5.1), в которой значительно ускорены методы `stringify`, `parse` и `typeOf`.
* Обновилили сайт bem.info — обновили шапку примеров для блоков, теперь они читаются удобнее. Поправили отображение кода в статьях, документации и описаниях блоков. 

## Новости документации

  * Обновили сборку документации в [bem-components v2](https://ru.bem.info/libs/bem-components/v2/).
  * Обновили всю документацию к [bem-components v2](https://ru.bem.info/libs/bem-components/v2/) на английском языке.
  * Появились рабочие примеры для блоков [modal](https://ru.bem.info/libs/bem-components/v2.0.0/desktop/modal/examples/) и [popup](https://ru.bem.info/libs/bem-components/v2.0.0/desktop/popup/examples/).

## Последнее в блоге

В ноябре 2014 года мы провели первый двухдневный [хакатон по БЭМ](https://ru.bem.info/blog/first-bem-hack/) и продолжаем публиковать результаты проектов и команд.

Читайте последние рассказы менторов в нашем блоге:
  * [Проект «Сборка»](http://ru.bem.info/blog/first-bem-build/)
  * [Проект «Форум»](http://ru.bem.info/blog/first-bem-forum/)

## Интересное на форуме

Последние горячие и полезные обсуждения и рассказы нашего форума:
  * [БЭМ — это не только про CSS](https://ru.bem.info/forum/issues/163/)
  * [apply(), applyCtx(), applyNext() в BEMHTML](http://ru.bem.info/forum/issues/174)
  * [Разработка своей библиотеки блоков](http://ru.bem.info/forum/issues/172/)
  * [Вкладывание элементов в элементы и другие тонкости](https://ru.bem.info/forum/issues/160/)
  * [Pretty-print для HTML](https://ru.bem.info/forum/issues/160/)
  * [Формы. Разные до безобразия](https://ru.bem.info/forum/issues/154/). Присоединяйтесь к [обсуждению](https://github.com/bem/bem-forms/issues) и разработке прототипа библиотеки компонент для создания форм [bem-forms](https://github.com/bem/bem-forms).
  * [Зачем БЭМ на маленьком проекте?](https://ru.bem.info/forum/issues/165/)

## В мире БЭМ 

Что интересного за месяц случилось в большом мире веб-разработки и как это связано с БЭМ?

Ответ — в подборке ссылок на опубликованные материалы (подкасты, статьи и разработки), которые мы собрали для вас. Надеемся, что они будет полезны и также интересны.

  * Подкаст RadioJS ([Выпуск №14](http://radiojs.ru/2014/12/radiojs-14/)) с [Антоном Виноградовым](http://ru.bem.info/authors/vinogradov-anton/), активным евангелистом БЭМ из Альфа-лаборатории. Он рассказал о том, что будет, если внедрить дух стартапа внутри бюрократичной компании, есть ли БЭМ за пределами Яндекса и в каких браузерах тестируют Альфа-Клик. Слушаем подкаст [здесь](http://radiojs.ru/2014/12/radiojs-14/).
  * Подкаст RadioJS ([Выпуск №16](http://radiojs.ru/2015/01/radiojs-16/)) про код и калиграфию. В гостях — [Сергей Бережной](http://ru.bem.info/authors/berezhnoy-sergey/), руководитель отдела разработки поисковых веб-интерфейсов в Яндексе и со-автор БЭМ. Он рассказывает о своих проектах, делится мудростью и вспоминает, с чего начиналась карьера. Обсуждает процессы в Яндексе, io.js и EcmaScript 6. Слушаем подкаст [здесь](http://radiojs.ru/2015/01/radiojs-16/).
  * Советы  разработчика про БЭМ и SMACSS — в статье «[BEM and SMACSS: Advice From Developers Who’ve Been There](http://www.sitepoint.com/bem-smacss-advice-from-developers/)» от Патрика Катанцарити (Patrick Catanzariti).
  * Почему стоит избегать CSS наследований и всегда использовать БЭМ — рассказывается в статье «[Forget CSS Specificity, Always use BEM](http://blog.swapnilsingh.me/forget-css-specificity-always-use-bem/)» от Свапнила Сингха (Swapnil Singh). 
  * [skyline.is](http://skyline.is)  — новая базовая библиотека для постройки своих CSS-фреймворков. Она пропагандирует объектно-ориентированный CSS, написанный на SCSS с использованием БЭМ-нотации.
  * [bem-react](https://github.com/dfilatov/bem-react) — модуль для React от [Дмитрия Филатова](http://ru.bem.info/authors/filatov-dmitry/), автора [YModules](http://ru.bem.info/tools/bem/modules/), который объединяет в себе важные особенности React с некоторыми преимуществами БЭМ.
  * [b_](https://github.com/azproduction/b_) — форматтер для БЭМ-специфичных имен классов от Михаила Давыдова.

Приятного чтения, использования и **Stay BEMed**!

Всегда ваша,<br>
Команда БЭМ
