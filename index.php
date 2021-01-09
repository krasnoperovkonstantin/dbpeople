<!DOCTYPE HTML>
<html>
 <head>
  <meta charset="utf-8">
  <title>База данных о людях</title>
  <link rel="stylesheet" href="/css/main.css">
 </head>
 <body>
  <div class="wrap">
    <div class="content">
      <form id="form1">
        <p>Введите данные о человеке:</p>
        <label for="firstname" class="label">Имя</label>
        <input type="text" name="firstname" id="firstname" value="" placeholder="Имя" class="input"><br>
        <label for="firstname" class="label">Фамилия</label>
        <input type="text" name="lastname" id="lastname" value="" placeholder="Фамилия" class="input"><br>
        <label for="firstname" class="label">Возраст</label>
        <input type="text" name="age" id="age" value="" placeholder="Возраст" class="input"><br>
      </form>
      <button type="submit" name="save" id="save" class="button">сохранить</button>
      <button type="submit" name="upload" id="upload" class="button">выгрузить</button>
    </div>
  </div>
 </body>
 <script src="/js/jquery-3.5.1.min.js"></script>
 <script async="" defer="" src="https://apis.google.com/js/api.js"></script>
 <script src="/js/main.js"></script>
</html>