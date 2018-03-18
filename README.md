# Мультимедиа

## Команды

Поставить зависимости `npm install` <br>
Запустить проект `npm run start` <br>
Собрать проект `npm run build` <br>
Деплой проекта на github-pages `npm run deploy` <br>
Линт `npm run lint`


**Демо**: https://udobnaja.github.io/lesson-3/

### Описание проделанной работы

Эффекты: 

Почему сделано на transition, keyframe, smil - потому как для этих решений js избыточен

* При загрузке/ ошибке / запрете на видео - виден синий экран с анимацией глаза (searching video signal...),
применена анимация keyframe
* Видео появляется с простой анимацией на transition с небольшой задержкой
* На видео наложен паттерн css linear-gradient с помощью псевдо элемента after, для него так же 
проставлена небольшая анимацией на transition с небольшой задержкой
* При первичной загрузке поочередно появляются элементы верхней и нижней панели, анимация сделана
с помощью SMIL
* Если доступ к видео разрешон, то появляется треугольник цели, на нем анимация с transition 
(scale и translateX translateY для соеденения линий в треугольник) и далее он движется
с помощью keyframes по пространству
* Слева на панели если псевдо получаемые сообщения, реализованные через keyframe как бегущий текст, 
а так же координаты и дургие разные данные как высчитываемые значения, с разной задержкой, по смыслу написания (температура не может очень быстро меняться)
* На канву видео наложено еще одно видео разрезанной clip-path и двигающееся в низ, с изменение свойств фильтр и контраст с помощью keyframes
* С помощью tree.js отрисована планета, вращающаяся слева
* Справа высчитывается громкость звука и частота



