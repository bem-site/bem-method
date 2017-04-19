# 

## Why bem?

* 1
* 
* 

## 

* 
* 
* 
* 
* 
* 

## 

* 

## 

* 
* 
* 
* 
* 
* 
* 




## 

1. 
1.  
1.  

>

 

## 



* 
* 



* 
* 



*  
* В БЭМ генерация шаблона возможна на этапе разработки.  


* Web Components использует императивный принцип — интерполяцию строк.
*  



*  
* 



*  
*  БЭМ использует [миксы](../method/key-concepts/key-concepts.ru.md#Микс) — размещение нескольких БЭМ-сущностей на одном DOM-узле.

## 

 

* 
* 
* 

 

## 

  

## 



>

## 



* 
* 
* 

 Так, например, все варианты верны: `context`, `ctx` или `c`, `attributes`, `attrs` или `as`. 

### 

 

### 

 



```html

```



```html

```

 

 



### 



    

## 

 


* 
```html
<div class="block block_mod1 block_mod2 block_mod3">
    <div class="block__elem"></div>
</div>
```
* 

## 







```html

```

## 



 
* 
* 

## 







* 
* 
* 

## 

  





```css
.nav_hovered .nav__link
{
    text-decoration: underline;
}
```
```css
.nav_theme_islands .nav__item
{
    line-height: 1.5;
}
```

## 

  



```html

```
Правила модификатора `active` для кнопки записываются как комбинированный селектор `.button.active`.  




>

##  

 



```html

```





```html

```

 

 

## 

> 



* 
*  

## 

  





  

  

```css
.menu {
    @include reset-list;
}
.menu__item {
    @include reset-list-item;
}
...
.list {
    @include reset-list;
}
.list__item {
    @include reset-list-item;
}
```



## 

   

## 

*  
* 


