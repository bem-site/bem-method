# Релиз: enb-stylus v2.0.0

Привет,

Мы полностью переписали [технологии](https://ru.bem.info/blog/site-technologies/) для сборки стилей. Теперь вам будет намного 
удобнее, ведь всё работает прямо из коробки.

Под капотом прячутся [PostCSS](https://github.com/postcss/postcss), [Аutoprefixer](https://github.com/postcss/autoprefixer), 
[CSSWring](https://github.com/hail2u/node-csswring), ну и конечно же сам [Stylus](https://github.com/stylus/stylus).

О том, как всё устроено, можно прочитать в новой [документации](https://github.com/enb-make/enb-stylus/blob/master/README.md). 

А сейчас — подробности обо всех случившихся изменениях и о том, кому пригодится новый пакет.

## Важные изменения

Первое изменение — одна технология вместо трех — [Stylus](https://github.com/enb-make/enb-stylus/blob/master/api.ru.md). 

Вариативность поддерживается с помощью [опций](https://ru.bem.info/tools/bem/enb-stylus/api#Опции): для добавления вендорных 
префиксов следует использовать опцию [autoprefixer](https://ru.bem.info/tools/bem/enb-stylus/api#autoprefixer), а для подключения 
бибилиотеки [nib](https://github.com/tj/nib) опцию [useNib](https://ru.bem.info/tools/bem/enb-stylus/api#usenib).

Для пост-обработки `url` и раскрытия `import` теперь используется [PostCSS](https://github.com/postcss/postcss). 

Это позволило помимо исправления ряда ошибок поддержать [карты кода](https://ru.bem.info/tools/bem/enb-stylus/api#sourcemap)
 (source maps) и добавить возможность [вставлять изображения](https://ru.bem.info/tools/bem/enb-stylus/api#url) в итоговый 
 CSS-файл.

Подробнее обо всех изменениях читайте в [истории изменений](https://ru.bem.info/tools/bem/enb-stylus/changelog/). Рекомендуем 
обновить пакет [enb-bem-techs](https://ru.bem.info/tools/bem/enb-bem-techs/readme/) до версии [v2.0.0](https://ru.bem.info/tools/bem/enb-bem-techs/changelog/#200).

## Кому подойдёт `enb-stylus`?

Пакет в первую очередь предназначен для сборки Stylus-файлов. Также он отлично подойдёт для сборки обычного CSS.

Возможен вариант, когда часть файлов написана с помощью Stylus, а часть — с помощью CSS.

Вопросы про сборщик ENB традиционно ждем на нашем форуме с [меткой enb](https://ru.bem.info/forum/?labels=enb).

Приятного использования и **Stay BEMed**!
