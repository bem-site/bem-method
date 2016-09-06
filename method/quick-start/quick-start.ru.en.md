# Quick Start

## 

BEM (Block, Element, Modifier) is a component-based approach to web development.&nbsp;
The idea behind it is to divide the user interface into independent blocks.&nbsp; This makes interface development easy and fast even with a complex UI, and it allows reuse of existing code without copying and pasting.

##  

* 
* 
* [Should I create a block or an element?](#should-i-create-a-block-or-an-element)
* [Modifire](#modifier(
* 
* 

## 

 In HTML, blocks are represented by the `class`&nbsp;attribute.



* 



```html
&lt;!-- Correct. The `error` block is semantically meaningful` --&gt; &lt;div class="error"&gt;&lt;/div&gt; &lt;!-- Incorrect. It describes the appearance --&gt; &lt;div class="red-text"&gt;&lt;/div&gt;
```

*   
* 



### Guidelines for using blocks

#### Nesting

 * 
 * 

**Example**

```html

```

## 





* 
*  



```html

```
### 

* 
* 
* 

#### 

* 
* 
*  



```html

```







```html

```





```css
.block {}
.block__elem1 {}
.block__elem2 {}
.block__elem3 {}
```





```html

```



#### 





```html

```

#### 

 



```html

```

## Should I create a block or an element?

1. Если фрагмент кода может использоваться повторно и не зависит от реализации других компонентов страницы, необходимо создавать блок.
2. Если фрагмент кода не может использоваться самостоятельно, без родительской сущности (блока), в большинстве случаев создается элемент.

  В подобном случае вместо элемента необходимо создавать служебный блок.

## 





*   
* 

### 

#### 

*   
* 
  * 
  * 



```html

```

#### 

*  
* 
  * 
  * 



```html

```

### 

#### 

 



```html

```

> 

## 





* 
* 



```html

```



 

## 

 



* 
*  
*  
* 
*  
*  
*  



```files

```



> 

 
* 
* 
